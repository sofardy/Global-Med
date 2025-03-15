'use client';

import React, { useState, useEffect } from 'react';
import { UniversalCard } from '../UniversalCard';
import { useTranslation } from '@/src/hooks/useTranslation';
import Image from 'next/image';

interface CardData {
  id: string;
  title: string;
  subtitle: string; 
  description: string | string[];
  iconPath: string;
}

const translations = {
  ru: {
    title: {
      line1: 'Не знаете, к какому',
      line2: 'врачу обратиться?'
    },
    subtitle: 'Выберите свой симптом — и мы подскажем, к какому специалисту записаться, какие анализы помогут уточнить диагноз, а также какие чек-апы стоит пройти для комплексной проверки здоровья',
    selectSymptoms: 'Выберите до 3-х симптомов',
    noSymptomsSelected: 'Для получения рекомендаций выберите один из симптомов',
    symptoms: [
      'Аллергия',
      'Боль в суставах',
      'Простуда',
      'Боль в горле',
      'Женское здоровье',
      'Нарушение зрения',
      'Боль в сердце',
      'Головная боль',
      'Расстройство пищеварения',
      'Повышенная утомляемость',
      'Мужское здоровье',
      'Отечность'
    ],
    cards: [
      {
        id: 'checkup',
        title: 'Какой чек-ап пройти?',
        subtitle: 'Аллергия', 
        description: 'Чек-ап «Женское здоровье» или «Мужское здоровье до 40 лет»',
        iconPath: '/icon/Group(8).svg'
      },
      {
        id: 'analysis',
        title: 'Какие анализы сдать?',
        subtitle: 'Аллергия',
        description: [
          'Иммуноглобулин E (IgE)',
          'Аллергопанель'
        ],
        iconPath: '/icon/Group(8).svg'
      },
      {
        id: 'services',
        title: 'Дополнительные услуги',
        subtitle: 'Аллергия',
        description: [
          'Аллергопробы',
          'Консультация пульмонолога'
        ],
        iconPath: '/icon/Group(8).svg'
      },
      {
        id: 'specialist',
        title: 'К кому обратиться?',
        subtitle: 'Аллергия',
        description: 'Аллерголог-иммунолог — проведёт диагностику и подберёт лечение',
        iconPath: '/icon/Group(8).svg'
      }
    ]
  },
  uz: {
    title: {
      line1: 'Qaysi shifokorga murojaat',
      line2: 'qilishni bilmaysizmi?'
    },
    subtitle: 'O\'z simptomingizni tanlang — va biz qaysi mutaxassisga yozilishni, qaysi tahlillar tashxisni aniqlashtirish uchun yordam berishini, shuningdek sog\'liqni kompleks tekshirish uchun qanday tekshiruvlardan o\'tish kerakligini aytib beramiz',
    selectSymptoms: '3 tagacha simptomni tanlang',
    noSymptomsSelected: 'Tavsiyalar olish uchun simptomlardan birini tanlang',
    symptoms: [
      'Allergiya',
      'Bo\'g\'imlarda og\'riq',
      'Shamollash',
      'Tomog\'dagi og\'riq',
      'Ayollar salomatligi',
      'Ko\'rish buzilishi',
      'Yurak og\'rig\'i',
      'Bosh og\'rig\'i',
      'Ovqat hazm qilishning buzilishi',
      'Ortiqcha charchoq',
      'Erkaklar salomatligi',
      'Shishish'
    ],
    cards: [
      {
        id: 'checkup',
        title: 'Qanday tekshiruvdan o\'tish kerak?',
        subtitle: 'Allergiya',
        description: '«Ayollar salomatligi» yoki «40 yoshgacha bo\'lgan erkaklar salomatligi» tekshiruvi',
        iconPath: '/icon/Group(8).svg'
      },
      {
        id: 'analysis',
        title: 'Qanday tahlillar topshirish kerak?',
        subtitle: 'Allergiya',
        description: [
          'Immunoglobulin E (IgE)',
          'Allergopanel'
        ],
        iconPath: '/icon/Group(8).svg'
      },
      {
        id: 'services',
        title: 'Qo\'shimcha xizmatlar',
        subtitle: 'Allergiya',
        description: [
          'Allergotestlar',
          'Pulmonolog konsultatsiyasi'
        ],
        iconPath: '/icon/Group(8).svg'
      },
      {
        id: 'specialist',
        title: 'Kimga murojaat qilish kerak?',
        subtitle: 'Allergiya',
        description: 'Allergolog-immunolog — diagnostika o\'tkazadi va davolashni tanlaydi',
        iconPath: '/icon/Group(8).svg'
      }
    ]
  }
};

