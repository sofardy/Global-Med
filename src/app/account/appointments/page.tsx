'use client';
import React, { useState } from 'react';
import { ClockIcon, CheckIcon, PacifierIcon } from '../../../shared/ui/Icon';
import { useThemeStore } from '../../../store/theme';
import { useTranslation } from '../../../hooks/useTranslation';

// Translations
const translations = {
  ru: {
    emptyState: 'У вас пока нет записей ...',
    loadMore: 'Загрузить еще',
    loading: 'Загрузка...',
    showEmpty: 'Показать пустое состояние',
    showRecords: 'Показать записи',
    upcomingAppointment: 'Предстоящая запись',
    completedAppointment: 'Прием завершен',
    confirmed: 'Запись подтверждена',
    confirmedShort: 'Подтверждена',
    doctor: 'Врач:'
  },
  uz: {
    emptyState: 'Hozircha yozuvlaringiz yo\'q ...',
    loadMore: 'Ko\'proq yuklash',
    loading: 'Yuklanmoqda...',
    showEmpty: 'Bo\'sh holatni ko\'rsatish',
    showRecords: 'Yozuvlarni ko\'rsatish',
    upcomingAppointment: 'Rejalashtirilgan qabul',
    completedAppointment: 'Qabul tugallangan',
    confirmed: 'Qabul tasdiqlangan',
    confirmedShort: 'Tasdiqlangan',
    doctor: 'Shifokor:'
  }
};

const AppointmentHistory = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const [loading, setLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  
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
        <PacifierIcon size={120} color={theme === 'light' ? "#174F4B" : "#ffffff"} />
      </div>
      <h3 className="text-2xl font-medium text-center text-light-text dark:text-dark-text">{t('emptyState')}</h3>
    </div>
  );

  // Status icon and text component
  const getStatusDetails = (status: string) => {
    if (status === 'upcoming') {
      return {
        icon: <ClockIcon size={20} color="#F59E0B" />,
        text: <span className="text-[#F59E0B]">{t('upcomingAppointment')}</span>
      };
    } else if (status === 'completed') {
      return {
        icon: <CheckIcon size={20} color="#10B981" />,
        text: <span className="text-[#10B981]">{t('completedAppointment')}</span>
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
    <div className="w-full">
      <div className="mb-4 flex justify-end">
        <button 
          onClick={() => setShowEmpty(!showEmpty)}
          className="bg-light-accent dark:bg-light-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors text-sm sm:text-base"
        >
          {showEmpty ? t('showRecords') : t('showEmpty')}
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
                className="bg-white dark:bg-dark-block rounded-2xl mb-4 px-4 sm:px-6 md:px-10 py-4 sm:py-6 border-b border-gray-100 dark:border-gray-700 shadow-sm"
              >
                {/* Desktop layout */}
                <div className="hidden sm:grid sm:grid-cols-3">
                  {/* Left column: date, time and status icon */}
                  <div className="col-span-1">
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-light-text dark:text-dark-text">
                        {appointment.date}, {appointment.time}
                      </span>
                    </div>
                    
                    <div className="mt-1 flex items-center">
                      <div className="mr-2">
                        {statusDetails.icon}
                      </div>
                      {statusDetails.text}
                    </div>
                  </div>
                  
                  {/* Middle column: doctor specialty and name */}
                  <div className="col-span-1">
                    <div className="text-light-text dark:text-dark-text font-medium">{appointment.doctor}</div>
                    <div className="text-[#094A5480] dark:text-dark-text/80 text-sm mt-2">
                      {t('doctor')} {appointment.doctorName.replace('Врач: ', '')}
                    </div>
                  </div>
                  
                  {/* Right column: record number and confirmation status */}
                  <div className="col-span-1 text-right">
                    <div className="text-light-text dark:text-dark-text">{appointment.recordNumber}</div>
                    {appointment.confirmed && (
                      <div className="text-[#10B981] text-sm mt-1">{t('confirmed')}</div>
                    )}
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="sm:hidden">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-base font-medium text-light-text dark:text-dark-text">
                        {appointment.date}, {appointment.time}
                      </div>
                      <div className="mt-1 flex items-center">
                        <div className="mr-2">
                          {statusDetails.icon}
                        </div>
                        {statusDetails.text}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-light-text dark:text-dark-text text-sm">{appointment.recordNumber}</div>
                      {appointment.confirmed && (
                        <div className="text-[#10B981] text-xs">{t('confirmedShort')}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-light-text dark:text-dark-text font-medium">{appointment.doctor}</div>
                    <div className="text-light-text/80 dark:text-dark-text/80 text-xs mt-1">
                      {t('doctor')} {appointment.doctorName.replace('Врач: ', '')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          <button 
            onClick={handleLoadMore}
            className="w-full bg-light-accent text-white py-3 sm:py-4 rounded-xl hover:opacity-90 transition-colors duration-300 mt-4 text-sm sm:text-base font-medium"
          >
            {loading ? t('loading') : t('loadMore')}
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;