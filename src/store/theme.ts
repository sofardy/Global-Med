import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => {
            // По умолчанию используем системные настройки
            const systemPreference = typeof window !== 'undefined'
                ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                : 'light';

            return {
                theme: 'system',
                resolvedTheme: systemPreference,
                setTheme: (theme: Theme) => set({
                    theme,
                    resolvedTheme: theme === 'system'
                        ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                        : theme
                }),
                toggleTheme: () => set((state) => {
                    if (state.theme === 'light') return { theme: 'dark', resolvedTheme: 'dark' };
                    if (state.theme === 'dark') return { theme: 'system', resolvedTheme: state.resolvedTheme };
                    return { theme: 'light', resolvedTheme: 'light' };
                }),
            }
        },
        {
            name: 'theme-storage',
            skipHydration: true, 
        }
    )
);