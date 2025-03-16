'use client';

import React from 'react';
import { UniversalCard } from './UniversalCard';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import Link from 'next/link';
import { analysisData, AnalysisItem } from '../mocks/analysisData';
import { ArrowDownIcon } from '../ui/Icon';

interface AnalysisGridProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  analysisList?: AnalysisItem[];
}

// Локализация
const translations = {
  ru: {
    title: 'Анализы',
    description: 'Мы предлагаем широкий спектр анализов с использованием современного оборудования для точной диагностики вашего здоровья',
    allAnalyses: 'Все виды анализов',
    detailsButton: 'Подробнее'
  },
  uz: {
    title: 'Tahlillar',
    description: 'Biz zamonaviy uskunalardan foydalangan holda sog\'lig\'ingizni aniq tashxislash uchun keng ko\'lamli tahlillarni taklif etamiz',
    allAnalyses: 'Barcha tahlil turlari',
    detailsButton: 'Batafsil'
  }
};

export const AnalysisGrid: React.FC<AnalysisGridProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  analysisList = analysisData
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  
  const iconColor = theme === 'light' ? '#094A54' : '#ffffff';
  
  const localizedTitle = title || t('title');
  const localizedDescription = description || t('description');
  const localizedButtonText = buttonText || t('allAnalyses');
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Информационный блок - фиксированная высота */}
        <div className="w-full md:w-[24%] bg-light-accent text-white p-10 rounded-2xl flex flex-col h-[700px]">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">{localizedTitle}</h2>
          <p className="text-base md:text-lg mb-8">{localizedDescription}</p>
          
          <Link 
            href={buttonLink || "/analysis"}
            className="mt-auto flex items-center gap-2 p-4 text-white border border-white rounded-2xl transition-all hover:bg-white/10 self-start"
          >
            <span className='text-[16px]'>{localizedButtonText}</span>
            <ArrowDownIcon color="white" size={12} className="transform rotate-[-90deg]" />
          </Link>
        </div>
        
        {/* Сетка анализов - 75% ширины, без фиксированной высоты */}
        <div className="w-full md:w-[75%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysisList.map((analysis) => (
              <UniversalCard
                key={analysis.id}
                variant="analysis-card"
                title={analysis.title}
                icon={React.isValidElement(analysis.icon) 
                  ? React.cloneElement(analysis.icon as React.ReactElement, { color: iconColor })
                  : analysis.icon
                }
                link={analysis.link}
                buttonText={t('detailsButton')}
                className="h-auto" // Карточки без фиксированной высоты
                iconPosition="center"
                showButton={true}
                buttonStyle="outline"
                bordered={true}
                borderRadius="xl"
                hoverBgColor="white"
                buttonTextSize="text-lg"
                buttonPadding="py-5"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};