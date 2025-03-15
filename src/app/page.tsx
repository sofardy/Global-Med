'use client';

import { ThemeToggle } from '../shared/components/ThemeToggle';
import { LocaleToggle } from '../shared/components/LocaleToggle';
import { HeroBanner } from '../shared/components/HeroBanner/HeroBanner';
import { SymptomSelector } from '../shared/components/SymptomSelector/SymptomSelector';


export default function Home() {
  return (
    <main>
      <HeroBanner />
       <SymptomSelector />
        <ThemeToggle />
        <LocaleToggle />
    </main>
  );
}