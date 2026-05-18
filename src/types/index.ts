export interface User {
	id: number;
	email: string;
	role: 'USER' | 'ADMIN';
}

export interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (userData: User, token: string) => void;
	logout: () => void;
	usAuthenticated: boolean;
	isAdmin: boolean;
}