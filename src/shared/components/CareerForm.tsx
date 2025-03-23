'use client';

import React, { useState, useRef } from 'react';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import Link from 'next/link';
import Modal from '@/src/shared/components/Modal/Modal';
import { useFormValidation } from '@/src/hooks/useFormValidation';

const translations = {
  ru: {
    title: 'Станьте частью команды экспертов в медицине',
    description: 'Работайте в динамичной и профессиональной среде, где ценят ваш опыт, поддерживают развитие и создают условия для карьерного роста',
    aboutButton: 'Подробнее О клинике',
    namePlaceholder: 'Имя',
    phonePlaceholder: '+998 (__) ___-__-__',
    attachResume: 'Прикрепите свое резюме в PDF формате',
    coverLetter: 'Сопроводительное письмо',
    consent: 'Соглашаюсь с политикой в отношении обработки персональных данных',
    submit: 'Отправить',
    nameError: 'Пожалуйста, введите имя',
    phoneError: 'Пожалуйста, введите корректный номер телефона',
    consentError: 'Необходимо согласие с политикой',
    confirmTitle: 'Подтверждение отправки',
    confirmMessage: 'Проверьте правильность введенных данных перед отправкой',
    confirmClose: 'Отмена',
    confirmSubmit: 'Отправить',
    successTitle: 'Заявка отправлена!',
    successMessage: 'Спасибо за ваш интерес к нашей клинике. Мы свяжемся с вами в ближайшее время',
    successThankYou: 'Спасибо!',
    successDetailedMessage: 'Мы внимательно рассмотрим вашу кандидатуру, и если ваш опыт и навыки соответствуют нашим требованиям, наш HR-менеджер обязательно свяжется с вами',
    successClose: 'Закрыть',
    resume: 'Резюме',
    notSelected: 'Не выбрано'
  },
  uz: {
    title: 'Tibbiyotda ekspertlar jamoasiga qo\'shiling',
    description: 'Tajribangizni qadrlaydigan, rivojlanishni qo\'llab-quvvatlaydigan va karyera o\'sishi uchun sharoit yaratadigan dinamik va professional muhitda ishlang',
    aboutButton: 'Klinika haqida batafsil',
    namePlaceholder: 'Ism',
    phonePlaceholder: '+998 (__) ___-__-__',
    attachResume: 'PDF formatida o\'z rezyumengizni biriktiring',
    coverLetter: 'Yo\'ldosh xat',
    consent: 'Shaxsiy ma\'lumotlarni qayta ishlash siyosatiga roziman',
    submit: 'Yuborish',
    nameError: 'Iltimos, ismingizni kiriting',
    phoneError: 'Iltimos, to\'g\'ri telefon raqamini kiriting',
    consentError: 'Siyosatga rozilik zarur',
    confirmTitle: 'Yuborishni tasdiqlash',
    confirmMessage: 'Yuborishdan oldin kiritilgan ma\'lumotlarni tekshiring',
    confirmClose: 'Bekor qilish',
    confirmSubmit: 'Yuborish',
    successTitle: 'Ariza yuborildi!',
    successMessage: 'Klinikamizga qiziqish bildirganingiz uchun rahmat. Tez orada siz bilan bog\'lanamiz',
    successThankYou: 'Rahmat!',
    successDetailedMessage: 'Biz sizning nomzodingizni sinchkovlik bilan ko\'rib chiqamiz, va agar sizning tajribangiz va ko\'nikmalaringiz bizning talablarimizga mos kelsa, HR-menejerimiz siz bilan bog\'lanadi',
    successClose: 'Yopish',
    resume: 'Rezyume',
    notSelected: 'Tanlanmagan'
  }
};

