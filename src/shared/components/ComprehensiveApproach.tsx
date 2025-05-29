// src/shared/components/ComprehensiveApproach.tsx
"use client";

import React, { useState, ReactElement, useEffect } from "react";
import { useThemeStore } from "@/src/store/theme";
import {
  BrainIcon,
  ClipboardIcon,
  DocumentIcon,
  HeartIconk2,
  MedicalTrackerIcon,
  PencilIcon,
} from "../ui/Icon";
import { useLanguageStore } from "@/src/store/language";
import { usePartnersStore } from "@/src/store/partners";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactElement;
  isActive?: boolean;
}

export default function ComprehensiveApproach(): JSX.Element {
  const { theme } = useThemeStore();
  const { currentLocale } = useLanguageStore();

  // Используем стор
  const { fetchPartners, loading, error, getServiceCards } = usePartnersStore();

  // Получаем данные для сервисных карточек
  const serviceCardsData = getServiceCards();

  // Загрузка данных при монтировании компонента и при изменении языка
  useEffect(() => {
    fetchPartners(currentLocale);
  }, [currentLocale]);

  const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    description,
    icon,
    isActive = false,
  }) => {
    const [hover, setHover] = useState<boolean>(isActive);

    const bgColor = hover
      ? "bg-light-accent text-white"
      : theme === "light"
      ? "bg-white"
      : "bg-dark-block";

    const textColor = hover
      ? "text-white"
      : theme === "light"
      ? "text-light-text"
      : "text-dark-text";

    // Create a clone of the icon with the appropriate color and size props
    const iconWithColor = React.cloneElement(icon, {
      color: hover
        ? "#FFFFFF" // White when hovering (both light and dark mode)
        : theme === "light"
        ? "#094A54"
        : "#FFFFFF", // Default color based on theme
      size: 80, // Set icon size to 80px
    });

    return (
      <div
        className={`p-6 rounded-xl min-h-[340px] h-full ${bgColor} flex flex-col relative transition-colors duration-300`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(isActive)}
      >
        {/* Круглая точка в правом верхнем углу */}
        <div
          className={`absolute top-4 right-4 w-3 h-3 md:w-4 md:h-4 rounded-full ${
            hover
              ? "bg-white"
              : theme === "light"
              ? "bg-gray-100"
              : "bg-gray-700"
          } transition-colors duration-300`}
        ></div>

        <h3 className={`text-xl mb-auto md:text-2xl font-medium ${textColor}`}>
          {title}
        </h3>

        <div className="flex justify-center items-center my-8">
          {iconWithColor}
        </div>

        <p className={`mt-auto ${textColor} text-base leading-relaxed`}>
          {description}
        </p>
      </div>
    );
  };

  // Данные для карточек по умолчанию, если данные из API не загружены
  const defaultServiceCards = {
    ru: [
      {
        title: "Комплексные медицинские осмотры",
        description:
          "Регулярная диагностика и оценка состояния здоровья персонала с использованием передовых технологий для раннего выявления заболеваний",
        icon: <MedicalTrackerIcon />,
      },
      {
        title: "Корпоративное страхование",
        description: "Индивидуально разработанные страховые программы",
        icon: <DocumentIcon />,
      },
      {
        title: "Профилактика и вакцинация",
        description: "Разработка и внедрение мер по профилактике заболеваний",
        icon: <PencilIcon />,
      },
      {
        title: "Выездные медицинские услуги",
        description:
          "Организация выездных осмотров и консультаций в офисе, что позволяет сэкономить время сотрудников и обеспечить оперативную помощь",
        icon: <ClipboardIcon />,
      },
      {
        title: "Персонализированное сопровождение",
        description:
          "Индивидуальный подход к каждому клиенту: от разработки программы обследований до поддержки корпоративных проектов по улучшению здоровья",
        icon: <HeartIconk2 />,
      },
    ],
    uz: [
      {
        title: "Kompleks tibbiy ko'rik",
        description:
          "Xodimlarning sog'lig'ini muntazam tekshirish va zamonaviy texnologiyalar yordamida kasalliklarni erta aniqlash",
        icon: <MedicalTrackerIcon />,
      },
      {
        title: "Korporativ sug'urta",
        description: "Individual ishlab chiqilgan sug'urta dasturlari",
        icon: <DocumentIcon />,
      },
      {
        title: "Profilaktika va emlash",
        description:
          "Kasalliklarning oldini olish choralarini ishlab chiqish va joriy etish",
        icon: <PencilIcon />,
      },
      {
        title: "Tashqi tibbiy xizmatlar",
        description:
          "Ofisda tashqi ko'rik va maslahatlar tashkil etish, bu xodimlarning vaqtini tejash va tezkor yordam ko'rsatish imkonini beradi",
        icon: <ClipboardIcon />,
      },
      {
        title: "Individual hamrohlik",
        description:
          "Har bir mijozga individual yondashuv: tekshiruv dasturlarini ishlab chiqishdan tortib, sog'likni yaxshilash bo'yicha korporativ loyihalarni qo'llab-quvvatlashgacha",
        icon: <HeartIconk2 />,
      },
    ],
  };

  // Заголовки и подзаголовки для разных языков
  const translations = {
    ru: {
      title: "Комплексный подход к здоровью сотрудников",
      subtitle:
        "Повышаем уровень заботы о персонале с помощью удобного и качественного медицинского сопровождения",
    },
    uz: {
      title: "Xodimlarning sog'lig'iga kompleks yondashuv",
      subtitle:
        "Qulay va sifatli tibbiy hamrohlik orqali xodimlarga g'amxo'rlik darajasini oshiramiz",
    },
  };

  // Иконки для карточек из API (если нет SVG)
  const iconComponents = [
    <MedicalTrackerIcon key="tracker" />,
    <DocumentIcon key="document" />,
    <PencilIcon key="pencil" />,
    <ClipboardIcon key="clipboard" />,
    <HeartIconk2 key="heart" />,
  ];

  // Используем данные из API, если они есть, иначе используем дефолтные для текущего языка
  const serviceCards =
    serviceCardsData.length > 0
      ? serviceCardsData.map((item, index) => ({
          title: item.title,
          description: item.subtitle,
          icon: iconComponents[index % iconComponents.length],
        }))
      : defaultServiceCards[currentLocale as keyof typeof defaultServiceCards];

  return (
    <div className="mt-20">
      {/* Заголовок и подзаголовок */}
      <div className="flex flex-col md:flex-row justify-between mb-10">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text leading-tight">
            {translations[currentLocale as keyof typeof translations].title}
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg md:text-xl text-light-text dark:text-dark-text">
            {translations[currentLocale as keyof typeof translations].subtitle}
          </p>
        </div>
      </div>

      {/* Первый ряд карточек - по 2 блока слева и 1 блок справа */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Левый большой блок - 50% */}
        <div className="md:col-span-2">
          <ServiceCard
            title={serviceCards[0].title}
            description={serviceCards[0].description}
            icon={serviceCards[0].icon}
          />
        </div>
        {/* Первый правый блок - 25% */}
        <div className="md:col-span-1">
          <ServiceCard
            title={serviceCards[1].title}
            description={serviceCards[1].description}
            icon={serviceCards[1].icon}
          />
        </div>
        {/* Второй правый блок - 25% */}
        <div className="md:col-span-1">
          <ServiceCard
            title={serviceCards[2].title}
            description={serviceCards[2].description}
            icon={serviceCards[2].icon}
          />
        </div>
      </div>

      {/* Второй ряд карточек - 2 блока по 50% */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ServiceCard
            title={
              serviceCards[3]
                ? serviceCards[3].title
                : defaultServiceCards[
                    currentLocale as keyof typeof defaultServiceCards
                  ][3].title
            }
            description={
              serviceCards[3]
                ? serviceCards[3].description
                : defaultServiceCards[
                    currentLocale as keyof typeof defaultServiceCards
                  ][3].description
            }
            icon={
              serviceCards[3]
                ? serviceCards[3].icon
                : defaultServiceCards[
                    currentLocale as keyof typeof defaultServiceCards
                  ][3].icon
            }
          />
        </div>
        <div>
          <ServiceCard
            title={
              serviceCards[4]
                ? serviceCards[4].title
                : defaultServiceCards[
                    currentLocale as keyof typeof defaultServiceCards
                  ][4].title
            }
            description={
              serviceCards[4]
                ? serviceCards[4].description
                : defaultServiceCards[
                    currentLocale as keyof typeof defaultServiceCards
                  ][4].description
            }
            icon={
              serviceCards[4]
                ? serviceCards[4].icon
                : defaultServiceCards[
                    currentLocale as keyof typeof defaultServiceCards
                  ][4].icon
            }
          />
        </div>
      </div>
    </div>
  );
}
