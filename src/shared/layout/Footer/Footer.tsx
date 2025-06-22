// src/shared/layout/Footer/Footer.tsx
"use client";

import { API_BASE_URL } from "@/src/config/constants";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useLanguageStore } from "@/src/store/language";
import { useThemeStore } from "@/src/store/theme";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  WhatsapppIcon,
} from "../../ui/Icon";
import { translations } from "./translations";

// Types for translation items
interface LinkItem {
  title: string;
  link: string;
}

interface FooterGroup {
  title: string;
  items: {
    url: string;
    label: string;
  }[];
}

interface SocialNetwork {
  name: string;
  url: string;
  icon: string;
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
// const ViewAllLink: React.FC<{ href: string; children: React.ReactNode }> = ({
//   href,
//   children,
// }) => {
//   const { theme } = useThemeStore();
//   const textColor = theme === "dark" ? "text-white" : "text-light-text";

//   return (
//     <Link
//       href={href}
//       className={`${textColor} underline font-semibold text-lg`}
//     >
//       {children}
//     </Link>
//   );
// };

// Тип для социальной сети

export const Footer: React.FC = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const { currentLocale } = useLanguageStore();

  // Состояния для хранения данных из API
  const [serviceLinks, setServiceLinks] = useState<LinkItem[]>([]);
  const [checkupLinks, setCheckupLinks] = useState<LinkItem[]>([]);
  const [analysisLinks, setAnalysisLinks] = useState<LinkItem[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false); // Флаг для отслеживания загрузки
  const [footerLinks, setFooterLinks] = useState<FooterGroup[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialNetwork[]>([]);
  const [copyright, setCopyright] = useState<string>("© Global Medical Center");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const bgColor = theme === "dark" ? "bg-dark-block" : "bg-white";
  const textColorMuted =
    theme === "dark" ? "text-white/60" : "text-light-text/60";

  // Иконки соцсетей мэппинг
  const socialIconMap: Record<
    string,
    React.FC<{ size: number; color: string; className?: string }>
  > = {
    telegram: TelegramIcon,
    instagram: InstagramIcon,
    whatsapp: WhatsapppIcon,
    whatsappapp: WhatsapppIcon,
    facebook: FacebookIcon,
  };

  const isExternalLink = (url: string) => /^(https?:|mailto:|tel:)/.test(url);

  // Данные для социальных сетей - мемоизируем их
  const socialNetworks = useMemo(
    () => [
      {
        id: "telegram",
        url: "https://t.me/globalmed",
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

  // Fetch footer data from /settings/footer
  useEffect(() => {
    const fetchFooter = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_BASE_URL}/settings/footer`, {
          headers: { "X-Language": currentLocale },
        });

        const payload = res.data?.data || res.data;
        console.log("Footer data received:", payload); // Debug log

        setFooterLinks(payload.links || []);
        setSocialLinks(payload.social_networks || []);
        setCopyright(payload.copyright || "© Global Medical Center");
      } catch (err) {
        console.error("Error fetching footer settings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooter();
  }, [currentLocale]);

  // Find groups by title patterns
  const servicesGroup = footerLinks.find((g) =>
    /услуги|xizmat|services|Xizmatlar/i.test(g.title)
  );
  const checkupGroup = footerLinks.find((g) =>
    /чек|tekshir|check-?up|Chek-aplar/i.test(g.title)
  );
  const analysesGroup = footerLinks.find((g) =>
    /комплекс|анализ|analysis|analiz|Tahlil komplekslari/i.test(g.title)
  );
  const navGroup = footerLinks.find((g) =>
    /навига|naviga|navigation|Navigatsiya/i.test(g.title)
  );
  const contactsGroup = footerLinks.find((g) =>
    /контакт|kontakt|contacts|Kontaktlar/i.test(g.title)
  );
  const addressGroup = footerLinks.find((g) =>
    /адрес|address|manzil|Manzil/i.test(g.title)
  );

  return (
    <footer className="mt-40">
      {/* Main footer content */}
      <div className={`rounded-2xl p-8 md:p-10 ${bgColor}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Services */}
          {servicesGroup && (
            <div>
              <SectionTitle>{servicesGroup.title}</SectionTitle>
              <ul className="space-y-3">
                {servicesGroup.items.map((item) => (
                  <li key={item.url}>
                    <FooterLink
                      href={item.url}
                      isExternal={isExternalLink(item.url)}
                    >
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 2: Checkups + Analyses */}
          <div className="space-y-8">
            {checkupGroup && (
              <>
                <SectionTitle>{checkupGroup.title}</SectionTitle>
                <ul className="space-y-3 mb-6">
                  {checkupGroup.items.map((item) => (
                    <li key={item.url}>
                      <FooterLink
                        href={item.url}
                        isExternal={isExternalLink(item.url)}
                      >
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {analysesGroup && (
              <>
                <SectionTitle>{analysesGroup.title}</SectionTitle>
                <ul className="space-y-3">
                  {analysesGroup.items.map((item) => (
                    <li key={item.url}>
                      <FooterLink
                        href={item.url}
                        isExternal={isExternalLink(item.url)}
                      >
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Column 3: Navigation */}
          {navGroup && (
            <div>
              <SectionTitle>{navGroup.title}</SectionTitle>
              <ul className="space-y-3">
                {navGroup.items.map((item) => (
                  <li key={item.url}>
                    <FooterLink
                      href={item.url}
                      isExternal={isExternalLink(item.url)}
                    >
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 4: Contacts + Address + Socials */}
          <div>
            {contactsGroup && (
              <>
                <SectionTitle>{contactsGroup.title}</SectionTitle>
                <ul className="space-y-3 mb-6">
                  {contactsGroup.items.map((item) => (
                    <li key={item.url}>
                      <FooterLink
                        href={item.url}
                        isExternal={isExternalLink(item.url)}
                      >
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {addressGroup && (
              <>
                <SectionTitle>{addressGroup.title}</SectionTitle>
                <ul className="space-y-3 mb-6">
                  {addressGroup.items.map((item) => (
                    <li key={item.url}>
                      <FooterLink
                        href={item.url}
                        isExternal={isExternalLink(item.url)}
                      >
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {socialLinks.length > 0 && (
              <>
                <SectionTitle>Social Networks</SectionTitle>
                <div className="flex gap-4">
                  {socialLinks.map((sn, index) => {
                    const key = sn.name?.toLowerCase();
                    const IconComp = socialIconMap[key];
                    if (IconComp) {
                      return (
                        <SocialIcon
                          key={`${sn.url}-${index}`}
                          href={sn.url}
                          icon={IconComp}
                          label={sn.name}
                        />
                      );
                    }
                    return (
                      <a
                        key={`${sn.url}-${index}`}
                        href={sn.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: sn.icon }}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className={`p-6 md:p-8 rounded-2xl mt-4 ${bgColor}`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className={`${textColorMuted} text-lg mb-4 md:mb-0`}>
            {copyright}
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
