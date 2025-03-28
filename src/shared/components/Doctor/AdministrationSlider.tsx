'use client';

import React from 'react';
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
        name: 'Андреев Сергеевич Сергеевич',
        position: 'Главный врач',
      },
      {
        id: 'admin3',
        name: 'Андреев Виктор Сергеевич',
        position: 'Главный врач',
      },
      {
        id: 'admin4',
        name: 'Андреев Сергеевич Сергеевич',
        position: 'Главный врач',
      },
      {
        id: 'admin5',
        name: 'Андреев Сергеевич Сергеевич',
        position: 'Главный врач',
      },
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
  
  // Создаем компоненты заголовка и описания
  const titleComponent = (
    <h2 className="text-3xl md:text-5xl font-medium text-[#173F46] dark:text-white">
      {titleLines.map((line, index) => (
        <span key={index} className="block">{line}</span>
      ))}
    </h2>
  );
  
  const descriptionComponent = (
    <p className="text-base md:text-lg text-[#173F46] dark:text-white">
      {descriptionLines.map((line, index) => (
        <span key={index} className="block">{line}</span>
      ))}
    </p>
  );
  
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
      <UniversalSlider
        slides={slides}
        title={titleComponent}
        description={descriptionComponent}
        slidesPerView={4}
        slidesPerMobileView={1}
        spaceBetween={20}
        showNavigation={true}
        navigationPrevLabel={t('prevSlide')}
        navigationNextLabel={t('nextSlide')}
        showPagination={false}
        className="administration-slider"
        loop={true} 
      />
    </div>
  );
};

export default AdministrationSlider;