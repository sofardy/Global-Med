'use client';

import React from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { HeartCheckIcon, ThoGISIcon, YouTubeIcon } from '../../ui/Icon';

// Локализация для компонента
const translations = {
  ru: {
    service: "Услуга:",
    readMore2GIS: "Читать отзыв на 2ГИС",
    readMoreYandex: "Читать отзыв на Яндекс",
    readMoreGoogle: "Читать отзыв на Google",
    watchMoreYouTube: "Смотреть отзыв на YouTube"
  },
  uz: {
    service: "Xizmat:",
    readMore2GIS: "2GIS-da sharhni o'qish",
    readMoreYandex: "Yandex-da sharhni o'qish",
    readMoreGoogle: "Google-da sharhni o'qish",
    watchMoreYouTube: "YouTube-da sharhni ko'rish"
  }
};

interface ReviewCardProps {
  name: string;
  date: string;
  text: string;
  service?: string;
  reviewSource?: string | null;
  externalLink?: string | null;
  avatar?: string;
  serviceIcon?: string | null;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  text,
  service,
  reviewSource = null,
  externalLink = null,
  avatar = '/images/avatar-placeholder.png',
  serviceIcon = null,
  className = ''
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  
  // Функция для форматирования даты из ISO формата
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };
  
  // Определяем текст и иконку источника отзыва
  const getReviewSourceLink = () => {
    if (!externalLink || !reviewSource) return null;
    
    switch (reviewSource) {
      case 'yandex':
        return (
          <a 
            href={externalLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-[#73B1A4] hover:underline mt-4"
          >
            <ThoGISIcon size={24} className="mr-2" />
            <span>{t('readMoreYandex')}</span>
          </a>
        );
      case 'g':
      case 'google':
        return (
          <a 
            href={externalLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-[#73B1A4] hover:underline mt-4"
          >
            <span>{t('readMoreGoogle')}</span>
          </a>
        );
      case '2gis':
        return (
          <a 
            href={externalLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-[#73B1A4] hover:underline mt-4"
          >
            <ThoGISIcon size={24} className="mr-2" />
            <span>{t('readMore2GIS')}</span>
          </a>
        );
      case 'youtube':
        return (
          <a 
            href={externalLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-[#73B1A4] hover:underline mt-4"
          >
            <YouTubeIcon size={24} className="mr-2" />
            <span>{t('watchMoreYouTube')}</span>
          </a>
        );
      default:
        return (
          <a 
            href={externalLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-[#73B1A4] hover:underline mt-4"
          >
            <span>Читать отзыв</span>
          </a>
        );
    }
  };

  // Рендерим иконку сервиса из SVG строки, если она предоставлена
  const renderServiceIcon = () => {
    if (serviceIcon) {
      return <div dangerouslySetInnerHTML={{ __html: serviceIcon }} className="mr-2" />;
    }
    return <HeartCheckIcon size={20} className="text-light-accent mr-2" />;
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
          <p className="text-base text-gray-500 dark:text-gray-400">{formatDate(date)}</p>
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
              {renderServiceIcon()}
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