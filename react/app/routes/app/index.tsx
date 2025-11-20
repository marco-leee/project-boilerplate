import type { Route } from './+types/index';
import { useAuth } from '../../contexts/auth';

export function meta(_: Route.MetaArgs) {
    return [
        { title: 'Dashboard' },
        { name: 'description', content: 'Welcome to your dashboard!' },
    ];
}

export default function AppIndex() {
    const { isAuthenticated, apiKey, logout } = useAuth();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="space-y-4">
                <p>Welcome! You are authenticated.</p>
                {apiKey && (
                    <div>
                        <p className="text-sm text-gray-600">API Key: {apiKey}</p>
                    </div>
                )}
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

