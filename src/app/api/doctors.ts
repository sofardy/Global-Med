// src/api/doctors.ts
import axios from 'axios';
import { useLanguageStore } from '@/src/store/language';

const API_URL = 'https://globalmed-main-b3lh3x.laravel.cloud/api';

export interface Doctor {
    uuid: string;
    full_name: string;
    image_url: string;
    specialization: string;
    specialization_uuid: string;
    experience_years: string;
    qualification: string;
    category: any;
    languages: any;
    price_from: string;
    education: any;
    certificates: any;
}

export interface DoctorsResponse {
    data: Doctor[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

export interface DoctorFilters {
    full_name?: string;
    specialization_uuid?: string;
}

/**
 * Получает текущий язык из хранилища или возвращает 'ru' по умолчанию
 * Функция вынесена для переиспользования
 */
export const getCurrentLanguage = (): string => {
    try {
        // Используем функцию для получения состояния без хука, так как хуки можно вызывать только внутри компонентов
        // Для безопасности: если store не инициализирован (например, при SSR), возвращаем 'ru'
        if (typeof window === 'undefined') return 'ru';

        // @ts-ignore - потенциально может быть ошибка, так как мы получаем состояние напрямую
        const state = useLanguageStore.getState();
        return state?.currentLocale || 'ru';
    } catch (error) {
        console.warn('Error getting language from store, using default "ru":', error);
        return 'ru';
    }
};

/**
 * Получает список докторов с поддержкой пагинации и фильтрации
 * @param filters Объект с фильтрами для поиска
 * @param page Номер страницы результатов
 * @param language Язык ответа (ru | uz), по умолчанию берется из хранилища
 */
export const getDoctors = async (
    filters?: DoctorFilters,
    page: number = 1,
    language?: string
): Promise<DoctorsResponse> => {
    const params = new URLSearchParams();

    // Добавляем параметр страницы
    params.append('page', page.toString());

    // Добавляем фильтры, если они указаны
    if (filters?.full_name) {
        params.append('filter[full_name]', filters.full_name);
    }

    if (filters?.specialization_uuid) {
        params.append('filter[specialization_uuid]', filters.specialization_uuid);
    }

    // Определяем язык из аргумента или получаем из хранилища
    const currentLanguage = language || getCurrentLanguage();

    // Логирование запроса
    console.log('API Request:', {
        url: `${API_URL}/doctors`,
        method: 'GET',
        params: Object.fromEntries(params),
        headers: { 'X-Language': currentLanguage }
    });

    try {
        const response = await axios.get(`${API_URL}/doctors`, {
            params,
            headers: {
                'X-Language': currentLanguage
            }
        });

        // Логирование успешного ответа
        console.log('API Response:', {
            status: response.status,
            data: response.data,
            url: `${API_URL}/doctors`
        });

        return response.data;
    } catch (error) {
        // Логирование ошибки
        console.error('API Error:', {
            url: `${API_URL}/doctors`,
            params: Object.fromEntries(params),
            error
        });
        throw error;
    }
};

export const getDoctorById = async (
    uuid: string,
    language?: string
): Promise<Doctor> => {
    // Определяем язык из аргумента или получаем из хранилища
    const currentLanguage = language || getCurrentLanguage();

    // Логирование запроса
    console.log('API Request:', {
        url: `${API_URL}/doctors/${uuid}`,
        method: 'GET',
        headers: { 'X-Language': currentLanguage }
    });

    try {
        const response = await axios.get(`${API_URL}/doctors/${uuid}`, {
            headers: {
                'X-Language': currentLanguage
            }
        });

        // Логирование успешного ответа
        console.log('API Response:', {
            status: response.status,
            data: response.data,
            url: `${API_URL}/doctors/${uuid}`
        });

        return response.data.data;
    } catch (error) {
        // Логирование ошибки
        console.error('API Error:', {
            url: `${API_URL}/doctors/${uuid}`,
            error
        });
        throw error;
    }
};