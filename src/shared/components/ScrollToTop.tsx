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
      // Задержка для обеспечения корректной работы прокрутки
      // после полной загрузки страницы
      setTimeout(() => {
        // Пытаемся найти элемент хедера по его идентификатору
        const headerElement = document.getElementById('page-header');
        
        if (headerElement) {
          // Если нашли хедер, прокручиваем к нему
          headerElement.scrollIntoView({
            behavior: 'auto', // более надежный вариант вместо 'instant'
            block: 'start'
          });
        } else {
          // Если хедер не найден, принудительно прокручиваем в самый верх
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto' // более надежный вариант вместо 'instant'
          });
          
          // Дополнительная страховка - установка скролла напрямую
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0; // Для Safari
        }
      }, 100); // Небольшая задержка для более надежной работы
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