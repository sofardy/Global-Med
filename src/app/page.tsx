"use client";

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

export default function Home() {
  return (
    <main>
      <HeroBanner />
      {/*<SymptomSelector />*/}

      <MedicalServices />
      <CheckupSlider />
      <AnalysisGrid />
      <SurgerySlider />
      <AppointmentSection />
      <VideoBanner />
      <BenefitsGrid />
      <MedicalGallery />
      <DoctorsSlider />
      <CareerForm />
      <ReviewsSlider />
      <OurPartners />
      <ContactInfo />
    </main>
  );
}
