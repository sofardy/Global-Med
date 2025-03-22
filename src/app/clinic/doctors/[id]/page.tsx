'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DoctorDetail from '@/src/shared/components/Doctor/DoctorDetail';

// Временное моковое хранилище, в будущем будет заменено на API запросы
const doctorsData = {
  '1': {
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
  },
  // Здесь могут быть другие доктора
};

export default function DoctorDetailPage() {
  const params = useParams();
  const { id } = params;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Имитация API запроса
      const fetchDoctor = async () => {
        
      try {
          setLoading(true);
          
        //здесь будет API
        // const response = await fetch(`/api/doctors/${id}`);
        
        setTimeout(() => {
          const data = doctorsData[id];
          if (!data) {
            throw new Error('Доктор не найден');
          }
          setDoctor(data);
          setLoading(false);
        }, 500); // Имитация задержки сети
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
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

  if (error || !doctor) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-light-text dark:text-dark-text mb-4">
            {error || 'Доктор не найден'}
          </h2>
          <p className="text-light-text/70 dark:text-dark-text/70">
            Возможно, указан неверный идентификатор или доктор был удален
          </p>
        </div>
      </div>
    );
  }

  return <DoctorDetail doctor={doctor} />;
}