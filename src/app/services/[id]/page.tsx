'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import DoctorBenefits from '@/src/shared/components/DoctorBenefits';
import { AppointmentSection } from '@/src/shared/components/AppointmentSection';
import { ContactInfo } from '@/src/shared/components/ContactInfo';

// Типизация для данных
interface ServicePrice {
  name: string;
  price: string;
}

interface ServiceDetailData {
  title: string;
  description: string;
  bannerBg: string;
  introduction: string;
  symptoms: string[];
  services: ServicePrice[];
}

interface ServiceDetailsCollection {
  [key: string]: ServiceDetailData;
}

// Переводы для страницы услуг
const translations = {
  ru: {
    appointmentButton: 'Записаться на прием',
    serviceTitle: 'Оказываемые услуги',
    symptomsTitle: 'Симптомы, при которых следует обратиться к специалисту:',
    backToServices: 'Вернуться к услугам',
    showMore: 'Показать все',
    showLess: 'Свернуть',
    showMoreServices: 'Все услуги и цены',
    showLessServices: 'Свернуть прайс-лист'
  },
  uz: {
    appointmentButton: 'Qabulga yozilish',
    serviceTitle: 'Ko\'rsatiladigan xizmatlar',
    symptomsTitle: 'Mutaxassisga murojaat qilish kerak bo\'lgan belgilar:',
    backToServices: 'Xizmatlarga qaytish',
    showMore: 'Ko\'proq ko\'rsatish',
    showLess: 'Yig\'ish',
    showMoreServices: 'Barcha xizmatlar va narxlar',
    showLessServices: 'Narxlar ro\'yxatini yig\'ish'
  }
};

