import React, { useContext, useState } from 'react';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
    <a
        href={href}
        className='text-text-muted hover:text-text-main font-sans'
    >
        {children}
    </a>
);

export default function NavBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartCount] = useState<number>(5);

    return (
        <nav className='bg-surface border-b border-border'>
            <div className='max-w-7xl mx-auto flex items-center justify-between'>
                <a
                    href='/'
                    className='text-gaia-stone hover:text-gaia-charcoal font-medium text-sm font-heading transition-colors duration-150 tracking-wide'
                >
                    GAIA<span className='text-primary'>.</span>STORE
                </a>
                <div className='hidden md:flex items-center space-x-8'>
                    <NavLink href='/home'>Home</NavLink>
                    <NavLink href='/shop'>Marketplace</NavLink>
                    <NavLink href='/vault'>My Vault</NavLink>
                    <NavLink href='/support'>Support</NavLink>
                </div>
            </div>
        </nav>
    )
}
