'use client';

import React from 'react';
import { useThemeStore } from '../../store/theme';
import { useTranslation } from '../../hooks/useTranslation';

const localization = {
  ru: {
    dark: 'Темная тема',
    light: 'Светлая тема',
    toggle: 'Переключить тему'
  },
  uz: { // Изменено с 'en' на 'uz'
    dark: 'Dark theme',
    light: 'Light theme',
    toggle: 'Toggle theme'
  }
};

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { t } = useTranslation(localization);

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md bg-light-accent dark:bg-dark-accent text-white"
      aria-label={t('toggle')}
    >
      {theme === 'light' ? t('dark') : t('light')}
    </button>
  );
};