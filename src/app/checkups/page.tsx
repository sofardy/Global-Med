'use client';

import React from 'react';
import UniversalHeroSection from '@/src/shared/components/UniversalHeroSection';
import { checkupHeroData, checkupItemsData } from '@/src/shared/mocks/checkupHeroData';
import { UniversalCard } from '@/src/shared/components/UniversalCard';
import { AppointmentSection } from '@/src/shared/components/AppointmentSection';
import { ContactInfo } from '@/src/shared/components/ContactInfo';

export default function Checkups() {
  return (
    <main>
      <UniversalHeroSection
        imageUrl={checkupHeroData.imageUrl}
        imageAlt={checkupHeroData.imageAlt}
        mainCard={checkupHeroData.mainCard}
        secondaryCards={checkupHeroData.secondaryCards}
      />


         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-20">
        {checkupItemsData.map((item) => (
          <UniversalCard
            key={item.id}
                features={[
    { text: "12 исследований", icon: "doc" },
    { text: "2 часа", icon: "time" }
  ]}
            variant="surgery"
            title={item.title}
            description={item.description}
            icon={item.iconPath}
            link={`/checkups/${item.id}`}
            buttonText="Подробнее"
            showButton={true}
            buttonStyle="filled"
            hoverBgColor="light-accent"
            titleSize="text-2xl md:text-[40px]"
            additionalInfo={`${item.stats[0].value} • ${item.stats[1].value}`}
            className=" border-none shadow-none rounded-b-2xl md:rounded-2xl p-8"
          />
        ))}
      </div>
          <AppointmentSection />
      <ContactInfo />
    </main>
  );
}