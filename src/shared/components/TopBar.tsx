'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeStore } from '../../store/theme';
import { useLanguageStore } from '../../store/language';

interface Route {
  path: string;
  label: {
    ru: string;
    en: string;
  };
}

interface HeaderProps {
  routes: Route[];
}

export const TopBar: React.FC<HeaderProps> = ({ routes }) => {
  const { theme } = useThemeStore();
  const { currentLocale, setLocale } = useLanguageStore();
  const pathname = usePathname();
  
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  
  // Доступные языки
  const languages = [
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' }
  ];
  
  // Обработка клика вне меню языков
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Переключение языка
  const handleLanguageChange = (locale: 'ru' | 'en') => {
    setLocale(locale);
    setIsLangMenuOpen(false);
  };
  
  // Переключение мобильного меню
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className={`sticky top-0 z-50 ${theme === 'light' ? 'bg-white' : 'bg-dark-bg'} shadow-sm transition-colors duration-300`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Лого */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 mr-2 bg-light-accent rounded-full flex items-center justify-center">
              {/* Место для лого */}
            </div>
            <div className={`font-bold text-xl md:text-2xl ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}>
              <span>Global</span>
              <div className="text-xs font-normal">medical center</div>
            </div>
          </div>
          
          {/* Навигация для десктопа */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4">
            {routes.map((route) => (
              <Link 
                href={route.path} 
                key={route.path}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
                  ${pathname === route.path 
                    ? 'bg-light-bg text-light-text dark:bg-dark-block dark:text-dark-text' 
                    : 'text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-block/70'}
                `}
              >
                {currentLocale === 'ru' ? route.label.ru : route.label.en}
              </Link>
            ))}
          </nav>
          
          {/* Правая часть шапки для десктопа */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Кнопка 24/7 */}
            <div className={`flex items-center bg-light-accent text-white px-4 py-2 rounded-full`}>
              <span className="flex items-center justify-center w-6 h-6 mr-2 rounded-full">
                {/* Место для иконки 24 часа */}
                <span className="text-xs">24</span>
              </span>
              <span className="hidden lg:inline-block">Связаться с нами</span>
              <span className="hidden md:inline-block lg:hidden">+998 (71) 200-55-50</span>
            </div>
            
            {/* Выбор языка */}
            <div className="relative" ref={langMenuRef}>
              <button
                className={`flex items-center px-3 py-2 border rounded-md
                  ${theme === 'light'
                    ? 'border-gray-300 hover:bg-gray-100' 
                    : 'border-dark-block hover:bg-dark-block/70'
                  } transition-colors duration-300`}
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              >
                <span className={`${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}>{currentLocale.toUpperCase()}</span>
                <svg className={`ml-2 h-4 w-4 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Выпадающее меню языков */}
              {isLangMenuOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10
                  ${theme === 'light' ? 'bg-white' : 'bg-dark-block'}`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`block w-full text-left px-4 py-2 text-sm
                        ${theme === 'light' 
                          ? 'text-light-text hover:bg-gray-100' 
                          : 'text-dark-text hover:bg-dark-bg'
                        } ${currentLocale === lang.code ? 'font-semibold' : 'font-normal'}`}
                      onClick={() => handleLanguageChange(lang.code as 'ru' | 'en')}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Иконка пользователя */}
            <button className={`p-2 rounded-full ${theme === 'light' ? 'bg-light-accent' : 'bg-light-accent'} text-white`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
          
          {/* Мобильное меню иконка */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Кнопка 24/7 для мобильных устройств */}
            <button className={`bg-light-accent text-white p-2 rounded-full`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            
            {/* Языковой переключатель для мобильных устройств */}
            <button 
              className={`px-2 py-1 border rounded-md
                ${theme === 'light'
                  ? 'border-gray-300 hover:bg-gray-100' 
                  : 'border-dark-block hover:bg-dark-block/70'
                } transition-colors duration-300`}
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <span className={`${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}>
                {currentLocale.toUpperCase()}
              </span>
            </button>
            
            {/* Бургер меню */}
            <button 
              className="text-light-text dark:text-dark-text"
              onClick={toggleMobileMenu}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <nav className={`md:hidden py-3 px-4 ${theme === 'light' ? 'bg-white' : 'bg-dark-bg'}`}>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link 
                href={route.path} 
                key={route.path}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${pathname === route.path 
                    ? 'bg-light-bg text-light-text dark:bg-dark-block dark:text-dark-text' 
                    : 'text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-block/70'}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentLocale === 'ru' ? route.label.ru : route.label.en}
              </Link>
            ))}
            
            {/* Профиль для мобильных устройств */}
            <div className="pt-4 pb-2 border-t border-gray-200 dark:border-dark-block">
              <div className="flex items-center">
                <div className="ml-3">
                  <button className="text-light-text dark:text-dark-text font-medium">
                    Войти / Регистрация
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      {/* Языковое меню для мобильных устройств */}
      {isLangMenuOpen && (
        <div className="md:hidden absolute right-4 top-16 w-48 rounded-md shadow-lg z-10">
          <div className={`py-1 rounded-md ${theme === 'light' ? 'bg-white' : 'bg-dark-block'}`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`block w-full text-left px-4 py-2 text-sm
                  ${theme === 'light' 
                    ? 'text-light-text hover:bg-gray-100' 
                    : 'text-dark-text hover:bg-dark-bg'
                  } ${currentLocale === lang.code ? 'font-semibold' : 'font-normal'}`}
                onClick={() => handleLanguageChange(lang.code as 'ru' | 'en')}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};