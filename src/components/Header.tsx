import React, { useState } from 'react';
import Modal from './Modal';

interface HeaderProps {
    user: any;
    onLogout: () => void;
    steps: string[];
    currentStep: number;
    showProgressBar: boolean;
    onBackToChoices: () => void;
    showBackToChoicesButton: boolean;
}

const ProgressBar: React.FC<{ steps: string[], currentStep: number }> = ({ steps, currentStep }) => (
    <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center text-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                                index <= currentStep ? 'bg-neon-cyan text-black' : 'bg-gray-700 text-gray-400'
                            }`}
                        >
                            {index < currentStep ? '✓' : index + 1}
                        </div>
                        <p className={`mt-2 text-xs font-semibold ${index <= currentStep ? 'text-neon-cyan' : 'text-gray-500'}`}>{step}</p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${index < currentStep ? 'bg-neon-cyan' : 'bg-gray-700'}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    </div>
);


const Header: React.FC<HeaderProps> = ({ user, onLogout, steps, currentStep, showProgressBar, onBackToChoices, showBackToChoicesButton }) => {
    const [modalContent, setModalContent] = useState<'about' | 'contact' | 'scope' | null>(null);

    const getModalTitle = () => {
        if (modalContent === 'about') return 'About RelieF.com';
        if (modalContent === 'contact') return 'Contact Us';
        if (modalContent === 'scope') return 'Future Scope';
        return '';
    };

    return (
        <>
        <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50 border-b border-neon-cyan/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                         <h1 className="text-2xl font-bold text-neon-cyan animate-pulse-neon">
                            RelieF.com
                        </h1>
                        <nav className="hidden md:flex items-center space-x-6 text-gray-300">
                             <button onClick={() => setModalContent('about')} className="hover:text-neon-cyan transition">About</button>
                             <button onClick={() => setModalContent('contact')} className="hover:text-neon-cyan transition">Contact</button>
                             <button onClick={() => setModalContent('scope')} className="hover:text-neon-cyan transition">Future Scope</button>
                         </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        {showBackToChoicesButton && (
                            <button onClick={onBackToChoices} className="px-3 py-1.5 text-sm font-semibold text-neon-cyan bg-transparent border border-neon-cyan rounded-md hover:bg-neon-cyan/10 transition">
                                &larr; Back to Choices
                            </button>
                        )}
                        <span className="text-gray-300 hidden sm:block">Welcome, {user.displayName || user.email}</span>
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 font-semibold text-neon-pink bg-transparent border-2 border-neon-pink rounded-md hover:bg-neon-pink hover:text-black transition-all transform hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                 {showProgressBar && currentStep < steps.length && (
                    <div className="py-4 hidden sm:block">
                        <ProgressBar steps={steps} currentStep={currentStep} />
                    </div>
                )}
            </div>
        </header>
        <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)} title={getModalTitle()}>
            {modalContent === 'about' && (
                <div className="space-y-4 text-gray-300">
                    <p>RelieF.com is a revolutionary platform designed to bridge the gap between individuals seeking mental and physical health support and the professionals who can provide it. Our mission is to create a seamless, calming, and user-friendly experience that empowers users to take control of their well-being.</p>
                    <p>We believe that finding the right help should be straightforward and stress-free. Our app guides you through a simple process: detail your needs, find a curated list of qualified doctors based on your location and budget, and schedule an appointment in just a few clicks. For those who just need to talk, our 'Friend Support' feature offers a safe space to share your thoughts and feelings.</p>
                </div>
            )}
             {modalContent === 'contact' && (
                <div className="space-y-4 text-gray-300">
                    <p>We are here to help you. If you have any questions, need support, or want to provide feedback, please don't hesitate to reach out.</p>
                    <p><strong>Support Hotline:</strong> <a href="tel:9410606636" className="text-neon-green hover:underline">9410606636</a></p>
                    <p><strong>Email:</strong> <a href="mailto:support@relief.com" className="text-neon-green hover:underline">support@relief.com</a></p>
                    <p>Our team is available to assist you with any concerns you may have regarding our services or your experience on the platform.</p>
                </div>
            )}
             {modalContent === 'scope' && (
                <div className="space-y-4 text-gray-300">
                    <p>Our vision for RelieF.com is to become an all-encompassing wellness hub. We are constantly working on new features to enhance your experience and provide more comprehensive support. Here's a glimpse of what's on the horizon:</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Real-time AI Health Assistant:</strong> An advanced chatbot powered by the latest Gemini models to provide instant, personalized health advice and guidance.</li>
                        <li><strong>Secure Telehealth Platform:</strong> Integrated video consultations, allowing you to connect with doctors directly through our app.</li>
                        <li><strong>Pharmacy & Lab Integration:</strong> Order prescribed medications and book lab tests from trusted partners, all within the RelieF.com ecosystem.</li>
                        <li><strong>Community Support Forums:</strong> Moderated, safe spaces for users to connect with others who have similar experiences and support each other.</li>
                         <li><strong>Wellness Tracking:</strong> Tools to monitor your mood, symptoms, and progress over time, providing valuable insights for you and your doctor.</li>
                    </ul>
                </div>
            )}
        </Modal>
        </>
    );
};

export default Header;
