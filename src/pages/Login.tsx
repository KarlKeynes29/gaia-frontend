import React, { useState, type ChangeEvent, type SubmitEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ForgotPassword } from './ForgotPassword';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isShowForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [loginDetails, setLoginDetails]= useState({
        identity: '',
        password: ''
    });
    const containerRef = React.useRef<HTMLDivElement>(null);
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
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;

        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/login`, {
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

            const data: LoginResponse = await response?.json();
            localStorage.setItem('token', data.token);

            toast.success('Welcome back!');
            navigate('/home');
        } catch (error) {
            console.error('Error in authenticating...', error);
            const errorMessage = error instanceof Error ? error.message : 'Something happened while logging in...';
            setIsError(true);
            toast.error(errorMessage);
            setTimeout(() => {
                setIsError(false);
            }, 2000);
            setLoginDetails(prev => ({ ...prev, password: '' }));
            if (containerRef.current) {
                containerRef.current.classList.add('animate-shake');
                setTimeout(() => {
                    containerRef.current?.classList.remove('animate-shake');
                }, 300);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
       <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div
                ref={containerRef}
                className="login-container bg-surface w-full max-w-md h-105 p-8 border border-border rounded-xl shadow-[0_0_15px_rgba(50,27,99,0.5)] transition-all"
            >
                <h2 className={`text-3xl font-heading tracking-wide text-center mb-4 uppercase transform transition-all scale-100 duration-300 ${isError ? 'text-red-700 tracking-widest blur-[xs]' : 'text-primary tracking-wide blur-0'}`}>
                    {isError ? '☠️ Access Denied ☠️' : 'Enter Cyber Gaia'}
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="identity" className="text-xs mt-5 font-heading uppercase tracking-wider text-text-muted">
                            Player Identity
                        </label>
                        <input
                            required
                            disabled={isLoading}
                            id="identity"
                            type="text"
                            name="identity"
                            value={loginDetails.identity}
                            onChange={handleInputChange}
                            placeholder="Enter email or username"
                            className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main placeholder-text-muted/40 focus:outline-none focus:border-accent font-sans transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password-field" className="text-xs font-heading uppercase tracking-wider text-text-muted">
                            Passkey
                        </label>
                        <input
                            required
                            disabled={isLoading}
                            id="password-field"
                            name="password"
                            type="password"
                            value={loginDetails.password}
                            onChange={handleInputChange}
                            placeholder="********"
                            className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main placeholder-text-muted/40 focus:outline-none focus:border-accent font-sans transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 bg-primary hover:bg-primary/90 text-white font-heading font-bold uppercase tracking-widest py-3 px-6 rounded-lg shadow-[0_4px_0_#39ff14] active:translate-y-0.5 active:shadow-[0_2px_0_#39ff14] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                    >
                        {isLoading ? 'Verifying...' : 'Submit'}
                    </button>
                    <div className='flex flex-column'>
                        <a className='text-sm hover:text-text-muted active:text-text-accent' href='/register'>
                            Register an account
                        </a>
                        <button
                            type='button'
                            className='text-sm ml-auto not-target:hover:text-text-muted active:text-text-accent'
                            onClick={() => setShowForgotPasswordModal(true)}
                        >
                            Forgot your password?
                        </button>
                    </div>
                </form>
            </div>
            <ForgotPassword
                isOpen={isShowForgotPasswordModal}
                onClose={() => { setShowForgotPasswordModal(false) }}
            />
        </div>

    );
}
