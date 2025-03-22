'use client';

import React, { useState, useEffect } from 'react';

interface AnimatedButtonProps {
  /**
   * Обработчик клика по кнопке
   */
  onClick: () => void;
  
  /**
   * Текст кнопки
   */
  children: React.ReactNode;
  
  /**
   * Дополнительные классы для кнопки
   */
  className?: string;
  
  /**
   * Цвет границы в светлой теме
   * @default 'white'
   */
  borderColor?: string;
  
  /**
   * Цвет текста при наведении в светлой теме
   * @default 'light-accent'
   */
  hoverTextColor?: string;
  
  /**
   * Фиксированная ширина кнопки
   * @example '320px' или 'w-full'
   */
  width?: string;
  
  /**
   * Тип кнопки
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Отключение кнопки
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Интенсивность пульсации
   * @default true
   */
  pulsation?: boolean;
}

/**
 * Анимированная кнопка с эффектами свечения и пульсации
 */
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onClick,
  children,
  className = '',
  borderColor = 'white',
  hoverTextColor = 'light-accent',
  width,
  type = 'button',
  disabled = false,
  pulsation = true,
}) => {
  // Для усиленной пульсации кнопки
  const [pulsePower, setPulsePower] = useState(1);
  
  // Динамические классы для ширины
  const widthClasses = width 
    ? width.startsWith('w-') ? width : `w-[${width}]` 
    : 'w-full sm:w-auto';
  
  // Эффект для пульсации кнопки с изменяющейся интенсивностью
  useEffect(() => {
    if (!pulsation) return;
    
    let power = 1;
    let increasing = true;
    
    const interval = setInterval(() => {
      if (power >= 1.8) increasing = false;
      if (power <= 1) increasing = true;
      
      power = increasing ? power + 0.05 : power - 0.05;
      setPulsePower(power);
    }, 500);
    
    return () => clearInterval(interval);
  }, [pulsation]);
  
  return (
    <button 
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        ${widthClasses}
        px-4 sm:px-6 md:px-10 lg:px-20 
        py-3 sm:py-4 
        border-2 border-${borderColor} 
        rounded-lg sm:rounded-xl 
        transition-all duration-300 
        relative overflow-hidden 
        group 
        hover:bg-${borderColor} 
        hover:text-${hoverTextColor} 
        hover:scale-105 
        active:scale-95
        hover:shadow-lg 
        hover:shadow-${borderColor}/30 
        focus:outline-none 
        text-xs sm:text-sm md:text-base
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Основной текст */}
      <span className="relative z-10 group-hover:font-bold">
        {children}
      </span>
      
      {/* Пульсирующий фон - переменная интенсивность */}
      {pulsation && (
        <span 
          className={`absolute inset-0 bg-${borderColor}/30 rounded-lg sm:rounded-xl opacity-100 group-hover:opacity-0`}
          style={{
            animation: `pulse ${pulsePower}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          }}
        />
      )}
      
      {/* Свечение вокруг кнопки */}
      <span 
        className={`absolute -inset-1 bg-${borderColor}/20 rounded-lg sm:rounded-xl blur-sm group-hover:bg-transparent`}
        style={{
          animation: pulsation ? `pulse ${pulsePower + 0.3}s cubic-bezier(0.4, 0, 0.6, 1) infinite` : 'none',
        }}
      />
      
      {/* Эффект движущихся бликов */}
      <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg sm:rounded-xl">
        <span 
          className={`absolute h-8 sm:h-12 md:h-20 w-8 sm:w-12 md:w-20 -top-4 sm:-top-6 md:-top-10 -left-4 sm:-left-6 md:-left-10 bg-${borderColor}/40 rounded-full blur-md transform rotate-45 group-hover:scale-150`}
          style={{ animation: 'moveHighlight1 6s infinite linear' }}
        />
        
        <span 
          className={`absolute h-6 sm:h-10 md:h-16 w-6 sm:w-10 md:w-16 -bottom-3 sm:-bottom-5 md:-bottom-8 -right-3 sm:-right-5 md:-right-8 bg-${borderColor}/30 rounded-full blur-md transform rotate-45 group-hover:scale-150`}
          style={{ animation: 'moveHighlight2 8s infinite linear' }}
        />
      </span>
      
      {/* Эффект при наведении - рябь по воде */}
      <span 
        className={`absolute inset-0 scale-0 rounded-lg sm:rounded-xl bg-${borderColor}/40 group-hover:animate-ripple`}
      />
    </button>
  );
};

// CSS для анимаций, который нужно добавить в глобальные стили
export const AnimatedButtonStyles = `
  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
  
  @keyframes moveHighlight1 {
    0% {
      transform: translateX(-100%) translateY(-20%) rotate(45deg);
    }
    100% {
      transform: translateX(200%) translateY(100%) rotate(45deg);
    }
  }
  
  @keyframes moveHighlight2 {
    0% {
      transform: translateX(200%) translateY(100%) rotate(45deg);
    }
    100% {
      transform: translateX(-100%) translateY(-20%) rotate(45deg);
    }
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

// Также создаем обертку для удобства использования
export const AnimatedButtonWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`flex justify-center sm:justify-end mt-6 md:mt-0 ${className}`}>
      {children}
    </div>
  );
};