export const SymptomSelector: React.FC = () => {
  const { t } = useTranslation(translations);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Effect для отслеживания ширины окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // List of all available symptoms
  const symptoms = t('symptoms', { returnObjects: true }) as string[];
  
  // Получаем карточки для текущего языка
  const cards = t('cards', { returnObjects: true }) as CardData[];
  
  // Split symptoms into two rows for desktop layout
  const firstRowSymptoms = symptoms.slice(0, 7); // First 7 symptoms
  const secondRowSymptoms = symptoms.slice(7);   // Remaining symptoms

  // Check if we should show results when 3 symptoms are selected
  useEffect(() => {
    if (selectedSymptoms.length >= 3) { // Show results when 3 symptoms are selected
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [selectedSymptoms]);

  // Toggle symptom selection
  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      // Remove symptom if already selected
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else if (selectedSymptoms.length < 3) {
      // Add symptom if less than 3 are selected
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  
  // Проверяем, мобильное ли устройство
  const isMobile = windowWidth < 768;

  // Функция для рендеринга описания с учетом типа данных
  const renderDescription = (card: CardData) => {
    if (Array.isArray(card.description)) {
      return (
        <>
          <h4 className="font-medium text-[18px] mb-2">{card.subtitle}</h4>
          <ul className="list-disc list-light-accent  pl-5 text-[18px]">
            {card.description.map((item, idx) => (
              <li key={idx} className="mb-1">{item}</li>
            ))}
          </ul>
        </>
      );
    }
    
    return (
      <>
        <h4 className="font-medium text-lg mb-2">{card.subtitle}</h4>
        <p>{card.description}</p>
      </>
    );
  };

  return (
    <div className="w-full">
      {/* Main selector block */}
      <div 
        className="relative rounded-2xl overflow-hidden p-10 h-[400px]" 
        style={{
          backgroundImage: 'url(/images/symptom-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-light-accent opacity-90 dark:opacity-80"></div>
        
        {/* Декоративное изображение поверх фона */}
        <div 
          className="absolute -top-[60px] left-[74px] right-0 bottom-0 z-[1] max-w-[1550px]" 
          style={{
            backgroundImage: 'url(/images/doctor-pattern.png)',
            backgroundSize: 'cover',
            transform: 'rotate(-2deg)',
            transformOrigin: 'top right'
          }}
        ></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between mb-10">
            {/* Title section */}
            <div className="mb-6 md:mb-0">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                {t('title.line1')}
              </h2>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                {t('title.line2')}
              </h2>
              
              {/* Selection instructions */}
              <div className="mt-6 flex items-center">
                <Image src="/icon/icon-info.svg" alt="" width={24} height={24} className='mr-4'/>
                <span className="text-white font-medium">{t('selectSymptoms')}</span>
              </div>
            </div>
            
            {/* Subtitle section */}
            <div className="">
              <div className="text-white text-lg">
                <p className="mb-1">Выберите свой симптом — и мы подскажем, к какому специалисту</p>
                <p className="mb-1">записаться, какие анализы помогут уточнить диагноз, а также</p>
                <p>какие чек-апы стоит пройти для комплексной проверки здоровья</p>
              </div>
            </div>
          </div>
          
          {isMobile ? (
            // Мобильная версия с выпадающим списком
            <div className="relative w-full mb-4">
              <select 
                className="w-full py-4 px-5 rounded-2xl bg-white/20 text-white appearance-none" 
                onChange={(e) => {
                  if (e.target.value !== "") {
                    toggleSymptom(e.target.value);
                    e.target.value = ""; // Сбрасываем значение после выбора
                  }
                }}
                value=""
              >
                <option value="" disabled>Выберите симптом</option>
                {symptoms
                  .filter(symptom => !selectedSymptoms.includes(symptom))
                  .map((symptom, index) => (
                    <option key={index} value={symptom}>
                      {symptom}
                    </option>
                  ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.857178 0.75L6.00003 5.25L11.1429 0.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Отображение выбранных симптомов */}
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSymptoms.map((symptom, index) => (
                  <div 
                    key={index} 
                    className="py-2 px-4 rounded-2xl bg-white text-light-accent font-medium flex items-center"
                  >
                    {symptom}
                    <button 
                      onClick={() => toggleSymptom(symptom)} 
                      className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-light-accent text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Десктопная версия с двумя рядами кнопок
            <>
              {/* Symptom selection pills - first row */}
              <div className="flex flex-wrap gap-3 mb-3">
                {firstRowSymptoms.map((symptom, index) => (
                  <button
                    key={index}
                    onClick={() => toggleSymptom(symptom)}
                    className={`
                      py-5 px-6 rounded-2xl flex items-center text-lg transition-all duration-300
                      ${selectedSymptoms.includes(symptom) 
                        ? 'bg-white text-light-accent font-medium' 
                        : 'bg-white/20 text-white'}
                    `}
                  >
                    {symptom}
                    {selectedSymptoms.includes(symptom) && (
                      <span className="ml-4 w-5 h-5 flex items-center justify-center rounded-full bg-light-accent text-white text-xs">
                        ✕
                      </span>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Symptom selection pills - second row */}
              <div className="flex flex-wrap gap-3">
                {secondRowSymptoms.map((symptom, index) => (
                  <button
                    key={index + firstRowSymptoms.length}
                    onClick={() => toggleSymptom(symptom)}
                    className={`
                      py-5 px-6 rounded-2xl flex items-center text-lg transition-all duration-300
                      ${selectedSymptoms.includes(symptom) 
                        ? 'bg-white text-light-accent font-medium' 
                        : 'bg-white/20 text-white'}
                    `}
                  >
                    {symptom}
                    {selectedSymptoms.includes(symptom) && (
                      <span className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-light-accent text-white text-xs">
                        ✕
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Results section (outside the main selector) */}
      {showResults ? (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[340px]">
          {cards.map(card => (
            <UniversalCard
              key={card.id}
              title={card.title}
              description={renderDescription(card)}
              icon={<img src='/icon/Group(8).svg' className="w-20 h-20" alt="" />}
              link={`/${card.id}/${card.subtitle.toLowerCase()}`}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 bg-white dark:bg-dark-block p-10 rounded-2xl text-center flex flex-col items-center h-[340px] justify-center">
          <img src="/icon/Group(8).svg" className='w-[80px] h-[80px] mb-6' alt="" />
          <p className="text-xl text-light-text dark:text-dark-text">
            {/* {t('noSymptomsSelected')} */}
          </p>
        </div>
      )}
      
      {/* Адаптивные стили для мобильных устройств */}
      <style jsx>{`
        @media (max-width: 767px) {
          .h-[400px] {
            height: auto !important;
            min-height: 500px;
          }
          
          .h-[340px] {
            height: auto !important;
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
};