"use client";

import Modal from "@/src/shared/components/Modal/Modal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import { AnimatedButton } from "../../ui/Button/AnimatedButton";

// Типы и интерфейсы
interface TimeSlot {
  id: string;
  time: string;
  isBooked: boolean;
  isLunchBreak: boolean;
}

interface DateSlot {
  date: Date;
  dayNumber: number;
  dayName: string;
  monthName: string;
  isAvailable: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
  isSpecialistAvailable: boolean;
}

interface AppointmentSchedulerProps {
  doctorId?: string;
  serviceId?: string;
  onAppointmentSelected?: (date: Date, timeSlot: string) => void;
  className?: string;
}

// Локализация для компонента
const translations = {
  ru: {
    title: "Запишитесь на прием онлайн",
    selectDay: "Выберите удобный для вас день",
    selectTime: "Выберите удобное для вас время",
    noTimeSlots: "На выбранную дату нет доступных слотов времени",
    bookAppointment: "Записаться на прием",
    loading: "Загрузка доступных дат...",
    error: "Ошибка при загрузке",
    // Локализация для модального окна
    authModal: {
      title: "Переход в личный кабинет",
      description:
        "Запись на прием осуществляется в личном кабинете пациента. Для продолжения вам необходимо будет авторизоваться/зарегистрироваться",
      continueButton: "Продолжить",
      closeButton: "Закрыть",
    },
  },
  uz: {
    title: "Onlayn qabulga yoziling",
    selectDay: "Siz uchun qulay kunni tanlang",
    selectTime: "Siz uchun qulay vaqtni tanlang",
    noTimeSlots: "Tanlangan sana uchun mavjud vaqt oraliqları yo'q",
    bookAppointment: "Qabulga yozilish",
    loading: "Mavjud kunlar yuklanmoqda...",
    error: "Yuklashda xatolik yuz berdi",
    // Локализация для модального окна
    authModal: {
      title: "Shaxsiy kabinetga o'tish",
      description:
        "Qabulga yozilish bemorning shaxsiy kabinetida amalga oshiriladi. Davom etish uchun siz tizimga kirishingiz/ro'yxatdan o'tishingiz kerak bo'ladi",
      continueButton: "Davom etish",
      closeButton: "Yopish",
    },
  },
  en: {
    title: "Book an Appointment Online",
    selectDay: "Choose a convenient day for you",
    selectTime: "Choose a convenient time for you",
    noTimeSlots: "No available time slots for the selected date",
    bookAppointment: "Book an Appointment",
    loading: "Loading available dates...",
    error: "Error loading data",
    // Modal window localization
    authModal: {
      title: "Go to Personal Account",
      description:
        "Appointment booking is done in the patient's personal account. To continue, you will need to log in/register",
      continueButton: "Continue",
      closeButton: "Close",
    },
  },
};

// Вспомогательные функции для работы с датами без использования библиотек
const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const getDayName = (date: Date): string => {
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return days[date.getDay()];
};

const getMonthName = (date: Date): string => {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return months[date.getMonth()];
};

// Моковые данные
const generateMockDates = (startDate = new Date()): DateSlot[] => {
  const dates: DateSlot[] = [];

  // Фиксированные даты марта для точного соответствия макету
  const marchDates = [
    { number: 10, name: "Понедельник", month: "марта", available: true },
    { number: 11, name: "Вторник", month: "марта", available: true },
    { number: 12, name: "Среда", month: "марта", available: true },
    { number: 13, name: "Четверг", month: "марта", available: true },
    { number: 14, name: "Пятница", month: "марта", available: true },
    { number: 15, name: "Суббота", month: "марта", available: true },
    { number: 17, name: "Понедельник", month: "марта", available: true },
  ];

  // Преобразуем фиксированные данные в формат DateSlot
  marchDates.forEach((item, index) => {
    const mockDate = new Date(2025, 2, item.number); // Март 2025

    dates.push({
      date: mockDate,
      dayNumber: item.number,
      dayName: item.name,
      monthName: item.month,
      isAvailable: item.available,
      isWeekend: item.name === "Суббота" || item.name === "Воскресенье",
      isHoliday: false,
      isSpecialistAvailable: true,
    });
  });

  return dates;
};

