// src/shared/utils/formValidation.ts

/**
 * Типы для валидации форм
 */
export type FieldName = 'name' | 'phone' | 'email' | 'purpose' | 'message' | 'consent' | string;

export type ValidationErrors = Record<FieldName, boolean>;

export type FormData = Record<FieldName, string | boolean>;

export interface ValidationOptions {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    customValidator?: (value: string | boolean) => boolean;
}

export interface ValidationRules {
    [key: string]: ValidationOptions;
}

/**
 * Стандартные правила валидации для часто используемых полей
 */
export const standardValidationRules: ValidationRules = {
    name: {
        required: true,
        minLength: 2,
    },
    phone: {
        required: true,
        customValidator: (value) => {
            const phoneDigits = String(value).replace(/\D/g, '');
            return phoneDigits.length >= 12; // Для формата +998 XX XXX XX XX
        },
    },
    email: {
        required: true,
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    },
    purpose: {
        required: true,
    },
    message: {
        required: true,
        minLength: 10,
    },
    consent: {
        required: true,
        customValidator: (value) => Boolean(value) === true,
    },
};

/**
 * Валидирует одно поле по указанным правилам
 */
export const validateField = (
    name: FieldName,
    value: string | boolean,
    rules?: ValidationOptions
): boolean => {
    // Если правила не указаны, используем стандартные
    const fieldRules = rules || standardValidationRules[name] || { required: true };

    // Проверка на обязательность
    if (fieldRules.required && (value === '' || value === undefined || value === null)) {
        return false;
    }

    // Для строковых значений
    if (typeof value === 'string') {
        // Проверка минимальной длины
        if (fieldRules.minLength !== undefined && value.length < fieldRules.minLength) {
            return false;
        }

        // Проверка максимальной длины
        if (fieldRules.maxLength !== undefined && value.length > fieldRules.maxLength) {
            return false;
        }

        // Проверка по регулярному выражению
        if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
            return false;
        }
    }

    // Пользовательская валидация
    if (fieldRules.customValidator && !fieldRules.customValidator(value)) {
        return false;
    }

    return true;
};

/**
 * Валидирует все поля формы по указанным правилам
 */
export const validateForm = (
    formData: FormData,
    validationRules?: ValidationRules
): ValidationErrors => {
    const errors: ValidationErrors = {};
    const rules = validationRules || standardValidationRules;

    // Проходим по всем полям формы
    Object.keys(formData).forEach((fieldName) => {
        const value = formData[fieldName];
        const fieldRules = rules[fieldName];

        // Если есть правила для этого поля, валидируем
        if (fieldRules) {
            errors[fieldName] = !validateField(fieldName, value, fieldRules);
        }
    });

    return errors;
};

/**
 * Проверяет, есть ли ошибки в форме
 */
export const isFormValid = (errors: ValidationErrors): boolean => {
    return !Object.values(errors).some(error => error === true);
};

/**
 * Форматирование телефонного номера в формате +998 (XX) XXX-XX-XX
 */
export const formatPhoneNumber = (value: string): string => {
    // Удаляем все нецифровые символы
    let digits = value.replace(/\D/g, '');

    // Добавляем код 998, если его нет
    if (!digits.startsWith('998') && digits.length > 0) {
        digits = '998' + digits;
    }

    // Форматируем номер
    let formatted = '';
    if (digits.length > 0) {
        formatted = '+' + digits.substring(0, 3);

        if (digits.length > 3) {
            formatted += ' (' + digits.substring(3, 5) + ')';
        }

        if (digits.length > 5) {
            formatted += ' ' + digits.substring(5, 8);
        }

        if (digits.length > 8) {
            formatted += '-' + digits.substring(8, 10);
        }

        if (digits.length > 10) {
            formatted += '-' + digits.substring(10, 12);
        }
    }

    return formatted;
};

/**
 * Хук для использования валидации форм в React компонентах
 * Пример использования:
 * 
 * const { formData, formErrors, handleInputChange, handlePhoneChange, validateForm, isValid, resetForm } = 
 *   useFormValidation(
 *     { name: '', phone: '', purpose: '' },
 *     { name: { required: true }, phone: { required: true } }
 *   );
 */
export const useFormValidation = (
    initialData: FormData,
    rules?: ValidationRules
) => {
    // Здесь должна быть React-реализация хука, которая использует useState
    // для управления состоянием формы и ошибок
    // 
    // Этот код можно перенести в отдельный файл src/shared/hooks/useFormValidation.ts
    // для более чистой организации кода
};