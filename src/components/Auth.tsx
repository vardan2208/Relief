import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import FaceAuth from './FaceAuth';

interface AuthProps {
    onSimulatedLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSimulatedLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showFaceAuth, setShowFaceAuth] = useState(false);

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err: any) {
            setError(err.message);
        }
    };
    
    const handleGoogleSignIn = async () => {
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (showFaceAuth) {
        return <FaceAuth onBack={() => setShowFaceAuth(false)} onAuthenticated={onSimulatedLogin} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg border border-neon-cyan shadow-lg shadow-neon-cyan/20">
                <h1 className="text-4xl font-bold text-center text-neon-cyan animate-pulse-neon">
                    RelieF.com
                </h1>
                <h2 className="text-2xl font-bold text-center text-gray-200">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                
                {error && <p className="text-center text-red-500 bg-red-900/50 p-2 rounded">{error}</p>}
                
                <form onSubmit={handleAuthAction} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-gray-400 block">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 text-gray-200 bg-gray-800 border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"  className="text-sm font-bold text-gray-400 block">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 text-gray-200 bg-gray-800 border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan transition"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 font-bold text-black bg-neon-cyan rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-md shadow-neon-cyan/30">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                 <div className="relative flex items-center justify-center">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-400">Or</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                 <button onClick={() => setShowFaceAuth(true)} className="w-full flex items-center justify-center py-3 font-bold text-neon-green bg-transparent border-2 border-neon-green rounded-md hover:bg-neon-green hover:text-black transition-all transform hover:scale-105 shadow-md shadow-neon-green/30">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5c2.25 0 4.21.82 5.67 2.18a.75.75 0 01-1.06 1.06A5.5 5.5 0 0012 6.5a5.5 5.5 0 00-4.61 1.74.75.75 0 11-1.06-1.06A7 7 0 0112 4.5zM3.75 9.75a.75.75 0 011.06 0 5.5 5.5 0 007.88 0 .75.75 0 011.06 0 7 7 0 01-9.9 0 .75.75 0 010-1.06zM20.25 9.75a.75.75 0 010 1.06 7 7 0 01-9.9 0 .75.75 0 011.06 0 5.5 5.5 0 007.88 0 .75.75 0 011.06 0zM12 14.25a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01a.75.75 0 01.75-.75zM12 19.5a4.5 4.5 0 01-4.5-4.5h9a4.5 4.5 0 01-4.5 4.5z" /></svg>
                    Login with Face
                </button>

                <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center py-3 font-bold text-neon-pink bg-transparent border-2 border-neon-pink rounded-md hover:bg-neon-pink hover:text-black transition-all transform hover:scale-105 shadow-md shadow-neon-pink/30">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691c-1.328 2.222-2.131 4.823-2.131 7.618s.803 5.396 2.131 7.618l5.657-5.657C11.453 25.025 11 24.541 11 24c0-.541.453-1.025.962-1.948l-5.657-5.657z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-5.657-5.657c-1.556 1.03-3.46 1.655-5.591 1.655c-4.239 0-7.85-2.583-9.356-6.154l-5.657 5.657C9.033 39.522 15.93 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083L43.595 20H24v8h11.303a10.043 10.043 0 01-1.426 3.636l5.657 5.657C42.863 32.426 44 28.561 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                    Sign in with Google
                </button>
                
                <p className="text-center">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-neon-cyan hover:underline ml-2">
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;