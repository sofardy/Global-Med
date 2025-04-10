'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDownIcon } from '@/src/shared/ui/Icon';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import AppointmentConfirmation from '@/src/shared/components/AppointmentConfirmation';
import DoctorCard from './components/DoctorCard';
import { getDoctors, Doctor as ApiDoctor } from '../../api/doctors';
import { useLanguageStore } from '@/src/store/language';

// Интерфейс для мапирования специальностей на их UUID
interface SpecialtyMapping {
  [key: string]: string;
}

// Типы для строгой типизации
type ServiceType = 'doctor' | 'analysis' | 'checkup';
type AppointmentType = 'primary' | 'secondary';

// Переводы для компонента
const translations = {
  ru: {
    title: 'Онлайн-запись',
    alertMessage: 'Обратите внимание: пациенты, записавшиеся на чек-ап, проходят прием у врачей и сдают анализы вне очереди. В связи с этим время вашей записи может сдвинуться на 10-15 минут.',
    selectService: 'Выберите услугу',
    selectSpecialty: 'Выберите направление',
    serviceOptions: [
      { value: 'doctor', label: 'Прием у врача' },
      { value: 'analysis', label: 'Сдача анализов' },
      { value: 'checkup', label: 'Прохождение чек-апа' }
    ],
    selectDoctor: 'Выберите врача',
    primaryAppointment: 'Первичный прием',
    secondaryAppointment: 'Повторный прием',
    selectDate: 'Выберите дату',
    selectTime: 'Выберите время',
    emptyTime: '--:--',
    bookAnalysis: 'Записаться на сдачу анализов',
    bookCheckup: 'Записаться на прохождение чек-апа',
    pleaseSelectTime: 'Пожалуйста, выберите время',
    loading: 'Загрузка...',
    errorLoading: 'Ошибка при загрузке данных врачей',
    noResults: 'Врачи не найдены',
    tryAgain: 'Попробовать снова'
  },
  uz: {
    title: 'Onlayn yozilish',
    alertMessage: `Diqqat: tekshiruvga yozilgan bemorlar navbatsiz shifokorlar qabulidan o'tadilar va tahlil topshiradilar. Shu sababli sizning yozilish vaqtingiz 10-15 daqiqaga siljishi mumkin.`,
    selectService: 'Xizmatni tanlang',
    selectSpecialty: `Yo'nalishni tanlang`,
    serviceOptions: [
      { value: 'doctor', label: 'Shifokor qabuli' },
      { value: 'analysis', label: 'Tahlil topshirish' },
      { value: 'checkup', label: `Tekshiruvdan o'tish` }
    ],
    selectDoctor: 'Shifokorni tanlang',
    primaryAppointment: 'Dastlabki qabul',
    secondaryAppointment: 'Takroriy qabul',
    selectDate: 'Sanani tanlang',
    selectTime: 'Vaqtni tanlang',
    emptyTime: '--:--',
    bookAnalysis: 'Tahlil topshirishga yozilish',
    bookCheckup: `Tekshiruvdan o'tishga yozilish`,
    pleaseSelectTime: 'Iltimos, vaqtni tanlang',
    loading: 'Yuklanmoqda...',
    errorLoading: 'Shifokorlar ma\'lumotlarini yuklashda xatolik',
    noResults: 'Shifokorlar topilmadi',
    tryAgain: 'Qayta urinib ko\'ring'
  }
};

// Пример маппинга названий специальностей на их UUID
// Это должно быть заменено на реальные данные или запрос к API
const specialtyUUIDMapping: SpecialtyMapping = {
  'Терапевт': '3e643044-4290-34fc-9a91-8eae6d2dce7f',
  'Кардиолог': '78d9c2f4-5ea2-30dd-8699-9fe5c0c87689',
  'Невролог': '577d45f2-5210-3ff6-be2a-2e89cc80da81',
  'Офтальмолог': '959384f4-0fba-3f50-a91b-f69575e60890',
  'Эндокринолог': '346ca30e-64a0-3ad6-8d8f-ed2f749b6d9f',
  'Гастроэнтеролог': '642cdbee-be48-3536-998c-3f7bebc40629',
  'Гинеколог': '959384f4-0fba-3f50-a91b-f69575e60890',
  'Отоларинголог (ЛОР)': '959384f4-0fba-3f50-a91b-f69575e60890',
  'Дерматолог': '3e643044-4290-34fc-9a91-8eae6d2dce7f',
  'Ортопед': '78d9c2f4-5ea2-30dd-8699-9fe5c0c87689',
  'Уролог': '577d45f2-5210-3ff6-be2a-2e89cc80da81',
  'Педиатр': '959384f4-0fba-3f50-a91b-f69575e60890'
};

