'use client';

import React, { useRef } from 'react';
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
  
  // Создаем компонент карточки
  const CertificateCard = ({ imageUrl, title, expiryDate }: Certificate) => (
    <div className={`flex flex-col h-full rounded-2xl overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-dark-block'} p-6`}>
      <div className="relative w-full aspect-[3/4] mb-4 rounded-xl overflow-hidden shadow-sm">
        <Image 
          src={imageUrl} 
          alt={`Сертификат ${title}`} 
          fill 
          className="object-cover object-center hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 280px"
        />
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
  const slides = certificates.map((cert) => (
    <div key={cert.id} className="px-2">
      <CertificateCard 
        id={cert.id}
        imageUrl={cert.imageUrl} 
        title={cert.title} 
        expiryDate={cert.expiryDate} 
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
    </div>
  );
};

export default CertificatesSlider;