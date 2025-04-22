// Добавим в src/app/api/appointments.ts

import axios from 'axios';
import { API_BASE_URL } from '@/src/config/constants';
import { getCurrentLanguage } from './doctors';

export interface AppointmentRequest {
    bookable_type: string;
    uuid: string;
    start_at: string;
}

export interface AppointmentResponse {
    number: string;
    bookable_type: string;
    bookable_id: string;
    start_at: string;
    end_at: string;
    uuid: string;
    updated_at: string;
    created_at: string;
}

export const createAppointment = async (
    appointmentData: AppointmentRequest
): Promise<AppointmentResponse> => {
    const token = localStorage.getItem('authToken');
    const tokenType = localStorage.getItem('tokenType');

    if (!token || !tokenType) {
        throw new Error('Unauthorized');
    }

    const currentLanguage = getCurrentLanguage();

    try {
        const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData, {
            headers: {
                'Authorization': `${tokenType} ${token}`,
                'X-Language': currentLanguage,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};