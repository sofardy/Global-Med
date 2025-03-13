'use client';

import React from 'react';
import { useLanguageStore } from '../../store/language';
import { useTranslation } from '../../hooks/useTranslation';

const localization = {
  ru: {
    changeTo: 'English',
    toggle: 'Сменить язык'
  },
  en: {
    changeTo: 'Русский',
    toggle: 'Change language'
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