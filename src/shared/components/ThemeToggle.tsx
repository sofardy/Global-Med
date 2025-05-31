"use client";

import React from "react";
import { useThemeStore } from "../../store/theme";
import { useLanguageStore } from "../../store/language";

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
};

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { currentLocale } = useLanguageStore();
  const t = localization[currentLocale];

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