const CareerForm = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Модальные окна
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Локальное состояние для чекбокса
  const [consentChecked, setConsentChecked] = useState(false);
  
  // Локальное состояние для хранения файла, чтобы обойти ограничения типов
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  // Используем хук валидации формы
  const {
    formData,
    formErrors,
    handleInputChange,
    handlePhoneChange,
    validateForm,
    setFormData,
    setFormErrors,
    resetForm
  } = useFormValidation(
    {
      name: '',
      phone: '',
      coverLetter: '',
      resume: '',  // Изменено с null на пустую строку для совместимости
      consent: false
    },
    {
      name: { required: true },
      phone: { 
        required: true,
        customValidator: (value) => {
          const phoneDigits = String(value).replace(/\D/g, '');
          return phoneDigits.length >= 12;
        }
      },
      consent: { 
        required: true,
        customValidator: (value) => Boolean(value) === true
      }
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
    // В formData храним только строку - имя файла или идентификатор
    setFormData({ ...formData, resume: file ? file.name : '' });
  };

  // Обработка чекбокса с локальным состоянием
  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsentChecked(e.target.checked);
    // Обновляем значение в formData
    setFormData({ ...formData, consent: e.target.checked });
    // Сбрасываем ошибку
    setFormErrors({ ...formErrors, consent: false });
  };

  const handleSubmitClick = () => {
    if (validateForm()) {
      setIsConfirmModalOpen(true);
    }
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleConfirmSubmit = () => {
    setIsConfirmModalOpen(false);
    
    // Здесь была бы логика отправки формы на сервер, где объединяем formData и файл
    console.log('Form submitted:', { 
      ...formData, 
      resumeFile // Здесь мы добавляем сам файл для отправки
    });
    
    // Показываем модальное окно успеха
    setIsSuccessModalOpen(true);
  };
  
  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    resetForm();
    setConsentChecked(false);
    setResumeFile(null);
  };

  // Получение имени файла безопасно
  const getFileName = () => {
    return resumeFile ? resumeFile.name : t('notSelected');
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-5 rounded-2xl overflow-hidden  mt-6 sm:mt-8 md:mt-40 mb-6 sm:mb-8 md:mb-40">
        {/* Left section with background image */}
        <div className="w-full md:w-1/2 bg-light-accent text-white p-8 relative min-h-[340px] md:min-h-[490px] rounded-2xl overflow-hidden">
          
          {/* Добавлен новый фоновый элемент */}
          <div 
            className="absolute -right-[150px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block" 
            style={{
              backgroundImage: 'url(/images/doctor-pattern.png)',
              backgroundSize: 'contain',
              transform: 'rotate(0deg)',
              backgroundPosition: 'right bottom',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-6">{t('title')}</h2>
              <p className="text-base md:text-lg mb-8 max-w-md">{t('description')}</p>
            </div>
            
            <div className="mt-auto">
              <Link href="/clinic/about" className="inline-flex items-center gap-2 py-3 px-6 border border-white rounded-xl text-white hover:bg-white/10 transition-colors">
                {t('aboutButton')}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right section with form */}
        <div className={`w-full md:w-1/2 p-8 ${theme === 'light' ? 'bg-white' : 'bg-dark-block'} rounded-2xl`}>
          <div className="flex flex-col space-y-6">
            {/* Name field */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name as string}
                onChange={handleInputChange}
                placeholder={t('namePlaceholder')}
                className={`w-full p-4 rounded-xl bg-light-bg dark:bg-dark-bg border ${
                  formErrors.name 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-200 dark:border-gray-700 focus:ring-light-accent'
                } focus:outline-none focus:ring-2 text-light-text dark:text-dark-text`}
              />
              {formErrors.name && (
                <p className="mt-2 text-sm text-red-500">{t('nameError')}</p>
              )}
            </div>
            
            {/* Phone field */}
            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone as string}
                onChange={handlePhoneChange}
                placeholder={t('phonePlaceholder')}
                className={`w-full p-4 rounded-xl bg-light-bg dark:bg-dark-bg border ${
                  formErrors.phone 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-200 dark:border-gray-700 focus:ring-light-accent'
                } focus:outline-none focus:ring-2 text-light-text dark:text-dark-text`}
              />
              {formErrors.phone && (
                <p className="mt-2 text-sm text-red-500">{t('phoneError')}</p>
              )}
            </div>
            
            {/* Resume upload */}
            <div>
              <button
                type="button"
                onClick={handleAttachClick}
                className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-light-bg dark:bg-dark-bg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-light-text dark:text-dark-text"
              >
                <svg className="w-6 h-6 text-light-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                </svg>
                <span className="flex-1 text-left">{getFileName()}</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
                aria-label={t('attachResume')}
              />
            </div>
            
            {/* Cover letter */}
            <div>
              <textarea
                name="coverLetter"
                value={formData.coverLetter as string}
                onChange={handleInputChange}
                placeholder={t('coverLetter')}
                rows={4}
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-light-bg dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-light-accent resize-none text-light-text dark:text-dark-text"
              />
            </div>
            
            {/* Checkbox with proper alignment */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={consentChecked}
                onChange={handleConsentChange}
                className={`h-5 w-5 rounded border-gray-300 text-light-accent focus:ring-light-accent ${
                  formErrors.consent ? 'border-red-500' : ''
                }`}
              />
              <label htmlFor="consent" className="ml-3 block text-sm text-light-text dark:text-dark-text">
                {t('consent')}
              </label>
            </div>
            {formErrors.consent && (
              <p className="mt-1 text-sm text-red-500">{t('consentError')}</p>
            )}
            
            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmitClick}
              className="w-full p-4 bg-light-accent text-white rounded-xl hover:bg-light-accent/90 transition-colors"
            >
              {t('submit')}
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно подтверждения */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title={t('confirmTitle')}
        position="center"
        size="sm"
        theme="brand"
        showCloseButton={false}
        closeText={t('confirmClose')}
      >
        <div className="py-4">
          <p className="text-gray-600 dark:text-gray-300 mb-6">{t('confirmMessage')}</p>
          
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-5 rounded-xl mb-6">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('namePlaceholder')}:</div>
              <div className="font-medium">{formData.name}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('phonePlaceholder')}:</div>
              <div className="font-medium">{formData.phone}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('resume')}:</div>
              <div className="font-medium">{getFileName()}</div>
            </div>
            
            {formData.coverLetter && (
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('coverLetter')}:</div>
                <div className="font-medium">{formData.coverLetter}</div>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleConfirmSubmit}
            className="w-full py-4 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
          >
            {t('confirmSubmit')}
          </button>
        </div>
      </Modal>
      
      {/* Модальное окно успешной отправки */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessClose}
        title={t('successTitle')}
        position="center"
        size="sm"
        theme="brand"
        showCloseButton={true}
        closeText={t('successClose')}
      >
        <div className="py-6 flex flex-col items-center justify-center text-center">
          <div className="bg-light-accent rounded-full p-5 mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-medium mb-4 text-light-text dark:text-dark-text">{t('successThankYou')}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('successDetailedMessage')}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CareerForm;