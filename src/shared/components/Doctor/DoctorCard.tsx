// src/shared/components/Doctor/DoctorCard.tsx
'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/src/hooks/useTranslation';
import Link from 'next/link';

interface DoctorCardProps {
  id: string;
  slug: string; // Добавляем slug в пропсы
  name: string;
  specialization: string;
  experience: string;
  photoUrl: string;
}

// Переводы остаются без изменений
const translations = {
  ru: {
    experience: 'Стаж',
    appointmentButton: 'Записаться на прием'
  },
  uz: {
    experience: 'Ish staji',
    appointmentButton: 'Qabulga yozilish'
  }
};

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  id,
  slug, // Принимаем slug
  specialization,
  experience,
  photoUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation(translations);
  
  return (
    // Используем slug вместо id в URL
    <Link href={`/clinic/doctors/${slug}`} className="block h-full">
      <div 
        className="rounded-3xl overflow-hidden bg-white dark:bg-dark-block transition-all duration-300 h-full w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Остальной код карточки без изменений */}
        <div className="p-6 flex flex-col h-full">
          <div className="w-full aspect-square rounded-2xl overflow-hidden mb-5">
            <img 
              src={photoUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-grow">
            <h3 className="text-light-text dark:text-dark-text text-xl font-medium mb-2">{name}</h3>
            <p className="text-light-text dark:text-dark-text mb-4">{specialization}</p>
            
            <div className="flex items-center text-light-text dark:text-dark-text mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M19 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{t('experience')}: {experience}</span>
            </div>
          </div>
          
          <button 
            className={`w-full py-4 rounded-xl font-medium transition-all duration-300 ${
              isHovered 
                ? 'bg-light-accent text-white' 
                : 'bg-white dark:bg-dark-block border border-light-text dark:border-dark-text text-light-text dark:text-dark-text'
            }`}
          >
            {t('appointmentButton')}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;