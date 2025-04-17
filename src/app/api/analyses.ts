// src/app/api/analyses.ts
import axios from 'axios';
import { AnalysisItem, AnalysisResponse, AnalysisDetailResponse } from '@/src/types/analysis';
import { API_BASE_URL } from '@/src/config/constants';

const API_URL = `${API_BASE_URL}/medical-tests`;

// Получение списка всех анализов
export const fetchAnalyses = async (): Promise<AnalysisResponse> => {
    try {
        const response = await axios.get<AnalysisResponse>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching analyses:', error);
        throw new Error('Failed to fetch analyses data');
    }
};

// Получение информации о конкретном анализе по slug
export const fetchAnalysisBySlug = async (slug: string): Promise<AnalysisItem> => {
    try {
        const response = await axios.get<AnalysisDetailResponse>(`${API_URL}/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching analysis with slug ${slug}:`, error);
        throw new Error(`Failed to fetch analysis data for ${slug}`);
    }
};