import React from 'react';

/**
 * Применяет цвет к React-компоненту иконки
 * @param icon Компонент иконки (React-элемент)
 * @param color Цвет для применения
 * @returns Клонированный компонент с примененным цветом
 */
export const applyColorToIcon = (
    icon: React.ReactNode,
    color: string
): React.ReactNode => {
    if (!React.isValidElement(icon)) return icon;

    // Для компонентов иконок, принимающих свойство color напрямую
    try {
        // Безопасное клонирование с явным указанием типа
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement(icon as React.ReactElement<any>, {
            color
        });
    } catch (error) {
        // Обработка ошибок при клонировании
        console.warn('Failed to apply color to icon:', error);
        return icon;
    }
};

/**
 * Получает цвет иконки в зависимости от темы
 * @param theme Текущая тема ('light' или 'dark')
 * @param customColor Пользовательский цвет (опционально)
 * @returns Цвет для иконки
 */
export const getIconColorByTheme = (
    theme: string,
    customColor?: string
): string => {
    if (customColor) return customColor;
    return theme === 'light' ? '#094A54' : '#ffffff';
};