// src/shared/layout/Footer/Footer.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useThemeStore } from "@/src/store/theme";
import { useTranslation } from "@/src/hooks/useTranslation";
import { translations } from "./translations";
import { CONTACT_INFO } from "@/src/shared/constants/contact";
import {
  TelegramIcon,
  InstagramIcon,
  WhatsapppIcon,
  FacebookIcon,
} from "../../ui/Icon";
import MuscleIcon from "../../ui/Icon/MuscleIcon";
import axios from "axios";
import { API_BASE_URL } from "@/src/config/constants";
import { useLanguageStore } from "@/src/store/language";

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
}> = ({ href, className = "", children, isExternal = false }) => {
  const { theme } = useThemeStore();
  const textColorMuted =
    theme === "dark" ? "text-white/60" : "text-light-text/60";
  const hoverColor = "hover:text-light-accent";

  const props = isExternal
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Link
      href={href}
      className={`${textColorMuted} ${hoverColor} transition-colors text-lg ${className}`}
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
}> = ({ href, className = "", children }) => {
  const { theme } = useThemeStore();
  const textColorMuted =
    theme === "dark" ? "text-white/60" : "text-light-text/60";
  const hoverColor = "hover:text-light-accent";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${textColorMuted} ${hoverColor} transition-colors text-lg ${className}`}
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
  const iconBgColorClasses =
    theme === "light"
      ? "bg-[#174F4B] hover:bg-[#0e3e3a]"
      : "bg-white hover:bg-gray-100";

  // Цвет иконки зависит от темы
  const iconColor = theme === "light" ? "white" : "#174F4B";

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
const SectionTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const { theme } = useThemeStore();
  const textColor = theme === "dark" ? "text-white" : "text-light-text";

  return (
    <h3 className={`${textColor} text-xl font-semibold mb-6 ${className}`}>
      {children}
    </h3>
  );
};

// Компонент "Смотреть все"
const ViewAllLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  const { theme } = useThemeStore();
  const textColor = theme === "dark" ? "text-white" : "text-light-text";

  return (
    <Link
      href={href}
      className={`${textColor} underline font-semibold text-lg`}
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
  const { currentLocale } = useLanguageStore();

  // Состояния для хранения данных из API
  const [serviceLinks, setServiceLinks] = useState<LinkItem[]>([]);
  const [checkupLinks, setCheckupLinks] = useState<LinkItem[]>([]);
  const [analysisLinks, setAnalysisLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataFetched, setDataFetched] = useState<boolean>(false); // Флаг для отслеживания загрузки

  const bgColor = theme === "dark" ? "bg-dark-block" : "bg-white";
  const textColorMuted =
    theme === "dark" ? "text-white/60" : "text-light-text/60";

  // Данные для социальных сетей - мемоизируем их
  const socialNetworks = useMemo(
    () => [
      {
        id: "telegram",
        url: "https://t.me/globalmedcenter",
        icon: TelegramIcon,
        label: "Telegram",
      },
      {
        id: "instagram",
        url: "https://instagram.com/globalmedcenter",
        icon: InstagramIcon,
        label: "Instagram",
      },
      {
        id: "whatsapp",
        url: "https://wa.me/+998712005550",
        icon: WhatsapppIcon,
        label: "WhatsApp",
      },
      {
        id: "facebook",
        url: "https://facebook.com/globalmedcenter",
        icon: FacebookIcon,
        label: "Facebook",
      },
    ],
    []
  );

  // Получаем типизированные массивы для навигации из переводов
  const navigationLinks = useMemo(
    () => t("navigationLinks", { returnObjects: true }) as LinkItem[],
    [t]
  );

  // Мемоизируем запасные данные из переводов
  const fallbackServiceLinks = useMemo(
    () => t("serviceLinks", { returnObjects: true }) as LinkItem[],
    [t]
  );

  const fallbackCheckupLinks = useMemo(
    () => t("checkupLinks", { returnObjects: true }) as LinkItem[],
    [t]
  );

  const fallbackAnalysisLinks = useMemo(
    () => t("analysisLinks", { returnObjects: true }) as LinkItem[],
    [t]
  );

  // Функция для получения данных из API - оптимизирована с useCallback
  const fetchData = useCallback(async () => {
    if (dataFetched) return; // Предотвращаем повторные запросы

    setIsLoading(true);

    try {
      // Используем Promise.all для параллельных запросов
      const [servicesResponse, checkupsResponse, analysesResponse] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/services`, {
            headers: { "X-Language": currentLocale },
          }),
          axios.get(`${API_BASE_URL}/checkups`, {
            headers: { "X-Language": currentLocale },
          }),
          axios.get(`${API_BASE_URL}/medical-tests`, {
            headers: { "X-Language": currentLocale },
          }),
        ]);

      // Форматирование данных услуг
      const serviceItems = servicesResponse.data.data
        .slice(0, 11)
        .map((service: any) => ({
          title: service.name,
          link: `/services/${service.slug}`,
        }));

      // Форматирование данных чек-апов
      const checkupItems = checkupsResponse.data.data
        .slice(0, 4)
        .map((checkup: any) => ({
          title: checkup.title,
          link: `/checkups/${checkup.slug}`,
        }));

      // Форматирование данных анализов
      const analysisItems = analysesResponse.data.data
        .slice(0, 4)
        .map((analysis: any) => ({
          title: analysis.name,
          link: `/analysis/${analysis.slug}`,
        }));

      setServiceLinks(serviceItems);
      setCheckupLinks(checkupItems);
      setAnalysisLinks(analysisItems);
      setDataFetched(true); // Отмечаем, что данные загружены
    } catch (error) {
      console.error("Error fetching footer data:", error);
      // В случае ошибки используем запасные данные из переводов
      setServiceLinks(fallbackServiceLinks);
      setCheckupLinks(fallbackCheckupLinks);
      setAnalysisLinks(fallbackAnalysisLinks);
    } finally {
      setIsLoading(false);
    }
  }, [
    currentLocale,
    dataFetched,
    fallbackServiceLinks,
    fallbackCheckupLinks,
    fallbackAnalysisLinks,
  ]);

  // Загружаем данные при монтировании
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Если данные загружаются, используем запасные варианты
  const displayServiceLinks =
    serviceLinks.length > 0 ? serviceLinks : fallbackServiceLinks;
  const displayCheckupLinks =
    checkupLinks.length > 0 ? checkupLinks : fallbackCheckupLinks;
  const displayAnalysisLinks =
    analysisLinks.length > 0 ? analysisLinks : fallbackAnalysisLinks;

  return (
    <footer className="mt-40">
      {/* Main footer content */}
      <div className={`rounded-2xl p-8 md:p-10 ${bgColor}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Services column */}
          <div>
            <SectionTitle>{t("sections.services")}</SectionTitle>
            <ul className="space-y-3">
              {displayServiceLinks.map((item) => (
                <li key={item.link}>
                  <FooterLink href={item.link}>{item.title}</FooterLink>
                </li>
              ))}
              <li className="pt-2">
                <ViewAllLink href="/services">
                  {t("viewAll.services")}
                </ViewAllLink>
              </li>
            </ul>
          </div>

          {/* Checkups column */}
          <div>
            <SectionTitle>{t("sections.checkups")}</SectionTitle>
            <ul className="space-y-3">
              {displayCheckupLinks.map((item) => (
                <li key={item.link}>
                  <FooterLink href={item.link}>{item.title}</FooterLink>
                </li>
              ))}
              <li className="pt-2">
                <ViewAllLink href="/checkups">
                  {t("viewAll.checkups")}
                </ViewAllLink>
              </li>
            </ul>

            <SectionTitle className="mt-8">
              {t("sections.analyses")}
            </SectionTitle>
            <ul className="space-y-3">
              {displayAnalysisLinks.map((item) => (
                <li key={item.link}>
                  <FooterLink href={item.link}>{item.title}</FooterLink>
                </li>
              ))}
              <li className="pt-2">
                <ViewAllLink href="/analysis">
                  {t("viewAll.analyses")}
                </ViewAllLink>
              </li>
            </ul>
          </div>

          {/* Navigation column */}
          <div>
            <SectionTitle>{t("sections.navigation")}</SectionTitle>
            <ul className="space-y-3">
              {navigationLinks.map((item) => (
                <li key={item.link}>
                  <FooterLink href={item.link}>{item.title}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href={"#career-form"}>
                  {currentLocale === "ru" ? "Вакансии" : "Vakansiyalar"}
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* Contacts and Address column */}
          <div>
            <SectionTitle>{t("sections.contacts")}</SectionTitle>
            <ul className="space-y-4 mb-8">
              <li>
                <ExternalLink href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href={`tel:${CONTACT_INFO.phone.replace(/[\s()-]/g, "")}`}
                >
                  {CONTACT_INFO.phone}
                </ExternalLink>
              </li>
              <li className={textColorMuted}>
                {t("emergency")}:{" "}
                <ExternalLink href="tel:1142">1142</ExternalLink>
              </li>
              <li className={textColorMuted}>
                {t("telegramBot")}:{" "}
                <ExternalLink href="https://t.me/globalmed_bot">
                  @globalmed_bot
                </ExternalLink>
              </li>
            </ul>

            <SectionTitle className="mb-4">
              {t("sections.address")}
            </SectionTitle>
            <p className={`${textColorMuted} mb-6 text-lg`}>{t("address")}</p>

            {/* Social media icons */}
            <div className="flex gap-4">
              {socialNetworks.map((network) => (
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
          <div className={`${textColorMuted} text-lg mb-4 md:mb-0`}>
            2025 © Global Medical Center
          </div>

          <FooterLink href="/privacy-policy" className="mb-4 md:mb-0">
            {t("privacyPolicy")}
          </FooterLink>

          <div className={`${textColorMuted} text-lg`}>
            {t("designedBy")}{" "}
            <ExternalLink href="https://kelyanmedia.com">
              KelyanMedia
            </ExternalLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
