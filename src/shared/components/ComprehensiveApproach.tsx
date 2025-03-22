'use client'
import React, { useState, ReactElement } from 'react';
import { useThemeStore } from '@/src/store/theme';

interface ServiceCardProps {
 title: string;
 description: string;
 icon: ReactElement;
 isActive?: boolean;
}

export default function ComprehensiveApproach(): JSX.Element {
 const { theme } = useThemeStore();
 
 const ServiceCard: React.FC<ServiceCardProps> = ({ 
   title, 
   description, 
   icon,
   isActive = false
 }) => {
   const [hover, setHover] = useState<boolean>(isActive);
   
   const bgColor = hover 
     ? 'bg-light-accent text-white' 
     : theme === 'light' ? 'bg-white' : 'bg-dark-block';
   
   const textColor = hover 
     ? 'text-white' 
     : theme === 'light' ? 'text-light-text' : 'text-dark-text';
   
   return (
     <div 
       className={`p-6 rounded-xl min-h-[300px] h-full ${bgColor} flex flex-col relative transition-colors duration-300`}
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(isActive)}
     >
       {/* Круглая точка в правом верхнем углу */}
       <div className="absolute top-4 right-4 w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-100 dark:bg-gray-700"></div>
       
       <h3 className={`text-xl md:text-2xl font-medium mb-6 ${textColor}`}>
         {title}
       </h3>
       
       <div className="flex justify-center my-6">
         <div className={`${hover ? 'text-white' : 'text-light-accent'} transition-colors duration-300`}>
           {icon}
         </div>
       </div>
       
       <p className={`mt-auto ${textColor} text-base leading-relaxed`}>
         {description}
       </p>
     </div>
   );
 };
 
 // SVG иконки
 const StethoscopeIcon = (): ReactElement => (
   <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M35 21C35 21 38 25 45 25C52 25 55 21 55 21V42C55 42 52 46 45 46C38 46 35 42 35 42V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M15 21C15 21 18 25 25 25C32 25 35 21 35 21V42C35 42 32 46 25 46C18 46 15 42 15 42V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M15 21V14C15 14 18 10 25 10C32 10 35 14 35 14V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M55 21V15C55 12.2386 57.2386 10 60 10C62.7614 10 65 12.2386 65 15V25C65 29.4183 61.4183 33 57 33C55.5 33 55 32 55 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
   </svg>
 );
 
 const InsuranceIcon = (): ReactElement => (
   <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect x="20" y="10" width="30" height="40" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M27 20H43" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     <path d="M27 30H43" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     <path d="M27 40H43" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     <path d="M35 20V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     <path d="M27 10V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     <path d="M35 10V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     <path d="M43 10V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
   </svg>
 );
 
 const VaccineIcon = (): ReactElement => (
   <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M45 25L25 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M40 20L50 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M25 35L35 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M35 25L45 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M20 50L15 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M50 20L55 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
   </svg>
 );
 
 const AmbulanceIcon = (): ReactElement => (
   <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect x="10" y="20" width="40" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
     <path d="M50 30H60L55 20H50V30Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <circle cx="20" cy="45" r="5" stroke="currentColor" strokeWidth="2"/>
     <circle cx="50" cy="45" r="5" stroke="currentColor" strokeWidth="2"/>
     <path d="M30 25V35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     <path d="M25 30H35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     <path d="M10 30H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
     <path d="M60 30H65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
   </svg>
 );
 
 const HeartHandsIcon = (): ReactElement => (
   <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M35 45C35 45 55 35 55 20C55 15 50 10 45 10C40 10 35 15 35 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M35 45C35 45 15 35 15 20C15 15 20 10 25 10C30 10 35 15 35 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M20 35C15 40 15 50 20 55C25 60 35 60 35 55V45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     <path d="M50 35C55 40 55 50 50 55C45 60 35 60 35 55V45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
   </svg>
 );

 return (
   <div className="mt-20">
     {/* Заголовок и подзаголовок */}
     <div className="flex flex-col md:flex-row justify-between mb-10">
       <div className="w-full md:w-1/2 mb-6 md:mb-0">
         <h2 className="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text leading-tight">
           Комплексный подход<br />
           к здоровью сотрудников
         </h2>
       </div>
       <div className="w-full md:w-1/2">
         <p className="text-lg md:text-xl text-light-text dark:text-dark-text">
           Повышаем уровень заботы о персонале<br />
           с помощью удобного и качественного<br />
           медицинского сопровождения
         </p>
       </div>
     </div>

     {/* Первый ряд карточек - по 2 блока слева и 1 блок справа */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
       {/* Левый большой блок - 50% */}
       <div className="md:col-span-2">
         <ServiceCard 
           title="Комплексные медицинские осмотры" 
           description="Регулярная диагностика и оценка состояния здоровья персонала с использованием передовых технологий для раннего выявления заболеваний"
           icon={<StethoscopeIcon />}
         />
       </div>
       {/* Первый правый блок - 25% */}
       <div className="md:col-span-1">
         <ServiceCard 
           title="Корпоративное страхование" 
           description="Индивидуально разработанные страховые программы"
           icon={<InsuranceIcon />}
         />
       </div>
       {/* Второй правый блок - 25% */}
       <div className="md:col-span-1">
         <ServiceCard 
           title="Профилактика и вакцинация" 
           description="Разработка и внедрение мер по профилактике заболеваний"
           icon={<VaccineIcon />}
         />
       </div>
     </div>

     {/* Второй ряд карточек - 2 блока по 50% */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div>
         <ServiceCard 
           title="Выездные медицинские услуги" 
           description="Организация выездных осмотров и консультаций в офисе, что позволяет сэкономить время сотрудников и обеспечить оперативную помощь"
           icon={<AmbulanceIcon />}
         />
       </div>
       <div>
         <ServiceCard 
           title="Персонализированное сопровождение" 
           description="Индивидуальный подход к каждому клиенту: от разработки программы обследований до поддержки корпоративных проектов по улучшению здоровья"
           icon={<HeartHandsIcon />}
         />
       </div>
     </div>
   </div>
 );
}