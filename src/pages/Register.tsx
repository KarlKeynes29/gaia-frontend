import React, { useState, type ChangeEvent, type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
    };

    const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...registrationDetails,
                    middleName: registrationDetails.middleName?.trim(),
                    birthday: registrationDetails.birthday,
                    phoneNumber: registrationDetails.phoneNumber?.trim(),
                    address: registrationDetails.address?.trim(),
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error in submitting form details.');
            }

            toast.success("Registration Successful!");
            setTimeout(() => navigate('/login'), 300)
        } catch (error) {
            console.error('Error while registering user details:', error);
            const errorMessage = error instanceof Error ? error.message : 'Something went wrong during registration...';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="my-8 bg-surface w-full max-w-2xl min-h-fit p-8 border border-border rounded shadow-[0_0_15px_rgba(50,27,99,0.5)] transition-all">
            <div className='text-center mb-6'>
                <h1 className='text-2xl font-heading text-primary'>Register an account</h1>
            </div>
            <form className='flex flex-col gap-5' onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className='flex flex-col gap-2'>
                        <label className="text-xs font-heading uppercase tracking-wider text-text-muted" htmlFor='username'>Username:</label>
                        <input
                            className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent'
                            name='username'
                            value={registrationDetails.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className="text-xs font-heading uppercase tracking-wider text-text-muted" htmlFor='password'>Password:</label>
                        <input
                            className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent'
                            name='password'
                            type="password"
                            autoComplete="new-password"
                            value={registrationDetails.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className='flex flex-col gap-2'>
                        <label className="text-xs font-heading uppercase tracking-wider text-text-muted" htmlFor='firstName'>First Name:</label>
                        <input
                            className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent'
                            name='firstName'
                            value={registrationDetails.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className="text-xs font-heading uppercase tracking-wider text-text-muted" htmlFor='middleName'>Middle Name:</label>
                        <input
                            className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent'
                            name='middleName'
                            value={registrationDetails.middleName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className="text-xs font-heading uppercase tracking-wider text-text-muted" htmlFor='lastName'>Last Name:</label>
                        <input
                            className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent'
                            name='lastName'
                            value={registrationDetails.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className='flex flex-col gap-2'>
                        <label className="text-xs font-heading uppercase tracking-wider text-text-muted" htmlFor='email'>Email:</label>
                        <input
                            className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent'
                            name='email'
                            type="email"
                            value={registrationDetails.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className="text-xs font-heading uppercase tracking-wider text-text-muted" htmlFor='phoneNumber'>Phone Number:</label>
                        <input
                            className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent'
                            name='phoneNumber'
                            value={registrationDetails.phoneNumber || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className='flex flex-col gap-2 sm:col-span-1'>
                        <label className="text-xs font-heading uppercase tracking-wider text-text-muted" htmlFor='birthday'>Birthday:</label>
                        <input
                            className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent'
                            name='birthday'
                            type="date"
                            value={registrationDetails.birthday || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 sm:col-span-2'>
                        <label className="text-xs font-heading uppercase tracking-wider text-text-muted" htmlFor='address'>Address:</label>
                        <input
                            className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent'
                            name='address'
                            value={registrationDetails.address || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between mt-4 pt-4 border-t border-border'>
                    <a className='text-sm text-text-muted hover:text-primary transition-colors' href='/login'>Already have an account?</a>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className='border border-border rounded-lg px-5 py-2 hover:bg-surface-variant disabled:opacity-50 transition-all cursor-pointer'
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};
