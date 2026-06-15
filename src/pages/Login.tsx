import React, { useState } from 'react';

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
    
	interface LoginResponse {
		token: string,
		role: string,
		id: string
	}
    
    const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
		console.log('Authentication payload:', loginDetails);
        
		try {
			// incomplete
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

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Authorization rejected.');
            }

			const data: LoginResponse = await response.json();
			localStorage.setItem('token', data?.token);
			
		} catch (error) {
            console.error('Error in authenticating...', error);
        }
    };

    return (
        <>
            <div className='login-container bg-primary'>
                <form onSubmit={handleFormSubmit} className='max-h-200 max-w-80 border-2'>
                    <div className='mt'>
                        <label htmlFor='identity'>Username or Email:</label>
						<input
							required
							id='identity'
							type='identity'
							name='identity'
							value={loginDetails.identity}
							onChange={handleInputChange}
							placeholder='Enter your email or username'
						/>
                    </div>
                    <div>
                        <label htmlFor='password-field'>Password</label>
						<input
							required
							id='password-field'
							name='password'
							type='password'
							value={loginDetails.password}
							onChange={handleInputChange}
							placeholder='********'
						/>
					</div>
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
}
