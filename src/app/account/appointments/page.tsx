"use client";
import { API_BASE_URL } from "@/src/config/constants";
import { useLanguageStore } from "@/src/store/language";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import { CheckIcon, ClockIcon, PacifierIcon } from "../../../shared/ui/Icon";
import { useThemeStore } from "../../../store/theme";

// Интерфейс для типизации данных записи на приём
interface Appointment {
  number: string | number;
  date: string;
  status: string;
  service_type: string;
  service_name: string;
  service_detail: string;
  service_label: string;
  status_type: string;
  acceptance_status: any;
}

// Переводы статусов
const statusTranslations = {
  "Предстоящая запись": "upcoming",
  Отменено: "cancelled",
  Завершено: "completed",
  "Прием завершен": "completed",
};

// Translations
const translations = {
  ru: {
    emptyState: "У вас пока нет записей ...",
    loadMore: "Загрузить еще",
    loading: "Загрузка...",
    upcomingAppointment: "Предстоящая запись",
    completedAppointment: "Прием завершен",
    cancelledAppointment: "Отменено",
    confirmed: "Запись подтверждена",
    confirmedShort: "Подтверждена",
    doctor: "Врач:",
    errorLoading: "Ошибка при загрузке записей",
    tryAgain: "Попробовать снова",
    unauthorized: "Необходима авторизация",
    recordNumber: "Запись №",
  },
  uz: {
    emptyState: "Hozircha yozuvlaringiz yo'q ...",
    loadMore: "Ko'proq yuklash",
    loading: "Yuklanmoqda...",
    upcomingAppointment: "Rejalashtirilgan qabul",
    completedAppointment: "Qabul tugallangan",
    cancelledAppointment: "Bekor qilindi",
    confirmed: "Qabul tasdiqlangan",
    confirmedShort: "Tasdiqlangan",
    doctor: "Shifokor:",
    errorLoading: "Yozuvlarni yuklashda xatolik yuz berdi",
    tryAgain: "Qayta urinib ko'ring",
    unauthorized: "Avtorizatsiya talab qilinadi",
    recordNumber: "Zapisi №",
  },
  en: {
    emptyState: "You have no appointments yet ...",
    loadMore: "Load More",
    loading: "Loading...",
    upcomingAppointment: "Upcoming Appointment",
    completedAppointment: "Appointment Completed",
    cancelledAppointment: "Cancelled",
    confirmed: "Appointment Confirmed",
    confirmedShort: "Confirmed",
    doctor: "Doctor:",
    errorLoading: "Error loading appointments",
    tryAgain: "Try Again",
    unauthorized: "Authorization required",
    recordNumber: "Record №",
  },
};

