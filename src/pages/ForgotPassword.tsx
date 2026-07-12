import React, { useState, type ChangeEvent, type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
		const BASE_URL = import.meta.env.VITE_API_BASE_URL;
		try {
			const response = await fetch(`${BASE_URL}/forgot-password`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: { email }
			});
		} catch (error) {
			const errorMessage = error instanceof Error ? error?.message : 'Something went wrong while requesting for password change.'
			console.error('Error while submitting the email.', error);
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}

		
		const response = await fetch(`${BASE_URL}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
		});

		if (!response.ok) { 
			asd
        }
	
	}
}
