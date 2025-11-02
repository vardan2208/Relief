import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase'; 
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Spinner from './components/Spinner';
import Header from './components/Header';
import IntakeForm from './components/ProblemForm';
import DoctorSelection from './components/DoctorList';
import AppointmentBooking from './components/AppointmentScheduler';
import ChoicePage from './components/ChoicePage';
import FriendSupport from './components/FriendSupport';
import { IntakeData, Doctor, Appointment } from './types';

type AppPath = 'CHOICE' | 'DOCTOR_FLOW' | 'FRIEND_SUPPORT';
type DoctorFlowStep = 'INTAKE' | 'DOCTOR_SELECTION' | 'BOOKING' | 'DASHBOARD';

const Footer: React.FC = () => (
    <footer className="bg-gray-900 border-t border-neon-cyan/30 mt-12">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
            <p className="font-bold text-lg text-gray-200">RelieF.com</p>
            <p>Contact for support: <a href="tel:9410606636" className="font-semibold text-neon-green hover:underline">9410606636</a></p>
            <p className="text-sm mt-2">&copy; {new Date().getFullYear()} RelieF.com. All Rights Reserved.</p>
        </div>
    </footer>
);


const App: React.FC = () => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // New state for top-level navigation
    const [appPath, setAppPath] = useState<AppPath>('CHOICE');

    // State for the doctor booking flow
    const [doctorFlowStep, setDoctorFlowStep] = useState<DoctorFlowStep>('INTAKE');
    const [intakeData, setIntakeData] = useState<IntakeData | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                setAppPath('CHOICE'); // On login, always go to choice page
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth);
        resetDoctorFlow();
    };
    
    const resetDoctorFlow = () => {
        setDoctorFlowStep('INTAKE');
        setIntakeData(null);
        setSelectedDoctor(null);
        setConfirmedAppointment(null);
    };

    const handleBackToChoices = () => {
        resetDoctorFlow();
        setAppPath('CHOICE');
    };

    const handleIntakeSubmit = (data: IntakeData) => {
        setIntakeData(data);
        setDoctorFlowStep('DOCTOR_SELECTION');
    };

    const handleDoctorSelect = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setDoctorFlowStep('BOOKING');
    };

    const handleBookingConfirm = (appointmentDetails: Omit<Appointment, 'id' | 'userEmail'>) => {
        if (!user) return;
        const appointment: Appointment = {
            ...appointmentDetails,
            id: new Date().toISOString(),
            userEmail: user.email,
        };
        setConfirmedAppointment(appointment);
        console.log('SENDING APPOINTMENT TO ADMIN:', appointment);
        console.log('SENDING APPOINTMENT TO DOCTOR:', appointment.doctor.name, appointment.date, appointment.time);
        setDoctorFlowStep('DASHBOARD');
    };
    
    const handleSimulatedLogin = () => {
        setUser({
            email: 'facial_login@relief.com',
            displayName: 'Facial Recognition User'
        });
        setAppPath('CHOICE');
        setLoading(false);
    }

    const renderDoctorFlow = () => {
        if (!user) return null;
        switch (doctorFlowStep) {
            case 'INTAKE':
                return <IntakeForm user={user} onSubmit={handleIntakeSubmit} />;
            case 'DOCTOR_SELECTION':
                return <DoctorSelection intakeData={intakeData!} onSelectDoctor={handleDoctorSelect} onBack={() => setDoctorFlowStep('INTAKE')} />;
            case 'BOOKING':
                return <AppointmentBooking doctor={selectedDoctor!} onConfirm={handleBookingConfirm} onBack={() => setDoctorFlowStep('DOCTOR_SELECTION')} />;
            case 'DASHBOARD':
                return <Dashboard user={user} appointment={confirmedAppointment!} onBookAnother={() => { resetDoctorFlow(); setDoctorFlowStep('INTAKE'); }} />;
            default:
                return <IntakeForm user={user} onSubmit={handleIntakeSubmit} />;
        }
    };

    const renderContent = () => {
        if (!user) {
            return <Auth onSimulatedLogin={handleSimulatedLogin} />;
        }

        const doctorFlowSteps = ['Details', 'Find Doctor', 'Schedule', 'Confirm'];
        const currentDoctorStepIndex = doctorFlowStep === 'INTAKE' ? 0 : doctorFlowStep === 'DOCTOR_SELECTION' ? 1 : doctorFlowStep === 'BOOKING' ? 2 : 3;

        return (
            <div className="min-h-screen bg-black text-gray-200 font-sans flex flex-col">
                <Header 
                    user={user} 
                    onLogout={handleLogout} 
                    steps={doctorFlowSteps} 
                    currentStep={currentDoctorStepIndex}
                    showProgressBar={appPath === 'DOCTOR_FLOW'}
                    onBackToChoices={handleBackToChoices}
                    showBackToChoicesButton={appPath === 'DOCTOR_FLOW'}
                />
                <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
                    {appPath === 'CHOICE' && <ChoicePage onSelectDoctorFlow={() => setAppPath('DOCTOR_FLOW')} onSelectFriendSupport={() => setAppPath('FRIEND_SUPPORT')} />}
                    {appPath === 'DOCTOR_FLOW' && renderDoctorFlow()}
                    {appPath === 'FRIEND_SUPPORT' && <FriendSupport user={user} />}
                </main>
                <Footer />
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return renderContent();
};

export default App;
