'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { heroTranslations } from './translations';
import { useTranslation } from '@/src/hooks/useTranslation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Modal from '@/src/shared/components/Modal/Modal';
import { AppointmentForm } from '../AppointmentForm';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LocationIcon } from '../../ui/Icon';

export const HeroBanner: React.FC = () => {
  const { t } = useTranslation(heroTranslations);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Получаем данные слайдов из переводов
  const slides = t('slides', { returnObjects: true });
  const slidesArray = Array.isArray(slides) ? slides : [];
  
  // Ref для Swiper инстанса
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

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
    setFormSubmitted(false);
  };
  
  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setFormSubmitted(false);
  };
  
  // Обработчик успешной отправки формы
  const handleFormSuccess = () => {
    setFormSubmitted(true);
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
        onClose={closeModal}
        title={formSubmitted ? "" : t('modal.title')}
        subtitle={formSubmitted ? "" : t('modal.subtitle')}
        position="center"
        size="full"
        theme="brand"
        className="!w-[640px] max-w-[95vw] p-4 sm:p-6 md:p-8 lg:p-50"
        backdropClassName="flex items-center justify-center px-3 py-4"     
        contentClassName="flex flex-col"
        showCloseButton={false}
        showCloseIcon={true}
        titleClassName="text-xl md:text-2xl lg:text-3xl" 
        subtitleClassName="text-base md:text-lg"
      >
        {formSubmitted ? (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="bg-light-accent rounded-full p-5 mb-6">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-4">{t('modal.successTitle')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg md:text-xl">
              {t('modal.successMessage')}
            </p>
            <button 
              onClick={closeModal}
              className="w-full p-4 md:p-5 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors text-lg md:text-xl"
            >
              {t('modal.closeButton')}
            </button>
          </div>
        ) : (
          <AppointmentForm 
            onSuccess={handleFormSuccess}
            onCancel={closeModal}
            translationNamespace={heroTranslations}
          />
        )}
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