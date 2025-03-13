'use client';

import { ThemeToggle } from '../shared/components/ThemeToggle';
import { LocaleToggle } from '../shared/components/LocaleToggle';
import { useTranslation } from '../hooks/useTranslation';

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
  uz: { // Изменено с 'en' на 'uz'
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
  const { t } = useTranslation(localization);

  return (
    <main className="container py-10">
      <div className="flex justify-end space-x-4 mb-8">
        <ThemeToggle />
        <LocaleToggle />
      </div>
      
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        
        <h2 className="text-xl font-semibold mb-2">{t('features.title')}</h2>
        <ul className="list-disc pl-5">
          <li>{t('features.darkMode')}</li>
          <li>{t('features.i18n')}</li>
          <li>{t('features.zustand')}</li>
        </ul>
      </div>
    </main>
  );
}