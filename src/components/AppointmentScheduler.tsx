import React, { useState, useMemo } from 'react';
import { Doctor, Appointment } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import Spinner from './Spinner';

interface AppointmentBookingProps {
    doctor: Doctor;
    onConfirm: (details: Omit<Appointment, 'id' | 'userEmail'>) => void;
    onBack: () => void;
}

// Helper to get available time slots for a given day (simulated)
const getAvailableSlots = (date: Date): string[] => {
    const day = date.getDay();
    const standardSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
    ];
    if (day === 0 || day === 6) return []; // No weekends
    // Simulate some booked slots
    const dateSeed = date.getDate();
    return standardSlots.filter((_, index) => (dateSeed + index) % 3 !== 0);
};

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ doctor, onConfirm, onBack }) => {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isPaying, setIsPaying] = useState(false);

    const availableSlots = useMemo(() => {
        // new Date() has timezone issues, adding T00:00:00 ensures it's parsed as local time
        return getAvailableSlots(new Date(`${selectedDate}T00:00:00`));
    }, [selectedDate]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        setSelectedTime(null); // Reset time when date changes
    };

    const handlePayment = () => {
        if (!selectedDate || !selectedTime) return;
        setIsPaying(true);
        // Simulate payment processing
        setTimeout(() => {
            onConfirm({ doctor, date: selectedDate, time: selectedTime });
        }, 2000);
    };

    return (
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 shadow-inner max-w-3xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-neon-pink">Schedule Your Appointment</h2>
                <button onClick={onBack} className="font-semibold text-neon-cyan hover:underline">
                    &larr; Change Doctor
                </button>
            </div>

            <div className="p-4 bg-gray-800/50 border border-neon-pink/30 rounded-lg space-y-2 mb-6">
                <p className="text-xl font-bold text-white">With: {doctor.name}</p>
                <p className="text-gray-400">{doctor.experience} | {doctor.location}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold text-lg text-gray-200 mb-2">1. Select a Date</h3>
                    <input type="date" value={selectedDate} min={today} onChange={handleDateChange} className="w-full bg-gray-800 border-gray-700 rounded p-2 focus:ring-neon-pink focus:border-neon-pink" />
                </div>
                 <div>
                    <h3 className="font-semibold text-lg text-gray-200 mb-2">2. Select a Time</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableSlots.length > 0 ? availableSlots.map(time => (
                            <button 
                                key={time} 
                                onClick={() => setSelectedTime(time)}
                                className={`p-2 rounded text-xs font-semibold transition ${selectedTime === time ? 'bg-neon-pink text-black' : 'bg-gray-800 hover:bg-gray-700'}`}
                            >
                                {time}
                            </button>
                        )) : <p className="text-sm text-gray-500 col-span-full text-center">No slots available.</p>}
                    </div>
                </div>
            </div>

            {selectedTime && (
                <div className="mt-8 border-t-2 border-dashed border-gray-700 pt-6">
                     <h3 className="font-semibold text-lg text-gray-200 mb-4 text-center">3. Confirm and Pay</h3>
                     <div className="p-4 bg-gray-800 rounded-lg text-center mb-4">
                        <p className="font-bold text-white">You are booking an appointment with {doctor.name}</p>
                        <p className="text-lg text-neon-pink">{new Date(`${selectedDate}T00:00:00`).toDateString()} at {selectedTime}</p>
                        <p className="text-lg font-bold mt-2">Price: {doctor.priceRange}</p>
                     </div>
                     <button 
                        onClick={handlePayment} 
                        disabled={isPaying}
                        className="w-full py-3 font-bold text-black bg-neon-pink rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                         {isPaying ? <><Spinner /> <span className="ml-2">Processing...</span></> : 'Confirm & Pay'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AppointmentBooking;