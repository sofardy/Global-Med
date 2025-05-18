'use client';

import React, { useState, useRef } from 'react';
import { useTranslation } from '@/src/hooks/useTranslation';
import { HeartHandIcon } from '../ui/Icon';

interface VideoBannerProps {
  videoSrc?: string;
  className?: string;
}

const translations = {
  ru: {
    title: 'Делаем медицинскую помощь удобной, доступной и комфортной для вас',
    playVideo: 'Смотреть видео'
  },
  uz: {
    title: 'Tibbiy yordamni qulay, hamyonbop va qulay qilamiz',
    playVideo: 'Videoni ko\'rish'
  }
};

export const VideoBanner: React.FC<VideoBannerProps> = ({
  videoSrc = "/video/video.mp4",
  className = ""
}) => {
  const { t } = useTranslation(translations);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={`relative w-full overflow-hidden rounded-2xl mb-6 sm:mb-8 md:mb-40 cursor-pointer ${className}`} 
      onClick={handleClick}
    >
      {/* Видео - адаптивная высота */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px]">
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          onEnded={handleVideoEnd}
          muted
          playsInline
          autoPlay
        />
        
        {/* Затемнение для видео */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>
      </div>
      
      {/* Центральный блок с текстом - адаптивный размер */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-[280px] h-auto sm:w-[320px] md:w-[375px] lg:h-[375px] bg-light-text dark:bg-dark-block rounded-2xl flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="text-center text-white">
              <div className="text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6 md:mb-12">
                {t('title')}
              </div>
              <div className="flex justify-center mt-4 md:mt-6">
                <HeartHandIcon size={40} color="white" className="sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px]" />
              </div>
            </div>
          </div>
        </div>
      
      {/* Иконка воспроизведения при наведении - адаптивный размер */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/80 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#174F4B]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Полоса прогресса видео */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 z-20">
          <div 
            className="h-full bg-light-accent"
            style={{ 
              width: videoRef.current 
                ? `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%` 
                : '0%'
            }}
          ></div>
        </div>
      )}
    </div>
  );
};