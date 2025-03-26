'use client';

import React from 'react';
import { useThemeStore } from '@/src/store/theme';

interface AppointmentConfirmationProps {
  type: 'doctor' | 'checkup' | 'analysis';
  date: string;
  time: string;
  address: string;
  service: string;
  doctor?: string;
  cost: string | number;
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
  
  // Determine title based on appointment type
  const getTitle = () => {
    switch(type) {
      case 'doctor':
        return 'Вы записаны на прием к врачу';
      case 'checkup':
        return 'Вы записаны на прохождение чек-апа';
      case 'analysis':
        return 'Вы записаны на сдачу анализов';
      default:
        return 'Вы записаны на прием';
    }
  };
  
  // Determine what instruction text to show based on type
  const getInstruction = () => {
    const baseText = "Перед первым посещением клиники возьмите с собой удостоверение личности";
    if (type === 'doctor' || type === 'checkup') {
      return `${baseText} и актуальные медицинские анализы и обследования (при наличии)`;
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
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h1 className="text-2xl md:text-3xl font-medium text-[#094A54] mb-4">
        {getTitle()}
      </h1>
      
      {/* Instruction notice */}
      <div className="flex items-start mb-8">
        <div className="flex-shrink-0 w-6 h-6 mr-3 text-[#094A54]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1327_963)">
<path d="M9.99935 18.3327C14.6017 18.3327 18.3327 14.6017 18.3327 9.99935C18.3327 5.39698 14.6017 1.66602 9.99935 1.66602C5.39698 1.66602 1.66602 5.39698 1.66602 9.99935C1.66602 14.6017 5.39698 18.3327 9.99935 18.3327Z" stroke="#094A54" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 13.3333V10" stroke="#094A54" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 6.66602H10.0083" stroke="#094A54" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1327_963">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
        </div>
        <p className="w-[560px] text-[#094A54]">
          {getInstruction()}
        </p>
      </div>
      
      {/* Appointment details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* Date */}
        <div className="border border-[#E2E8F0] rounded-xl p-4">
          <div className="flex items-center mb-1">
            <svg className="w-5 h-5 mr-2 text-[#094A54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[#94A3A6]">Дата приема</span>
          </div>
          <div className="text-[#094A54] text-lg ml-7 font-medium">{date}</div>
        </div>
        
        {/* Time */}
        <div className="border border-[#E2E8F0] rounded-xl p-4">
          <div className="flex items-center mb-1">
            <svg className="w-5 h-5 mr-2 text-[#094A54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[#94A3A6]">Время приема</span>
          </div>
          <div className="text-[#094A54] text-lg ml-7 font-medium">{time}</div>
        </div>
        
        {/* Address */}
        <div className="border border-[#E2E8F0] rounded-xl p-4">
          <div className="flex items-center mb-1">
            <svg className="w-5 h-5 mr-2 text-[#094A54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[#94A3A6]">Адрес</span>
          </div>
          <div className="text-[#094A54] text-lg ml-7 font-medium">{address}</div>
        </div>
      </div>
      
      {/* Service and cost information */}
      <div className="space-y-2">
        <div className="flex items-start">
          <span className="text-[#94A3A6] mr-2">Услуга:</span>
          <span className="text-[#094A54] font-medium">{service}</span>
        </div>
        
        {type === 'doctor' && doctor && (
          <div className="flex items-start">
            <span className="text-[#94A3A6] mr-2">Врач:</span>
            <span className="text-[#094A54] font-medium">{doctor}</span>
          </div>
        )}
        
        <div className="flex items-start">
          <span className="text-[#94A3A6] mr-2">Стоимость:</span>
          <span className="text-[#094A54] font-medium">{formatCost()}</span>
        </div>
      </div>
    </div>
  );
}