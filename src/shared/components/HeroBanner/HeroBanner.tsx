'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { heroTranslations } from './translations';
import { useTranslation } from '@/src/hooks/useTranslation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { LocationIcon } from '../../ui/Icon';

export const HeroBanner: React.FC = () => {
  const { t } = useTranslation(heroTranslations);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Получаем данные слайдов из переводов
  const slides = t('slides', { returnObjects: true });
  const slidesArray = Array.isArray(slides) ? slides : [];
  
  // Ref для Swiper инстанса
  const swiperRef = useRef<any>(null);

  // Обработчик изменения индекса слайда
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  // Прямой переход к слайду по клику на индикатор
  const goToSlide = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] rounded-2xl overflow-hidden mb-6 sm:mb-8 md:mb-10 mt-4">
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
                  <div className="relative h-full  px-4 flex flex-col justify-center">
                    <div className="max-w-[700px] ">
                      {/* Заголовок с переносами строк */}
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#094A54] mb-3 sm:mb-4 md:mb-5 leading-[1.15]">
                        {slide.title_parts ? (
                          <>
                            {slide.title_parts.map((part, i) => (
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
                      
                      {/* Кнопка */}
                      <button className="bg-light-accent text-white py-3 px-6 sm:py-3.5 sm:px-7 md:py-4 md:px-8 rounded-xl text-base sm:text-lg font-medium transition-colors">
                        {t('appointmentButton')}
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
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 md:left-6 flex items-center text-white z-10">
          <LocationIcon color="#094A54" size={20} className="mr-4" />
            <span className="text-xs sm:text-sm md:text-base text-[#094A54]">{t('location')}</span>
          </div>
        </>
      )}
    </div>
  );
};