// Специальности в зависимости от выбранной услуги
const specialtiesByService = {
  doctor: [
    'Терапевт', 'Кардиолог', 'Невролог', 
    'Офтальмолог', 'Эндокринолог', 'Гастроэнтеролог', 
    'Гинеколог', 'Отоларинголог (ЛОР)', 'Дерматолог',
    'Ортопед', 'Уролог', 'Педиатр'
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

export default function DynamicAppointmentBooking() {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const { currentLocale } = useLanguageStore();
  const [isMobile, setIsMobile] = useState(false);

  // Состояния для управления формой бронирования
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isSpecialtyDropdownOpen, setIsSpecialtyDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('19.05.2025');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('primary');
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  
  // Состояния для работы с API докторов
  const [doctors, setDoctors] = useState<ApiDoctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Новое состояние для отображения врачей
  const [showDoctors, setShowDoctors] = useState(false);

  // Ссылки на выпадающие списки
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const specialtyDropdownRef = useRef<HTMLDivElement>(null);

  // Детекция мобильного устройства - более ранняя адаптация из-за боковой панели
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Функция для получения UUID специальности по её названию
  const getSpecialtyUUID = (specialtyName: string): string | undefined => {
    return specialtyUUIDMapping[specialtyName];
  };

  // Сброс специальности при смене услуги
  useEffect(() => {
    setSelectedSpecialty('');
    setSelectedTime('');
    setShowDoctors(false);
    setDoctors([]);
  }, [selectedService]);

  // Функция для загрузки докторов при выборе специальности
  const fetchDoctors = async (specialtyUuid?: string) => {
    try {
      setLoading(true);
      setError(null);

      const filters: any = {};
      if (specialtyUuid) {
        filters.specialization_uuid = specialtyUuid;
      }

      const response = await getDoctors(filters, 1, currentLocale);
      setDoctors(response.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(t('errorLoading'));
    } finally {
      setLoading(false);
    }
  };

  // Обработчик изменения специальности
  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setIsSpecialtyDropdownOpen(false);
    
    // Для врачей загружаем список докторов
    if (selectedService === 'doctor' && specialty) {
      const specialtyUuid = getSpecialtyUUID(specialty);
      if (specialtyUuid) {
        fetchDoctors(specialtyUuid);
        setShowDoctors(true);
      }
    }
  };

  // Обработчик изменения услуги
  const handleServiceChange = (service: ServiceType) => {
    setSelectedService(service);
    setIsServiceDropdownOpen(false);
  };

  // Функция для форматирования данных с проверкой на корректность
function formatDoctorData(apiDoctor: ApiDoctor) {
  return {
    id: apiDoctor.uuid,
    name: apiDoctor.full_name || 'Н/Д',
    specialization: isValidField(apiDoctor.specialization) ? apiDoctor.specialization : 'Специалист',
    experience: apiDoctor.experience_years || 'Н/Д',
    qualification: isValidField(apiDoctor.qualification) ? apiDoctor.qualification : 'Врач',
    category: isValidField(apiDoctor.category) ? apiDoctor.category : '',
    languages: formatLanguages(apiDoctor.languages),
    price: formatPrice(apiDoctor.price_from),
    photoUrl: apiDoctor.image_url || '/images/doctor-placeholder.png'
  };
}

// Вспомогательная функция для проверки содержательности поля
function isValidField(value: string | null): boolean {
  return value !== null && value.length > 0 && !['adipisci', 'qui', 'laboriosam', 'eum', 'omnis'].includes(value);
}

// Форматирование языков
function formatLanguages(languages: string | null): string[] {
  if (!languages) return ['русский', 'узбекский'];
  return languages.split(',').map(lang => lang.trim());
}

// Форматирование цены
function formatPrice(price: string | null): string {
  if (!price) return 'Уточняйте по телефону';
  const numPrice = parseInt(price, 10);
  if (isNaN(numPrice)) return 'Уточняйте по телефону';
  return `от ${numPrice.toLocaleString()} сум`;
}

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
      alert(t('pleaseSelectTime'));
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

  // Цвета для темного и светлого режима
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-dark-block';
  const textColor = theme === 'light' ? 'text-[#094A54]' : 'text-white';
  const mutedTextColor = theme === 'light' ? 'text-[#094A5480]' : 'text-gray-400';
  const borderColor = theme === 'light' ? 'border-[#094A5480]' : 'border-gray-700';
  const inputBg = theme === 'light' ? 'bg-white' : 'bg-dark-bg';

  // Получаем список услуг из переводов
  const services = t('serviceOptions', { returnObjects: true }) as Array<{value: string, label: string}>;

  // Если бронирование подтверждено, показываем компонент подтверждения
  if (isBooked && bookingDetails) {
    // Получаем опции услуг как массив
    const serviceOptions = t('serviceOptions', { returnObjects: true }) as Array<{value: string, label: string}>;
    
    // Безопасно получаем название услуги
    const findServiceLabel = (serviceOptions: any[], serviceValue: string): string => {
      if (!Array.isArray(serviceOptions)) {
        return '';
      }
      const service = serviceOptions.find(s => s.value === serviceValue);
      return service?.label || '';
    };
    
    const serviceLabel = findServiceLabel(serviceOptions, bookingDetails.service);
    
    return (
      <AppointmentConfirmation 
        type={bookingDetails.service}
        date={bookingDetails.date || selectedDate}
        time={bookingDetails.time}
        address="г. Ташкент, ул. Янги Сергели, д. 35"
        service={serviceLabel}
        doctor={bookingDetails.name}
        cost={bookingDetails.service === 'doctor' ? 125000 : 50000}
      />
    );
  }

  return (
    <div className="">
      <div className={`${cardBg} rounded-2xl p-4 md:p-8 w-full mx-auto`}>
        <h1 className={`text-2xl md:text-3xl lg:text-[40px] font-medium mb-4 md:mb-6 ${textColor} max-w-[700px]`}>
          {t('title')}
        </h1>
        
        {/* Блок информационного уведомления */}
        <div className={`flex items-start mb-6 md:mb-8 ${textColor}`}>
          <div className="flex-shrink-0 w-6 h-6 mr-3 mt-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1327_963)">
                <path d="M9.99935 18.3327C14.6017 18.3327 18.3327 14.6017 18.3327 9.99935C18.3327 5.39698 14.6017 1.66602 9.99935 1.66602C5.39698 1.66602 1.66602 5.39698 1.66602 9.99935C1.66602 14.6017 5.39698 18.3327 9.99935 18.3327Z" stroke={theme === 'light' ? "#094A54" : "#ffffff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 13.3333V10" stroke={theme === 'light' ? "#094A54" : "#ffffff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 6.66602H10.0083" stroke={theme === 'light' ? "#094A54" : "#ffffff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1327_963">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <p className={`text-sm md:text-[16px] w-full md:w-[740px]`}>
            {t('alertMessage')}
          </p>
        </div>
        
        {/* Выбор услуги и специальности */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Выпадающий список услуг */}
          <div>
            <h2 className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}>
              {t('selectService')}
            </h2>
            <div className="relative" ref={serviceDropdownRef}>
              <button
                type="button"
                onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                className={`
                  w-full h-12 md:h-14 px-4 rounded-xl border 
                  flex justify-between items-center 
                  focus:outline-none
                  ${borderColor} ${inputBg} ${textColor}
                `}
              >
                {services.find((s: any) => s.value === selectedService)?.label || t('selectService')}
                <ArrowDownIcon 
                  size={12} 
                  color={theme === 'light' ? '#094A54' : 'white'} 
                  className={`transition-transform ${isServiceDropdownOpen ? 'transform rotate-180' : ''}`} 
                />
              </button>
              
              {isServiceDropdownOpen && (
                <div className={`
                  absolute z-20 mt-1 w-full 
                  rounded-xl shadow-lg border 
                  overflow-hidden
                  ${cardBg} ${borderColor} ${textColor}
                `}>
                  {services.map((service: any) => (
                    <button
                      key={service.value}
                      className={`
                        w-full px-4 py-3 text-left 
                        hover:bg-light-accent/10 ${textColor}
                        ${selectedService === service.value ? 'bg-light-accent/10' : ''}
                      `}
                      onClick={() => handleServiceChange(service.value as ServiceType)}
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
            <h2 className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}>
              {t('selectSpecialty')}
            </h2>
            <div className="relative" ref={specialtyDropdownRef}>
              <button
                type="button"
                onClick={() => setIsSpecialtyDropdownOpen(!isSpecialtyDropdownOpen)}
                disabled={!selectedService}
                className={`
                  w-full h-12 md:h-14 px-4 rounded-xl border 
                  flex justify-between items-center 
                  focus:outline-none
                  ${borderColor} ${inputBg} ${textColor}
                  ${!selectedService ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {selectedSpecialty || t('selectSpecialty')}
                <ArrowDownIcon 
                  size={12} 
                  color={theme === 'light' ? '#094A54' : 'white'} 
                  className={`transition-transform ${isSpecialtyDropdownOpen ? 'transform rotate-180' : ''}`} 
                />
              </button>
              
              {isSpecialtyDropdownOpen && selectedService && (
                <div className={`
                  absolute z-20 mt-1 w-full
                  rounded-xl shadow-lg border 
                  overflow-hidden
                  ${cardBg} ${borderColor} ${textColor}
                `}>
                  {specialtiesByService[selectedService]?.map((specialty) => (
                    <button
                      key={specialty}
                      className={`
                        w-full px-4 py-3 text-left 
                        hover:bg-light-accent/10 ${textColor}
                        ${selectedSpecialty === specialty ? 'bg-light-accent/10' : ''}
                      `}
                      onClick={() => handleSpecialtyChange(specialty)}
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
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${appointmentType === 'primary' ? 'border-[#00C78B]' : borderColor}`}>
                  {appointmentType === 'primary' && (
                    <div className="w-4 h-4 rounded-full bg-[#00C78B]"></div>
                  )}
                </div>
                <span className={`ml-3 ${textColor}`}>{t('primaryAppointment')}</span>
              </button>
            </div>
            
            <div className="flex items-center">
              <button 
                type="button"
                onClick={() => setAppointmentType('secondary')}
                className="flex items-center cursor-pointer focus:outline-none"
              >
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${appointmentType === 'secondary' ? 'border-[#00C78B]' : borderColor}`}>
                  {appointmentType === 'secondary' && (
                    <div className="w-4 h-4 rounded-full bg-[#00C78B]"></div>
                  )}
                </div>
                <span className={`ml-3 ${textColor}`}>{t('secondaryAppointment')}</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Секция выбора врача - отображается при выборе услуги "Прием у врача" и специальности */}
        {selectedService === 'doctor' && selectedSpecialty && showDoctors && (
          <div>
            <h2 className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}>
              {t('selectDoctor')}
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
                <span className="ml-3 text-light-text dark:text-dark-text">{t('loading')}</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-4">
                  <p>{error}</p>
                </div>
                <button 
                  onClick={() => {
                    const specialtyUuid = getSpecialtyUUID(selectedSpecialty);
                    if (specialtyUuid) fetchDoctors(specialtyUuid);
                  }}
                  className="px-4 py-2 bg-light-accent text-white rounded-lg"
                >
                  {t('tryAgain')}
                </button>
              </div>
            ) : doctors.length === 0 ? (
              <div className="flex justify-center py-10">
                <div className="text-light-text/70 dark:text-dark-text/70 text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-light-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xl">{t('noResults')}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
              {doctors.map(doctor => {
                const formattedDoctor = formatDoctorData(doctor);
  
  return (
    <DoctorCard
      key={doctor.uuid}
      doctor={{
        id: formattedDoctor.id,
        name: formattedDoctor.name,
        specialty: formattedDoctor.specialization,
        experience: formattedDoctor.experience,
        qualification: formattedDoctor.qualification,
        category: formattedDoctor.category,
        languages: formattedDoctor.languages,
        price: formattedDoctor.price,
        photoUrl: formattedDoctor.photoUrl,
        // Временные слоты для записи
        availableTimes: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00']
      }}
      onBookAppointment={handleDoctorBooking}
    />
  );
})}
              </div>
            )}
          </div>
        )}
        
        {/* Выбор даты и времени для анализов и чек-апа */}
        {(selectedService === 'analysis' || selectedService === 'checkup') && selectedSpecialty && (
          <div className="flex flex-col w-full max-w-[500px] mt-6 md:mt-20 gap-4 md:gap-6 mb-6">
            <div>
              <h2 className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}>
                {t('selectDate')}
              </h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`w-full h-12 md:h-[56px] px-4 rounded-xl border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-[#00C78B]`}
              />
            </div>
            
            <div>
              <h2 className={`text-lg md:text-xl font-medium mb-2 md:mb-4 ${textColor}`}>
                {t('selectTime')}
              </h2>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className={`w-full h-12 md:h-[56px] px-4 rounded-xl border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-[#00C78B] appearance-none`}
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${theme === 'light' ? '%23094A54' : '%23ffffff'}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, 
                  backgroundRepeat: 'no-repeat', 
                  backgroundPosition: 'right 1rem center' 
                }}
              >
                <option value="">{t('emptyTime')}</option>
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
            className="h-12 md:h-14 bg-[#00C78B] w-full max-w-[500px] px-4 md:px-10 text-white rounded-xl hover:bg-[#00a87a] transition-colors"
          >
            {selectedService === 'analysis' 
              ? t('bookAnalysis')
              : t('bookCheckup')}
          </button>
        )}
      </div>
    </div>
  );
}