"use client";

import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { useLanguageStore } from "@/src/store/language";
import { useThemeStore } from "@/src/store/theme";

interface LocalizedDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

// Date formatting utilities
export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const parseDDMMYYYYToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day);
};

const LocalizedDatePicker: React.FC<LocalizedDatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder,
  className = "",
  disabled = false,
}) => {
  const { currentLocale } = useLanguageStore();
  const { theme } = useThemeStore();

  // Determine locale for date picker
  const getDatePickerLocale = (locale: string) => {
    switch (locale) {
      case "ru":
        return "ru-RU";
      case "uz":
        return "uz-UZ";
      case "en":
        return "en-US";
      default:
        return "ru-RU";
    }
  };

  // Theme-based styling
  const isDark = theme === "dark";
  const baseClasses = `
    w-full h-9 sm:h-10 md:h-14 px-2 sm:px-3 md:px-4 rounded-xl border 
    text-xs sm:text-sm md:text-base
    focus:outline-none focus:ring-2 focus:ring-[#00C78B]
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  const lightClasses = `
    bg-white border-gray-200 text-[#094A54]
    [&_.react-date-picker__wrapper]:bg-white
    [&_.react-date-picker__wrapper]:border-gray-200
    [&_.react-date-picker__wrapper]:text-[#094A54]
  `;

  const darkClasses = `
    bg-dark-bg border-gray-700 text-white
    [&_.react-date-picker__wrapper]:bg-dark-bg
    [&_.react-date-picker__wrapper]:border-gray-700
    [&_.react-date-picker__wrapper]:text-white
  `;

  const themeClasses = isDark ? darkClasses : lightClasses;

  const handleDateChange = (date: any) => {
    if (date instanceof Date) {
      onChange(date);
    } else {
      onChange(null);
    }
  };

  return (
    <div className={`${baseClasses} ${themeClasses} ${className}`}>
      <DatePicker
        value={value}
        onChange={handleDateChange}
        locale={getDatePickerLocale(currentLocale)}
        format="dd.MM.yyyy"
        minDate={minDate}
        maxDate={maxDate}
        dayPlaceholder={placeholder}
        disabled={disabled}
        clearIcon={null}
        calendarIcon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isDark ? "#ffffff" : "#094A54"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        }
        className="w-full"
        calendarClassName={`
          ${
            isDark
              ? "bg-dark-bg border-gray-700 text-white"
              : "bg-white border-gray-200 text-[#094A54]"
          }
          rounded-xl shadow-lg border
        `}
      />
    </div>
  );
};

export default LocalizedDatePicker;
