
import React, { useState } from 'react';
import UploadIcon from './icons/UploadIcon';

interface MedicalHistoryUploaderProps {
    user: any;
}

const MedicalHistoryUploader: React.FC<MedicalHistoryUploaderProps> = ({ user }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setSuccess(false);
        }
    };

    const handleUpload = () => {
        if (!file) return;
        setUploading(true);
        // Simulate upload
        setTimeout(() => {
            setUploading(false);
            setSuccess(true);
            console.log(`Uploading ${file.name} for user ${user.email}`);
            setFile(null);
            setTimeout(() => setSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-800 shadow-inner">
            <h2 className="text-2xl font-bold mb-4 text-neon-cyan flex items-center gap-2"><UploadIcon /> Medical History</h2>
            <div className="space-y-4">
                <p className="text-sm text-gray-400">Upload documents related to your health issues (e.g., diabetes, past diagnoses).</p>
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                        </div>
                        <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                </div> 
                {file && <p className="text-center text-neon-cyan">Selected: {file.name}</p>}
                <button 
                    onClick={handleUpload} 
                    disabled={!file || uploading}
                    className="w-full py-2 font-bold text-black bg-neon-cyan rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {uploading ? 'Uploading...' : success ? 'Uploaded!' : 'Upload Document'}
                </button>
            </div>
        </div>
    );
};

export default MedicalHistoryUploader;
