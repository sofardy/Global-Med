"use client";

import { API_BASE_URL } from "@/src/config/constants";
import { useTranslation } from "@/src/hooks/useTranslation";
import { ContactInfo } from "@/src/shared/components/ContactInfo";
import Modal from "@/src/shared/components/Modal/Modal";
import { ArrowDownIcon } from "@/src/shared/ui/Icon";
import { useLanguageStore } from "@/src/store/language";
import { useThemeStore } from "@/src/store/theme";
import { formatPrice } from "@/src/utils/formatPrice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Doctor as ApiDoctor, getDoctors } from "../../api/doctors";

// Интерфейсы
interface DropdownPosition {
  top: number;
  left: number;
  width: number;
}

interface SpecialtiesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  specialties: Specialization[];
  onSelect: (specialty: Specialization | null) => void;
  placeholder: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  qualification: string;
  degree: string;
  languages: string[];
  cost: any;
  photoUrl: string;
  slug: string;
}

// Интерфейс для фильтров
interface DoctorFilters {
  name: string;
  specialtyUuid?: string;
}

// Интерфейс для специализации
interface Specialization {
  uuid: string;
  name: string;
}

// Переводы
const translations = {
  ru: {
    title: "Поиск врача",
    nameSearch: "Введите ФИО",
    specialtySearch: "Все специализации",
    findButton: "Найти врача",
    experience: "Стаж",
    qualification: "Высшая категория",
    languages: "Языки",
    cost: "Стоимость приема",
    phone: "Телефон для записи",
    detailsButton: "Подробнее о враче",
    appointmentButton: "Записаться на прием",
    years: "лет",
    modalTitle: "Выберите специализацию",
    loading: "Загрузка...",
    loadingSpecializations: "Загрузка специализаций...",
    error: "Ошибка при загрузке данных",
    noResults: "Врачи не найдены",
    tryAgain: "Попробовать снова",
    defaultLanguageRu: "русский",
    defaultLanguageUz: "узбекский",
    defaultQualification: "Высшая категория",
    phoneNumber: "+998 (71) 200-55-50",
  },
  uz: {
    title: "Shifokor qidirish",
    nameSearch: "Ism-sharifni kiriting",
    specialtySearch: "Barcha mutaxassisliklar",
    findButton: "Shifokornni topish",
    experience: "Tajriba",
    qualification: "Oliy toifa",
    languages: "Tillar",
    cost: "Qabul narxi",
    phone: "Yozilish uchun telefon",
    detailsButton: "Shifokor haqida batafsil",
    appointmentButton: "Qabulga yozilish",
    years: "yil",
    modalTitle: "Mutaxassislikni tanlang",
    loading: "Yuklanmoqda...",
    loadingSpecializations: "Mutaxassisliklar yuklanmoqda...",
    error: "Ma'lumotlarni yuklashda xatolik",
    noResults: "Shifokorlar topilmadi",
    tryAgain: "Qayta urinish",
    defaultLanguageRu: "Rus tili",
    defaultLanguageUz: "O'zbek tili",
    defaultQualification: "Oliy toifa",
    phoneNumber: "+998 (71) 200-55-50",
  },
  en: {
    title: "Find a Doctor",
    nameSearch: "Enter full name",
    specialtySearch: "All specialties",
    findButton: "Find Doctor",
    experience: "Experience",
    qualification: "Highest category",
    languages: "Languages",
    cost: "Consultation fee",
    phone: "Phone for appointment",
    detailsButton: "More about doctor",
    appointmentButton: "Book an appointment",
    years: "years",
    modalTitle: "Select specialty",
    loading: "Loading...",
    loadingSpecializations: "Loading specialties...",
    error: "Error loading data",
    noResults: "No doctors found",
    tryAgain: "Try again",
    defaultLanguageRu: "Russian",
    defaultLanguageUz: "Uzbek",
    defaultQualification: "Highest category",
    phoneNumber: "+998 (71) 200-55-50",
  },
};

