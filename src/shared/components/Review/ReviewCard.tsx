'use client';

import React from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { HeartCheckIcon, ThoGISIcon, YouTubeIcon } from '../../ui/Icon';

interface ReviewCardProps {
  name: string;
  date: string;
  text: string;
  service?: string;
  reviewSource?: string;
  avatar?: string;
  className?: string;
  external_icon?: string;
  external_link?: string;
  service_icon?: string
}

const translations = {
  ru: {
    service: "Услуга:",
    readMore: "Читать отзыв",
    watchMore: "Смотреть отзыв"
  },
  uz: {
    service: "Xizmat:",
    readMore: "Sharhni o‘qish",
    watchMore: "Sharhni ko‘rish"
  }
};

export const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  text,
  service,
  reviewSource = null,
  avatar = '/images/avatar-placeholder.png',
  className = '',
  external_icon,
  external_link,
  service_icon
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);

  const getReviewSourceLink = () => {
    if (external_icon && external_link) {
      return (
        <a
          href={external_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-10 text-[#73B1A4] hover:underline mt-4"
        >

          <span
            className="mr-2 w-6 h-6 inline-block me-[40px]"
            dangerouslySetInnerHTML={{ __html: external_icon }}
          />
          <p>{t('readMore')}</p>
        </a>
      );
    }

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

      <div className="flex-grow overflow-hidden">
        <p className="text-lg text-[#173F46] dark:text-dark-text line-clamp-6">{text}</p>
      </div>

      <div className="mt-auto">
        {service && (
          <div className="mb-16">
            <div className="text-[#173F46] dark:text-gray-400 font-medium text-lg">{t('service')}</div>
            <div className="flex items-center">
              {service_icon ? (
                <span
                  className="w-6 h-6 mr-2 block"
                  style={{ fill: '#73B1A4' }}  
                  dangerouslySetInnerHTML={{ __html: service_icon }}
                />
              ) : (
                <HeartCheckIcon size={20} className="text-light-accent mr-2" />
              )}
              <span className="text-[#173F46] dark:text-dark-text">{service}</span>
            </div>
          </div>
        )}


        <div>{getReviewSourceLink()}</div>
      </div>
    </div>
  );
};
