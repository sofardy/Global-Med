'use client';

import React, { useState, useEffect, useRef } from 'react';
import { UniversalCard } from '../components/UniversalCard';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { MedicalTrackerIcon, ButterflyIcon } from '../ui/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Интерфейсы для типизации данных
interface SliderTranslations {
  ru: {
    title: string;
    description: string;
    prevSlide: string;
    nextSlide: string;
    goToSlide: string;
    cards: CardData[];
  };
  uz: {
    title: string;
    description: string;
    prevSlide: string;
    nextSlide: string;
    goToSlide: string;
    cards: CardData[];
  };
}

interface CardData {
  title: string;
  description: string;
  investigationsCount: number;
  timeRequired: string;
  buttonText: string;
}

interface ExtendedCardData extends CardData {
  link: string;
  variant: "default" | "checkup" | "specialist" | "analysis" | "service" | "family";
  className: string;
  icon: React.ReactNode;
  styles: {
    container: React.CSSProperties;
    title: React.CSSProperties;
    description: React.CSSProperties;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Для дополнительных свойств
}

// Константа с переводами для компонента
const sliderTranslations: SliderTranslations = {
  ru: {
    title: "Пройдите чек-ап за один визит",
    description: "Быстрое обследование для выявления скрытых заболеваний и контроля за состоянием здоровья",
    prevSlide: "Предыдущий слайд",
    nextSlide: "Следующий слайд",
    goToSlide: "Перейти к слайду",
    cards: [
      {
        title: "Здоровая семья",
        description: "Комплексное обследование для мужчин и женщин, помогающее оценить общее состояние здоровья и выявить риски заболеваний",
        investigationsCount: 11,
        timeRequired: "2 часа", 
        buttonText: "Подробнее"
      },
      {
        title: "Хочу стать мамой",
        description: "Комплексное обследование для женщин, планирующих беременность, включающее важные анализы, УЗИ и консультации специалистов для подготовки к здоровому зачатию",
        investigationsCount: 12,
        timeRequired: "2 часа", 
        buttonText: "Подробнее"
      }
    ]
  },
  uz: {
    title: "Bir tashrif davomida tekshiruvdan o'ting",
    description: "Yashirin kasalliklarni aniqlash va sog'lig'ingizni nazorat qilish uchun tezkor tekshiruv",
    prevSlide: "Oldingi slayd",
    nextSlide: "Keyingi slayd",
    goToSlide: "Slaydga o'tish",
    cards: [
      {
        title: "Sog'lom oila",
        description: "Erkaklar va ayollar uchun kompleks tekshiruv, umumiy sog'liqni baholash va kasallik xavflarini aniqlashga yordam beradi",
        investigationsCount: 11,
        timeRequired: "2 soat", 
        buttonText: "Batafsil"
      },
      {
        title: "Ona bo'lmoqchiman",
        description: "Homiladorlikni rejalashtiruvchi ayollar uchun kompleks tekshiruv: muhim tahlillar, UTT va sog'lom homiladorlikka tayyorgarlik uchun mutaxassislar konsultatsiyasi",
        investigationsCount: 12,
        timeRequired: "2 soat", 
        buttonText: "Batafsil"
      }
    ]
  }
};

// Функция для разделения текста на указанное количество строк
const splitTextIntoLines = (text: string, lineCount: number): string[] => {
  const words = text.split(' ');
  const wordsPerLine = Math.ceil(words.length / lineCount);
  
  const lines: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    const startIndex = i * wordsPerLine;
    const endIndex = Math.min(startIndex + wordsPerLine, words.length);
    if (startIndex < words.length) {
      lines.push(words.slice(startIndex, endIndex).join(' '));
    }
  }
  
  return lines;
};

