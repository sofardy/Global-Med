'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useThemeStore } from '@/src/store/theme';

export interface UniversalCardProps {
  // Основное содержимое
  title: string;
  description?: string | React.ReactNode;
  icon?: ReactNode;
  
  // Дополнительная информация
  additionalInfo?: string;
  
  // Варианты отображения
  variant?: 'default' | 'checkup' | 'specialist' | 'analysis';
  iconPosition?: 'center';
  
  // Действия и навигация
  link?: string;
  buttonText?: string;
  onClick?: () => void;
  
  // Стилизация
  className?: string;
  bordered?: boolean;
}

export const UniversalCard: React.FC<UniversalCardProps> = ({
  title,
  description,
  icon,
  additionalInfo,
  variant = 'default',
  iconPosition = 'center',
  link,
  buttonText = 'Подробнее',
  onClick,
  className = '',
  bordered = false,
}) => {
  const { theme } = useThemeStore();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleClick = () => {
    if (onClick) onClick();
  };
  
  const cardClasses = `
    relative rounded-xl p-6 transition-all duration-300 h-full w-[375px]
    ${isHovered 
      ? 'bg-light-accent' 
      : theme === 'light' ? 'bg-light-block' : 'bg-dark-block'}
    ${bordered ? `border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}` : ''}
    ${link || onClick ? 'cursor-pointer hover:shadow-md' : ''}
    ${className}
  `;
  
  const titleColor = isHovered ? 'text-white' : '';
  const descriptionColor = isHovered ? 'text-white' : '';
  
  const CardContent = () => (
    <div className="flex flex-col h-full">
      {/* Круглый элемент в правом верхнем углу */}
      <div 
        className={`absolute top-4 right-4 w-5 h-5 rounded-full transition-colors duration-300 ${
          isHovered ? 'bg-white' : 'bg-[#F7F7F7]'
        }`}
      ></div>
      
      {/* Иконка в центре */}
    
      
      {/* Заголовок и описание */}
      <div className="flex flex-col flex-grow">
        <h3 className={`text-[24px] font-medium mb-2 ${titleColor}`}>{title}</h3>
          {icon && iconPosition === 'center' && (
        <div className="flex justify-center mt-[50px] mb-[50px]">
          {icon}
        </div>
      )}
        {description && typeof description === 'string' ? (
          <p className={`text-[18px] font-medium mb-4 ${descriptionColor}`}>{description}</p>
        ) : (
          <div className={`text-[18px] font-normal mb-4 ${descriptionColor}`}>{description}</div>
        )}
        
        {/* Дополнительная информация */}
        {additionalInfo && (
          <p className={`text-[18px] ${isHovered ? 'text-white' : 'text-light-accent dark:text-dark-accent'} mt-auto`}>
            {additionalInfo}
          </p>
        )}
      </div>
      
      {/* Кнопка "Подробнее" */}
      {variant === 'specialist' && buttonText && (
        <button className={`mt-4 px-6 py-5 ${isHovered ? 'bg-white text-light-accent' : 'bg-light-accent text-white'} rounded-xl text-sm transition-colors`}>
          {buttonText}
        </button>
      )}
    </div>
  );

  // Обертка в Link если есть ссылка
  if (link) {
    return (
      <Link href={link}>
        <div 
          className={cardClasses}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardContent />
        </div>
      </Link>
    );
  }

  // Обычная карточка с возможностью клика
  return (
    <div 
      className={cardClasses} 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent />
    </div>
  );
};