'use client';

import React from 'react';
import Link from 'next/link';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { translations } from './translations';
import { CONTACT_INFO } from '@/src/shared/constants/contact';
import { TelegramIcon, InstagramIcon, WhatsapppIcon, FacebookIcon } from '../../ui/Icon';

// Types for translation items
interface LinkItem {
  title: string;
  link: string;
}

// Компонент ссылки футера
const FooterLink: React.FC<{
  href: string;
  className?: string;
  children: React.ReactNode;
  isExternal?: boolean;
}> = ({ href, className = '', children, isExternal = false }) => {
  const { theme } = useThemeStore();
  const textColorMuted = theme === 'dark' ? 'text-white/60' : 'text-light-text/60';
  const hoverColor = 'hover:text-light-accent';
  
  const props = isExternal ? { 
    target: "_blank", 
    rel: "noopener noreferrer" 
  } : {};
  
  return (
    <Link 
      href={href} 
      className={`${textColorMuted} ${hoverColor} transition-colors ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

// Компонент внешней ссылки
const ExternalLink: React.FC<{
  href: string;
  className?: string;
  children: React.ReactNode;
}> = ({ href, className = '', children }) => {
  const { theme } = useThemeStore();
  const textColorMuted = theme === 'dark' ? 'text-white/60' : 'text-light-text/60';
  const hoverColor = 'hover:text-light-accent';
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`${textColorMuted} ${hoverColor} transition-colors ${className}`}
    >
      {children}
    </a>
  );
};

// Тип для иконки социальной сети
interface SocialIconProps {
  href: string;
  icon: React.FC<{ size: number; color: string; className?: string }>;
  label: string;
}

// Компонент иконки социальной сети с адаптивностью
const SocialIcon: React.FC<SocialIconProps> = ({ href, icon: Icon, label }) => {
  const { theme } = useThemeStore();
  
  // Динамические стили в зависимости от темы
  const iconBgColorClasses = theme === 'light' 
    ? 'bg-[#174F4B] hover:bg-[#0e3e3a]' 
    : 'bg-white hover:bg-gray-100';
  
  // Цвет иконки зависит от темы
  const iconColor = theme === 'light' ? 'white' : '#174F4B';
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${iconBgColorClasses}`}
      aria-label={label}
    >
      <Icon size={18} color={iconColor} className="sm:hidden" />
      <Icon size={20} color={iconColor} className="hidden sm:block md:hidden" />
      <Icon size={24} color={iconColor} className="hidden md:block" />
    </a>
  );
};

// Компонент заголовка секции
const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  const { theme } = useThemeStore();
  const textColor = theme === 'dark' ? 'text-white' : 'text-light-text';
  
  return (
    <h3 className={`${textColor} text-xl font-medium mb-6 ${className}`}>
      {children}
    </h3>
  );
};

// Компонент "Смотреть все"
const ViewAllLink: React.FC<{ href: string; children: React.ReactNode }> = ({ 
  href, 
  children 
}) => {
  const { theme } = useThemeStore();
  const textColor = theme === 'dark' ? 'text-white' : 'text-light-text';
  
  return (
    <Link 
      href={href} 
      className={`${textColor} hover:underline font-medium`}
    >
      {children}
    </Link>
  );
};

// Тип для социальной сети
interface SocialNetwork {
  id: string;
  url: string;
  icon: React.FC<{ size: number; color: string; className?: string }>;
  label: string;
}

