import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

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
                path: 'home',
                element: <Home />
            },
            {
                path: 'marketplace',
                element: <Marketplace />
            },
            {
                path: 'my-vault',
                element: <MyVault />
            },
            {
                path: 'support',
                element: <Support />
            }
        ]
    }
]);
