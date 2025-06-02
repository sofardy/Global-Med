"use client";

import { useTranslation } from "@/src/hooks/useTranslation";
import { UniversalCard } from "@/src/shared/components/UniversalCard";
import { useThemeStore } from "@/src/store/theme";
import React from "react";
import { ButterflyIconk2, MedicalIcon } from "../ui/Icon";
import BrainIconk2 from "../ui/Icon/BrainIconk2";
import { CoffeeIcon } from "../ui/Icon/CoffeeIcon";
import { MobileDeviceIconk2 } from "../ui/Icon/MobileDeviceIconk2";
import { applyColorToIcon, getIconColorByTheme } from "../utils/iconUtils";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  iconPath: React.ReactNode;
  isActive?: boolean;
}

// Локализация для компонента
const translations = {
  ru: {
    title: "Рекомендации перед",
    titleSecond: "сдачей анализов",
    subtitle:
      "Перед сдачей анализов важно соблюдать несколько простых рекомендаций, чтобы результаты были максимально точными",
    recommendations: [
      {
        id: "food",
        title: "Избегайте жирной пищи",
        description: "Не употребляйте жирную пищу за день до сдачи анализов",
        iconPath: <CoffeeIcon />,
      },
      {
        id: "stress",
        title: "Минимизируйте стресс",
        description:
          "Старайтесь избегать сильного стресса перед сдачей анализов",
        iconPath: <ButterflyIconk2 />,
      },
      {
        id: "alcohol",
        title: "Откажитесь от алкоголя",
        description: "Не употребляйте алкоголь за 24 часа до сдачи анализов",
        iconPath: <MobileDeviceIconk2 />,
        isActive: true,
      },
      {
        id: "exercise",
        title: "Избегайте физических нагрузок",
        description:
          "Откажитесь от сильных физических нагрузок перед сдачей анализов",
        iconPath: <BrainIconk2 />,
      },
    ],
  },
  uz: {
    title: "Tahlil topshirishdan oldin",
    titleSecond: "tavsiyalar",
    subtitle:
      "Tahlil topshirishdan oldin natijalar maksimal darajada aniq bo'lishi uchun bir nechta oddiy tavsiyalarga rioya qilish muhim",
    recommendations: [
      {
        id: "food",
        title: "Yog'li ovqatdan saqlaning",
        description:
          "Tahlil topshirishdan bir kun oldin yog'li ovqat iste'mol qilmang",
        iconPath: <MedicalIcon />,
      },
      {
        id: "stress",
        title: "Stressni kamaytiring",
        description:
          "Tahlil topshirishdan oldin kuchli stressdan qochishga harakat qiling",
        iconPath: <MedicalIcon />,
      },
      {
        id: "alcohol",
        title: "Alkogoldan voz keching",
        description:
          "Tahlil topshirishdan 24 soat oldin alkogol iste'mol qilmang",
        iconPath: <MedicalIcon />,
        isActive: true,
      },
      {
        id: "exercise",
        title: "Jismoniy zo'riqishdan saqlaning",
        description:
          "Tahlil topshirishdan oldin kuchli jismoniy zo'riqishdan voz keching",
        iconPath: <MedicalIcon />,
      },
    ],
  },
  en: {
    title: "Recommendations before",
    titleSecond: "taking tests",
    subtitle:
      "Before taking tests, it is important to follow several simple recommendations to ensure the most accurate results",
    recommendations: [
      {
        id: "food",
        title: "Avoid fatty foods",
        description: "Do not consume fatty foods one day before taking tests",
        iconPath: <CoffeeIcon />,
      },
      {
        id: "stress",
        title: "Minimize stress",
        description: "Try to avoid severe stress before taking tests",
        iconPath: <ButterflyIconk2 />,
      },
      {
        id: "alcohol",
        title: "Avoid alcohol",
        description: "Do not consume alcohol 24 hours before taking tests",
        iconPath: <MobileDeviceIconk2 />,
        isActive: true,
      },
      {
        id: "exercise",
        title: "Avoid physical exertion",
        description:
          "Refrain from intense physical activity before taking tests",
        iconPath: <BrainIconk2 />,
      },
    ],
  },
};

export default function AnalysisRecommendations() {
  const { t } = useTranslation(translations);
  const { theme } = useThemeStore();

  // Получаем локализованные данные и явно типизируем их
  const recommendations = t("recommendations", {
    returnObjects: true,
  }) as Recommendation[];

  return (
    <div className="w-full mt-16 md:mt-20">
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-light-text dark:text-dark-text">
            {t("title")}
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-light-text dark:text-dark-text mt-1 md:mt-2">
            {t("titleSecond")}
          </h2>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <p className="text-base md:text-lg text-light-text/80 dark:text-dark-text/80 max-w-xl w-full md:w-[80%] lg:w-[70%]">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {recommendations.map((recommendation: Recommendation) => {
          return (
            <UniversalCard
              key={recommendation.id}
              variant="analysis"
              title={recommendation.title}
              description={recommendation.description}
              icon={applyColorToIcon(
                recommendation.iconPath,
                getIconColorByTheme(theme)
              )}
              showButton={false}
              iconPosition="top"
              minHeight="h-[250px]"
              titleSize="text-[22px] font-medium mb-4"
              padding="6"
              bordered={!recommendation.isActive}
            />
          );
        })}
      </div>
    </div>
  );
}
