'use client';

import { ReactNode, useEffect } from 'react';
import { useThemeStore } from '../../store/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme, resolvedTheme, setTheme } = useThemeStore();
  
  useEffect(() => {
    // Применяем тему
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
    
    // Слушаем изменения системных настроек
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setTheme('system'); // Обновит resolvedTheme
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, resolvedTheme, setTheme]);

  return <>{children}</>;
};