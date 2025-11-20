import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface Auth {
    isAuthenticated: boolean;
    isLoading: boolean;
    apiKey: string | null;
    login: (apiKey: string) => void;
    logout: () => void;
}

const defaultAuth: Auth = {
    isAuthenticated: false,
    isLoading: true,
    apiKey: null,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<Auth>(defaultAuth);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for stored authentication on mount
        if (typeof window !== 'undefined') {
            const storedApiKey = localStorage.getItem('apiKey');
            if (storedApiKey) {
                setApiKey(storedApiKey);
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        }
    }, []);

    const login = (key: string) => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem('apiKey', key);
            }
            setApiKey(key);
            setIsAuthenticated(true);
            navigate('/app');

        } catch (error) {
            console.error('Error logging in', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('apiKey');
            }
            setApiKey(null);
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const auth: Auth = {
        isAuthenticated,
        isLoading,
        apiKey,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

