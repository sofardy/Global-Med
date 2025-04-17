// src/hooks/useAuth.ts
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/src/config/constants';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Проверка авторизации
    const isAuthenticated = () => {
        return !!localStorage.getItem('authToken');
    };

    // Логин
    const login = async (email: string, password: string) => {
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password
            }, {
                headers: {
                    'X-Language': 'ru'
                }
            });

            localStorage.setItem('authToken', response.data.token);
            setLoading(false);
            router.push('/account');
            return true;
        } catch (error) {
            setLoading(false);
            return false;
        }
    };

    // Логаут
    const logout = async () => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-Language': 'ru'
                    }
                });
            } catch (error) {
                console.error('Logout error:', error);
            }
        }

        localStorage.removeItem('authToken');
        router.push('/account/login');
    };

    return {
        isAuthenticated,
        login,
        logout,
        loading
    };
}