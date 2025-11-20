import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../contexts/auth';
import { GalleryVerticalEnd } from 'lucide-react';
import { LoginForm } from '~/components/login-form';

export default function SignInPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the location the user was trying to access, or default to /app
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/app';

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (email?.trim() && password?.trim()) {
            console.log('email', email);
            console.log('password', password);
            login(email);
            navigate(from, { replace: true });
        }
    };

    const handleGoogleLogin = () => {
        // Handle Google login logic here
        console.log('Google login clicked');
    };

    return (
        <main className="h-screen w-screen">
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="bg-muted relative hidden lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <a href="#" className="flex items-center gap-2 font-medium">
                            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            Acme Inc.
                        </a>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <LoginForm onSubmit={handleSubmit}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}