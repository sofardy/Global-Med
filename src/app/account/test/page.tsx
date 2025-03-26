// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import { useThemeStore } from '@/src/store/theme';
// import { ArrowDownIcon } from '@/src/shared/ui/Icon';

// export default function AppointmentPage() {
//   const { theme } = useThemeStore();
  
//   // States for form fields
//   const [service, setService] = useState('Прием у врача');
//   const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
//   const [specialty, setSpecialty] = useState('');
//   const [isSpecialtyDropdownOpen, setIsSpecialtyDropdownOpen] = useState(false);
//   const [appointmentType, setAppointmentType] = useState('primary');
//   const [showDoctors, setShowDoctors] = useState(false);
  
//   // Refs for dropdowns
//   const serviceDropdownRef = useRef(null);
//   const specialtyDropdownRef = useRef(null);
  
//   // Services and specialties data
//   const services = ['Прием у врача', 'Анализы', 'Чек-ап', 'Процедуры'];
//   const specialties = ['Гинекология', 'Терапия', 'Кардиология', 'Неврология', 'Офтальмология', 'Отоларингология'];
  
//   // Effect to close dropdowns when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target)) {
//         setIsServiceDropdownOpen(false);
//       }
//       if (specialtyDropdownRef.current && !specialtyDropdownRef.current.contains(event.target)) {
//         setIsSpecialtyDropdownOpen(false);
//       }
//     }
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);
  
//   // Effect to show doctor selection when all required fields are filled
//   useEffect(() => {
//     if (service && specialty) {
//       setShowDoctors(true);
//     } else {
//       setShowDoctors(false);
//     }
//   }, [service, specialty]);
  
//   // Mock doctor data
//   const doctors = [
//     {
//       id: '1',
//       name: 'Мирбабаева Саодат Аманбаевна',
//       specialty: 'Акушер-гинеколог, врач ультразвуковой диагностики',
//       experience: '21',
//       qualification: 'Высшая категория',
//       degree: 'Кандидат медицинских наук',
//       photoUrl: '/images/doctor-img.png',
//       date: '19.05.2025',
//       availableTimes: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00']
//     },
//     {
//       id: '2',
//       name: 'Мирбабаева Саодат Аманбаевна',
//       specialty: 'Акушер-гинеколог, врач ультразвуковой диагностики',
//       experience: '21',
//       qualification: 'Высшая категория',
//       degree: 'Кандидат медицинских наук',
//       photoUrl: '/images/doctor-img.png',
//       date: '19.05.2025',
//       availableTimes: ['09:30', '10:30', '11:30', '12:30', '14:30', '15:30']
//     }
//   ];
  
//   // Handle dropdown selection
//   const handleServiceSelect = (selectedService) => {
//     setService(selectedService);
//     setIsServiceDropdownOpen(false);
//   };
  
//   const handleSpecialtySelect = (selectedSpecialty) => {
//     setSpecialty(selectedSpecialty);
//     setIsSpecialtyDropdownOpen(false);
//   };
  
//   // Doctor card component
//   const DoctorCard = ({ doctor }) => {
//     const [selectedDate, setSelectedDate] = useState('2025-05-19');
//     const [selectedTime, setSelectedTime] = useState('');
    
//     // Format today's date as default for the input
//     const today = new Date();
//     const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
//     const handleAppointment = () => {
//       if (!selectedTime) {
//         alert('Пожалуйста, выберите время приема');
//         return;
//       }
      
//       console.log('Booking appointment with:', {
//         doctor: doctor.name,
//         service,
//         specialty,
//         appointmentType,
//         date: selectedDate,
//         time: selectedTime
//       });
      
//       alert('Вы успешно записались на прием!');
//     };
    
//    return (
//       <div className="bg-white rounded-2xl shadow-sm border border-[#94A3A6] overflow-hidden mb-6">
//         <div className="p-8">
//           <div className="flex flex-col md:flex-row">
//             <div className=" flex-shrink-0 mb-4 md:mb-0 md:mr-6">
//               <div className="w-[135px] h-[180px] relative mx-auto md:mx-0">
//                 <Image 
//                   src={doctor.photoUrl} 
//                   alt={doctor.name}
//                   className="rounded-xl object-cover "
//                   fill
//                 />
//               </div>
//             </div>
            
//             <div className="flex-1">
//               <h3 className="text-xl md:text-2xl font-medium text-[#094A54]">{doctor.name}</h3>
//               <p className="text-[#094A54] mb-4">{doctor.specialty}</p>
              
//               <ul className="mb-6 space-y-2">
//                 <li className="flex items-start text-[#94A3A6]">
//                   <span className="text-[#94A3A6] mr-2">•</span>
//                   <span>Стаж {doctor.experience} год</span>
//                 </li>
//                 <li className="flex items-start text-[#94A3A6]">
//                   <span className="text-[#94A3A6] mr-2">•</span>
//                   <span>{doctor.qualification}</span>
//                 </li>
//                 <li className="flex items-start text-[#94A3A6]">
//                   <span className="text-[#94A3A6] mr-2">•</span>
//                   <span>{doctor.degree}</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
        
//         <div className="p-8 bg-white">
//           <div className="grid grid-cols-1 md:grid-cols-3  gap-4 items-end">
//             <div className=''>
//               <div className="mb-2 text-[#094A54]">Выберите дату</div>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 min={formattedToday}
//                 className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-[#094A54] focus:outline-none focus:ring-2 focus:ring-[#00C78B]"
//               />
//             </div>
            
