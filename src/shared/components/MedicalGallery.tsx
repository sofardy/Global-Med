'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

export const MedicalGallery = ({ 
  images = [
    '/images/medical-image-1.png',
    '/images/medical-image-2.png',
    '/images/medical-image-3.png',
    '/images/medical-image-4.png'
  ],
  alt = 'Medical care image'
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile when component mounts
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Mobile slider view
  if (isMobile) {
    return (
      <div className="w-full relative mb-6 sm:mb-8 md:mb-40">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          spaceBetween={10}
          slidesPerView={1}
          className="w-full rounded-lg overflow-hidden"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[460px]">
               <Image
  src={src}
  width={0}
  height={0}
  sizes="100vw"
  alt={`${alt} ${index + 1}`}
  className="w-full h-full object-cover"
  style={{ width: '100%', height: 'auto' }}
/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="swiper-button-prev-custom absolute left-4 top-1/2 z-10 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="swiper-button-next-custom absolute right-4 top-1/2 z-10 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        
        <style jsx global>{`
          .swiper-button-prev, .swiper-button-next {
            display: none;
          }
          
          .swiper-button-prev-custom.swiper-button-disabled,
          .swiper-button-next-custom.swiper-button-disabled {
            opacity: 0.35;
            cursor: auto;
            pointer-events: none;
          }
        `}</style>
      </div>
    );
  }

  // Desktop grid view
  return (
    <div className="w-full flex flex-row flex-wrap mb-6 sm:mb-8 md:mb-40">
      {images.map((src, index) => (
        <div 
          key={index}
          className="w-1/4 p-1 md:p-2"
        >
          <div className="h-[460px] relative overflow-hidden rounded-lg">
            <Image
                width={0}
  height={0}
  sizes="100vw"
              src={src}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
