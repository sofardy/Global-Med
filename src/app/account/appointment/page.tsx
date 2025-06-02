// src/app/account/appointment/page.tsx
"use client";

import { API_BASE_URL } from "@/src/config/constants";
import { useTranslation } from "@/src/hooks/useTranslation";
import AppointmentConfirmation from "@/src/shared/components/AppointmentConfirmation";
import { ArrowDownIcon } from "@/src/shared/ui/Icon";
import { useLanguageStore } from "@/src/store/language";
import { useThemeStore } from "@/src/store/theme";
import { AnalysisItem } from "@/src/types/analysis";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fetchAnalyses } from "../../api/analyses";
import { CheckupItem, fetchCheckups } from "../../api/checkups";
import { Doctor as ApiDoctor, getDoctors } from "../../api/doctors";
import DoctorCard from "./components/DoctorCard";

// Интерфейс для специализаций
interface Specialization {
  uuid: string;
  name: string;
}

// Типы для строгой типизации
type ServiceType = "doctor" | "analysis" | "checkup";
type AppointmentType = "primary" | "secondary";

// Переводы для компонента
const translations = {
  ru: {
    title: "Онлайн-запись",
    alertMessage:
      "Обратите внимание: пациенты, записавшиеся на чек-ап, проходят прием у врачей и сдают анализы вне очереди. В связи с этим время вашей записи может сдвинуться на 10-15 минут.",
    selectService: "Выберите услугу",
    selectSpecialty: "Выберите направление",
    serviceOptions: [
      { value: "doctor", label: "Прием у врача" },
      { value: "analysis", label: "Сдача анализов" },
      { value: "checkup", label: "Прохождение чек-апа" },
    ],
    selectDoctor: "Выберите врача",
    primaryAppointment: "Первичный прием",
    secondaryAppointment: "Повторный прием",
    selectDate: "Выберите дату",
    selectTime: "Выберите время",
    emptyTime: "--:--",
    bookAnalysis: "Записаться на сдачу анализов",
    bookCheckup: "Записаться на прохождение чек-апа",
    pleaseSelectTime: "Пожалуйста, выберите время",
    loading: "Загрузка...",
    loadingSpecializations: "Загрузка специализаций...",
    errorLoading: "Ошибка при загрузке данных",
    noResults: "Нет доступных вариантов",
    tryAgain: "Попробовать снова",
    appointmentSuccess: "Вы успешно записались на прием!",
    appointmentError:
      "Ошибка при записи на прием. Пожалуйста, попробуйте позже.",
    unauthorized: "Необходима авторизация для записи на прием",
    selectAnalysisType: "Выберите тип анализа",
    selectCheckupProgram: "Выберите программу чек-апа",
    notFound: "Не удалось найти выбранную услугу",
  },
  uz: {
    title: "Onlayn yozilish",
    alertMessage: `Diqqat: tekshiruvga yozilgan bemorlar navbatsiz shifokorlar qabulidan o'tadilar va tahlil topshiradilar. Shu sababli sizning yozilish vaqtingiz 10-15 daqiqaga siljishi mumkin.`,
    selectService: "Xizmatni tanlang",
    selectSpecialty: `Yo'nalishni tanlang`,
    serviceOptions: [
      { value: "doctor", label: "Shifokor qabuli" },
      { value: "analysis", label: "Tahlil topshirish" },
      { value: "checkup", label: `Tekshiruvdan o'tish` },
    ],
    selectDoctor: "Shifokorni tanlang",
    primaryAppointment: "Dastlabki qabul",
    secondaryAppointment: "Takroriy qabul",
    selectDate: "Sanani tanlang",
    selectTime: "Vaqtni tanlang",
    emptyTime: "--:--",
    bookAnalysis: "Tahlil topshirishga yozilish",
    bookCheckup: `Tekshiruvdan o'tishga yozilish`,
    pleaseSelectTime: "Iltimos, vaqtni tanlang",
    loading: "Yuklanmoqda...",
    loadingSpecializations: "Ixtisosliklar yuklanmoqda...",
    errorLoading: `Ma'lumotlarni yuklashda xatolik`,
    noResults: "Mavjud variantlar yo'q",
    tryAgain: "Qayta urinib ko'ring",
    appointmentSuccess: "Siz muvaffaqiyatli qabulga yozildingiz!",
    appointmentError:
      "Qabulga yozilishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
    unauthorized: "Avtorizatsiya talab qilinadi",
    selectAnalysisType: "Tahlil turini tanlang",
    selectCheckupProgram: "Tekshiruv dasturini tanlang",
    notFound: "Tanlangan xizmat topilmadi",
  },
  en: {
    title: "Online Appointment",
    alertMessage:
      "Please note: patients who have booked a check-up receive priority for doctor appointments and tests. Therefore, your appointment time may be shifted by 10-15 minutes.",
    selectService: "Select Service",
    selectSpecialty: "Select Specialty",
    serviceOptions: [
      { value: "doctor", label: "Doctor Appointment" },
      { value: "analysis", label: "Medical Tests" },
      { value: "checkup", label: "Health Check-up" },
    ],
    selectDoctor: "Select Doctor",
    primaryAppointment: "Primary Appointment",
    secondaryAppointment: "Follow-up Appointment",
    selectDate: "Select Date",
    selectTime: "Select Time",
    emptyTime: "--:--",
    bookAnalysis: "Book Medical Tests",
    bookCheckup: "Book Health Check-up",
    pleaseSelectTime: "Please select a time",
    loading: "Loading...",
    loadingSpecializations: "Loading specializations...",
    errorLoading: "Error loading data",
    noResults: "No available options",
    tryAgain: "Try Again",
    appointmentSuccess: "You have successfully booked your appointment!",
    appointmentError: "Error booking appointment. Please try again later.",
    unauthorized: "Authorization required for booking",
    selectAnalysisType: "Select Test Type",
    selectCheckupProgram: "Select Check-up Program",
    notFound: "Selected service not found",
  },
};

