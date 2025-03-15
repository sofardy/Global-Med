
'use client';

import React from 'react';
import { UniversalCard } from '../UniversalCard';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useThemeStore } from '@/src/store/theme';
import { AngelIcon, ButterflyIcon, EyeIcon, LightbulbIcon } from '../../ui/Icon';

// Переводы для компонента
const translations = {
  ru: {
    title: 'Полный спектр медицинских услуг в одной клинике',
    description: 'Наша клиника объединяет ведущие направления медицины, обеспечивая комплексную диагностику, лечение и сопровождение пациентов. Опытные специалисты, современное оборудование и круглосуточная помощь — всё для вашего здоровья',
    viewAllServices: 'Все виды услуг',
    services: [
      {
        id: 'lor',
        title: 'Лор 24/7',
        description: 'Круглосуточная диагностика и лечение заболеваний уха, горла и носа',
        servicesCount: '12 услуг',
        iconPath: <LightbulbIcon/>,
        backgroundImage: '/images/lor-bg.png'
      },
      {
        id: 'ophthalmology',
        title: 'Офтальмология',
        description: 'Проверка зрения, лечение воспалений и консультации по подбору очков и линз',
        servicesCount: '15 услуг',
        iconPath: <EyeIcon/>,
        backgroundImage: '/images/eye-bg.png'
      },
      {
        id: 'butterfly',
        title: 'Офтальмология',
        description: 'Проверка зрения, лечение воспалений и консультации по подбору очков и линз',
        servicesCount: '15 услуг',
        iconPath: <ButterflyIcon/>,
        backgroundImage: '/images/eye-bg.png'
      },
      {
        id: 'angel',
        title: 'Офтальмология',
        description: 'Проверка зрения, лечение воспалений и консультации по подбору очков и линз',
        servicesCount: '15 услуг',
        iconPath: <AngelIcon/>,
        backgroundImage: '/images/eye-bg.png'
      },
    ],
    moreButton: 'Подробнее'
  },
  uz: {
    title: 'Bitta klinikada tibbiy xizmatlarning to\'liq spektri',
    description: 'Bizning klinikamiz tibbiyotning yetakchi yo\'nalishlarini birlashtiradi, kompleks diagnostika, davolash va bemorlarni kuzatib borishni ta\'minlaydi. Tajribali mutaxassislar, zamonaviy uskunalar va sutkalik yordam — barchasi sizning sog\'lig\'ingiz uchun',
    viewAllServices: 'Barcha xizmat turlari',
    services: [
      {
        id: 'lor',
        title: 'LOR 24/7',
        description: 'Quloq, tomoq va burun kasalliklarini sutkalik diagnostikasi va davolash',
        servicesCount: '12 ta xizmat',
        iconPath: <LightbulbIcon/>,
        backgroundImage: '/images/lor-bg.png'
      },
      {
        id: 'ophthalmology',
        title: 'Oftalmologiya',
        description: 'Ko\'rishni tekshirish, yallig\'lanishlarni davolash va ko\'zoynak va linzalar bo\'yicha maslahatlar',
        servicesCount: '15 ta xizmat',
        iconPath: <EyeIcon/>,
        backgroundImage: '/images/eye-bg.png'
      }
    ],
    moreButton: 'Batafsil'
  }
};

export const MedicalServices: React.FC = () => {
  const { t } = useTranslation(translations);
  const { theme } = useThemeStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const services = t('services', { returnObjects: true }) as any[];

  return (
    <div className="w-full">
      <div className="mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Информационный блок с заголовком и описанием */}
          <div className="col-span-1 relative rounded-2xl overflow-hidden h-auto md:h-[500px] lg:h-[700px] p-8 md:p-10 bg-white dark:bg-dark-block text-[#173F46] dark:text-white min-h-[400px] md:min-h-[500px] lg:min-h-[700px] flex flex-col">
            {/* DNA structure in the bottom right corner */}
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
            
            <a href="/services" className="relative z-10 inline-flex items-center justify-center border border-[#173F46] dark:border-white text-[#173F46] dark:text-white hover:bg-[#173F46]/5 dark:hover:bg-white/10 rounded-lg px-6 py-3 transition-colors mt-auto self-start">
              <span className="tracking-wide">{t('viewAllServices')}</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
            
          {/* Карточки услуг - правая колонка */}
          <div className="col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.isArray(services) && services.map((service, index) => (
              <div key={service.id + index} className="h-full">
                <UniversalCard
                  variant="service"
                  title={service.title}
                  description={service.description}
                  additionalInfo={service.servicesCount}
                  icon={React.isValidElement(service.iconPath) 
                    ? React.cloneElement(service.iconPath, { 
                        color: theme === 'dark' ? '#ffffff' : '#094A54' 
                      })
                    : service.iconPath}
                  link={`/services/${service.id}`}
                  buttonText={t('moreButton')}
                  className="h-full"
                  iconPosition="center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};