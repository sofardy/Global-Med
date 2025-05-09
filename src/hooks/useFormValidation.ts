// src/hooks/useFormValidation.ts (обновленная версия)

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';
import {
    FormData,
    ValidationErrors,
    ValidationRules,
    validateForm as validateFormUtil,
    formatPhoneNumber,
    standardValidationRules,
    isFormValid as checkFormValid
} from '../shared/utils/formValidation';
import { FormService } from '../shared/services/FormService';

/**
 * Хук для управления состоянием формы и валидации
 * 
 * @param initialData - начальное состояние формы
 * @param validationRules - правила валидации полей
 * @param formName - идентификатор формы (для аналитики)
 * @returns объект с методами и состоянием для управления формой
 */
export const useFormValidation = (
    initialData: FormData,
    validationRules: ValidationRules = standardValidationRules,
    formName: string = 'generic_form'
) => {
    // Создаем локальную копию initialData для каждого экземпляра хука
    const [formData, setFormData] = useState<FormData>(() => ({ ...initialData }));
    const [formErrors, setFormErrors] = useState<ValidationErrors>(() =>
        Object.keys(initialData).reduce((acc, key) => ({ ...acc, [key]: false }), {})
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formSubmitError, setFormSubmitError] = useState<Error | null>(null);

    // Обновляем состояние, если изменился initialData
    useEffect(() => {
        setFormData({ ...initialData });
        setFormErrors(Object.keys(initialData).reduce((acc, key) => ({ ...acc, [key]: false }), {}));
    }, [JSON.stringify(initialData)]);

    /**
     * Обработчик изменения текстовых полей формы
     */
    const handleInputChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Сбрасываем ошибку при изменении поля
        setFormErrors(prev => ({ ...prev, [name]: false }));
    }, []);

    /**
     * Обработчик изменения чекбоксов
     */
    const handleCheckboxChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));

        // Сбрасываем ошибку при изменении поля
        setFormErrors(prev => ({ ...prev, [name]: false }));
    }, []);

    /**
     * Обработчик для форматирования телефонного номера
     */
    const handlePhoneChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name } = e.target;
        const formattedValue = formatPhoneNumber(e.target.value);

        setFormData(prev => ({ ...prev, [name]: formattedValue }));

        // Сбрасываем ошибку при изменении поля
        setFormErrors(prev => ({ ...prev, [name]: false }));
    }, []);

    /**
     * Установка значения для выпадающего списка или чекбоксов
     */
    const handleSelectValue = useCallback((name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        // Сбрасываем ошибку при изменении поля
        setFormErrors(prev => ({ ...prev, [name]: false }));
    }, []);

    /**
     * Валидация формы
     */
    const validateForm = useCallback(() => {
        const errors = validateFormUtil(formData, validationRules);
        setFormErrors(errors);
        return checkFormValid(errors);
    }, [formData, validationRules]);

    /**
     * Проверка валидности формы
     */
    const isValid = useCallback(() => {
        return checkFormValid(formErrors);
    }, [formErrors]);

    /**
     * Сброс формы к начальному состоянию
     */
    const resetForm = useCallback(() => {
        setFormData({ ...initialData });
        setFormErrors(Object.keys(initialData).reduce((acc, key) => ({ ...acc, [key]: false }), {}));
        setIsSubmitting(false);
        setIsSuccess(false);
        setFormSubmitError(null);
    }, [initialData]);

    /**
     * Отправка формы с реальным API запросом
     */
    const submitForm = useCallback(async (
        onSuccess?: () => void,
        onError?: (error: Error) => void,
        simulateSuccess = false // Параметр для тестирования
    ) => {
        if (!validateForm()) {
            return false;
        }

        setIsSubmitting(true);
        setFormSubmitError(null);

        try {
            // Формируем данные для отправки, преобразуя поля согласно требованиям API
            const submissionData: Record<string, any> = {
                name: formData.name,
                phone: formData.phone,
                company_name: formData.company || formData.company_name,
                form_type: formName
            };

            // Добавляем остальные поля, которые могут быть в форме
            Object.entries(formData).forEach(([key, value]) => {
                if (!['name', 'phone', 'company', 'company_name'].includes(key)) {
                    submissionData[key] = value;
                }
            });

            // Если включен режим симуляции успеха, пропускаем реальный запрос
            let response;
            if (simulateSuccess) {
                // Имитация успешного ответа
                await new Promise(resolve => setTimeout(resolve, 1000));
                response = { success: true };
            } else {
                // Реальный запрос через сервис
                response = await FormService.submitForm(submissionData);
            }

            setIsSubmitting(false);
            setIsSuccess(true);

            if (onSuccess) onSuccess();
            return true;
        } catch (error) {
            setIsSubmitting(false);
            setFormSubmitError(error as Error);

            if (onError) onError(error as Error);
            return false;
        }
    }, [validateForm, formData, formName]);

    return {
        formData,
        formErrors,
        isSubmitting,
        isSuccess,
        formSubmitError,
        handleInputChange,
        handleCheckboxChange,
        handlePhoneChange,
        handleSelectValue,
        validateForm,
        isValid,
        resetForm,
        submitForm,
        setFormData,
        setFormErrors,
        setIsSubmitting,
        setIsSuccess
    };
};