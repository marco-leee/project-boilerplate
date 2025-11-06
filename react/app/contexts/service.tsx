import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useAuth } from "./auth";
import AllInOneServices from '~/services';

const ServicesContext = createContext<AllInOneServices | undefined>(undefined);

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
    const auth = useAuth();

    const services = useMemo(() => {

        if (!auth.apiKey) {
            throw new Error('API key is required');
        }

        return new AllInOneServices({
            apiKey: auth.apiKey,
        });
    }, [auth.apiKey]);

    return (
        <ServicesContext.Provider value={services}>
            {children}
        </ServicesContext.Provider>
    );
}   

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
}

