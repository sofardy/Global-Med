"use client";

import { useTranslation } from "@/src/hooks/useTranslation";
import {
  GlobeIcon,
  LocationIconk2,
  LogoIcon,
  LogoTextIcon,
} from "@/src/shared/ui/Icon";
import { Locale, useLanguageStore } from "@/src/store/language";
import { useThemeStore } from "@/src/store/theme";
import Link from "next/link";

const translations = {
  ru: {
    backToMainSite: "Перейти на основной сайт",
    changeLanguage: "Сменить язык",
  },
  uz: {
    backToMainSite: "Asosiy saytga o'tish",
    changeLanguage: "Tilni o'zgartirish",
  },
  en: {
    backToMainSite: "Back to Main Site",
    changeLanguage: "Change Language",
  },
};

// Languages available
const languages = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

export default function AccountHeader() {
  const { theme } = useThemeStore();
  const { currentLocale, setLocale } = useLanguageStore();
  const { t } = useTranslation(translations);

  // Handle language change
  const handleLanguageChange = (locale: Locale) => {
    setLocale(locale);
  };

  return (
    <header className="w-full">
      <div
        className={`max-w-[1560px] rounded-2xl ${
          theme === "light" ? "bg-light-block" : "bg-dark-block"
        } px-8 py-6 flex justify-between items-center`}
      >
        <Link href="/account" className="flex items-center gap-1 sm:gap-2">
          <LogoIcon size={40} />
          <LogoTextIcon
            size={90}
            color={theme === "light" ? "#094A54" : "white"}
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="relative group">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={t("changeLanguage")}
            >
              <GlobeIcon
                size={24}
                color={theme === "light" ? "#094A54" : "white"}
              />
              <span className="text-sm font-medium text-light-text dark:text-dark-text">
                {currentLocale.toUpperCase()}
              </span>
            </button>

            <div className="absolute right-0 mt-2 w-32 py-2 bg-white dark:bg-dark-block rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`w-full px-4 py-2 text-left text-sm ${
                    currentLocale === lang.code
                      ? "bg-light-accent text-white"
                      : "text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => handleLanguageChange(lang.code as Locale)}
                >
                  <div className="flex items-center gap-2">
                    {lang.code === "uz" && (
                      <img
                        src="/icon/icon-uzbekistan.svg"
                        className="w-[20px] h-[14px]"
                        alt="uz"
                      />
                    )}
                    {lang.code === "ru" && (
                      <img
                        src="/icon/icon-russia.svg"
                        className="w-[20px] h-[14px]"
                        alt="ru"
                      />
                    )}
                    {lang.code === "en" && (
                      <img
                        src="/icon/icon-uk.png"
                        className="w-[20px] h-[14px]"
                        alt="en"
                      />
                    )}
                    {lang.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Back to Main Site Button */}
          <Link
            href="/"
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-4 bg-[#00C78B] text-white rounded-xl sm:rounded-2xl hover:bg-[#00C78B]/90 transition-colors"
          >
            <LocationIconk2
              size={20}
              className="sm:w-[24px] sm:h-[24px]"
              color="white"
            />
            <span className="text-[14px] sm:text-[18px] whitespace-nowrap">
              {t("backToMainSite")}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
