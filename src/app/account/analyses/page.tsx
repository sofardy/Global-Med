"use client";
import { useTranslation } from "@/src/hooks/useTranslation";
import PacifierIcon from "@/src/shared/ui/Icon/PatientIcon";
import { useThemeStore } from "@/src/store/theme";
import { useLanguageStore } from "@/src/store/language";
import { API_BASE_URL } from "@/src/config/constants";
import { useEffect, useState } from "react";
import DownloadIcon from "@/src/shared/ui/Icon/DownloadIcon";

interface DiagnosticResult {
  uuid: string;
  doctor_full_name: string;
  name: string;
  results: string;
  date: string;
}

interface ApiResponse {
  data: DiagnosticResult[];
}

// Translations
const translations = {
  ru: {
    emptyState: "У вас пока нет результатов анализов...",
    loading: "Загрузка результатов анализов...",
    error: "Ошибка загрузки результатов анализов",
    download: "Скачать",
    doctor: "Врач:",
    date: "Дата:",
  },
  uz: {
    emptyState: "Sizda hali tahlil natijalari yo'q...",
    loading: "Tahlil natijalari yuklanmoqda...",
    error: "Tahlil natijalarini yuklashda xatolik",
    download: "Yuklab olish",
    doctor: "Shifokor:",
    date: "Sana:",
  },
  en: {
    emptyState: "You have no test results yet...",
    loading: "Loading test results...",
    error: "Error loading test results",
    download: "Download",
    doctor: "Doctor:",
    date: "Date:",
  },
};

export default function Analyses() {
  const { theme } = useThemeStore();
  const { currentLocale } = useLanguageStore();
  const { t } = useTranslation(translations);
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/diagnostic-results`, {
          headers: {
            "x-language": currentLocale,
            Authorization: `Bearer ${localStorage?.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        setResults(data.data);
      } catch (err) {
        console.error("Error fetching analyses:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, [currentLocale]);

  // Theme-based styling
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-dark-bg" : "bg-light-bg";
  const textColor = isDark ? "text-white" : "text-light-text";
  const cardBg = isDark ? "bg-dark-block" : "bg-white";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-accent mx-auto mb-4"></div>
          <p className="text-lg text-center text-light-text dark:text-dark-text">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="mb-6">
            <PacifierIcon
              size={120}
              color={theme === "light" ? "#174F4B" : "#ffffff"}
            />
          </div>
          <h3 className="text-2xl font-medium text-center text-red-500 mb-4">
            {t("error")}
          </h3>
          <p className="text-center text-light-text dark:text-dark-text">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full">
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
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-6">
        {results.map((result) => (
          <div
            key={result.uuid}
            className={`${cardBg} rounded-2xl shadow-sm border ${borderColor} p-6`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                  {result.name}
                </h3>
                <div className="space-y-1 text-sm text-light-text/80 dark:text-dark-text/80">
                  <p>
                    <span className="font-medium">{t("doctor")}</span>{" "}
                    {result.doctor_full_name}
                  </p>
                  <p>
                    <span className="font-medium">{t("date")}</span>{" "}
                    {result.date}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <a
                  href={result.results}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-light-accent text-white rounded-xl hover:bg-opacity-90 transition-colors"
                >
                  <DownloadIcon size={16} className="mr-2" />
                  {t("download")}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
