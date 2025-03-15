'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useThemeStore } from '@/src/store/theme';

export interface UniversalCardProps {
  // Основное содержимое
  title: string;
  description?: string;
  icon?: ReactNode;
  
  // Дополнительная информация
  additionalInfo?: string;
  
  // Варианты отображения
  variant?: 'default' | 'checkup' | 'specialist' | 'analysis';
  iconPosition?: 'top' | 'bottom';
  
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
  iconPosition = 'top',
  link,
  buttonText = 'Подробнее',
  onClick,
  className = '',
  bordered = false,
}) => {
  const { theme } = useThemeStore();
  
  const handleClick = () => {
    if (onClick) onClick();
  };
  
  const cardClasses = `
    rounded-xl p-6 transition-all duration-300 h-full w-[375px]
    ${theme === 'light' ? 'bg-light-block' : 'bg-dark-block'}
    ${bordered ? `border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}` : ''}
    ${link || onClick ? 'cursor-pointer hover:shadow-md' : ''}
    ${className}
  `;
  
  const CardContent = () => (
    <div className="flex flex-col h-full ">
      {/* Иконка сверху */}
      {icon && iconPosition === 'top' && (
        <div className="mb-5 flex justify-center md:justify-start">{icon}</div>
      )}
      
      {/* Заголовок и описание */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        {description && <p className="text-sm mb-4">{description}</p>}
        
        {/* Дополнительная информация */}
        {additionalInfo && (
          <p className="text-sm text-light-accent dark:text-dark-accent mt-auto">
            {additionalInfo}
          </p>
        )}
      </div>
      
      {/* Иконка снизу */}
      {icon && iconPosition === 'bottom' && (
        <div className="mt-5 flex justify-center">
          <img src="/icon/Group (13).svg" className='w-[80px] h-[80px]' alt="" />
        </div>
      )}
      
      {/* Кнопка "Подробнее" */}
      {variant === 'specialist' && buttonText && (
        <button className="mt-4 px-6 py-5 bg-light-accent text-white rounded-xl text-sm">
          {buttonText}
        </button>
      )}
    </div>
  );

  // Обертка в Link если есть ссылка
  if (link) {
    return (
      <Link href={link}>
        <div className={cardClasses}>
          <CardContent />
        </div>
      </Link>
    );
  }

  // Обычная карточка с возможностью клика
  return (
    <div className={cardClasses} onClick={handleClick}>
      <CardContent />
    </div>
  );
};