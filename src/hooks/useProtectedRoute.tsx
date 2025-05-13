// src/hooks/useProtectedRoute.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Проверяем авторизацию
        const checkAuth = () => {
            if (!isAuthenticated()) {
                // Перенаправляем на страницу входа
                router.replace('/account/login');
            } else {
                setAuthorized(true);
            }
        };

        checkAuth();
        
        // Можно добавить периодическую проверку токена
        const authCheckInterval = setInterval(checkAuth, 60000); // каждую минуту
        
        return () => clearInterval(authCheckInterval);
    }, [router, isAuthenticated]);

    // Если пользователь не авторизован, показываем лоадер
    if (!authorized) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
            </div>
        );
    }

    return <>{children}</>;
}