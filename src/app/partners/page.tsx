'use client';

import React, { useEffect } from 'react';
import ComprehensiveApproach from "@/src/shared/components/ComprehensiveApproach";
import ContactForm from "@/src/shared/components/ContactForm";
import { ContactInfo } from "@/src/shared/components/ContactInfo";
import PartnerBenefits from "@/src/shared/components/PartnerBenefits";
import WhyChooseUs from "@/src/shared/components/WhyChooseUs";
import { usePartnersStore } from '@/src/store/partners';
import { useLanguageStore } from '@/src/store/language';

export default function Partners() {
  const { fetchPartners, loading, error } = usePartnersStore();
  const { currentLocale } = useLanguageStore();
  
  // Инициируем загрузку данных на уровне страницы
  useEffect(() => {
    fetchPartners(currentLocale);
  }, [fetchPartners, currentLocale]);
  
  // Отображение загрузки для всей страницы
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-light-accent mb-4" />
        </div>
      </div>
    );
  }

  // Отображение ошибки для всей страницы
  if (error) {
    return (
      <div className="container max-w-8xl mx-auto px-4 md:px-6 py-16">
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <h2 className="text-2xl font-medium text-red-700 dark:text-red-200 mb-4">Произошла ошибка</h2>
          <p className="text-red-600 dark:text-red-100">
            Не удалось загрузить данные о партнерских программах. Пожалуйста, попробуйте позже или обратитесь в службу поддержки.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-light-accent text-white rounded-lg hover:bg-light-accent/90 transition-colors"
            onClick={() => fetchPartners(currentLocale)}
          >
            Повторить попытку
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <main>
      <PartnerBenefits />
      <ComprehensiveApproach />
      <WhyChooseUs />
      <ContactForm />
      <ContactInfo />
    </main>
  );
}