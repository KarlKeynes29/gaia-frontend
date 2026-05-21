import React, { createContext, useState } from 'react';

interface User {
	id: string;
	email: string;
	role: 'ADMIN' | 'USER';
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	isAdmin: boolean;
	login: (userData: User, token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [token, setToken] = useState<string | null>(() => {
		return localStorage.getItem('token');
	});

	const [user, setUser] = useState<User | null>(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				return JSON.parse(storedUser);
			} catch (error) {
				console.error("Failed to parse stored user details.", error);
				return null;
			}
		}
		return null;
	});

	const [isLoading, setIsLoading] = useState(false);

	const login = (userData: User, newToken: string) => {
		setToken(newToken);
		setUser(userData);
		localStorage.setItem('token', newToken);
		localStorage.setItem('user', JSON.stringify(userData));
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	};

	const isAuthenticated = !!token && !!user;
	const isAdmin = user?.role === 'ADMIN';

	return (
		<AuthContext.Provider value={{ user, token, isLoading, isAuthenticated, isAdmin, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
