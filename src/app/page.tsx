"use client";

import { useEffect } from "react";
import { AnalysisGrid } from "../shared/components/AnalysisGrid";
import { AppointmentSection } from "../shared/components/AppointmentSection";
import { BenefitsGrid } from "../shared/components/BenefitsGrid";
import CareerForm from "../shared/components/CareerForm";
import { CheckupSlider } from "../shared/components/CheckupSlider";
import { ContactInfo } from "../shared/components/ContactInfo";
import { DoctorsSlider } from "../shared/components/DoctorsSlider";
import { HeroBanner } from "../shared/components/HeroBanner/HeroBanner";
import { MedicalGallery } from "../shared/components/MedicalGallery";
import { MedicalServices } from "../shared/components/MedicalServices/MedicalServices";
import OurPartners from "../shared/components/OurPartners/OurPartners";
import { ReviewsSlider } from "../shared/components/Review/ReviewsSlider";
import { SurgerySlider } from "../shared/components/SurgerySlider";
import { VideoBanner } from "../shared/components/VideoBanner";
import { useHomeStore } from "../store/home";
import { useLanguageStore } from "../store/language";

export default function Home() {
  const { fetchHomeData } = useHomeStore();
  const currentLocale = useLanguageStore();
  useEffect(() => {
    fetchHomeData();
  }, [currentLocale]);
  return (
    <main>
      {/* done */}
      <HeroBanner />
      {/* done */}
      <MedicalServices />
      {/* done */}
      <CheckupSlider />
      {/* done */}
      <AnalysisGrid />
      {/* done */}
      <SurgerySlider />
      <AppointmentSection />
      <VideoBanner />
      <BenefitsGrid />
      <MedicalGallery />
      <DoctorsSlider />
      {/* done */}
      <CareerForm />
      {/* done */}
      <ReviewsSlider />
      {/* done */}
      <OurPartners />
      <ContactInfo />
    </main>
  );
}
