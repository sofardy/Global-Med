'use client';

import { ThemeToggle } from '../shared/components/ThemeToggle';
import { LocaleToggle } from '../shared/components/LocaleToggle';
import { HeroBanner } from '../shared/components/HeroBanner/HeroBanner';


export default function Home() {
  return (
    <main>
         <HeroBanner />
        <ThemeToggle />
        <LocaleToggle />
    </main>
  );
}