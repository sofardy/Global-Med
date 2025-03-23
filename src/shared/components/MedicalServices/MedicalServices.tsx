'use client';

import React, { useState, useEffect } from 'react';
import { UniversalCard } from '../UniversalCard';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useThemeStore } from '@/src/store/theme';
import Link from 'next/link';
import { applyColorToIcon, getIconColorByTheme } from '../../utils/iconUtils';
import { medicalServicesMockData } from '../../mocks/medicalServicesMockData';
import { ArrowDownIcon } from '../../ui/Icon';

// Переводы для компонента
const translations = {
  ru: {
    title: 'Полный спектр медицинских услуг в одной клинике',
    description: 'Наша клиника объединяет ведущие направления медицины, обеспечивая комплексную диагностику, лечение и сопровождение пациентов. Опытные специалисты, современное оборудование и круглосуточная помощь — всё для вашего здоровья',
    viewAllServices: 'Все виды услуг',
    moreButton: 'Подробнее',
    showMore: 'Показать ещё',
    showLess: 'Свернуть'
  },
  uz: {
    title: `Bitta klinikada to'liq tibbiy xizmatlar spektri`,
    description: `Klinikamiz tibbiyotning yetakchi yo'nalishlarini birlashtirib, kompleks diagnostika, davolash va bemorlarni kuzatib borishni ta'minlaydi. Tajribali mutaxassislar, zamonaviy uskunalar va 24/7 yordam — barchasi sizning sog'lig'ingiz uchun.`,
    viewAllServices: 'Barcha xizmatlar',
    moreButton: 'Batafsil',
    showMore: 'Ko\'proq ko\'rsatish',
    showLess: 'Kamroq ko\'rsatish'
  }
};

export const MedicalServices = () => {
  const { t } = useTranslation(translations);
  const { theme } = useThemeStore();
  const [isMobile, setIsMobile] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const services = medicalServicesMockData.services;
  const displayedServices = isMobile && !showAllItems 
    ? services.slice(0, 4) 
    : services;

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 lg:mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Левый блок (фиксированный) */}
          <div className="col-span-1 relative rounded-2xl overflow-hidden h-auto lg:sticky lg:top-6 md:h-[500px] lg:h-[700px] p-8 md:p-10 bg-white dark:bg-dark-block text-[#173F46] dark:text-white min-h-[400px] md:min-h-[500px] lg:min-h-[700px] flex flex-col">
            {/* DNA pattern */}
            <div 
              className="absolute -right-[250px] -bottom-[250px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block" 
              style={{
                backgroundImage: 'url(/images/doctor-pattern.png)',
                backgroundSize: 'contain',
                transform: 'rotate(-50deg)',
                backgroundPosition: 'right bottom',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            
            <div className="relative z-10 max-w-3xl">
              <div className="space-y-6">
                <div className="text-3xl md:text-4xl lg:text-[56px] font-medium tracking-[0.01em] leading-tight">
                  <span className="block mb-4">Полный спектр</span>
                  <span className="block mb-4">медицинских услуг</span>
                  <span className="block">в одной клинике</span>
                </div>
              </div>
              <p className="text-base lg:text-[18px] mt-10 mb-12 tracking-normal leading-[160%] space-y-2">
                <span className="block">Наша клиника объединяет ведущие направления медицины,</span>
                <span className="block">обеспечивая комплексную диагностику, лечение и сопровождение</span>
                <span className="block">пациентов. Опытные специалисты, современное оборудование</span>
                <span className="block">и круглосуточная помощь — всё для вашего здоровья</span>
              </p>
            </div>
            
            <Link href="/services" className="relative z-10 h-[58px] inline-flex items-center justify-center border border-[#173F46] dark:border-white text-[#173F46] dark:text-white hover:bg-light-accent hover:text-white hover:border-light-accent rounded-2xl px-6 py-3 transition-colors mt-auto self-start">
              <span className="tracking-wide">{t('viewAllServices')}</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
            
          {/* Правая колонка */}
          <div className="col-span-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
              {Array.isArray(displayedServices) && displayedServices.map((service, index) => (
                <div key={service.id + index} className="h-full">
                  <UniversalCard
                    variant="service"
                    title={service.title}
                    description={service.description}
                    additionalInfo={service.servicesCount}
                    icon={applyColorToIcon(service.iconPath, getIconColorByTheme(theme))}
                    link={`/services/${service.id}`}
                    buttonText={t('moreButton')}
                    className="h-full"
                    iconPosition="center"
                  />
                </div>
              ))}
            </div>
            
            {/* Кнопка "Показать еще" только на мобильных устройствах */}
            {isMobile && services.length > 4 && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="flex items-center gap-2 px-6 py-4 text-light-text dark:text-dark-text border border-light-text dark:border-dark-text rounded-2xl transition-all hover:bg-light-accent hover:text-white hover:border-light-accent"
                >
                  <span className="text-[16px]">{showAllItems ? t('showLess') : t('showMore')}</span>
                  <ArrowDownIcon 
                    color={theme === 'light' ? '#094A54' : 'white'} 
                    size={12} 
                    className={showAllItems ? "transform rotate-180" : ""}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};