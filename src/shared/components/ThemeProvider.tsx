'use client';

import { ReactNode, useEffect } from 'react';
import { useThemeStore } from '../../store/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useThemeStore();
  
  useEffect(() => {
    // Remove the current theme class
    document.documentElement.classList.remove('light', 'dark');
    // Add the new theme class
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};