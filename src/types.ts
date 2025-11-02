export interface Doctor {
  id: string;
  name: string;
  expertise: string[];
  experience: string;
  priceRange: string;
  location: string;
  rating: number; // e.g., 4.5
}

export interface IntakeData {
    name: string;
    email: string;
    address: string;
    city: string;
    budget: number;
    emergencyLevel: 'Low' | 'Medium' | 'High';
    specialty: string;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  userEmail: string;
}