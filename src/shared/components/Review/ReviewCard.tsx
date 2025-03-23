'use client';

import React from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { HeartCheckIcon, ThoGISIcon, YouTubeIcon } from '../../ui/Icon';

type ReviewSource = 'google' | 'youtube' | null;

interface ReviewCardProps {
  name: string;
  date: string;
  text: string;
  service?: string;
  reviewSource?: ReviewSource;
  avatar?: string;
  className?: string;
}

const translations = {
  ru: {
    service: "Услуга:",
    readMore: "Читать отзыв на 2ГИС",
    watchMore: "Смотреть отзыв на YouTube"
  },
  uz: {
    service: "Xizmat:",
    readMore: "2GIS-da sharhni o'qish",
    watchMore: "YouTube-da sharhni ko'rish"
  }
};

export const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  text,
  service,
  reviewSource = null,
  avatar = '/images/avatar-placeholder.png',
  className = ''
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  
  // Определяем текст и иконку источника отзыва
  const getReviewSourceLink = () => {
    if (reviewSource === 'google') {
      return (
        <a href="#" className="flex items-center text-[#73B1A4] hover:underline mt-4">
          <ThoGISIcon size={24} className="mr-2" />
          <span>{t('readMore')}</span>
        </a>
      );
    } else if (reviewSource === 'youtube') {
      return (
        <a href="#" className="flex items-center text-[#73B1A4] hover:underline mt-4">
          <YouTubeIcon size={24} className="mr-2" />
          <span>{t('watchMore')}</span>
        </a>
      );
    }
    return null;
  };

  return (
    <div className={`p-6 rounded-2xl h-[420px] flex flex-col ${theme === 'light' ? 'bg-white' : 'bg-dark-block'} ${className}`}>
      {/* Шапка карточки с аватаром и именем */}
      <div className="flex items-center mb-4">
        <div className="w-[60px] h-[60px] relative rounded-full overflow-hidden mr-3">
          <Image 
            src={avatar} 
            alt={name} 
            width={60} 
            height={60} 
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-medium text-[#173F46] dark:text-dark-text">{name}</h3>
          <p className="text-base text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>
      
      {/* Текст отзыва с ограничением по высоте и текстовым эллипсисом */}
      <div className="flex-grow overflow-hidden">
        <p className="text-lg text-[#173F46] dark:text-dark-text line-clamp-6">{text}</p>
      </div>
      
      {/* Услуга - всегда внизу карточки */}
      <div className="mt-auto">
        {service && (
          <div className="mb-4">
            <div className="text-[#173F46] dark:text-gray-400 font-medium text-lg">{t('service')}</div>
            <div className="flex items-center">
              <HeartCheckIcon size={20} className="text-light-accent mr-2" />
              <span className="text-[#173F46] dark:text-dark-text">{service}</span>
            </div>
          </div>
        )}
        
        {/* Ссылка на источник отзыва */}
        <div>
          {getReviewSourceLink()}
        </div>
      </div>
    </div>
  );
};