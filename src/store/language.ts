import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "ru" | "uz" | "en";

interface LanguageState {
  currentLocale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLocale: "ru",
      setLocale: (locale: Locale) => set({ currentLocale: locale }),
      toggleLocale: () =>
        set((state) => ({
          currentLocale: state.currentLocale,
        })),
    }),
    {
      name: "language-storage",
    }
  )
);