// Моковые данные
const serviceDetails: ServiceDetailsCollection = {
  ophthalmology: {
    title: 'Офтальмология',
    description: 'Комплексная диагностика и лечение заболеваний глаз, включая подбор очков и линз. Мы используем передовое оборудование, чтобы точно выявить любые проблемы и подобрать наилучшие решения для эффективной коррекции зрения. Наши специалисты обеспечат вам максимальный комфорт и результат.',
    bannerBg: 'bg-light-accent',
    introduction: 'Оказываем широкий спектр офтальмологических услуг, включая консультации, диагностику, лечение и профилактику заболеваний. Наши специалисты помогут вам на всех этапах — от раннего выявления проблемы до полного восстановления здоровья.',
    symptoms: [
      'Размытое или ухудшившееся зрение',
      'Частые головные боли, особенно после чтения или работы за компьютером',
      'Частые покраснения или воспаления глаз',
      'Боль в глазах или ощущение инородного тела',
      'Снижение способности различать цвета',
      'Ощущение «тумана» перед глазами',
      'Светобоязнь и слезотечение',
      'Появление пятен или мушек в поле зрения',
      'Нарушения ночного зрения',
      'Необычные выделения из глаз'
    ],
    services: [
      { name: 'Консультация', price: '250 000 сум' },
      { name: 'Повторная консультация', price: '50 000 сум' },
      { name: 'Консультация для детей до 18 лет', price: '80 000 сум' },
      { name: 'Повторная консультация для детей до 18 лет', price: '40 000 сум' },
      { name: 'Консультация для детей до 5 лет', price: '200 000 сум' },
      { name: 'Повторная консультация для детей до 5 лет', price: '50 000 сум' },
      { name: 'Стационарная консультация', price: '125 000 сум' },
      { name: 'Лечение офтальмолога 1 день', price: '20 000 сум' },
      { name: 'Лечение офтальмолога 2 дня', price: '60 000 сум' },
      { name: 'Лечение офтальмолога 3 дня', price: '90 000 сум' },
      { name: 'Парабульбарная инъекция 1 день', price: '85 000 сум' },
      { name: 'Удаление инородного тела из глаза', price: '110 000 сум' },
      { name: 'Зондирование слезного канале', price: '415 000 сум' },
      { name: 'Промывание слёзных путей', price: '65 000 сум' },
      { name: 'Расширение зрачков', price: '35 000 сум' }
    ]
  },
  lor: {
    title: 'Лор 24/7',
    description: 'Круглосуточная диагностика и лечение заболеваний уха, горла и носа. Наша клиника предлагает полный спектр ЛОР-услуг как для взрослых, так и для детей. Своевременное лечение позволяет предотвратить осложнения и значительно улучшить качество жизни.',
    bannerBg: 'bg-light-accent',
    introduction: 'Мы предлагаем комплексный подход к диагностике и лечению ЛОР-заболеваний с применением современных малоинвазивных методик. Наши опытные специалисты проводят консультации и лечение пациентов любого возраста с различными заболеваниями уха, горла и носа.',
    symptoms: [
      'Боль в ухе или выделения из уха',
      'Снижение слуха или шум в ушах',
      'Частые головные боли и заложенность носа',
      'Выделения из носа, затруднение носового дыхания',
      'Боль в горле или затруднение глотания',
      'Охриплость голоса или его потеря',
      'Частые ангины или тонзиллит',
      'Хронический кашель или першение в горле',
      'Головокружение или нарушения равновесия',
      'Храп или апноэ сна'
    ],
    services: [
      { name: 'Консультация ЛОР-врача', price: '220 000 сум' },
      { name: 'Повторная консультация ЛОР-врача', price: '120 000 сум' },
      { name: 'Консультация детского ЛОР-врача', price: '250 000 сум' },
      { name: 'Эндоскопическое исследование носа', price: '180 000 сум' },
      { name: 'Эндоскопическое исследование гортани', price: '250 000 сум' },
      { name: 'Аудиометрия', price: '170 000 сум' },
      { name: 'Промывание носа (кукушка)', price: '150 000 сум' },
      { name: 'Промывание миндалин', price: '180 000 сум' },
      { name: 'Удаление серной пробки (одно ухо)', price: '100 000 сум' },
      { name: 'Пневмомассаж барабанных перепонок', price: '120 000 сум' },
      { name: 'Анемизация слизистой носа', price: '80 000 сум' },
      { name: 'Продувание слуховых труб', price: '120 000 сум' },
      { name: 'Вскрытие паратонзиллярного абсцесса', price: '350 000 сум' },
      { name: 'Остановка носового кровотечения', price: '200 000 сум' },
      { name: 'Удаление инородного тела из уха/носа/горла', price: '180 000 сум' }
    ]
  }
};

export default function ServiceDetail({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ServiceDetailContent id={params.id} />
    </Suspense>
  );
}

