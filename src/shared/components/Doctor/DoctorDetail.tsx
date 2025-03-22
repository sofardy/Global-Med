'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/src/hooks/useTranslation';
import { AnimatedButton, AnimatedButtonWrapper } from '../../ui/Button/AnimatedButton';
import DoctorCertificates from './CertificateCard';
import AppointmentScheduler from './AppointmentScheduler';
import { ContactInfo } from '../ContactInfo';

// Пример данных сертификатов для тестирования
const certificatesData = [
  {
    id: '1',
    imageUrl: '/images/certificate.png', 
    title: 'Сертификат по гинекологии',
    expiryDate: '19 мая 2027'
  },
  {
    id: '2',
    imageUrl: '/images/certificate.png', 
    title: 'Сертификат по гинекологии',
    expiryDate: '19 мая 2027'
  },
  {
    id: '3',
    imageUrl: '/images/certificate.png', 
    title: 'Сертификат по гинекологии',
    expiryDate: '19 мая 2027'
  },
  {
    id: '4',
    imageUrl: '/images/certificate.png', 
    title: 'Сертификат по гинекологии',
    expiryDate: '19 мая 2027'
  },
  {
    id: '5',
    imageUrl: '/images/certificate.png', 
    title: 'Сертификат по гинекологии',
    expiryDate: '19 мая 2027'
  },
  {
    id: '6',
    imageUrl: '/images/certificate.png', 
    title: 'Сертификат по гинекологии',
    expiryDate: '19 мая 2027'
  },
];

const translations = {
  ru: {
    qualification: 'Квалификация',
    category: 'Категория',
    languages: 'Языки',
    experience: 'Стаж',
    appointmentCost: 'Стоимость приема',
    basicEducation: 'Основное образование',
    additionalEducation: 'Дополнительное образование',
    bookAppointment: 'Записаться на прием',
    certificates: {
      title: 'Сертификаты и лицензии',
      description: 'Подтверждения квалификации врача и право на медицинскую практику'
    }
  },
  uz: {
    qualification: 'Malaka',
    category: 'Toifasi',
    languages: 'Tillar',
    experience: 'Tajriba',
    appointmentCost: 'Qabul narxi',
    basicEducation: 'Asosiy ta\'lim',
    additionalEducation: 'Qo\'shimcha ta\'lim',
    bookAppointment: 'Qabulga yozilish',
    certificates: {
      title: 'Sertifikatlar va litsenziyalar',
      description: 'Shifokor malakasini tasdiqlash va tibbiy amaliyot huquqi'
    }
  }
};

// Основной компонент деталей врача, включающий секцию сертификатов
export default function DoctorDetail({ doctor }) {
  const { t } = useTranslation(translations);
  
  // Функция для перехода на страницу записи
  const handleAppointment = () => {
    // Перенаправление на страницу записи с ID доктора
    window.location.href = `/appointment?doctor=${doctor.id || ''}`;
  };
  
  return (
    <div>
      {/* Верхний блок с основной информацией */}
      <div className="bg-white dark:bg-dark-block rounded-2xl overflow-hidden mb-6">
        <div className="flex flex-col md:flex-row">
          {/* Фото врача */}
          <div className="w-full md:w-1/4 h-[430px] relative flex-shrink-0">
            <Image 
              src={doctor.photoUrl || "/images/doctor-placeholder.jpg"} 
              alt={doctor.name}
              fill
              className="object-cover object-center" 
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          
          {/* Информация о враче - добавлен отступ слева */}
          <div className="p-8 md:pl-12 flex-1">
            <h1 className="text-[44px] font-semibold text-[#23464e] dark:text-white mb-2">
              {doctor.name}
            </h1>
            <p className="text-lg text-[#23464e]/80 dark:text-white/80 mb-8">
              {doctor.specialization}
            </p>
            
            <div className="space-y-5">
              {doctor.qualification && (
                <div>
                  <span className="text-[#23464e]/90 dark:text-white/90 font-semibold">
                    {t('qualification')}:
                  </span>{' '}
                  <span className="text-[#23464e] dark:text-white">
                    {doctor.qualification}
                  </span>
                </div>
              )}
              
              {doctor.category && (
                <div>
                  <span className="text-[#23464e]/90 dark:text-white/90 font-semibold">
                    {t('category')}:
                  </span>{' '}
                  <span className="text-[#23464e] dark:text-white">
                    {doctor.category}
                  </span>
                </div>
              )}
              
              {doctor.languages && (
                <div>
                  <span className="text-[#23464e]/90 dark:text-white/90 font-semibold">
                    {t('languages')}:
                  </span>{' '}
                  <span className="text-[#23464e] dark:text-white">
                    {doctor.languages}
                  </span>
                </div>
              )}
              
              {doctor.experience && (
                <div>
                  <span className="text-[#23464e]/90 dark:text-white/90 font-semibold">
                    {t('experience')}:
                  </span>{' '}
                  <span className="text-[#23464e] dark:text-white">
                    {doctor.experience}
                  </span>
                </div>
              )}
              
              {doctor.appointmentCost && (
                <div>
                  <span className="text-[#23464e]/90 dark:text-white/90 font-semibold">
                    {t('appointmentCost')}:
                  </span>{' '}
                  <span className="text-[#23464e] dark:text-white">
                    {doctor.appointmentCost}
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <AnimatedButtonWrapper>
                <AnimatedButton 
                  onClick={handleAppointment}
                  borderColor="light-accent"
                  hoverTextColor="white"
                  width="w-full md:w-auto"
                  className="text-[#23464e] dark:text-white"
                >
                  {t('bookAppointment')}
                </AnimatedButton>
              </AnimatedButtonWrapper>
            </div>
          </div>
        </div>
      </div>
      
      {/* Образование */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Основное образование */}
        <div className="bg-white dark:bg-dark-block rounded-2xl p-12">
          <h2 className="text-xl font-medium text-[#23464e] dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            {t('basicEducation')}
          </h2>
          
          <div className="space-y-6">
            {doctor.basicEducation && doctor.basicEducation.map((edu, index) => (
              <div key={index} className="pb-4 last:pb-0">
                <div className="font-medium text-[#23464e] dark:text-white mb-1">
                  {edu.years}
                </div>
                <div className="text-[#23464e]/80 dark:text-white/80">
                  {edu.institution}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Дополнительное образование */}
        <div className="bg-white dark:bg-dark-block rounded-2xl p-12">
          <h2 className="text-xl font-medium text-[#23464e] dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            {t('additionalEducation')}
          </h2>
          
          <div className="space-y-6">
            {doctor.additionalEducation && doctor.additionalEducation.map((edu, index) => (
              <div key={index} className="pb-4 last:pb-0">
                <div className="font-medium text-[#23464e] dark:text-white mb-1">
                  {edu.course}
                </div>
                <div className="text-[#23464e]/80 dark:text-white/80">
                  {edu.institution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Секция сертификатов - используем реальные данные врача или тестовые */}
      <DoctorCertificates 
        certificates={doctor.certificates || certificatesData}
        title={t('certificates.title')}
        description={t('certificates.description')}
      />

      <AppointmentScheduler />
        <ContactInfo />
    </div>
  );
}