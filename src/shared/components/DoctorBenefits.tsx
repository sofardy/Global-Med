'use client';

import React from 'react';
import { useTranslation } from '@/src/hooks/useTranslation';
import { UniversalCard } from '@/src/shared/components/UniversalCard';
import { MedicalIcon } from '@/src/shared/ui/Icon';
import { applyColorToIcon, getIconColorByTheme } from '../utils/iconUtils';
import { useThemeStore } from '@/src/store/theme';

interface Benefit {
  id: string;
  title: string;
  description: string;
  iconPath: React.ReactNode;
  isActive?: boolean;
}

// Локализация для компонента
const translations = {
  ru: {
    title: 'Почему стоит',
    titleSecond: 'выбирать наших врачей',
    subtitle: 'Мы гарантируем индивидуальный подход, внимание к каждой детали и комфорт на всех этапах лечения',
    benefits: [
      {
        id: 'qualified',
        title: 'Квалифицированные врачи',
        description: 'Обследование проводят опытные специалисты с учетом особенностей',
        iconPath: <MedicalIcon />
      },
      {
        id: 'complete',
        title: 'Полная картина здоровья',
        description: 'Обследования дают полное представление о состоянии здоровья',
        iconPath: <MedicalIcon />
      },
      {
        id: 'precise',
        title: 'Точные результаты',
        description: 'Современные технологии обеспечивают точность диагностики',
        iconPath: <MedicalIcon />,
      },
      {
        id: 'affordable',
        title: 'Выгодное решение',
        description: 'Цены на услуги средние по рынку, что гарантирует доступность',
        iconPath: <MedicalIcon />
      }
    ]
  },
  uz: {
    title: 'Nima uchun',
    titleSecond: 'shifokorlarimizni tanlash kerak',
    subtitle: 'Biz individual yondashuvni, har bir detalga e\'tiborni va davolashning barcha bosqichlarida qulaylikni kafolatlaymiz',
    benefits: [
      {
        id: 'qualified',
        title: 'Malakali shifokorlar',
        description: 'Tekshiruvlarni tajribali mutaxassislar xususiyatlarni hisobga olgan holda o\'tkazadilar',
        iconPath: <MedicalIcon />
      },
      {
        id: 'complete',
        title: 'Sog\'liqning to\'liq manzarasi',
        description: 'Tekshiruvlar sog\'liq holati haqida to\'liq tasavvur beradi',
        iconPath: <MedicalIcon />
      },
      {
        id: 'precise',
        title: 'Aniq natijalar',
        description: 'Zamonaviy texnologiyalar diagnostika aniqligini ta\'minlaydi',
        iconPath: <MedicalIcon />,
      },
      {
        id: 'affordable',
        title: 'Foydali yechim',
        description: 'Xizmatlar narxi bozordagi o\'rtacha, bu mavjudligini kafolatlaydi',
        iconPath: <MedicalIcon />
      }
    ]
  }
};

export default function DoctorBenefits() {
  const { t } = useTranslation(translations);
  const { theme } = useThemeStore();
  
  // Получаем локализованные данные и явно типизируем их
  const benefits = t('benefits', { returnObjects: true }) as Benefit[];
  
  return (
    <div className="w-full mt-16 md:mt-20">
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-light-text dark:text-dark-text">
            {t('title')}
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-light-text dark:text-dark-text mt-1 md:mt-2">
            {t('titleSecond')}
          </h2>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <p className="text-base md:text-lg text-light-text/80 dark:text-dark-text/80 max-w-xl w-full md:w-[80%] lg:w-[40%]">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {benefits.map((benefit: Benefit) => {
          return (
            <UniversalCard
              key={benefit.id}
              variant="analysis"
              title={benefit.title}
              description={benefit.description}
              icon={applyColorToIcon(benefit.iconPath, getIconColorByTheme(theme))}
              showButton={false}
              className={`h-full ${benefit.isActive ? 'bg-light-accent text-white' : ''}`}
              iconPosition="top"
              minHeight="h-[300px]"
              titleSize="text-[22px] font-medium mb-4"
              padding="6"
              bordered={!benefit.isActive}
            />
          );
        })}
      </div>
    </div>
  );
}