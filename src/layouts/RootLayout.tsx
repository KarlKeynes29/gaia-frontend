import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';

export const RootLayout: React.FC = () => {
    const location = useLocation();
    const hideNavPaths = ['/login', '/register', '/reset-password'];
    const shouldHideNavbar = hideNavPaths.includes(location.pathname);

    return (
        <>
            {!shouldHideNavbar && <NavBar />}
            <main className="app-main-content">
                <Outlet />
            </main>
        </>
    )
};
