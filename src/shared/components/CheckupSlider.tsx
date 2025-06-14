/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CheckupItem } from "@/src/app/api/checkups";
import { useCheckups } from "@/src/hooks/useCheckups";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useHomeStore } from "@/src/store/home";
import { useLanguageStore } from "@/src/store/language";
import { useThemeStore } from "@/src/store/theme";
import React from "react";
import { UniversalCard } from "../components/UniversalCard";
import { UniversalSlider } from "../components/UniversalSlider";
import { ButterflyLogoSmallIcon, PregnancyIcon } from "../ui/Icon";

// Локализация
const translations = {
  ru: {
    title: "Пройдите чек-ап за один визит",
    description:
      "Быстрое обследование для выявления скрытых заболеваний и контроля за состоянием здоровья",
    prevSlide: "Предыдущий слайд",
    nextSlide: "Следующий слайд",
    loading: "Загрузка чек-апов...",
    error: "Не удалось загрузить данные чек-апов",
    detailsButton: "Подробнее",
    checks: "исследований",
    time: "часа",
    minutes: "минут",
    hour: "час",
    hours: "часов",
    minute: "минута",
    minutesGenitive: "минут",
  },
  uz: {
    title: "Bir tashrif davomida tekshiruvdan o'ting",
    description:
      "Yashirin kasalliklarni aniqlash va sog'lig'ingizni nazorat qilish uchun tezkor tekshiruv",
    prevSlide: "Oldingi slayd",
    nextSlide: "Keyingi slayd",
    loading: "Tekshiruvlar yuklanmoqda...",
    error: "Tekshiruvlar ma'lumotlarini yuklab bo'lmadi",
    detailsButton: "Batafsil",
    checks: "tekshiruv",
    time: "soat",
    minutes: "daqiqa",
    hour: "soat",
    hours: "soat",
    minute: "daqiqa",
    minutesGenitive: "daqiqa",
  },
  en: {
    title: "Complete your check-up in one visit",
    description:
      "Quick examination to detect hidden diseases and monitor your health condition",
    prevSlide: "Previous slide",
    nextSlide: "Next slide",
    loading: "Loading check-ups...",
    error: "Failed to load check-up data",
    detailsButton: "Learn More",
    checks: "tests",
    time: "hours",
    minutes: "minutes",
    hour: "hour",
    hours: "hours",
    minute: "minute",
    minutesGenitive: "minutes",
  },
};

// Разделение текста на строки

export interface CheckupSliderProps {
  title?: string;
  description?: string;
  className?: string;
}

