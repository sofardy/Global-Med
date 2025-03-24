'use client';

import React, { useState, useEffect } from 'react';
import { useThemeStore } from '@/src/store/theme';
import Image from 'next/image';
import { BrainIcon, HeartIconk2 } from '../ui/Icon';

export default function PartnerBenefits() {
  const { theme } = useThemeStore();
  const [screenSize, setScreenSize] = useState('desktop');

  // Enhanced screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else if (width < 1520) {
        setScreenSize('laptop');
      } else {
        setScreenSize('desktop');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';
  const isLaptop = screenSize === 'laptop';

  // Dynamic sizing based on screen size
  const getMinHeight = () => {
    if (isMobile) return 'min-h-[250px]';
    if (isTablet) return 'min-h-[300px]';
    if (isLaptop) return 'min-h-[350px]';
    return 'min-h-[450px]';
  };

  const FeatureCard = ({ 
    title, 
    description,
    icon,
    greenOnLoad = false 
  }: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    greenOnLoad?: boolean;
  }) => {
    const [hover, setHover] = useState(greenOnLoad);
    
    return (
      <div 
        className={`p-5 md:p-6 lg:p-8 xl:p-8 rounded-2xl transition-all duration-300 h-full ${getMinHeight()} ${
          hover 
            ? 'bg-light-accent text-white' 
            : theme === 'light' 
              ? 'bg-white text-light-text' 
              : 'bg-dark-block text-dark-text'
        }`}
        onMouseEnter={() => !isMobile && setHover(true)}
        onMouseLeave={() => !isMobile && !greenOnLoad && setHover(false)}
        onClick={() => isMobile && setHover(!hover)}
      >
        <div className="flex flex-col h-full justify-between">
          <h3 className={`text-xl md:text-[22px] lg:text-[24px] font-medium ${isMobile ? 'mb-3' : 'mb-4'}`}>{title}</h3>
          {icon && (
            <div className={`${isMobile ? 'my-6' : isTablet ? 'my-8' : isLaptop ? 'my-10' : 'my-[90px]'} transition-all flex justify-center ${hover ? 'text-white' : 'text-light-accent dark:text-light-accent'}`}>
              {icon}
            </div>
          )}
          <p className="text-sm md:text-base lg:text-lg xl:text-[18px]">{description}</p>
        </div>
      </div>
    );
  };

  const getBannerHeight = () => {
    if (isMobile) return 'h-[250px]';
    if (isTablet) return 'h-[300px]';
    if (isLaptop) return 'h-[400px]';
    return 'h-[500px]';
  };

  return (
    <div>
      {/* Большое фото сверху с адаптивной высотой */}
      <div className={`w-full ${getBannerHeight()} relative rounded-2xl overflow-hidden mb-6`}>
        <Image 
          src="/images/health-insurance.jpg" 
          alt="Медицинская страховка" 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1520px) 100vw, 100vw"
          priority
        />
      </div>

      {/* Блоки с изменением расположения и размеров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mt-40 mb-40">
        {/* Левый блок - информация о программах (адаптивный размер колонок) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <div className={`h-full ${getMinHeight()} p-5 md:p-6 lg:p-8 rounded-2xl bg-white dark:bg-dark-block flex flex-col justify-between`}>
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-[38px] leading-[1.2] font-medium mb-3 md:mb-4 text-light-text dark:text-dark-text">
              Защитите здоровье сотрудников с выгодными программами медицинского обслуживания
            </h3>
            <p className="text-sm md:text-base lg:text-lg xl:text-[18px] text-light-text dark:text-dark-text">
              Клиника Global Med предлагает комплексные решения корпоративного медицинского обслуживания, позволяющие создать благоприятную и безопасную рабочую среду, снизить количество больничных и повысить производительность труда
            </p>
          </div>
        </div>

        {/* Средний блок - лояльность сотрудников */}
        <div className="col-span-1 ">
          <div className={getMinHeight()}>
            <FeatureCard
              title="Лояльность сотрудников"
              description="Забота о здоровье команды повышает мотивацию, укрепляет доверие и снижает текучесть кадров в компании"
              icon={<HeartIconk2 />}
            />
          </div>
        </div>

        {/* Правый блок - HR-бренд */}
        <div className="col-span-1">
          <div className={getMinHeight()}>
            <FeatureCard
              title="Сильный HR-бренд"
              description="ДМС делает компанию привлекательной для специалистов и помогает конкурировать за лучшие кадры"
              icon={<HeartIconk2 />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}