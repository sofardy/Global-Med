import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Locale = 'ru' | 'uz';

interface LanguageState {
    currentLocale: Locale;
    setLocale: (locale: Locale) => void;
    toggleLocale: () => void;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            currentLocale: 'ru',
            setLocale: (locale: Locale) => set({ currentLocale: locale }),
            toggleLocale: () => set((state) => ({
                currentLocale: state.currentLocale === 'ru' ? 'uz' : 'ru'
            })),
        }),
        {
            name: 'language-storage',
            storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : {
                getItem: () => null,
                setItem: () => null,
                removeItem: () => null,
            }),
            skipHydration: true,
        }
    )
);