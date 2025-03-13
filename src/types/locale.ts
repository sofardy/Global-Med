import type { Locale } from '../store/language';

export interface LocaleMessages {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface LocalizationProps<T extends LocaleMessages> {
    localization: Record<Locale, T>;
}