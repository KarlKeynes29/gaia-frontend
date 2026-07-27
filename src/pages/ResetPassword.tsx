import React, { useSearchParams, useNavigate, useState, type ChangeEvent } from 'react-router-dom';

interface ResetPasswordDetails {
    token: string | null;
    password: string | null;
}

export const ResetPasswordPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [resetPasswordDetails, setResetPasswordDetails] = useState<ResetPasswordDetails>({
        token: '',
        password: ''
    });

    const token = searchParams.get('token');
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResetPasswordDetails(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (

    )
}
