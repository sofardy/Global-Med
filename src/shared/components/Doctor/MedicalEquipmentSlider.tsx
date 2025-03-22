'use client';

import React from 'react';
import Image from 'next/image';
import { UniversalSlider } from '@/src/shared/components/UniversalSlider';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useThemeStore } from '@/src/store/theme';

// Переводы
const translations = {
  ru: {
    title: 'Медицинское оборудование',
    description: 'В работе мы используем только современное оборудование, чтобы гарантировать точность и безопасность исследований',
    prevSlide: 'Предыдущий слайд',
    nextSlide: 'Следующий слайд'
  },
  uz: {
    title: 'Tibbiy jihozlar',
    description: 'Ishimizda tekshirishlar aniqligi va xavfsizligini ta\'minlash uchun faqat zamonaviy jihozlardan foydalanamiz',
    prevSlide: 'Oldingi slayd',
    nextSlide: 'Keyingi slayd'
  }
};

export const MedicalEquipmentSlider = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  
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
  const wordsPerLine = Math.ceil(totalWords / 3);
  
  const descriptionLines = [
    words.slice(0, wordsPerLine).join(' '),
    words.slice(wordsPerLine, wordsPerLine * 2).join(' '),
    words.slice(wordsPerLine * 2).join(' ')
  ];
  
  // Создаем заголовок с разбивкой на строки
  const titleComponent = (
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-light-text dark:text-dark-text">
      {titleLines.map((line, index) => (
        <span key={index} className="block">{line}</span>
      ))}
    </h2>
  );
  
  // Создаем описание с разбивкой на строки
  const descriptionComponent = (
    <p className="text-base md:text-lg text-light-text dark:text-dark-text">
      {descriptionLines.map((line, index) => (
        <span key={index} className="block">{line}</span>
      ))}
    </p>
  );
  
  // Создаем слайды с медицинским оборудованием (по 2 фотографии)
  const slides = [
    // Первый слайд с МРТ и микроскопом
    <div key="slide1" className="grid grid-cols-2 gap-4 h-[450px]">
      <div className="rounded-2xl overflow-hidden">
        <Image 
          src="/images/equipment-mri.jpg" 
          alt="МРТ аппарат"
          className="w-full h-full object-cover"
          width={540}
          height={450}
        />
      </div>
      <div className="rounded-2xl overflow-hidden">
        <Image 
          src="/images/equipment-microscope.png" 
          alt="Микроскоп"
          className="w-full h-full object-cover"
          width={540}
          height={450}
        />
      </div>
    </div>,
    
    // Второй слайд с УЗИ и рентген-аппаратом
    <div key="slide2" className="grid grid-cols-2 gap-4 h-[450px]">
      <div className="rounded-2xl overflow-hidden">
        <Image 
          src="/images/equipment-mri.png" 
          alt="УЗИ аппарат"
          className="w-full h-full object-cover"
          width={540}
          height={450}
        />
      </div>
      <div className="rounded-2xl overflow-hidden">
        <Image 
          src="/images/equipment-microscope.png" 
          alt="Рентген аппарат"
          className="w-full h-full object-cover"
          width={540}
          height={450}
        />
      </div>
    </div>
  ];

  return (
    <div className="py-16">
      <UniversalSlider
        slides={slides}
        title={titleComponent}
        description={descriptionComponent}
        slidesPerView={1}
        spaceBetween={20}
        showNavigation={true}
        navigationPrevLabel={t('prevSlide')}
        navigationNextLabel={t('nextSlide')}
        showPagination={false}
        className="medical-equipment-slider"
      />
    </div>
  );
};

export default MedicalEquipmentSlider;