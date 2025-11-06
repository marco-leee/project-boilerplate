import { createContext, useContext, useMemo, useEffect, type ReactNode } from "react";

interface Auth {
    isAuthenticated: boolean;
    isLoading: boolean;
    apiKey: string | null;
}

const defaultAuth: Auth = {
    isAuthenticated: false,
    isLoading: false,
    apiKey: "1",
};

const AuthContext = createContext<Auth>(defaultAuth);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        // TODO: Auth init
    }, []);

    const auth = useMemo(() => {
        return defaultAuth;
    }, []);

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

