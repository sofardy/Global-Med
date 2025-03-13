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
        translationKey: 'services'
    },
    {
        path: RoutePathEnum.CHECKUPS,
        translationKey: 'checkups'
    },
    {
        path: RoutePathEnum.ANALYSIS,
        translationKey: 'analysis'
    },
    {
        path: RoutePathEnum.PARTNERS,
        translationKey: 'partners'
    },
    {
        path: RoutePathEnum.CLINIC,
        translationKey: 'clinic',
        hasSubmenu: true // Только у "О клинике" есть подменю
    },
    {
        path: RoutePathEnum.CONTACTS,
        translationKey: 'contacts'
    },
];