import React from 'react';
import { AngelIcon } from '@/src/shared/ui/Icon';

// Определение интерфейса для элемента анализа
export interface AnalysisItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    link: string;
}

// Экспорт массива с данными анализов
export const analysisData: AnalysisItem[] = [
    {
        id: 'coagulogram',
        title: 'Коагулограмма',
        icon: <AngelIcon />,
    link: '/analysis/coagulogram'
    },
    {
        id: 'biochemistry',
        title: 'Биохимические анализы',
        icon: <AngelIcon />,
    link: '/analysis/biochemistry'
    },
    {
        id: 'express',
        title: 'Экспресс-тест',
        icon: <AngelIcon />,
    link: '/analysis/express'
    },
    {
        id: 'urine',
        title: 'Биохимия мочи',
        icon: <AngelIcon />,
    link: '/analysis/urine'
    },
    {
        id: 'rheumatoid',
        title: 'Ревматоидные факторы',
        icon: <AngelIcon />,
    link: '/analysis/rheumatoid'
    },
    {
        id: 'torch-igm',
        title: 'TORCH-инфекции IgM',
        icon: <AngelIcon />,
    link: '/analysis/torch-igm'
    },
    {
        id: 'torch-igg',
        title: 'TORCH-инфекции IgG',
        icon: <AngelIcon />,
    link: '/analysis/torch-igg'
    },
    {
        id: 'infections',
        title: 'Инфекции',
        icon: <AngelIcon />,
    link: '/analysis/infections'
    },
    {
        id: 'viral-hepatitis',
        title: 'Вирусные гепатиты',
        icon: <AngelIcon />,
    link: '/analysis/viral-hepatitis'
    },
    {
        id: 'parasites',
        title: 'Паразиты',
        icon: <AngelIcon />,
    link: '/analysis/parasites'
    },
    {
        id: 'hematology',
        title: 'Гематология',
        icon: <AngelIcon />,
    link: '/analysis/hematology'
    },
    {
        id: 'blood-analysis',
        title: 'Анализы крови',
        icon: <AngelIcon />,
    link: '/analysis/blood-analysis'
    },
    {
        id: 'hormones',
        title: 'Гормоны',
        icon: <AngelIcon />,
    link: '/analysis/hormones'
    },
    {
        id: 'blood-enzymes',
        title: 'Ферменты крови',
        icon: <AngelIcon />,
    link: '/analysis/blood-enzymes'
    },
    {
        id: 'general-blood',
        title: 'Общий анализ крови',
        icon: <AngelIcon />,
    link: '/analysis/general-blood'
    },
    {
        id: 'tumor-markers',
        title: 'Опухолевые маркеры',
        icon: <AngelIcon />,
    link: '/analysis/tumor-markers'
    },
    {
        id: 'blood-group',
        title: 'Группа крови + RH',
        icon: <AngelIcon />,
    link: '/analysis/blood-group'
    },
    {
        id: 'microscopic',
        title: 'Микроскопические анализы',
        icon: <AngelIcon />,
    link: '/analysis/microscopic'
    },
    {
        id: 'bacterial-culture',
        title: 'Бак. посев',
        icon: <AngelIcon />,
    link: '/analysis/bacterial-culture'
    },
    {
        id: 'allergy',
        title: 'Аллергология',
        icon: <AngelIcon />,
    link: '/analysis/allergy'
    },
    {
        id: 'vitamins',
        title: 'Витамины',
        icon: <AngelIcon />,
    link: '/analysis/vitamins'
    },
    {
        id: 'genetics',
        title: 'Генетика',
        icon: <AngelIcon />,
    link: '/analysis/genetics'
    },
    {
        id: 'immunology',
        title: 'Иммунология',
        icon: <AngelIcon />,
    link: '/analysis/immunology'
    },
    {
        id: 'cytology',
        title: 'Цитология',
        icon: <AngelIcon />,
    link: '/analysis/cytology'
    },
    {
        id: 'pcr',
        title: 'ПЦР-диагностика',
        icon: <AngelIcon />,
    link: '/analysis/pcr'
    }
];