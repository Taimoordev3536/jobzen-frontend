
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Loader2 } from 'lucide-react';

import { Suspense } from 'react';

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setAuth = useAuthStore((state) => state.setAuth);

    useEffect(() => {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');

        if (token && userParam) {
            try {
                const user = JSON.parse(decodeURIComponent(userParam));
                setAuth(user, token, null);

                if (user.role === 'unassigned') {
                    router.push('/auth/complete-profile');
                } else {
                    router.push(`/${user.role}/dashboard`);
                }
            } catch (error) {
                console.error('Failed to parse user data', error);
                router.push('/login?error=oauth_failed');
            }
        } else {
            router.push('/login?error=no_token');
        }
    }, [router, searchParams, setAuth]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Completing sign in...</p>
            </div>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <AuthCallbackContent />
        </Suspense>
    );
}
