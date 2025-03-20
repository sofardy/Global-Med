/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/src/hooks/useTranslation';
import { AppointmentSection } from '@/src/shared/components/AppointmentSection';
import { ContactInfo } from '@/src/shared/components/ContactInfo';
import { analysisDetails, translations } from '@/src/shared/mocks/analysisData';
import AnalysisRecommendations from '@/src/shared/components/AnalysisRecommendations';

// Define correct types
interface PriceItem {
  name: string;
  price: string;
}



// Most basic possible type for Next.js 15
export default function Page(props: any) {
  // Extract ID safely
  const id = props?.params?.id || 'coagulogram';
  
  const { t } = useTranslation(translations);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllPrices, setShowAllPrices] = useState(false);
  const [pulsePower, setPulsePower] = useState(1);
  
  // Pulsation effect
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
  
  // Mobile detection
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
  
  // Get data by ID or use default
  const analysisData = (analysisDetails as any)[id] || analysisDetails.coagulogram;
  
  // Scroll to appointment form
  const handleAppointment = () => {
    const appointmentSection = document.getElementById('appointment-section');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Limit prices list for mobile
  const displayedPrices = isMobile && !showAllPrices 
    ? analysisData.prices.slice(0, 5) 
    : analysisData.prices;

  return (
    <main className="overflow-hidden">
      {/* Banner */}
      <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden mb-8 md:mb-12 relative bg-light-accent">
        <div 
          className="absolute -right-[10px] -bottom-[180px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block" 
          style={{
            backgroundImage: 'url(/images/doctor-pattern.png)',
            backgroundSize: 'contain',
            transform: 'rotate(-50deg)',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        <div className="relative z-10 p-10 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-[56px] font-medium mb-3 md:mb-6">
            Анализы: {analysisData.title}
          </h1>
          
          <p className="text-base sm:text-lg max-w-3xl mb-6 md:mb-6">
            {analysisData.description}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center bg-[#0AD195] px-10 py-4 rounded-2xl">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-base sm:text-lg">
                {analysisData.testsCount} {t('tests')}
              </span>
            </div>
            
            <button 
              onClick={handleAppointment}
              className="w-full sm:w-auto px-4 sm:px-6 md:px-10 lg:px-20 py-3 sm:py-4 border-2 border-white rounded-lg sm:rounded-xl transition-all duration-300 relative overflow-hidden group hover:bg-white hover:text-light-accent hover:scale-105 hover:shadow-lg hover:shadow-white/30 focus:outline-none text-xs sm:text-sm md:text-base"
            >
              <span className="relative z-10 group-hover:font-bold">{t('appointmentButton')}</span>
              
              <span 
                className="absolute inset-0 bg-white/30 rounded-lg sm:rounded-xl opacity-100 group-hover:opacity-0"
                style={{
                  animation: `pulse ${pulsePower}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                }}
              />
              
              <span 
                className="absolute -inset-1 bg-white/20 rounded-lg sm:rounded-xl blur-sm group-hover:bg-transparent"
                style={{
                  animation: `pulse ${pulsePower + 0.3}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                }}
              />
              
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
              
              <span 
                className="absolute inset-0 scale-0 rounded-lg sm:rounded-xl bg-white/40 group-hover:animate-ripple"
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
        <div className="bg-white dark:bg-dark-block rounded-xl p-6 sm:p-8 h-[700px] overflow-y-auto">
          <h2 className="text-[38px] sm:text-[40px] md:text-[56px] font-medium mb-6 text-light-text dark:text-dark-text leading-[1]">
            {analysisData.subtitle}
          </h2>
          <p className="text-light-text/80 dark:text-dark-text/80 mb-8 w-[70%] text-base">
            {analysisData.subtitle_desc}
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-4 text-light-text dark:text-dark-text">
            {analysisData.symptoms_title}
          </h3>
          
          <ul className="space-y-3">
            {analysisData.symptoms.map((symptom: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-light-accent mr-2 flex-shrink-0">•</span>
                <span className="text-light-text dark:text-dark-text">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white dark:bg-dark-block rounded-xl px-4 sm:px-8">
          <div className="pt-6 pb-4 sm:pt-8 sm:pb-6 flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-light-text dark:text-dark-text">
              {t('prices')}
            </h2>
          </div>
          
          <div className="space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
            {displayedPrices.map((item: PriceItem, index: number) => (
              <div 
                key={index}
                className="py-3 sm:py-4 flex justify-between items-center"
              >
                <span className="text-sm sm:text-base text-light-text dark:text-dark-text pr-4">{item.name}</span>
                <span className="font-medium text-sm sm:text-base text-light-text dark:text-dark-text whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
          
          {isMobile && analysisData.prices.length > 5 && (
            <div className="py-4 flex justify-center">
              <button 
                onClick={() => setShowAllPrices(!showAllPrices)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span>{showAllPrices ? t('mobileCollapseButton') : t('mobileExpandButton')}</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${showAllPrices ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Recommendations */}
      <AnalysisRecommendations/>
      
      {/* Appointment section */}
      <div id="appointment-section">
        <AppointmentSection />
      </div>
      
      {/* Contact info */}
      <ContactInfo />

      {/* Animations */}
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
        
        .group-hover\\:animate-ripple:hover {
          animation: ripple 1s cubic-bezier(0, 0, 0.2, 1);
        }
      `}</style>
    </main>
  );
}