"use client";

import React, { useState, useEffect } from "react";
import { useThemeStore } from "@/src/store/theme";
import { useTranslation } from "@/src/hooks/useTranslation";
import { translations } from "@/src/shared/translations/ru";

interface DateTimePickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  availableTimes?: string[];
}

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  availableTimes = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ],
}: DateTimePickerProps) {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const [mounted, setMounted] = useState(false);

  // Initialize component on client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const borderColor =
    theme === "light" ? "border-[#094A5480]" : "border-gray-700";
  const inputBg = theme === "light" ? "bg-white" : "bg-dark-bg";
  const textColor = theme === "light" ? "text-[#094A54]" : "text-white";

  return (
    <div className="flex flex-col w-full max-w-[500px] gap-4 md:gap-6">
      <div>
        <h2
          className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}
        >
          {t("selectDate")}
        </h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className={`w-full h-12 md:h-[56px] px-4 rounded-xl border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-[#00C78B]`}
        />
      </div>

      <div>
        <h2
          className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}
        >
          {t("selectTime")}
        </h2>
        <select
          value={selectedTime}
          onChange={(e) => onTimeChange(e.target.value)}
          className={`w-full h-12 md:h-[56px] px-4 rounded-xl border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-[#00C78B] appearance-none`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${
              theme === "light" ? "%23094A54" : "%23ffffff"
            }' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
          }}
        >
          <option value="">{t("emptyTime")}</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
