'use client';

import React, { useState } from 'react';
import { useThemeStore } from '@/src/store/theme';

interface BenefitCardProps {
  title: string;
  description: string;
  isActive?: boolean;
}

export default function WhyChooseUs(): React.ReactElement {
  const { theme } = useThemeStore();

  const BenefitCard: React.FC<BenefitCardProps> = ({ 
    title, 
    description,
    isActive = false
  }) => {
    const [hover, setHover] = useState<boolean>(isActive);
    
    const bgColor = hover 
      ? 'bg-light-accent text-white' 
      : theme === 'light' ? 'bg-white' : 'bg-dark-block';
    
    const textColor = hover 
      ? 'text-white' 
      : theme === 'light' ? 'text-light-text' : 'text-dark-text';
    
    return (
      <div 
        className={`p-8 rounded-xl min-h-[350px] h-full ${bgColor} flex flex-col relative transition-colors duration-300`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(isActive)}
      >
        <div className="absolute top-4 right-4 w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-100 dark:bg-gray-700"></div>
        
        <h3 className={`text-xl md:text-[28px] font-medium mb-8 ${textColor}`}>
          {title}
        </h3>
        
        <p className={`mt-auto ${textColor} text-base leading-relaxed`}>
          {description}
        </p>
      </div>
    );
  };

  return (
    <div className="mt-24">
      <div className="flex flex-col md:flex-row justify-between mb-10">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text leading-tight">
            Почему выбирают<br />
            Global Med Center
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg md:text-xl text-light-text dark:text-dark-text leading-relaxed">
            Позвольте нам позаботиться о здоровье ваших<br />
            сотрудников, чтобы вы могли сосредоточиться<br />
            на развитии компании
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <BenefitCard 
            title="Высокий профессионализм" 
            description="Наши специалисты — эксперты с многолетним опытом, регулярно повышающие квалификацию"
          />
        </div>
        
        <div className="md:col-span-1">
          <BenefitCard 
            title="Гибкость сотрудничества" 
            description="Мы предлагаем решения, адаптированные под особенности и потребности каждой компании"
          />
        </div>
        
        <div className="md:col-span-1">
          <BenefitCard 
            title="Современное оборудование" 
            description="Используем передовые технологии для обеспечения высокого качества наших услуг"
          />
        </div>
        
        <div className="md:col-span-1">
          <BenefitCard 
            title="Надёжность и поддержка" 
            description="Предоставляем круглосуточную поддержку и возможность онлайн-консультаций"
          />
        </div>
      </div>
    </div>
  );
}