const AppointmentHistory = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const { currentLocale } = useLanguageStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Получение записей через API
  const fetchAppointments = async (pageNum = 1, shouldReset = false) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const tokenType = localStorage.getItem("tokenType");

      if (!token || !tokenType) {
        setError(t("unauthorized"));
        setTimeout(() => {
          router.push("/account/login");
        }, 2000);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/appointments`, {
        headers: {
          Authorization: `${tokenType} ${token}`,
          "X-Language": currentLocale,
        },
        params: {
          page: pageNum,
          per_page: 10,
        },
      });

      // Выводим структуру ответа для отладки
      console.log("API Response:", response.data);

      // Проверяем наличие данных в ответе
      const newData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      // Проверяем, есть ли еще страницы (если API поддерживает пагинацию)
      const pagination = response.data?.meta || response.data?.pagination;
      if (pagination) {
        setHasMore(pagination.current_page < pagination.last_page);
      } else {
        setHasMore(false);
      }

      if (shouldReset || pageNum === 1) {
        setAppointments(newData);
        setPage(1);
      } else {
        setAppointments((prev) => [...prev, ...newData]);
        setPage(pageNum);
      }
    } catch (err: any) {
      console.error("Error fetching appointments:", err);

      // Проверяем статус ответа для определения причины ошибки
      if (err.response && err.response.status === 401) {
        // Ошибка авторизации
        setError(t("unauthorized"));
        setTimeout(() => {
          router.push("/account/login");
        }, 2000);
      } else {
        // Другие ошибки
        setError(t("errorLoading"));
      }
    } finally {
      if (pageNum === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchAppointments(1, true);
  }, [currentLocale]);
  console.log(appointments);
  // Обработчик "Загрузить еще"
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchAppointments(page + 1);
    }
  };

  // Компонент пустого состояния
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <PacifierIcon
          size={120}
          color={theme === "light" ? "#174F4B" : "#ffffff"}
        />
      </div>
      <h3 className="text-2xl font-medium text-center text-light-text dark:text-dark-text">
        {t("emptyState")}
      </h3>
    </div>
  );

  // Получение иконки и текста статуса
  const getStatusDetails = (status: string, status_type: string) => {
    console.log(status, status_type + " TYPE");
    if (status_type === "pending") {
      return {
        icon: <ClockIcon size={20} color="#F59E0B" />,
        text: <span className="text-[#F59E0B]">{status}</span>,
      };
    } else if (status_type === "confirmed") {
      return {
        icon: <CheckIcon size={20} color="#10B981" />,
        text: <span className="text-[#10B981]">{status}</span>,
      };
    } else if (status_type === "cancelled") {
      return {
        icon: <CheckIcon size={20} color="#EF4444" />,
        text: <span className="text-[#EF4444]">{status}</span>,
      };
    } else {
      return { icon: null, text: null };
    }
  };

  // Если ошибка загрузки
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-4">
          <p>{error}</p>
        </div>
        <button
          onClick={() => fetchAppointments(1, true)}
          className="px-4 py-2 bg-light-accent text-white rounded-lg"
        >
          {t("tryAgain")}
        </button>
      </div>
    );
  }

  // Если загрузка
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
        <span className="ml-3 text-light-text dark:text-dark-text">
          {t("loading")}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {appointments.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          {appointments.map((appointment, index) => {
            const statusDetails = getStatusDetails(
              appointment.status,
              appointment?.status_type
            );
            // const isConfirmed = true; // Все записи считаем подтвержденными, как на скриншоте

            return (
              <div
                key={index}
                className="bg-white dark:bg-dark-block rounded-2xl mb-4 px-4 sm:px-6 md:px-10 py-4 sm:py-6 shadow-sm"
              >
                {/* Desktop layout */}
                <div className="hidden sm:grid sm:grid-cols-3">
                  {/* Left column: date and status */}
                  <div className="col-span-1">
                    <div className="text-lg font-medium text-light-text dark:text-dark-text">
                      {appointment.date}
                    </div>

                    <div className="mt-1 flex items-center">
                      <div className="mr-2">{statusDetails.icon}</div>
                      {statusDetails.text}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    {Array.isArray(appointment.service_detail) ? (
                      <div className="text-light-text dark:text-dark-text font-medium">
                        {appointment.service_detail.map((detail, idx) => (
                          <div key={idx} className={idx !== 0 ? "mt-1" : ""}>
                            {detail}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-light-text dark:text-dark-text font-medium">
                        {appointment.service_detail}
                      </div>
                    )}
                    <div className="text-light-text/80 dark:text-dark-text/80 text-[14px] mt-1">
                      {appointment.service_label || t("doctor")}:{" "}
                      {appointment.service_name}
                    </div>
                  </div>

                  {/* Right column: record number and confirmation status */}
                  <div className="col-span-1 text-right">
                    <div className="text-light-text dark:text-dark-text">
                      {t("recordNumber")}
                      {appointment.number}
                    </div>

                    <div
                      className={`text-sm mt-1`}
                      style={{ color: appointment?.acceptance_status?.color }}
                    >
                      {appointment?.acceptance_status?.text}
                    </div>
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="sm:hidden">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-base font-medium text-light-text dark:text-dark-text">
                        {appointment.date}
                      </div>
                      <div className="mt-1 flex items-center">
                        <div className="mr-2">{statusDetails.icon}</div>
                        {statusDetails.text}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-light-text dark:text-dark-text text-sm">
                        {t("recordNumber")}
                        {appointment.number}
                      </div>

                      <div
                        style={{ color: appointment?.acceptance_status?.color }}
                        className="text-xs"
                      >
                        {appointment?.acceptance_status?.text}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-light-text dark:text-dark-text font-medium">
                      {appointment.service_detail}
                    </div>
                    <div className="text-light-text/80 dark:text-dark-text/80 text-xs mt-1">
                      {t("doctor")} {appointment.service_name}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="w-full bg-[#00C78B] dark:bg-light-accent text-white py-3 sm:py-4 rounded-xl hover:bg-[#00b57d] dark:hover:opacity-90 transition-colors duration-300 mt-4 text-sm sm:text-base font-medium"
            >
              {loadingMore ? t("loading") : t("loadMore")}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
