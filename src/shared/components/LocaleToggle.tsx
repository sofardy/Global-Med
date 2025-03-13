'use client';

import React from 'react';
import { useLanguageStore } from '../../store/language';
import { useTranslation } from '../../hooks/useTranslation';

const localization = {
  ru: {
    changeTo: 'O\'zbekcha',
    toggle: 'Сменить язык'
  },
  uz: { // Изменено с 'en' на 'uz'
    changeTo: 'Русский',
    toggle: 'Tilni o\'zgartirish'
  }
};

export const LocaleToggle: React.FC = () => {
  const { toggleLocale } = useLanguageStore();
  const { t } = useTranslation(localization);

  return (
    <button
      onClick={toggleLocale}
      className="px-4 py-2 rounded-md bg-light-accent dark:bg-dark-accent text-white"
      aria-label={t('toggle')}
    >
      {t('changeTo')}
    </button>
  );
};