'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface BreadcrumbsProps {
  /**
   * Опциональный класс для контейнера
   */
  className?: string;
  
  /**
   * Кастомные наименования путей (для переопределения автоматически созданных)
   * Ключ - путь, значение - наименование
   * Пример: { '/services': 'Услуги', '/services/checkups': 'Чекапы' }
   */
  pathNames?: Record<string, string>;
  
  /**
   * Иконка разделителя (по умолчанию - ChevronRightIcon)
   */
  separator?: React.ReactNode;
  
  /**
   * Опционально: не отображать домашнюю страницу
   */
  hideHome?: boolean;
  
  /**
   * Опционально: не отображать текущую страницу
   */
  hideCurrent?: boolean;
}

/**
 * Компонент для отображения хлебных крошек (breadcrumbs) на основе текущего пути.
 * Не отображается на главной странице.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className = '',
  pathNames = {},
  separator = <ChevronRightIcon className="h-4 w-4 text-gray-400" />,
  hideHome = false,
  hideCurrent = false,
}) => {
  const pathname = usePathname();
  
  // Не отображаем компонент на главной странице
  if (pathname === '/' || pathname === '') {
    return null;
  }
  
  // Формируем пути и их наименования
  const getPathSegments = () => {
    const segments = pathname
      .split('/')
      .filter(Boolean)
      .map((segment, index, array) => {
        // Формируем полный путь для каждого сегмента
        const path = '/' + array.slice(0, index + 1).join('/');
        
        // Получаем наименование пути: кастомное или преобразуем из URL
        let name = pathNames[path];
        
        // Если нет кастомного наименования, преобразуем из URL
        if (!name) {
          name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        }
        
        return { path, name };
      });
    
    // Добавляем домашнюю страницу в начало, если нужно
    if (!hideHome) {
      segments.unshift({ path: '/', name: pathNames['/'] || 'Главная' });
    }
    
    // Удаляем последний (текущий) элемент, если нужно
    if (hideCurrent && segments.length > 0) {
      segments.pop();
    }
    
    return segments;
  };
  
  const pathSegments = getPathSegments();
  
  // Если нет сегментов, не отображаем компонент
  if (pathSegments.length === 0) return null;
  
  return (
    <nav aria-label="Навигационная цепочка" className={`py-4 ${className}`}>
      <ol className="flex flex-wrap items-center mt-10 mb-10 space-x-2 text-gray-500 dark:text-gray-400">
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          
          return (
            <React.Fragment key={segment.path}>
              <li className="flex items-center">
                {isLast ? (
                  <span className="text-gray-900 dark:text-white">
                    {segment.name}
                  </span>
                ) : (
                  <Link 
                    href={segment.path}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {segment.name}
                  </Link>
                )}
              </li>
              
              {!isLast && (
                <li className="flex items-center" aria-hidden="true">
                  {separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;