function ServiceDetailContent({ id }: { id: string }) {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  
  // Для усиленной пульсации кнопки
  const [pulsePower, setPulsePower] = useState(1);
  
  // Состояния для показа/скрытия длинных списков
  const [expandedSymptoms, setExpandedSymptoms] = useState(false);
  const [expandedServices, setExpandedServices] = useState(false);
  
  // Состояние определения мобильного устройства
  const [isMobile, setIsMobile] = useState(false);
  
  // Определяем размер экрана при загрузке и изменении размера окна
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Эффект для пульсации кнопки с изменяющейся интенсивностью
  useEffect(() => {
    let power = 1;
    let increasing = true;
    
    const interval = setInterval(() => {
      if (power >= 1.8) increasing = false;
      if (power <= 1) increasing = true;
      
      power = increasing ? power + 0.05 : power - 0.05;
      setPulsePower(power);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Получаем данные по ID услуги или используем офтальмологию по умолчанию
  const serviceData = serviceDetails[id] || serviceDetails.ophthalmology;
  
  // Функция для открытия формы записи
  const handleAppointment = () => {
    console.log('Открытие формы записи');
    
    // Прокрутка к форме записи
    const appointmentSection = document.querySelector('#appointment-section');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Количество видимых симптомов на мобильных устройствах
  const visibleSymptomsCount = 4;
  
  // Количество видимых услуг на мобильных устройствах
  const visibleServicesCount = 5;
  
  // Отображаемые симптомы в зависимости от состояния
  const displayedSymptoms = isMobile && !expandedSymptoms 
    ? serviceData.symptoms.slice(0, visibleSymptomsCount) 
    : serviceData.symptoms;
  
  // Отображаемые услуги в зависимости от состояния
  const displayedServices = isMobile && !expandedServices 
    ? serviceData.services.slice(0, visibleServicesCount) 
    : serviceData.services;
  
  return (
    <main>
      {/* Верхний баннер - улучшенная адаптивность */}
      <div className={`w-full rounded-2xl overflow-hidden mb-8 md:mb-16 relative ${serviceData.bannerBg}`}>
        {/* Фоновый паттерн */}
        <div 
          className="absolute inset-0 z-0 opacity-10" 
          style={{
            backgroundImage: 'url(/images/eye-pattern.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Фон с доктором (паттерн) - скрыт на мобильных */}
        <div 
          className="absolute right-[10px] -bottom-[180px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block" 
          style={{
            backgroundImage: 'url(/images/doctor-pattern.png)',
            backgroundSize: 'contain',
            transform: 'rotate(-45deg)',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Контентная часть баннера - улучшенные отступы для мобильных */}
        <div className="relative z-10 p-6 sm:p-8 md:p-12 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 md:mb-6">{serviceData.title}</h1>
          <p className="text-base sm:text-lg max-w-2xl">{serviceData.description}</p>
          
          {/* Улучшенная пульсирующая кнопка записи с бликами - адаптивные размеры */}
          <button 
            onClick={handleAppointment}
            className="mt-6 md:mt-8 px-6 sm:px-20 py-3 sm:py-4 border-2 border-white rounded-xl transition-all duration-300 relative overflow-hidden group hover:bg-white hover:text-light-accent hover:scale-105 hover:shadow-lg hover:shadow-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-light-accent text-sm sm:text-base"
          >
            {/* Основной текст */}
            <span className="relative z-10 group-hover:font-bold">{t('appointmentButton')}</span>
            
            {/* Пульсирующий фон - переменная интенсивность */}
            <span 
              className="absolute inset-0 bg-white/30 rounded-xl opacity-100 group-hover:opacity-0"
              style={{
                animation: `pulse ${pulsePower}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
              }}
            />
            
            {/* Свечение вокруг кнопки */}
            <span 
              className="absolute -inset-1 bg-white/20 rounded-xl blur-sm group-hover:bg-transparent"
              style={{
                animation: `pulse ${pulsePower + 0.3}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
              }}
            />
            
            {/* Эффект движущихся бликов */}
            <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl">
              <span 
                className="absolute h-12 sm:h-20 w-12 sm:w-20 -top-6 sm:-top-10 -left-6 sm:-left-10 bg-white/40 rounded-full blur-md transform rotate-45 group-hover:scale-150"
                style={{ animation: 'moveHighlight1 6s infinite linear' }}
              ></span>
              
              <span 
                className="absolute h-10 sm:h-16 w-10 sm:w-16 -bottom-5 sm:-bottom-8 -right-5 sm:-right-8 bg-white/30 rounded-full blur-md transform rotate-45 group-hover:scale-150"
                style={{ animation: 'moveHighlight2 8s infinite linear' }}
              ></span>
            </span>
            
            {/* Эффект при наведении - рябь по воде */}
            <span 
              className="absolute inset-0 scale-0 rounded-xl bg-white/40 group-hover:animate-ripple"
            ></span>
          </button>
        </div>
      </div>
      
      {/* Блок "Оказываемые услуги" - вертикальная стековая компоновка на мобильных */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-16">
        {/* Левый блок - информация и симптомы */}
        <div className={`rounded-2xl p-6 sm:p-8 ${theme === 'light' ? 'bg-white' : 'bg-dark-block'} relative overflow-hidden h-full`}>
          {/* Фоновый паттерн для левого блока */}
          <div 
            className="absolute -right-[150px] -bottom-[150px] w-[300px] h-[300px] pointer-events-none z-0 opacity-5" 
            style={{
              backgroundImage: 'url(/images/eye-pattern.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'right bottom',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] lg:text-[56px] font-medium mb-4 md:mb-6 text-light-text dark:text-dark-text">{t('serviceTitle')}</h2>
            <p className="text-sm sm:text-base text-light-text/80 dark:text-dark-text/80 mb-6 md:mb-8">
              {serviceData.introduction}
            </p>
            
            <h3 className="text-lg sm:text-xl font-medium mb-3 md:mb-4 text-light-text dark:text-dark-text">
              {t('symptomsTitle')}
            </h3>
            
            {/* Список симптомов с возможностью скрытия */}
            <ul className="list-none space-y-2 sm:space-y-3 text-sm sm:text-base">
              {displayedSymptoms.map((symptom, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-light-accent mr-2 flex-shrink-0">•</span>
                  <span className="text-light-text dark:text-dark-text">{symptom}</span>
                </li>
              ))}
            </ul>
            
            {/* Кнопка показать больше/меньше для симптомов */}
            {isMobile && serviceData.symptoms.length > visibleSymptomsCount && (
              <button 
                onClick={() => setExpandedSymptoms(!expandedSymptoms)}
                className="mt-4  text-light-accent hover:text-light-accent/80 transition-colors text-sm flex items-center"
              >
                <span>{expandedSymptoms ? t('showLess') : t('showMore')}</span>
                <svg 
                  className={`ml-1 w-4 h-4 transform transition-transform ${expandedSymptoms ? 'rotate-180' : 'rotate-0'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Правый блок - цены на услуги */}
        <div className={`rounded-2xl px-4 sm:px-8 py-4 ${theme === 'light' ? 'bg-white' : 'bg-dark-block'} relative overflow-hidden h-full`}>
          {/* Фоновый паттерн для правого блока */}
          <div 
            className="absolute -right-[50px] -top-[50px] w-[200px] h-[200px] pointer-events-none z-0 opacity-5" 
            style={{
              backgroundImage: 'url(/images/price-pattern.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'right top',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          {/* Прайс-лист - адаптивные размеры и отступы */}
          <div className="relative z-10 overflow-x-auto">
            <div className="min-w-[280px]">
              {displayedServices.map((service, index) => (
                <div 
                  key={index}
                  className={`py-3 sm:py-4 flex justify-between items-center ${
                    (isMobile && !expandedServices && index === displayedServices.length - 1) || 
                    (!isMobile && index === serviceData.services.length - 1) ? '' : 'border-b border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <span className="text-sm sm:text-base text-light-text dark:text-dark-text pr-4">{service.name}</span>
                  <span className="font-medium text-sm sm:text-base text-light-text dark:text-dark-text whitespace-nowrap">{service.price}</span>
                </div>
              ))}
            </div>
            
            {/* Кнопка показать больше/меньше для услуг */}
            {isMobile && serviceData.services.length > visibleServicesCount && (
              <button 
                onClick={() => setExpandedServices(!expandedServices)}
                className="mt-4 text-light-accent hover:text-light-accent/80 transition-colors text-sm flex items-center"
              >
                <span>{expandedServices ? t('showLessServices') : t('showMoreServices')}</span>
                <svg 
                  className={`ml-1 w-4 h-4 transform transition-transform ${expandedServices ? 'rotate-180' : 'rotate-0'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* DoctorBenefits компонент */}
      <DoctorBenefits />
      
      {/* Секция записи на приём */}
      <div id="appointment-section">
        <AppointmentSection />
      </div>
      
      {/* Контактная информация */}
      <ContactInfo />
      
      {/* CSS для анимаций */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        
        @keyframes moveHighlight1 {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(200%, 200%) rotate(360deg);
          }
        }
        
        @keyframes moveHighlight2 {
          0% {
            transform: translate(50%, 50%) rotate(0deg);
          }
          100% {
            transform: translate(-200%, -200%) rotate(-360deg);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          40% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-ripple {
          animation: ripple 1s cubic-bezier(0, 0, 0.2, 1);
        }
      `}</style>
    </main>
  );
}