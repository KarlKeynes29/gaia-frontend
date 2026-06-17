import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Login } from './pages/Login';

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
            }
        ]
    }
]);
