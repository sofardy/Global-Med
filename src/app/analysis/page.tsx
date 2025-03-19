'use client';

import React from 'react';
import { AnalysisHeroSection } from '@/src/shared/components/AnalysisHeroSection';
import AnalysisGridTho from '@/src/shared/components/AnalysisGridTho';

export default function AnalysisPage() {
  return (
    <main>
      <AnalysisHeroSection />
      <AnalysisGridTho />
    </main>
  );
}