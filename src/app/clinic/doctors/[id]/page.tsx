'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DoctorDetail from '@/src/shared/components/Doctor/DoctorDetail';

// Определение типов для данных о докторе
interface EducationItem {
 years?: string;
 institution: string;
 course?: string;
}

interface Doctor {
 id: string;
 name: string;
 specialization: string;
 qualification: string;
 category: string;
 languages: string;
 experience: string;
 appointmentCost: string;
 photoUrl: string;
 basicEducation: EducationItem[];
 additionalEducation: EducationItem[];
}

// Тип для хранилища докторов
interface DoctorsDataStore {
 [key: string]: Doctor;
}

// Временное моковое хранилище с одним доктором
const defaultDoctor = {
  id: '1',
  name: 'Мирбабаева Саодат Аманбаевна',
  specialization: 'Акушер-гинеколог, врач ультразвуковой диагностики',
  qualification: 'кандидат медицинских наук',
  category: 'высшая',
  languages: 'узбекский, русский',
  experience: '21 год',
  appointmentCost: 'от 125 000 сум',
  photoUrl: '/images/doctor-img.png',
  basicEducation: [
    {
      years: '1993-1999',
      institution: 'Ошский Государственный университет'
    },
    {
      years: '1999-2001',
      institution: 'Казанская государственная медицинская академия'
    },
    {
      years: '2002-2004',
      institution: 'Федеральное государственное бюджетное образовательное учреждение высшего образования «Башкирский государственный медицинский университет» Министерства здравоохранения Российской Федерации'
    }
  ],
  additionalEducation: [
    {
      course: 'Курс «Актуальные вопросы перинатальной медицины»',
      institution: 'ФГАОУВО «Российский университет дружбы народов», г. Санкт-Петербург'
    },
    {
      course: 'Курс «Лапароскопия в акушерстве и гинекологии»',
      institution: 'ФГБОУВО «Первый Санкт-Петербургский медицинский университет имени академика И.П. Павлова»'
    },
    {
      course: 'Курс «Пренатальный скрининг первого триместра»',
      institution: 'ЧОУ ДПО «Северо-Западная Высшая медицинская школа»'
    }
  ]
};

// Заполняем хранилище одним доктором для разных ID
const doctorsData: DoctorsDataStore = {};
// Добавляем доктора для ID от 1 до 10
for (let i = 1; i <= 10; i++) {
  doctorsData[i.toString()] = {
    ...defaultDoctor,
    id: i.toString()
  };
}

export default function DoctorDetailPage(): JSX.Element {
 const params = useParams();
 const id = params?.id;
 const [doctor, setDoctor] = useState<Doctor | null>(null);
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
   // Имитация API запроса
   const fetchDoctor = async (): Promise<void> => {
     try {
       setLoading(true);
       
       // Имитация задержки сети
       setTimeout(() => {
         // Проверяем и преобразуем id к нужному типу
         const doctorId = Array.isArray(id) ? id[0] : id;
         
         if (!doctorId) {
           throw new Error('Некорректный идентификатор доктора');
         }
         
         // Проверяем, есть ли доктор с указанным ID
         if (doctorsData[doctorId]) {
           setDoctor(doctorsData[doctorId]);
         } else {
           // Если нет, возвращаем дефолтного доктора
           console.log(`Доктор с ID ${doctorId} не найден, возвращаем дефолтного доктора`);
           setDoctor(defaultDoctor);
         }
         
         setLoading(false);
       }, 500);
     } catch (err) {
       console.error('Ошибка при загрузке доктора:', err);
       // В случае ошибки всё равно показываем дефолтного доктора
       setDoctor(defaultDoctor);
       setLoading(false);
     }
   };

   if (id) {
     fetchDoctor();
   } else {
     // Если ID не указан, показываем дефолтного доктора
     setDoctor(defaultDoctor);
     setLoading(false);
   }
 }, [id]);

 if (loading) {
   return (
     <div className="container mx-auto py-10 flex items-center justify-center min-h-[60vh]">
       <div className="animate-pulse flex flex-col items-center">
         <div className="w-12 h-12 rounded-full border-4 border-light-accent border-t-transparent animate-spin"></div>
         <p className="mt-4 text-light-text dark:text-dark-text">Загрузка...</p>
       </div>
     </div>
   );
 }

 // Если возникла ошибка или доктор не найден, показываем дефолтного доктора
 if (!doctor) {
   return <DoctorDetail doctor={defaultDoctor} />;
 }

 return <DoctorDetail doctor={doctor} />;
}