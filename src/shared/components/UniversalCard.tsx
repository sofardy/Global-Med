/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useThemeStore } from '@/src/store/theme';

export interface UniversalCardProps {
  title: string;
  description?: string | string[] | React.ReactNode;
  subtitle?: string;
  icon?: ReactNode;
  additionalInfo?: string;
  variant?: 'default' | 'checkup' | 'specialist' | 'analysis' | 'service' | 'custom';
  iconPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  listStyle?: 'none' | 'disc' | 'decimal';
  descriptionBeforeIcon?: boolean;
  link?: string;
  buttonText?: string;
  onClick?: () => void;
  showButton?: boolean;
  className?: string;
  bordered?: boolean;
  borderColor?: string;
  borderRadius?: string;
  iconColorLight?: string;
  iconColorDark?: string;
  hoverColor?: string;
  bgColorLight?: string;
  bgColorDark?: string;
  titleSize?: string;
  descriptionSize?: string;
  padding?: string;
  onHover?: () => void;
  badge?: string | ReactNode;
  animation?: string;
  styles?: {
    container?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
    icon?: React.CSSProperties;
    button?: React.CSSProperties;
  };
}

export const UniversalCard: React.FC<UniversalCardProps> = ({
  title,
  description,
  subtitle,
  icon,
  additionalInfo,
  variant = 'default',
  iconPosition = 'center',
  listStyle = 'disc',
  descriptionBeforeIcon = false,
  link,
  buttonText = 'Подробнее',
  onClick,
  showButton = true,
  className = '',
  bordered = false,
  borderColor,
  borderRadius = 'xl',
  iconColorLight = '#00c78b', 
  iconColorDark = '#11363C',
  hoverColor,
  bgColorLight,
  bgColorDark,
  titleSize,
  descriptionSize,
  padding = '6',
  onHover,
  badge,
  animation,
  styles = {},
}) => {
  const { theme } = useThemeStore();
  const [isHovered, setIsHovered] = useState(false);
  
  // Значения по умолчанию для вариантов
  if (variant === 'service') {
    iconColorLight = '#173F46';
    iconColorDark = 'white';
  } else if (variant === 'analysis') {
    iconColorLight = '#00c78b';
    iconColorDark = '#11363C';
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) onHover();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleClick = () => {
    if (onClick) onClick();
  };
  
  // Стилизованные классы
  const getBorderClass = () => {
    if (!bordered) return '';
    const defaultBorder = theme === 'light' ? 'border-gray-200' : 'border-gray-700';
    return `border ${borderColor || defaultBorder}`;
  };
  
const getBackgroundClass = () => {
  if (isHovered) return hoverColor || 'bg-light-accent';
  if (theme === 'light') return bgColorLight || 'bg-light-block'; 
  return bgColorDark || 'bg-dark-block';
};
  
  const getBorderRadiusClass = () => {
    switch (borderRadius) {
      case 'none': return '';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'xl': return 'rounded-xl';
      case '2xl': return 'rounded-2xl';
      case 'full': return 'rounded-full';
      default: return `rounded-${borderRadius}`;
    }
  };
  
  const getPaddingClass = () => {
    return `p-${padding}`;
  };
  
  const getAnimationClass = () => {
    if (!animation) return '';
    
    switch (animation) {
      case 'fadeIn': return 'animate-fadeIn';
      case 'slideIn': return 'animate-slideIn';
      case 'pulse': return 'animate-pulse';
      case 'bounce': return 'animate-bounce';
      default: return animation.startsWith('animate-') ? animation : `animate-${animation}`;
    }
  };
  
  const cardClasses = `
    relative ${getBorderRadiusClass()} ${getPaddingClass()} transition-all duration-300 min-h-[375px] h-full
    ${getBackgroundClass()}
    ${getBorderClass()}
    ${link || onClick ? 'cursor-pointer hover:shadow-md' : ''}
    ${getAnimationClass()}
    ${className}
  `;
  
  const titleColor = isHovered ? 'text-white' : '';
  const descriptionColor = isHovered ? 'text-white' : '';
  const titleSizeClass = titleSize || 'text-[24px]';
  const descriptionSizeClass = descriptionSize || 'text-[18px]';

  // Класс для стиля списка
  const getListStyleClass = () => {
    switch (listStyle) {
      case 'disc':
        return 'list-disc marker-accent';
      case 'decimal':
        return 'list-decimal marker-accent';
      default:
        return 'list-none';
    }
  };
  
  // Класс для позиционирования иконки
  const getIconPositionClass = () => {
    // Базовое позиционирование
    let positionClass = 'flex justify-center';
    
    // Выравнивание по горизонтали
    if (iconPosition === 'left') positionClass = 'flex justify-start';
    else if (iconPosition === 'right') positionClass = 'flex justify-end';
    
    // Отступы для разных вариантов
    if (variant === 'analysis') {
      return `${positionClass} mt-[50px] mb-[50px]`;
    } else if (variant === 'service') {
      return `${positionClass} mt-4 mb-[50px]`;
    } else {
      return `${positionClass} my-6`;
    }
  };
  
  // Блок с описанием
  const DescriptionBlock = () => (
    description && (
      <div className={`mb-5 ${descriptionColor}`} style={styles.description}>
        {Array.isArray(description) ? (
          <ul className={`${getListStyleClass()} pl-5 ${descriptionSizeClass}`}>
            {description.map((item, idx) => (
              <li key={idx} className="mb-1">{item}</li>
            ))}
          </ul>
        ) : typeof description === 'string' ? (
          <p className={`${descriptionSizeClass} font-normal`}>{description}</p>
        ) : (
          <>{description}</>
        )}
      </div>
    )
  );
  
  // Блок с дополнительной информацией
const AdditionalInfoBlock = () => (
  additionalInfo && (
    <p className={`${descriptionSizeClass} ${theme === 'dark' ? 'text-[#FFFFFF80]' : 'text-[#094A5480]'} mb-5`}>
      {additionalInfo}
    </p>
  )
);
  
  // Блок с иконкой
  const IconBlock = () => (
    icon && (
      <div className={getIconPositionClass()} style={styles.icon}>
      {React.isValidElement(icon) ? 
  React.cloneElement(icon as React.ReactElement<any>, {
    className: `${(icon as React.ReactElement<any>).props.className || ''} ${isHovered ? 'text-white' : `text-${iconColorLight} dark:text-${iconColorDark}`}`
  }) : icon
}
      </div>
    )
  );
  
  // Блок с подзаголовком
  const SubtitleBlock = () => (
    subtitle && (
      <h4 className={`font-medium ${descriptionSizeClass} mb-2 ${titleColor}`}>{subtitle}</h4>
    )
  );

  // Содержимое карточки
  const CardContent = () => (
    <div className="flex flex-col h-full">
      {/* Круглый элемент в правом верхнем углу */}
      <div 
        className={`absolute top-4 right-4 w-5 h-5 rounded-full transition-colors duration-300 ${
          isHovered 
            ? 'bg-white' 
            : theme === 'light' ? 'bg-[#F7F7F7]' : 'bg-[#11363C]'
        }`}
      ></div>
      
      {/* Бейдж если есть */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          {typeof badge === 'string' ? (
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-light-accent text-white">
              {badge}
            </span>
          ) : badge}
        </div>
      )}
      
      {/* Заголовок */}
      <div className="flex flex-col flex-grow">
        <h3 className={`${titleSizeClass} font-medium mb-2 ${titleColor}`} style={styles.title}>{title}</h3>
        
        {/* Специфичная структура для каждого варианта */}
        {variant === 'analysis' ? (
          // Для анализов: заголовок → иконка → подзаголовок → описание
          <>
            <IconBlock />
            <SubtitleBlock />
            <DescriptionBlock />
            <AdditionalInfoBlock />
          </>
        ) : variant === 'service' ? (
          // Для услуг: заголовок → описание → доп.инфо (количество услуг) → иконка
          <>
            <DescriptionBlock />
            <AdditionalInfoBlock />
            <IconBlock />
            {/* Кнопка будет добавлена внизу карточки */}
          </>
        ) : descriptionBeforeIcon ? (
          // Стандартный режим с описанием перед иконкой
          <>
            <DescriptionBlock />
            <AdditionalInfoBlock />
            <SubtitleBlock />
            <IconBlock />
          </>
        ) : (
          // Стандартный режим с иконкой перед описанием
          <>
            <AdditionalInfoBlock />
            <IconBlock />
            <SubtitleBlock />
            <DescriptionBlock />
          </>
        )}
      </div>
      
      {/* Кнопка внизу карточки */}
      {showButton && (variant === 'service' || buttonText) && (
        <button 
          className={`mt-auto px-6 py-5 ${isHovered ? 'bg-white text-light-accent' : 'bg-light-accent text-white'} rounded-xl text-[18px] transition-colors w-full`}
          style={styles.button}
        >
          {buttonText}
        </button>
      )}

      {/* CSS для маркеров списка */}
      <style jsx global>{`
        .marker-accent li::marker {
          color: #00c78b;
          transition: color 0.3s ease;
        }
        
        ${isHovered ? `
        .marker-accent li::marker {
          color: #ffffff;
        }
        ` : ''}
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );

  // Обертка в Link если есть ссылка
  if (link) {
    return (
      <Link href={link} className='h-full min-h-[375px] md:min-h-[400px] w-full'>
        <div 
          className={cardClasses}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={styles.container}
        >
          <CardContent />
        </div>
      </Link>
    );
  }

  // Обычная карточка
  return (
    <div 
      className={cardClasses} 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={styles.container}
    >
      <CardContent />
    </div>
  );
};