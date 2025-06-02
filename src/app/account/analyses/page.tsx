"use client";
import { useTranslation } from "@/src/hooks/useTranslation";
import { DownloadIcon } from "@/src/shared/ui/Icon";
import PacifierIcon from "@/src/shared/ui/Icon/PatientIcon";
import { useThemeStore } from "@/src/store/theme";
import { useState } from "react";

// Translations
const translations = {
  ru: {
    emptyState: "У вас пока нет результатов анализов...",
    loadMore: "Загрузить еще",
    loading: "Загрузка...",
    showEmpty: "Показать пустое состояние",
    showResults: "Показать результаты",
    download: "Скачать результаты",
    downloadShort: "Скачать",
    laboratory: "Врач лаборатории",
  },
  uz: {
    emptyState: "Sizda hali tahlil natijalari yo'q...",
    loadMore: "Ko'proq yuklash",
    loading: "Yuklanmoqda...",
    showEmpty: "Bo'sh holatni ko'rsatish",
    showResults: "Natijalarni ko'rsatish",
    download: "Natijalarni yuklab olish",
    downloadShort: "Yuklab olish",
    laboratory: "Laboratoriya shifokori",
  },
};

export default function Analyses() {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const [loading, setLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  // Mock test results data
  const testResults = [
    {
      id: 1,
      date: "19.05.2025",
      testType: "Биохимический анализ крови",
      doctor: t("laboratory"),
      doctorName: "Иванова Мария Александровна",
    },
    {
      id: 2,
      date: "19.05.2025",
      testType: "Биохимический анализ крови",
      doctor: t("laboratory"),
      doctorName: "Иванова Мария Александровна",
    },
    {
      id: 3,
      date: "19.05.2025",
      testType: "Биохимический анализ крови",
      doctor: t("laboratory"),
      doctorName: "Иванова Мария Александровна",
    },
    {
      id: 4,
      date: "19.05.2025",
      testType: "Биохимический анализ крови",
      doctor: t("laboratory"),
      doctorName: "Иванова Мария Александровна",
    },
    {
      id: 5,
      date: "19.05.2025",
      testType: "Биохимический анализ крови",
      doctor: t("laboratory"),
      doctorName: "Иванова Мария Александровна",
    },
    {
      id: 6,
      date: "19.05.2025",
      testType: "Биохимический анализ крови",
      doctor: t("laboratory"),
      doctorName: "Иванова Мария Александровна",
    },
    {
      id: 7,
      date: "19.05.2025",
      testType: "Биохимический анализ крови",
      doctor: t("laboratory"),
      doctorName: "Иванова Мария Александровна",
    },
  ];

  // Empty state component
  const EmptyState = () => (
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
  );

  // Handle load more
  const handleLoadMore = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Download results function
  const handleDownload = (id: number) => {
    console.log(`Downloading results for ID: ${id}`);
    // Implementation for download functionality would go here
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowEmpty(!showEmpty)}
          className="bg-[#094A54] dark:bg-light-accent text-white px-4 py-2 rounded-lg hover:bg-[#073a42] dark:hover:opacity-90 transition-colors text-sm sm:text-base"
        >
          {showEmpty ? t("showResults") : t("showEmpty")}
        </button>
      </div>

      {showEmpty ? (
        <EmptyState />
      ) : (
        <div>
          {testResults.map((result) => (
            <div
              key={result.id}
              className="bg-white dark:bg-dark-block rounded-2xl mb-4 px-4 sm:px-6 md:px-10 py-4 sm:py-6 shadow-sm"
            >
              {/* Desktop layout */}
              <div className="hidden sm:grid sm:grid-cols-3">
                {/* Left column: date and test type */}
                <div className="col-span-1">
                  <div className="text-lg font-medium text-[#094A54] dark:text-dark-text">
                    {result.date}
                  </div>
                  <div className="text-[#094A54] dark:text-dark-text mt-1">
                    {result.testType}
                  </div>
                </div>

                {/* Middle column: doctor specialty and name */}
                <div className="col-span-1">
                  <div className="text-[#094A54] dark:text-dark-text font-medium">
                    {result.doctor}
                  </div>
                  <div className="text-[#094A5480] dark:text-dark-text/80 text-sm mt-2">
                    {result.doctorName}
                  </div>
                </div>

                {/* Right column: download button */}
                <div className="col-span-1 flex justify-end items-center">
                  <button
                    onClick={() => handleDownload(result.id)}
                    className="bg-[#094A54] hover:bg-[#243739] dark:bg-light-accent dark:hover:opacity-90 text-white px-6 py-3 rounded-[12px] flex items-center transition-colors"
                  >
                    <DownloadIcon size={20} color="#FFFFFF" className="mr-2" />
                    {t("download")}
                  </button>
                </div>
              </div>

              {/* Mobile layout */}
              <div className="sm:hidden">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-base font-medium text-[#094A54] dark:text-dark-text">
                      {result.date}
                    </div>
                    <div className="text-[#094A54] dark:text-dark-text text-sm mt-1">
                      {result.testType}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-700 mb-3">
                  <div className="text-[#094A54] dark:text-dark-text font-medium">
                    {result.doctor}
                  </div>
                  <div className="text-[#094A5480] dark:text-dark-text/80 text-xs mt-1">
                    {result.doctorName}
                  </div>
                </div>

                <div className="w-full">
                  <button
                    onClick={() => handleDownload(result.id)}
                    className="w-full bg-[#094A54] hover:bg-[#243739] dark:bg-light-accent dark:hover:opacity-90 text-white py-2 rounded-[12px] flex items-center justify-center transition-colors"
                  >
                    <DownloadIcon size={16} color="#FFFFFF" className="mr-2" />
                    {t("downloadShort")}
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleLoadMore}
            className="w-full bg-[#00C78B] dark:bg-light-accent text-white py-3 sm:py-4 rounded-xl hover:bg-[#00b57d] dark:hover:opacity-90 transition-colors duration-300 mt-4 text-sm sm:text-base font-medium"
          >
            {loading ? t("loading") : t("loadMore")}
          </button>
        </div>
      )}
    </div>
  );
}
