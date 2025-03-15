'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { heroTranslations } from './translations';
import { useTranslation } from '@/src/hooks/useTranslation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Modal from '@/src/shared/components/Modal/Modal';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LocationIcon, ArrowDownIcon } from '../../ui/Icon';

export const HeroBanner: React.FC = () => {
  const { t } = useTranslation(heroTranslations);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purpose: '',
  });
  
  // Состояние для отслеживания ошибок в полях
  const [formErrors, setFormErrors] = useState({
    name: false,
    phone: false,
    purpose: false,
    consent: false
  });
  
  // Открыт ли выпадающий список
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  
  // Получаем данные слайдов из переводов
  const slides = t('slides', { returnObjects: true });
  const slidesArray = Array.isArray(slides) ? slides : [];
  
  // Получаем опции для выпадающего списка
  const purposeOptions = t('modal.purposeOptions', { returnObjects: true });
  
  // Ref для Swiper инстанса
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  // Эффект для закрытия выпадающего списка при клике вне него
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsPurposeOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Эффект для сброса состояний при открытии/закрытии модального окна
  useEffect(() => {
    if (!isModalOpen) {
      // При закрытии модалки сбрасываем все состояния
      setIsSubmitting(false);
      setIsSuccess(false);
      setFormData({
        name: '',
        phone: '',
        purpose: '',
      });
      setFormErrors({
        name: false,
        phone: false,
        purpose: false,
        consent: false
      });
      setIsPurposeOpen(false);
    }
  }, [isModalOpen]);

  // Обработчик изменения индекса слайда
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  // Прямой переход к слайду по клику на индикатор
  const goToSlide = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };
  
  // Открытие модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  // Валидация отдельных полей
  const validateField = (name: string, value: string | boolean): boolean => {
    switch (name) {
      case 'name':
        return value !== '';
      case 'phone':
        const phoneDigits = (value as string).replace(/\D/g, '');
        return phoneDigits.length >= 12;
      case 'purpose':
        return value !== '';
      case 'consent':
        return !!value;
      default:
        return true;
    }
  };
  
  // Проверка валидности всей формы и установка ошибок
  const validateForm = () => {
    const nameValid = validateField('name', formData.name);
    const phoneValid = validateField('phone', formData.phone);
    const purposeValid = validateField('purpose', formData.purpose);
    
    // Проверяем состояние чекбокса согласия
    const consentCheckbox = document.querySelector('input[name="consent"]') as HTMLInputElement;
    const consentValid = consentCheckbox?.checked || false;
    
    // Обновляем состояние ошибок
    setFormErrors({
      name: !nameValid,
      phone: !phoneValid,
      purpose: !purposeValid,
      consent: !consentValid
    });
    
    return nameValid && phoneValid && purposeValid && consentValid;
  };
  
  // Обработка отправки формы
  const handleSubmit = () => {
    // Проверяем валидность формы
    if (!validateForm()) {
      return;
    }
    
    // Показываем состояние загрузки
    setIsSubmitting(true);
    
    // Имитация отправки данных на сервер
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };
  
  // Обработка изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Сбрасываем ошибку для этого поля при вводе
    setFormErrors(prev => ({ ...prev, [name]: false }));
  };
  
  // Обработка выбора цели из выпадающего списка
  const handlePurposeSelect = (value: string) => {
    setFormData(prev => ({ ...prev, purpose: value }));
    setFormErrors(prev => ({ ...prev, purpose: false }));
    setIsPurposeOpen(false);
  };
  
  // Форматирование телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Сохраняем +998 в начале
    if (!value.startsWith('998') && value.length > 0) {
      value = '998' + value;
    }
    
    // Форматируем телефон
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = '+' + value.substring(0, 3);
      
      if (value.length > 3) {
        formattedValue += ' (' + value.substring(3, 5) + ')';
      }
      
      if (value.length > 5) {
        formattedValue += ' ' + value.substring(5, 8);
      }
      
      if (value.length > 8) {
        formattedValue += '-' + value.substring(8, 10);
      }
      
      if (value.length > 10) {
        formattedValue += '-' + value.substring(10, 12);
      }
    }
    
    setFormData(prev => ({ ...prev, phone: formattedValue }));
    
    // Сбрасываем ошибку для телефона при вводе
    setFormErrors(prev => ({ ...prev, phone: false }));
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[500px] md:h-[480px] lg:h-[550px] rounded-2xl overflow-hidden mb-6 sm:mb-8 md:mb-10 mt-4">
      {slidesArray.length === 0 ? (
        <div className="absolute inset-0 w-full h-full bg-dark-bg flex items-center justify-center">
          <p className="text-white text-xl">Слайды не загружены</p>
        </div>
      ) : (
        <>
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            speed={800}
            loop={true}
            allowTouchMove={true}
            className="h-full w-full"
          >
            {slidesArray.map((slide, index) => (
              <SwiperSlide key={`slide-${index}`} className="w-full">
                <div className="relative w-full h-full">
                  {/* Фоновое изображение с позиционированием 50% справа */}
                  <div className="absolute inset-0 w-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={slide.image}
                        fill
                        alt={slide.title}
                        className="object-cover object-[70%_center]" 
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/70 via-dark-bg/40 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Контент слайда */}
                  <div className="relative h-full px-8 md:px-12 lg:px-50 flex flex-col justify-center">
                    <div className="max-w-[700px]">
                      {/* Заголовок с переносами строк */}
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#094A54] mb-3 sm:mb-4 md:mb-5 leading-[1.15]">
                        {slide.title_parts ? (
                          <>
                            {slide.title_parts.map((part : string, i : number) => (
                              <React.Fragment key={i}>
                                {part}
                                {i < slide.title_parts.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </>
                        ) : (
                          slide.title
                        )}
                      </h1>
                      
                      {/* Описание */}
                      <p className="text-base sm:text-lg md:text-xl text-[#094A54] mb-5 sm:mb-6 md:mb-8">
                        {slide.description}
                      </p>
                      
                      {/* Анимированная кнопка */}
                      <button 
                        onClick={openModal}
                        className="appointment-button bg-light-accent text-white py-3 px-6 sm:py-3.5 sm:px-7 md:py-4 md:px-8 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 relative overflow-hidden"
                      >
                        <span className="relative z-10">{t('appointmentButton')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Кастомные индикаторы слайдов - только для планшетов и десктопов */}
          {slidesArray.length > 1 && (
            <div className="hidden sm:flex absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 space-x-4 z-10">
              {slidesArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-[15px] w-[15px] rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-white' // #FFFFFF - активный
                      : 'bg-white/50' // #FFFFFF80 - неактивный
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Локация внизу */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 md:left-12 lg:left-50 flex items-center text-white z-10">
            <LocationIcon color="#094A54" size={20} className="mr-4" />
            <span className="text-xs sm:text-sm md:text-base text-[#094A54]">{t('location')}</span>
          </div>
        </>
      )}
      
      {/* Модальное окно записи на прием */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={!isSuccess ? t('modal.title') : ""}
        subtitle={!isSuccess ? t('modal.subtitle') : ""}
        position="center"
        size="full"
        theme="brand"
        className="!w-[640px] h-[640px] p-4 sm:p-6 md:p-8 lg:p-50"
        backdropClassName="flex items-center justify-center"
        contentClassName="flex flex-col"
        showCloseButton={false}
        showCloseIcon={true}
        titleClassName="text-xl md:text-2xl lg:text-3xl" 
        subtitleClassName="text-base md:text-lg"
      >
        <div className="space-y-6 flex flex-col flex-grow">
          {isSuccess ? (
            /* Экран успешной отправки - без заголовка и подзаголовка */
            <div className="py-12 flex flex-col items-center justify-center text-center flex-grow">
              <div className="bg-light-accent rounded-full p-6 mb-8">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-6">{t('modal.successTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg md:text-xl">
                {t('modal.successMessage')}
              </p>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                }}
                className="w-full p-4 md:p-5 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors text-lg md:text-xl"
              >
                {t('modal.closeButton')}
              </button>
            </div>
          ) : (
            /* Форма заполнения */
            <>
              {/* Поле имени */}
              <div className="flex-1 mb-20">
                <div className="mb-5">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
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
                        document.querySelector('input[name="phone"]')?.focus();
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
                    value={formData.phone}
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
                        {formData.purpose ? purposeOptions[formData.purpose as keyof typeof purposeOptions] : t('modal.purposePlaceholder')}
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
                    onChange={() => setFormErrors(prev => ({ ...prev, consent: false }))}
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
                className="w-full p-4 md:p-5 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors flex justify-center items-center text-base md:text-xl"
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
            </>
          )}
        </div>
      </Modal>
      
      {/* CSS для анимации кнопки */}
      <style jsx global>{`
        /* Пульсирующая анимация */
        .appointment-button {
          transform: translateZ(0);
          box-shadow: 0 0 0 0 rgba(0, 199, 139, 0.7);
          animation: pulse 2s infinite cubic-bezier(0.66, 0, 0, 1);
        }
        
        @keyframes pulse {
          to {
            box-shadow: 0 0 0 15px rgba(0, 199, 139, 0);
          }
        }
        
        /* Эффект блика при наведении */
        .appointment-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%);
          transform: skewX(-25deg);
          transition: all 0.75s;
          z-index: 1;
        }
        
        .appointment-button:hover::before {
          animation: shine 1.5s infinite;
        }
        
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        
        /* Эффект увеличения при наведении */
        .appointment-button:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 199, 139, 0.3);
        }
      `}</style>
    </div>
  );
};