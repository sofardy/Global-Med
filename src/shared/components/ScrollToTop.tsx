'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Внутренний компонент для обработки прокрутки
 */
function ScrollToTopContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Прокрутка к верху страницы при изменении маршрута
    const scrollToTop = () => {
      // Пытаемся найти элемент хедера по его идентификатору
      const headerElement = document.getElementById('page-header');
      
      if (headerElement) {
        // Если нашли хедер, прокручиваем к нему
        headerElement.scrollIntoView({
          behavior: 'instant', // можно изменить на 'smooth' для плавной прокрутки
          block: 'start'
        });
      } else {
        // Если хедер не найден, просто прокручиваем в самый верх
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' // можно изменить на 'smooth' для плавной прокрутки
        });
      }
    };

    // Вызываем функцию прокрутки
    scrollToTop();
  }, [pathname, searchParams]);

  return null;
}

/**
 * Компонент для прокрутки страницы вверх при изменении маршрута
 * Обернут в Suspense для совместимости с Next.js 14
 */
export const ScrollToTop = () => {
  return (
    <Suspense fallback={null}>
      <ScrollToTopContent />
    </Suspense>
  );
};