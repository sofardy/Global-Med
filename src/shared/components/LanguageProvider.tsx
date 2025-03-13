'use client';

import { ReactNode, useEffect } from 'react';
import { useLanguageStore } from '../../store/language';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { setLocale } = useLanguageStore();
  
  useEffect(() => {
    const storedValue = localStorage.getItem('language-storage');
    if (storedValue) {
      try {
        const { state } = JSON.parse(storedValue);
        if (state && state.currentLocale) {
          setLocale(state.currentLocale);
        }
      } catch (e) {
        console.error('Failed to parse stored language state', e);
      }
    }
  }, [setLocale]);

  return <>{children}</>;
};