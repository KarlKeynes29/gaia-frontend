import React, { useState, type ChangeEvent, type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {

    interface RegisterInterface {
        username: string;
        password: string;
        firstName: string;
        middleName?: string | null;
        lastName: string;
        email: string;
        birthday?: string | null;
        phoneNumber?: string | null;
        address?: string | null;
        role: 'USER' | 'ADMIN';
    }

    const [isLoading, setIsLoading] = useState(false);
    const [registrationDetails, setIsRegistrationDetails] = useState<RegisterInterface>({
        username: '',
        password: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        birthday: '',
        phoneNumber: '',
        address: '',
        role: 'USER'
    });

    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIsRegistrationDetails(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationDetails)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error in submitting form details.');
            }

            navigate('/login');
        } catch (error) {
            console.error('Error while registering user details:', error);
        } finally {
            setIsLoading(false);
        }
    };

        // username: '',
        // password: '',
        // firstName: '',
        // middleName: '',
        // lastName: '',
        // email: '',
        // birthday: '',
        // phoneNumber: '',
        // address: '',
        // role: 'USER'
    return (
    <div className='bg-surface w-full max-w-md h-105 p-8 border border-border rounded-xl shadow-[0_0_15px_rgba(50,27,99,0.5)] transition-all ${isError ? animate-shake : ''}'>
        <form className='flex' onSubmit={handleFormSubmit}>
            <label htmlFor='username'>Username:</label>
            <input name='username' required></input>
            <label htmlFor='password'>Password:</label>
            <input name='password' required></input>
            <label htmlFor='firstname'>First Name:</label>
            <input name='firstname' required></input>
            <label htmlFor='middlename'>Middle Name:</label>
            <input name='middlename'></input>
            <label htmlFor='lastname'>Last Name:</label>
            <input name='lastname'></input>
            <label htmlFor='email'>Email:</label>
            <input name='email'></input>
            <label htmlFor='birthday'>Birthday:</label>
            <input name='birthday'></input>
            <label htmlFor='phonenumber'>Phone Number:</label>
            <input name='phonenumber'></input>
            <label htmlFor='address'>Address:</label>
            <input name='address'></input>
        </form>
    </div>

    )
}