//             <div>
//               <div className="mb-2 text-[#094A54]">Выберите время</div>
//               <select
//                 value={selectedTime}
//                 onChange={(e) => setSelectedTime(e.target.value)}
//                 className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-white text-[#094A54] focus:outline-none focus:ring-2 focus:ring-[#00C78B] appearance-none"
//                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23094A54' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
//               >
//                 <option value="">--:--</option>
//                 {doctor.availableTimes.map((time) => (
//                   <option key={time} value={time}>{time}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="md:text-right h-[49px]">
//               <button
//                 onClick={handleAppointment}
//                 className="w-full h-[49px] px-6 py-3 bg-[#00C78B] text-white rounded-xl hover:bg-[#00C78B]/90 transition-colors"
//               >
//                 Записаться на прием
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
  
//   return (
//     <main className="bg-[#fff]">
//       <div className="bg-white p-6 md:p-10 rounded-2xl max-w-[1200px] mx-auto">
//         <h1 className="text-3xl md:text-[40px] font-medium mb-6 text-[#094A54]">Онлайн-запись</h1>
        
//         {/* Information notice */}
//         <div className="flex items-start mb-8 text-[#094A54]">
//           <div className="flex-shrink-0 w-6 h-6 mr-3 text-[#094A54]">
//             <svg viewBox="0 0 24 24" fill="none" stroke="#094A54" strokeWidth="2">
//               <circle cx="12" cy="12" r="10" />
//               <path d="M12 8v4M12 16h.01" />
//             </svg>
//           </div>
//           <p className="w-full md:w-[750px] text-[16px]">
//             Обратите внимание: пациенты, записавшиеся на чек-ап, проходят прием у врачей и сдают анализы вне очереди. В связи с этим время вашей записи может сдвинуться на 10-15 минут.
//           </p>
//         </div>
        
//         {/* Service and specialty selection */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <div className="w-full md:w-[400px]">
//             <h2 className="text-xl font-medium mb-4 text-[#094A54]">Выберите услугу</h2>
//             <div className="relative" ref={serviceDropdownRef}>
//               <button
//                 type="button"
//                 onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
//                 className="w-full h-14 px-4 rounded-xl border border-[#094A5480] bg-white text-[#094A54] flex justify-between items-center focus:outline-none"
//               >
//                 {service}
//                 <ArrowDownIcon size={12} color="#094A54" className={`transition-transform ${isServiceDropdownOpen ? 'transform rotate-180' : ''}`} />
//               </button>
              
//               {isServiceDropdownOpen && (
//                 <div className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-lg border border-[#094A5480] overflow-hidden">
//                   {services.map((item) => (
//                     <button
//                       key={item}
//                       className={`w-full px-4 py-3 text-left text-[#094A54] hover:bg-light-accent/10 ${service === item ? 'bg-light-accent/10' : ''}`}
//                       onClick={() => handleServiceSelect(item)}
//                     >
//                       {item}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className="w-full md:w-[400px]">
//             <h2 className="text-xl font-medium mb-4 text-[#094A54]">Выберите направление</h2>
//             <div className="relative" ref={specialtyDropdownRef}>
//               <button
//                 type="button"
//                 onClick={() => setIsSpecialtyDropdownOpen(!isSpecialtyDropdownOpen)}
//                 className="w-full h-14 px-4 rounded-xl border border-[#094A5480] bg-white text-[#094A54] flex justify-between items-center focus:outline-none"
//               >
//                 {specialty || 'Выберите направление'}
//                 <ArrowDownIcon size={12} color="#094A54" className={`transition-transform ${isSpecialtyDropdownOpen ? 'transform rotate-180' : ''}`} />
//               </button>
              
//               {isSpecialtyDropdownOpen && (
//                 <div className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-lg border border-[#094A5480] overflow-hidden">
//                   {specialties.map((item) => (
//                     <button
//                       key={item}
//                       className={`w-full px-4 py-3 text-left text-[#094A54] hover:bg-light-accent/10 ${specialty === item ? 'bg-light-accent/10' : ''}`}
//                       onClick={() => handleSpecialtySelect(item)}
//                     >
//                       {item}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
        
//         {/* Appointment type radio buttons - only shown after service and specialty are selected */}
//         {showDoctors && (
//           <div className="mb-10">
//             <div className="flex items-center mb-4">
//               <button 
//                 type="button"
//                 onClick={() => setAppointmentType('primary')}
//                 className="flex items-center cursor-pointer focus:outline-none"
//               >
//                 <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${appointmentType === 'primary' ? 'border-[#00C78B]' : 'border-[#094A5480]'}`}>
//                   {appointmentType === 'primary' && (
//                     <div className="w-4 h-4 rounded-full bg-[#00C78B]"></div>
//                   )}
//                 </div>
//                 <span className="ml-3 text-[#094A54]">Первичный прием</span>
//              </button>
//            </div>
           
//            <div className="flex items-center">
//              <button 
//                type="button"
//                onClick={() => setAppointmentType('secondary')}
//                className="flex items-center cursor-pointer focus:outline-none"
//              >
//                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${appointmentType === 'secondary' ? 'border-[#00C78B]' : 'border-[#094A5480]'}`}>
//                  {appointmentType === 'secondary' && (
//                    <div className="w-4 h-4 rounded-full bg-[#00C78B]"></div>
//                  )}
//                </div>
//                <span className="ml-3 text-[#094A54]">Повторный прием</span>
//              </button>
//            </div>
//          </div>
//        )}
       
//        {/* Doctor selection section - only shown when all options are selected */}
//        {showDoctors && (
//          <div>
//            <h2 className="text-2xl font-medium mb-6 text-[#094A54]">Выберите врача</h2>
           
//            {doctors.map((doctor) => (
//              <DoctorCard key={doctor.id} doctor={doctor} />
//            ))}
//          </div>
//        )}
//      </div>
//    </main>
//  );
// }

export default function Test() { }