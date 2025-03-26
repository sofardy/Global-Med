'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeStore } from '@/src/store/theme';
import { useLanguageStore } from '@/src/store/language';
import { useTranslation } from '@/src/hooks/useTranslation';

// Translations
const translations = {
 ru: {
   myAppointments: 'Мои записи',
   analyses: 'Анализы',
   profile: 'Профиль',
   doctors: 'Врачи',
   backToMainSite: 'Перейти на основной сайт',
   changeLanguage: 'Сменить язык',
   logout: 'Выйти из личного кабинета'
 },
 uz: {
   myAppointments: 'Mening yozuvlarim',
   analyses: 'Tahlillar',
   profile: 'Profil',
   doctors: 'Shifokorlar',
   backToMainSite: 'Asosiy saytga o\'tish',
   changeLanguage: 'Tilni o\'zgartirish',
   logout: 'Shaxsiy kabinetdan chiqish'
 }
};

export default function AccountSidebar() {
 const pathname = usePathname();
 const { theme } = useThemeStore();
 const { currentLocale, setLocale } = useLanguageStore();
 const { t } = useTranslation(translations);
 
 const [isLanguageOpen, setIsLanguageOpen] = useState(false);
 const languageRef = useRef<HTMLDivElement>(null);

 // Navigation items
 const navItems = [
   { path: '/account/appointments', label: 'myAppointments', icon: 'calendar' },
   { path: '/account/analyses', label: 'analyses', icon: 'lab' },
   { path: '/account/profile', label: 'profile', icon: 'user' },
   { path: '/account/doctors', label: 'doctors', icon: 'heartPulse' },
 ];

 // Close language dropdown when clicking outside
 useEffect(() => {
   function handleClickOutside(event: MouseEvent) {
     if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
       setIsLanguageOpen(false);
     }
   }
   
   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, []);

 // Toggle language dropdown
 const toggleLanguage = () => {
   setIsLanguageOpen(!isLanguageOpen);
 };

 // Change language
 const changeLanguage = (locale: 'ru' | 'uz') => {
   setLocale(locale);
   setIsLanguageOpen(false);
 };

 // isActive function to check if the current path matches the nav item
 const isActive = (path: string) => {
   return pathname === path;
 };

 // Render icon based on name
 const renderIcon = (iconName: string, isActiveItem: boolean) => {
   const iconColor = isActiveItem ? "#00c78b" : theme === 'light' ? "#094A54" : "#ffffff";
   
   switch (iconName) {
     case 'calendar':
       return (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={iconColor}>
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
         </svg>
       );
     case 'lab':
       return (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={iconColor}>
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
         </svg>
       );
     case 'user':
       return (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={iconColor}>
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
         </svg>
       );
     case 'heartPulse':
       return (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={iconColor}>
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
         </svg>
       );
     case 'web':
       return (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={iconColor}>
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
         </svg>
       );
     case 'globe':
       return (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke={iconColor}>
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
       );
     case 'logout':
       return (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#EF4444">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
         </svg>
       );
     default:
       return null;
   }
 };

 return (
   <aside className={`w-[375px] h-[534px] bg-white dark:bg-dark-block rounded-2xl shadow-sm p-10  ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}>
     {/* Navigation section */}
     <nav className="space-y-2">
       {navItems.map((item) => {
         const active = isActive(item.path);
         return (
           <Link
             key={item.path}
             href={item.path}
             className="flex items-center py-4 px-4 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
           >
             <div className="w-8 h-8 flex items-center justify-center">
               {renderIcon(item.icon, active)}
             </div>
             <span className={`ml-4 text-xl ${active ? 'text-light-accent font-medium' : ''}`}>
               {t(item.label)}
             </span>
           </Link>
         );
       })}
     </nav>
     
     {/* Divider */}
     <hr className="border-gray-200 dark:border-gray-700 my-6" />
     
     {/* Bottom links */}
     <div className="space-y-2">
       {/* Back to main site */}
       <Link
         href="/"
         className="flex items-center py-4 px-4 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
       >
         <div className="w-8 h-8 flex items-center justify-center">
           {renderIcon('web', false)}
         </div>
         <span className="ml-4 text-xl">{t('backToMainSite')}</span>
       </Link>
       
       {/* Language selector */}
       <div ref={languageRef} className="relative">
         <button
           onClick={toggleLanguage}
           className="flex items-center w-full py-4 px-4 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
         >
           <div className="w-8 h-8 flex items-center justify-center">
             {renderIcon('globe', false)}
           </div>
           <span className="ml-4 text-xl">{t('changeLanguage')}</span>
           <svg 
             width="24" 
             height="24" 
             viewBox="0 0 24 24" 
             fill="none"
             className={`ml-auto transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
           >
             <path d="M6 9L12 15L18 9" />
           </svg>
         </button>
         
         {isLanguageOpen && (
           <div className={`absolute left-0 right-0 mt-1 rounded-xl shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-dark-block'} border border-gray-200 dark:border-gray-700 overflow-hidden z-10`}>
             <button 
               onClick={() => changeLanguage('ru')}
               className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
             >
               <span className="w-6 h-4 mr-3 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                 <img src="/icon/icon-russia.svg" className="w-full h-full object-cover" alt="Русский" />
               </span>
               Русский
             </button>
             <button 
               onClick={() => changeLanguage('uz')}
               className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
             >
               <span className="w-6 h-4 mr-3 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                 <img src="/icon/icon-uzbekistan.svg" className="w-full h-full object-cover" alt="O'zbek" />
               </span>
               O'zbek
             </button>
           </div>
         )}
       </div>
       
       {/* Logout button */}
       <button 
         onClick={() => console.log('Logout')}
         className="flex items-center w-full py-4 px-4 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500"
       >
         <div className="w-6 h-6 flex items-center justify-center">
           {renderIcon('logout', false)}
         </div>
         <span className="ml-4 text-xl">{t('logout')}</span>
       </button>
     </div>
   </aside>
 );
}