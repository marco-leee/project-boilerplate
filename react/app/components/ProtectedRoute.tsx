import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/auth';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const hasNavigated = useRef(false);

    useEffect(() => {
        // Reset navigation flag when location changes
        hasNavigated.current = false;
    }, [location.pathname]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated && !hasNavigated.current && location.pathname !== '/login') {
            hasNavigated.current = true;
            navigate('/login', { 
                state: { from: { pathname: location.pathname } },
                replace: true 
            });
        }
    }, [isLoading, isAuthenticated, location.pathname, navigate]);

    if (isLoading) {
        // You can replace this with a loading spinner component
        return <div>Loading...</div>;
    }
    
    if (!isLoading && !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}

