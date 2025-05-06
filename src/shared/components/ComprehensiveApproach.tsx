'use client'
import React, { useState, ReactElement } from 'react';
import { useThemeStore } from '@/src/store/theme';
import { BrainIcon, ClipboardIcon, DocumentIcon, HeartIconk2, MedicalTrackerIcon, PencilIcon } from '../ui/Icon';

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
   
   // Create a clone of the icon with the appropriate color and size props
   const iconWithColor = React.cloneElement(icon, { 
     color: hover 
       ? '#FFFFFF'  // White when hovering (both light and dark mode)
       : theme === 'light' ? '#094A54' : '#FFFFFF', // Default color based on theme
     size: 80 // Set icon size to 80px
   });
   
   return (
     <div 
       className={`p-6 rounded-xl min-h-[340px] h-full ${bgColor} flex flex-col relative transition-colors duration-300`}
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(isActive)}
     >
       {/* Круглая точка в правом верхнем углу */}
       <div className={`absolute top-4 right-4 w-3 h-3 md:w-4 md:h-4 rounded-full ${
         hover ? 'bg-white' : (theme === 'light' ? 'bg-gray-100' : 'bg-gray-700')
       } transition-colors duration-300`}></div>
       
       <h3 className={`text-xl mb-auto md:text-2xl font-medium ${textColor}`}>
         {title}
       </h3>
       
       <div className="flex justify-center items-center my-8">
         {iconWithColor}
       </div>
       
       <p className={`mt-auto ${textColor} text-base leading-relaxed`}>
         {description}
       </p>
     </div>
   );
 };
 
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
           icon={<MedicalTrackerIcon />}
         />
       </div>
       {/* Первый правый блок - 25% */}
       <div className="md:col-span-1">
         <ServiceCard 
           title="Корпоративное страхование" 
           description="Индивидуально разработанные страховые программы"
           icon={<DocumentIcon />}
         />
       </div>
       {/* Второй правый блок - 25% */}
       <div className="md:col-span-1">
         <ServiceCard 
           title="Профилактика и вакцинация" 
           description="Разработка и внедрение мер по профилактике заболеваний"
           icon={<PencilIcon />}
         />
       </div>
     </div>

     {/* Второй ряд карточек - 2 блока по 50% */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div>
         <ServiceCard 
           title="Выездные медицинские услуги" 
           description="Организация выездных осмотров и консультаций в офисе, что позволяет сэкономить время сотрудников и обеспечить оперативную помощь"
           icon={<ClipboardIcon />}
         />
       </div>
       <div>
         <ServiceCard 
           title="Персонализированное сопровождение" 
           description="Индивидуальный подход к каждому клиенту: от разработки программы обследований до поддержки корпоративных проектов по улучшению здоровья"
           icon={<HeartIconk2 />}
         />
       </div>
     </div>
   </div>
 );
}