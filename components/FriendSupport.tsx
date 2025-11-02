import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';

interface FriendSupportProps {
    user: any;
}

const FriendSupport: React.FC<FriendSupportProps> = ({ user }) => {
    const [name, setName] = useState(user.displayName || '');
    const [problemType, setProblemType] = useState('relationship');
    const [problemDescription, setProblemDescription] = useState('');
    const [wantsCall, setWantsCall] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showQuiz, setShowQuiz] = useState(false);
    
    // State for quiz answers
    const [cryDate, setCryDate] = useState('');
    const [lastTrip, setLastTrip] = useState('');
    const [sleepSchedule, setSleepSchedule] = useState('');
    const [hopelessFeeling, setHopelessFeeling] = useState('');
    const [happyFeeling, setHappyFeeling] = useState('');

    const handleQuizSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // The values are already in state, which will be submitted by the hidden fields.
        setShowQuiz(false); // Close the quiz after submitting
    };

    const QuizForm = () => (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg border border-neon-green shadow-lg shadow-neon-green/20">
                <h3 className="text-2xl font-bold text-neon-green mb-4">Take the Quiz</h3>
                <form onSubmit={handleQuizSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">1. When was the last time you cried?</label>
                        <input type="text" value={cryDate} onChange={e => setCryDate(e.target.value)} className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-green focus:border-neon-green" />
                    </div>
                     <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">2. When was the last time you traveled for fun?</label>
                        <input type="text" value={lastTrip} onChange={e => setLastTrip(e.target.value)} className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-green focus:border-neon-green" />
                    </div>
                     <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">3. How is your sleep schedule?</label>
                        <input type="text" value={sleepSchedule} onChange={e => setSleepSchedule(e.target.value)} className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-green focus:border-neon-green" />
                    </div>
                     <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">4. How often do you feel hopeless?</label>
                        <input type="text" value={hopelessFeeling} onChange={e => setHopelessFeeling(e.target.value)} className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-green focus:border-neon-green" />
                    </div>
                     <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">5. When was the last time you felt truly happy?</label>
                        <input type="text" value={happyFeeling} onChange={e => setHappyFeeling(e.target.value)} className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-green focus:border-neon-green" />
                    </div>
                    <div className="flex justify-end space-x-4 pt-2">
                        <button type="button" onClick={() => setShowQuiz(false)} className="px-4 py-2 font-semibold text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition">Back to Form</button>
                        <button type="submit" className="px-4 py-2 font-bold text-black bg-neon-green rounded-md hover:bg-opacity-90 transition">Submit Quiz</button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="p-8 bg-gray-900 rounded-lg border border-gray-800 shadow-inner max-w-3xl mx-auto relative">
             <h2 className="text-3xl font-bold mb-2 text-neon-green">Share What's on Your Mind</h2>
             <p className="text-gray-400 mb-6">You're not alone. Share your concerns, and let us help you find a way forward. A real person will read your submission and get back to you.</p>
             
            <div className="absolute top-8 right-8 text-center">
                <p className="text-sm text-gray-400 mb-2">Want to reflect?</p>
                <button type="button" onClick={() => setShowQuiz(true)} className="px-4 py-2 text-sm font-bold text-black bg-neon-green rounded-md hover:bg-opacity-90 transition">
                    Take a Quiz
                </button>
            </div>
             
             <form action="https://formspree.io/f/xovqrpeo" method="POST" className="space-y-6 pt-8">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">Name</label>
                        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-green focus:border-neon-green" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-400 block mb-1">Email</label>
                        <input type="email" name="email" value={user.email} readOnly className="w-full bg-gray-700 border-gray-600 rounded p-2 text-gray-400 cursor-not-allowed" />
                    </div>
                 </div>
                 
                 <div>
                    <label className="text-sm font-bold text-gray-400 block mb-1">Select Problem Type</label>
                    <select name="problemType" value={problemType} onChange={e => setProblemType(e.target.value)} className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-green focus:border-neon-green">
                        <option value="relationship">Relationship Problem</option>
                        <option value="career">Career Problem</option>
                        <option value="financial">Financial Problem</option>
                        <option value="loneliness">Feeling Lonely</option>
                        <option value="general">Something Else</option>
                    </select>
                 </div>

                 <div>
                    <label className="text-sm font-bold text-gray-400 block mb-1">Describe your problem</label>
                    <textarea name="problem" value={problemDescription} onChange={e => setProblemDescription(e.target.value)} required rows={5} className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-green focus:border-neon-green"></textarea>
                 </div>
                 
                 <div>
                     <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" name="callAssistance" checked={wantsCall} onChange={e => setWantsCall(e.target.checked)} className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-neon-green focus:ring-neon-green" />
                        <span className="text-gray-300">Do you need call assistance?</span>
                     </label>
                     {wantsCall && (
                         <div className="mt-4">
                            <label className="text-sm font-bold text-gray-400 block mb-1">Phone Number</label>
                            <input type="tel" name="phone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-green focus:border-neon-green" />
                         </div>
                     )}
                 </div>

                {/* Hidden fields to store quiz responses for form submission */}
                <input type="hidden" name="cryDate" value={cryDate} />
                <input type="hidden" name="lastTrip" value={lastTrip} />
                <input type="hidden" name="sleepSchedule" value={sleepSchedule} />
                <input type="hidden" name="hopelessFeeling" value={hopelessFeeling} />
                <input type="hidden" name="happyFeeling" value={happyFeeling} />
                 
                 <button type="submit" className="w-full py-3 font-bold text-black bg-neon-green rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-lg shadow-neon-green/20">
                     Submit Securely
                 </button>
             </form>

             {showQuiz && <QuizForm />}
        </div>
    );
};

export default FriendSupport;