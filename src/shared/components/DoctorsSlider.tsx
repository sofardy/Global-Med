/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "@/src/hooks/useTranslation";
import { useDoctorsStore } from "@/src/store/doctors";
import { useHomeStore } from "@/src/store/home";
import React, { useEffect } from "react";
import { UniversalSlider } from "../components/UniversalSlider";
import { DoctorCard } from "./DoctorCard";

// Translations
const translations = {
  ru: {
    buttonText: "Записаться на прием",
    prevSlide: "Предыдущий слайд",
    nextSlide: "Следующий слайд",
    loading: "Загрузка врачей...",
    error: "Не удалось загрузить список врачей",
  },
  uz: {
    buttonText: "Qabulga yozilish",
    prevSlide: "Oldingi slayd",
    nextSlide: "Keyingi slayd",
    loading: "Shifokorlar yuklanmoqda...",
    error: "Shifokorlar ro'yxatini yuklab bo'lmadi",
  },
  en: {
    buttonText: "Schedule an Appointment",
    prevSlide: "Previous slide",
    nextSlide: "Next slide",
    loading: "Loading doctors...",
    error: "Failed to load the list of doctors",
  },
};

export interface DoctorsSliderProps {
  className?: string;
}

export const DoctorsSlider: React.FC<DoctorsSliderProps> = ({
  className = "",
}) => {
  const { team, isLoading }: any = useHomeStore();
  const { t } = useTranslation(translations);
  const { doctors, loading, error, fetchDoctors } = useDoctorsStore();

  // Загрузка докторов при монтировании компонента
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Разделение текста на строки для лучшей презентации
  const splitTextIntoLines = (text: string, lineCount: number) => {
    if (!text) return [];

    const words = text.split(" ");
    const wordsPerLine = Math.ceil(words.length / lineCount);

    const lines = [];
    for (let i = 0; i < lineCount; i++) {
      const startIndex = i * wordsPerLine;
      const endIndex = Math.min(startIndex + wordsPerLine, words.length);
      if (startIndex < words.length) {
        lines.push(words.slice(startIndex, endIndex).join(" "));
      }
    }

    return lines;
  };

  // Создание компонента заголовка с разрывами строк
  const titleComponent = (
    <h2
      dangerouslySetInnerHTML={{
        __html: team?.title,
      }}
      className="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text leading-tight"
    ></h2>
  );

  // Создание компонента описания с разрывами строк
  const descriptionComponent = (
    <p
      dangerouslySetInnerHTML={{
        __html: team?.subtitle,
      }}
      className="text-base md:text-lg text-light-text dark:text-dark-text"
    ></p>
  );

  // Обработка состояний загрузки и ошибки
  if (loading) {
    return (
      <div className="flex justify-center items-center h-80 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
        <span className="ml-3 text-light-text dark:text-dark-text">
          {t("loading")}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500 w-full">
        <p>{t("error")}</p>
      </div>
    );
  }

  // Создание слайдов с карточками врачей из API
  const slides = doctors.map((doctor) => (
    <DoctorCard
      key={doctor.uuid}
      id={doctor.uuid}
      link={doctor.slug}
      name={doctor.full_name}
      specialization={doctor.specialization}
      image={doctor.image_url}
      buttonText={t("buttonText")}
      className="h-full"
    />
  ));

  // Если докторов нет
  if (slides.length === 0) {
    return (
      <div className="text-center p-10 text-light-text dark:text-dark-text w-full">
        <p>Нет доступных врачей</p>
      </div>
    );
  }

  return (
    <UniversalSlider
      slides={slides}
      title={titleComponent}
      description={descriptionComponent}
      slidesPerMobileView={1}
      slidesPerView={1}
      slidesPerView768={3}
      slidesPerView1024={4}
      spaceBetween={20}
      showNavigation={true}
      navigationPrevLabel={t("prevSlide")}
      navigationNextLabel={t("nextSlide")}
      showPagination={false}
      loop={true}
      className={`${className} doctors-slider`}
      wrapperClassName="mt-20"
    />
  );
};
