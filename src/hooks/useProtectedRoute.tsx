'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuth'; // Ваш хук аутентификации

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated()) {
            // Если нет токена, перенаправляем на страницу входа
            router.replace('/account/login');
        }
    }, []);

    // Если пользователь не авторизован, показываем null или лоадер
    if (!isAuthenticated()) {
        return (
            <div className= "flex justify-center items-center min-h-screen" >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent" > </div>
                </div>
    );
    }

    return <>{ children } </>;
}