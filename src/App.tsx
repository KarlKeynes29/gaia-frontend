import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Login } from './pages/Login';
import NavBar from './components/NavBar';

export const App: React.FC = () => {
    return (
        <AuthProvider>
			<ThemeProvider>
			    <NavBar />
                <Login />
            </ThemeProvider>
        </AuthProvider>
    );
};
