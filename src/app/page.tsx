'use client';

import { ThemeToggle } from '../shared/components/ThemeToggle';
import { LocaleToggle } from '../shared/components/LocaleToggle';
import { HeroBanner } from '../shared/components/HeroBanner/HeroBanner';
import { SymptomSelector } from '../shared/components/SymptomSelector/SymptomSelector';
import { MedicalServices } from '../shared/components/MedicalServices/MedicalServices';
import { CheckupSlider } from '../shared/components/CheckupSlider';
import { AnalysisGrid } from '../shared/components/AnalysisGrid';
import { SurgerySlider } from '../shared/components/SurgerySlider';
import { AppointmentSection } from '../shared/components/AppointmentSection';
import { VideoBanner } from '../shared/components/VideoBanner';
import { BenefitsGrid } from '../shared/components/BenefitsGrid';
import MedicalGallery  from '../shared/components/MedicalGallery';


export default function Home() {
  return (
    <main>
      <HeroBanner />
      <SymptomSelector />
      <MedicalServices />
      <CheckupSlider />
      <AnalysisGrid />
      <SurgerySlider />
      <AppointmentSection />
      <VideoBanner />
      <BenefitsGrid />
      <MedicalGallery />

        <ThemeToggle />
        <LocaleToggle />
    </main>
  );
}