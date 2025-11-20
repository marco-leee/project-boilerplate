import type { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { PermissionsProvider } from './permission';
import { ServicesProvider } from './service';
import { ConfigProvider } from './config';

/**
 * Combined providers component that wraps all app-level context providers
 * in the correct dependency order:
 * 1. AuthProvider (no dependencies)
 * 2. PermissionsProvider (depends on Auth)
 * 3. ServicesProvider (depends on Auth)
 * 4. ConfigProvider (no dependencies, but Theme wrapper should be innermost)
 */
export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <PermissionsProvider>
                <ServicesProvider>
                    <ConfigProvider>
                        {children}
                    </ConfigProvider>
                </ServicesProvider>
            </PermissionsProvider>
        </AuthProvider>
    );
}

