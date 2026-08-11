import React, { useState, type ChangeEvent, type SubmitEventHandler } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ResetPasswordDetails {
	password: string;
	confirmPassword: string;
}

export const ResetPasswordPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);
	const token = searchParams.get('token') || '';
	const [resetPasswordDetails, setResetPasswordDetails] = useState<ResetPasswordDetails>({
		password: '',
		confirmPassword: ''
	});

    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResetPasswordDetails((prev) => ({
            ...prev,
            [name]: value
        }));
	};

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		if (!token) {
	        toast.error('Invalid or missing reset token.');
	        return;
		}

		const BASE_URL = import.meta.env.VITE_API_BASE_URL;

		if (isLoading) return;
		setIsLoading(true);

		try {
			const response = await fetch(`${BASE_URL}/api/v1/reset-password`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					token: token,
					password: resetPasswordDetails.password
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Error while changing password.');
			}

			toast.success('Password successfully changed!');
		} catch (error) {
			const response = 
            console.error('Error in changing password...', error);
            // ? error.message : 'Something happened while resetting password...';
            const errorMessage = error instanceof Error ? error.message : 'Something happened...';
            // let contentType = response.headers.get('content-type');
            // let errorMessage;
            // if (error instanceof Error && contentType.includes('')) {
            // }
			toast.error(errorMessage);
		} finally {
			setTimeout(() => { setIsLoading(false) }, 400);
		}
    }

    return (
		<div className='bg-surface p-8 min-h-fit'>
			<h2 className='text-left'>Reset your password</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label className='text-xs font-heading uppercase tracking-wider text-text-muted'>New password:</label>
					<input
						required
						type='password'
						className=''
						name='password'
						value={resetPasswordDetails.password}
						onChange={handleInputChange}
					></input>
				</div>
				<div>
					<label className='text-xs font-heading uppercase tracking-wide text-text-muted'>Confirm password:</label>
					<input
						required
						type='password'
						className=''
						name='confirmPassword'
						value={resetPasswordDetails.confirmPassword}
						onChange={handleInputChange}
					></input>
				</div>
				<button
					type='submit'
                    className='ml-49 w-45 mt-4 bg-primary hover:bg-primary/90 hover:text-text-muted rounded-lg shadow-[0_4px_0_#39ff14] active:translate-y-0.5 active:shadow-[0_2px_0_#39ff14] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-accent'
                >
                	{isLoading ? 'Transmitting...' : 'Reset'}
                </button>
			</form>
		</div>
    )
}
