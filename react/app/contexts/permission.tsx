import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useAuth } from "./auth";

interface Permissions {}

const defaultPermissions: Permissions = {};

const PermissionsContext = createContext<Permissions>(defaultPermissions);

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
    const auth = useAuth();

    const permissions = useMemo(() => {
        return defaultPermissions;
    }, []);
    return (
        <PermissionsContext.Provider value={permissions}>
            {children}
        </PermissionsContext.Provider>
    );
}   

export const usePermissions = () => {
    const context = useContext(PermissionsContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionsProvider');
    }
    return context;
}

