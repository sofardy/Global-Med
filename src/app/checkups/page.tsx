'use client';

import React from 'react';
import UniversalHeroSection from '@/src/shared/components/UniversalHeroSection';
import { checkupHeroData } from '@/src/shared/mocks/checkupHeroData';
import { UniversalCard } from '@/src/shared/components/UniversalCard';
import { AppointmentSection } from '@/src/shared/components/AppointmentSection';
import { ContactInfo } from '@/src/shared/components/ContactInfo';

import { useCheckups } from '@/src/hooks/useCheckups';

export default function Checkups() {
  const { checkups: checkupItems, loading, error } = useCheckups();

  // Функция для создания SVG элемента с измененным размером
  const renderSvgWithSize = (svgString: string | null) => {
    if (!svgString) return null;

    
    // Создаем обёртку для SVG с нужным размером
    return (
      <div 
        className="w-[190px] h-[190px] flex items-center justify-center"
        dangerouslySetInnerHTML={{ 
          __html: svgString.replace(/width="(\d+)"/, 'width="190"')
                           .replace(/height="(\d+)"/, 'height="190"') 
        }}
      />
    );
  };

  return (
    <main>
      <UniversalHeroSection
        imageUrl={checkupHeroData.imageUrl}
        imageAlt={checkupHeroData.imageAlt}
        mainCard={checkupHeroData.mainCard}
        secondaryCards={checkupHeroData.secondaryCards}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64 mt-20">
          <div className="text-xl text-light-text dark:text-dark-text">Загрузка программ обследования...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 mt-20">
          <div className="text-xl text-red-500">Ошибка при загрузке данных. Пожалуйста, попробуйте позже.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-20">
          {checkupItems.map((item) => (
            <UniversalCard
              key={item.uuid}
              features={[
                { text: `${item.medical_tests.length} ${currentLocale === 'uz' ? 'tadqiqot' : 'исследований'}`, icon: "doc" },
                { text: item.duration, icon: "time" }
              ]}
              variant="surgery"
              title={item.title}

              description={item.card_description || item.mini_description || item.description}
              // Используем SVG из API с нужным размером
              icon={renderSvgWithSize(item.icon)}

              link={`/checkups/${item.slug}`}
              buttonText="Подробнее"
              showButton={true}
              buttonStyle="filled"
              hoverBgColor="light-accent"
              titleSize="text-2xl md:text-[40px]"
              additionalInfo={`${item.medical_tests.length} ${currentLocale === 'uz' ? 'tadqiqot' : 'исследований'} • ${item.duration}`}
              className="border-none shadow-none rounded-b-2xl md:rounded-2xl p-8"
            />
          ))}
        </div>
      )}
          
      <AppointmentSection />
      <ContactInfo />
    </main>
  );
}