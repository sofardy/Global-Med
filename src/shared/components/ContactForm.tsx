'use client';

import React, { useState, useRef } from 'react';
import { useThemeStore } from '@/src/store/theme';
import Image from 'next/image';
import Modal from '@/src/shared/components/Modal/Modal';

// Интерфейс для данных формы
interface FormData {
  name: string;
  phone: string;
  company: string;
  consent: boolean;
}

// Интерфейс для ошибок формы
interface FormErrors {
  name: boolean;
  phone: boolean;
  company: boolean;
  consent: boolean;
}

export default function ContactForm(): JSX.Element {
  const { theme } = useThemeStore();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    company: '',
    consent: false
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: false,
    phone: false,
    company: false,
    consent: false
  });

  // Валидация формы
  const validateForm = (): boolean => {
    const errors: FormErrors = {
      name: formData.name.trim() === '',
      phone: !formData.phone || formData.phone.replace(/\D/g, '').length < 9,
      company: false, // Делаем необязательным полем
      consent: !formData.consent
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  // Обработчики изменения полей
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Сбрасываем ошибку при изменении поля
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  // Форматирование номера телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let input = e.target.value.replace(/\D/g, '');
    
    if (input.length > 0) {
      // Удаляем код страны, если введен
      if (input.startsWith('998')) {
        input = input.slice(3);
      }
      
      // Ограничиваем до 9 цифр для формата Узбекистана
      input = input.slice(0, 9);
      
      // Форматируем номер
      let formattedPhone = '';
      if (input.length > 0) {
        formattedPhone = input.slice(0, 2);
        if (input.length > 2) {
          formattedPhone += ' ' + input.slice(2, 5);
          if (input.length > 5) {
            formattedPhone += ' ' + input.slice(5, 7);
            if (input.length > 7) {
              formattedPhone += ' ' + input.slice(7, 9);
            }
          }
        }
      }
      
      setFormData(prev => ({ ...prev, phone: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, phone: '' }));
    }
    
    // Сбрасываем ошибку при изменении
    if (formErrors.phone) {
      setFormErrors(prev => ({ ...prev, phone: false }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData(prev => ({ ...prev, consent: e.target.checked }));
    
    if (formErrors.consent) {
      setFormErrors(prev => ({ ...prev, consent: false }));
    }
  };

  // Обработка отправки формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsConfirmationModalOpen(true);
    }
  };

  const closeConfirmationModal = (): void => {
    setIsConfirmationModalOpen(false);
  };
  
  const closeSuccessModal = (): void => {
    setIsSuccessModalOpen(false);
  };
  
  const confirmSubmission = (): void => {
    // Здесь была бы отправка данных на сервер
    console.log('Отправка данных:', formData);
    
    setIsConfirmationModalOpen(false);
    setIsSuccessModalOpen(true);
    
    // Сбрасываем форму
    setFormData({
      name: '',
      phone: '',
      company: '',
      consent: false
    });
  };

  return (
    <>
      <div id="contact-info-section" className={`w-full flex flex-col md:flex-row gap-5 mt-20 overflow-hidden`}>
        {/* Левая колонка с информацией */}
        <div className={`p-6 md:p-8 rounded-2xl ${theme === 'dark' ? 'bg-dark-block' : 'bg-light-block'} md:w-1/4`}>
          <div>
            <h2 
              className="text-light-text dark:text-dark-text mb-4"
              style={{
                fontFamily: 'Graphik LCG, sans-serif',
                fontSize: '24px',
                fontWeight: 500,
                lineHeight: '110%',
                letterSpacing: '0%'
              }}
            >
              Свяжитесь с нами сегодня
            </h2>
            <p 
              className="text-light-text/80 dark:text-dark-text/80"
              style={{
                fontFamily: 'Graphik LCG, sans-serif',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '110%',
                letterSpacing: '0%'
              }}
            >
              И мы поможем подобрать индивидуальное решение для вашего корпоративного здоровья
            </p>
          </div>
        </div>
        
        {/* Центральная колонка с формой */}
        <div className={`p-6 md:p-8 rounded-2xl ${theme === 'dark' ? 'bg-dark-block' : 'bg-white'} md:w-1/2`}>
          <form onSubmit={handleSubmit}>
            {/* Поле имени */}
            <div className="mb-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Имя"
                onChange={handleInputChange}
                className={`w-full p-5 text-lg rounded-xl bg-light-bg dark:bg-dark-bg border ${
                  formErrors.name 
                    ? 'border-red-500' 
                    : 'border-gray-200 dark:border-gray-700'
                } text-light-text dark:text-dark-text focus:outline-none focus:border-light-accent`}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-500">Пожалуйста, введите имя</p>
              )}
            </div>
            
            {/* Поле телефона */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 text-lg">
                  +998
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(__) ___ __ __"
                  className={`w-full p-5 pl-16 text-lg rounded-xl bg-light-bg dark:bg-dark-bg border ${
                    formErrors.phone 
                      ? 'border-red-500' 
                      : 'border-gray-200 dark:border-gray-700'
                  } text-light-text dark:text-dark-text focus:outline-none focus:border-light-accent`}
                />
              </div>
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-500">Пожалуйста, введите корректный номер телефона</p>
              )}
            </div>
            
            {/* Поле компании */}
            <div className="mb-8">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Название компании"
                className="w-full p-5 text-lg rounded-xl bg-light-bg dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-light-text dark:text-dark-text focus:outline-none focus:border-light-accent"
              />
            </div>
            
            {/* Согласие на обработку данных */}
            <div className="flex items-start mb-10">
              <div className="flex items-center h-6">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleCheckboxChange}
                  className={`w-5 h-5 border ${
                    formErrors.consent 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  } rounded-sm bg-light-bg dark:bg-dark-bg focus:ring-light-accent`}
                />
              </div>
              <label 
                htmlFor="consent" 
                className={`ml-3 text-base font-medium ${
                  formErrors.consent 
                    ? 'text-red-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Соглашаюсь с политикой в отношении обработки персональных данных
              </label>
            </div>
            
            {/* Кнопка отправки */}
            <button
              type="submit"
              className="w-full py-5 px-6 text-lg bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
            >
              Отправить
            </button>
          </form>
        </div>
        
        {/* Правая колонка с изображением */}
        <div className="hidden md:block md:w-1/4 relative">
          <Image
            src="/images/health.jpg"
            alt="Медицинская страховка"
            className="object-cover h-full w-full rounded-2xl"
            fill
          />
        </div>
      </div>

      {/* Модальное окно подтверждения */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        position="center"
        size="sm"
        theme="brand"
        showCloseButton={false}
        showCloseIcon={true}
        title="Подтверждение заявки"
      >
        <div className="py-4 flex flex-col">
          <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-5 rounded-xl">
            <div className="mb-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Имя:</div>
              <div className="font-medium text-lg">{formData.name}</div>
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Телефон:</div>
              <div className="font-medium text-lg">+998 {formData.phone}</div>
            </div>
            {formData.company && (
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Компания:</div>
                <div className="font-medium text-lg">{formData.company}</div>
              </div>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
            Подтвердите отправку заявки.<br/>
            Наши специалисты свяжутся с вами в ближайшее время.
          </p>
          
          <div className="flex gap-3 mt-2">
            <button 
              onClick={closeConfirmationModal}
              className="flex-1 py-4 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Отменить
            </button>
            <button 
              onClick={confirmSubmission}
              className="flex-1 py-4 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
            >
              Подтвердить
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Модальное окно успешной отправки */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        position="center"
        size="sm"
        theme="brand"
        showCloseButton={true}
        showCloseIcon={false}
      >
        <div className="py-6 flex flex-col items-center justify-center text-center">
          <div className="bg-light-accent rounded-full p-5 mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-light-text dark:text-dark-text mb-4">
            Ваша заявка принята!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Специалисты нашей клиники свяжутся с вами в ближайшее время
          </p>
        </div>
      </Modal>
    </>
  );
}