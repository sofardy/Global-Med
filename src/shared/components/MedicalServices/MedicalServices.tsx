"use client";

import { API_BASE_URL } from "@/src/config/constants";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useHomeStore } from "@/src/store/home";
import { useLanguageStore } from "@/src/store/language";
import { useThemeStore } from "@/src/store/theme";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AngelIcon,
  ArrowDownIcon,
  BlobShape,
  ButterflyIcon,
  ButterflyWingsIcon,
  DocumentPenIcon,
  EyeIcon,
  LightbulbIcon,
  MedicalIcon,
  MedicalMicroscopeIcon,
  ThyroidIcon,
} from "../../ui/Icon";
import { UniversalCard } from "../UniversalCard";

const translations = {
  ru: {
    viewAllServices: "Все виды услуг",
    moreButton: "Подробнее",
    showMore: "Показать ещё",
    showLess: "Свернуть",
    loading: "Загрузка услуг...",
    error: "Ошибка при загрузке данных",
    servicesCountLabel: "услуг",
  },
  uz: {
    viewAllServices: "Barcha xizmatlar",
    moreButton: "Batafsil",
    showMore: "Ko'proq ko'rsatish",
    showLess: "Kamroq ko'rsatish",
    loading: "Xizmatlar yuklanmoqda...",
    error: "Ma'lumotlarni yuklashda xatolik yuz berdi",
    servicesCountLabel: "xizmatlar",
  },
  en: {
    viewAllServices: "All Services",
    moreButton: "Learn More",
    showMore: "Show More",
    showLess: "Show Less",
    loading: "Loading services...",
    error: "Error loading data",
    servicesCountLabel: "services",
  },
};

const getServiceIcon = (slug: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "lor-247": <LightbulbIcon size={80} />,
    oftalmologiia: <EyeIcon size={80} />,
    pediatriia: <ButterflyIcon size={80} />,
    ginekologiia: <AngelIcon size={80} />,
    nevrologiia: <BlobShape size={80} />,
    onkologiia: <ButterflyWingsIcon size={80} />,
    xirurgiia: <DocumentPenIcon size={80} />,
    uzi: <MedicalMicroscopeIcon size={80} />,
    endokrinologiia: <ThyroidIcon size={80} />,
    travmatologiia: <AngelIcon size={80} />,
  };

  return iconMap[slug] || <MedicalIcon size={80} />;
};

export const MedicalServices = () => {
  const { t } = useTranslation(translations);
  const { currentLocale } = useLanguageStore();
  const { theme } = useThemeStore();
  const [showAllItems, setShowAllItems] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { services: secvicesText, isLoading }: any = useHomeStore();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/services`, {
          headers: {
            "Content-Type": "application/json",
            "X-Language": currentLocale,
          },
        });

        if (response.data?.data && Array.isArray(response.data.data)) {
          setServices(response.data.data);
          setError(null);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Ошибка при загрузке списка услуг:", err);
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [currentLocale]);

  const displayedServices = showAllItems ? services : services.slice(0, 2);

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 lg:mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left Block */}
          <div className="col-span-1 relative rounded-2xl overflow-hidden h-auto lg:sticky lg:top-6 md:h-[500px] lg:h-[700px] p-8 md:p-10 bg-[#02C78A] dark:bg-dark-block text-white dark:text-white min-h-[400px] md:min-h-[500px] lg:min-h-[700px] flex flex-col justify-between">
            <div
              className="absolute -right-[150px] -bottom-[250px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block"
              style={{
                backgroundImage: "url(/images/doctor-pattern2.gif)",
                backgroundSize: "contain",
                transform: "rotate(-15deg)",
                backgroundPosition: "right bottom",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            {isLoading ? (
              <div className="relative z-10 max-w-3xl animate-pulse">
                {/* Title skeleton */}
                <div className="space-y-4">
                  <div className="h-12 md:h-14 lg:h-[56px] bg-white/20 rounded-lg w-3/4"></div>
                  <div className="h-12 md:h-14 lg:h-[56px] bg-white/20 rounded-lg w-1/2"></div>
                </div>

                {/* Subtitle skeleton */}
                <div className="mt-10 mb-12 space-y-3">
                  <div className="h-5 lg:h-[18px] bg-white/20 rounded-lg w-full"></div>
                  <div className="h-5 lg:h-[18px] bg-white/20 rounded-lg w-5/6"></div>
                  <div className="h-5 lg:h-[18px] bg-white/20 rounded-lg w-4/6"></div>
                </div>

                {/* Button skeleton */}
                <div className="h-[58px] w-48 bg-white/20 rounded-2xl"></div>
              </div>
            ) : (
              <div className="relative z-10 max-w-3xl h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <p
                    style={{ lineHeight: "55px" }}
                    dangerouslySetInnerHTML={{
                      __html: secvicesText?.title,
                    }}
                    className="text-3xl md:text-4xl lg:text-[56px] font-medium"
                  ></p>
                </div>

                <p
                  dangerouslySetInnerHTML={{
                    __html: secvicesText?.subtitle,
                  }}
                  className="text-base lg:text-[18px] mt-10 mb-12 tracking-normal leading-[160%] space-y-2"
                ></p>

                <Link
                  href="/services"
                  className="relative z-10 h-[58px] inline-flex items-center justify-center border border-white dark:border-white text-white dark:text-white hover:bg-white hover:text-light-accent dark:hover:text-light-accent hover:border-light-accent rounded-2xl px-6 py-3 transition-colors mt-auto self-start"
                >
                  <span className="tracking-wide">{t("viewAllServices")}</span>
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-1">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
                <span className="ml-3 text-light-text dark:text-dark-text">
                  {t("loading")}
                </span>
              </div>
            ) : error ? (
              <div className="p-6 bg-red-100 text-red-700 rounded-lg">
                <p>{error}</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
                  {displayedServices.length > 0 ? (
                    displayedServices.map((service) => (
                      <div key={service.uuid} className="h-full">
                        <UniversalCard
                          variant="service"
                          title={service.name}
                          description={
                            service.card_description ||
                            service.mini_description ||
                            service.description ||
                            ""
                          }
                          additionalInfo={`${t("servicesCountLabel")}: ${
                            service.services_list?.length || 0
                          }`}
                          icon={service.icon}
                          link={`/services/${service.slug}`}
                          buttonText={t("moreButton")}
                          className="h-full"
                          iconPosition="center"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center p-4">
                      <p>Услуги не найдены</p>
                    </div>
                  )}
                </div>

                {services.length > 2 && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAllItems(!showAllItems)}
                      className="flex items-center gap-2 px-6 py-4 text-light-text dark:text-dark-text border border-light-text dark:border-dark-text rounded-2xl transition-all hover:bg-light-accent hover:text-white hover:border-light-accent"
                    >
                      <span className="text-[16px]">
                        {showAllItems ? t("showLess") : t("showMore")}
                      </span>
                      <ArrowDownIcon
                        color={theme === "light" ? "#094A54" : "white"}
                        size={12}
                        className={showAllItems ? "transform rotate-180" : ""}
                      />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
