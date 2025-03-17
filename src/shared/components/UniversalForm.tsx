'use client';

import React, { useState } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { ValidationRules } from '../../shared/utils/formValidation';
import { ArrowDownIcon } from '../../shared/ui/Icon';
import Modal from '../../shared/components/Modal/Modal';

interface FormField {
  name: string;
  type: 'text' | 'tel' | 'email' | 'select' | 'checkbox' | 'textarea';
  placeholder?: string;
  label?: string;
  required?: boolean;
  options?: Record<string, string>; // Для select: {key: display}
}

interface UniversalFormProps {
  title?: string;
  subtitle?: string;
  fields: FormField[];
  submitButtonText: string;
  successTitle: string;
  successMessage: string;
  closeButtonText: string;
  mode?: 'banner' | 'confirmation';
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
  // Тексты ошибок
  errorMessages?: Record<string, string>;
  confirmationTitle?: string;
  confirmationMessage?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const UniversalForm: React.FC<UniversalFormProps> = ({
  title,
  subtitle,
  fields,
  submitButtonText,
  successTitle,
  successMessage,
  closeButtonText,
  mode = 'banner',
  onSuccess,
  onCancel,
  className = '',
  errorMessages = {},
  confirmationTitle = 'Подтвердите отправку',
  confirmationMessage = 'Вы уверены, что хотите отправить форму?',
  confirmButtonText = 'Отправить',
  cancelButtonText = 'Отмена'
}) => {
  // Состояния модальных окон
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [openSelectField, setOpenSelectField] = useState<string | null>(null);
  
  // Создаем начальные данные для формы из списка полей
  const initialData = fields.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? false : '';
    return acc;
  }, {} as Record<string, string | boolean>);

  // Создаем правила валидации из списка полей
  const validationRules = fields.reduce((acc, field) => {
    if (field.required) {
      if (field.type === 'tel') {
        acc[field.name] = {
          required: true,
          customValidator: (value) => {
            const phoneDigits = String(value).replace(/\D/g, '');
            return phoneDigits.length >= 12; // Для формата +998 XX XXX XX XX
          }
        };
      } else if (field.type === 'checkbox') {
        acc[field.name] = {
          required: true,
          customValidator: (value) => Boolean(value) === true
        };
      } else {
        acc[field.name] = { required: true };
      }
    }
    return acc;
  }, {} as ValidationRules);

  // Используем хук валидации формы
  const {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleCheckboxChange,
    handlePhoneChange,
    handleSelectValue,
    submitForm,
    resetForm
  } = useFormValidation(initialData, validationRules);

  // Обработка открытия/закрытия выпадающего списка
  const toggleSelect = (fieldName: string) => {
    if (openSelectField === fieldName) {
      setOpenSelectField(null);
    } else {
      setOpenSelectField(fieldName);
    }
  };

  // Обработка выбора опции из выпадающего списка
  const handleOptionSelect = (fieldName: string, value: string) => {
    handleSelectValue(fieldName, value);
    setOpenSelectField(null);
  };

  // Обработчик предотправки формы
  const handleSubmit = () => {
    if (mode === 'confirmation') {
      setIsConfirmModalOpen(true);
    } else {
      processFormSubmission();
    }
  };

  // Процесс отправки формы (после подтверждения, если режим confirmation)
  const processFormSubmission = () => {
    submitForm(
      // Успешная отправка
      () => {
        setIsSuccessModalOpen(true);
        if (onSuccess) onSuccess();
      },
      // Ошибка
      (error) => {
        console.error('Form submission error:', error);
      }
    );
  };

  // Обработчик подтверждения в модальном окне
  const handleConfirmSubmit = () => {
    setIsConfirmModalOpen(false);
    processFormSubmission();
  };

  // Обработчик отмены в модальном окне
  const handleCancelSubmit = () => {
    setIsConfirmModalOpen(false);
  };

  // Обработчик закрытия успешного модального окна
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    resetForm();
    if (onCancel) onCancel();
  };

  // Рендеринг поля формы в зависимости от типа
  const renderField = (field: FormField) => {
    const { name, type, placeholder, label, required, options = {} } = field;
    const error = formErrors[name];
    const errorMessage = errorMessages[name] || `Пожалуйста, заполните поле ${label || name}`;

    switch (type) {
      case 'text':
      case 'email':
        return (
          <div className="mb-5">
            {label && (
              <label 
                htmlFor={name} 
                className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
              >
                {label}{required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name] as string}
              onChange={handleInputChange}
              placeholder={placeholder}
              className={`w-full p-4 md:p-5 text-base md:text-lg bg-gray-50 dark:bg-gray-800 rounded-xl border ${
                error
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 dark:border-gray-700 focus:ring-light-accent'
              } focus:outline-none focus:ring-2`}
              required={required}
              disabled={isSubmitting}
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">
                {errorMessage}
              </p>
            )}
          </div>
        );

      case 'tel':
        return (
          <div className="mb-5">
            {label && (
              <label 
                htmlFor={name} 
                className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
              >
                {label}{required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            <input
              type="tel"
              id={name}
              name={name}
              value={formData[name] as string}
              onChange={handlePhoneChange}
              placeholder={placeholder}
              className={`w-full p-4 md:p-5 text-base md:text-lg bg-gray-50 dark:bg-gray-800 rounded-xl border ${
                error
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 dark:border-gray-700 focus:ring-light-accent'
              } focus:outline-none focus:ring-2`}
              required={required}
              disabled={isSubmitting}
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">
                {errorMessage}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div className="mb-5">
            {label && (
              <label
                htmlFor={name}
                className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
              >
                {label}{required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            <div className="relative">
              <div
                className={`w-full p-4 md:p-5 text-base md:text-lg bg-gray-50 dark:bg-gray-800 rounded-xl border ${
                  error
                    ? 'border-red-500'
                    : 'border-gray-200 dark:border-gray-700'
                } cursor-pointer flex justify-between items-center`}
                onClick={() => !isSubmitting && toggleSelect(name)}
              >
                <span className={formData[name] ? 'text-light-text dark:text-dark-text' : 'text-gray-400'}>
                  {formData[name]
                    ? options[formData[name] as string]
                    : placeholder}
                </span>
                <ArrowDownIcon
                  size={16}
                  className={`transition-transform duration-300 ${openSelectField === name ? 'transform rotate-180' : ''}`}
                />
              </div>

              {openSelectField === name && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 py-1 max-h-52 overflow-auto">
                  {Object.entries(options).map(([key, value]) => (
                    <div
                      key={key}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-light-text dark:text-dark-text text-base md:text-lg transition-colors"
                      onClick={() => handleOptionSelect(name, key)}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">
                {errorMessage}
              </p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div className="mb-5">
            <div className="flex items-start">
              <input
                type="checkbox"
                id={name}
                name={name}
                className={`mt-1 w-5 h-5 md:w-6 md:h-6 ${
                  error
                    ? 'border-red-500 text-red-500'
                    : 'text-light-accent border-gray-300'
                } bg-gray-100 rounded focus:ring-light-accent`}
                checked={formData[name] as boolean}
                onChange={handleCheckboxChange}
                required={required}
                disabled={isSubmitting}
              />
              <label
                htmlFor={name}
                className="ml-3 text-base md:text-lg text-gray-500 dark:text-gray-400"
              >
                {label}
              </label>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">
                {errorMessage}
              </p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div className="mb-5">
            {label && (
              <label
                htmlFor={name}
                className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
              >
                {label}{required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            <textarea
              id={name}
              name={name}
              value={formData[name] as string}
              onChange={handleInputChange}
              placeholder={placeholder}
              rows={4}
              className={`w-full p-4 md:p-5 text-base md:text-lg bg-gray-50 dark:bg-gray-800 rounded-xl border ${
                error
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 dark:border-gray-700 focus:ring-light-accent'
              } focus:outline-none focus:ring-2`}
              required={required}
              disabled={isSubmitting}
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">
                {errorMessage}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Показывать модальное окно успеха
  if (isSuccessModalOpen) {
    return (
      <div className="py-6 flex flex-col items-center justify-center text-center">
        <div className="bg-light-accent rounded-full p-5 mb-6">
          <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-4">
          {successTitle}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg md:text-xl">
          {successMessage}
        </p>
        <button 
          onClick={handleSuccessModalClose}
          className="w-full p-4 md:p-5 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors text-lg md:text-xl"
        >
          {closeButtonText}
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-4 flex flex-col flex-grow ${className}`}>
      {/* Заголовок и подзаголовок */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}

      {/* Поля формы */}
      <div className="flex-1">
        {fields.map((field) => (
          <React.Fragment key={field.name}>
            {renderField(field)}
          </React.Fragment>
        ))}
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
            Отправка...
          </>
        ) : (
          submitButtonText
        )}
      </button>

      {/* Модальное окно подтверждения отправки */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelSubmit}
        title={confirmationTitle}
        position="center"
        size="sm"
        theme="brand"
        showCloseButton={false}
        showCloseIcon={true}
        footer={
          <div className="flex gap-4 w-full">
            <button
              onClick={handleCancelSubmit}
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 text-light-text dark:text-dark-text rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {cancelButtonText}
            </button>
            <button
              onClick={handleConfirmSubmit}
              className="flex-1 p-3 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
            >
              {confirmButtonText}
            </button>
          </div>
        }
      >
        <p className="py-4 text-light-text dark:text-dark-text">
          {confirmationMessage}
        </p>
      </Modal>
    </div>
  );
};