const generateMockTimeSlots = (date: Date): TimeSlot[] => {
  // Фиксированные временные слоты в соответствии с макетом
  const fixedTimeSlots = [
    { time: "8:00", isBooked: false, isLunchBreak: false },
    { time: "9:00", isBooked: false, isLunchBreak: false },
    { time: "10:00", isBooked: true, isLunchBreak: false }, // Занято
    { time: "11:00", isBooked: false, isLunchBreak: false },
    { time: "12:00", isBooked: false, isLunchBreak: false },
    { time: "14:00", isBooked: false, isLunchBreak: false },
    { time: "15:00", isBooked: false, isLunchBreak: false },
  ];

  return fixedTimeSlots.map((slot, index) => ({
    id: `time-${index}`,
    time: slot.time,
    isBooked: slot.isBooked,
    isLunchBreak: slot.isLunchBreak,
  }));
};

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  doctorId,
  serviceId,
  onAppointmentSelected,
  className = "",
}) => {
  // Состояния
  const router = useRouter();
  const [availableDates, setAvailableDates] = useState<DateSlot[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleDaysCount, setVisibleDaysCount] = useState<number>(7);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Переводы
  const { t } = useTranslation(translations);

  // Всегда отображаем все доступные дни
  useEffect(() => {
    setVisibleDaysCount(availableDates.length);
  }, [availableDates.length]);

  // Загрузка доступных дат при первом рендере
  useEffect(() => {
    setIsLoading(true);
    try {
      const mockDates = generateMockDates();
      setAvailableDates(mockDates);

      // Автоматический выбор первого доступного дня
      const firstAvailableDate = mockDates.find((date) => date.isAvailable);
      if (firstAvailableDate) {
        setSelectedDate(firstAvailableDate.date);
      }
    } catch (err) {
      setError("Ошибка при загрузке доступных дат");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [doctorId]);

  // Загрузка доступных временных слотов при выборе даты
  useEffect(() => {
    if (!selectedDate) return;

    setIsLoading(true);
    setSelectedTimeSlot(null);

    try {
      const timeSlots = generateMockTimeSlots(selectedDate);
      setAvailableTimeSlots(timeSlots);
    } catch (err) {
      setError("Ошибка при загрузке временных слотов");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  // Обработчик выбора даты
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Обработчик выбора времени
  const handleTimeSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  // Обработчик подтверждения записи
  const handleAppointmentConfirm = () => {
    // Открываем модальное окно авторизации
    setIsAuthModalOpen(true);
  };

  // Обработчик закрытия модального окна
  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Обработчик перехода в личный кабинет
  const handleContinueToAuth = () => {
    // Закрываем модальное окно
    setIsAuthModalOpen(false);

    // Перенаправляем пользователя на страницу авторизации/личного кабинета
    router.push("/account/login");
  };

  // Формируем статус для выбранной даты
  const getDateStatus = (
    dateSlot: DateSlot
  ): "unavailable" | "selected" | "available" => {
    if (!dateSlot.isAvailable) return "unavailable";
    if (selectedDate && isSameDay(dateSlot.date, selectedDate))
      return "selected";
    return "available";
  };

  // Формируем статус для временного слота
  const getTimeStatus = (
    timeSlot: TimeSlot
  ): "unavailable" | "selected" | "available" => {
    if (timeSlot.isBooked || timeSlot.isLunchBreak) return "unavailable";
    if (selectedTimeSlot === timeSlot.time) return "selected";
    return "available";
  };

  return (
    <div
      className={`bg-light-accent p-4 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden ${className}`}
    >
      {/* Фоновый паттерн */}
      <div
        className="absolute right-[100px] -bottom-[50px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block"
        style={{
          backgroundImage: "url(/images/doctor-pattern2.gif)",
          backgroundSize: "contain",
          opacity: 0.3,
          transform: "rotate(-10deg)",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="relative z-10">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6">
          {t("title")}
        </h2>

        {/* Выбор даты */}
        <div className="mb-6 sm:mb-8">
          <p className="text-white text-base sm:text-lg mb-3 sm:mb-4">
            {t("selectDay")}
          </p>

          {isLoading && !availableDates.length ? (
            <div className="flex justify-center py-4">
              <div className="animate-pulse text-white">{t("loading")}</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3">
              {availableDates.map((dateSlot) => {
                const status = getDateStatus(dateSlot);

                return (
                  <button
                    key={dateSlot.date.toISOString()}
                    className={`border border-white rounded-xl py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 flex flex-col items-center justify-center transition-all h-[70px] sm:h-[80px] md:h-[90px] active:scale-95 ${
                      status === "selected"
                        ? "bg-white text-light-accent"
                        : "bg-transparent text-white"
                    }`}
                    onClick={() =>
                      dateSlot.isAvailable && handleDateSelect(dateSlot.date)
                    }
                    disabled={!dateSlot.isAvailable}
                  >
                    <span className="text-base sm:text-lg font-medium truncate">
                      {dateSlot.dayNumber} {dateSlot.monthName}
                    </span>
                    <span className="text-xs sm:text-sm truncate">
                      {dateSlot.dayName}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Выбор времени и кнопка подтверждения */}
        <div className="mb-6 sm:mb-8">
          <p className="text-white text-base sm:text-lg mb-3 sm:mb-4">
            {t("selectTime")}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Временные слоты */}
            {availableTimeSlots.map((timeSlot) => {
              const status = getTimeStatus(timeSlot);

              return (
                <button
                  key={timeSlot.id}
                  className={`border border-white rounded-xl py-2 sm:py-3 px-3 sm:px-5 transition-all w-[70px] sm:w-[90px] md:w-[100px] ${
                    status === "selected"
                      ? "bg-white text-light-accent"
                      : "bg-transparent text-white"
                  } ${
                    timeSlot.isBooked || timeSlot.isLunchBreak
                      ? "opacity-50 cursor-not-allowed"
                      : "active:scale-95"
                  }`}
                  onClick={() =>
                    !timeSlot.isBooked &&
                    !timeSlot.isLunchBreak &&
                    handleTimeSelect(timeSlot.time)
                  }
                  disabled={timeSlot.isBooked || timeSlot.isLunchBreak}
                >
                  {timeSlot.time}
                </button>
              );
            })}

            {/* Кнопка подтверждения с использованием компонента AnimatedButton, сохраняем на одном уровне с временными слотами */}
            <div className="mt-3 sm:mt-0 ml-auto flex">
              <AnimatedButton
                onClick={handleAppointmentConfirm}
                borderColor="white"
                hoverTextColor="light-accent"
                width="w-full sm:w-auto"
                className="text-light-accent bg-white ml-auto"
                disabled={!selectedDate || !selectedTimeSlot}
                type="button"
                pulsation={false}
              >
                {t("bookAppointment")}
              </AnimatedButton>
            </div>
          </div>

          {availableTimeSlots.length === 0 && selectedDate && (
            <div className="text-white py-2">{t("noTimeSlots")}</div>
          )}
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <div className="text-white bg-red-500/20 p-3 rounded-lg mt-4">
            {t("error")}
          </div>
        )}
      </div>

      {/* Модальное окно авторизации */}
      <Modal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        title={t("authModal.title")}
        position="center"
        size="sm"
        theme="brand"
        showCloseButton={false}
        showCloseIcon={true}
      >
        <div className="py-6">
          <p className="text-gray-600 dark:text-gray-300 text-base mb-8">
            {t("authModal.description")}
          </p>

          <button
            onClick={handleContinueToAuth}
            className="w-full py-4 bg-[#67c395] hover:bg-[#5bb385] text-white rounded-xl font-medium transition-colors"
          >
            {t("authModal.continueButton")}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentScheduler;
