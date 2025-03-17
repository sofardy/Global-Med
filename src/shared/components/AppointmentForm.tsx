'use client';

import React, { useRef, useState } from 'react';
import { useTranslation } from '@/src/hooks/useTranslation';
import { ArrowDownIcon } from '../ui/Icon';
import { useFormValidation } from '../../hooks/useFormValidation';
import { ValidationRules } from '../utils/formValidation';

interface AppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translationNamespace?: any;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSuccess,
  onCancel,
  translationNamespace
}) => {
  const { t } = useTranslation(translationNamespace);
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  // Получаем опции для выпадающего списка
  const purposeOptions = t('modal.purposeOptions', { returnObjects: true });
  
  // Определяем правила валидации
  const validationRules: ValidationRules = {
    name: { required: true },
    phone: { 
      required: true,
      customValidator: (value) => {
        const phoneDigits = String(value).replace(/\D/g, '');
        return phoneDigits.length >= 12;
      }
    },
    purpose: { required: true },
    consent: { 
      required: true,
      customValidator: (value) => Boolean(value) === true
    }
  };
  
  // Используем хук валидации формы
  const {
    formData,
    formErrors,
    isSubmitting,
    isSuccess,
    handleInputChange,
    handlePhoneChange,
    handleSelectValue,
    submitForm
  } = useFormValidation(
    { name: '', phone: '', purpose: '', consent: false },
    validationRules
  );
  
  // Обработка отправки формы
  const handleSubmit = () => {
    submitForm(
      // Функция успешной отправки
      () => {
        if (onSuccess) onSuccess();
      },
      // Функция при ошибке
      (error) => {
        console.error('Form submission error:', error);
      }
    );
  };
  
  // Обработка выбора из выпадающего списка
  const handlePurposeSelect = (value: string) => {
    handleSelectValue('purpose', value);
    setIsPurposeOpen(false);
  };
  
  // Если форма отправлена успешно, показываем сообщение об успехе
  if (isSuccess) {
    return (
      <div className="py-6 flex flex-col items-center justify-center text-center">
        <div className="bg-light-accent rounded-full p-5 mb-6">
          <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-4">
          {t('modal.successTitle')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg md:text-xl">
          {t('modal.successMessage')}
        </p>
        <button 
          onClick={onCancel}
          className="w-full p-4 md:p-5 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors text-lg md:text-xl"
        >
          {t('modal.closeButton')}
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 flex flex-col flex-grow">
      <div className="flex-1 mb-8">
        {/* Поле имени */}
        <div className="mb-5">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name as string}
            onChange={handleInputChange}
            placeholder={t('modal.namePlaceholder')}
            className={`w-full p-4 md:p-5 text-base md:text-lg bg-gray-50 dark:bg-gray-800 rounded-xl border ${
              formErrors.name 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-200 dark:border-gray-700 focus:ring-light-accent'
            } focus:outline-none focus:ring-2`}
            required
            disabled={isSubmitting}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const phoneInput = document.querySelector('input[name="phone"]') as HTMLInputElement;
                phoneInput?.focus();
              }
            }}
          />
          {formErrors.name && (
            <p className="mt-2 text-sm text-red-500">
              {t('modal.nameError')}
            </p>
          )}
        </div>
        
        {/* Поле телефона */}
        <div className="mb-5">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone as string}
            onChange={handlePhoneChange}
            placeholder={t('modal.phonePlaceholder')}
            className={`w-full p-4 md:p-5 text-base md:text-lg bg-gray-50 dark:bg-gray-800 rounded-xl border ${
              formErrors.phone 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-200 dark:border-gray-700 focus:ring-light-accent'
            } focus:outline-none focus:ring-2`}
            required
            disabled={isSubmitting}
          />
          {formErrors.phone && (
            <p className="mt-2 text-sm text-red-500">
              {t('modal.phoneError')}
            </p>
          )}
        </div>
        
        {/* Кастомный выпадающий список с целью обращения */}
        <div className="mb-5">
          <div ref={selectRef} className="relative">
            <div
              className={`w-full p-4 md:p-5 text-base md:text-lg bg-gray-50 dark:bg-gray-800 rounded-xl border ${
                formErrors.purpose 
                  ? 'border-red-500' 
                  : 'border-gray-200 dark:border-gray-700'
              } cursor-pointer flex justify-between items-center`}
              onClick={() => !isSubmitting && setIsPurposeOpen(!isPurposeOpen)}
            >
              <span className={formData.purpose ? 'text-light-text dark:text-dark-text' : 'text-gray-400'}>
                {formData.purpose 
                  ? (purposeOptions[formData.purpose as keyof typeof purposeOptions] as string) 
                  : t('modal.purposePlaceholder')}
              </span>
              <ArrowDownIcon 
                size={16} 
                className={`transition-transform duration-300 ${isPurposeOpen ? 'transform rotate-180' : ''}`} 
              />
            </div>
            
            {/* Выпадающий список */}
            {isPurposeOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 py-1 max-h-52 overflow-auto">
                {Object.entries(purposeOptions).map(([key, value]) => (
                  <div
                    key={key}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-light-text dark:text-dark-text text-base md:text-lg transition-colors"
                    onClick={() => handlePurposeSelect(key)}
                  >
                    {value}
                  </div>
                ))}
              </div>
            )}
          </div>
          {formErrors.purpose && (
            <p className="mt-2 text-sm text-red-500">
              {t('modal.purposeError')}
            </p>
          )}
        </div>
        
        {/* Согласие на обработку данных */}
        <div className="flex items-start mt-4">
          <input 
            type="checkbox" 
            id="consent" 
            name="consent" 
            className={`mt-1 w-5 h-5 md:w-6 md:h-6 ${
              formErrors.consent 
                ? 'border-red-500 text-red-500' 
                : 'text-light-accent border-gray-300'
            } bg-gray-100 rounded focus:ring-light-accent`}
            required
            disabled={isSubmitting}
            onChange={(e) => handleSelectValue('consent', e.target.checked.toString())}
          />
          <label htmlFor="consent" className="ml-3 text-base md:text-lg text-gray-500 dark:text-gray-400">
            {t('modal.consentText')} <span className="text-light-accent cursor-pointer hover:underline">{t('modal.consentLink')}</span> {t('modal.consentRest')}
          </label>
        </div>
        {formErrors.consent && (
          <p className="mt-2 text-sm text-red-500">
            {t('modal.consentError')}
          </p>
        )}
      </div>
      
      {/* Кнопка отправки */}
      <button
        onClick={handleSubmit}
        className="w-full p-4 md:p-5 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors flex justify-center items-center text-base md:text-xl mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 md:h-6 md:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('modal.submitting')}
          </>
        ) : (
          t('modal.submitButton')
        )}
      </button>
    </div>
  );
};