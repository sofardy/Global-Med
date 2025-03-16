'use client';

import React from 'react';
import { UniversalSlider } from '../components/UniversalSlider';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import Image from 'next/image';

// Локализация
const translations = {
  ru: {
    title: "Современная хирургия",
    description: "Мы проводим хирургические вмешательства по современным стандартам: передовые методики, опытные хирурги, минимальный период восстановления",
    prevSlide: "Предыдущий слайд",
    nextSlide: "Следующий слайд",
    detailsButton: "Подробнее",
    services: [
      {
        id: "gynecology",
        title: "Гинекология",
        description: "Наши специалисты проводят широкий спектр гинекологических операций с высокой точностью и бережным подходом. Используем малотравматичные методы, чтобы сократить восстановительный период и сохранить ваше здоровье",
        imageSrc: "/images/gynecology.png",
        iconSrc: "/icons/gynecology-icon.svg",
        features: [
          "Современное оборудование",
          "Опытные хирурги",
          "Минимальная реабилитация",
          "Комфортные условия"
        ]
      },
      {
        id: "urology",
        title: "Урология",
        description: "Диагностика и лечение урологических заболеваний с применением малоинвазивных методик. Наши специалисты владеют современными методами хирургии, обеспечивая минимальный восстановительный период",
        imageSrc: "/images/urology.png",
        iconSrc: "/icons/urology-icon.svg",
        features: [
          "Точная диагностика",
          "Малоинвазивные вмешательства",
          "Быстрое восстановление",
          "Индивидуальный подход"
        ]
      },
      {
        id: "ophthalmology",
        title: "Офтальмология",
        description: "Высокотехнологичные операции по восстановлению зрения с использованием лазерных технологий. Специализируемся на лечении катаракты, глаукомы и других патологий глаз с минимальным периодом реабилитации",
        imageSrc: "/images/ophthalmology.png",
        iconSrc: "/icons/eye-icon.svg",
        features: [
          "Лазерные технологии",
          "Безболезненные процедуры",
          "Высокая точность",
          "Быстрый результат"
        ]
      }
    ]
  },
  uz: {
    title: "Zamonaviy jarrohlik",
    description: "Biz zamonaviy standartlarga muvofiq jarrohlik aralashuvlarini o'tkazamiz: ilg'or metodikalar, tajribali jarrohlar, minimal tiklanish davri",
    prevSlide: "Oldingi slayd",
    nextSlide: "Keyingi slayd",
    detailsButton: "Batafsil",
    services: [
      {
        id: "gynecology",
        title: "Ginekologiya",
        description: "Mutaxassislarimiz yuqori aniqlik va ehtiyotkorlik bilan ginekologik operatsiyalarning keng doirasini o'tkazadilar. Tiklanish davrini qisqartirish va salomatligingizni saqlash uchun kam travmatik usullardan foydalanamiz",
        imageSrc: "/images/gynecology.png",
        iconSrc: "/icons/gynecology-icon.svg",
        features: [
          "Zamonaviy uskunalar",
          "Tajribali jarrohlar",
          "Minimal reabilitatsiya",
          "Qulay sharoitlar"
        ]
      },
      {
        id: "urology",
        title: "Urologiya",
        description: "Kam invaziv texnikalardan foydalangan holda urologik kasalliklarni tashxislash va davolash. Mutaxassislarimiz zamonaviy jarrohlik usullarini o'zlashtirib, minimal tiklanish davrini ta'minlaydilar",
        imageSrc: "/images/urology.png",
        iconSrc: "/icons/urology-icon.svg",
        features: [
          "Aniq tashxis",
          "Kam invaziv aralashuvlar",
          "Tez tiklanish",
          "Individual yondashuv"
        ]
      },
      {
        id: "ophthalmology",
        title: "Oftalmologiya",
        description: "Lazer texnologiyalaridan foydalangan holda ko'rishni tiklash bo'yicha yuqori texnologiyali operatsiyalar. Katarakta, glaukoma va boshqa ko'z patologiyalarini minimal reabilitatsiya davri bilan davolashga ixtisoslashganmiz",
        imageSrc: "/images/ophthalmology.png",
        iconSrc: "/icons/eye-icon.svg",
        features: [
          "Lazer texnologiyalari",
          "Og'riqsiz protseduralar",
          "Yuqori aniqlik",
          "Tezkor natija"
        ]
      }
    ]
  }
};

// Компонент сервисной карточки с изображением слева
const ServiceCard: React.FC<{
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  iconSrc?: string;
  features: string[];
  buttonText: string;
}> = ({ id, title, description, imageSrc, iconSrc, features, buttonText }) => {
  const { theme } = useThemeStore();
  
  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-dark-block rounded-2xl overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Левая часть с изображением - 40% ширины на десктопе */}
      <div className="w-full md:w-[40%] relative h-[200px] md:h-auto">
        <Image 
          src={imageSrc} 
          alt={title}
          fill
          className="object-cover" 
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
      
      {/* Правая часть с контентом - 60% ширины на десктопе */}
      <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-between">
        <div>
          {/* Заголовок с иконкой */}
          <div className="flex items-center mb-4">
            {iconSrc && (
              <div className="mr-3">
                <Image 
                  src={iconSrc} 
                  alt="" 
                  width={40} 
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
            )}
            <h3 className="text-2xl md:text-3xl font-semibold text-light-text dark:text-dark-text">{title}</h3>
          </div>
          
          {/* Описание */}
          <p className="text-base text-light-text dark:text-dark-text opacity-80 mb-6">{description}</p>
          
          {/* Особенности */}
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-light-accent mr-2">•</span>
                <span className="text-light-text dark:text-dark-text">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Кнопка */}
        <div className="mt-auto">
          <a 
            href={`/services/${id}`} 
            className="inline-block bg-light-accent text-white py-3 px-6 rounded-xl hover:bg-opacity-90 transition-colors"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export interface SurgerySliderProps {
  title?: string;
  description?: string;
  className?: string;
}

export const SurgerySlider: React.FC<SurgerySliderProps> = ({ 
  title, 
  description, 
  className
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  
  // Получаем локализованные данные
  const sliderTitle = title || t('title');
  const sliderDescription = description || t('description');
  const services = t('services', { returnObjects: true }) as any[];
  const detailsButtonText = t('detailsButton');
  
  // Создаем слайды с карточками
  const slides = services.map((service) => (
    <ServiceCard
      key={service.id}
      id={service.id}
      title={service.title}
      description={service.description}
      imageSrc={service.imageSrc}
      iconSrc={service.iconSrc}
      features={service.features}
      buttonText={detailsButtonText}
    />
  ));

  // Создаем компоненты заголовка и описания
  const titleComponent = (
    <h2 className="text-3xl md:text-[40px] font-bold text-[#173F46] dark:text-white">
      {sliderTitle}
    </h2>
  );

  const descriptionComponent = (
    <p className="text-base md:text-lg text-[#173F46] dark:text-white">
      {sliderDescription}
    </p>
  );

  // Использование универсального слайдера
  return (
    <UniversalSlider
      slides={slides}
      title={titleComponent}
      description={descriptionComponent}
      slidesPerView={1}
      slidesPerMobileView={1}
      mobileBreakpoint={992}
      spaceBetween={24}
      showNavigation={true}
      navigationPrevLabel={t('prevSlide')}
      navigationNextLabel={t('nextSlide')}
      showPagination={false}
      className={`${className} surgery-slider`}
      slideClassName="h-full"
      wrapperClassName="mt-16 mb-8"
    />
  );
};