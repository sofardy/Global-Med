'use client';

import React, { useEffect } from 'react';
import { useThemeStore } from '@/src/store/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { setTheme } = useThemeStore();

  // Функция для определения системной темы
  const detectSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light'; // Значение по умолчанию для SSR
  };

  useEffect(() => {
    // Определяем системную тему устройства
    const systemTheme = detectSystemTheme();
    // Устанавливаем тему на основе системных настроек
    setTheme(systemTheme);

    // Добавляем слушатель изменения системной темы
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    // Поддержка разных API браузеров
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if ('addListener' in mediaQuery) {
      // @ts-ignore - для поддержки старых браузеров
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if ('removeListener' in mediaQuery) {
        // @ts-ignore - для поддержки старых браузеров
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [setTheme]);

  // Получаем текущую тему из хранилища и применяем к HTML
  const { theme } = useThemeStore();
  
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}