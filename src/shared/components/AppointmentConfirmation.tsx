'use client';

import React from 'react';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';

// Translation object
const translations = {
  ru: {
    doctorTitle: 'Вы записаны на прием к врачу',
    checkupTitle: 'Вы записаны на прохождение чек-апа',
    analysisTitle: 'Вы записаны на сдачу анализов',
    defaultTitle: 'Вы записаны на прием',
    baseInstruction: 'Перед первым посещением клиники возьмите с собой удостоверение личности',
    additionalInstruction: 'и актуальные медицинские анализы и обследования (при наличии)',
    appointmentDate: 'Дата приема',
    appointmentTime: 'Время приема',
    address: 'Адрес',
    service: 'Услуга:',
    doctor: 'Врач:',
    cost: 'Стоимость:'
  },
  uz: {
    doctorTitle: 'Siz shifokor qabuliga yozildingiz',
    checkupTitle: 'Siz tekshiruvdan o\'tishga yozildingiz',
    analysisTitle: 'Siz tahlil topshirishga yozildingiz',
    defaultTitle: 'Siz qabulga yozildingiz',
    baseInstruction: 'Klinikaga birinchi tashrif buyurishdan oldin shaxsiy guvohnomangizni olib keling',
    additionalInstruction: 'va dolzarb tibbiy tahlillar va tekshiruvlar (mavjud bo\'lsa)',
    appointmentDate: 'Qabul sanasi',
    appointmentTime: 'Qabul vaqti',
    address: 'Manzil',
    service: 'Xizmat:',
    doctor: 'Shifokor:',
    cost: 'Narx:'
  }
};

interface AppointmentConfirmationProps {
  type: 'doctor' | 'checkup' | 'analysis';
  date: string;
  time: string;
  address: string;
  service: string;
  doctor?: string;
  cost: string | number;
  number?: string;
}

export default function AppointmentConfirmation({
  type,
  date,
  time,
  address,
  service,
  doctor,
  cost
}: AppointmentConfirmationProps) {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  
  // Determine card styles based on theme
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-dark-block';
  const textColor = theme === 'light' ? 'text-[#094A54]' : 'text-white';
  const mutedTextColor = theme === 'light' ? 'text-[#94A3A6]' : 'text-white/60';
  const borderColor = theme === 'light' ? 'border-[#E2E8F0]' : 'border-[#174F4B]';
  const iconColor = theme === 'light' ? '#094A54' : '#FFFFFF';
  
  // Determine title based on appointment type
  const getTitle = () => {
    switch(type) {
      case 'doctor':
        return t('doctorTitle');
      case 'checkup':
        return t('checkupTitle');
      case 'analysis':
        return t('analysisTitle');
      default:
        return t('defaultTitle');
    }
  };
  
  // Determine what instruction text to show based on type
  const getInstruction = () => {
    const baseText = t('baseInstruction');
    if (type === 'doctor' || type === 'checkup') {
      return `${baseText} ${t('additionalInstruction')}`;
    }
    return baseText;
  };
  
  // Format cost display
  const formatCost = () => {
    if (typeof cost === 'number') {
      return new Intl.NumberFormat('ru-RU').format(cost) + ' сум';
    }
    return cost;
  };
  
  return (
    <div className={`${cardBg} rounded-2xl p-4 md:p-8 shadow-sm`}>
      <h1 className={`text-xl md:text-2xl lg:text-3xl font-medium ${textColor} mb-4`}>
        {getTitle()}
      </h1>
      
      {/* Instruction notice */}
      <div className="flex items-start mb-6 md:mb-8">
        <div className="flex-shrink-0 w-6 h-6 mr-2 md:mr-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1327_963)">
                <path d="M9.99935 18.3327C14.6017 18.3327 18.3327 14.6017 18.3327 9.99935C18.3327 5.39698 14.6017 1.66602 9.99935 1.66602C5.39698 1.66602 1.66602 5.39698 1.66602 9.99935C1.66602 14.6017 5.39698 18.3327 9.99935 18.3327Z" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 13.3333V10" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 6.66602H10.0083" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1327_963">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
        </div>
        <p className={`text-sm md:text-base ${textColor} w-full md:w-[560px]`}>
          {getInstruction()}
        </p>
      </div>
      
      {/* Appointment details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-10">
        {/* Date */}
        <div className={`border ${borderColor} rounded-xl p-3 md:p-4`}>
          <div className="flex items-center mb-1">
            <svg className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={`text-sm ${mutedTextColor}`}>{t('appointmentDate')}</span>
          </div>
          <div className={`${textColor} text-base md:text-lg ml-6 md:ml-7 font-medium`}>{date}</div>
        </div>
        
        {/* Time */}
        <div className={`border ${borderColor} rounded-xl p-3 md:p-4`}>
          <div className="flex items-center mb-1">
            <svg className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-sm ${mutedTextColor}`}>{t('appointmentTime')}</span>
          </div>
          <div className={`${textColor} text-base md:text-lg ml-6 md:ml-7 font-medium`}>{time}</div>
        </div>
        
        {/* Address */}
        <div className={`border ${borderColor} rounded-xl p-3 md:p-4 sm:col-span-2 md:col-span-1`}>
          <div className="flex items-center mb-1">
            <svg className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={`text-sm ${mutedTextColor}`}>{t('address')}</span>
          </div>
          <div className={`${textColor} text-base md:text-lg ml-6 md:ml-7 font-medium line-clamp-2`}>{address}</div>
        </div>
      </div>
      
      {/* Service and cost information */}
      <div className="space-y-2">
        <div className="flex items-start">
          <span className={`${mutedTextColor} mr-2 text-sm md:text-base`}>{t('service')}</span>
          <span className={`${textColor} font-medium text-sm md:text-base flex-1`}>{service}</span>
        </div>
        
        {type === 'doctor' && doctor && (
          <div className="flex items-start">
            <span className={`${mutedTextColor} mr-2 text-sm md:text-base`}>{t('doctor')}</span>
            <span className={`${textColor} font-medium text-sm md:text-base flex-1`}>{doctor}</span>
          </div>
        )}
        
        <div className="flex items-start">
          <span className={`${mutedTextColor} mr-2 text-sm md:text-base`}>{t('cost')}</span>
          <span className={`${textColor} font-medium text-sm md:text-base flex-1`}>{formatCost()}</span>
        </div>
      </div>
    </div>
  );
}