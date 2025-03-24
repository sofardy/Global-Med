'use client';

import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';

// Компонент, использующий клиентские хуки
function NavigationHandler() {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  
  // Сброс состояния навигации при изменении маршрута
  useEffect(() => {
    setIsNavigating(false);
    
    // Мягкий скролл к верху после завершения навигации
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, [pathname]);
  
  // Отслеживание начала навигации
  useEffect(() => {
    // Обработчик для начала навигации
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Проверяем, что это внутренняя ссылка
      if (target.tagName === 'A' || target.closest('a')) {
        const linkElement = target.tagName === 'A' ? target as HTMLAnchorElement : target.closest('a') as HTMLAnchorElement;
        
        if (linkElement && 
            linkElement.href && 
            linkElement.href.startsWith(window.location.origin) &&
            linkElement.href !== window.location.href) {
          setIsNavigating(true);
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    // Обработчик для отмены состояния загрузки после задержки
    const safetyTimeout = setTimeout(() => {
      if (isNavigating) {
        setIsNavigating(false);
      }
    }, 3000); // Максимальное время ожидания
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
      clearTimeout(safetyTimeout);
    };
  }, [isNavigating]);

  return (
    <>
      {isNavigating && (
        <div 
          className="fixed inset-0 bg-white/70 dark:bg-gray-900/70 z-50 flex items-center justify-center transition-opacity duration-300"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-light-accent border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent animate-pulse"></div>
          </div>
        </div>
      )}
    </>
  );
}

// Основной компонент с границей Suspense
export function PageTransition() {
  return (
    <Suspense fallback={null}>
      <NavigationHandler />
    </Suspense>
  );
}