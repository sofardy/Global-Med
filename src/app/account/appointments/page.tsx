'use client';
import React, { useState, useEffect } from 'react';
import { ClockIcon, CheckIcon, PacifierIcon } from '../../../shared/ui/Icon';
import { useThemeStore } from '../../../store/theme';
import { useTranslation } from '../../../hooks/useTranslation';
import axios from 'axios';
import { API_BASE_URL } from '@/src/config/constants';
import { useRouter } from 'next/navigation';

// Интерфейс для типизации данных записи на приём
interface Appointment {
  number: string | number;
  date: string;
  status: string;
  service_type: string;
  service_name: string;
  service_detail: string[];
}

// Переводы статусов
const statusTranslations = {
  "Предстоящая запись": "upcoming",
  "Отменено": "cancelled",
  "Завершено": "completed"
};

// Translations
const translations = {
  ru: {
    emptyState: 'У вас пока нет записей ...',
    loadMore: 'Загрузить еще',
    loading: 'Загрузка...',
    upcomingAppointment: 'Предстоящая запись',
    completedAppointment: 'Прием завершен',
    cancelledAppointment: 'Отменено',
    confirmed: 'Запись подтверждена',
    confirmedShort: 'Подтверждена',
    service: 'Услуга:',
    errorLoading: 'Ошибка при загрузке записей',
    tryAgain: 'Попробовать снова',
    unauthorized: 'Необходима авторизация'
  },
  uz: {
    emptyState: 'Hozircha yozuvlaringiz yo\'q ...',
    loadMore: 'Ko\'proq yuklash',
    loading: 'Yuklanmoqda...',
    upcomingAppointment: 'Rejalashtirilgan qabul',
    completedAppointment: 'Qabul tugallangan',
    cancelledAppointment: 'Bekor qilindi',
    confirmed: 'Qabul tasdiqlangan',
    confirmedShort: 'Tasdiqlangan',
    service: 'Xizmat:',
    errorLoading: 'Yozuvlarni yuklashda xatolik yuz berdi',
    tryAgain: 'Qayta urinib ko\'ring',
    unauthorized: 'Avtorizatsiya talab qilinadi'
  }
};

