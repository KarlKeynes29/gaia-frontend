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

    const [registerParams, setIsRegisterParams] = useState({});
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
        setIsRegisterParams(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        // const baseUrl;

        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationDetails);
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error in submitting form details.');
        }

    }
    // return (

    // )
}
