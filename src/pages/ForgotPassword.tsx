import React, { useState, type ChangeEvent, type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;

        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error processing request.')
            }

            toast.success('Recovery instructions initialized.');
            navigate('/login');
        } catch (error) {
            console.error('Error while executing recovery sequence:', error);
            const errorMessage = error instanceof Error ? error.message : 'Something happened while request was being processed.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }
// bg-black/75 backdrop-blur-md
    return (
        <>
            <div className='fixed inset-0 z-50 w-full flex items-center justify-center bg-black/1 backdrop-blur-md p-4'>
                <div className='w-110 bg-surface border border-border rounded-lg my-8 p-8'>
                    <div className='flex justify-between mb-3'>
                        <h2 className='text-center'>Forgot your password?</h2>
                        <button className='hover:text-accent transition-colors text-2xl leading-none' onClick={onClose}>&times;</button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className='flex justify-between p-2'>
                            <label className='text-xs font-heading uppercase tracking-wider text-text-muted'>Email:</label>
                            <p className='text-xs'>Enter your email so we can verify!</p>
                        </div>
                        <input
                            className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent font-sans transition-colors'
                            onChange={handleInputChange}
                        ></input>
                        <div className='flex justify-end items-center'>
                            <button
                                className='text-sm font-sans text-text-main  hover:text-text-muted cursor-pointer transition-colors p-2 mt-3'
                                type='button'
                                onClick={onClose}
                            >Cancel</button>
                            <button
                                className='ml-49 w-45 mt-4 bg-primary hover:bg-primary/90 hover:text-text-muted rounded-lg shadow-[0_4px_0_#39ff14] active:translate-y-0.5 active:shadow-[0_2px_0_#39ff14] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-accent'
                                // onClick={handleFormSubmit}
                                type='button'
                            >{isLoading ? 'Transmitting...' : 'Verify'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
