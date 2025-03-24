'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useThemeStore } from '../../store/theme';
import { useTranslation } from '../../hooks/useTranslation';
import MedicalEquipmentSlider from '@/src/shared/components/Doctor/MedicalEquipmentSlider';
import AdministrationSlider from '@/src/shared/components/Doctor/AdministrationSlider';
import CareerForm from '@/src/shared/components/CareerForm';
import DoctorCertificates, { CertificatesSlider } from '@/src/shared/components/Doctor/CertificateCard';
import { ContactInfo } from '@/src/shared/components/ContactInfo';
import { HeartIconk2, MedicalCrossIcon } from '@/src/shared/ui/Icon';

const certificatesData = [
  {
    id: 'cert1',
    imageUrl: '/images/certificate.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  },
  {
    id: 'cert2',
    imageUrl: '/images/certificate.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  },
  {
    id: 'cert3',
    imageUrl: '/images/certificate.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  },
  {
    id: 'cert4',
    imageUrl: '/images/certificate.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  },
  {
    id: 'cert4',
    imageUrl: '/images/certificate.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  },
  {
    id: 'cert4',
    imageUrl: '/images/certificate.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  },
  {
    id: 'cert4',
    imageUrl: '/images/certificate.png',
    title: 'Лицензия на медицинскую деятельность',
    expiryDate: '19 мая 2027'
  },
];

// Переводы
const translations = {
  ru: {
    title: 'Мы применяем лучшее в медицине, чтобы вы были здоровы',
    description: 'Мы создаем пространство, где инновации в медицине встречаются с опытом врачей, а пациенты получают качественную диагностику и лечение, основанные на точности, внимании и заботе',
    modernMedicine: {
      title: 'Современная медицина',
      description: 'Мы используем передовые методы лечения и диагностики, чтобы обеспечивать пациентам качественную помощь'
    },
    comprehensiveApproach: {
      title: 'Комплексный подход',
      description: 'К каждому пациенту мы подбираем индивидуальное решение, учитывая особенности организма и клиническую картину'
    },
    values: {
      mission: 'Миссия',
      missionDescription: 'Мы стремимся сделать качественную медицину доступной, обеспечивая пациентов точной диагностикой, эффективным лечением и заботой на каждом этапе',
      values: 'Ценности',
      valuesDescription: 'Профессионализм, внимание к деталям и искреннее желание помочь каждому пациенту – это то, что определяет нашу работу',
      responsibility: 'Ответственность',
      responsibilityDescription: 'Мы гарантируем безопасность, точность исследований и строгое соблюдение медицинских стандартов',
      expertise: 'Экспертность',
      expertiseDescription: 'Врачи нашей клиники обладают многолетним опытом, регулярно повышают квалификацию и используют современные методы диагностики и лечения'
    }
  },
  uz: {
    title: 'Biz sog\'lig\'ingiz uchun tibbiyotda eng yaxshisini qo\'llaymiz',
    description: 'Biz tibbiy innovatsiyalar va shifokorlarning tajribasi uyg\'unlashgan, bemorlar aniq diagnostika va davolanishni olishlari mumkin bo\'lgan makon yaratamiz, bu aniqlik, e\'tibor va g\'amxo\'rlikka asoslangan',
    modernMedicine: {
      title: 'Zamonaviy tibbiyot',
      description: 'Biz bemorlarga sifatli yordam ko\'rsatish uchun ilg\'or davolash va diagnostika usullaridan foydalanamiz'
    },
    comprehensiveApproach: {
      title: 'Kompleks yondashuv',
      description: 'Har bir bemor uchun organizmning xususiyatlarini va klinik manzarasini hisobga olgan holda individual yechim tanlaymiz'
    },
    values: {
      mission: 'Missiya',
      missionDescription: 'Biz sifatli tibbiyotni hammabop qilishga, bemorlarga aniq diagnostika, samarali davolash va har bir bosqichda g\'amxo\'rlik ko\'rsatishga intilamiz',
      values: 'Qadriyatlar',
      valuesDescription: 'Professionallik, detallarga e\'tibor va har bir bemorga yordam berishga samimiy istak – bu bizning ishimizni belgilaydigan omillar',
      responsibility: 'Mas\'uliyat',
      responsibilityDescription: 'Biz xavfsizlik, tekshiruvlar aniqligi va tibbiy standartlarga qat\'iy rioya qilishni kafolatlaymiz',
      expertise: 'Ekspertlik',
      expertiseDescription: 'Klinikamiz shifokorlari ko\'p yillik tajribaga ega, muntazam malakalarini oshiradilar va diagnostika va davolashning zamonaviy usullaridan foydalanadilar'
    }
  }
};

export default function Clinic() {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);

  // Компонент карточки для ценностей
  const ValueCard = ({ 
    title, 
    description, 
    number, 
    greenOnLoad = false 
  }: { 
    title: string; 
    description: string; 
    number: string;
    greenOnLoad?: boolean;
  }) => {
    const [hover, setHover] = useState(greenOnLoad);
    
    return (
      <div 
        className={`p-6 rounded-2xl transition-all duration-300 h-full min-h-[400px] ${
          hover 
            ? 'bg-light-accent text-white' 
            : theme === 'light' 
              ? 'bg-white text-light-text' 
              : 'bg-dark-block text-dark-text'
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => !greenOnLoad && setHover(false)}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-2xl font-medium">{title}</h3>
            <span className="text-3xl font-light">{number}</span>
          </div>
          <p className="text-base opacity-80 mt-auto" >{description}</p>
        </div>
      </div>
    );
  };

  interface IconProps {
  color?: string;
  size?: number;
  [key: string]: any; // Allow any additional props
}


  // Компонент карточки с функцией
  const FeatureCard = ({ 
    title, 
    description,
    icon,
    greenOnLoad = false 
  }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    greenOnLoad?: boolean;
  }) => {
    const [hover, setHover] = useState(greenOnLoad);
    const coloredIcon = React.isValidElement(icon) 
  ? React.cloneElement(icon as React.ReactElement<IconProps>, {
      color: hover ? 'white' : (theme === 'light' ? '#094A54' : 'white'),
    })
  : icon;
    return (
      <div 
        className={`p-8 rounded-2xl transition-all duration-300 h-full min-h-[450px] ${
          hover 
            ? 'bg-light-accent text-white' 
            : theme === 'light' 
              ? 'bg-white text-light-text' 
              : 'bg-dark-block text-dark-text'
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => !greenOnLoad && setHover(false)}
      >
        <div className="flex flex-col h-full">
          <h3 className="text-2xl font-medium mb-4">{title}</h3>
          <div className={`my-auto transition-all flex justify-center ${hover ? 'text-white' : 'text-light-accent dark:text-light-accent'}`}>
            {coloredIcon}
          </div>
          <p className="text-base opacity-80 mt-auto">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <main>
      <div>
        {/* Фото клиники */}
        <div className="rounded-2xl overflow-hidden h-[400px] relative mb-40">
          <Image 
            src="/images/clinic-building.png" 
            alt="Clinic building"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Три блока в одной плоскости с правильными пропорциями */}
        <div className="grid grid-cols-12 gap-8 mb-40">
          {/* Блок с заголовком и описанием - 50% ширины */}
          <div className="col-span-12 md:col-span-6 bg-white dark:bg-dark-block p-8 rounded-2xl flex flex-col min-h-[350px]">
            <h1 className="text-2xl md:text-[34px] font-medium text-light-text dark:text-dark-text mb-6">
              {t('title')}
            </h1>
            <p className="text-base text-light-text dark:text-dark-text opacity-80 mt-auto">
              {t('description')}
            </p>
          </div>
          
          {/* Современная медицина - 25% ширины */}
          <div className="col-span-12 md:col-span-3">
            <FeatureCard 
              title={t('modernMedicine.title')}
              description={t('modernMedicine.description')}
              icon={<MedicalCrossIcon/>}
            />
          </div>
          
          {/* Комплексный подход - 25% ширины */}
          <div className="col-span-12 md:col-span-3">
            <FeatureCard 
              title={t('comprehensiveApproach.title')}
              description={t('comprehensiveApproach.description')}
              icon={<HeartIconk2/>}
            />
          </div>
        </div>
        
        {/* Секция ценностей */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <ValueCard 
            title={t('values.mission')}
            description={t('values.missionDescription')}
            number="01"
          />
          <ValueCard 
            title={t('values.values')}
            description={t('values.valuesDescription')}
            number="02"
          />
          <ValueCard 
            title={t('values.responsibility')}
            description={t('values.responsibilityDescription')}
            number="03"
          />
          <ValueCard 
            title={t('values.expertise')}
            description={t('values.expertiseDescription')}
            number="04"
          />
        </div>
      </div>
      <MedicalEquipmentSlider />
      <AdministrationSlider/>
      <CareerForm />
       <CertificatesSlider 
        certificates={certificatesData}
        title="Доверие и качество"
        description="Все наши медицинские услуги лицензированы и соответствуют строгим стандартам"
      />
       <ContactInfo />
    </main>
  );
}