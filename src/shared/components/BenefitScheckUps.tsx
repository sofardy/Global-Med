import React from 'react';
import { UniversalCard } from '@/src/shared/components/UniversalCard';
import { useThemeStore } from '@/src/store/theme';
import { ButterflyIcon } from '@/src/shared/ui/Icon';

interface BenefitsCheckUpsProps {
  className?: string;
}

export const BenefitsCheckUps: React.FC<BenefitsCheckUpsProps> = ({
  className = ''
}) => {
  const { theme } = useThemeStore();
  
  // Данные для карточек
  const benefits = [
    {
      id: 'doctors',
      title: 'Квалифицированные врачи',
      description: 'Обследование проводят опытные специалисты с учетом особенностей',
      icon: <ButterflyIcon size={80} color={theme === 'light' ? '#224F5B' : 'white'} />
    },
    {
      id: 'health',
      title: 'Полная картина здоровья',
      description: 'Чек-апы помогают выявить скрытые риски и предупредить болезни',
      icon: <ButterflyIcon size={80} color={theme === 'light' ? '#224F5B' : 'white'} />
    },
    {
      id: 'precision',
      title: 'Точные результаты',
      description: 'Современные технологии обеспечивают точность диагностики',
      icon: <ButterflyIcon size={80} color="white" />
    },
    {
      id: 'price',
      title: 'Выгодное решение',
      description: 'Комплекс обследований обходится дешевле, чем по отдельности',
      icon: <ButterflyIcon size={80} color={theme === 'light' ? '#224F5B' : 'white'} />
    }
  ];

  // Разбиваем описание на 3 строки
  const descriptionLines = [
    "Мы создаем условия для быстрой, качественной", 
    "и достоверной диагностики, чтобы вы могли", 
    "своевременно позаботиться о своём здоровье"
  ];

  return (
    <div className={`w-full my-20 ${className}`}>
      <div className="flex flex-col md:flex-row mb-10">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-medium text-[#224F5B] dark:text-white mb-8">
            Почему стоит<br />пройти чек-ап у нас
          </h2>
        </div>
        <div className="w-full md:w-1/2 flex items-center">
          <p className="text-base md:text-lg text-[#224F5B] dark:text-white">
            {descriptionLines.map((line, index) => (
              <span key={index} className="block">{line}</span>
            ))}
          </p>
        </div>
      </div>

      {/* Сетка карточек с брейкпоинтом на 1600px */}
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 sm:gap-6">
        {benefits.map((benefit, index) => (
          <UniversalCard
            key={benefit.id}
            title={benefit.title}
            description={benefit.description}
            icon={benefit.icon}
            showButton={false}
            variant="analysis"
          />
        ))}
      </div>
    </div>
  );
};