// Функция для получения специализаций с сервера
const fetchSpecializations = async (): Promise<Specialization[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/specializations`);
    console.log("Получены специализации:", response.data);
    return response.data.data || [];
  } catch (error) {
    console.error("Ошибка при загрузке специализаций:", error);
    return [];
  }
};

// Функция для отправки запроса на запись
const createAppointment = async (appointmentData: any) => {
  const token = window.localStorage.getItem("authToken");
  const tokenType = window.localStorage.getItem("tokenType");

  if (!token || !tokenType) {
    throw new Error("Unauthorized");
  }

  try {
    console.log("Sending appointment data:", appointmentData);
    const response = await axios.post(
      `${API_BASE_URL}/appointments`,
      appointmentData,
      {
        headers: {
          Authorization: `${tokenType} ${token}`,
          "X-Language": "ru",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

export default function DynamicAppointmentBooking() {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const { currentLocale } = useLanguageStore();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Состояния для управления формой бронирования
  const [selectedService, setSelectedService] = useState<ServiceType | "">("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedSpecialtyUuid, setSelectedSpecialtyUuid] =
    useState<string>("");
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isSpecialtyDropdownOpen, setIsSpecialtyDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [appointmentType, setAppointmentType] =
    useState<AppointmentType>("primary");
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Состояния для работы с API
  const [doctors, setDoctors] = useState<ApiDoctor[]>([]);
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [checkups, setCheckups] = useState<CheckupItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Состояние для специализаций
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loadingSpecializations, setLoadingSpecializations] =
    useState<boolean>(false);

  // Состояние для отображения врачей
  const [showDoctors, setShowDoctors] = useState(false);

  // Ссылки на выпадающие списки
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const specialtyDropdownRef = useRef<HTMLDivElement>(null);

  // Инициализация текущей даты
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  }, []);

  // Загрузка специализаций при первом рендере
  useEffect(() => {
    const loadSpecializations = async () => {
      try {
        setLoadingSpecializations(true);
        const data = await fetchSpecializations();
        setSpecializations(data);
      } catch (error) {
        console.error("Ошибка при загрузке специализаций:", error);
      } finally {
        setLoadingSpecializations(false);
      }
    };

    loadSpecializations();
  }, []);

  // Загрузка списка анализов или чек-апов при выборе услуги
  useEffect(() => {
    let isMounted = true;

    const loadServiceOptions = async () => {
      if (!selectedService) return;

      setLoading(true);
      try {
        if (selectedService === "analysis" && analyses.length === 0) {
          const response = await fetchAnalyses();
          if (isMounted) setAnalyses(response.data);
        } else if (selectedService === "checkup" && checkups.length === 0) {
          const response = await fetchCheckups();
          if (isMounted) setCheckups(response.data);
        }
      } catch (err) {
        if (isMounted) setError(t("errorLoading"));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadServiceOptions();

    return () => {
      isMounted = false;
    };
  }, [selectedService]);

  // Детекция мобильного устройства
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Обработка кликов вне выпадающих списков
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(e.target as Node)
      ) {
        setIsServiceDropdownOpen(false);
      }
      if (
        specialtyDropdownRef.current &&
        !specialtyDropdownRef.current.contains(e.target as Node)
      ) {
        setIsSpecialtyDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Сброс специальности при смене услуги
  useEffect(() => {
    setSelectedSpecialty("");
    setSelectedSpecialtyUuid("");
    setSelectedTime("");
    setShowDoctors(false);
    setDoctors([]);
  }, [selectedService]);

  // Форматирование даты и времени для API
  const formatDateTimeForApi = (date: string, time: string): string => {
    return `${date} ${time}:00`;
  };

  // Функция для загрузки докторов при выборе специальности
  const fetchDoctors = async (specialtyUuid?: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Загружаем докторов по specialtyUuid:", specialtyUuid);

      const filters: any = {};
      if (specialtyUuid) {
        filters.specialization_uuid = specialtyUuid;
      }

      console.log("Фильтры для запроса докторов:", filters);
      const response = await getDoctors(filters, 1, currentLocale);
      console.log("Ответ API докторов:", response);

      setDoctors(response.data);
      setShowDoctors(true);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError(t("errorLoading"));
    } finally {
      setLoading(false);
    }
  };

  // Обработчик изменения специальности
  const handleSpecialtyChange = (specialty: string) => {
    console.log("Выбрана специальность:", specialty);

    setSelectedSpecialty(specialty);
    setIsSpecialtyDropdownOpen(false);

    // Найдем UUID выбранной специальности
    if (selectedService === "doctor" && specialty) {
      // Находим специализацию по имени
      const spec = specializations.find((s) => s.name === specialty);

      if (spec) {
        console.log("Найден UUID для специальности:", spec.uuid);
        setSelectedSpecialtyUuid(spec.uuid);

        // Загружаем список докторов для выбранной специальности
        fetchDoctors(spec.uuid);
      } else {
        console.error("Не найдена специализация с именем:", specialty);
      }
    }
  };

  // Обработчик изменения услуги
  const handleServiceChange = (service: ServiceType) => {
    setSelectedService(service);
    setIsServiceDropdownOpen(false);
  };

  // Функция для форматирования данных с проверкой на корректность
  function formatDoctorData(apiDoctor: ApiDoctor) {
    return {
      id: apiDoctor.uuid,
      name: apiDoctor.full_name || "Н/Д",
      specialization: apiDoctor.specialization || "Специалист",
      experience: apiDoctor.experience_years || "Н/Д",
      qualification: apiDoctor.qualification || "Врач",
      category: apiDoctor.category || "",
      languages: formatLanguages(apiDoctor.languages),
      price: formatPrice(apiDoctor.price_from),
      photoUrl: apiDoctor.image_url || "/images/doctor-placeholder.png",
    };
  }

  // Вспомогательная функция для проверки содержательности поля
  function isValidField(value: string | null): boolean {
    return (
      value !== null &&
      value.length > 0 &&
      !["adipisci", "qui", "laboriosam", "eum", "omnis"].includes(value)
    );
  }

  // Форматирование языков
  function formatLanguages(languages: string | null): string[] {
    if (!languages) return ["русский", "узбекский"];
    return typeof languages === "string"
      ? languages.split(",").map((lang) => lang.trim())
      : ["русский", "узбекский"];
  }

  // Форматирование цены
  function formatPrice(price: string | null): string {
    if (!price) return "Уточняйте по телефону";
    const numPrice = parseInt(price, 10);
    if (isNaN(numPrice)) return "Уточняйте по телефону";
    return `от ${numPrice.toLocaleString()} сум`;
  }

  // Обработчик бронирования врача
  const handleDoctorBooking = async (bookingInfo: any) => {
    try {
      setIsSubmitting(true);

      // Подготовка данных для API
      const appointmentData = {
        bookable_type: "Doctor",
        uuid: bookingInfo.doctorId,
        start_at: formatDateTimeForApi(bookingInfo.date, bookingInfo.time),
      };

      // Отправка запроса на создание записи
      const response = await createAppointment(appointmentData);

      // Установка данных для отображения на странице подтверждения
      setBookingDetails({
        ...bookingInfo,
        service: "doctor",
        specialty: selectedSpecialty,
        appointmentType,
        number: response.number,
        cost: 125000, // Можно получать из API или других источников
      });

      setIsBooked(true);
    } catch (error) {
      console.error("Error booking doctor appointment:", error);

      // Обработка ошибки авторизации
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert(t("unauthorized"));
        router.push("/account/login");
        return;
      }

      alert(t("appointmentError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Обработчик бронирования анализов/чек-апа
  const handleServiceBooking = async () => {
    if (!selectedTime) {
      alert(t("pleaseSelectTime"));
      return;
    }

    try {
      setIsSubmitting(true);

      let serviceUuid = "";
      let bookableType = "";

      // Определяем тип услуги и UUID для запроса
      if (selectedService === "analysis") {
        // Ищем выбранный анализ в списке
        const selectedAnalysis = analyses.find(
          (item) =>
            item.name === selectedSpecialty || item.slug === selectedSpecialty
        );

        if (!selectedAnalysis) {
          throw new Error(t("notFound"));
        }

        serviceUuid = selectedAnalysis.uuid;
        bookableType = "MedicalTest"; // Корректный тип для API
      } else if (selectedService === "checkup") {
        // Ищем выбранный чек-ап в списке
        const selectedCheckup = checkups.find(
          (item) =>
            item.title === selectedSpecialty || item.slug === selectedSpecialty
        );

        if (!selectedCheckup) {
          throw new Error(t("notFound"));
        }

        serviceUuid = selectedCheckup.uuid;
        bookableType = "Checkup"; // Корректный тип для API
      }

      // Формируем запрос в соответствии с API
      const appointmentData = {
        bookable_type: bookableType,
        uuid: serviceUuid,
        start_at: formatDateTimeForApi(selectedDate, selectedTime),
      };

      console.log("Отправляем данные:", appointmentData);

      // Отправляем запрос
      const response = await createAppointment(appointmentData);

      // Устанавливаем данные для отображения подтверждения
      setBookingDetails({
        service: selectedService,
        specialty: selectedSpecialty,
        date: selectedDate,
        time: selectedTime,
        number: response.number,
        cost: selectedService === "analysis" ? 50000 : 200000,
      });

      setIsBooked(true);
    } catch (error) {
      console.error(`Error booking ${selectedService}:`, error);

      if (error instanceof Error) {
        alert(error.message);
      } else if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert(t("unauthorized"));
          router.push("/account/login");
          return;
        }

        const errorMessage =
          error.response?.data?.message || t("appointmentError");
        alert(errorMessage);
      } else {
        alert(t("appointmentError"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Получение списка специальностей в зависимости от выбранной услуги
  const getSpecialtiesByService = (): string[] => {
    if (!selectedService) return [];

    if (selectedService === "doctor") {
      return specializations.map((spec) => spec.name);
    } else if (selectedService === "analysis" && analyses.length > 0) {
      return analyses.map((item) => item.name);
    } else if (selectedService === "checkup" && checkups.length > 0) {
      return checkups.map((item) => item.title);
    }
    return [];
  };

  // Цвета для темного и светлого режима
  const cardBg = theme === "light" ? "bg-white" : "bg-dark-block";
  const textColor = theme === "light" ? "text-[#094A54]" : "text-white";
  const mutedTextColor =
    theme === "light" ? "text-[#094A5480]" : "text-gray-400";
  const borderColor =
    theme === "light" ? "border-[#094A5480]" : "border-gray-700";
  const inputBg = theme === "light" ? "bg-white" : "bg-dark-bg";

  // Получаем список услуг из переводов
  const services = t("serviceOptions", { returnObjects: true }) as Array<{
    value: string;
    label: string;
  }>;

  // Если бронирование подтверждено, показываем компонент подтверждения
  if (isBooked && bookingDetails) {
    // Получаем название услуги на основе ее типа
    const getServiceLabel = () => {
      const serviceOption = services.find(
        (s) => s.value === bookingDetails.service
      );
      return serviceOption ? serviceOption.label : "";
    };

    return (
      <AppointmentConfirmation
        type={bookingDetails.service}
        number={bookingDetails.number}
        date={bookingDetails.date || selectedDate}
        time={bookingDetails.time}
        address="г. Ташкент, ул. Янги Сергели, д. 35"
        service={`${getServiceLabel()}: ${bookingDetails.specialty}`}
        doctor={
          bookingDetails.service === "doctor" ? bookingDetails.name : undefined
        }
        cost={bookingDetails.cost}
      />
    );
  }

  return (
    <div className="">
      <div className={`${cardBg} rounded-2xl p-4 md:p-8 w-full mx-auto`}>
        <h1
          className={`text-2xl md:text-3xl lg:text-[40px] font-medium mb-4 md:mb-6 ${textColor} max-w-[700px]`}
        >
          {t("title")}
        </h1>

        {/* Блок информационного уведомления */}
        <div className={`flex items-start mb-6 md:mb-8 ${textColor}`}>
          <div className="flex-shrink-0 w-6 h-6 mr-3 mt-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1327_963)">
                <path
                  d="M9.99935 18.3327C14.6017 18.3327 18.3327 14.6017 18.3327 9.99935C18.3327 5.39698 14.6017 1.66602 9.99935 1.66602C5.39698 1.66602 1.66602 5.39698 1.66602 9.99935C1.66602 14.6017 5.39698 18.3327 9.99935 18.3327Z"
                  stroke={theme === "light" ? "#094A54" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 13.3333V10"
                  stroke={theme === "light" ? "#094A54" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 6.66602H10.0083"
                  stroke={theme === "light" ? "#094A54" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1327_963">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p className={`text-sm md:text-[16px] w-full md:w-[740px]`}>
            {t("alertMessage")}
          </p>
        </div>

        {/* Выбор услуги и специальности */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Выпадающий список услуг */}
          <div>
            <h2
              className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}
            >
              {t("selectService")}
            </h2>
            <div className="relative" ref={serviceDropdownRef}>
              <button
                type="button"
                onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                className={`
                  w-full h-12 md:h-14 px-4 rounded-xl border 
                  flex justify-between items-center 
                  focus:outline-none
                  ${borderColor} ${inputBg} ${textColor}
                `}
              >
                {services.find((s: any) => s.value === selectedService)
                  ?.label || t("selectService")}
                <ArrowDownIcon
                  size={12}
                  color={theme === "light" ? "#094A54" : "white"}
                  className={`transition-transform ${
                    isServiceDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isServiceDropdownOpen && (
                <div
                  className={`
                  absolute z-20 mt-1 w-full 
                  rounded-xl shadow-lg border 
                  overflow-hidden
                  ${cardBg} ${borderColor} ${textColor}
                `}
                >
                  {services.map((service: any) => (
                    <button
                      key={service.value}
                      className={`
                        w-full px-4 py-3 text-left 
                        hover:bg-light-accent/10 ${textColor}
                        ${
                          selectedService === service.value
                            ? "bg-light-accent/10"
                            : ""
                        }
                      `}
                      onClick={() =>
                        handleServiceChange(service.value as ServiceType)
                      }
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Выпадающий список специальностей */}
          <div>
            <h2
              className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}
            >
              {selectedService === "doctor"
                ? t("selectSpecialty")
                : selectedService === "analysis"
                ? t("selectAnalysisType")
                : selectedService === "checkup"
                ? t("selectCheckupProgram")
                : t("selectSpecialty")}
            </h2>
            <div className="relative" ref={specialtyDropdownRef}>
              <button
                type="button"
                onClick={() =>
                  setIsSpecialtyDropdownOpen(!isSpecialtyDropdownOpen)
                }
                disabled={!selectedService || loading || loadingSpecializations}
                className={`
                  w-full h-12 md:h-14 px-4 rounded-xl border 
                  flex justify-between items-center 
                  focus:outline-none
                  ${borderColor} ${inputBg} ${textColor}
                  ${
                    !selectedService || loading || loadingSpecializations
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                `}
              >
                {loadingSpecializations
                  ? t("loadingSpecializations")
                  : loading
                  ? t("loading")
                  : selectedSpecialty ||
                    (selectedService === "doctor"
                      ? t("selectSpecialty")
                      : selectedService === "analysis"
                      ? t("selectAnalysisType")
                      : selectedService === "checkup"
                      ? t("selectCheckupProgram")
                      : t("selectSpecialty"))}
                <ArrowDownIcon
                  size={12}
                  color={theme === "light" ? "#094A54" : "white"}
                  className={`transition-transform ${
                    isSpecialtyDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isSpecialtyDropdownOpen &&
                selectedService &&
                !loading &&
                !loadingSpecializations && (
                  <div
                    className={`
                  absolute z-20 mt-1 w-full
                  rounded-xl shadow-lg border 
                  overflow-hidden max-h-80 overflow-y-auto
                  ${cardBg} ${borderColor} ${textColor}
                `}
                  >
                    {getSpecialtiesByService().map((specialty) => (
                      <button
                        key={specialty}
                        className={`
                        w-full px-4 py-3 text-left 
                        hover:bg-light-accent/10 ${textColor}
                    ${
                      selectedSpecialty === specialty
                        ? "bg-light-accent/10"
                        : ""
                    }
                      `}
                        onClick={() => handleSpecialtyChange(specialty)}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Тип приема для врачей */}
        {selectedService === "doctor" && selectedSpecialty && (
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <button
                type="button"
                onClick={() => setAppointmentType("primary")}
                className="flex items-center cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    appointmentType === "primary"
                      ? "border-[#00C78B]"
                      : borderColor
                  }`}
                >
                  {appointmentType === "primary" && (
                    <div className="w-4 h-4 rounded-full bg-[#00C78B]"></div>
                  )}
                </div>
                <span className={`ml-3 ${textColor}`}>
                  {t("primaryAppointment")}
                </span>
              </button>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setAppointmentType("secondary")}
                className="flex items-center cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    appointmentType === "secondary"
                      ? "border-[#00C78B]"
                      : borderColor
                  }`}
                >
                  {appointmentType === "secondary" && (
                    <div className="w-4 h-4 rounded-full bg-[#00C78B]"></div>
                  )}
                </div>
                <span className={`ml-3 ${textColor}`}>
                  {t("secondaryAppointment")}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Секция выбора врача - отображается при выборе услуги "Прием у врача" и специальности */}
        {selectedService === "doctor" && selectedSpecialty && showDoctors && (
          <div>
            <h2
              className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}
            >
              {t("selectDoctor")}
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
                <span className="ml-3 text-light-text dark:text-dark-text">
                  {t("loading")}
                </span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-4">
                  <p>{error}</p>
                </div>
                <button
                  onClick={() => {
                    fetchDoctors(selectedSpecialtyUuid);
                  }}
                  className="px-4 py-2 bg-light-accent text-white rounded-lg"
                >
                  {t("tryAgain")}
                </button>
              </div>
            ) : doctors.length === 0 ? (
              <div className="flex justify-center py-10">
                <div className="text-light-text/70 dark:text-dark-text/70 text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-light-accent/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xl">{t("noResults")}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {doctors.map((doctor) => {
                  const formattedDoctor = formatDoctorData(doctor);

                  return (
                    <DoctorCard
                      key={doctor.uuid}
                      doctor={{
                        id: formattedDoctor.id,
                        name: formattedDoctor.name,
                        specialty: formattedDoctor.specialization,
                        experience: formattedDoctor.experience,
                        qualification: formattedDoctor.qualification,
                        category: formattedDoctor.category,
                        languages: formattedDoctor.languages,
                        price: formattedDoctor.price,
                        photoUrl: formattedDoctor.photoUrl,
                        availableTimes: [
                          "09:00",
                          "10:00",
                          "11:00",
                          "12:00",
                          "14:00",
                          "15:00",
                        ],
                      }}
                      onBookAppointment={handleDoctorBooking}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Выбор даты и времени для анализов и чек-апа */}
        {(selectedService === "analysis" || selectedService === "checkup") &&
          selectedSpecialty && (
            <div className="flex flex-col w-full max-w-[500px] mt-6 md:mt-20 gap-4 md:gap-6 mb-6">
              <div>
                <h2
                  className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}
                >
                  {t("selectDate")}
                </h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
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
                  onChange={(e) => setSelectedTime(e.target.value)}
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
                  {[
                    "08:00",
                    "09:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                  ].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

        {/* Кнопка бронирования для анализов и чек-апа */}
        {(selectedService === "analysis" || selectedService === "checkup") &&
          selectedSpecialty &&
          selectedTime && (
            <button
              onClick={handleServiceBooking}
              disabled={isSubmitting}
              className="h-12 md:h-14 bg-[#00C78B] w-full max-w-[500px] px-4 md:px-10 text-white rounded-xl hover:bg-[#00a87a] transition-colors flex items-center justify-center disabled:bg-[#00C78B]/70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("loading")}
                </>
              ) : selectedService === "analysis" ? (
                t("bookAnalysis")
              ) : (
                t("bookCheckup")
              )}
            </button>
          )}
      </div>
    </div>
  );
}
