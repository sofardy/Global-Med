'use client';

import { ThemeToggle } from '../shared/components/ThemeToggle';
import { LocaleToggle } from '../shared/components/LocaleToggle';
import { useTranslation } from '../hooks/useTranslation';
import { HeroBanner } from '../shared/components/HeroBanner/HeroBanner';

const localization = {
  ru: {
    title: 'Добро пожаловать',
    description: 'Это шаблон проекта Next.js с поддержкой тем и переводов',
    features: {
      title: 'Возможности',
      darkMode: 'Темная тема',
      i18n: 'Мультиязычность',
      zustand: 'Управление состоянием с Zustand'
    }
  },
  uz: {
    title: 'Welcome',
    description: 'This is a Next.js project template with theme and translation support',
    features: {
      title: 'Features',
      darkMode: 'Dark Mode',
      i18n: 'Internationalization',
      zustand: 'State management with Zustand'
    }
  }
};

export default function Home() {
  return (
    <main>
         <HeroBanner />
        <ThemeToggle />
        <LocaleToggle />
    </main>
  );
}