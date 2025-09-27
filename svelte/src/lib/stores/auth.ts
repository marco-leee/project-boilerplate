import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface User {
	id: string;
	email: string;
	name: string;
}

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	loading: true
};

// Create the auth store
function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(initialState);

	return {
		subscribe,
		
		// Initialize auth state from localStorage
		init: () => {
			if (browser) {
				const storedUser = localStorage.getItem('auth_user');
				if (storedUser) {
					try {
						const user = JSON.parse(storedUser);
						set({
							isAuthenticated: true,
							user,
							loading: false
						});
					} catch {
						localStorage.removeItem('auth_user');
						set({ ...initialState, loading: false });
					}
				} else {
					set({ ...initialState, loading: false });
				}
			}
		},

		// Login function (simple mock - replace with real auth)
		login: async (email: string, password: string) => {
			update(state => ({ ...state, loading: true }));
			
			// Mock authentication - replace with real API call
			if (email && password) {
				const user: User = {
					id: '1',
					email,
					name: email.split('@')[0]
				};
				
				if (browser) {
					localStorage.setItem('auth_user', JSON.stringify(user));
				}
				
				set({
					isAuthenticated: true,
					user,
					loading: false
				});
				
				return { success: true };
			}
			
			set({ ...initialState, loading: false });
			return { success: false, error: 'Invalid credentials' };
		},

		// Logout function
		logout: () => {
			if (browser) {
				localStorage.removeItem('auth_user');
			}
			set({ ...initialState, loading: false });
		}
	};
}

export const auth = createAuthStore();
