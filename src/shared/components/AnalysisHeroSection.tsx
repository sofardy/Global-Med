'use client';

import React from 'react';
import UniversalHeroSection from '@/src/shared/components/UniversalHeroSection';
import { analysisHeroData } from '../mocks/analysisHeroData';


interface AnalysisHeroSectionProps {
  className?: string;
}

export const AnalysisHeroSection: React.FC<AnalysisHeroSectionProps> = ({
  className = ''
}) => {
  return (
    <div className={className}>
      <UniversalHeroSection
        imageUrl={analysisHeroData.imageUrl}
        imageAlt={analysisHeroData.imageAlt}
        mainCard={analysisHeroData.mainCard}
        secondaryCards={analysisHeroData.secondaryCards}
      />
    </div>
  );
};

export { analysisHeroData };