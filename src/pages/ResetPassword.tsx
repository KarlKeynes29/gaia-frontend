import React, { useState, useEffect, type ChangeEvent, type SubmitEventHandler } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ResetPasswordDetails {
    token: string | '';
    password: string | '';
}

export const ResetPasswordPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);
    const [resetPasswordDetails, setResetPasswordDetails] = useState<ResetPasswordDetails>({
        token: '',
        password: ''
    });

	useEffect(() => {
		const token = searchParams.get('token');
		if (token) {
			setResetPasswordDetails(prev => ({ ...prev, token: token }));
		}
	}, [searchParams]);
    
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResetPasswordDetails((prev) => ({
            ...prev,
            [name]: value
        }));
	};

	const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const BASE_URL = process.env.VITE_API_BASE_URL;

		if (isLoading) return;
		setIsLoading(true);

		try {
			const response = await fetch(`${BASE_URL}/api/v1/reset-password`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					token: resetPasswordDetails.token,
					password: resetPasswordDetails.password
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Error while changing password.');	
			}

			toast.success('Password successfully changed!');
			
		} catch (error) {
			console.error('Error in changing password...', error);
			const errorMessage = error instanceof Error ? error.message : 'Something happened while resetting password...';
			toast.error(errorMessage);
		}
    }

    return (
		<div className=''>
			<h2>Reset your password</h2>
			<form>
				<div>
					<label className=''>New password:</label>
					<input required className='' name='password'></input>
				</div>
			</form>
		</div>
    )
}
