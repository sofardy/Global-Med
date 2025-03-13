'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeStore } from '../../../store/theme';
import { useLanguageStore } from '../../../store/language';
import { useTranslation } from '../../../hooks/useTranslation';
import { translations } from './translations';
import { CONTACT_INFO } from '../../constants/contact';

interface Route {
  path: string;
  translationKey: keyof typeof translations.ru.routes;
  hasSubmenu?: boolean;
}

interface HeaderProps {
  routes: Route[];
}

export const TopBar: React.FC<HeaderProps> = ({ routes }) => {
  const { theme } = useThemeStore();
  const { currentLocale, setLocale } = useLanguageStore();
  const { t } = useTranslation(translations);
  const pathname = usePathname();
  
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const [isMouseInSubmenu, setIsMouseInSubmenu] = useState(false);
  
  const langMenuRef = useRef<HTMLDivElement>(null);
  const contactMenuRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Доступные языки
  const languages = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' }
  ];
  
  // Обработка клика вне выпадающих меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target as Node)) {
        setIsContactMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
    };
  }, []);
  
  // Переключение языка
  const handleLanguageChange = (locale: 'ru' | 'uz') => {
    setLocale(locale);
    setIsLangMenuOpen(false);
  };
  
  // Переключение мобильного меню
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Обработка ховера для роутов
  const handleRouteHover = (routePath: string) => {
    // Очищаем предыдущий таймер если он есть
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    
    // Только для "О клинике"
    if (routes.find(r => r.path === routePath)?.hasSubmenu) {
      setHoveredRoute(routePath);
    }
  };
  
  // Обработка ухода с роута
  const handleRouteLeave = () => {
    // Не закрываем сразу, а устанавливаем таймер
    if (!isMouseInSubmenu && hoveredRoute) {
      submenuTimeoutRef.current = setTimeout(() => {
        if (!isMouseInSubmenu) {
          setHoveredRoute(null);
        }
      }, 1000); // 1 секунда задержки
    }
  };

  // Обработка входа мыши в подменю
  const handleSubmenuEnter = () => {
    setIsMouseInSubmenu(true);
    // Если есть активный таймер, очищаем его
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
  };

  // Обработка выхода мыши из подменю
  const handleSubmenuLeave = () => {
    setIsMouseInSubmenu(false);
    setHoveredRoute(null);
  };
  
  return (
    <header className={`sticky top-0 z-50 p-4  ${theme === 'light' ? 'bg-light-block' : 'bg-dark-block'} shadow-sm transition-colors duration-300 w-full`}>
      <div className="">
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
          <nav className="hidden md:flex space-x-6">
            {routes.map((route) => (
              <div 
                key={route.path}
                className="relative"
                onMouseEnter={() => handleRouteHover(route.path)}
                onMouseLeave={handleRouteLeave}
              >
                <Link 
                  href={route.path}
                  className={`
                    px-4 py-4 font-medium transition-colors duration-300 flex items-center
                    ${pathname === route.path 
                      ? 'bg-light-bg rounded-2xl' 
                      : `${theme === 'light' ? '' : ''}`}
                  `}
                >
                  {t(`routes.${route.translationKey}`)}
                  {route.hasSubmenu && (
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                
                {/* Выпадающее подменю только для "О клинике" */}
                {route.hasSubmenu && hoveredRoute === route.path && (
                  <div 
                    className={`absolute left-0 mt-1 w-60 rounded-md shadow-lg py-4 z-10 ${theme === 'light' ? 'bg-light-block' : 'bg-dark-block'}`}
                    ref={submenuRef}
                    onMouseEnter={handleSubmenuEnter}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    <Link 
                      href={`${route.path}/about-us`}
                      className={`block px-4 py-3 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}
                    >
                      {t('header.menuItems.aboutClinic')}
                    </Link>
                    <Link 
                      href={`${route.path}/doctors`}
                      className={`block px-4 py-3 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}
                    >
                      {t('header.menuItems.ourDoctors')}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          {/* Правая часть шапки для десктопа */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Кнопка связаться с нами */}
            <div className="relative" ref={contactMenuRef}>
              <button
                onClick={() => setIsContactMenuOpen(!isContactMenuOpen)}
                className={`flex items-center ${theme === 'light' ? 'bg-light-accent' : 'bg-light-accent'} text-white h-[60px] w-[250px] px-4 py-2 rounded-full`}
              >
                <span className="flex items-center justify-center w-6 h-6 mr-2 rounded-full">
                  {/* Место для иконки 24 часа */}
                  <span className="text-xs">24</span>
                </span>
                <span className="hidden lg:inline-block">
                  {t('header.contactUs')}
                </span>
                <span className="hidden md:inline-block lg:hidden">{CONTACT_INFO.phone}</span>
              </button>
              
              {/* Выпадающее меню для связи */}
              {isContactMenuOpen && (
                <div className={`absolute right-0 mt-2 w-[250px] h-[125px] rounded-md shadow-lg z-10 ${theme === 'light' ? 'bg-light-block' : 'bg-dark-block'}`}>
                  <a 
                    href={`tel:${CONTACT_INFO.phone.replace(/[\s()-]/g, '')}`}
                    className={`flex items-center px-4 py-3 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}
                  >
                    <div className="w-8 h-8 mr-4 rounded-full flex items-center justify-center bg-light-accent text-white">
                      {/* Место для иконки телефона */}
                    </div>
                    {CONTACT_INFO.phone}
                  </a>
                  <a 
                    href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[\s()-]/g, '')}`}
                    className={`flex items-center px-4 py-3 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}
                  >
                    <div className="w-8 h-8 mr-4 rounded-full flex items-center justify-center bg-light-accent text-white">
                      {/* Место для иконки WhatsApp */}
                    </div>
                    {CONTACT_INFO.whatsapp}
                  </a>
                </div>
              )}
            </div>
            
            {/* Выбор языка */}
            <div className="relative" ref={langMenuRef}>
              <button
                className={`flex items-center justify-center border h-[60px] w-[75px] rounded-md
                  ${theme === 'light'
                    ? 'border-gray-300' 
                    : 'border-dark-bg'
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
                <div className={`absolute right-0 mt-2 w-[84px] h-[84px] rounded-md shadow-lg z-10
                  ${theme === 'light' ? 'bg-light-block' : 'bg-dark-block'}`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`flex items-center w-full px-4 py-3 text-left
                        ${theme === 'light' 
                          ? 'text-light-text' 
                          : 'text-dark-text'
                        } ${currentLocale === lang.code ? 'font-semibold' : 'font-normal'}`}
                      onClick={() => handleLanguageChange(lang.code as 'ru' | 'uz')}
                    >
                      <div className="h-6 mr-2 flex items-center">
                        {/* Место для флага */}
                        {lang.code === 'uz' && <span className="text-sm">🇺🇿</span>}
                        {lang.code === 'ru' && <span className="text-sm">🇷🇺</span>}
                      </div>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Иконка пользователя */}
            <button className={`h-[60px] w-[60px] rounded-full ${theme === 'light' ? 'bg-light-accent' : 'bg-light-accent'} text-white flex items-center justify-center`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
          
          {/* Мобильное меню иконка */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Кнопка 24/7 для мобильных устройств */}
            <button 
              className={`${theme === 'light' ? 'bg-light-accent' : 'bg-light-accent'} text-white p-2 rounded-full`}
              onClick={() => setIsContactMenuOpen(!isContactMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            
            {/* Языковой переключатель для мобильных устройств */}
            <button 
              className={`px-2 py-1 border rounded-md
                ${theme === 'light'
                  ? 'border-gray-300' 
                  : 'border-dark-bg'
                } transition-colors duration-300`}
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <span className={`${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}>
                {currentLocale.toUpperCase()}
              </span>
            </button>
            
            {/* Бургер меню */}
            <button 
              className={`${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}
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
        <nav className={`md:hidden py-3 px-4 ${theme === 'light' ? 'bg-light-block' : 'bg-dark-block'}`}>
          <div className="space-y-1">
            {routes.map((route) => (
              <div key={route.path}>
                <button
                  className={`
                    flex justify-between items-center w-full px-4 py-4 text-base font-medium
                    ${pathname === route.path 
                      ? 'text-light-accent' 
                      : `${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}
                  `}
                  onClick={() => {
                    if (route.path === hoveredRoute) {
                      setHoveredRoute(null);
                    } else if (route.hasSubmenu) {
                      setHoveredRoute(route.path);
                    }
                  }}
                >
                  <span>{t(`routes.${route.translationKey}`)}</span>
                  {route.hasSubmenu && (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={hoveredRoute === route.path ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                  )}
                </button>
                
                {/* Подменю для мобильной версии */}
                {route.hasSubmenu && hoveredRoute === route.path && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link 
                      href={`${route.path}/about-us`}
                      className={`block px-4 py-3 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setHoveredRoute(null);
                      }}
                    >
                      {t('header.menuItems.aboutClinic')}
                    </Link>
                    <Link 
                      href={`${route.path}/doctors`}
                      className={`block px-4 py-3 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setHoveredRoute(null);
                      }}
                    >
                      {t('header.menuItems.ourDoctors')}
                    </Link>
                  </div>
                )}
              </div>
            ))}
            
            {/* Профиль для мобильных устройств */}
            <div className="pt-4 pb-2 border-t border-gray-200 dark:border-dark-bg">
              <div className="flex items-center">
                <div className="ml-3">
                  <button className={`${theme === 'light' ? 'text-light-text' : 'text-dark-text'} font-medium`}>
                    {t('header.login')}
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
          <div className={`py-1 rounded-md ${theme === 'light' ? 'bg-light-block' : 'bg-dark-block'}`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`flex items-center w-full px-4 py-3 text-left text-sm
                  ${theme === 'light' 
                    ? 'text-light-text' 
                    : 'text-dark-text'
                  } ${currentLocale === lang.code ? 'font-semibold' : 'font-normal'}`}
                onClick={() => handleLanguageChange(lang.code as 'ru' | 'uz')}
              >
                <div className="w-8 h-6 mr-2 flex items-center">
                  {/* Место для флага */}
                  {lang.code === 'uz' && <span className="text-sm">🇺🇿</span>}
                  {lang.code === 'ru' && <span className="text-sm">🇷🇺</span>}
                </div>
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Выпадающее меню для связи на мобильном */}
      {isContactMenuOpen && (
        <div className="md:hidden absolute right-4 top-16 w-56 rounded-md shadow-lg z-20">
          <div className={`py-1 rounded-md ${theme === 'light' ? 'bg-light-block' : 'bg-dark-block'}`}>
            <a 
              href={`tel:${CONTACT_INFO.phone.replace(/[\s()-]/g, '')}`}
              className={`flex items-center px-4 py-3 text-sm ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}
            >
              <div className="w-8 h-8 mr-4 rounded-full flex items-center justify-center bg-light-accent text-white">
                {/* Место для иконки телефона */}
              </div>
              {CONTACT_INFO.phone}
            </a>
            <a 
              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[\s()-]/g, '')}`}
              className={`flex items-center px-4 py-3 text-sm ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}
            >
              <div className="w-8 h-8 mr-4 rounded-full flex items-center justify-center bg-light-accent text-white">
                {/* Место для иконки WhatsApp */}
              </div>
              {CONTACT_INFO.whatsapp}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};