'use client';

import React, { useEffect, useState } from 'react';
import { UniversalSlider } from '../UniversalSlider';
import { useTranslation } from '@/src/hooks/useTranslation';
import { ReviewCard } from './ReviewCard';
import axios from 'axios';
import { API_BASE_URL } from '@/src/config/constants';
import { useLanguageStore } from '@/src/store/language';

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

// Интерфейс для API данных отзыва
interface ReviewApiData {
  user_name: string;
  user_image: string;
  review_date: string;
  review_text: string;
  service_text: string;
  service_icon: string;
  external_link: string;
  external_icon: string;
}

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
  const { currentLocale } = useLanguageStore();
  const [reviews, setReviews] = useState<ReviewApiData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Загрузка отзывов с API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/reviews`, {
          headers: {
            'X-Language': currentLocale
          }
        });
        setReviews(response.data.data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [currentLocale]);
  
  // Получаем локализованные данные
  const sliderTitle = title || t('title') || '';
  const sliderDescription = description || t('description') || '';
  
  // Создаем слайды с карточками отзывов
  const slides = reviews.map((review, index) => (
    <ReviewCard 
      key={index}
      name={review.user_name}
      date={review.review_date}
      text={review.review_text}
      service={review.service_text}
      serviceIcon={review.service_icon}
      reviewSource={review.external_icon}
      externalLink={review.external_link}
      avatar={review.user_image}
    />
  ));

  // Если загрузка - показываем placeholder
  if (loading) {
    return (
      <div className={`mt-20 ${className}`}>
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text mb-4">
              {sliderTitle}
            </h2>
            <p className="text-base md:text-lg text-light-text dark:text-dark-text mb-6">
              {sliderDescription}
            </p>
            <div className="animate-pulse flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Если нет отзывов - скрываем секцию
  if (reviews.length === 0) {
    return null;
  }

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