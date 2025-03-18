'use client';

import React from 'react';
import { useThemeStore } from '@/src/store/theme';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const HeartCheckIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color,
  className = '' 
}) => {
  const { theme } = useThemeStore();
  const iconColor = color || (theme === 'light' ? '#00c78b' : '#00c78b');
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M19.3 5.71a4.6 4.6 0 00-6.5 0l-.8.8-.8-.8a4.6 4.6 0 00-6.5 6.5l.8.8L12 19.5l6.5-6.5.8-.8a4.6 4.6 0 000-6.5z" 
        stroke={iconColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M9 12l2 2 4-4" 
        stroke={iconColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const GoogleIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color,
  className = '' 
}) => {
  const { theme } = useThemeStore();
  const iconColor = color || (theme === 'light' ? '#00c78b' : '#00c78b');
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 11h8.76c0 .91-.23 1.76-.65 2.5H12v-2.5z" 
        fill={iconColor} 
      />
      <path 
        d="M12 7v3h4.76c-.22-.67-.58-1.28-1.06-1.79L17.48 6c1.62 1.29 2.72 3.23 2.97 5.48.04.33.05.67.05 1.02 0 1.31-.23 2.48-.7 3.5C18.67 18.15 16.55 20 12 20c-4.16 0-7.26-2.79-8.3-6.5h3.87c.92 1.91 2.99 3.5 4.43 3.5 1.36 0 2.58-.31 3.61-.9.91-.52 1.58-1.28 1.92-2.1H3v-3h9z" 
        fill={iconColor} 
      />
      <path 
        d="M3 11h9V7H5.99c.98 1.1 1.53 2.02 1.64 2.5H3V11z" 
        fill={iconColor} 
      />
    </svg>
  );
};

export const YouTubeIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color,
  className = '' 
}) => {
  const { theme } = useThemeStore();
  const iconColor = color || (theme === 'light' ? '#FF0000' : '#FF0000');
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" 
        fill={iconColor} 
      />
      <path 
        d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" 
        fill="#ffffff" 
      />
    </svg>
  );
};