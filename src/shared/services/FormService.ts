import axios from 'axios';
import { API_BASE_URL } from '@/src/config/constants';

export interface FormSubmissionData {
    name: string;
    phone: string;
    company_name?: string;
    purpose?: string;
    utm_source?: string;
    utm_content?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    page_url: string;
    [key: string]: any; // Для дополнительных полей
}

export class FormService {
    /**
     * Получение UTM-меток из URL
     */
    static getUtmParams(): Record<string, string> {
        if (typeof window === 'undefined') return {};

        const urlParams = new URLSearchParams(window.location.search);
        return {
            utm_source: urlParams.get('utm_source') || '',
            utm_content: urlParams.get('utm_content') || '',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || '',
            utm_term: urlParams.get('utm_term') || ''
        };
    }

    /**
     * Получение текущего URL страницы
     */
    static getCurrentPageUrl(): string {
        if (typeof window === 'undefined') return '';
        return window.location.href;
    }

    /**
     * Отправка данных формы на API
     */
    static async submitForm(formData: Partial<FormSubmissionData>): Promise<any> {
        try {
            // Получаем UTM-метки и текущий URL
            const utmParams = this.getUtmParams();
            const pageUrl = this.getCurrentPageUrl();

            // Подготавливаем данные для отправки
            const submissionData: FormSubmissionData = {
                name: formData.name || '',
                phone: formData.phone || '',
                company_name: formData.company_name || '',
                ...utmParams,
                page_url: pageUrl,
                ...formData // Дополнительные поля, если они есть
            };

            // Убираем пустые значения
            Object.keys(submissionData).forEach(key => {
                if (submissionData[key] === '') {
                    delete submissionData[key];
                }
            });

            // Отправляем данные на API
            const response = await axios.post(`${API_BASE_URL}/form`, submissionData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Language': 'ru'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }
}