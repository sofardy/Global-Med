// src/shared/config/routes.ts
export interface Route {
    path: RoutePathEnum;
    translationKey: 'services' | 'checkups' | 'analysis' | 'partners' | 'clinic' | 'contacts';
    hasSubmenu?: boolean;
}
export enum RoutePathEnum {
    SERVICES = '/services',
    CHECKUPS = '/checkups',
    ANALYSIS = '/analysis',
    PARTNERS = '/partners',
    CLINIC = '/clinic',
    CONTACTS = '/contacts',
}

export const routes: Route[] = [
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