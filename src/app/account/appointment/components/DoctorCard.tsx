import { useTranslation } from "@/src/hooks/useTranslation";
import { useThemeStore } from "@/src/store/theme";
import Image from "next/image";
import React, { useState } from "react";

// Переводы
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

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onBookAppointment,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);

  // Default to a predetermined date, matching the screenshot
  const [selectedDate, setSelectedDate] = useState("2025-05-19");
  const [selectedTime, setSelectedTime] = useState("");

  // Format today's date as minimum selectable date
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const handleAppointment = () => {
    if (!selectedTime) {
      alert(t("pleaseSelectTime"));
      return;
    }

    // Call the passed onBookAppointment callback
    onBookAppointment({
      doctorId: doctor.id,
      name: doctor.name,
      date: selectedDate,
      time: selectedTime,
    });
  };

  // Определяем цвета в зависимости от темы
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
              <li
                className={`flex items-start ${mutedTextColor} text-xs sm:text-sm md:text-base`}
              >
                <span className={`${mutedTextColor} mr-2`}>•</span>
                <span>
                  {t("experiencePrefix")} {doctor.experience}{" "}
                  {t("experienceSuffix")}
                </span>
              </li>
              <li
                className={`flex items-start ${mutedTextColor} text-xs sm:text-sm md:text-base`}
              >
                <span className={`${mutedTextColor} mr-2`}>•</span>
                <span>{doctor.qualification}</span>
              </li>
              <li
                className={`flex items-start ${mutedTextColor} text-xs sm:text-sm md:text-base`}
              >
                <span className={`${mutedTextColor} mr-2`}>•</span>
                <span>{doctor.category}</span>
              </li>
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
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={formattedToday}
              className={`w-full h-9 sm:h-10 md:h-14 px-2 sm:px-3 md:px-4 rounded-xl border ${inputBorderColor} ${inputBgColor} ${textColor} focus:outline-none focus:ring-2 ${accentColor} text-xs sm:text-sm md:text-base`}
            />
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
