import React, { useState, useEffect } from 'react';
import { findDoctors } from '../services/geminiService';
import { Doctor, IntakeData } from '../types';
import Spinner from './Spinner';
import LocationIcon from './icons/LocationIcon';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const DoctorCard: React.FC<{ doctor: Doctor; onSelect: () => void }> = ({ doctor, onSelect }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-neon-green/30 transform hover:scale-105 hover:border-neon-green transition-all duration-300 shadow-lg shadow-neon-green/10">
        <h3 className="text-xl font-bold text-neon-green">{doctor.name}</h3>
        <p className="text-gray-400 mt-1">{doctor.experience} of experience</p>
        <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(doctor.rating)} />)}
            <span className="text-yellow-400 font-bold ml-2">{doctor.rating.toFixed(1)}</span>
        </div>
        <div className="mt-4">
            <p className="font-semibold text-gray-300">Expertise:</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {doctor.expertise.map(e => <span key={e} className="bg-gray-700 text-neon-green/80 text-xs font-medium px-2.5 py-1 rounded-full">{e}</span>)}
            </div>
        </div>
        <div className="mt-4 flex justify-between items-center text-gray-300">
            <span>{doctor.priceRange} / session</span>
            <span className="flex items-center gap-1 text-sm"><LocationIcon /> {doctor.location}</span>
        </div>
         <button onClick={onSelect} className="mt-6 w-full py-2 font-bold text-black bg-neon-green rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-md shadow-neon-green/30">
            Select & Continue
        </button>
    </div>
);

interface DoctorSelectionProps {
    intakeData: IntakeData;
    onSelectDoctor: (doctor: Doctor) => void;
    onBack: () => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({ intakeData, onSelectDoctor, onBack }) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        findDoctors(intakeData)
            .then(data => {
                setDoctors(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch doctor information.');
                setLoading(false);
            });
    }, [intakeData]);

    return (
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 shadow-inner max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-neon-green">Choose a Professional</h2>
                <button onClick={onBack} className="font-semibold text-neon-cyan hover:underline">
                    &larr; Back to Details
                </button>
            </div>
            {loading && <div className="flex justify-center p-8"><Spinner /></div>}
            {error && <p className="text-center text-red-400 bg-red-900/50 p-3 rounded">{error}</p>}
            {!loading && !error && (
                doctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} onSelect={() => onSelectDoctor(doctor)} />)}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 py-8">No professionals found matching your criteria. Please try adjusting your search.</p>
                )
            )}
        </div>
    );
};

export default DoctorSelection;
