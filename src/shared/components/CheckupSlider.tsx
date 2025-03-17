/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { UniversalSlider } from '../components/UniversalSlider';
import { UniversalCard } from '../components/UniversalCard';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { MedicalTrackerIcon, ButterflyIcon } from '../ui/Icon';

// Локализация
const translations = {
  ru: {
    title: "Пройдите чек-ап за один визит",
    description: "Быстрое обследование для выявления скрытых заболеваний и контроля за состоянием здоровья",
    prevSlide: "Предыдущий слайд",
    nextSlide: "Следующий слайд",
    checkups: [
      {
        id: "family",
        title: "Здоровая семья",
        description: "Комплексное обследование для мужчин и женщин, помогающее оценить общее состояние здоровья и выявить риски заболеваний",
        investigationsCount: 11,
        timeRequired: "2 часа", 
        buttonText: "Подробнее"
      },
      {
        id: "pregnancy",
        title: "Хочу стать мамой",
        description: "Комплексное обследование для женщин, планирующих беременность, включающее важные анализы, УЗИ и консультации специалистов для подготовки к здоровому зачатию",
        investigationsCount: 12,
        timeRequired: "2 часа", 
        buttonText: "Подробнее"
      },
      {
        id: "health",
        title: "Базовый чек-ап",
        description: "Быстрое но полное обследование организма, включающее основные анализы, ЭКГ и консультацию терапевта для оценки общего состояния здоровья",
        investigationsCount: 8,
        timeRequired: "1 час", 
        buttonText: "Подробнее"
      },
      {
        id: "heart",
        title: "Здоровое сердце",
        description: "Углубленная диагностика сердечно-сосудистой системы с консультацией кардиолога для выявления и профилактики сердечных заболеваний",
        investigationsCount: 10,
        timeRequired: "1,5 часа", 
        buttonText: "Подробнее"
      },
      {
        id: "children",
        title: "Детское здоровье",
        description: "Комплексное обследование для детей разных возрастов, включающее осмотр педиатра и необходимые анализы для контроля развития ребенка",
        investigationsCount: 9,
        timeRequired: "1 час", 
        buttonText: "Подробнее"
      }
    ]
  },
  uz: {
    title: "Bir tashrif davomida tekshiruvdan o'ting",
    description: "Yashirin kasalliklarni aniqlash va sog'lig'ingizni nazorat qilish uchun tezkor tekshiruv",
    prevSlide: "Oldingi slayd",
    nextSlide: "Keyingi slayd",
    checkups: [
      {
        id: "family",
        title: "Sog'lom oila",
        description: "Erkaklar va ayollar uchun kompleks tekshiruv, umumiy sog'liqni baholash va kasallik xavflarini aniqlashga yordam beradi",
        investigationsCount: 11,
        timeRequired: "2 soat", 
        buttonText: "Batafsil"
      },
      {
        id: "pregnancy",
        title: "Ona bo'lmoqchiman",
        description: "Homiladorlikni rejalashtiruvchi ayollar uchun kompleks tekshiruv: muhim tahlillar, UTT va sog'lom homiladorlikka tayyorgarlik uchun mutaxassislar konsultatsiyasi",
        investigationsCount: 12,
        timeRequired: "2 soat", 
        buttonText: "Batafsil"
      },
      {
        id: "health",
        title: "Asosiy tekshiruv",
        description: "Tez, ammo to'liq tanani tekshirish, asosiy tahlillar, EKG va umumiy sog'liq holatini baholash uchun terapevt maslahati",
        investigationsCount: 8,
        timeRequired: "1 soat", 
        buttonText: "Batafsil"
      },
      {
        id: "heart",
        title: "Sog'lom yurak",
        description: "Yurak-qon tomir tizimining chuqurlashtirilgan diagnostikasi, yurak kasalliklarini aniqlash va oldini olish uchun kardiolog maslahati",
        investigationsCount: 10,
        timeRequired: "1,5 soat", 
        buttonText: "Batafsil"
      },
      {
        id: "children",
        title: "Bolalar salomatligi",
        description: "Turli yoshdagi bolalar uchun kompleks tekshiruv, pediatr ko'rigi va bolaning rivojlanishini nazorat qilish uchun zarur tahlillarni o'z ichiga oladi",
        investigationsCount: 9,
        timeRequired: "1 soat", 
        buttonText: "Batafsil"
      }
    ]
  }
};

