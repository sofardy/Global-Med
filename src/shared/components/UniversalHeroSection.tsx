'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/src/store/theme';

interface InfoCardProps {
  title: string;
  description: string;
  hasDot?: boolean;
  className?: string;
  isWide?: boolean;
}

interface UniversalHeroSectionProps {
  imageUrl: string;
  imageAlt: string;
  mainCard: {
    title: string;
    description: string;
  };
  secondaryCards: {
    title: string;
    description: string;
  }[];
  className?: string;
}

// Компонент информационной карточки
function InfoCard({ 
  title, 
  description, 
  hasDot = false,
  isWide = false,
  className = '' 
}: InfoCardProps) {
  const { theme } = useThemeStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div 
      className={`relative p-4 sm:p-5 md:p-6 rounded-2xl transition-colors duration-300 ${
        isHovered 
          ? 'bg-light-accent text-white' 
          : theme === 'light' ? 'bg-white' : 'bg-dark-block'
      } ${isWide ? 'col-span-2' : 'col-span-1'} h-auto ${
        isWide 
          ? 'min-h-[180px] sm:min-h-[200px] md:min-h-[240px]' 
          : 'min-h-[100px] sm:min-h-[120px] md:min-h-[180px]'
      } ${className}`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={() => isMobile && setIsHovered(!isHovered)}
    >
      {/* Круглый элемент в верхнем правом углу */}
      {hasDot && (
        <div 
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-colors ${
            isHovered 
              ? 'bg-white' 
              : theme === 'light' ? 'bg-[#F7F7F7]' : 'bg-[#11363C]'
          }`}
        />
      )}
      
      <div className="h-full flex flex-col">
        <h3 className={`${
          isWide 
            ? 'text-xl sm:text-2xl md:text-[32px] lg:text-[40px]' 
            : 'text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 sm:mt-3 md:mt-4'
        } font-medium mb-1 sm:mb-2 transition-colors leading-tight ${
          isHovered 
            ? 'text-white'
            : theme === 'light' ? 'text-light-text' : 'text-dark-text'
        }`}>
          {title}
        </h3>
        <p className={`text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2 md:mt-3 transition-colors line-clamp-3 sm:line-clamp-4 md:line-clamp-none ${
          isHovered 
            ? 'text-white'
            : theme === 'light' ? 'text-light-text/80' : 'text-dark-text/80'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}

// Основной компонент
function UniversalHeroSection({
  imageUrl,
  imageAlt,
  mainCard,
  secondaryCards,
  className = ''
}: UniversalHeroSectionProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Полноширинное изображение */}
      <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] xl:h-[700px] relative rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-5">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
      </div>
      
      {/* Блоки с информацией */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {/* Главный блок - 100% на мобильном, 50% на десктопе (2 из 4 колонок) */}
        <InfoCard
          title={mainCard.title}
          description={mainCard.description}
          isWide={true}
          className="md:col-span-2 mb-3 sm:mb-4 md:mb-0"
        />
        
        {/* Обертка для двух дополнительных блоков в колонку на мобильном */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {/* Два дополнительных блока с точками */}
          {secondaryCards.slice(0, 2).map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              description={card.description}
              hasDot={true}
              className="col-span-1"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UniversalHeroSection;