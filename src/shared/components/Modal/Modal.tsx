import React, { useRef, useState, useEffect } from 'react';
import localization from './translation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/src/hooks/useTranslation';
// import { useThemeStore } from '@/src/store/theme';

// Типы для модальных окон
type ModalPosition = 'bottom' | 'center' | 'top';
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ModalTheme = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'brand';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  
  closeText?: string;
  showCloseButton?: boolean;
  showCloseIcon?: boolean;
  closeOnOverlayClick?: boolean;
  
  position?: ModalPosition;
  size?: ModalSize;
  theme?: ModalTheme;
  noPadding?: boolean;
  className?: string;
  backdropClassName?: string;
  contentClassName?: string;
  
  preventScroll?: boolean;
  draggable?: boolean;
  footer?: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  
  title,
  subtitle,
  titleClassName = '',
  subtitleClassName = '',
  
  closeText,
  showCloseButton = true,
  showCloseIcon = true,
  closeOnOverlayClick = true,
  
  position = 'center',
  size = 'md',
  theme = 'brand',
  noPadding = false,
  className = '',
  backdropClassName = '',
  contentClassName = '',
  
  preventScroll = true,
  draggable = true,
  footer
}: ModalProps) {
  const { t } = useTranslation(localization);
  // const { theme: appTheme } = useThemeStore();
  // const isDarkMode = appTheme === 'dark';
  
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Состояния для взаимодействия и дизайна
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const isBottomPosition = position === 'bottom';

  // Блокировка скролла при открытом модальном окне
  useEffect(() => {
    if (isOpen && preventScroll) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, preventScroll]);

  // Если модальное окно закрыто, не рендерим его
  if (!isOpen) return null;

  // Обработчики свайпа
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!draggable || !isBottomPosition) return;
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !draggable || !isBottomPosition) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0) {
      setCurrentY(deltaY);
    }
  };
  
  const handleTouchEnd = () => {
    if (!draggable || !isBottomPosition) return;
    if (currentY > 150) {
      onClose();
    }
    setCurrentY(0);
    setIsDragging(false);
  };

  // Обработка клика по оверлею
  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  // Классы для размеров
  const sizeClasses = {
    sm: isBottomPosition ? 'w-full' : 'max-w-sm',
    md: isBottomPosition ? 'w-full' : 'max-w-md',
    lg: isBottomPosition ? 'w-full' : 'max-w-lg',
    xl: isBottomPosition ? 'w-full' : 'max-w-xl',
    full: 'w-full max-w-full mx-0'
  };

  // Основные цвета проекта
  // Customize theme classes to use project colors
  const themeClasses = {
    brand: {
      title: 'text-light-text dark:text-dark-text',
      bg: 'bg-light-block dark:bg-dark-block',
      button: 'bg-light-accent hover:bg-light-accent/90 text-white',
      border: 'border border-gray-100 dark:border-gray-700'
    },
    primary: {
      title: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-white dark:bg-dark-block',
      button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white',
      border: 'border border-gray-200 dark:border-gray-700'
    },
    success: {
      title: 'text-green-600 dark:text-green-400',
      bg: 'bg-white dark:bg-dark-block',
      button: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white',
      border: 'border border-gray-200 dark:border-gray-700'
    },
    danger: {
      title: 'text-red-600 dark:text-red-400',
      bg: 'bg-white dark:bg-dark-block',
      button: 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white',
      border: 'border border-gray-200 dark:border-gray-700'
    },
    warning: {
      title: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-white dark:bg-dark-block',
      button: 'bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white',
      border: 'border border-gray-200 dark:border-gray-700'
    },
    info: {
      title: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-white dark:bg-dark-block',
      button: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white',
      border: 'border border-gray-200 dark:border-gray-700'
    },
    neutral: {
      title: 'text-light-text dark:text-dark-text',
      bg: 'bg-white dark:bg-dark-block',
      button: 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white',
      border: 'border border-gray-200 dark:border-gray-700'
    }
  };

  // Классы для позиционирования
  const positionClasses = {
    top: 'top-0 left-1/2 -translate-x-1/2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    bottom: 'bottom-0 left-0 right-0'
  };

  // Классы для скругления углов
  const roundedClasses = {
    top: 'rounded-b-2xl',
    center: 'rounded-2xl',
    bottom: 'rounded-t-2xl'
  };

  // Анимационные классы
  const animationClasses = {
    top: 'animate-slideDown',
    center: 'animate-fadeIn',
    bottom: 'animate-slideUp'
  };

  // Оптимизированный рендеринг для модального окна снизу
  if (isBottomPosition) {
    return (
      <div 
        className={`fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center ${backdropClassName}`}
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
      >
        {/* Контейнер для модалки снизу */}
        <div 
          ref={wrapperRef}
          className={`
            fixed bottom-0 left-0 right-0 
            ${animationClasses.bottom}
            w-full
            max-h-[90vh]
            flex flex-col
            ${themeClasses[theme].bg} 
            ${themeClasses[theme].border}
            ${roundedClasses.bottom}
            shadow-xl
            ${className}
          `}
          style={{
            transform: `translateY(${currentY}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            paddingBottom: 'env(safe-area-inset-bottom, 12px)'
          }}
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Ручка для перетаскивания */}
          {draggable && (
            <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mt-3 mb-1 cursor-grab active:cursor-grabbing" />
          )}
          
          {/* Содержимое с внутренним скроллом */}
          <div ref={modalRef} className="relative flex-1 overflow-hidden">
            {/* Заголовок - остается фиксированным сверху */}
            {(title || subtitle) && (
              <div className={`sticky top-0 z-10 ${themeClasses[theme].bg} py-3 px-4 ${showCloseIcon ? 'pr-12' : ''}`}>
                {title && (
                  <h3 className={`text-lg font-medium text-center ${themeClasses[theme].title} ${titleClassName}`}>
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className={`text-gray-500 dark:text-gray-400 text-sm text-center mt-1 ${subtitleClassName}`}>
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            
            {/* Кнопка закрытия - абсолютно позиционированная */}
            {showCloseIcon && (
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-20 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label={t('close')}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            )}
            
            {/* Скроллируемый контейнер для основного содержимого */}
            <div 
              ref={contentRef}
              className={`overflow-y-auto ${noPadding ? '' : 'p-4'} ${title ? 'pt-2' : ''} ${contentClassName}`}
              style={{
                maxHeight: 'calc(90vh - 60px)' // Учитываем предполагаемую высоту заголовка и футера
              }}
            >
              {children}
            </div>
          </div>
          
          {/* Футер - остается фиксированным снизу */}
          {(footer || showCloseButton) && (
            <div className={`px-4 py-3 ${themeClasses[theme].bg} border-t ${themeClasses[theme].border}`}>
              {footer}
              
              {/* Кнопка закрытия */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={`w-full ${themeClasses[theme].button} rounded-xl py-3 text-sm font-medium transition-colors ${!footer ? 'mt-0' : 'mt-3'}`}
                >
                  {closeText || t('close')}
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* CSS-анимации */}
        <style jsx global>{`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes slideDown {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          .animate-slideUp {
            animation: slideUp 0.3s ease-out forwards;
          }
          
          .animate-slideDown {
            animation: slideDown 0.3s ease-out forwards;
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  // Стандартный рендеринг для других позиций (top, center)
  return (
    <div 
      className={`fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center ${backdropClassName}`}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        ref={modalRef}
        className={`
          fixed ${positionClasses[position]}
          ${themeClasses[theme].bg} ${themeClasses[theme].border}
          ${roundedClasses[position]} ${sizeClasses[size]}
          ${noPadding ? '' : 'p-4'} 
          ${animationClasses[position]}
          overflow-y-auto
          shadow-xl
          ${className}
        `}
        onClick={e => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        {showCloseIcon && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            aria-label={t('close')}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}
        
        {/* Заголовок */}
        {(title || subtitle) && (
          <div className={`text-center ${showCloseIcon ? 'pr-8' : ''} mb-4`}>
            {title && (
              <h3 className={`text-lg font-medium ${themeClasses[theme].title} ${titleClassName}`}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className={`text-gray-500 dark:text-gray-400 text-sm mt-1 ${subtitleClassName}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Основное содержимое */}
        <div className={contentClassName}>
          {children}
        </div>
        
        {/* Футер */}
        {(footer || showCloseButton) && (
          <div className="mt-6">
            {footer}
            
            {/* Кнопка закрытия */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`w-full ${themeClasses[theme].button} rounded-xl py-3 text-sm font-medium transition-colors ${!footer ? 'mt-0' : 'mt-3'}`}
              >
                {closeText || t('close')}
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* CSS-анимации */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}