import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useThemeStore } from '@/src/store/theme';

export interface DoctorCardProps {
  image: string;
  name: string;
  specialization: string;
  id: string;
  buttonText: string;
  isActive?: boolean;
  className?: string;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  image,
  name,
  specialization,
  id,
  buttonText,
  isActive = false,
  className = '',
}) => {
  const { theme } = useThemeStore();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`flex flex-col h-full border border-gray-200  dark:border-gray-700 rounded-xl overflow-hidden p-6 transition-all ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Doctor Image */}
      <div className="relative w-full h-[300px] mb-4 rounded-xl overflow-hidden">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      
      {/* Doctor Info */}
      <div className="flex flex-col flex-grow">
        <h3 className={`text-xl font-medium mb-1 ${theme === 'light' ? 'text-light-text' : 'text-dark-text'}`}>
          {name}
        </h3>
        <p className={`text-base mb-8 ${theme === 'light' ? 'text-light-text/70' : 'text-dark-text/70'}`}>
          {specialization}
        </p>
      </div>
      
      {/* Button */}
      <Link 
        href={`/doctors/${id}`} 
        className={`
          mt-auto w-full py-4 px-6 rounded-xl text-center transition-all duration-300
          ${isActive || isHovered
            ? 'bg-light-accent text-white' 
            : `${theme === 'light' ? 'border border-light-text text-light-text' : 'border border-dark-text text-dark-text'}`
          }
        `}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default DoctorCard;