export const CheckupSlider: React.FC = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(sliderTranslations);
  
  // Refs для кнопок навигации Swiper
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [slidesPerView, setSlidesPerView] = useState<number>(isMobile ? 1 : 2);
  
  // Добавляем обработчик события перехода между слайдами
  const handleSlideChange = () => {
    // Сохраняем текущую позицию скролла
    const currentScrollPosition = window.scrollY;
    
    // Восстанавливаем позицию скролла после небольшой задержки
    setTimeout(() => {
      window.scrollTo({
        top: currentScrollPosition,
        behavior: 'auto' // Мгновенный скролл без анимации
      });
    }, 50);
  };
  
  // Получаем локализованные данные
  const title: string = t('title');
  const description: string = t('description');
  const cardsData = t('cards', { returnObjects: true }) as CardData[];
  
  // Формируем список карточек с локализованными данными
  const cards: ExtendedCardData[] = [
    {
      ...cardsData[0],
      link: "/checkups/family",
      variant: "family",
      className: "min-h-[430px] hover:shadow-lg transition-all duration-300 relative",
      icon: <MedicalTrackerIcon size={190} color={theme === 'light' ? '#094A54' : '#ffffff'} />,
      styles: {
        container: { padding: '40px', position: 'relative' },
        title: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 500, fontSize: '40px' },
        description: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 400, fontSize: '18px' }
      }
    },
    {
      ...cardsData[0],
      link: "/checkups/family",
      variant: "family",
      className: "min-h-[430px] hover:shadow-lg transition-all duration-300 relative",
      icon: <MedicalTrackerIcon size={190} color={theme === 'light' ? '#094A54' : '#ffffff'} />,
      styles: {
        container: { padding: '40px', position: 'relative' },
        title: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 500, fontSize: '40px' },
        description: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 400, fontSize: '18px' }
      }
    },
    {
      ...cardsData[0],
      link: "/checkups/family",
      variant: "family",
      className: "min-h-[430px] hover:shadow-lg transition-all duration-300 relative",
      icon: <MedicalTrackerIcon size={190} color={theme === 'light' ? '#094A54' : '#ffffff'} />,
      styles: {
        container: { padding: '40px', position: 'relative' },
        title: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 500, fontSize: '40px' },
        description: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 400, fontSize: '18px' }
      }
    },
    {
      ...cardsData[0],
      link: "/checkups/family",
      variant: "family",
      className: "min-h-[430px] hover:shadow-lg transition-all duration-300 relative",
      icon: <MedicalTrackerIcon size={190} color={theme === 'light' ? '#094A54' : '#ffffff'} />,
      styles: {
        container: { padding: '40px', position: 'relative' },
        title: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 500, fontSize: '40px' },
        description: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 400, fontSize: '18px' }
      }
    },
    {
      ...cardsData[1],
      link: "/checkups/pregnancy",
      textColor: "text-white",
      variant: "family",
      className: "min-h-[430px] hover:shadow-lg transition-all duration-300 relative",
      icon: <ButterflyIcon size={190} color={theme === 'light' ? '#094A54' : '#ffffff'} />,
      styles: {
        container: { padding: '40px', position: 'relative' },
        title: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 500, fontSize: '40px' },
        description: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 400, fontSize: '18px' }
      }
    }
  ];
  
  // Разделение текстов на строки
  const titleLines: string[] = splitTextIntoLines(title, 2);
  const descriptionLines: string[] = splitTextIntoLines(description, 3);

  // Определение размера экрана и адаптация под мобильные устройства
  useEffect(() => {
    const updateSlidesPerView = () => {
      const windowWidth = window.innerWidth;
      const isMobileView = windowWidth < 768;
      
      if (isMobileView) {
        // На мобильных устройствах показываем 1 слайд
        setSlidesPerView(1);
      } else {
        // На десктопах показываем 2 слайда
        setSlidesPerView(2);
      }
      
      setIsMobile(isMobileView);
    };
    
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);
  
  return (
    <div className="w-full">
      {/* Адаптивный заголовок и управление */}
      <div className={`flex flex-col ${isMobile ? 'space-y-4' : 'md:flex-row justify-between items-start md:items-start'} mb-6 mt-20`}>
        {/* Заголовок на 2 строки */}
        <div className={`${isMobile ? 'w-full' : 'md:w-1/2'} mb-4 md:mb-0`}>
          <h2 className="text-3xl md:text-[40px] font-bold text-light-text dark:text-dark-text">
            {titleLines.map((line, index) => (
              <span key={index} className="block">{line}</span>
            ))}
          </h2>
        </div>
        
        {/* Описание на 3 строки и кнопки под ним */}
        <div className={`${isMobile ? 'w-full' : 'md:w-1/2'} flex flex-col md:flex-col justify-between`}>
          {/* Описание текста */}
          <div className="mb-4 w-full">
            <p className="text-light-text dark:text-dark-text text-base md:text-lg">
              {descriptionLines.map((line, index) => (
                <span key={index} className="block">{line}</span>
              ))}
            </p>
          </div>
          
          {/* Кнопки навигации */}
          <div className="flex items-center gap-2 self-start">
            <button
              ref={prevButtonRef}
              className={`w-12 h-12 rounded-lg border ${theme === 'light' ? 'border-light-text' : 'border-dark-text'} flex items-center justify-center transition-colors swiper-button-prev-custom`}
              aria-label={t('prevSlide')}
            >
              <svg className={`w-6 h-6 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              ref={nextButtonRef}
              className={`w-12 h-12 rounded-lg bg-light-accent text-white flex items-center justify-center transition-colors swiper-button-next-custom`}
              aria-label={t('nextSlide')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Слайдер с карточками */}
      <div className="relative mb-6">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={slidesPerView}
          spaceBetween={20}
          slidesPerGroup={1}
          speed={500}
          loop={false}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            }
          }}
          onSlideChange={handleSlideChange}
          watchSlidesProgress={true}
          preventInteractionOnTransition={true}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          pagination={isMobile ? {
            clickable: true,
            el: '.swiper-pagination-custom',
            bulletClass: 'swiper-pagination-bullet-custom',
            bulletActiveClass: 'swiper-pagination-bullet-active-custom',
          } : false}
          onBeforeInit={(swiper) => {
            // Настройка навигационных элементов
            if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevButtonRef.current;
              swiper.params.navigation.nextEl = nextButtonRef.current;
            }
          }}
          className="checkup-swiper"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} className="checkup-slide">
              <div className="h-full">
                <UniversalCard 
                  {...card}
                  bordered={true}
                  borderRadius="2xl"
                  padding="0"
                  className={`${card.className} h-full`}
                  hoverColor={card.bgColorLight || (theme === 'light' ? 'bg-light-accent hover:bg-light-accent' : 'bg-dark-accent hover:bg-dark-accent')}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Пагинация для мобильных устройств */}
        <div className="swiper-pagination-custom flex justify-center space-x-2 mt-4 md:hidden"></div>
      </div>
      
      <style jsx global>{`
        /* Стили для слайдера */
        .checkup-swiper {
          width: 100%;
          overflow: hidden !important;
          padding-bottom: 10px;
          position: relative;
          z-index: 1; /* Предотвращаем проблемы со стекингом */
        }
        
        .checkup-slide {
          height: auto;
          display: flex;
          align-items: stretch;
          transition: transform 0.3s ease;
        }
        
        /* Убираем видимость частичных слайдов */
        .swiper-wrapper {
          display: flex;
          align-items: stretch;
          transition-timing-function: ease-out;
        }
        
        /* Предотвращаем скролл страницы при использовании слайдера */
        .swiper-container {
          touch-action: pan-y;
        }
        
        .swiper-slide {
          height: auto;
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: transform;
        }
        
        /* Оптимизации для предотвращения скачков при прокрутке */
        html, body {
          scroll-behavior: auto !important;
        }
        
        /* Предотвращаем смещение скролла */
        .swiper-container-pointer-events {
          touch-action: pan-y;
        }
        
        /* Стили для пагинации */
        .swiper-pagination-bullet-custom {
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
        
        .swiper-pagination-bullet-active-custom {
          opacity: 1;
          background: var(--light-accent);
          width: 10px;
          height: 10px;
        }
        
        /* Стили для карточек */
        .universal-card-dot {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${theme === 'light' ? '#F7F7F7' : '#11363C'};
          transition: background-color 0.3s ease;
        }

        .universal-card:hover .universal-card-dot {
          background-color: #FFFFFF;
        }

        .universal-card-icon {
          position: absolute;
          bottom: 40px;
          right: 40px;
        }

        .card-stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Медиа-запросы */
        @media (max-width: 768px) {
          .universal-card-icon {
            bottom: 20px;
            right: 20px;
            transform: scale(0.8);
          }
          
          .swiper-button-prev-custom.swiper-button-disabled,
          .swiper-button-next-custom.swiper-button-disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      `}</style>
    </div>
  );
};