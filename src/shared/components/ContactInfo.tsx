'use client';

import React from 'react';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useThemeStore } from '@/src/store/theme';
import { TelegramIcon, InstagramIcon, WhatsapppIcon, FacebookIcon } from '../ui/Icon';

type LocaleMessages = {
 ru: {
   phone: string;
   emergencyHelp: string;
   address: string;
   socialNetworks: string;
   contactAddress: string;
 };
 uz: {
   phone: string;
   emergencyHelp: string;
   address: string;
   socialNetworks: string;
   contactAddress: string;
 };
};

type SocialNetwork = {
 id: string;
 url: string;
 icon: React.FC<{ size?: number; className?: string }>;
};

interface ContactCardProps {
 title: string;
 children: React.ReactNode;
 className?: string;
 showCircle?: boolean;
 bgColor?: string;
}

const translations: LocaleMessages = {
 ru: {
   phone: 'Телефон',
   emergencyHelp: 'Скорая помощь',
   address: 'Адрес',
   socialNetworks: 'Социальные сети и мессенджеры',
   contactAddress: 'Ташкент, улица Янги Сергели, дом 35'
 },
 uz: {
   phone: 'Telefon',
   emergencyHelp: 'Tez yordam',
   address: 'Manzil',
   socialNetworks: 'Ijtimoiy tarmoqlar va messenjerlar',
   contactAddress: 'Toshkent, Yangi Sergeli ko\'chasi, 35-uy'
 }
};

const socialNetworks: SocialNetwork[] = [
 {
   id: 'telegram',
   url: 'https://t.me/globalmed',
   icon: TelegramIcon
 },
 {
   id: 'instagram',
   url: 'https://www.instagram.com/globalmed',
   icon: InstagramIcon
 },
 {
   id: 'whatsapp',
   url: 'https://wa.me/998712005550',
   icon: WhatsapppIcon
 },
 {
   id: 'facebook',
   url: 'https://www.facebook.com/globalmed',
   icon: FacebookIcon
 }
];

const ContactCard: React.FC<ContactCardProps> = ({ 
 title, 
 children, 
 className = '', 
 showCircle = false, 
 bgColor = 'bg-white dark:bg-dark-block',
}) => {
 return (
   <div className={`${bgColor} group hover:bg-[#00c78b] dark:hover:bg-[#00c78b] text-[#173F46] dark:text-white transition-colors duration-300 rounded-2xl p-5 sm:p-6 md:p-8 relative overflow-hidden ${className}`}>
     {showCircle && (
       <div className="absolute right-4 sm:right-6 md:right-8 top-4 sm:top-6 md:top-8 w-3 h-3 sm:w-4 sm:h-4 bg-[#F7F7F7] dark:bg-[#11363C] rounded-full group-hover:bg-white"></div>
     )}
     <h3 className="text-[#173F46] dark:text-white group-hover:text-white text-base sm:text-lg mb-2 sm:mb-3 md:mb-4">
       {title}
     </h3>
     <div className="group-hover:text-white">
       {children}
     </div>
   </div>
 );
};

export const ContactInfo: React.FC = () => {
 const { t } = useTranslation<LocaleMessages>(translations);
 const { theme } = useThemeStore();

 return (
   <div className="w-full flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 mt-10 sm:mt-16 md:mt-20">
     <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-5 md:gap-6">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
         <ContactCard 
           title={t('phone')} 
           showCircle={true}
         >
           <a 
             href="tel:+998712005550" 
             className="block text-xl sm:text-2xl md:text-3xl font-medium text-[#173F46] dark:text-white group-hover:text-white"
           >
             +998 (71) 200-55-50
           </a>
         </ContactCard>
         
         <ContactCard 
           title={t('emergencyHelp')} 
           showCircle={true}
         >
           <div className="emergency-wrapper relative inline-block">
             <div className="emergency-fog"></div>
             <a 
               href="tel:1142" 
               className="relative block text-2xl sm:text-3xl md:text-4xl font-medium text-red-500 dark:text-red-500 z-10"
             >
               1142
             </a>
           </div>
         </ContactCard>
       </div>
       
       <ContactCard title={t('address')}>
         <p className="text-xl sm:text-2xl md:text-3xl font-medium text-[#173F46] dark:text-white group-hover:text-white">
           {t('contactAddress')}
         </p>
       </ContactCard>
       
       <ContactCard title={t('socialNetworks')}>
         <div className="flex flex-wrap gap-3 sm:gap-4">
           {socialNetworks.map((network) => (
             <a 
               key={network.id}
               href={network.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${
                 theme === 'light' 
                   ? 'bg-[#174F4B] hover:bg-[#0e3e3a] text-white' 
                   : 'bg-white hover:bg-gray-100 text-[#174F4B]'
               } group-hover:bg-white group-hover:text-[#00c78b]`}
             >
               <network.icon size={18} className="sm:hidden" />
               <network.icon size={20} className="hidden sm:block md:hidden" />
               <network.icon size={24} className="hidden md:block" />
             </a>
           ))}
         </div>
       </ContactCard>
     </div>
     
     <div className="w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-auto rounded-xl overflow-hidden mt-4 md:mt-0">
       <iframe 
         src="https://yandex.ru/map-widget/v1/?um=constructor%3A814dab4e89ae7688d50b426c78f5575bb00ad1682f17d1620045ba50c37f5691&amp;source=constructor"
         width="100%" 
         height="100%" 
         frameBorder="0"
         title="Глобал Медикал центр"
         className="w-full h-full"
         allow="geolocation"
         loading="lazy"
       />
     </div>
     
     <style jsx global>{`
   .emergency-fog {
 position: absolute;
 top: 50%;
 left: 50%;
 width: 180%;
 height: 180%;
 transform: translate(-50%, -50%);
 background: radial-gradient(ellipse, rgba(255, 80, 80, 0.6) 0%, rgba(255, 80, 80, 0.4) 30%, rgba(255, 80, 80, 0) 70%);
 border-radius: 50%;
 filter: blur(10px);
 pointer-events: none;
 z-index: 0;
 animation: fog-pulse 3s infinite ease-in-out;
}

@keyframes fog-pulse {
 0% {
   opacity: 0.7;
   filter: blur(10px);
   transform: translate(-50%, -50%) scale(1);
 }
 50% {
   opacity: 0.1; /* Much lower opacity to make it almost disappear */
   filter: blur(8px);
   transform: translate(-50%, -50%) scale(0.8); /* Smaller scale */
 }
 100% {
   opacity: 0.7;
   filter: blur(10px);
   transform: translate(-50%, -50%) scale(1);
 }
}

.group:hover .emergency-fog {
 background: radial-gradient(ellipse, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0) 70%);
}
     `}</style>
   </div>
 );
};