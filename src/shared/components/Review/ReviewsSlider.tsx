'use client';

import React from 'react';
import { UniversalSlider } from '../UniversalSlider';
import { useTranslation } from '@/src/hooks/useTranslation';
import { ReviewCard } from './ReviewCard';
import { reviewsData } from '../../mocks/reviewsData';

// Локализация для компонента
const translations = {
  ru: {
    title: "Нам доверяют здоровье",
    description: "Тысячи пациентов уже получили квалифицированную помощь в нашей клинике",
    prevSlide: "Предыдущий отзыв",
    nextSlide: "Следующий отзыв"
  },
  uz: {
    title: "Bizga sogligingizni ishoning",
    description: "Minglab bemorlar allaqachon klinikamizda malakali yordam olishgan",
    prevSlide: "Oldingi sharh",
    nextSlide: "Keyingi sharh"
  }
};

export interface ReviewsSliderProps {
  title?: string;
  description?: string;
  className?: string;
}

export const ReviewsSlider: React.FC<ReviewsSliderProps> = ({ 
  title, 
  description, 
  className = ""
}) => {
  const { t } = useTranslation(translations);
  
  // Получаем локализованные данные
  const sliderTitle = title || t('title') || '';
  const sliderDescription = description || t('description') || '';
  
  // Создаем слайды с карточками отзывов
  const slides = reviewsData.map((review, index) => (
    <ReviewCard 
      key={index}
      name={review.name}
      date={review.date}
      text={review.text}
      service={review.service}
      reviewSource={review.reviewSource}
      avatar={review.avatar}
    />
  ));

  // Готовим заголовок 
  const formattedTitle = (
    <h2 className="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text">
      {sliderTitle}
    </h2>
  );
  
  // Готовим описание
  const formattedDescription = (
    <p className="text-base md:text-lg text-light-text dark:text-dark-text">
      {sliderDescription}
    </p>
  );

  return (
    <UniversalSlider
      slides={slides}
      title={formattedTitle}
      description={formattedDescription}
      slidesPerView={4}
      slidesPerView1536={4}
      slidesPerView1280={3}
      slidesPerView1024={2}
      slidesPerView768={2}
      slidesPerMobileView={1.2}
      mobileBreakpoint={991}
      spaceBetween={20}
      showNavigation={true}
      navigationPrevLabel={t('prevSlide')}
      navigationNextLabel={t('nextSlide')}
      showPagination={false}
      className={`${className} mt-20`}
      titleClassName="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text mb-4"
      descriptionClassName="text-base md:text-lg text-light-text dark:text-dark-text mb-6"
      loop={true}
    />
  );
};