"use client";

import { useAnalyses } from "@/src/hooks/useAnalyses";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useHomeStore } from "@/src/store/home";
import { useThemeStore } from "@/src/store/theme";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "../ui/Icon";
import { UniversalCard } from "./UniversalCard";

interface AnalysisGridProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  itemsPerPage?: number;
}

// Локализация
const translations = {
  ru: {
    allAnalyses: "Все виды анализов",
    detailsButton: "Подробнее",
    showMore: "Показать ещё",
    showLess: "Свернуть",
    loading: "Загрузка анализов...",
    error: "Не удалось загрузить данные анализов",
  },
  uz: {
    allAnalyses: "Barcha tahlil turlari",
    detailsButton: "Batafsil",
    showMore: "Ko'proq ko'rsatish",
    showLess: "Kamroq ko'rsatish",
    loading: "Tahlillar yuklanmoqda...",
    error: "Tahlil ma'lumotlarini yuklab bo'lmadi",
  },
  en: {
    allAnalyses: "All Types of Tests",
    detailsButton: "Learn More",
    showMore: "Show More",
    showLess: "Show Less",
    loading: "Loading tests...",
    error: "Failed to load test data",
  },
};

export const AnalysisGrid: React.FC<AnalysisGridProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  itemsPerPage = 6,
}) => {
  const { theme } = useThemeStore();
  const { t, currentLocale } = useTranslation(translations);
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const { medicalTests: analysesText, isLoading }: any = useHomeStore();
  const { analyses, loading, error } = useAnalyses();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setVisibleItems(itemsPerPage);
    } else {
      isFirstRender.current = false;
    }
  }, [currentLocale, itemsPerPage]);
  const localizedButtonText = buttonText || t("allAnalyses");

  const handleShowMore = () => {
    setVisibleItems((prev) => Math.min(prev + itemsPerPage, analyses.length));
  };

  const handleShowLess = () => {
    setVisibleItems(itemsPerPage);
  };

  // Используем только нужное количество элементов для отображения
  const displayedItems = analyses.slice(0, visibleItems);
  const hasMoreItems = visibleItems < analyses.length;

  return (
    <div className="w-full mt-6 sm:mt-8 md:mt-40 mb-6 sm:mb-8 md:mb-40">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Информационный блок - адаптивная высота */}
        <div className="w-full md:w-[24%] bg-light-accent text-white p-6 md:p-10 rounded-2xl flex flex-col h-[400px] md:h-[654px] relative overflow-hidden">
          {/* Контейнер с overflow-visible для фонового элемента */}
          <div className="absolute inset-0 overflow-visible">
            <div
              className="absolute top-[100px] -left-[150px] w-[750px] h-[500px] z-[1]"
              style={{
                backgroundImage: "url(/images/doctor-pattern2.gif)",
                backgroundSize: "cover",
                transformOrigin: "center center",
              }}
            ></div>
          </div>

          {/* Контент блока */}
          <div className="relative z-10">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 md:h-10 lg:h-12 bg-white/20 rounded-lg w-3/4 mb-4"></div>
                <div className="h-4 md:h-5 lg:h-6 bg-white/20 rounded-lg w-full mb-2"></div>
                <div className="h-4 md:h-5 lg:h-6 bg-white/20 rounded-lg w-5/6 mb-2"></div>
                <div className="h-4 md:h-5 lg:h-6 bg-white/20 rounded-lg w-4/6"></div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                  {analysesText?.title}
                </h2>
                <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8">
                  {analysesText?.subtitle}
                </p>
              </>
            )}
          </div>
          <Link
            href={buttonLink || "/analysis"}
            className="mt-auto flex items-center gap-2 p-3 md:p-4 text-white border border-white rounded-2xl transition-all hover:bg-white hover:text-light-accent hover:border-white self-start relative z-10"
          >
            <span className="text-[14px] md:text-[16px]">
              {localizedButtonText}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="transform rotate-[-90deg] ml-auto"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Сетка анализов */}
        <div className="w-full md:w-[75%]">
          {loading ? (
            <div className="flex justify-center items-center h-80">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
              <span className="ml-3 text-light-text dark:text-dark-text">
                {t("loading")}
              </span>
            </div>
          ) : error ? (
            <div className="text-center p-10 text-red-500">
              <p>{error.message || t("error")}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedItems.map((analysis) => (
                  <UniversalCard
                    key={analysis.uuid}
                    variant="analysis-card"
                    title={analysis.name}
                    icon={analysis.icon}
                    link={`/analysis/${analysis.slug}`}
                    buttonText={t("detailsButton")}
                    className="h-auto"
                    iconPosition="center"
                    showButton={true}
                    buttonStyle="outline"
                    bordered={true}
                    borderRadius="xl"
                    hoverBgColor="white"
                    buttonTextSize="text-lg"
                    buttonPadding="py-5"
                  />
                ))}
              </div>

              {/* Кнопка "Показать ещё" / "Свернуть" */}
              {analyses.length > itemsPerPage && (
                <div className="flex justify-center mt-8">
                  {hasMoreItems ? (
                    <button
                      onClick={handleShowMore}
                      className="flex items-center gap-2 px-6 py-4 text-light-text dark:text-dark-text border border-light-text dark:border-dark-text rounded-2xl transition-all hover:bg-light-accent hover:text-white hover:border-light-accent"
                    >
                      <span className="text-[16px]">{t("showMore")}</span>
                      <ArrowDownIcon
                        color={theme === "light" ? "#094A54" : "white"}
                        size={12}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={handleShowLess}
                      className="flex items-center gap-2 px-6 py-4 text-light-text dark:text-dark-text border border-light-text dark:border-dark-text rounded-2xl transition-all hover:bg-light-accent hover:text-white hover:border-light-accent"
                    >
                      <span className="text-[16px]">{t("showLess")}</span>
                      <ArrowDownIcon
                        color={theme === "light" ? "#094A54" : "white"}
                        size={12}
                        className="transform rotate-180"
                      />
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