export const Footer: React.FC = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  
  const bgColor = theme === 'dark' ? 'bg-dark-block' : 'bg-white';
  const textColorMuted = theme === 'dark' ? 'text-white/60' : 'text-light-text/60';
  
  // Данные для социальных сетей
  const socialNetworks: SocialNetwork[] = [
    { id: 'telegram', url: 'https://t.me/globalmedcenter', icon: TelegramIcon, label: 'Telegram' },
    { id: 'instagram', url: 'https://instagram.com/globalmedcenter', icon: InstagramIcon, label: 'Instagram' },
    { id: 'whatsapp', url: 'https://wa.me/+998712005550', icon: WhatsapppIcon, label: 'WhatsApp' },
    { id: 'facebook', url: 'https://facebook.com/globalmedcenter', icon: FacebookIcon, label: 'Facebook' }
  ];
  
  // Получаем типизированные массивы для каждой секции
  const serviceLinks = t('serviceLinks', { returnObjects: true }) as LinkItem[];
  const checkupLinks = t('checkupLinks', { returnObjects: true }) as LinkItem[];
  const analysisLinks = t('analysisLinks', { returnObjects: true }) as LinkItem[];
  const navigationLinks = t('navigationLinks', { returnObjects: true }) as LinkItem[];
  
  return (
    <footer className="mt-40">
      {/* Main footer content */}
      <div className={`rounded-2xl p-8 md:p-10 ${bgColor}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Services column */}
          <div>
            <SectionTitle>{t('sections.services')}</SectionTitle>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.link}>
                  <FooterLink href={item.link}>
                    {item.title}
                  </FooterLink>
                </li>
              ))}
              <li className="pt-2">
                <ViewAllLink href="/services">
                  {t('viewAll.services')}
                </ViewAllLink>
              </li>
            </ul>
          </div>

          {/* Checkups column */}
          <div>
            <SectionTitle>{t('sections.checkups')}</SectionTitle>
            <ul className="space-y-3">
              {checkupLinks.map((item) => (
                <li key={item.link}>
                  <FooterLink href={item.link}>
                    {item.title}
                  </FooterLink>
                </li>
              ))}
              <li className="pt-2">
                <ViewAllLink href="/checkups">
                  {t('viewAll.checkups')}
                </ViewAllLink>
              </li>
            </ul>
            
            <SectionTitle className="mt-8">{t('sections.analyses')}</SectionTitle>
            <ul className="space-y-3">
              {analysisLinks.map((item) => (
                <li key={item.link}>
                  <FooterLink href={item.link}>
                    {item.title}
                  </FooterLink>
                </li>
              ))}
              <li className="pt-2">
                <ViewAllLink href="/analysis">
                  {t('viewAll.analyses')}
                </ViewAllLink>
              </li>
            </ul>
          </div>

          {/* Navigation column */}
          <div>
            <SectionTitle>{t('sections.navigation')}</SectionTitle>
            <ul className="space-y-3">
              {navigationLinks.map((item) => (
                <li key={item.link}>
                  <FooterLink href={item.link}>
                    {item.title}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts and Address column */}
          <div>
            <SectionTitle>{t('sections.contacts')}</SectionTitle>
            <ul className="space-y-4 mb-8">
              <li>
                <ExternalLink href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={`tel:${CONTACT_INFO.phone.replace(/[\s()-]/g, '')}`}>
                  {CONTACT_INFO.phone}
                </ExternalLink>
              </li>
              <li className={textColorMuted}>
                {t('emergency')}: <ExternalLink href="tel:1142">
                  1142
                </ExternalLink>
              </li>
              <li className={textColorMuted}>
                {t('telegramBot')}: <ExternalLink href="https://t.me/globalmed_bot">
                  @globalmed_bot
                </ExternalLink>
              </li>
            </ul>

            <SectionTitle className="mb-4">{t('sections.address')}</SectionTitle>
            <p className={`${textColorMuted} mb-6`}>
              {t('address')}
            </p>

            {/* Social media icons */}
            <div className="flex gap-4">
              {socialNetworks.map(network => (
                <SocialIcon 
                  key={network.id}
                  href={network.url}
                  icon={network.icon}
                  label={network.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className={`p-6 md:p-8 rounded-2xl mt-4 ${bgColor}`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className={`${textColorMuted} text-sm mb-4 md:mb-0`}>
            2025 © Global Medical Center
          </div>
          
          <FooterLink 
            href="/privacy-policy" 
            className="text-sm mb-4 md:mb-0"
          >
            {t('privacyPolicy')}
          </FooterLink>
          
          <div className={`${textColorMuted} text-sm`}>
            {t('designedBy')} <ExternalLink href="https://kelyanmedia.com">
              KelyanMedia
            </ExternalLink>
          </div>
        </div>
      </div>
    </footer>
  );
};