// src/hooks/useAuth.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import httpClient from '@/src/shared/services/HttpClient';
import { useLanguageStore } from '@/src/store/language';

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { currentLocale } = useLanguageStore();

    // Проверка авторизации
    const isAuthenticated = () => {
        if (typeof window === 'undefined') return false;

        const token = localStorage.getItem('authToken');
        if (!token) return false;

        // Дополнительно можно проверить не истек ли токен, если есть такая информация
        // Например, если вы храните время истечения токена
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        if (tokenExpiration && parseInt(tokenExpiration) < Date.now()) {
            // Токен истек, очищаем localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenType');
            localStorage.removeItem('user');
            localStorage.removeItem('tokenExpiration');
            return false;
        }

        return true;
    };

    // Отправка OTP кода
    const sendOtp = async (phone: string) => {
        setLoading(true);
        setError(null);

        try {
            await httpClient.post('/auth/otp/send', { phone });
            setLoading(false);
            return true;
        } catch (error) {
            setLoading(false);
            setError(currentLocale === 'uz' ? 'Kodni yuborishda xatolik' : 'Ошибка при отправке кода');
            return false;
        }
    };

    // Верификация OTP кода
    const verifyOtp = async (phone: string, code: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await httpClient.post<{
                access_token: string;
                token_type: string;
                user: any;
            }>('/auth/otp/verify', { phone, code });

            const { access_token, token_type, user } = response;

            localStorage.setItem('authToken', access_token);
            localStorage.setItem('tokenType', token_type);
            localStorage.setItem('user', JSON.stringify(user));

            setLoading(false);
            router.push('/account');
            return true;
        } catch (error) {
            setLoading(false);
            setError(currentLocale === 'uz' ? 'Noto\'g\'ri tasdiqlash kodi' : 'Неверный код подтверждения');
            return false;
        }
    };

    // Получение данных пользователя
    const getUserProfile = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) return null;

        try {
            const axiosInstance = httpClient.getAxiosInstance();
            const response = await axiosInstance.get('/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
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
            const axiosInstance = httpClient.getAxiosInstance();
            await axiosInstance.put('/user', userData, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
        try {
            const token = localStorage.getItem('authToken');
            const tokenType = localStorage.getItem('tokenType');

            // Если есть токен, делаем запрос на сервер для инвалидации сессии
            if (token && tokenType) {
                try {
                    const axiosInstance = httpClient.getAxiosInstance();
                    await axiosInstance.post('/auth/logout', {}, {
                        headers: {
                            'Authorization': `${tokenType} ${token}`
                        }
                    });
                    console.log('Успешно разлогинились на сервере');
                } catch (error) {
                    console.error('Ошибка при разлогинивании на сервере:', error);
                    // Продолжаем процесс локального логаута даже при ошибке с сервером
                }
            }
        } finally {
            // В любом случае очищаем локальное хранилище
            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenType');
            localStorage.removeItem('user');
            localStorage.removeItem('tokenExpiration'); // если используется

            // Перенаправляем на страницу входа
            router.push('/account/login');
        }
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