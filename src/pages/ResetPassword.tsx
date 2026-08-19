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
			const response = await fetch(`${BASE_URL}/reset-password`, {
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
            console.error('Error in changing password...', error);
            const errorMessage = error instanceof Error ? error.message : 'Something happened while changing your processing request...';
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
		<div className='mx-auto mt-35 my-auto bg-surface h-80 w-145 min-w-fit p-8 border border-border rounded shadow-[0_0_15px_rgba(50,27,99,0.5)] transition-all'>
			<h2 className='text-center'>Reset your password</h2>
			<form onSubmit={handleSubmit}>
				<div className='mt-3'>
					<div className='flex justify-between p-2'>
						<label className='text-xs font-heading uppercase tracking-wider text-text-muted gap-5'>New password:</label>
						<p className='text-xs'>Please enter your new password to gain access to Gaia!</p>
					</div>
					<input
						required
						type='password'
						className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent font-sans transition-colors'
						name='password'
						value={resetPasswordDetails.password}
						onChange={handleInputChange}
					></input>
				</div>
				<div className='my-2'>
					<label className='text-xs font-heading uppercase tracking-wide text-text-muted p-2 mb-3'>Confirm password:</label>
					<input
						required
						type='password'
						className='w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent'
						name='confirmPassword'
						value={resetPasswordDetails.confirmPassword}
						onChange={handleInputChange}
					></input>
				</div>
				<div className='flex flex-row justify-between'>
					<button
						type='button'
	                    className='text-sm font-sans text-text-main  hover:text-text-muted cursor-pointer transition-colors p-2 mt-3'
	                    onClick={() => navigate('/login')}
					>
						Cancel
				</button>
					<button
						type='submit'
                    className='w-50 max-h-9 mt-4 bg-primary hover:bg-primary/90 rounded-lg shadow-[0_4px_0_#39ff14] active:translate-y-0.5 active:shadow-[0_2px_0_#39ff14] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-accent'
                >
                	{isLoading ? 'Transmitting...' : 'Reset'}
                </button>
				</div>
			</form>
		</div>
    )
}
