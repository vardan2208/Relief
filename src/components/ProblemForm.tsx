import React, { useState } from 'react';
import { IntakeData } from '../types';

interface IntakeFormProps {
    user: any;
    onSubmit: (data: IntakeData) => void;
}

const SPECIALTIES = [
    "Mental Health Therapist",
    "Cardiologist (Heart Specialist)",
    "Pulmonologist (Lung Specialist)",
    "Neurologist (Brain Specialist)",
    "Psychiatrist (Depression Solver)",
    "General Practitioner",
    "Dermatologist",
];

const IntakeForm: React.FC<IntakeFormProps> = ({ user, onSubmit }) => {
    const [name, setName] = useState(user.displayName || '');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [budget, setBudget] = useState(2000);
    const [emergencyLevel, setEmergencyLevel] = useState<'Low' | 'Medium' | 'High'>('Low');
    const [specialty, setSpecialty] = useState(SPECIALTIES[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            email: user.email,
            address,
            city,
            budget,
            emergencyLevel,
            specialty,
        });
    };

    return (
        <div className="p-8 bg-gray-900 rounded-lg border border-gray-800 shadow-inner max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold mb-2 text-neon-cyan">Let's Find the Right Help</h2>
             <p className="text-gray-400 mb-6">Please provide some details so we can find the best professional for you.</p>
             <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-cyan focus:border-neon-cyan" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">Email</label>
                        <input type="email" value={user.email} readOnly className="w-full bg-gray-700 border-gray-600 rounded p-2 text-gray-400 cursor-not-allowed" />
                    </div>
                 </div>
                 <div>
                     <label className="text-sm font-bold text-gray-400 block mb-1">Address</label>
                     <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g., 123 Main St" required className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-cyan focus:border-neon-cyan" />
                 </div>
                  <div>
                     <label className="text-sm font-bold text-gray-400 block mb-1">City</label>
                     <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g., Mumbai" required className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-cyan focus:border-neon-cyan" />
                 </div>

                 <div>
                    <label htmlFor="budget" className="text-sm font-bold text-gray-400 block mb-2">Maximum Budget per Session: <span className="text-neon-cyan font-bold text-base">₹{budget.toLocaleString('en-IN')}</span></label>
                    <input 
                        id="budget"
                        type="range" 
                        min="500" 
                        max="5000" 
                        step="100" 
                        value={budget} 
                        onChange={e => setBudget(Number(e.target.value))} 
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                    />
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">Urgency</label>
                        <select value={emergencyLevel} onChange={e => setEmergencyLevel(e.target.value as any)} className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-cyan focus:border-neon-cyan">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">Type of Professional</label>
                        <select value={specialty} onChange={e => setSpecialty(e.target.value)} className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-cyan focus:border-neon-cyan">
                            {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                 </div>

                 <button type="submit" className="w-full py-3 font-bold text-black bg-neon-cyan rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-lg shadow-neon-cyan/20">
                     Find My Doctor
                 </button>
             </form>
        </div>
    );
};

export default IntakeForm;
