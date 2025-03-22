'use client';

import React, { useState } from 'react';
import DoctorCard from "@/src/shared/components/Doctor/DoctorCard";
import DoctorSearchSection from "@/src/shared/components/Doctor/DoctorSearchSection";
import { useTranslation } from '@/src/hooks/useTranslation';
import { ContactInfo } from '@/src/shared/components/ContactInfo';

// Локализация
const translations = {
  ru: {
    ourSpecialists: 'Наши специалисты',
    showMore: 'Показать еще'
  },
  uz: {
    ourSpecialists: 'Bizning mutaxassislar',
    showMore: 'Ko\'proq ko\'rsatish'
  }
};

const doctorsData = [
  {
    id: '1',
    name: 'Мирбабаева Саодат Аманбаевна',
    specialization: 'Акушер-гинеколог высшей категории',
    experience: '21 год',
    photoUrl: '/images/doctor-img.png'
  },
  {
    id: '2',
    name: 'Ибрагимов Рустам Искандарович',
    specialization: 'Кардиолог высшей категории',
    experience: '15 лет',
    photoUrl: '/images/doctor-img.png'
  },
  {
    id: '3',
    name: 'Алиева Нигора Рахимовна',
    specialization: 'Терапевт высшей категории',
    experience: '18 лет',
    photoUrl: '/images/doctor-img.png'
  },
  {
    id: '4',
    name: 'Рахманов Анвар Тахирович',
    specialization: 'Невролог первой категории',
    experience: '12 лет',
    photoUrl: '/images/doctor-img.png'
  },
  {
    id: '5',
    name: 'Усманова Зарина Акбаровна',
    specialization: 'Офтальмолог высшей категории',
    experience: '16 лет',
    photoUrl: '/images/doctor-img.png'
  },
  {
    id: '6',
    name: 'Ахмедов Бахтияр Шухратович',
    specialization: 'Эндокринолог высшей категории',
    experience: '20 лет',
    photoUrl: '/images/doctor-img.png'
  },
  {
    id: '7',
    name: 'Каримова Дильфуза Хамидовна',
    specialization: 'Дерматолог первой категории',
    experience: '10 лет',
    photoUrl: '/images/doctor-img.png'
  },
  {
    id: '8',
    name: 'Назаров Шавкат Батирович',
    specialization: 'Отоларинголог (ЛОР) высшей категории',
    experience: '25 лет',
    photoUrl: '/images/doctor-img.png'
  }
];

export default function Doctors() {
  const { t } = useTranslation(translations);
  const [visibleDoctors, setVisibleDoctors] = useState(8);
  const [isRotating, setIsRotating] = useState(false);
  
  const handleShowMore = () => {
    setIsRotating(true);
    setVisibleDoctors(prevCount => Math.min(prevCount + 8, doctorsData.length));
    
    // Остановить вращение через 1 секунду
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };
  
  return (
    <main>
      <DoctorSearchSection />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctorsData.slice(0, visibleDoctors).map(doctor => (
            <DoctorCard
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              specialization={doctor.specialization}
              experience={doctor.experience}
              photoUrl={doctor.photoUrl}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <button
            onClick={handleShowMore}
            className="flex items-center justify-center w-full md:w-auto mx-auto px-8 py-4 border border-light-text dark:border-white text-light-text dark:text-white rounded-2xl hover:bg-light-text/5 dark:hover:bg-white/10 transition-colors"
          >
            <svg 
              className={`w-5 h-5 mr-2 ${isRotating ? 'animate-spin' : ''}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23 4V10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 20V14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.51 8.99959C4.01717 7.56637 4.87913 6.28499 6.01547 5.27501C7.1518 4.26502 8.52547 3.55935 10.0083 3.22385C11.4911 2.88834 13.0348 2.93393 14.4952 3.35636C15.9556 3.77879 17.2853 4.5643 18.36 5.63959L23 9.99959M1 13.9996L5.64 18.3596C6.71475 19.4349 8.04437 20.2204 9.50481 20.6428C10.9652 21.0652 12.5089 21.1108 13.9917 20.7753C15.4745 20.4398 16.8482 19.7342 17.9845 18.7242C19.1209 17.7142 19.9828 16.4328 20.49 14.9996" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('showMore')}
          </button>
        </div>
            <ContactInfo />
        <style jsx>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}</style>
    </main>
  );
}