// src/store/doctors.ts
import { create } from 'zustand';
import { Doctor, DoctorFilters, getDoctors } from '../app/api/doctors';

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