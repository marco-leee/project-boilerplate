import { Outlet } from 'react-router';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export default function AppLayout() {
    return (
        <ProtectedRoute>
            <main className="min-h-screen">
                {/* Add your app layout structure here (navbar, sidebar, etc.) */}
                <Outlet />
            </main>
        </ProtectedRoute>
    );
}

