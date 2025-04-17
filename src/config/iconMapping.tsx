// src/shared/utils/iconMapping.tsx
import React from 'react';
import {
  HemoglobinIcon,
  NutritionIcon,
  PencilRulerIcon,
  MedicalBookHeartIcon,
  CandleIcon,
  HealthIcon,
  VirusIcon,
  VirusIconK2,
  ImmuneIcon,
  LampIcon,
  MedicalIcon,
  CalculatorIcon,
  BrainIcon,
  ButterflyWingsIcon,
  MedicalBookIcon,
  AngelIcon,
} from '@/src/shared/ui/Icon';

// Функция для получения иконки по идентификатору
export const getAnalysisIcon = (slug: string, size: number = 80) => {
  const iconMapping: Record<string, React.ReactNode> = {
    'koagulogramma': <HemoglobinIcon size={size} />,
    'bioximiceskie-analizy': <NutritionIcon size={size} />,
    'ekspress-test': <PencilRulerIcon size={size} />,
    'bioximiia-moci': <MedicalBookHeartIcon size={size} />,
    'revmatoidnye-faktory': <CandleIcon size={size} />,
    'torch-infekcii-igm': <HealthIcon size={size} />,
    'torch-infekcii-igg': <HealthIcon size={size} />,
    'infekcii': <VirusIcon size={size} />,
    'virusnye-gepatity': <VirusIconK2 size={size} />,
    'parazity': <ImmuneIcon size={size} />,
    'gematologiia': <ImmuneIcon size={size} />,
    'analizy-krovi': <LampIcon size={size} />,
    'gormony': <MedicalIcon size={size} />,
    'fermenty-krovi': <CalculatorIcon size={size} />,
    'obshhii-analiz-krovi': <BrainIcon size={size} />,
    'opuxolevye-markery': <ButterflyWingsIcon size={size} />,
    'gruppa-krovi': <LampIcon size={size} />,
    'mikroskopiceskie-analizy': <NutritionIcon size={size} />,
    'bak-posev': <MedicalBookIcon size={size} />,
    'allergologiia': <AngelIcon size={size} />,
  };

  return iconMapping[slug] || <MedicalIcon size={size} />;
};