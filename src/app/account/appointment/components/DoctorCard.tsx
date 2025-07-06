import { useTranslation } from "@/src/hooks/useTranslation";
import { useThemeStore } from "@/src/store/theme";
import { useLanguageStore } from "@/src/store/language";
import Image from "next/image";
import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

// Doctor interface to define the structure of doctor data
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  qualification: string;
  degree?: string; // Если это поле используется в компоненте
  category?: string; // Добавляем поле category
  languages?: string[]; // Добавляем поле languages как массив строк
  price?: string; // Добавляем поле price
  photoUrl: string;
  availableTimes: string[];
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (details: {
    doctorId: string;
    name: string;
    date: string;
    time: string;
  }) => void;
}

// Restore translations object
const translations = {
  ru: {
    experiencePrefix: "Стаж",
    experienceSuffix: "год",
    selectDate: "Выберите дату",
    selectTime: "Выберите время",
    bookAppointment: "Записаться на прием",
    pleaseSelectTime: "Пожалуйста, выберите время приема",
    emptyTimeOption: "--:--",
  },
  uz: {
    experiencePrefix: "Tajriba",
    experienceSuffix: "yil",
    selectDate: "Sanani tanlang",
    selectTime: "Vaqtni tanlang",
    bookAppointment: "Qabulga yozilish",
    pleaseSelectTime: "Iltimos, qabul vaqtini tanlang",
    emptyTimeOption: "--:--",
  },
  en: {
    experiencePrefix: "Experience",
    experienceSuffix: "years",
    selectDate: "Select date",
    selectTime: "Select time",
    bookAppointment: "Book an Appointment",
    pleaseSelectTime: "Please select appointment time",
    emptyTimeOption: "--:--",
  },
};

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onBookAppointment,
}) => {
  const { theme } = useThemeStore();
  const { currentLocale } = useLanguageStore();
  const { t } = useTranslation(translations);

  // Format today's date as default and minimum selectable date
  const today = new Date();
  const minDateForInput = today;

  // Default to today's date
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTime, setSelectedTime] = useState("");

  // DatePicker locale
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

  // Fix for react-date-picker value type
  const handleDateChange = (
    value: Date | [Date | null, Date | null] | null
  ) => {
    if (Array.isArray(value)) {
      setSelectedDate(value[0] ?? null);
    } else {
      setSelectedDate(value);
    }
  };

  const handleAppointment = () => {
    if (!selectedTime || !selectedDate) {
      alert(t("pleaseSelectTime"));
      return;
    }
    // Format date as YYYY-MM-DD for API
    const apiDate = selectedDate
      ? `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
      : "";
    onBookAppointment({
      doctorId: doctor.id,
      name: doctor.name,
      date: apiDate,
      time: selectedTime,
    });
  };

  // Theme-based styles
  const cardBg = theme === "light" ? "bg-white" : "bg-dark-block";
  const textColor = theme === "light" ? "text-[#094A54]" : "text-white";
  const mutedTextColor = theme === "light" ? "text-[#94A3A6]" : "text-gray-400";
  const borderColor =
    theme === "light" ? "border-[#94A3A6]" : "border-gray-700";
  const inputBgColor = theme === "light" ? "bg-white" : "bg-dark-bg";
  const inputBorderColor =
    theme === "light" ? "border-gray-200" : "border-gray-700";
  const accentColor = "ring-[#00C78B]";

  return (
    <div
      className={`${cardBg} rounded-2xl shadow-sm ${borderColor} border overflow-hidden mb-6`}
    >
      {/* Doctor Information Section */}
      <div className="p-3 sm:p-4 md:p-8">
        <div className="flex flex-col md:flex-row">
          {/* Doctor Photo */}
          <div className="flex-shrink-0 mb-3 sm:mb-4 md:mb-0 md:mr-6">
            <div className="w-[100px] h-[125px] sm:w-[135px] sm:h-[150px] md:w-[135px] md:h-[180px] relative mx-auto md:mx-0">
              <Image
                src={doctor.photoUrl}
                alt={doctor.name}
                className="rounded-xl object-cover"
                fill
              />
            </div>
          </div>
          {/* Doctor Details */}
          <div className="flex-1">
            <h3
              className={`text-lg sm:text-xl md:text-2xl font-medium ${textColor}`}
            >
              {doctor.name}
            </h3>
            <p className={`${textColor} mb-2 md:mb-4 text-sm md:text-base`}>
              {doctor.specialty}
            </p>
            <ul className="mb-3 md:mb-6 space-y-1 md:space-y-2">
              {doctor.experience !== "" && doctor.experience !== null && (
                <li
                  className={`flex items-start ${mutedTextColor} text-xs sm:text-sm md:text-base`}
                >
                  <span className={`${mutedTextColor} mr-2`}>•</span>
                  <span>
                    {t("experiencePrefix")} {doctor.experience}{" "}
                    {t("experienceSuffix")}
                  </span>
                </li>
              )}
              {doctor.qualification !== "" && doctor.qualification !== null && (
                <li
                  className={`flex items-start ${mutedTextColor} text-xs sm:text-sm md:text-base`}
                >
                  <span className={`${mutedTextColor} mr-2`}>•</span>
                  <span>{doctor.qualification}</span>
                </li>
              )}
              {doctor.category !== "" && doctor.category !== null && (
                <li
                  className={`flex items-start ${mutedTextColor} text-xs sm:text-sm md:text-base`}
                >
                  <span className={`${mutedTextColor} mr-2`}>•</span>
                  <span>{doctor.category}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* Booking Section */}
      <div className={`p-3 sm:p-4 md:p-8 ${cardBg} border-t ${borderColor}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 items-end">
          {/* Date Selection */}
          <div>
            <div
              className={`mb-1 md:mb-2 ${textColor} text-xs sm:text-sm md:text-base`}
            >
              {t("selectDate")}
            </div>
            <div className="border-[1px] border-gray-200 rounded-xl">
              <style jsx global>{`
                .react-date-picker__wrapper {
                  border: none !important;
                  box-shadow: none !important;
                  background: transparent !important;
                }
              `}</style>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                minDate={minDateForInput}
                locale={getDatePickerLocale(currentLocale)}
                format="dd.MM.yyyy"
                className={`w-full h-9 sm:h-10 md:h-14 px-2 sm:px-3 md:px-4 rounded-xl ${inputBgColor} ${textColor} focus:outline-none focus:ring-2 ${accentColor} text-xs sm:text-sm md:text-base`}
                clearIcon={null}
                calendarIcon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={theme === "light" ? "#094A54" : "#fff"}
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
              />
            </div>
          </div>
          {/* Time Selection */}
          <div>
            <div
              className={`mb-1 md:mb-2 ${textColor} text-xs sm:text-sm md:text-base`}
            >
              {t("selectTime")}
            </div>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className={`w-full h-9 sm:h-10 md:h-14 px-2 sm:px-3 md:px-4 rounded-xl border ${inputBorderColor} ${inputBgColor} ${textColor} focus:outline-none focus:ring-2 ${accentColor} appearance-none text-xs sm:text-sm md:text-base`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${
                  theme === "light" ? "%23094A54" : "%23ffffff"
                }' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
              }}
            >
              <option value="">{t("emptyTimeOption")}</option>
              {doctor.availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          {/* Booking Button */}
          <div className="md:text-right h-9 sm:h-10 md:h-[49px]">
            <button
              onClick={handleAppointment}
              className="w-full h-9 sm:h-10 md:h-[49px] px-2 sm:px-4 md:px-6 py-1 md:py-3 bg-[#00C78B] text-white rounded-xl hover:bg-[#00C78B]/90 transition-colors text-xs sm:text-sm md:text-base"
            >
              {t("bookAppointment")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