// Разделение текста на строки
const splitTextIntoLines = (text: string, lineCount: number) => {
  if (!text) return [];
  
  const words = text.split(' ');
  const wordsPerLine = Math.ceil(words.length / lineCount);
  
  const lines = [];
  for (let i = 0; i < lineCount; i++) {
    const startIndex = i * wordsPerLine;
    const endIndex = Math.min(startIndex + wordsPerLine, words.length);
    if (startIndex < words.length) {
      lines.push(words.slice(startIndex, endIndex).join(' '));
    }
  }
  
  return lines;
};

export interface CheckupSliderProps {
  title?: string;
  description?: string;
  className?: string;
}

export const CheckupSlider: React.FC<CheckupSliderProps> = ({ 
  title, 
  description, 
  className
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  
  // Получаем локализованные данные
  const sliderTitle = title || t('title') || '';
  const sliderDescription = description || t('description')||'';
  const checkups = t('checkups', { returnObjects: true }) as any[];
  
  // Разделение текстов на строки
  const titleLines = splitTextIntoLines(sliderTitle, 2);
  const descriptionLines = splitTextIntoLines(sliderDescription, 3);
  
  // Готовим заголовок с разбивкой на строки
  const formattedTitle = (
    <h2 className="text-3xl md:text-[40px] font-bold text-light-text dark:text-dark-text">
      {titleLines.map((line, index) => (
        <span key={index} className="block">{line}</span>
      ))}
    </h2>
  );
  
  // Готовим описание с разбивкой на строки
  const formattedDescription = (
    <div className="flex flex-col">
      <div className="mb-4 w-full">
        <p className="text-light-text dark:text-dark-text text-base md:text-lg">
          {descriptionLines.map((line, index) => (
            <span key={index} className="block">{line}</span>
          ))}
        </p>
      </div>
    </div>
  );
  
  // Создаем слайды с карточками
  const slides = checkups.map((checkup) => {
    // Определяем иконку в зависимости от типа чек-апа
    const icon = checkup.id === 'pregnancy' 
      ? <ButterflyIcon size={190} color={theme === 'light' ? '#094A54' : '#ffffff'} />
      : <MedicalTrackerIcon size={190} color={theme === 'light' ? '#094A54' : '#ffffff'} />;
    
    // Создаем карточку
    return (
      <UniversalCard
        key={checkup.id}
        title={checkup.title}
        description={checkup.description}
        investigationsCount={checkup.investigationsCount}
        timeRequired={checkup.timeRequired}
        buttonText={checkup.buttonText}
        link={`/checkups/${checkup.id}`}
        icon={icon}
        variant="family"
        className="min-h-[430px] hover:shadow-lg transition-all duration-300 relative"
        bordered={true}
        borderRadius="2xl"
        padding="0"
        hoverColor={theme === 'light' ? 'bg-light-accent hover:bg-light-accent' : 'bg-dark-accent hover:bg-dark-accent'}
        styles={{
          container: { padding: '40px', position: 'relative' },
          title: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 500, fontSize: '40px' },
          description: { fontFamily: 'Graphik LCG, sans-serif', fontWeight: 400, fontSize: '18px' }
        }}
      />
    );
  });

  return (
    <UniversalSlider
      slides={slides}
      title={formattedTitle}
      description={formattedDescription}
      slidesPerView={2}
      slidesPerMobileView={1}
      mobileBreakpoint={768}
      spaceBetween={20}
      showNavigation={true}
      navigationPrevLabel={t('prevSlide')}
      navigationNextLabel={t('nextSlide')}
      showPagination={false}
      className={className}
      titleClassName="text-3xl md:text-[40px] mt-20 font-bold text-light-text dark:text-dark-text"
      descriptionClassName="text-light-text dark:text-dark-text text-base md:text-lg"
      wrapperClassName="mt-20"
    />
  );
};