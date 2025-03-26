'use client';
import React, { useState } from 'react';
import { ClockIcon, CheckIcon, PacifierIcon } from '../../../shared/ui/Icon';

const AppointmentHistory = () => {
  const [loading, setLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  
  // Mock appointment data
  const appointments = [
    {
      id: 1,
      date: '19.05.2025',
      time: '11:00',
      doctor: 'Офтальмолог',
      doctorName: 'Врач: Иванова Мария Александровна',
      recordNumber: 'Запись №1905',
      status: 'upcoming',
      confirmed: true
    },
    {
      id: 2,
      date: '18.05.2025',
      time: '11:00',
      doctor: 'Офтальмолог',
      doctorName: 'Врач: Иванова Мария Александровна',
      recordNumber: 'Запись №1905',
      status: 'completed',
      confirmed: true
    },
    {
      id: 3,
      date: '18.05.2025',
      time: '11:00',
      doctor: 'Офтальмолог',
      doctorName: 'Врач: Иванова Мария Александровна',
      recordNumber: 'Запись №1905',
      status: 'completed',
      confirmed: true
    },
    {
      id: 4,
      date: '18.05.2025',
      time: '11:00',
      doctor: 'Офтальмолог',
      doctorName: 'Врач: Иванова Мария Александровна',
      recordNumber: 'Запись №1905',
      status: 'completed',
      confirmed: true
    },
    {
      id: 5,
      date: '18.05.2025',
      time: '11:00',
      doctor: 'Офтальмолог',
      doctorName: 'Врач: Иванова Мария Александровна',
      recordNumber: 'Запись №1905',
      status: 'completed',
      confirmed: true
    },
    {
      id: 6,
      date: '18.05.2025',
      time: '11:00',
      doctor: 'Офтальмолог',
      doctorName: 'Врач: Иванова Мария Александровна',
      recordNumber: 'Запись №1905',
      status: 'completed',
      confirmed: true
    },
    {
      id: 7,
      date: '18.05.2025',
      time: '11:00',
      doctor: 'Офтальмолог',
      doctorName: 'Врач: Иванова Мария Александровна',
      recordNumber: 'Запись №1905',
      status: 'completed',
      confirmed: true
    }
  ];

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <PacifierIcon size={120} color="#174F4B" />
      </div>
      <h3 className="text-2xl text-[#174F4B] font-medium">У вас пока нет записей ...</h3>
    </div>
  );

  // Status icon and text component
  const getStatusDetails = (status: string) => {
    if (status === 'upcoming') {
      return {
        icon: <ClockIcon size={20} color="#F59E0B" />,
        text: <span className="text-[#F59E0B]">Предстоящая запись</span>
      };
    } else if (status === 'completed') {
      return {
        icon: <CheckIcon size={20} color="#10B981" />,
        text: <span className="text-[#10B981]">Прием завершен</span>
      };
    } else {
      return { icon: null, text: null };
    }
  };

  // Handle load more
  const handleLoadMore = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="">
      <div className="mb-4 flex justify-end">
        <button 
          onClick={() => setShowEmpty(!showEmpty)}
          className="bg-[#094A54] text-white px-4 py-2 rounded-lg hover:bg-[#073a42] transition-colors"
        >
          {showEmpty ? 'Показать записи' : 'Показать пустое состояние'}
        </button>
      </div>
      
      {showEmpty ? (
        <EmptyState />
      ) : (
        <div>
          {appointments.map((appointment) => {
            const statusDetails = getStatusDetails(appointment.status);
            
            return (
              <div 
                key={appointment.id} 
                className="bg-white rounded-2xl mb-4 px-10 py-6 border-b border-gray-100"
              >
                <div className="grid grid-cols-3">
                  {/* Left column: date, time and status icon */}
                  <div className="col-span-1">
                    <div className="flex items-center">
                     
                      <span className="text-lg font-medium text-[#094A54]">
                        {appointment.date}, {appointment.time}
                      </span>
                    </div>
                    
                    <div className="mt-1 flex">
                       <div className="mr-2">
                        {statusDetails.icon}
                      </div>
                      {statusDetails.text}
                    </div>
                  </div>
                  
                  {/* Middle column: doctor specialty and name */}
                  <div className="col-span-1">
                    <div className="text-[#094A54] font-medium">{appointment.doctor}</div>
                    <div className="text-[#094A5480] text-sm mt-2">{appointment.doctorName}</div>
                  </div>
                  
                  {/* Right column: record number and confirmation status */}
                  <div className="col-span-1 text-right">
                    <div className="text-[#094A54]">{appointment.recordNumber}</div>
                    {appointment.confirmed && (
                      <div className="text-[#10B981] text-sm mt-1">Запись подтверждена</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          <button 
            onClick={handleLoadMore}
            className="w-full bg-[#00C78B] text-white py-4 rounded-xl hover:bg-[#00b57d] transition-colors duration-300 mt-4"
          >
            {loading ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;