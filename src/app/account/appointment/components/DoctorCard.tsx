import React, { useState } from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/src/store/theme';

// Doctor interface to define the structure of doctor data
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

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (details: {
    doctorId: string;
    name: string;
    date: string;
    time: string;
  }) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ 
  doctor, 
  onBookAppointment 
}) => {
  const { theme } = useThemeStore();
  
  // Default to a predetermined date, matching the screenshot
  const [selectedDate, setSelectedDate] = useState('2025-05-19');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Format today's date as minimum selectable date
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const handleAppointment = () => {
    if (!selectedTime) {
      alert('Пожалуйста, выберите время приема');
      return;
    }
    
    // Call the passed onBookAppointment callback
    onBookAppointment({
      doctorId: doctor.id,
      name: doctor.name,
      date: selectedDate,
      time: selectedTime
    });
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#94A3A6] overflow-hidden mb-6">
      {/* Doctor Information Section */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row">
          {/* Doctor Photo */}
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div className="w-[135px] h-[180px] relative mx-auto md:mx-0">
              <Image 
                src={doctor.photoUrl} 
                alt={doctor.name}
                className="rounded-xl object-cover"
                fill
              />
            </div>
          </div>
          
          {/* Doctor Details */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-medium text-[#094A54]">
              {doctor.name}
            </h3>
            <p className="text-[#094A54] mb-4">
              {doctor.specialty}
            </p>
            
            <ul className="mb-6 space-y-2">
              <li className="flex items-start text-[#94A3A6]">
                <span className="text-[#94A3A6] mr-2">•</span>
                <span>Стаж {doctor.experience} год</span>
              </li>
              <li className="flex items-start text-[#94A3A6]">
                <span className="text-[#94A3A6] mr-2">•</span>
                <span>{doctor.qualification}</span>
              </li>
              <li className="flex items-start text-[#94A3A6]">
                <span className="text-[#94A3A6] mr-2">•</span>
                <span>{doctor.degree}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Booking Section */}
      <div className="p-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Date Selection */}
          <div>
            <div className="mb-2 text-[#094A54]">Выберите дату</div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={formattedToday}
              className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-[#094A54] focus:outline-none focus:ring-2 focus:ring-[#00C78B]"
            />
          </div>
          
          {/* Time Selection */}
          <div>
            <div className="mb-2 text-[#094A54]">Выберите время</div>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-[#094A54] focus:outline-none focus:ring-2 focus:ring-[#00C78B] appearance-none"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23094A54' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'right 1rem center' 
              }}
            >
              <option value="">--:--</option>
              {doctor.availableTimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          
          {/* Booking Button */}
          <div className="md:text-right h-[49px]">
            <button
              onClick={handleAppointment}
              className="w-full h-[49px] px-6 py-3 bg-[#00C78B] text-white rounded-xl hover:bg-[#00C78B]/90 transition-colors"
            >
              Записаться на прием
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;