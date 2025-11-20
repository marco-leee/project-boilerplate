import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useAuth } from "./auth";
import AllInOneServices from '~/services';

// Use a symbol to distinguish between "not in provider" and "not authenticated"
const NOT_IN_PROVIDER = Symbol('NOT_IN_PROVIDER');
const ServicesContext = createContext<AllInOneServices | undefined | typeof NOT_IN_PROVIDER>(NOT_IN_PROVIDER);

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
    const auth = useAuth();

    // Always call hooks in the same order - move useMemo before any conditional returns
    const services = useMemo(() => {
        // Wait for auth to finish loading before creating services
        if (auth.isLoading) {
            return undefined;
        }

        // Only create services if authenticated and have an API key
        if (!auth.isAuthenticated || !auth.apiKey) {
            return undefined;
        }

        return new AllInOneServices({
            apiKey: auth.apiKey,
        });
    }, [auth.apiKey, auth.isAuthenticated, auth.isLoading]);

    return (
        <ServicesContext.Provider value={services}>
            {children}
        </ServicesContext.Provider>
    );
}   

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (context === NOT_IN_PROVIDER) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    // context can be undefined if user is not authenticated, which is valid
    return context;
}

