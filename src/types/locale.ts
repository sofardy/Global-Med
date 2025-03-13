import type { Locale } from '../store/language';

export interface LocaleMessages {
    [key: string]: any;
}

export interface LocalizationProps<T extends LocaleMessages> {
    localization: Record<Locale, T>;
}