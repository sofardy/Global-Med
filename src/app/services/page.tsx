'use client';

import React, { useState, useEffect } from 'react';
import UniversalHeroSection from '@/src/shared/components/UniversalHeroSection';
import { UniversalCard } from '@/src/shared/components/UniversalCard';
import { useThemeStore } from '@/src/store/theme';
import { applyColorToIcon, getIconColorByTheme } from '@/src/shared/utils/iconUtils';
import { ContactInfo } from '@/src/shared/components/ContactInfo';
import { AppointmentSection } from '@/src/shared/components/AppointmentSection';
import axios from 'axios';
import { 
  LightbulbIcon, 
  EyeIcon, 
  ButterflyIcon, 
  MedicalIcon,
  AngelIcon,
  BlobShape,
  ButterflyWingsIcon,
  DocumentPenIcon,
  MedicalMicroscopeIcon,
  ThyroidIcon,
} from '@/src/shared/ui/Icon';
import BonesIcon from '@/src/shared/ui/Icon/BonesIcon';
import NoseIcon from '@/src/shared/ui/Icon/NoseIcon';

// Определение маппинга slug к иконкам
const serviceIconMap: {
  [key: string]: React.ReactNode;
} = {
  'lor-247': <LightbulbIcon size={80} />,
  'oftalmologiia': <EyeIcon size={80} />,
  'pediatriia': <ButterflyIcon size={80} />,
  'ginekologiia': <AngelIcon size={80} />,
  'nevrologiia': <BlobShape size={80} />,
  'onkologiia': <ButterflyWingsIcon size={80} />,
  'xirurgiia': <DocumentPenIcon size={80} />,
  'uzi': <MedicalMicroscopeIcon size={80} />,
  'endokrinologiia': <ThyroidIcon size={80} />,
  'travmatologiia': <AngelIcon size={80} />
};

// Интерфейс для данных услуг
interface Service {
  uuid: string;
  slug: string;
  name: string;
  card_description: string;
  description: string;
  mini_description: string;
  icon: string | null;
  symptoms_list: string[];
  services_list: { name: string; value: string }[];
}

interface ServicesResponse {
  data: Service[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

// Моковые данные для hero секции, так как они не предоставляются API
const heroData = {
  imageUrl: "/images/medical-services.png",
  imageAlt: "Медицинские услуги в нашей клинике",
  mainCard: {
    title: "Медицинские услуги",
    description: "Мы предоставляем профессиональное обследование и лечение, используя новейшие методы и оборудование, чтобы обеспечить вам высококачественную медицинскую помощь. В нашем центре вас ждут опытные врачи, готовые предоставить индивидуальный подход и гарантировать комфорт на каждом этапе лечения."
  },
  secondaryCards: [
    {
      title: "10",
      description: "направлений, в которых мы оказываем высококачественное медицинское обслуживание"
    },
    {
      title: "10 000+",
      description: "пациентов ежегодно доверяют нам своё здоровье, проходя диагностику и лечение в клинике"
    }
  ]
};

export default function ServicesPage() {
  const { theme } = useThemeStore();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ServicesResponse>('https://globalmed.kelyanmedia.com/api/services');
        console.log(response);
        setServices(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке списка услуг:', err);
        setError(err instanceof Error ? err : new Error('Ошибка при загрузке данных'));
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getIconForService = (slug: string) => {
    return serviceIconMap[slug] || <MedicalIcon size={80} />;
  };

  return (
    <main>
      {/* Hero секция */}
      <UniversalHeroSection
        imageUrl={heroData.imageUrl}
        imageAlt={heroData.imageAlt}
        mainCard={heroData.mainCard}
        secondaryCards={heroData.secondaryCards}
        className="mb-20"
      />
      
      {/* Секция услуг - список карточек */}
      <div className="w-full mt-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-light-text dark:text-dark-text">Загрузка услуг...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-red-500">Ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.uuid} className="h-full">
                <UniversalCard
                  variant="service"
                  title={service.name}
                  description={service.card_description || service.mini_description}
                  additionalInfo={`${service.services_list.length} услуг`}
                  icon={applyColorToIcon(getIconForService(service.slug), getIconColorByTheme(theme))}
                  link={`/services/${service.slug}`}
                  buttonText="Подробнее"
                  className="h-full"
                  iconPosition="center"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <AppointmentSection />
      <ContactInfo/>
    </main>
  );
}