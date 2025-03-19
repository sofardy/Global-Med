'use client';

import React from 'react';
import UniversalHeroSection from '@/src/shared/components/UniversalHeroSection';
import { UniversalCard } from '@/src/shared/components/UniversalCard';
import { medicalServicesMockData } from '@/src/shared/mocks/medicalServicesMockData';
import { useThemeStore } from '@/src/store/theme';
import { applyColorToIcon, getIconColorByTheme } from '@/src/shared/utils/iconUtils';
import { ContactInfo } from '@/src/shared/components/ContactInfo';
import { AppointmentSection } from '@/src/shared/components/AppointmentSection';

export default function ServicesPage() {
  const { theme } = useThemeStore();
  const { hero, services } = medicalServicesMockData;

  return (
    <main>
      {/* Hero секция */}
      <UniversalHeroSection
        imageUrl={hero.imageUrl}
        imageAlt={hero.imageAlt}
        mainCard={hero.mainCard}
        secondaryCards={hero.secondaryCards}
        className="mb-20"
      />
      
      {/* Секция услуг - только список карточек */}
      <div className="w-full mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services && services.map((service) => (
            <div key={service.id} className="h-full">
              <UniversalCard
                variant="service"
                title={service.title}
                description={service.description}
                additionalInfo={service.servicesCount}
                icon={applyColorToIcon(service.iconPath, getIconColorByTheme(theme))}
                link={`/services/${service.id}`}
                buttonText="Подробнее"
                className="h-full"
                iconPosition="center"
              />
            </div>
          ))}
        </div>
      </div>
      <AppointmentSection />
      <ContactInfo/>
    </main>
  );
}