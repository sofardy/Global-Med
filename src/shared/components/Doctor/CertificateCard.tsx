'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { UniversalSlider } from '@/src/shared/components/UniversalSlider';
import { useThemeStore } from '@/src/store/theme';

interface Certificate {
  id: string;
  imageUrl: string;
  title: string;
  expiryDate: string;
}

interface CertificatesSliderProps {
  certificates?: Certificate[];
  title?: string;
  description?: string;
  className?: string;
}

const demoData: Certificate[] = [
  {
    id: 'cert1',
    imageUrl: '/images/certificate-1.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  },
  {
    id: 'cert2',
    imageUrl: '/images/certificate-1.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  },
  {
    id: 'cert3',
    imageUrl: '/images/certificate-1.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  },
  {
    id: 'cert4',
    imageUrl: '/images/certificate-1.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  }
];

export const CertificatesSlider: React.FC<CertificatesSliderProps> = ({
  certificates = demoData,
  title = 'Доверие и качество',
  description = 'Все наши медицинские услуги лицензированы и соответствуют строгим стандартам',
  className = '',
}) => {
  const { theme } = useThemeStore();
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  
  // Состояние для модального окна с увеличенным изображением
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  
  // Разделение заголовка на строки
  const titleParts = title.split(' и ');
  const titleLines = titleParts.length > 1 
    ? [titleParts[0], 'и ' + titleParts[1]] 
    : [title];
  
  // Разделение описания на две строки
  const descriptionWords = description.split(' ');
  const halfLength = Math.ceil(descriptionWords.length / 2);
  const descriptionLine1 = descriptionWords.slice(0, halfLength).join(' ');
  const descriptionLine2 = descriptionWords.slice(halfLength).join(' ');
  
  // Обработчик открытия увеличенного изображения
  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    // Блокируем прокрутку страницы при открытом модальном окне
    document.body.style.overflow = 'hidden';
  };
  
  // Обработчик закрытия увеличенного изображения
  const handleCloseZoom = () => {
    setActiveImageIndex(null);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    // Восстанавливаем прокрутку страницы
    document.body.style.overflow = '';
  };
  
  // Обработчики управления зумом
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(3, prev + 0.5));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0.5, prev - 0.5));
  };
  
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };
  
  // Обработчики перемещения изображения
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStartPos({ 
        x: e.clientX - position.x, 
        y: e.clientY - position.y 
      });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStartPos.x,
        y: e.clientY - dragStartPos.y
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Обработка жестов на мобильных устройствах
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoomLevel > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStartPos.x,
        y: e.touches[0].clientY - dragStartPos.y
      });
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Переход между изображениями в полноэкранном режиме
  const goToNextImage = () => {
    if (activeImageIndex !== null && certificates) {
      setActiveImageIndex((activeImageIndex + 1) % certificates.length);
      resetZoomAndPosition();
    }
  };
  
  const goToPrevImage = () => {
    if (activeImageIndex !== null && certificates) {
      setActiveImageIndex((activeImageIndex - 1 + certificates.length) % certificates.length);
      resetZoomAndPosition();
    }
  };
  
  const resetZoomAndPosition = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };
  
  // Создаем компонент карточки
  const CertificateCard = ({ imageUrl, title, expiryDate, index }: Certificate & { index: number }) => (
    <div className={`flex flex-col h-full rounded-2xl overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-dark-block'} p-6`}>
      <div 
        className="relative w-full aspect-[3/4] mb-4 rounded-xl overflow-hidden shadow-sm cursor-pointer group"
        onClick={() => handleImageClick(index)}
      >
        <Image 
          src={imageUrl} 
          alt={`Сертификат ${title}`} 
          fill 
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 280px"
        />
        <div className="absolute inset-0 bg-black/0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black/20 transition-all duration-300">
          <div className="bg-white/90 dark:bg-dark-block/90 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-accent">
              <path d="M15 3h6v6"></path>
              <path d="M10 14L21 3"></path>
              <path d="M18 13v8H3V6h8"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-base md:text-lg font-medium text-[#173F46] dark:text-white">
          {title}
        </h3>
        <p className="text-sm md:text-base text-[#173F46]/70 dark:text-white/70 mt-1">
          Срок действия: до {expiryDate}
        </p>
      </div>
    </div>
  );
  
  // Создаем слайды
  const slides = certificates.map((cert, index) => (
    <div key={cert.id} className="px-2">
      <CertificateCard 
        id={cert.id}
        imageUrl={cert.imageUrl} 
        title={cert.title} 
        expiryDate={cert.expiryDate}
        index={index}
      />
    </div>
  ));

  return (
    <div className={`mb-[150px] mt-[150px] ${className}`}>
      <div>
        <div className="flex flex-col md:flex-row mb-12">
          <div className="md:w-1/2 mb-4 md:mb-0 pr-4">
            <h2 className="text-3xl md:text-5xl font-medium text-[#173F46] dark:text-white">
              {titleLines.map((line, index) => (
                <span key={index} className="block">{line}</span>
              ))}
            </h2>
          </div>
          <div className="md:w-1/2 pl-4">
            <p className="text-base md:text-lg text-[#173F46] dark:text-white mb-6">
              <span className="block">{descriptionLine1}</span>
              <span className="block">{descriptionLine2}</span>
            </p>
            
            <div className="flex items-center gap-2">
              <button
                ref={prevButtonRef}
                className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center swiper-button-prev-custom"
                aria-label="Предыдущий сертификат"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                ref={nextButtonRef}
                className="w-12 h-12 rounded-lg bg-light-accent text-white flex items-center justify-center swiper-button-next-custom"
                aria-label="Следующий сертификат"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="certificates-slider-wrapper">
          <UniversalSlider
            slides={slides}
            slidesPerView={4}
            slidesPerMobileView={1}
            spaceBetween={24}
            showNavigation={false}
            showPagination={false}
            className="certificates-slider"
            onInit={(swiper) => {
              if (prevButtonRef.current && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevButtonRef.current;
              }
              if (nextButtonRef.current && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.nextEl = nextButtonRef.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          />
        </div>
      </div>
      
      {/* Полноэкранный просмотр изображения с контролами */}
      {activeImageIndex !== null && certificates[activeImageIndex] && (
        <div 
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          onClick={handleCloseZoom}
        >
          {/* Верхняя панель */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10 flex justify-between items-center">
            <div className="text-white text-lg font-medium opacity-80">
              {certificates[activeImageIndex].title}
            </div>
            <button 
              onClick={handleCloseZoom}
              className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Закрыть"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Область изображения с возможностью перетаскивания */}
          <div 
            className="w-full h-full flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: isDragging ? 'grabbing' : (zoomLevel > 1 ? 'grab' : 'default') }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative transition-transform duration-200"
              style={{ 
                transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                maxWidth: '90vw',
                maxHeight: '80vh'
              }}
            >
              <Image 
                src={certificates[activeImageIndex].imageUrl} 
                alt={certificates[activeImageIndex].title} 
                width={1000}
                height={1500}
                className="pointer-events-none object-contain max-h-[80vh]"
              />
            </div>
          </div>
          
          {/* Левая и правая стрелки для навигации между изображениями */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition"
            onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
            aria-label="Предыдущее изображение"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition"
            onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
            aria-label="Следующее изображение"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          
          {/* Нижняя панель с контролами зума и нумерацией */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10 flex justify-between items-center">
            <div className="text-white opacity-70">
              {activeImageIndex + 1} / {certificates.length}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition"
                aria-label="Уменьшить"
                disabled={zoomLevel <= 0.5}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); handleResetZoom(); }}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition"
                aria-label="Сбросить масштаб"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v6h6"></path>
                  <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
                  <path d="M21 22v-6h-6"></path>
                  <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
                </svg>
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition"
                aria-label="Увеличить"
                disabled={zoomLevel >= 3}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Индикатор для десктопов */}
          {zoomLevel > 1 && (
            <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                  <path d="M5 9l-3 3 3 3"></path>
                  <path d="M9 5l3-3 3 3"></path>
                  <path d="M15 19l3 3 3-3"></path>
                  <path d="M19 9l3 3-3 3"></path>
                  <path d="M2 12h20"></path>
                  <path d="M12 2v20"></path>
                </svg>
                <span className="mt-2 text-sm font-medium">Перемещайте изображение</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificatesSlider;