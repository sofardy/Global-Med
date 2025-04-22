// src/hooks/useAuth.ts
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/src/config/constants';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Проверка авторизации
    const isAuthenticated = () => {
        return !!localStorage.getItem('authToken');
    };

    // Отправка OTP кода
    const sendOtp = async (phone: string) => {
        setLoading(true);
        setError(null);

        try {
            await axios.post(`${API_BASE_URL}/auth/otp/send`,
                { phone },
                {
                    headers: {
                        'X-Language': 'ru',
                        'Content-Type': 'application/json'
                    }
                }
            );
            setLoading(false);
            return true;
        } catch (error) {
            setLoading(false);
            setError('Ошибка при отправке кода');
            return false;
        }
    };

    // Верификация OTP кода
    const verifyOtp = async (phone: string, code: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/otp/verify`,
                { phone, code },
                {
                    headers: {
                        'X-Language': 'ru',
                        'Content-Type': 'application/json'
                    }
                }
            );

            const { access_token, token_type, user } = response.data;
            localStorage.setItem('authToken', access_token);
            localStorage.setItem('tokenType', token_type);
            localStorage.setItem('user', JSON.stringify(user));

            setLoading(false);
            router.push('/account');
            return true;
        } catch (error) {
            setLoading(false);
            setError('Неверный код подтверждения');
            return false;
        }
    };

    // Получение данных пользователя
    const getUserProfile = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) return null;

        try {
            const response = await axios.get(`${API_BASE_URL}/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Language': 'ru'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    };

    // Обновление профиля пользователя
    const updateUserProfile = async (userData: any) => {
        const token = localStorage.getItem('authToken');

        if (!token) return false;

        try {
            await axios.put(`${API_BASE_URL}/user`, userData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Language': 'ru'
                }
            });

            return true;
        } catch (error) {
            console.error('Error updating user profile:', error);
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
        localStorage.removeItem('tokenType');
        localStorage.removeItem('user');
        router.push('/account/login');
    };

    return {
        isAuthenticated,
        sendOtp,
        verifyOtp,
        getUserProfile,
        updateUserProfile,
        logout,
        loading,
        error
    };
}