const AppointmentHistory = () => {
  const { theme } = useThemeStore();
  const { t, currentLocale } = useTranslation(translations);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Получение записей через API
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('authToken');
      const tokenType = localStorage.getItem('tokenType');
      
      if (!token || !tokenType) {
        setError(t('unauthorized'));
        setTimeout(() => {
          router.push('/account/login');
        }, 2000);
        return;
      }
      
      const response = await axios.get(`${API_BASE_URL}/appointments`, {
        headers: {
          'Authorization': `${tokenType} ${token}`,
          'X-Language': currentLocale
        }
      });
      
      // Выводим структуру ответа для отладки
      console.log('API Response:', response.data);
      
      // Проверяем наличие данных в ответе
      const appointmentsData = Array.isArray(response.data) ? response.data : [];
      setAppointments(appointmentsData);
      
    } catch (err: any) {
      console.error('Error fetching appointments:', err);
      
      // Проверяем статус ответа для определения причины ошибки
      if (err.response && err.response.status === 401) {
        // Ошибка авторизации
        setError(t('unauthorized'));
        setTimeout(() => {
          router.push('/account/login');
        }, 2000);
      } else {
        // Другие ошибки
        setError(t('errorLoading'));
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchAppointments();
  }, [currentLocale]);
  
  // Компонент пустого состояния
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <PacifierIcon size={120} color={theme === 'light' ? "#174F4B" : "#ffffff"} />
      </div>
      <h3 className="text-2xl font-medium text-center text-light-text dark:text-dark-text">{t('emptyState')}</h3>
    </div>
  );
  
  // Получение иконки и текста статуса
  const getStatusDetails = (status: string) => {
    const normalizedStatus = statusTranslations[status as keyof typeof statusTranslations] || 'completed';
    
    if (normalizedStatus === 'upcoming') {
      return {
        icon: <ClockIcon size={20} color="#F59E0B" />,
        text: <span className="text-[#F59E0B]">{t('upcomingAppointment')}</span>
      };
    } else if (normalizedStatus === 'completed') {
      return {
        icon: <CheckIcon size={20} color="#10B981" />,
        text: <span className="text-[#10B981]">{t('completedAppointment')}</span>
      };
    } else if (normalizedStatus === 'cancelled') {
      return {
        icon: <CheckIcon size={20} color="#EF4444" />,
        text: <span className="text-[#EF4444]">{t('cancelledAppointment')}</span>
      };
    } else {
      return { icon: null, text: null };
    }
  };
  
  // Разделение даты и времени из формата API
  const extractTimeFromDate = (dateString: string) => {
    // Формат ожидается: "20.04.2025 17:15"
    const parts = dateString.split(' ');
    if (parts.length === 2) {
      return { date: parts[0], time: parts[1] };
    }
    return { date: dateString, time: '' };
  };
  
  // Если ошибка загрузки
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-4">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => fetchAppointments()}
          className="px-4 py-2 bg-light-accent text-white rounded-lg"
        >
          {t('tryAgain')}
        </button>
      </div>
    );
  }
  
  // Если загрузка
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
        <span className="ml-3 text-light-text dark:text-dark-text">{t('loading')}</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {appointments.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          {appointments.map((appointment, index) => {
            const statusDetails = getStatusDetails(appointment.status);
            const { date, time } = extractTimeFromDate(appointment.date);
            const isConfirmed = appointment.status === "Предстоящая запись";
            
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-dark-block rounded-2xl mb-4 px-4 sm:px-6 md:px-10 py-4 sm:py-6 border-b border-gray-100 dark:border-gray-700 shadow-sm"
              >
                {/* Desktop layout */}
                <div className="hidden sm:grid sm:grid-cols-3">
                  {/* Left column: date, time and status icon */}
                  <div className="col-span-1">
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-light-text dark:text-dark-text">
                        {date}, {time}
                      </span>
                    </div>
                    
                    <div className="mt-1 flex items-center">
                      <div className="mr-2">
                        {statusDetails.icon}
                      </div>
                      {statusDetails.text}
                    </div>
                  </div>
                  
                  {/* Middle column: service type and name */}
                  <div className="col-span-1">
                    <div className="text-light-text dark:text-dark-text font-medium">
                      {appointment.service_type}
                    </div>
                    <div className="text-[#094A5480] dark:text-dark-text/80 text-sm mt-2">
                      {t('service')} {appointment.service_name}
                    </div>
                  </div>
                  
                  {/* Right column: record number and confirmation status */}
                  <div className="col-span-1 text-right">
                    <div className="text-light-text dark:text-dark-text">
                      {typeof appointment.number === 'number' 
                        ? `Запись №${appointment.number}` 
                        : `Запись №${appointment.number}`}
                    </div>
                    {isConfirmed && (
                      <div className="text-[#10B981] text-sm mt-1">{t('confirmed')}</div>
                    )}
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="sm:hidden">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-base font-medium text-light-text dark:text-dark-text">
                        {date}, {time}
                      </div>
                      <div className="mt-1 flex items-center">
                        <div className="mr-2">
                          {statusDetails.icon}
                        </div>
                        {statusDetails.text}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-light-text dark:text-dark-text text-sm">
                        {typeof appointment.number === 'number' 
                          ? `Запись №${appointment.number}` 
                          : `Запись №${appointment.number}`}
                      </div>
                      {isConfirmed && (
                        <div className="text-[#10B981] text-xs">{t('confirmedShort')}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-light-text dark:text-dark-text font-medium">
                      {appointment.service_type}
                    </div>
                    <div className="text-light-text/80 dark:text-dark-text/80 text-xs mt-1">
                      {t('service')} {appointment.service_name}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;