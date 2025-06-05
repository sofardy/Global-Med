"use client";

import { useEffect } from "react";
import { useClientSide } from "../hooks/useClientSide";
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
  const { setHomeData, isLoading, error } = useHomeStore();
  const { currentLocale } = useLanguageStore();
  const isClient = useClientSide();

  useEffect(() => {
    // isClient bo'lganda va locale mavjud bo'lganda fetch qilish
    if (isClient && currentLocale) {
      const fetchData = async () => {
        await setHomeData(currentLocale);
      };
      fetchData();
    }
  }, [currentLocale, isClient, setHomeData]);

  // Get loading text based on current locale
  const getLoadingText = () => {
    switch (currentLocale) {
      case "ru":
        return "Загрузка...";
      case "uz":
        return "Yuklanmoqda...";
      case "en":
        return "Loading...";
      default:
        return "Yuklanmoqda...";
    }
  };

  // Get error text based on current locale
  const getErrorText = () => {
    switch (currentLocale) {
      case "ru":
        return "Произошла ошибка";
      case "uz":
        return "Xatolik yuz berdi";
      case "en":
        return "An error occurred";
      default:
        return "Xatolik yuz berdi";
    }
  };

  // Get retry button text based on current locale
  const getRetryText = () => {
    switch (currentLocale) {
      case "ru":
        return "Попробовать снова";
      case "uz":
        return "Qayta urinish";
      case "en":
        return "Try again";
      default:
        return "Qayta urinish";
    }
  };

  // Loading holatini ko'rsatish
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{getLoadingText()}</p>
        </div>
      </main>
    );
  }

  // Error holatini ko'rsatish
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {getErrorText()}: {error}
          </p>
          <button
            onClick={async () => {
              if (isClient && currentLocale) {
                await setHomeData(currentLocale);
              }
            }}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            {getRetryText()}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <HeroBanner />
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
