// src/shared/config/routes.ts

export enum RoutePathEnum {
    SERVICES = '/services',
    CHECKUPS = '/checkups',
    ANALYSIS = '/analysis',
    PARTNERS = '/partners',
    CLINIC = '/clinic',
    CONTACTS = '/contacts',
}

export const routes = [
    {
        path: RoutePathEnum.SERVICES,
        label: {
            ru: 'Услуги',
            en: 'Services'
        }
    },
    {
        path: RoutePathEnum.CHECKUPS,
        label: {
            ru: 'Чек-апы',
            en: 'Checkups'
        }
    },
    {
        path: RoutePathEnum.ANALYSIS,
        label: {
            ru: 'Анализы',
            en: 'Analysis'
        }
    },
    {
        path: RoutePathEnum.PARTNERS,
        label: {
            ru: 'Партнерам',
            en: 'Partners'
        }
    },
    {
        path: RoutePathEnum.CLINIC,
        label: {
            ru: 'О клинике',
            en: 'About clinic'
        }
    },
    {
        path: RoutePathEnum.CONTACTS,
        label: {
            ru: 'Контакты',
            en: 'Contacts'
        }
    },
];