// Компонент выпадающего списка с порталом
const SpecialtiesDropdown: React.FC<SpecialtiesDropdownProps> = ({
  isOpen,
  onClose,
  specialties,
  onSelect,
  placeholder,
  buttonRef,
}) => {
  const { theme } = useThemeStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    width: 0,
  });

  const updatePosition = (): void => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const bgColor = theme === "light" ? "bg-white" : "bg-dark-block";
  const borderColor = theme === "light" ? "border-gray-100" : "border-gray-700";
  const textColor = theme === "light" ? "text-gray-800" : "text-white";
  const textMutedColor = theme === "light" ? "text-gray-700" : "text-gray-300";

  return createPortal(
    <div
      ref={dropdownRef}
      className={`fixed ${bgColor} rounded-xl shadow-xl z-50 animate-dropdown border ${borderColor}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        maxHeight: "300px",
        overflowY: "auto",
      }}
    >
      <div className="py-2">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-4 py-2.5 ${textColor} hover:bg-light-accent/10 transition-colors font-medium`}
        >
          {placeholder}
        </button>

        <div className={`border-t my-1 ${borderColor}`}></div>

        {specialties.map((specialty) => (
          <button
            key={specialty.uuid}
            onClick={() => onSelect(specialty)}
            className={`w-full text-left px-4 py-2.5 ${textMutedColor} hover:bg-light-accent/10 hover:text-light-accent transition-colors flex items-center group`}
          >
            <span className="w-5 text-light-accent opacity-0 group-hover:opacity-100 transition-opacity">
              •
            </span>
            <span>{specialty.name}</span>
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
};

// Компонент карточки врача
const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);

  const cardBg = theme === "light" ? "bg-white" : "bg-dark-block";
  const textColor = theme === "light" ? "text-light-text" : "text-white";
  const mutedTextColor =
    theme === "light" ? "text-light-text/70" : "text-white/70";
  const borderColor =
    theme === "light" ? "border-[#094A5480]" : "border-gray-700";

  return (
    <div className={`${cardBg} rounded-2xl overflow-hidden mb-8`}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 p-6 md:p-10 flex justify-center md:block">
          <div className="w-48 md:w-full h-48 md:h-60 relative">
            <Image
              src={doctor.photoUrl}
              alt={doctor.name}
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        <div className="flex-1 px-6 py-10">
          <span className="text-light-accent text-sm mb-1 block">
            {doctor.specialty}
          </span>
          <h3 className={`text-xl md:text-2xl font-medium ${textColor} mb-4`}>
            {doctor.name}
          </h3>

          <div className="flex flex-wrap text-[#094A5480] items-center gap-x-1 mb-4">
            <span className={`${mutedTextColor}`}>
              {t("experience")} {doctor.experience} {t("years")}
            </span>
            <span className={`${mutedTextColor} mx-2`}>•</span>
            <span className={`${mutedTextColor}`}>{doctor.qualification}</span>
            {doctor.degree && (
              <>
                <span className={`${mutedTextColor} mx-2`}>•</span>
                <span className={`${mutedTextColor}`}>{doctor.degree}</span>
              </>
            )}
          </div>

          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <div className={`${mutedTextColor} font-bold`}>
              {t("languages")}:
            </div>
            <div className={textColor}>{doctor.languages.join(", ")}</div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className={`${mutedTextColor} font-bold`}>{t("cost")}:</div>
            <div className={textColor}>{doctor.cost}</div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10">
        <div className={`border-t ${borderColor}`}></div>
      </div>

      <div className={`px-6 md:px-10 py-6 md:py-8`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <Link href={`tel:+998712005550`}>
              <div className={`${mutedTextColor} text-[16px] font-bold`}>
                {t("phone")}
              </div>
              <div className={`${textColor} text-[16px]`}>
                {t("phoneNumber")}
              </div>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href={`/clinic/doctors/${doctor.slug}`}
              className="px-6 py-3 text-center border rounded-xl text-light-text dark:text-white border-light-text dark:border-white hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
            >
              {t("detailsButton")}
            </Link>
            <Link
              href="/account/appointment"
              className="px-6 py-3 text-center bg-light-accent text-white rounded-xl hover:bg-[#5ab696] transition-colors"
            >
              {t("appointmentButton")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchSection: React.FC<{
  onSearch: (name: string, specialtyUuid?: string) => void;
  specializations: Specialization[];
  loadingSpecializations: boolean;
}> = ({ onSearch, specializations, loadingSpecializations }) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const [nameQuery, setNameQuery] = useState("");
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<Specialization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const specialtyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleSelectSpecialty = (specialty: Specialization | null): void => {
    console.log("Выбрана специальность:", specialty);
    setSelectedSpecialty(specialty);
    setIsSpecialtyOpen(false);
    setIsModalOpen(false);
  };

  const handleSpecialtyButtonClick = (): void => {
    if (isMobile) {
      setIsModalOpen(true);
    } else {
      setIsSpecialtyOpen((prev) => !prev);
    }
  };

  const handleSearch = () => {
    const specialtyUuid = selectedSpecialty
      ? selectedSpecialty.uuid
      : undefined;
    console.log(
      "Поиск по имени:",
      nameQuery,
      "и специальности UUID:",
      specialtyUuid
    );
    onSearch(nameQuery, specialtyUuid);
  };

  const displaySpecialty = selectedSpecialty
    ? selectedSpecialty.name
    : t("specialtySearch");

  return (
    <div className="rounded-2xl overflow-hidden bg-light-accent text-white relative">
      {/* Фоновый паттерн */}
      <div
        className="absolute -top-[130px] -left-[250px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block"
        style={{
          backgroundImage: "url(/images/doctor-pattern.png)",
          backgroundSize: "contain",
          transform: "rotate(-30deg)",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="container px-6 md:px-10 py-8 md:py-10 relative z-10">
        <h1 className="text-2xl md:text-3xl font-medium mb-6 md:mb-0">
          {t("title")}
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-10">
          {/* Поиск по имени */}
          <div className="w-full md:w-auto md:flex-1">
            <div className="relative">
              <input
                type="text"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                placeholder={t("nameSearch")}
                className="w-full bg-white/20 border border-white/90 rounded-2xl h-12 md:h-[54px] px-4 md:px-6 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-white/60"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Поиск по специальности */}
          <div className="w-full md:w-auto md:flex-1">
            <div className="relative">
              <button
                ref={specialtyButtonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpecialtyButtonClick();
                }}
                disabled={loadingSpecializations}
                className={`w-full bg-white/20 border border-white/90 rounded-2xl h-12 md:h-[54px] px-4 md:px-6 text-left text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all flex justify-between items-center ${
                  loadingSpecializations ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <span>
                  {loadingSpecializations
                    ? t("loadingSpecializations")
                    : displaySpecialty}
                </span>
                <ArrowDownIcon color="white" />
              </button>
            </div>
          </div>

          {/* Кнопка поиска */}
          <button
            onClick={handleSearch}
            className="w-full md:w-[200px] h-12 md:h-[54px] rounded-2xl bg-white text-light-accent px-6 font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          >
            {t("findButton")}
          </button>
        </div>
      </div>

      {/* Выпадающие списки */}
      {isMounted && !isMobile && !loadingSpecializations && (
        <SpecialtiesDropdown
          isOpen={isSpecialtyOpen}
          onClose={() => setIsSpecialtyOpen(false)}
          specialties={specializations}
          onSelect={handleSelectSpecialty}
          placeholder={t("specialtySearch")}
          buttonRef={specialtyButtonRef}
        />
      )}

      {isMounted && isMobile && !loadingSpecializations && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={t("modalTitle")}
          position="bottom"
          size="full"
          theme="brand"
          showCloseButton={true}
          showCloseIcon={true}
          contentClassName="bg-white dark:bg-dark-block"
        >
          <div className="py-2">
            <button
              onClick={() => handleSelectSpecialty(null)}
              className="w-full text-left px-4 py-3 text-light-text dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-light-accent/10 rounded-lg transition-colors font-medium"
            >
              {t("specialtySearch")}
            </button>

            <div className="border-t my-1 border-gray-100 dark:border-gray-700"></div>

            {specializations.map((specialty) => (
              <button
                key={specialty.uuid}
                onClick={() => handleSelectSpecialty(specialty)}
                className="w-full text-left px-4 py-3 text-light-text dark:text-dark-text hover:bg-light-accent/10 hover:text-light-accent dark:hover:text-light-accent rounded-lg transition-colors flex items-center group"
              >
                <span className="w-5 text-light-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  •
                </span>
                <span>{specialty.name}</span>
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

const convertApiDoctorToUiDoctor = (apiDoctor: ApiDoctor, t: any): Doctor => {
  const languagesArray = apiDoctor.languages
    ? typeof apiDoctor.languages === "string"
      ? apiDoctor.languages.split(",").map((lang: string) => lang.trim())
      : [t("defaultLanguageRu"), t("defaultLanguageUz")]
    : [t("defaultLanguageRu"), t("defaultLanguageUz")];

  return {
    id: apiDoctor.uuid,
    name: apiDoctor.full_name,
    specialty: apiDoctor.specialization,
    experience: apiDoctor.experience_years.replace(/\D/g, ""),
    qualification: apiDoctor.category || t("defaultQualification"),
    degree: apiDoctor.qualification || "",
    languages: languagesArray,
    cost: apiDoctor.price_from
      .split(",")
      .map((price) => formatPrice(price.trim())),
    photoUrl: apiDoctor.image_url,
    slug: apiDoctor.slug,
  };
};

// Основной компонент страницы врачей
export default function DoctorsPage() {
  const { t } = useTranslation(translations);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentFilters, setCurrentFilters] = useState<DoctorFilters>({
    name: "",
    specialtyUuid: undefined,
  });

  // Состояние для специализаций
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const { currentLocale }: any = useLanguageStore();
  const [loadingSpecializations, setLoadingSpecializations] =
    useState<boolean>(true);
  // Функция для получения списка специализаций
  const fetchSpecializations = async (): Promise<Specialization[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/specializations`, {
        headers: {
          "X-Language": currentLocale,
        },
      });
      console.log("Получены специализации:", response.data);
      return response.data.data || [];
    } catch (error) {
      console.error("Ошибка при загрузке специализаций:", error);
      return [];
    }
  };

  // Получение списка специализаций при монтировании компонента
  useEffect(() => {
    const getSpecializations = async () => {
      setLoadingSpecializations(true);
      const data = await fetchSpecializations();
      setSpecializations(data);
      setLoadingSpecializations(false);
    };

    getSpecializations();
  }, []);

  const fetchDoctors = async (
    name?: string,
    specialtyUuid?: string,
    page?: number
  ) => {
    try {
      setLoading(true);
      setError(null);

      const filters: any = {};
      if (name && name.trim() !== "") {
        filters.full_name = name.trim();
      }
      if (specialtyUuid) {
        filters.specialization_uuid = specialtyUuid;
      }

      // Используем переданную страницу или текущую из состояния
      const pageToFetch = page !== undefined ? page : currentPage;

      console.log(
        "Отправляем запрос с фильтрами:",
        filters,
        "Страница:",
        pageToFetch
      );

      const response = await getDoctors(filters, pageToFetch);
      console.log("Получен ответ API:", response);

      const convertedDoctors = response.data.map((doctor: ApiDoctor) =>
        convertApiDoctorToUiDoctor(doctor, t)
      );
      setDoctors(convertedDoctors);
      setTotalPages(response.meta.last_page);
      setCurrentPage(response.meta.current_page);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  // Загрузка докторов при первом рендере
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Обработчик поиска с сохранением фильтров
  const handleSearch = (name: string, specialtyUuid?: string) => {
    console.log("Выполняется поиск с параметрами:", { name, specialtyUuid });
    // Сохраняем фильтры для пагинации
    setCurrentFilters({ name, specialtyUuid });
    // Сбрасываем страницу на первую при новом поиске
    setCurrentPage(1);
    // Выполняем поиск
    fetchDoctors(name, specialtyUuid);
  };

  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    console.log("Переход на страницу:", page, "с фильтрами:", currentFilters);

    setCurrentPage(page);

    fetchDoctors(currentFilters.name, currentFilters.specialtyUuid, page);
  };

  return (
    <main>
      {/* Блок поиска */}
      <SearchSection
        onSearch={handleSearch}
        specializations={specializations}
        loadingSpecializations={loadingSpecializations}
      />

      {/* Список врачей */}
      <div className="py-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
            <span className="ml-3 text-light-text dark:text-dark-text">
              {t("loading")}
            </span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-4">
              <p>{error}</p>
            </div>
            <button
              onClick={() =>
                fetchDoctors(currentFilters.name, currentFilters.specialtyUuid)
              }
              className="px-4 py-2 bg-light-accent text-white rounded-lg"
            >
              {t("tryAgain")}
            </button>
          </div>
        ) : doctors.length === 0 ? (
          <div className="flex justify-center py-20">
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
          <>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg ${
                          pageNum === currentPage
                            ? "bg-light-accent text-white"
                            : "border border-light-text/30 dark:border-white/30 hover:bg-light-text/5 dark:hover:bg-white/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Контактная информация */}
      <ContactInfo />

      {/* Стили анимации */}
      <style jsx global>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
            0 8px 10px -6px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </main>
  );
}
