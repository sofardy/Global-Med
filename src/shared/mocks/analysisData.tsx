import React from 'react';
import { AngelIcon } from '@/src/shared/ui/Icon';

// Определение интерфейса для элемента анализа
export interface AnalysisItem {
    id: string;
    title: string;
    iconPath: React.ReactNode;
    link: string;
}

// Экспорт массива с данными анализов
export const analysisData: AnalysisItem[] = [
    {
        id: 'coagulogram',
        title: 'Коагулограмма',
        iconPath: <AngelIcon />,
    link: '/analysis/coagulogram'
    },
    {
        id: 'biochemistry',
        title: 'Биохимические анализы',
        iconPath: <AngelIcon />,
    link: '/analysis/biochemistry'
    },
    {
        id: 'express',
        title: 'Экспресс-тест',
        iconPath: <AngelIcon />,
    link: '/analysis/express'
    },
    {
        id: 'urine',
        title: 'Биохимия мочи',
        iconPath: <AngelIcon />,
    link: '/analysis/urine'
    },
    {
        id: 'rheumatoid',
        title: 'Ревматоидные факторы',
        iconPath: <AngelIcon />,
    link: '/analysis/rheumatoid'
    },
    {
        id: 'torch-igm',
        title: 'TORCH-инфекции IgM',
        iconPath: <AngelIcon />,
    link: '/analysis/torch-igm'
    },
    {
        id: 'torch-igg',
        title: 'TORCH-инфекции IgG',
        iconPath: <AngelIcon />,
    link: '/analysis/torch-igg'
    },
    {
        id: 'infections',
        title: 'Инфекции',
        iconPath: <AngelIcon />,
    link: '/analysis/infections'
    },
    {
        id: 'viral-hepatitis',
        title: 'Вирусные гепатиты',
        iconPath: <AngelIcon />,
    link: '/analysis/viral-hepatitis'
    },
    {
        id: 'parasites',
        title: 'Паразиты',
        iconPath: <AngelIcon />,
    link: '/analysis/parasites'
    },
    {
        id: 'hematology',
        title: 'Гематология',
        iconPath: <AngelIcon />,
    link: '/analysis/hematology'
    },
    {
        id: 'blood-analysis',
        title: 'Анализы крови',
        iconPath: <AngelIcon />,
    link: '/analysis/blood-analysis'
    },
    {
        id: 'hormones',
        title: 'Гормоны',
        iconPath: <AngelIcon />,
    link: '/analysis/hormones'
    },
    {
        id: 'blood-enzymes',
        title: 'Ферменты крови',
        iconPath: <AngelIcon />,
    link: '/analysis/blood-enzymes'
    },
    {
        id: 'general-blood',
        title: 'Общий анализ крови',
        iconPath: <AngelIcon />,
    link: '/analysis/general-blood'
    },
    {
        id: 'tumor-markers',
        title: 'Опухолевые маркеры',
        iconPath: <AngelIcon />,
    link: '/analysis/tumor-markers'
    },
    {
        id: 'blood-group',
        title: 'Группа крови + RH',
        iconPath: <AngelIcon />,
    link: '/analysis/blood-group'
    },
    {
        id: 'microscopic',
        title: 'Микроскопические анализы',
        iconPath: <AngelIcon />,
    link: '/analysis/microscopic'
    },
    {
        id: 'bacterial-culture',
        title: 'Бак. посев',
        iconPath: <AngelIcon />,
    link: '/analysis/bacterial-culture'
    },
    {
        id: 'allergy',
        title: 'Аллергология',
        iconPath: <AngelIcon />,
    link: '/analysis/allergy'
    },
    {
        id: 'vitamins',
        title: 'Витамины',
        iconPath: <AngelIcon />,
    link: '/analysis/vitamins'
    },
    {
        id: 'genetics',
        title: 'Генетика',
        iconPath: <AngelIcon />,
    link: '/analysis/genetics'
    },
    {
        id: 'immunology',
        title: 'Иммунология',
        iconPath: <AngelIcon />,
    link: '/analysis/immunology'
    },
    {
        id: 'cytology',
        title: 'Цитология',
        iconPath: <AngelIcon />,
    link: '/analysis/cytology'
    },
    {
        id: 'pcr',
        title: 'ПЦР-диагностика',
        iconPath: <AngelIcon />,
    link: '/analysis/pcr'
    }
];