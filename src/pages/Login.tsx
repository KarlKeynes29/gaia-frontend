import React, { useState, type ChangeEvent, type SubmitEventHandler } from 'react';

export const Login: React.FC = () => {
    const [loginDetails, setLoginDetails] = useState({
        identity: '',
        password: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginDetails(prev => ({
            ...prev,
            [name]: value
        }));
	};

	interface LoginResponse {
        token: string;
        user: {
            id: string;
            email: string;
            role: string;
        }
	}

    const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

		console.log('Authentication payload:', loginDetails);

		try {
			// incomplete
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identity: loginDetails.identity,
                    password: loginDetails.password
                })
            });

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Authorization rejected.');
            }

			const data: LoginResponse = await response.json();
			localStorage.setItem('token', data.token);
			console.log(`Authorization cleared! Welcome back.`);
		} catch (error) {
            console.error('Error in authenticating...', error);
        }
    };

    // interface baseShape<specificData> {
    //     id: string,
    //     role: string,
    //     bundledData: specificData
    // }

    return (
        <>
            <div className='login-container bg-primary'>
                <form onSubmit={handleFormSubmit} className='max-h-200 max-w-80 border-2'>
                    <div className='mt'>
                        <label htmlFor='identity'>Username or Email:</label>
						<input
							required
							id='identity'
							type='text'
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
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}
