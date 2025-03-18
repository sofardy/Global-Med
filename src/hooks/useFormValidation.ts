// src/shared/hooks/useFormValidation.ts

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

/**
 * Хук для управления состоянием формы и валидации
 * 
 * @param initialData - начальное состояние формы
 * @param validationRules - правила валидации полей
 * @returns объект с методами и состоянием для управления формой
 */
export const useFormValidation = (
    initialData: FormData,
    validationRules: ValidationRules = standardValidationRules
) => {
    // Создаем локальную копию initialData для каждого экземпляра хука
    const [formData, setFormData] = useState<FormData>(() => ({ ...initialData }));
    const [formErrors, setFormErrors] = useState<ValidationErrors>(() =>
        Object.keys(initialData).reduce((acc, key) => ({ ...acc, [key]: false }), {})
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
    }, [initialData]);

    /**
     * Отправка формы с имитацией запроса
     */
    const submitForm = useCallback(async (
        onSuccess?: () => void,
        onError?: (error: Error) => void,
        simulateDelay = 1500
    ) => {
        if (!validateForm()) {
            return false;
        }

        setIsSubmitting(true);

        try {
            // Имитация отправки данных
            await new Promise(resolve => setTimeout(resolve, simulateDelay));

            setIsSubmitting(false);
            setIsSuccess(true);

            if (onSuccess) onSuccess();
            return true;
        } catch (error) {
            setIsSubmitting(false);

            if (onError) onError(error as Error);
            return false;
        }
    }, [validateForm]);

    return {
        formData,
        formErrors,
        isSubmitting,
        isSuccess,
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