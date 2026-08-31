import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Login, Register, ResetPasswordPage, HomePage } from './pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
			},
			{
                path: 'reset-password',
                element: <ResetPasswordPage />
            },
            {
                path: 'home',
                element: <HomePage />
            },
            // {
            //     path: 'marketplace',
            //     element: <Marketplace />
            // },
            // {
            //     path: 'my-vault',
            //     element: <MyVault />
            // },
            // {
            //     path: 'support',
            //     element: <Support />
            // }
        ]
    }
]);
