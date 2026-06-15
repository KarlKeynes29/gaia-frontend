import React, { useState } from 'react';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
    <a
        href={href}
        className='text-text-muted hover:text-text-main font-sans text-sm font-medium tracking-wide transition-colors duration-200'
    >
        {children}
    </a>
);

export default function NavBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const [cartCount] = useState<number>(5);

    return (
        <nav className='sticky top-0 bg-surface border-b border-border p-3 sm:px-4'>
            <div className='max-w-7xl mx-auto flex items-center justify-between w-full'>
                <a
                    href='/'
                    className='text-text-muted font-medium text-sm font-heading'
                >
                    <span className='gaia-primary'>GAIA</span>
                </a>
                <div className='hidden md:flex items-center space-x-8'>
                    <NavLink href='/home'>Home</NavLink>
                    <NavLink href='/shop'>Marketplace</NavLink>
                    <NavLink href='/vault'>My Vault</NavLink>
                    <NavLink href='/support'>Support</NavLink>
				</div>

				<div className='flex md:hidden items-center'>
					<button
						onClick={() => setIsOpen(!isOpen)}
						type='button'
						className='p-2 w-10 h-10 text-text-muted hover:text-text-main focus:outline-none focus-visible:ring-accent round-sm focus-visible:2  transition-colors flex items-center justify-center cursor-pointer relative z-50'
						aria-label='Toggle Navigation Menu'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2.2}
							stroke='currentColor'
							className={`w-6 h-6 absolute transition-all duration-200 ${isOpen ? ' opacity-0 scale-100 rotate-90' : 'opacity-100 scale-scrollbar-thumb-lime-200 rotate-0'}`
							}
						>
							<path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
						</svg>
						<svg
					        className={`w-6 h-6 absolute duration-200 ease-in-out transform-2d ${
					            isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-90'
					        }`}
					        fill="none"
					        viewBox="0 0 24 24"
					        strokeWidth={2.2}
					        stroke="currentColor"
					    >
					        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
					    </svg>
					</button>
				</div>
            </div>
            <div
                className={`md:hidden transition-all duration-300 ease-in-out border-border bg-surface overflow-hidden
                ${isOpen ? 'max-h-60 opacity-100 border-t mt-3 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none border-t'}`}
            >
                <div className='flex flex-col space-y-1 py-1'>
                   	<a href='/home' className='mt-4 text-sm font-sans text-text-muted hover:text-text-main py-2.5 px-3 rounded hover:bg-bg transition-colors duration-200'>Home</a>
                    <a href='/shop' className='text-sm font-sans text-text-muted hover:text-text-main py-2.5 px-3 rounded hover:bg-bg transition-colors duration-200'>Marketplace</a>
                    <a href='/vault' className='text-sm font-sans text-text-muted hover:text-text-main py-2.5 px-3 rounded hover:bg-bg transition-colors duration-200'>My Vault</a>
                    <a href='/support' className='text-sm font-sans text-text-muted hover:text-text-main py-2.5 px-3 rounded hover:bg-bg transition-colors duration-200'>Support</a>
                </div>
            </div>
        </nav>
    )
}
