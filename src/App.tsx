import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export const App: React.FC = () => {
	return (
		<>
			<Toaster
		        position="top-right"
		        reverseOrder={false}
		        toastOptions={{
		          style: {
		            background: '#333',
		            color: '#fff',
		            borderRadius: '8px',
		          }
		        }}
	        />
	        <AuthProvider>
				<ThemeProvider>
	                <RouterProvider router={router} />
	            </ThemeProvider>
	        </AuthProvider>
		</>

    );
};
