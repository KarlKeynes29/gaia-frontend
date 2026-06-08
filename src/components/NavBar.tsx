import React, { useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';

interface NavLinksProps {
	href: string;
	children: React.ReactNode;
}

const NavLink: React.FC<NavLinksProps> = ({ href, children }) => (
	<a
		href={href}
		className='text-text-muted hover:text-text-main font-sans text-sm font-medium tracking-wide transition-colors duration-200'
	>
		{children}
	</a>
);

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	// Note to myself: this is being destructured from it's original syntax of having two items in the array for useState.
	// Just for prototyping, you can't set if there's no setter.
	const [cartCount] = useState<number>(5);

}


	
