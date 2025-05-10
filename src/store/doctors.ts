import { create } from 'zustand';
import { Doctor, DoctorFilters } from '../app/api/doctors';
import httpClient from '@/src/shared/services/HttpClient';

// Обновляем функцию getDoctors, если она используется
export const getDoctors = async (filters: DoctorFilters, page = 1) => {
    const queryParams = new URLSearchParams();

    // Добавляем все фильтры как query параметры
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
        }
    });

    // Добавляем номер страницы
    queryParams.append('page', String(page));

    const response = await httpClient.get<any>(`/doctors?${queryParams.toString()}`);
    return response;
};

interface DoctorsState {
    // Состояние данных
    doctors: Doctor[];
    loading: boolean;
    error: string | null;

    // Фильтры поиска
    filters: DoctorFilters;

    // Пагинация
    currentPage: number;
    totalPages: number;
    totalDoctors: number;

    // Методы
    setFilters: (filters: DoctorFilters) => void;
    setPage: (page: number) => void;
    fetchDoctors: () => Promise<void>;
    clearResults: () => void;
}

export const useDoctorsStore = create<DoctorsState>()((set, get) => ({
    // Начальное состояние
    doctors: [],
    loading: false,
    error: null,

    filters: {},

    currentPage: 1,
    totalPages: 1,
    totalDoctors: 0,

    // Установка фильтров поиска
    setFilters: (filters) => set({ filters, currentPage: 1 }),

    // Изменение страницы для пагинации
    setPage: (page) => set({ currentPage: page }),

    // Очистка результатов
    clearResults: () => set({ doctors: [], error: null }),

    // Основной метод для получения данных
    fetchDoctors: async () => {
        const { filters, currentPage } = get();

        try {
            set({ loading: true, error: null });

            const response = await getDoctors(filters, currentPage);

            set({
                doctors: response.data,
                currentPage: response.meta.current_page,
                totalPages: response.meta.last_page,
                totalDoctors: response.meta.total,
                loading: false
            });
        } catch (error) {
            console.error('Error fetching doctors:', error);
            set({
                error: 'Ошибка при загрузке данных',
                loading: false
            });
        }
    }
}));