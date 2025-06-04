"use client";
import { useTranslation } from "@/src/hooks/useTranslation";
import PacifierIcon from "@/src/shared/ui/Icon/PatientIcon";
import { useThemeStore } from "@/src/store/theme";

// Translations
const translations = {
  ru: {
    emptyState: "У вас пока нет результатов анализов...",
  },
  uz: {
    emptyState: "Sizda hali tahlil natijalari yo'q...",
  },
  en: {
    emptyState: "You have no test results yet...",
  },
};

export default function Analyses() {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);

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
