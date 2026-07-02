import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export const App: React.FC = () => {
    return (
        <AuthProvider>
			<ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    );
};
