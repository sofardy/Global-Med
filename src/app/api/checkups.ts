// src/app/api/checkups.ts
import axios from 'axios';
import { API_BASE_URL } from '@/src/config/constants';

export interface MedicalTest {
    uuid: string;
    name: string;
    mini_description: string;
}

export interface Symptom {
    uuid: string;
    slug: string;
    name: string;
}

export interface CheckupItem {
    uuid: string;
    slug: string;
    title: string;
    description: string;
    mini_description: string;
    card_description: string;
    duration: string;
    price: number;
    icon: string;
    medical_tests: MedicalTest[];
    symptoms: Symptom[];
}

export interface CheckupsResponse {
    data: CheckupItem[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export const fetchCheckups = async (): Promise<CheckupsResponse> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/checkups`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке списка чек-апов:', error);
        throw error;
    }
};

export const fetchCheckupBySlug = async (slug: string): Promise<CheckupItem> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/checkups/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error(`Ошибка при загрузке информации о чек-апе ${slug}:`, error);
        throw error;
    }
};