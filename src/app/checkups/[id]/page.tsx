'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/src/hooks/useTranslation';
import { checkupDetailTranslations } from '@/src/shared/mocks/checkupHeroData';
import { ContactInfo } from '@/src/shared/components/ContactInfo';
import { AppointmentSection } from '@/src/shared/components/AppointmentSection';
import { BenefitsCheckUps } from '@/src/shared/components/BenefitScheckUps';

const CheckupDetail = () => {
  const { t } = useTranslation(checkupDetailTranslations);
  
  // Для усиленной пульсации кнопки
  const [pulsePower, setPulsePower] = useState(1);
  
  // Состояние для аккордеона FAQ
  const [openItems, setOpenItems] = useState({}); 
  
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
  
  // Функция для открытия формы записи
  const handleAppointment = () => {
    console.log('Открытие формы записи');
    
    // Прокрутка к форме записи
    const appointmentSection = document.querySelector('#appointment-section');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Функция для управления аккордеоном
  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <main className="overflow-hidden">
      {/* Верхний баннер */}
      <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 md:mb-16 relative bg-light-accent">
        {/* Фоновый паттерн ДНК */}
        <div 
          className="absolute inset-0 z-0 opacity-10" 
          style={{
            backgroundImage: 'url(/images/dna-pattern.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Фон с доктором (паттерн) - скрыт на мобильных */}
        <div 
          className="absolute -right-[70px] -bottom-[180px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block" 
          style={{
            backgroundImage: 'url(/images/doctor-pattern.png)',
            backgroundSize: 'contain',
            transform: 'rotate(-60deg)',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Контентная часть баннера - с расположением и стилями максимально похожими на макет */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 text-white flex flex-col md:min-h-[490px]">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 md:mb-4 lg:mb-6">{t('title')}</h1>
            
            {/* Описание с ограниченной шириной, чтобы соответствовать макету */}
            <p className="text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">{t('description')}</p>
            
            {/* Блоки с информацией о времени и цене */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:mt-6 md:mt-8">
              <div className="bg-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-base sm:text-lg md:text-xl font-medium">{t('duration')}</span>
              </div>
              
              <div className="bg-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-base sm:text-lg md:text-xl font-medium">{t('price')}</span>
              </div>
            </div>
            
            {/* Блоки с информацией о типах исследований */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 md:mt-10 overflow-x-auto sm:overflow-visible">
              <div className="bg-white/20 min-w-[180px] w-full sm:w-[180px] rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl font-bold mb-1">4</span>
                <span className="text-xs sm:text-sm">{t('instrumentalExams')}</span>
              </div>
              
              <div className="bg-white/20 min-w-[180px] w-full sm:w-[180px] rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl font-bold mb-1">6</span>
                <span className="text-xs sm:text-sm">{t('labTests')}</span>
              </div>
              
              <div className="bg-white/20 min-w-[180px] w-full sm:w-[180px] rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl font-bold mb-1">1</span>
                <span className="text-xs sm:text-sm">{t('doctorConsultation')}</span>
              </div>
            </div>
          </div>
          
          {/* Кнопка записи - в верхнем правом углу на мобильных, в правом нижнем на десктопе */}
          <div className="flex justify-center sm:justify-end mt-6 md:mt-0">
            <button 
              onClick={handleAppointment}
              className="w-full sm:w-auto px-4 sm:px-6 md:px-10 lg:px-20 py-3 sm:py-4 border-2 border-white rounded-lg sm:rounded-xl transition-all duration-300 relative overflow-hidden group hover:bg-white hover:text-light-accent hover:scale-105 hover:shadow-lg hover:shadow-white/30 focus:outline-none text-xs sm:text-sm md:text-base"
            >
              {/* Основной текст */}
              <span className="relative z-10 group-hover:font-bold">{t('bookButton')}</span>
              
              {/* Пульсирующий фон - переменная интенсивность */}
              <span 
                className="absolute inset-0 bg-white/30 rounded-lg sm:rounded-xl opacity-100 group-hover:opacity-0"
                style={{
                  animation: `pulse ${pulsePower}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                }}
              />
              
              {/* Свечение вокруг кнопки */}
              <span 
                className="absolute -inset-1 bg-white/20 rounded-lg sm:rounded-xl blur-sm group-hover:bg-transparent"
                style={{
                  animation: `pulse ${pulsePower + 0.3}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                }}
              />
              
              {/* Эффект движущихся бликов */}
              <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg sm:rounded-xl">
                <span 
                  className="absolute h-8 sm:h-12 md:h-20 w-8 sm:w-12 md:w-20 -top-4 sm:-top-6 md:-top-10 -left-4 sm:-left-6 md:-left-10 bg-white/40 rounded-full blur-md transform rotate-45 group-hover:scale-150"
                  style={{ animation: 'moveHighlight1 6s infinite linear' }}
                ></span>
                
                <span 
                  className="absolute h-6 sm:h-10 md:h-16 w-6 sm:w-10 md:w-16 -bottom-3 sm:-bottom-5 md:-bottom-8 -right-3 sm:-right-5 md:-right-8 bg-white/30 rounded-full blur-md transform rotate-45 group-hover:scale-150"
                  style={{ animation: 'moveHighlight2 8s infinite linear' }}
                ></span>
              </span>
              
              {/* Эффект при наведении - рябь по воде */}
              <span 
                className="absolute inset-0 scale-0 rounded-lg sm:rounded-xl bg-white/40 group-hover:animate-ripple"
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Секция программы диагностики и FAQ */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
        {/* Левый блок - описание программы */}
        <div className="w-full md:w-2/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 bg-white dark:bg-dark-block relative overflow-hidden md:self-start md:h-[500px] lg:h-[600px] xl:h-[700px]">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[56px] font-medium mb-3 sm:mb-4 text-[#173F46] dark:text-white leading-tight md:leading-[1.1] lg:leading-[1]">{t('programTitle')}</h2>
          
          {/* DNA background pattern */}
          <div 
            className="absolute -right-[150px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block" 
            style={{
              backgroundImage: 'url(/images/doctor-pattern.png)',
              backgroundSize: 'contain',
              transform: 'rotate(15deg)',
              backgroundPosition: 'right bottom',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          
          <div className="relative z-10">
            <p className="text-sm sm:text-base text-[#173F46] dark:text-white leading-relaxed mb-6">{t('programDescription')}</p>
          </div>
        </div>
        
        {/* Правый блок - FAQ селекты */}
        <div className="w-full md:w-3/5 flex flex-col gap-2">
          {t('faqItems', { returnObjects: true }).map((item, index) => (
            <div key={index} className="rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-3 sm:p-4 md:p-5 px-4 sm:px-8 md:px-10 text-left focus:outline-none bg-white dark:bg-dark-block"
              >
                <span className="font-medium text-sm sm:text-base md:text-lg">
                  {item.title}
                </span>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl ${openItems[index] ? 'bg-light-accent text-white' : 'border border-gray-300 dark:border-gray-600'}`}>
                  <svg 
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${openItems[index] ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openItems[index] && (
                <div className="p-3 sm:p-4 md:p-5 px-4 sm:px-8 md:px-10 bg-white dark:bg-dark-block text-[#173F46]/80 dark:text-white/80">
                  <p className="text-sm sm:text-base max-w-full sm:max-w-[90%] md:max-w-[80%]">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BenefitsCheckUps />
      
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
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes moveHighlight1 {
          0% {
            transform: translateX(-100%) translateY(-20%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) translateY(100%) rotate(45deg);
          }
        }
        
        @keyframes moveHighlight2 {
          0% {
            transform: translateX(200%) translateY(100%) rotate(45deg);
          }
          100% {
            transform: translateX(-100%) translateY(-20%) rotate(45deg);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
};

export default CheckupDetail;