"use client";

import { useTranslation } from "@/src/hooks/useTranslation";
import { useThemeStore } from "@/src/store/theme";
import { useLanguageStore } from "@/src/store/language";
import { API_BASE_URL } from "@/src/config/constants";
import { useEffect, useState } from "react";

import Link from "next/link";

interface PrivacyPolicyData {
  title: string;
  slug: string;
  content: {
    text: {
      data: {
        key: string;
        text: string;
      };
      type: string;
    };
  };
}

interface ApiResponse {
  data: PrivacyPolicyData;
}

const translations = {
  ru: {
    backToHome: "Вернуться на главную",
    loading: "Загрузка...",
    error: "Ошибка загрузки политики конфиденциальности",
  },
  uz: {
    backToHome: "Bosh sahifaga qaytish",
    loading: "Yuklanmoqda...",
    error: "Maxfiylik siyosatini yuklashda xatolik",
  },
  en: {
    backToHome: "Back to Home",
    loading: "Loading...",
    error: "Error loading privacy policy",
  },
};

export default function PrivacyPolicyPage() {
  const { theme } = useThemeStore();
  const { currentLocale } = useLanguageStore();
  const { t } = useTranslation(translations);
  const [data, setData] = useState<PrivacyPolicyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/pages/privacy-policy`, {
          headers: {
            "Content-Type": "application/json",
            "X-Language": currentLocale,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        setData(result.data);
      } catch (err) {
        console.error("Error fetching privacy policy:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, [currentLocale]);

  // Theme-based styling
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-dark-bg" : "bg-light-bg";
  const textColor = isDark ? "text-white" : "text-light-text";
  const cardBg = isDark ? "bg-dark-block" : "bg-white";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";

  // Function to decode HTML entities and render content
  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const renderContent = (content: string) => {
    const decodedContent = decodeHtml(content);

    // Simple HTML parsing for basic tags
    const processedContent = decodedContent
      .replace(/<p>/g, '<p class="mb-4 text-base leading-relaxed">')
      .replace(
        /<h1>/g,
        '<h1 class="text-2xl font-bold mb-6 text-light-accent">'
      )
      .replace(/<h2>/g, '<h2 class="text-xl font-semibold mb-4 mt-8">')
      .replace(/<h3>/g, '<h3 class="text-lg font-medium mb-3 mt-6">')
      .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4 space-y-2">')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside mb-4 space-y-2">')
      .replace(/<li>/g, '<li class="text-base">')
      .replace(/<strong>/g, '<strong class="font-semibold">')
      .replace(/<em>/g, '<em class="italic">')
      .replace(
        /<a /g,
        '<a class="text-light-accent hover:underline" target="_blank" rel="noopener noreferrer" '
      );

    return processedContent;
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-accent mx-auto mb-4"></div>
              <p className="text-lg">{t("loading")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`min-h-screen ${bgColor} ${textColor}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-lg text-red-500 mb-4">{t("error")}</p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-light-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 rotate-90"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                {t("backToHome")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-light-accent hover:underline transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 rotate-90"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {t("backToHome")}
          </Link>
        </div>

        {/* Content */}
        <div
          className={`max-w-4xl mx-auto ${cardBg} rounded-2xl shadow-sm border ${borderColor} p-6 md:p-8 lg:p-12`}
        >
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-light-accent">
            {data.title}
          </h1>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: renderContent(data.content.text.data.text),
            }}
          />
        </div>
      </div>
    </div>
  );
}
