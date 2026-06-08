import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Login } from './pages/Login';

export const App: React.FC = () => {
    return (
        <AuthProvider>
			<ThemeProvider>
				
                <Login />
            </ThemeProvider>
        </AuthProvider>
    );
};
