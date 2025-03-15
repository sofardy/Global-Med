'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useThemeStore } from '@/src/store/theme';

export interface UniversalCardProps {
  // Основное содержимое
  title: string;
  description?: string | string[] | React.ReactNode;
  subtitle?: string;
  icon?: ReactNode;
  
  // Дополнительная информация
  additionalInfo?: string;
  
  // Варианты отображения
  variant?: 'default' | 'checkup' | 'specialist' | 'analysis';
  iconPosition?: 'center';
  listStyle?: 'none' | 'disc' | 'decimal'; // Добавляем опцию для стиля списка
  
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
  subtitle,
  icon,
  additionalInfo,
  variant = 'default',
  iconPosition = 'center',
  listStyle = 'disc', // По умолчанию используем диски для списков
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
  relative rounded-xl p-6 transition-all duration-300 min-h-[360px]
  ${isHovered 
    ? 'bg-light-accent' 
    : theme === 'light' ? 'bg-light-block' : 'bg-dark-block'}
  ${bordered ? `border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}` : ''}
  ${link || onClick ? 'cursor-pointer hover:shadow-md' : ''}
  ${className}
`;
  
  const titleColor = isHovered ? 'text-white' : '';
  const descriptionColor = isHovered ? 'text-white' : '';

  // Получаем класс для стиля списка
  const getListStyleClass = () => {
    switch (listStyle) {
      case 'disc':
        return 'list-disc';
      case 'decimal':
        return 'list-decimal';
      default:
        return 'list-none';
    }
  };
  
  const CardContent = () => (
    <div className="flex flex-col h-full">
      {/* Круглый элемент в правом верхнем углу */}
      <div 
        className={`absolute top-4 right-4 w-5 h-5 rounded-full transition-colors duration-300 ${
          isHovered ? 'bg-white' : 'bg-[#F7F7F7]'
        }`}
      ></div>
      
      {/* Заголовок */}
      <div className="flex flex-col flex-grow">
        <h3 className={`text-[24px] font-medium mb-2 ${titleColor}`}>{title}</h3>
        
        {/* Иконка в центре */}
        {icon && iconPosition === 'center' && (
          <div className="flex justify-center mt-[50px] mb-[50px]">
            {icon}
          </div>
        )}
        
        {/* Подзаголовок */}
        {subtitle && (
          <h4 className={`font-medium text-[18px] mb-2 ${titleColor}`}>{subtitle}</h4>
        )}
        
        {/* Описание */}
        {description && (
          Array.isArray(description) ? (
            <ul className={`${getListStyleClass()} pl-5 text-[18px] ${descriptionColor}`}>
              {description.map((item, idx) => (
                <li key={idx} className="mb-1">{item}</li>
              ))}
            </ul>
          ) : typeof description === 'string' ? (
            <p className={`text-[18px] font-normal ${descriptionColor}`}>{description}</p>
          ) : (
            <div className={descriptionColor}>{description}</div>
          )
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
      <Link href={link} className='h-full min-h-[320px] md:min-h-[400px] w-full'>
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