'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useThemeStore } from '@/src/store/theme';
import { AppointmentForm } from '../components/AppointmentForm';
import Image from 'next/image';
import { heroTranslations } from '../components/HeroBanner/translations';
import Modal from '@/src/shared/components/Modal/Modal';

// Локализация для компонента
const translations = {
  ru: {
    title: 'Доверьте своё здоровье профессионалам',
    subtitle: 'Запишитесь на прием, оставив свои контакты и специалисты нашей клиники свяжутся с вами в кратчайшие сроки, обычно это занимает не более часа',
    confirmationTitle: 'Ваша заявка принята!',
    confirmationMessage: 'Специалисты нашей клиники свяжутся с вами в ближайшее время',
    closeButton: 'Закрыть'
  },
  uz: {
    title: 'O\'z sog\'lig\'ingizni mutaxassislarga ishoning',
    subtitle: 'Qabulga yoziling, kontakt ma\'lumotlaringizni qoldiring va klinikamiz mutaxassislari siz bilan qisqa muddatda bog\'lanishadi, odatda bu bir soatdan ko\'p vaqt olmaydi',
    confirmationTitle: 'Arizangiz qabul qilindi!',
    confirmationMessage: 'Klinikamiz mutaxassislari tez orada siz bilan bog\'lanishadi',
    closeButton: 'Yopish'
  }
};

interface AppointmentSectionProps {
  className?: string;
  onSuccess?: () => void;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  className = '',
  onSuccess
}) => {
  const { t } = useTranslation(translations);
  const { theme } = useThemeStore();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  
  const handleFormSuccess = () => {
    setIsConfirmationModalOpen(true);
    if (onSuccess) onSuccess();
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <>
      <div className={`w-full flex flex-col md:flex-row gap-5 rounded-3xl overflow-hidden ${className}`}>
        {/* Левая колонка - информация (25%) */}
        <div className={`p-6 md:p-8 ${theme === 'dark' ? 'bg-dark-block' : 'bg-light-block'} md:w-1/4`}>
          <div>
            <h2 
              className="text-light-text dark:text-dark-text mb-4"
              style={{
                fontFamily: 'Graphik LCG, sans-serif',
                fontSize: '24px',
                fontWeight: 500,
                lineHeight: '110%',
                letterSpacing: '0%'
              }}
            >
              {t('title')}
            </h2>
            <p 
              className="text-light-text/80 dark:text-dark-text/80"
              style={{
                fontFamily: 'Graphik LCG, sans-serif',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '110%',
                letterSpacing: '0%'
              }}
            >
              {t('subtitle')}
            </p>
          </div>
        </div>
        
        {/* Центральная колонка - форма (50%) */}
        <div className={`p-6 md:p-8 ${theme === 'dark' ? 'bg-dark-block' : 'bg-white'} md:w-1/2`}>
          <AppointmentForm
            onSuccess={handleFormSuccess}
            onCancel={() => {}}
            translationNamespace={heroTranslations}
          />
        </div>
        
        {/* Правая колонка - изображение (25%) */}
        <div className="hidden md:block md:w-1/4 relative">
          <Image
            src="/images/doctor-form.jpg"
            alt="Доктор и пациент"
            className="object-cover h-full w-full"
            fill
          />
        </div>
      </div>

      {/* Модальное окно подтверждения */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        position="center"
        size="sm"
        theme="brand"
        showCloseButton={true}
        showCloseIcon={false}
      >
        <div className="py-6 flex flex-col items-center justify-center text-center">
          <div className="bg-light-accent rounded-full p-5 mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-light-text dark:text-dark-text mb-4">
            {t('confirmationTitle')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('confirmationMessage')}
          </p>
          <button 
            onClick={closeConfirmationModal}
            className="px-8 py-3 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
          >
            {t('closeButton')}
          </button>
        </div>
      </Modal>
    </>
  );
};