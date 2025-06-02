import { create } from "zustand";

interface LocaleState {
  currentLocale: string;
  setCurrentLocale: (locale: string) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  currentLocale: "ru", // default locale
  setCurrentLocale: (locale: string) => set({ currentLocale: locale }),
}));
