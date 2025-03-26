'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDownIcon } from '@/src/shared/ui/Icon';
import { useThemeStore } from '@/src/store/theme';
import AppointmentConfirmation from '@/src/shared/components/AppointmentConfirmation';
import DoctorCard from '../appointment/components/DoctorCard';

// Типы для строгой типизации
type ServiceType = 'doctor' | 'analysis' | 'checkup';
type AppointmentType = 'primary' | 'secondary';

// Интерфейс для врача
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  qualification: string;
  degree: string;
  photoUrl: string;
  availableTimes: string[];
}

export default function DynamicAppointmentBooking() {
  const { theme } = useThemeStore();

  // Состояния для управления формой бронирования
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('19.05.2025');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('primary');
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  
  // Новое состояние для отображения врачей
  const [showDoctors, setShowDoctors] = useState(false);

  // Состояния для управления выпадающими списками
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isSpecialtyDropdownOpen, setIsSpecialtyDropdownOpen] = useState(false);

  // Ссылки на выпадающие списки
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const specialtyDropdownRef = useRef<HTMLDivElement>(null);

  // Предопределенные списки услуг и специальностей
  const services = [
    { value: 'doctor', label: 'Прием у врача' },
    { value: 'analysis', label: 'Сдача анализов' },
    { value: 'checkup', label: 'Прохождение чек-апа' }
  ];

  const specialtiesByService = {
    doctor: [
      'Гинекология', 'Терапия', 'Кардиология', 
      'Неврология', 'Офтальмология'
    ],
    analysis: [
      'Гормоны', 'Биохимия', 
      'Общий анализ', 'Гематология'
    ],
    checkup: [
      'Плановая операция', 'Женское здоровье', 
      'Мужское здоровье', 'Семейный чек-ап'
    ]
  };

  // Моковые данные врачей
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Мирбабаева Саодат Аманбаевна',
      specialty: 'Акушер-гинеколог, врач ультразвуковой диагностики',
      experience: '21',
      qualification: 'Высшая категория',
      degree: 'Кандидат медицинских наук',
      photoUrl: '/images/doctor-img.png',
      availableTimes: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00']
    },
    // Можно добавить больше врачей
  ];

  // Обработчики закрытия выпадающих списков при клике вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
      if (specialtyDropdownRef.current && !specialtyDropdownRef.current.contains(event.target as Node)) {
        setIsSpecialtyDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Сброс специальности при смене услуги
  useEffect(() => {
    setSelectedSpecialty('');
    setSelectedTime('');
    setShowDoctors(false);
  }, [selectedService]);

  // Обработчик бронирования врача
  const handleDoctorBooking = (bookingInfo: any) => {
    setBookingDetails({
      ...bookingInfo,
      service: 'doctor',
      specialty: selectedSpecialty,
      appointmentType
    });
    setIsBooked(true);
  };

  // Обработчик бронирования анализов/чек-апа
  const handleServiceBooking = () => {
    if (!selectedTime) {
      alert('Пожалуйста, выберите время');
      return;
    }

    setBookingDetails({
      service: selectedService,
      specialty: selectedSpecialty,
      date: selectedDate,
      time: selectedTime
    });
    setIsBooked(true);
  };

  // Сброс процесса бронирования
  const handleNewAppointment = () => {
    setIsBooked(false);
    setSelectedService('');
    setSelectedSpecialty('');
    setSelectedTime('');
    setAppointmentType('primary');
    setBookingDetails(null);
    setShowDoctors(false);
  };

  // Стили для выпадающих списков
  const themeStyles = {
    dropdown: theme === 'light' 
      ? 'bg-white border-[#094A5480] text-[#094A54]' 
      : 'bg-dark-block border-gray-700 text-white',
    dropdownItem: theme === 'light'
      ? 'hover:bg-light-accent/10 text-[#094A54]'
      : 'hover:bg-light-accent/10 text-white'
  };

  // Если бронирование подтверждено, показываем компонент подтверждения
  if (isBooked && bookingDetails) {
    return (
      <div className="container mx-auto px-4">
        <AppointmentConfirmation 
          type={bookingDetails.service}
          date={bookingDetails.date || selectedDate}
          time={bookingDetails.time}
          address="г. Ташкент, ул. Янги Сергели, д. 35"
          service={services.find(s => s.value === bookingDetails.service)?.label || ''}
          doctor={bookingDetails.name}
          cost={bookingDetails.service === 'doctor' ? 125000 : 50000}
        />
      </div>
    );
  }

  return (
    <div className="">
          <div className="bg-white rounded-2xl p-8 w-full">
                <h1 className="text-3xl md:text-[40px] w-[700px] font-medium mb-6 text-[#094A54]">Онлайн-запись</h1>
        {/* Блок информационного уведомления */}
        <div className="flex items-start mb-8 text-[#094A54]">
          <div className="flex-shrink-0 w-6 h-6 mr-3 mt-1">
           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1327_963)">
<path d="M9.99935 18.3327C14.6017 18.3327 18.3327 14.6017 18.3327 9.99935C18.3327 5.39698 14.6017 1.66602 9.99935 1.66602C5.39698 1.66602 1.66602 5.39698 1.66602 9.99935C1.66602 14.6017 5.39698 18.3327 9.99935 18.3327Z" stroke="#094A54" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 13.3333V10" stroke="#094A54" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 6.66602H10.0083" stroke="#094A54" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1327_963">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
          </div>
          <p className="text-[16px] w-[740px]">
            Обратите внимание: пациенты, записавшиеся на чек-ап, проходят прием у врачей и сдают анализы вне очереди. В связи с этим время вашей записи может сдвинуться на 10-15 минут.
          </p>
        </div>
        
        {/* Выбор услуги и специальности */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Выпадающий список услуг */}
          <div>
            <h2 className="text-xl font-medium mb-4 text-[#094A54]">Выберите услугу</h2>
            <div className="relative" ref={serviceDropdownRef}>
              <button
                type="button"
                onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                className={`
                  w-[400px] h-14 px-4 rounded-xl border 
                  flex justify-between items-center 
                  focus:outline-none
                  ${themeStyles.dropdown}
                `}
              >
                {services.find(s => s.value === selectedService)?.label || 'Выберите услугу'}
                <ArrowDownIcon 
                  size={12} 
                  color={theme === 'light' ? '#094A54' : 'white'} 
                  className={`transition-transform ${isServiceDropdownOpen ? 'transform rotate-180' : ''}`} 
                />
              </button>
              
              {isServiceDropdownOpen && (
                <div className={`
                  absolute z-20 mt-1 w-[400px] 
                  rounded-xl shadow-lg border 
                  overflow-hidden
                  ${themeStyles.dropdown}
                `}>
                  {services.map((service) => (
                    <button
                      key={service.value}
                      className={`
                        w-full px-4 py-3 text-left 
                        ${themeStyles.dropdownItem}
                        ${selectedService === service.value ? 'bg-light-accent/10' : ''}
                      `}
                      onClick={() => {
                        setSelectedService(service.value as ServiceType);
                        setIsServiceDropdownOpen(false);
                      }}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Выпадающий список специальностей */}
          <div>
            <h2 className="text-xl font-medium mb-4 text-[#094A54]">Выберите направление</h2>
            <div className="relative" ref={specialtyDropdownRef}>
              <button
                type="button"
                onClick={() => setIsSpecialtyDropdownOpen(!isSpecialtyDropdownOpen)}
                disabled={!selectedService}
                className={`
                  w-[400px] h-14 px-4 rounded-xl border 
                  flex justify-between items-center 
                  focus:outline-none
                  ${themeStyles.dropdown}
                  ${!selectedService ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {selectedSpecialty || 'Выберите направление'}
                <ArrowDownIcon 
                  size={12} 
                  color={theme === 'light' ? '#094A54' : 'white'} 
                  className={`transition-transform ${isSpecialtyDropdownOpen ? 'transform rotate-180' : ''}`} 
                />
              </button>
              
              {isSpecialtyDropdownOpen && selectedService && (
                <div className={`
                  absolute z-20 mt-1 w-[400px] 
                  rounded-xl shadow-lg border 
                  overflow-hidden
                  ${themeStyles.dropdown}
                `}>
                  {specialtiesByService[selectedService].map((specialty) => (
                    <button
                      key={specialty}
                      className={`
                        w-full px-4 py-3 text-left 
                        ${themeStyles.dropdownItem}
                        ${selectedSpecialty === specialty ? 'bg-light-accent/10' : ''}
                      `}
                      onClick={() => {
                        setSelectedSpecialty(specialty);
                        setIsSpecialtyDropdownOpen(false);
                        
                        // Для врачей показываем карточки докторов
                        if (selectedService === 'doctor') {
                          setShowDoctors(true);
                        }
                      }}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Тип приема для врачей */}
        {selectedService === 'doctor' && selectedSpecialty && (
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <button 
                type="button"
                onClick={() => setAppointmentType('primary')}
                className="flex items-center cursor-pointer focus:outline-none"
              >
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${appointmentType === 'primary' ? 'border-[#00C78B]' : 'border-[#094A5480]'}`}>
                  {appointmentType === 'primary' && (
                    <div className="w-4 h-4 rounded-full bg-[#00C78B]"></div>
                  )}
                </div>
                <span className="ml-3 text-[#094A54]">Первичный прием</span>
              </button>
            </div>
            
            <div className="flex items-center">
              <button 
                type="button"
                onClick={() => setAppointmentType('secondary')}
                className="flex items-center cursor-pointer focus:outline-none"
              >
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${appointmentType === 'secondary' ? 'border-[#00C78B]' : 'border-[#094A5480]'}`}>
                  {appointmentType === 'secondary' && (
                    <div className="w-4 h-4 rounded-full bg-[#00C78B]"></div>
                  )}
                </div>
                <span className="ml-3 text-[#094A54]">Повторный прием</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Карточки врачей */}
        {selectedService === 'doctor' && selectedSpecialty && showDoctors && (
          <div>
            <h2 className="text-xl font-medium mb-4 text-[#094A54]">
              Выберите врача
            </h2>
            {doctors.map((doctor) => (
             <DoctorCard onBookAppointment={handleDoctorBooking} key={doctor.id} doctor={doctor} />
           ))}
          </div>
        )}
        
      {/* Выбор даты и времени для анализов и чек-апа */}
        {(selectedService === 'analysis' || selectedService === 'checkup') && selectedSpecialty && (
          <div className="flex flex-col w-[400px] mt-20 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-medium mb-4 text-[#094A54]">Выберите дату</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full h-[56px] px-4 rounded-xl border border-[#094A5480] bg-white text-[#094A54] focus:outline-none focus:ring-2 focus:ring-[#00C78B]"
              />
            </div>
            
            <div>
              <h2 className="text-xl font-medium mb-4 text-[#094A54]">Выберите время</h2>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full h-[56px] px-4 rounded-xl border border-[#094A5480] bg-white text-[#094A54] focus:outline-none focus:ring-2 focus:ring-[#00C78B] appearance-none"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23094A54' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, 
                  backgroundRepeat: 'no-repeat', 
                  backgroundPosition: 'right 1rem center' 
                }}
              >
                <option value="">--:--</option>
                {['08:00', '09:00', '10:00', '11:00', '12:00', '14:00'].map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {/* Кнопка бронирования для анализов и чек-апа */}
        {(selectedService === 'analysis' || selectedService === 'checkup') && 
         selectedSpecialty && 
         selectedTime && (
          <button
            onClick={handleServiceBooking}
            className="h-14 bg-[#00C78B] w-[400px] px-10 text-white rounded-xl hover:bg-[#00a87a] transition-colors"
          >
            {selectedService === 'analysis' 
              ? 'Записаться на сдачу анализов' 
              : 'Записаться на прохождение чек-апа'}
          </button>
        )}
      </div>
    </div>
  );
};