export const CheckupSlider: React.FC<CheckupSliderProps> = ({
  title,
  description,
  className,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const { currentLocale } = useLanguageStore();
  const { checkups: checkupsText, isLoading }: any = useHomeStore();
  // Используем существующий хук для получения чек-апов
  const { checkups, loading, error } = useCheckups(currentLocale);

  // Готовим заголовок с разбивкой на строки
  const formattedTitle = (
    <p
      dangerouslySetInnerHTML={{
        __html: checkupsText?.title,
      }}
      className="text-3xl md:text-[40px] font-bold text-light-text dark:text-dark-text"
    ></p>
  );

  // Готовим описание с разбивкой на строки
  const formattedDescription = (
    <div className="flex flex-col">
      <div className="mb-4 w-full">
        <p
          dangerouslySetInnerHTML={{
            __html: checkupsText?.subtitle,
          }}
          className="text-light-text dark:text-dark-text text-base md:text-lg"
        ></p>
      </div>
    </div>
  );

  // Если данные загружаются
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

  // Если произошла ошибка
  if (error) {
    return (
      <div className="text-center p-10 text-red-500 w-full">
        <p>{t("error")}</p>
      </div>
    );
  }

  const formatDuration = (duration: string | number | undefined): string => {
    // Если duration не передан или не является числом, возвращаем значение по умолчанию
    if (duration === undefined || duration === null) {
      return `2 ${t("hours")}`;
    }

    // Преобразуем входное значение в число минут
    const minutes =
      typeof duration === "string" ? parseInt(duration, 10) : duration;

    // Если не удалось преобразовать в число, возвращаем значение по умолчанию
    if (isNaN(minutes)) {
      return `2 ${t("hours")}`;
    }

    // Преобразуем минуты в часы и минуты
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Функция для получения правильной формы слова "час" в русском языке
    const getHourForm = (hours: number): string => {
      if (currentLocale === "ru") {
        if (hours === 1) return t("hour");
        if (hours >= 2 && hours <= 4) return t("time"); // "часа"
        return t("hours"); // "часов"
      }
      // Для узбекского и английского используем базовые формы
      return hours === 1 ? t("hour") : t("hours");
    };

    // Функция для получения правильной формы слова "минута" в русском языке
    const getMinuteForm = (minutes: number): string => {
      if (currentLocale === "ru") {
        if (minutes === 1) return t("minute");
        if (minutes >= 2 && minutes <= 4) return "минуты";
        return t("minutesGenitive"); // "минут"
      }
      // Для узбекского и английского используем базовые формы
      return minutes === 1 ? t("minute") : t("minutes");
    };

    // Формируем строку времени
    if (hours === 0) {
      return `${remainingMinutes} ${getMinuteForm(remainingMinutes)}`;
    } else if (remainingMinutes === 0) {
      return `${hours} ${getHourForm(hours)}`;
    } else {
      // Показываем часы и минуты отдельно для лучшей читаемости
      return `${hours} ${getHourForm(
        hours
      )} ${remainingMinutes} ${getMinuteForm(remainingMinutes)}`;
    }
  };
  // Создаем слайды с карточками из данных API
  const slides = checkups.map((checkup: CheckupItem) => {
    // Определяем иконку в зависимости от слага чек-апа
    const icon =
      checkup.slug.includes("pregnan") || checkup.slug.includes("mama") ? (
        <PregnancyIcon
          size={190}
          color={theme === "light" ? "#094A54" : "#ffffff"}
        />
      ) : (
        <ButterflyLogoSmallIcon
          size={190}
          color={theme === "light" ? "#094A54" : "#ffffff"}
        />
      );

    // Получаем количество исследований на основе списка тестов
    const investigationsCount = checkup.medical_tests?.length || 0;

    // Правильно форматируем время прохождения чек-апа
    const timeRequired = formatDuration(checkup.duration);

    // Создаем карточку
    return (
      <UniversalCard
        key={checkup.uuid}
        title={checkup.title}
        description={checkup.card_description || checkup.mini_description}
        investigationsCount={investigationsCount}
        timeRequired={timeRequired}
        buttonText={t("detailsButton")}
        link={`/checkups/${checkup.slug}`}
        icon={checkup.icon}
        variant="family"
        className="min-h-[430px] hover:shadow-lg transition-all duration-300 relative"
        bordered={true}
        borderRadius="2xl"
        padding="0"
        hoverColor={
          theme === "light"
            ? "bg-light-accent hover:bg-light-accent"
            : "bg-dark-accent hover:bg-dark-accent"
        }
        styles={{
          container: { padding: "40px", position: "relative" },
          title: {
            fontFamily: "Graphik LCG, sans-serif",
            fontWeight: 500,
            fontSize: "40px",
          },
          description: {
            fontFamily: "Graphik LCG, sans-serif",
            fontWeight: 400,
            fontSize: "18px",
          },
        }}
      />
    );
  });

  // Проверка, есть ли слайды для отображения
  if (slides.length === 0) {
    return (
      <div className="text-center p-10 text-light-text dark:text-dark-text w-full">
        <p>Нет доступных чек-апов</p>
      </div>
    );
  }

  return (
    <UniversalSlider
      slides={slides}
      title={formattedTitle}
      description={formattedDescription}
      slidesPerView={1}
      slidesPerMobileView={1}
      slidesPerView768={1}
      slidesPerView1024={2}
      spaceBetween={20}
      showNavigation={true}
      navigationPrevLabel={t("prevSlide")}
      navigationNextLabel={t("nextSlide")}
      showPagination={false}
      loop={true}
      className={className}
      titleClassName="text-3xl md:text-[40px] mt-20 font-bold text-light-text dark:text-dark-text"
      descriptionClassName="text-light-text dark:text-dark-text text-base md:text-lg"
      wrapperClassName="mt-20"
    />
  );
};
