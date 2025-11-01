import React from 'react';
import DoctorIcon from './icons/DoctorIcon';
import FriendIcon from './icons/FriendIcon';

interface ChoicePageProps {
    onSelectDoctorFlow: () => void;
    onSelectFriendSupport: () => void;
}

const ChoiceCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
    color: 'cyan' | 'green';
}> = ({ icon, title, description, onClick, color }) => {
    const baseClasses = "p-8 bg-gray-900 rounded-lg border-2 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center";
    const colorClasses = {
        cyan: 'border-neon-cyan/50 hover:border-neon-cyan hover:shadow-neon-cyan/30',
        green: 'border-neon-green/50 hover:border-neon-green hover:shadow-neon-green/30',
    };
    const buttonClasses = {
        cyan: 'bg-neon-cyan text-black',
        green: 'bg-neon-green text-black',
    };

    return (
        <div onClick={onClick} className={`${baseClasses} ${colorClasses[color]}`}>
            <div className="mb-4">{icon}</div>
            <h3 className={`text-2xl font-bold mb-2 ${color === 'cyan' ? 'text-neon-cyan' : 'text-neon-green'}`}>{title}</h3>
            <p className="text-gray-400 mb-6 flex-grow">{description}</p>
            <button className={`w-full py-3 font-bold rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105`}>
                Select
            </button>
        </div>
    );
};


const ChoicePage: React.FC<ChoicePageProps> = ({ onSelectDoctorFlow, onSelectFriendSupport }) => {
    return (
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">How can we help you today?</h2>
            <p className="text-lg text-gray-400 mb-12">Choose the path that's right for you. We're here to support you either way.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ChoiceCard
                    icon={<DoctorIcon />}
                    title="Find a Professional Doctor"
                    description="Get expert help. Fill out your details, find a specialist based on your location and budget, and schedule a confirmed appointment."
                    onClick={onSelectDoctorFlow}
                    color="cyan"
                />
                <ChoiceCard
                    icon={<FriendIcon />}
                    title="Talk to a Friend"
                    description="Feeling lonely or need to talk? Share your thoughts through our confidential form. A real person will listen and get back to you."
                    onClick={onSelectFriendSupport}
                    color="green"
                />
            </div>
        </div>
    );
};

export default ChoicePage;
