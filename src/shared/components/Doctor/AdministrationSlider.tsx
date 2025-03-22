'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { UniversalSlider } from '@/src/shared/components/UniversalSlider';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useThemeStore } from '@/src/store/theme';

// Переводы
const translations = {
  ru: {
    title: 'Администрация клиники',
    description: 'Опытные управленцы и медицинские эксперты, обеспечивающие качественную работу клиники',
    prevSlide: 'Предыдущий слайд',
    nextSlide: 'Следующий слайд',
    administration: [
      {
        id: 'admin1',
        name: 'Андреев Виктор Сергеевич',
        position: 'Главный врач',
      },
      {
        id: 'admin2',
        name: 'Андреев Виктор Сергеевич',
        position: 'Главный врач',
      },
      {
        id: 'admin3',
        name: 'Андреев Виктор Сергеевич',
        position: 'Главный врач',
      },
      {
        id: 'admin4',
        name: 'Андреев Виктор Сергеевич',
        position: 'Главный врач',
      },
      {
        id: 'admin5',
        name: 'Петров Иван Николаевич',
        position: 'Заместитель главного врача',
      },
      {
        id: 'admin6',
        name: 'Сидорова Анна Михайловна',
        position: 'Главная медсестра',
      },
      {
        id: 'admin7',
        name: 'Козлов Сергей Дмитриевич',
        position: 'Руководитель отдела',
      },
      {
        id: 'admin8',
        name: 'Новикова Елена Павловна',
        position: 'Администратор',
      }
    ]
  },
  uz: {
    title: 'Klinika ma\'muriyati',
    description: 'Klinikaning sifatli ishini ta\'minlaydigan tajribali boshqaruvchilar va tibbiy ekspertlar',
    prevSlide: 'Oldingi slayd',
    nextSlide: 'Keyingi slayd',
    administration: [
      {
        id: 'admin1',
        name: 'Andreyev Viktor Sergeyevich',
        position: 'Bosh shifokor',
      },
      {
        id: 'admin2',
        name: 'Andreyev Viktor Sergeyevich',
        position: 'Bosh shifokor',
      },
      {
        id: 'admin3',
        name: 'Andreyev Viktor Sergeyevich',
        position: 'Bosh shifokor',
      },
      {
        id: 'admin4',
        name: 'Andreyev Viktor Sergeyevich',
        position: 'Bosh shifokor',
      },
      {
        id: 'admin5',
        name: 'Petrov Ivan Nikolayevich',
        position: 'Bosh shifokor o\'rinbosari',
      },
    ]
  }
};

export const AdministrationSlider = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  
  // Получаем локализованные данные
  const administration = t('administration', { returnObjects: true }) as any[];
  
  // Разделение заголовка на две строки
  const titleText = t('title');
  const titleLines = [
    titleText.split(' ')[0], // Первое слово
    titleText.split(' ').slice(1).join(' ') // Остальные слова
  ];
  
  // Разделение описания на три строки
  const descriptionText = t('description');
  const words = descriptionText.split(' ');
  const totalWords = words.length;
  const wordsPerLine = Math.ceil(totalWords / 2);
  
  const descriptionLines = [
    words.slice(0, wordsPerLine).join(' '),
    words.slice(wordsPerLine, wordsPerLine * 2).join(' '),
    words.slice(wordsPerLine * 2).join(' ')
  ];
  
  // Создаем компонент карточки и слайды
  const AdminCard = ({ name, position }: { name: string; position: string }) => (
    <div className="bg-white dark:bg-dark-block rounded-2xl overflow-hidden shadow-sm h-full p-6">
      <div className="relative w-full aspect-square">
        <Image 
          src="/images/doctor-1.png" 
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-medium text-light-text dark:text-dark-text">{name}</h3>
        <p className="text-base text-light-text/70 dark:text-dark-text/70">{position}</p>
      </div>
    </div>
  );
  
  const slides = administration.map((admin) => (
    <div key={admin.id} className="px-2">
      <AdminCard name={admin.name} position={admin.position} />
    </div>
  ));

  return (
    <div className='mb-[150px] mt-[150px]'>
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
              {descriptionLines.map((line, index) => (
                <span key={index} className="block">{line}</span>
              ))}
            </p>
            
            <div className="flex items-center gap-2">
              <button
                ref={prevButtonRef}
                className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center swiper-button-prev-custom"
                aria-label={t('prevSlide')}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                ref={nextButtonRef}
                className="w-12 h-12 rounded-lg bg-light-accent text-white flex items-center justify-center swiper-button-next-custom"
                aria-label={t('nextSlide')}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="administration-slider-wrapper">
          <UniversalSlider
            slides={slides}
            slidesPerView={4}
            slidesPerMobileView={1}
            spaceBetween={20}
            showNavigation={false}
            showPagination={false}
            className="administration-slider"
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
          />
        </div>
      </div>
    </div>
  );
};

export default AdministrationSlider;