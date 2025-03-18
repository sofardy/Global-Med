import React from 'react';
import { UniversalSlider } from '../components/UniversalSlider';
import { DoctorCard } from './DoctorCard';
import { useTranslation } from '@/src/hooks/useTranslation';

// Translations
const translations = {
  ru: {
    title: 'Команда опытных врачей рядом с вами',
    description: 'Индивидуальный подход, современные методы лечения и внимательное отношение к каждому пациенту',
    buttonText: 'Записаться на прием',
    prevSlide: 'Предыдущий слайд',
    nextSlide: 'Следующий слайд',
    doctors: [
      {
        id: 'abdiganiev',
        name: 'Саидазимхон Абдиганиев',
        specialization: 'Аллерголог-иммунолог',
        image: '/images/doctor-1.png',
      },
      {
        id: 'valieva',
        name: 'Наима Валиева',
        specialization: 'Врач УЗИ',
        image: '/images/doctor-2.png',
      },
      {
        id: 'abdudjabborov',
        name: 'Абдулхай Абдужабборов',
        specialization: 'Педиатр',
        image: '/images/doctor-3.png',
      },
      {
        id: 'ishbekova',
        name: 'Зулайхо Ишбекова',
        specialization: 'Кардиолог',
        image: '/images/doctor-4.png',
      },
      {
        id: 'ishbekova2',
        name: 'Зулайхо Ишбекова',
        specialization: 'Кардиолог',
        image: '/images/doctor-4.png',
      },
    ]
  },
  uz: {
    title: 'Tajribali shifokorlar jamoasi siz bilan birga',
    description: 'Individual yondashuv, zamonaviy davolash usullari va har bir bemorga e\'tiborli munosabat',
    buttonText: 'Qabulga yozilish',
    prevSlide: 'Oldingi slayd',
    nextSlide: 'Keyingi slayd',
    doctors: [
      {
        id: 'abdiganiev',
        name: 'Saidazimxon Abdiganiyev',
        specialization: 'Allergolog-immunolog',
        image: '/images/doctor-1.png',
      },
      {
        id: 'valieva',
        name: 'Naima Valiyeva',
        specialization: 'Ultratovush shifokori',
        image: '/images/doctor-2.png',
      },
      {
        id: 'abdudjabborov',
        name: 'Abdulxay Abdudjabborov',
        specialization: 'Pediatr',
        image: '/images/doctor-3.png',
      },
      {
        id: 'ishbekova',
        name: 'Zulayxo Ishbekova',
        specialization: 'Kardiolog',
        image: '/images/doctor-4.png',
      },
      {
        id: 'ishbekova2',
        name: 'Zulayxo Ishbekova',
        specialization: 'Kardiolog',
        image: '/images/doctor-4.png',
      },
    ]
  }
};

export interface DoctorsSliderProps {
  className?: string;
}

export const DoctorsSlider: React.FC<DoctorsSliderProps> = ({
  className = ''
}) => {
  const { t } = useTranslation(translations);
  
  // Get localized data
  const doctors = t('doctors', { returnObjects: true }) as any[];
  const buttonText = t('buttonText');
  
  // Split text into lines for better presentation
  const splitTextIntoLines = (text: string, lineCount: number) => {
    if (!text) return [];
    
    const words = text.split(' ');
    const wordsPerLine = Math.ceil(words.length / lineCount);
    
    const lines = [];
    for (let i = 0; i < lineCount; i++) {
      const startIndex = i * wordsPerLine;
      const endIndex = Math.min(startIndex + wordsPerLine, words.length);
      if (startIndex < words.length) {
        lines.push(words.slice(startIndex, endIndex).join(' '));
      }
    }
    
    return lines;
  };
  
  // Format title and description into multiple lines
  const titleLines = splitTextIntoLines(t('title'), 2);
  const descriptionLines = splitTextIntoLines(t('description'), 3);
  
  // Create title component with line breaks
  const titleComponent = (
    <h2 className="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text leading-tight">
      {titleLines.map((line, index) => (
        <span key={index} className="block">{line}</span>
      ))}
    </h2>
  );
  
  // Create description component with line breaks
  const descriptionComponent = (
    <p className="text-base md:text-lg text-light-text dark:text-dark-text">
      {descriptionLines.map((line, index) => (
        <span key={index} className="block">{line}</span>
      ))}
    </p>
  );
  
  // Create slides with doctor cards
  const slides = doctors.map((doctor) => (
    <DoctorCard
      key={doctor.id}
      id={doctor.id}
      name={doctor.name}
      specialization={doctor.specialization}
      image={doctor.image}
      buttonText={buttonText}
      className="h-full"
    />
  ));
  
  return (
    <UniversalSlider
      slides={slides}
      title={titleComponent}
      description={descriptionComponent}
      slidesPerView={4}
      slidesPerMobileView={1}
      spaceBetween={20}
      showNavigation={true}
      navigationPrevLabel={t('prevSlide')}
      navigationNextLabel={t('nextSlide')}
      showPagination={false}
      className={`${className} doctors-slider`}
      wrapperClassName="mt-20"
    />
  );
};
