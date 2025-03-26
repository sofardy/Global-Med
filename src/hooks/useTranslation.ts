import { useMemo } from 'react';
import { useLanguageStore, type Locale } from '../store/language';

interface TranslationOptions {
    returnObjects?: boolean;
    [key: string]: string | number | boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LocaleMessages = Record<Locale, Record<string, any>>;

export function useTranslation<T extends LocaleMessages>(localization: T) {
    const { currentLocale } = useLanguageStore();

    // Проверяем, есть ли сообщения для текущего языка, иначе используем резервный
    const messages = useMemo(() => {
        const locale = currentLocale as keyof T;
        // Если локализация для выбранного языка существует, используем её
        if (localization[locale]) {
            return localization[locale];
        }
        // Иначе используем русский как резервный
        return localization['ru'];
    }, [localization, currentLocale]);

    const t = <R = string>(key: string, params?: TranslationOptions): R => {
        if (!key) return '' as unknown as R;

        const keys = key.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let result: any = messages;

        for (const part of keys) {
            if (!result || result[part] === undefined) {
                console.warn(`Translation key not found: ${key} for locale ${currentLocale}`);
                return key as unknown as R;
            }
            result = result[part];
        }

        if (params?.returnObjects) {
            return result as R;
        }

        if (typeof result === 'string' && params) {
            // Handle {{param}} syntax
            result = result.replace(/\{\{(\w+)\}\}/g, (_, match) => {
                return params[match] !== undefined ? String(params[match]) : `{{${match}}}`;
            });

            // Handle {param} syntax
            result = result.replace(/\{(\w+)\}/g, (_: unknown, match: string | number) => {
                return params[match] !== undefined ? String(params[match]) : `{${match}}`;
            });
        }

        return (typeof result === 'string' ? result : key) as unknown as R;
    };

    return { t, messages, currentLocale };
}