import React, { useState } from 'react';
import { useGaiaTheme } from '../context/ThemeContext';

export const Login: React.FC = () => {
    const [loginDetails, setLoginDetails] = useState({
        identity: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Authentication payload:', loginDetails);
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: loginDetails.identity,
                    password: loginDetails.password
                })
            });

            const { data } = response?.data;
        } catch (error) {
            console.error('Error in authenticating...', error);
        }
    };

    return (
        <>
            <div className='login-container bg-primary'>
                <form onSubmit={handleFormSubmit} className='max-h-200 max-w-80 border-2'>
                    <div className='mt'>
                        <label htmlFor=''>Username or Email:</label>
                        <input type='text'></input>
                    </div>
                    <div>
                        <label htmlFor=''>Password</label>
                        <input type='text'></input>
                    </div>
                </form>
            </div>
        </>
    )
}
