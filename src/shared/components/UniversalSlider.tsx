/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { useThemeStore } from '@/src/store/theme';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Интерфейс для универсального слайдера
export interface UniversalSliderProps {
  // Содержимое слайдера
  slides: ReactNode[];
  
  // Настройки слайдера
  slidesPerView?: number;
  slidesPerMobileView?: number;
  mobileBreakpoint?: number; // Брейкпоинт для переключения на мобильное представление
  spaceBetween?: number;
  loop?: boolean;
  speed?: number;
  autoplay?: boolean | { delay: number; disableOnInteraction?: boolean };
  
  // Настройки навигации
  showNavigation?: boolean;
  navigationPrevLabel?: string;
  navigationNextLabel?: string;
  customPrevButton?: ReactNode;
  customNextButton?: ReactNode;
  
  // Настройки пагинации
  showPagination?: boolean;
  paginationClassName?: string;
  
  // Заголовок слайдера
  title?: string | ReactNode;
  description?: string | ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  
  // Стилизация
  className?: string;
  slideClassName?: string;
  wrapperClassName?: string;
  
  // События
  onSlideChange?: (index: number) => void;
  onInit?: (swiper: any) => void;
}

export const UniversalSlider: React.FC<UniversalSliderProps> = ({
  // Содержимое
  slides = [],
  
  // Настройки слайдера
  slidesPerView = 2,
  slidesPerMobileView = 1,
  mobileBreakpoint = 768,
  spaceBetween = 20,
  loop = false,
  speed = 500,
  autoplay = false,
  
  // Навигация
  showNavigation = true,
  navigationPrevLabel = "Предыдущий слайд",
  navigationNextLabel = "Следующий слайд",
  customPrevButton,
  customNextButton,
  
  // Пагинация
  showPagination = false,
  paginationClassName = "swiper-pagination-custom",
  
  // Заголовок
  title,
  description,
  titleClassName = "text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4",
  descriptionClassName = "text-light-text dark:text-dark-text text-base md:text-lg mb-6",
  
  // Стилизация
  className = "",
  slideClassName = "",
  wrapperClassName = "",
  
  // События
  onSlideChange,
  onInit,
}) => {
  const { theme } = useThemeStore();
  
  // Рефы для кнопок навигации
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  
  // Состояние для адаптивности
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeSlidePerView, setActiveSlidePerView] = useState<number>(
    typeof window !== 'undefined' && window.innerWidth < mobileBreakpoint 
      ? slidesPerMobileView 
      : slidesPerView
  );
  
  // Определение размера экрана
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < mobileBreakpoint;
      setIsMobile(mobile);
      setActiveSlidePerView(mobile ? slidesPerMobileView : slidesPerView);
    };
    
    // Инициализация при монтировании
    handleResize();
    
    // Подписка на изменение размера окна
    window.addEventListener('resize', handleResize);
    
    // Отписка при размонтировании
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileBreakpoint, slidesPerMobileView, slidesPerView]);
  
  // Обработчик смены слайда
  const handleSlideChange = (swiper: any) => {
    // Сохраняем позицию скролла чтобы избежать прыжков
    const currentScrollPosition = window.scrollY;
    
    // Вызываем пользовательский обработчик, если он предоставлен
    if (onSlideChange) {
      onSlideChange(swiper.activeIndex);
    }
    
    // Восстанавливаем позицию скролла после небольшой задержки
    setTimeout(() => {
      window.scrollTo({
        top: currentScrollPosition,
        behavior: 'auto'
      });
    }, 50);
  };
  
  // Рендер заголовка и описания
  const renderHeader = () => {
    if (!title && !description) return null;
    
    return (
      <div className={`${wrapperClassName} mb-6`}>
        <div className={`flex flex-col ${isMobile ? 'space-y-4' : 'md:flex-row justify-between'}`}>
          {title && (
            <div className={`${isMobile ? 'w-full' : 'md:w-1/2'} mb-4 md:mb-0`}>
              {typeof title === 'string' ? (
                <h2 className={titleClassName}>{title}</h2>
              ) : (
                title
              )}
            </div>
          )}
          
          {description && (
            <div className={`${isMobile ? 'w-full' : 'md:w-1/2'}`}>
              {typeof description === 'string' ? (
                <p className={descriptionClassName}>{description}</p>
              ) : (
                description
              )}
              
              {/* Если navigation кнопки должны быть рядом с описанием */}
              {showNavigation && !customPrevButton && !customNextButton && (
                <div className="flex items-center gap-2 mt-4">
                  <button
                    ref={prevButtonRef}
                    className={`w-12 h-12 rounded-lg border ${
                      theme === 'light' ? 'border-light-text' : 'border-dark-text'
                    } flex items-center justify-center transition-colors swiper-button-prev-custom`}
                    aria-label={navigationPrevLabel}
                  >
                    <svg 
                      className={`w-6 h-6 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M15 19l-7-7 7-7" 
                      />
                    </svg>
                  </button>
                  
                  <button
                    ref={nextButtonRef}
                    className={`w-12 h-12 rounded-lg bg-light-accent text-white flex items-center justify-center transition-colors swiper-button-next-custom`}
                    aria-label={navigationNextLabel}
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Рендер навигационных кнопок (если они не должны быть рядом с описанием)
const renderNavigation = () => {
  if (!showNavigation || (description && !customPrevButton && !customNextButton)) return null;

  return (
    <div className="flex items-center gap-2 mb-6">
      {customPrevButton ? (
        React.cloneElement(
          customPrevButton as React.ReactElement<any>, 
          { 
            ref: prevButtonRef as React.Ref<any>,
            className: `swiper-button-prev-custom ${(customPrevButton as React.ReactElement<any>).props.className || ''}` 
          }
        )
      ) : (
        <button
          ref={prevButtonRef}
          className={`w-12 h-12 rounded-lg border ${
            theme === 'light' ? 'border-light-text' : 'border-dark-text'
          } flex items-center justify-center transition-colors swiper-button-prev-custom`}
          aria-label={navigationPrevLabel}
        >
          <svg 
            className={`w-6 h-6 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
      )}
      
      {customNextButton ? (
        React.cloneElement(
          customNextButton as React.ReactElement<any>, 
          { 
            ref: nextButtonRef as React.Ref<any>,
            className: `swiper-button-next-custom ${(customNextButton as React.ReactElement<any>).props.className || ''}` 
          }
        )
      ) : (
        <button
          ref={nextButtonRef}
          className={`w-12 h-12 rounded-lg bg-light-accent text-white flex items-center justify-center transition-colors swiper-button-next-custom`}
          aria-label={navigationNextLabel}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};
  
  // Если нет слайдов, не рендерим слайдер
  if (!slides || slides.length === 0) {
    return null;
  }
  
  return (
    <div className={`w-full ${className}`}>
      {/* Рендер заголовка и описания */}
      {renderHeader()}
      
      {/* Рендер навигации, если она должна быть отдельно */}
      {renderNavigation()}
      
      {/* Слайдер */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={activeSlidePerView}
          spaceBetween={spaceBetween}
          loop={loop}
          speed={speed}
          autoplay={autoplay}
          breakpoints={{
            [mobileBreakpoint]: {
              slidesPerView: slidesPerView,
              spaceBetween: spaceBetween,
            }
          }}
          onSlideChange={handleSlideChange}
          watchSlidesProgress={true}
          preventInteractionOnTransition={true}
          navigation={showNavigation ? {
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          } : false}
          pagination={showPagination ? {
            clickable: true,
            el: `.${paginationClassName}`,
            bulletClass: `${paginationClassName}-bullet`,
            bulletActiveClass: `${paginationClassName}-bullet-active`,
          } : false}
          onBeforeInit={(swiper) => {
            // Настройка навигационных элементов
            if (showNavigation && typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevButtonRef.current;
              swiper.params.navigation.nextEl = nextButtonRef.current;
            }
            
            // Вызов пользовательского обработчика инициализации
            if (onInit) {
              onInit(swiper);
            }
          }}
          className="universal-slider"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className={`universal-slide ${slideClassName}`}>
              {slide}
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Пагинация */}
        {showPagination && (
          <div className={`${paginationClassName} flex justify-center space-x-2 mt-4`}></div>
        )}
      </div>
      
      {/* Стили для слайдера */}
      <style jsx global>{`
       .universal-slider {
    width: 100%;
    overflow-x: hidden !important; /* Изменено с visible на hidden */
    padding-bottom: 20px;
    position: relative;
    z-index: 1;
  }
  
  .swiper-slide {
    /* width: ${100 / activeSlidePerView}% !important; Явно задаем ширину слайда */
    height: auto;
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: transform;
  }
  
        
        .swiper-wrapper {
          display: flex;
          align-items: stretch;
          transition-timing-function: ease-out;
        }
        
        .swiper-container {
          touch-action: pan-y;
        }
        
        .swiper-slide {
          height: auto;
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: transform;
        }
        
        .${paginationClassName}-bullet {
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 50%;
          background: #ccc;
          opacity: 0.7;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .${paginationClassName}-bullet-active {
          opacity: 1;
          background: var(--light-accent);
          width: 10px;
          height: 10px;
        }
        
        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: ${mobileBreakpoint}px) {
          .universal-slider {
            overflow-x: hidden !important;
          }
        }
      `}</style>
    </div>
  );
};