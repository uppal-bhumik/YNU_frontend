import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';

export interface User { id:string; email:string; full_name?:string|null; role:'student'|'counsellor'; } // changed id to string

interface AuthContextValue {
	user: User | null;
	token: string | null;
	loading: boolean;
	login: (email:string, password:string) => Promise<void>;
	register: (email:string, password:string, role:'student'|'counsellor', full_name?:string) => Promise<void>;
	logout: () => void;
	verify: (email:string, code:string) => Promise<void>;
	pendingEmail: string | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
	const [token, setToken] = useState<string | null>(() => localStorage.getItem('sc_token') || localStorage.getItem('access_token'));
	const [user, setUser] = useState<User | null>(() => {
		const stored = localStorage.getItem('user');
		return stored ? JSON.parse(stored) : null;
	});
	const [loading, setLoading] = useState(false);
	const [pendingEmail, setPendingEmail] = useState<string | null>(null);
	const api = useApi(token);

	// Fetch current user when token changes
	useEffect(() => {
		let cancelled = false;
		if (token) {
			api.get<User>('/users/me')
				.then(u => { if(!cancelled) setUser(u); })
				.catch(() => { if(!cancelled) setUser(null); });
		} else {
			setUser(null);
		}
		return () => { cancelled = true; };
	}, [token]);

	// Sync token from localStorage on mount (for OAuth or reload)
	useEffect(() => {
		const storedToken = localStorage.getItem('sc_token') || localStorage.getItem('access_token');
		if (storedToken && token !== storedToken) {
			setToken(storedToken);
		}
	}, []);

	// Keep user in sync with localStorage (for OAuth or reload)
	useEffect(() => {
		if (!user) {
			const stored = localStorage.getItem('user');
			if (stored) setUser(JSON.parse(stored));
		}
	}, []);

	async function login(email:string, password:string) {
		setLoading(true);
		try {
			const { access_token } = await api.post<{access_token:string}>('/auth/login', { email, password });
			setToken(access_token); localStorage.setItem('sc_token', access_token);
			const me = await api.get<User>('/users/me'); setUser(me);
		} finally { setLoading(false); }
	}

	async function register(email:string, password:string, role:'student'|'counsellor', full_name?:string) {
		setLoading(true);
		try {
			await api.post('/auth/register', { email, password, role, full_name });
			setPendingEmail(email);
		} finally { setLoading(false); }
	}

	async function verify(email:string, code:string){
		setLoading(true);
		try {
			const { access_token } = await api.post<{access_token:string}>('/auth/verify', { email, code });
			setToken(access_token);
			localStorage.setItem('sc_token', access_token);
			const me = await api.get<User>('/users/me'); setUser(me);
			setPendingEmail(null);
		} finally { setLoading(false); }
	}

	function logout() {
		setToken(null);
		localStorage.removeItem('sc_token');
		localStorage.removeItem('access_token');
		localStorage.removeItem('user');
		setUser(null);
		setPendingEmail(null);
	}

	return (
		<AuthContext.Provider value={{ user, token, loading, login, register, verify, logout, pendingEmail }}>
			{children}
		</AuthContext.Provider>
	);
};

// For Vite HMR compatibility, use only one export style for useAuth:
export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}

// Do NOT use both `export const useAuth = ...` and `export function useAuth` in the same file.
