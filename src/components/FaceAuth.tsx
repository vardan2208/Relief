import React, { useState, useRef, useEffect } from 'react';
import Spinner from './Spinner';

interface FaceAuthProps {
    onBack: () => void;
    onAuthenticated: () => void;
}

const FaceAuth: React.FC<FaceAuthProps> = ({ onBack, onAuthenticated }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mode, setMode] = useState<'register' | 'login'>('login');
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError('Could not access camera. Please check permissions and try again.');
            } finally {
                setLoading(false);
            }
        };
        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const captureFace = (): string | null => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                return canvasRef.current.toDataURL('image/jpeg');
            }
        }
        return null;
    };

    const handleRegister = () => {
        setFeedback('Scanning...');
        setTimeout(() => {
            const imageData = captureFace();
            if (imageData) {
                localStorage.setItem('faceAuthImage', imageData);
                setFeedback('✅ Face registered successfully! You can now use it to log in.');
            } else {
                setFeedback('❌ Could not capture face. Please try again.');
            }
        }, 1000);
    };

    const handleLogin = () => {
        setFeedback('Scanning...');
        setTimeout(() => {
            const currentImageData = captureFace();
            const storedImageData = localStorage.getItem('faceAuthImage');
            if (!storedImageData) {
                setFeedback('No face registered. Please register your face first.');
                return;
            }
            if (currentImageData && storedImageData) {
                // This is a simple simulation. Real face matching is far more complex.
                // For this demo, we'll just check if a face was captured.
                setFeedback('✅ Match found! Logging you in...');
                setTimeout(onAuthenticated, 1500);
            } else {
                setFeedback('❌ Could not capture face. Please try again.');
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-md p-8 space-y-4 bg-gray-900 rounded-lg border border-neon-green shadow-lg shadow-neon-green/20">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-center text-gray-200">Face Authentication</h2>
                    <button onClick={onBack} className="font-semibold text-neon-cyan hover:underline text-sm">&larr; Back</button>
                </div>

                <div className="w-full aspect-square bg-gray-800 rounded-md overflow-hidden relative flex items-center justify-center">
                    {loading && <Spinner />}
                    {error && <p className="text-center text-red-400 p-4">{error}</p>}
                    <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover transform -scale-x-100 ${loading || error ? 'hidden' : ''}`} />
                    <canvas ref={canvasRef} className="hidden" />
                </div>
                
                <div className="p-2 bg-yellow-900/50 border border-yellow-500 rounded-md text-center text-yellow-300 text-xs">
                    <strong>Disclaimer:</strong> This is a feature demonstration. It does not perform real facial recognition and is not secure for production use.
                </div>

                {feedback && <p className="text-center text-neon-green bg-gray-800 p-2 rounded">{feedback}</p>}

                <div className="flex space-x-2">
                    <button onClick={() => { setMode('login'); setFeedback('') }} className={`w-full py-2 font-bold rounded-md transition ${mode === 'login' ? 'bg-neon-green text-black' : 'bg-gray-700 text-gray-300'}`}>Login</button>
                    <button onClick={() => { setMode('register'); setFeedback('') }} className={`w-full py-2 font-bold rounded-md transition ${mode === 'register' ? 'bg-neon-green text-black' : 'bg-gray-700 text-gray-300'}`}>Register Face</button>
                </div>

                {mode === 'login' ? (
                    <button onClick={handleLogin} disabled={loading || !!error} className="w-full py-3 font-bold text-black bg-neon-green rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-md shadow-neon-green/30 disabled:bg-gray-600 disabled:cursor-not-allowed">
                        Scan to Login
                    </button>
                ) : (
                    <button onClick={handleRegister} disabled={loading || !!error} className="w-full py-3 font-bold text-black bg-neon-green rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-md shadow-neon-green/30 disabled:bg-gray-600 disabled:cursor-not-allowed">
                        Scan and Save Face
                    </button>
                )}
            </div>
        </div>
    );
};

export default FaceAuth;
