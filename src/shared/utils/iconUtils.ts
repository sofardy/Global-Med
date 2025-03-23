import React from 'react';

/**
 * Применяет цвет к React-компоненту иконки
 * @param icon Компонент иконки (React-элемент)
 * @param color Цвет для применения
 * @returns Клонированный компонент с примененным цветом
 */
export const applyColorToIcon = (
    icon: React.ReactNode,
    color: string,
    isHovered: boolean = false
): React.ReactNode => {
    if (!React.isValidElement(icon)) return icon;

    try {
        return React.cloneElement(icon as React.ReactElement<any>, {
            color: isHovered ? 'white' : color
        });
    } catch (error) {
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