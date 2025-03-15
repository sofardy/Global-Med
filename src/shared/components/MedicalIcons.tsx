'use client';

import { useThemeStore } from '@/src/store/theme';
import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const StethoscopeIcon: React.FC<IconProps> = ({ 
  size = 48, 
  color,
  className = '' 
}) => {
  const { theme } = useThemeStore();
  const iconColor = color || (theme === 'light' ? '#094A54' : '#ffffff');
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M8 16V11C8 9.34315 9.34315 8 11 8H37C38.6569 8 40 9.34315 40 11V16" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M24 8V25" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M34 24C34 30.0751 29.0751 35 23 35C16.9249 35 12 30.0751 12 24V16H34V24Z" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="36" 
        cy="34" 
        r="6" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ChecklistIcon: React.FC<IconProps> = ({ 
  size = 48, 
  color,
  className = '' 
}) => {
  const { theme } = useThemeStore();
  const iconColor = color || (theme === 'light' ? '#094A54' : '#ffffff');
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect 
        x="10" 
        y="4" 
        width="28" 
        height="40" 
        rx="2" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M18 4V8C18 9.10457 18.8954 10 20 10H28C29.1046 10 30 9.10457 30 8V4" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M19 19L22 22L29 15" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M19 31L22 34L29 27" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const NeuronIcon: React.FC<IconProps> = ({ 
  size = 48, 
  color,
  className = '' 
}) => {
  const { theme } = useThemeStore();
  const iconColor = color || (theme === 'light' ? '#094A54' : '#ffffff');
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M24 12C26.2091 12 28 10.2091 28 8C28 5.79086 26.2091 4 24 4C21.7909 4 20 5.79086 20 8C20 10.2091 21.7909 12 24 12Z" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 26C14.2091 26 16 24.2091 16 22C16 19.7909 14.2091 18 12 18C9.79086 18 8 19.7909 8 22C8 24.2091 9.79086 26 12 26Z" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M36 26C38.2091 26 40 24.2091 40 22C40 19.7909 38.2091 18 36 18C33.7909 18 32 19.7909 32 22C32 24.2091 33.7909 26 36 26Z" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M16 40C18.2091 40 20 38.2091 20 36C20 33.7909 18.2091 32 16 32C13.7909 32 12 33.7909 12 36C12 38.2091 13.7909 40 16 40Z" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M32 40C34.2091 40 36 38.2091 36 36C36 33.7909 34.2091 32 32 32C29.7909 32 28 33.7909 28 36C28 38.2091 29.7909 40 32 40Z" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M24 12V14" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M20 16L16 19" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M28 16L32 19" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M18 28L16 32" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M30 28L32 32" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M16 26L16 28" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M32 26L32 28" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M24 16V28" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M24 28L20 32" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M24 28L28 32" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BloodCellsIcon: React.FC<IconProps> = ({ 
  size = 48, 
  color,
  className = '' 
}) => {
  const { theme } = useThemeStore();
  const iconColor = color || (theme === 'light' ? '#094A54' : '#ffffff');
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle 
        cx="14" 
        cy="24" 
        r="10" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="24" 
        cy="14" 
        r="6" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="34" 
        cy="28" 
        r="8" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 20C14 22 16 24 12 28" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M24 10C26 12 26 14 22 16" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M32 24C34 26 36 28 32 32" 
        stroke={iconColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};