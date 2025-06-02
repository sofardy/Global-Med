// src/shared/components/ComprehensiveApproach.tsx
"use client";

import { useLanguageStore } from "@/src/store/language";
import { usePartnersStore } from "@/src/store/partners";
import { useThemeStore } from "@/src/store/theme";
import React, { ReactElement, useState } from "react";
import {
  ClipboardIcon,
  DocumentIcon,
  HeartIconk2,
  MedicalTrackerIcon,
  PencilIcon,
} from "../ui/Icon";

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
  const { getServiceCards } = usePartnersStore();

  // Получаем данные для сервисных карточек
  const serviceCardsData = getServiceCards();

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
    en: [
      {
        title: "Comprehensive Medical Check-ups",
        description:
          "Regular health diagnostics and assessment of staff using advanced technologies for early disease detection",
        icon: <MedicalTrackerIcon />,
      },
      {
        title: "Corporate Insurance",
        description: "Individually designed insurance programs",
        icon: <DocumentIcon />,
      },
      {
        title: "Prevention and Vaccination",
        description:
          "Development and implementation of disease prevention measures",
        icon: <PencilIcon />,
      },
      {
        title: "On-site Medical Services",
        description:
          "Organization of on-site examinations and consultations in the office, saving employees' time and providing prompt assistance",
        icon: <ClipboardIcon />,
      },
      {
        title: "Personalized Support",
        description:
          "Individual approach to each client: from developing examination programs to supporting corporate health improvement projects",
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
    en: {
      title: "Comprehensive Approach to Employee Health",
      subtitle:
        "Enhancing staff care through convenient and quality medical support",
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
      : defaultServiceCards[
          currentLocale as keyof typeof defaultServiceCards
        ] || defaultServiceCards.ru;

  return (
    <div className="mt-20">
      {/* Заголовок и подзаголовок */}
      <div className="flex flex-col md:flex-row justify-between mb-10">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text leading-tight">
            {translations[currentLocale as keyof typeof translations]?.title ||
              translations.ru.title}
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg md:text-xl text-light-text dark:text-dark-text">
            {translations[currentLocale as keyof typeof translations]
              ?.subtitle || translations.ru.subtitle}
          </p>
        </div>
      </div>

      {/* Первый ряд карточек - по 2 блока слева и 1 блок справа */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Левый большой блок - 50% */}
        <div className="md:col-span-2">
          <ServiceCard
            title={serviceCards[0]?.title || defaultServiceCards.ru[0].title}
            description={
              serviceCards[0]?.description ||
              defaultServiceCards.ru[0].description
            }
            icon={serviceCards[0]?.icon || defaultServiceCards.ru[0].icon}
          />
        </div>
        {/* Первый правый блок - 25% */}
        <div className="md:col-span-1">
          <ServiceCard
            title={serviceCards[1]?.title || defaultServiceCards.ru[1].title}
            description={
              serviceCards[1]?.description ||
              defaultServiceCards.ru[1].description
            }
            icon={serviceCards[1]?.icon || defaultServiceCards.ru[1].icon}
          />
        </div>
        {/* Второй правый блок - 25% */}
        <div className="md:col-span-1">
          <ServiceCard
            title={serviceCards[2]?.title || defaultServiceCards.ru[2].title}
            description={
              serviceCards[2]?.description ||
              defaultServiceCards.ru[2].description
            }
            icon={serviceCards[2]?.icon || defaultServiceCards.ru[2].icon}
          />
        </div>
      </div>

      {/* Второй ряд карточек - 2 блока по 50% */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ServiceCard
            title={serviceCards[3]?.title || defaultServiceCards.ru[3].title}
            description={
              serviceCards[3]?.description ||
              defaultServiceCards.ru[3].description
            }
            icon={serviceCards[3]?.icon || defaultServiceCards.ru[3].icon}
          />
        </div>
        <div>
          <ServiceCard
            title={serviceCards[4]?.title || defaultServiceCards.ru[4].title}
            description={
              serviceCards[4]?.description ||
              defaultServiceCards.ru[4].description
            }
            icon={serviceCards[4]?.icon || defaultServiceCards.ru[4].icon}
          />
        </div>
      </div>
    </div>
  );
}
