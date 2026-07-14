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

    return (
        <>
            <div className='w-100 border border-border rounded my-8 min-h-fit p-8 transition-all shadow-[0_0_15px_rgba(50,27,99,0.5)]'>
                <h2 className='text-center'>Forgot your password?</h2>
                <form onSubmit={handleFormSubmit}>
                    <label className='text-xs font-heading uppercase tracking-wider text-text-muted'>Email:</label>
                    <input className='w-full' onChange={handleInputChange}></input>
                    <button type='button'>{isLoading ? 'Transmitting...' : 'Verify'}</button>
                </form>
            </div>
        </>
    )
}
