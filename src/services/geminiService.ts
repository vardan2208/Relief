import { GoogleGenAI, Type } from "@google/genai";
import { Doctor, IntakeData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const findDoctors = async (intakeData: IntakeData): Promise<Doctor[]> => {
    const prompt = `
      Based on the user's needs, list 4 fictional doctors in or near ${intakeData.city}, India.
      User requirements:
      - Specialty: ${intakeData.specialty}
      - Budget: Up to ₹${intakeData.budget} per session.
      
      For each doctor, provide:
      - A unique ID (e.g., "doc-123")
      - Full name
      - A list of 3-4 areas of expertise relevant to ${intakeData.specialty}.
      - Years of experience.
      - A price range per session in Indian Rupees (INR) that is within the user's budget of ₹${intakeData.budget}. Use the format "₹X,XXX - ₹Y,YYY".
      - General location within ${intakeData.city}.
      - A patient rating from 3.5 to 5.0.
      
      Ensure the data is realistic, diverse, and fits the JSON schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  doctors: {
                    type: Type.ARRAY,
                    description: "A list of fictional doctors.",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING, description: "A unique identifier for the doctor." },
                        name: { type: Type.STRING, description: "Full name of the professional." },
                        expertise: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                          description: "List of their specializations."
                        },
                        experience: { type: Type.STRING, description: "Total years of experience." },
                        priceRange: { type: Type.STRING, description: "Price per session in INR." },
                        location: { type: Type.STRING, description: "General clinic location." },
                        rating: { type: Type.NUMBER, description: "Patient rating out of 5." },
                      },
                      required: ["id", "name", "expertise", "experience", "priceRange", "location", "rating"],
                    }
                  }
                },
                required: ["doctors"],
              },
            },
        });

        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);
        return data.doctors as Doctor[];
    } catch (error) {
        console.error("Error fetching doctors from Gemini API:", error);
        return [
            { id: "fallback-1", name: "Dr. Eleanor Vance (Fallback)", expertise: ["Anxiety", "Trauma", "CBT"], experience: "15 years", priceRange: "₹2000 - ₹2500", location: "Midtown", rating: 4.8 },
            { id: "fallback-2", name: "Dr. Samuel Chen (Fallback)", expertise: ["Depression", "Family Therapy", "Adolescent Psychology"], experience: "12 years", priceRange: "₹1800 - ₹2200", location: "Uptown", rating: 4.6 },
        ];
    }
};