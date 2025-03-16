'use client';

import { ThemeToggle } from '../shared/components/ThemeToggle';
import { LocaleToggle } from '../shared/components/LocaleToggle';
import { HeroBanner } from '../shared/components/HeroBanner/HeroBanner';
import { SymptomSelector } from '../shared/components/SymptomSelector/SymptomSelector';
import { MedicalServices } from '../shared/components/MedicalServices/MedicalServices';
import { CheckupSlider } from '../shared/components/CheckupSlider';


export default function Home() {
  return (
    <main>
      <HeroBanner />
      <SymptomSelector />
      <MedicalServices />
      <CheckupSlider/>
        <ThemeToggle />
        <LocaleToggle />
    </main>
  );
}