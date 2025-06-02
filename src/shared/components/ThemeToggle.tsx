"use client";

import React from "react";
import { useLanguageStore } from "../../store/language";
import { useThemeStore } from "../../store/theme";

const localization = {
  ru: {
    dark: "Темная тема",
    light: "Светлая тема",
    system: "Системная тема",
    toggle: "Переключить тему",
  },
  uz: {
    dark: "Qorong'i mavzu",
    light: "Yorug' mavzu",
    system: "Tizim mavzusi",
    toggle: "Mavzuni o'zgartirish",
  },
  en: {
    dark: "Dark Theme",
    light: "Light Theme",
    system: "System Theme",
    toggle: "Toggle Theme",
  },
};

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { currentLocale } = useLanguageStore();
  const t: any = localization[currentLocale as keyof typeof localization];

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md bg-light-accent dark:bg-dark-accent text-white"
      aria-label={t.toggle}
    >
      {theme === "light" ? t.dark : theme === "dark" ? t.system : t.light}
    </button>
  );
};
