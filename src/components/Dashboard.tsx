import React, { useState } from 'react';
import MedicalHistoryUploader from './MedicalHistoryUploader';
import { Appointment } from '../types';
import CalendarIcon from './icons/CalendarIcon';

interface DashboardProps {
    user: any;
    appointment: Appointment;
    onBookAnother: () => void;
}

const Star: React.FC<{ filled: boolean; onClick: () => void }> = ({ filled, onClick }) => (
    <svg onClick={onClick} className={`w-8 h-8 cursor-pointer ${filled ? 'text-neon-cyan' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const AppRating: React.FC = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        console.log(`Rating submitted: ${rating}`);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setRating(0);
        }, 3000);
    };

    return (
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 shadow-inner">
            <h2 className="text-2xl font-bold mb-4 text-neon-cyan text-center">Rate Your Experience</h2>
            <div className="flex justify-center space-x-2 mb-4">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <Star
                            key={ratingValue}
                            filled={ratingValue <= (hover || rating)}
                            onClick={() => setRating(ratingValue)}
                        />
                    );
                })}
            </div>
             {submitted ? (
                 <p className="text-center text-neon-green">Thank you for your feedback!</p>
             ) : (
                <button onClick={handleSubmit} disabled={rating === 0} className="w-full max-w-xs mx-auto block py-2 font-bold text-black bg-neon-cyan rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed">
                    Submit Rating
                </button>
             )}
        </div>
    );
};

const PersonalizedAdvice: React.FC = () => (
    <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 shadow-inner">
        <h2 className="text-2xl font-bold mb-4 text-neon-cyan text-center">Need More Personalized Advice?</h2>
        <p className="text-gray-400 text-center mb-4">For urgent matters or more detailed consultations, you can contact our support team directly.</p>
        <div className="text-center">
            <a href="tel:9410606636" className="inline-block py-3 px-6 font-bold text-black bg-neon-green rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-md shadow-neon-green/30">
                Call Now: 9410606636
            </a>
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ user, appointment, onBookAnother }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-gray-900 rounded-lg border border-neon-green shadow-lg shadow-neon-green/20 text-center">
                <h2 className="text-3xl font-bold text-neon-green mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-300 mb-6">A confirmation has been sent to {user.email}.</p>

                <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 text-left space-y-4">
                    <div className="flex items-start space-x-4">
                        <CalendarIcon />
                        <div>
                            <p className="text-xl font-bold text-white">{appointment.doctor.name}</p>
                            <p className="text-gray-400">{appointment.doctor.expertise.join(', ')}</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 my-4"></div>
                    <div>
                        <p className="text-lg"><span className="font-semibold text-gray-300">Date:</span> {new Date(appointment.date).toDateString()}</p>
                        <p className="text-lg"><span className="font-semibold text-gray-300">Time:</span> {appointment.time}</p>
                        <p className="text-lg"><span className="font-semibold text-gray-300">Location:</span> {appointment.doctor.location}</p>
                    </div>
                </div>
                 <button 
                    onClick={onBookAnother}
                    className="mt-8 w-full py-3 font-bold text-black bg-neon-green rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-md shadow-neon-green/30"
                >
                    Book Another Appointment
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <MedicalHistoryUploader user={user} />
                <PersonalizedAdvice />
            </div>

            <div className="mt-8">
                <AppRating />
            </div>
        </div>
    );
};

export default Dashboard;
