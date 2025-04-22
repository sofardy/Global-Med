'use client';

import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useLanguageStore } from '@/src/store/language';
import axios from 'axios';
import { API_BASE_URL } from '@/src/config/constants';
import { useRouter } from 'next/navigation';

// Alert Circle Icon component
const AlertCircleIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 8V12" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 16H12.01" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Переводы с валидационными сообщениями
const translations = {
  ru: {
    patientPersonalData: 'Личные данные пациента',
    firstName: 'Имя',
    lastName: 'Фамилия',
    birthDate: 'Дата рождения',
    gender: 'Пол',
    accountData: 'Данные учетной записи',
    phoneNumber: 'Номер телефона',
    changeNumber: 'Изменить номер',
    cancel: 'Отменить',
    phoneChangeInfo: 'Для изменения номера телефона требуется пройти процедуру подтверждения нового номера с помощью одноразового смс-кода',
    saveChanges: 'Сохранить изменения',
    genders: {
      female: 'Женский',
      male: 'Мужской'
    },
    validation: {
      required: 'Это поле обязательно',
      invalidName: 'Имя должно содержать только буквы',
      invalidPhone: 'Неверный формат номера телефона'
    },
    successMessage: 'Изменения успешно сохранены',
    errorMessage: 'Ошибка при сохранении данных'
  },
  uz: {
    patientPersonalData: 'Bemor shaxsiy ma\'lumotlari',
    firstName: 'Ism',
    lastName: 'Familiya',
    birthDate: 'Tug\'ilgan sana',
    gender: 'Jins',
    accountData: 'Hisob ma\'lumotlari',
    phoneNumber: 'Telefon raqami',
    changeNumber: 'Raqamni o\'zgartirish',
    cancel: 'Bekor qilish',
    phoneChangeInfo: 'Telefon raqamini o\'zgartirish uchun bir martalik SMS-kod yordamida yangi raqamni tasdiqlash tartibini o\'tish kerak',
    saveChanges: 'O\'zgarishlarni saqlash',
    genders: {
      female: 'Ayol',
      male: 'Erkak'
    },
    validation: {
      required: 'Bu maydon talab qilinadi',
      invalidName: 'Ism faqat harflardan iborat bo\'lishi kerak',
      invalidPhone: 'Telefon raqami formati noto\'g\'ri'
    },
    successMessage: 'O\'zgarishlar muvaffaqiyatli saqlandi',
    errorMessage: 'Ma\'lumotlarni saqlashda xatolik yuz berdi'
  }
};

interface FormData {
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  gender: string;
  phone: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phone?: string;
}

export default function Profile(): JSX.Element {
  const { theme } = useThemeStore();
  const { t, currentLocale } = useTranslation(translations);
  const { currentLocale: appLocale } = useLanguageStore();
  const router = useRouter();
  
  // Refs для click outside handling
  const genderDropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  
  // Состояния формы
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    birthDate: null,
    gender: '',
    phone: ''
  });
  
  // Состояния для UI
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState<boolean>(false);
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // Загрузка данных пользователя
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      try {
        const token = localStorage.getItem('authToken');
        const tokenType = localStorage.getItem('tokenType');
        
        if (!token || !tokenType) {
          router.push('/account/login');
          return;
        }
        
        const response = await axios.get(`${API_BASE_URL}/user`, {
          headers: {
            'Authorization': `${tokenType} ${token}`,
            'X-Language': appLocale
          }
        });
        
        const userData = response.data;
        
        setFormData({
          firstName: userData.first_name || '',
          lastName: userData.last_name || '',
          birthDate: userData.birthday ? new Date(userData.birthday) : null,
          gender: userData.gender || '',
          phone: userData.phone || ''
        });
      } catch (error) {
        console.error('Failed to load user data:', error);
        // Обработка ошибки загрузки данных
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [router, appLocale]);
  
  // Обработка клика вне выпадающего списка
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target as Node)) {
        setIsGenderDropdownOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node) && isCalendarOpen) {
        setIsCalendarOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);
  
  // Валидация имени (только буквы)
  const validateName = (name: string): boolean => {
    return /^[A-Za-zА-Яа-яЁёҚқҒғҲҳЎўӮӯЧчШшЪъ\s-]+$/.test(name);
  };
  
  // Валидация номера телефона
  const validatePhone = (phone: string): boolean => {
    return /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(phone);
  };
  
  // Форматирование номера телефона
  const formatPhone = (input: string): string => {
    // Удаляем все нецифровые символы
    const digits = input.replace(/\D/g, '');
    
    // Обеспечиваем код страны Узбекистана
    let formatted = '';
    if (digits.length > 0) {
      const digitsWithCode = digits.startsWith('998') ? digits : `998${digits}`;
      const limitedDigits = digitsWithCode.substring(0, 12);
      
      formatted = '+998 ';
      if (limitedDigits.length > 3) {
        formatted += `(${limitedDigits.substring(3, 5)}) `;
      }
      if (limitedDigits.length > 5) {
        formatted += `${limitedDigits.substring(5, 8)}-`;
      }
      if (limitedDigits.length > 8) {
        formatted += `${limitedDigits.substring(8, 10)}-`;
      }
      if (limitedDigits.length > 10) {
        formatted += limitedDigits.substring(10, 12);
      }
    }
    
    return formatted;
  };
  
  // Обработка изменения input полей
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhone(value);
      setFormData({ ...formData, [name]: formattedPhone });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Очищаем ошибку для этого поля
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
    
    // Скрываем алерт при изменении данных
    if (alertMessage) {
      setAlertMessage(null);
    }
  };
  
  // Обработка изменения даты
  const handleDateChange = (value: any): void => {
    // Обрабатываем различные форматы даты
    if (value === null || value instanceof Date) {
      setFormData({ ...formData, birthDate: value });
    } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
      setFormData({ ...formData, birthDate: value[0] });
    }
    
    // Скрываем алерт при изменении данных
    if (alertMessage) {
      setAlertMessage(null);
    }
  };
  
  // Обработка выбора пола
  const handleGenderSelect = (gender: string): void => {
    setFormData({ ...formData, gender });
    setIsGenderDropdownOpen(false);
    
    // Скрываем алерт при изменении данных
    if (alertMessage) {
      setAlertMessage(null);
    }
  };
  
  // Переключение режима редактирования телефона
  const togglePhoneEdit = (): void => {
    setIsEditingPhone(!isEditingPhone);
    
    // Очищаем ошибку телефона при переключении
    if (errors.phone) {
      setErrors({ ...errors, phone: undefined });
    }
  };
  
  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Валидация имени
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('validation.required');
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = t('validation.invalidName');
    }
    
    // Валидация фамилии
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('validation.required');
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = t('validation.invalidName');
    }
    
    // Валидация даты рождения
    if (!formData.birthDate) {
      newErrors.birthDate = t('validation.required');
    }
    
    // Валидация телефона, если режим редактирования активен
    if (isEditingPhone) {
      if (!formData.phone.trim()) {
        newErrors.phone = t('validation.required');
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = t('validation.invalidPhone');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Отправка формы
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSaving(true);
    setAlertMessage(null);
    
    try {
      const token = localStorage.getItem('authToken');
      const tokenType = localStorage.getItem('tokenType');
      
      if (!token || !tokenType) {
        router.push('/account/login');
        return;
      }
      
      // Форматируем данные для API
      const apiData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        birthday: formData.birthDate instanceof Date ? formData.birthDate.toISOString().split('T')[0] : null
      };
      
      // Добавляем телефон, если он редактируется
      if (isEditingPhone) {
        // Предполагается, что для изменения телефона может потребоваться отдельный API-запрос
        // или специальная логика верификации
      }
      
      // Обновляем данные пользователя
      await axios.put(`${API_BASE_URL}/user`, apiData, {
        headers: {
          'Authorization': `${tokenType} ${token}`,
          'X-Language': appLocale,
          'Content-Type': 'application/json'
        }
      });
      
      setIsEditingPhone(false);
      setAlertMessage({
        type: 'success',
        text: t('successMessage')
      });
    } catch (err) {
      console.error('Error updating user profile:', err);
      setAlertMessage({
        type: 'error',
        text: t('errorMessage')
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Получаем стили в зависимости от темы
  const getThemeStyles = () => {
    return {
      textColor: theme === 'light' ? 'text-[#094A54]' : 'text-white',
      textColorMuted: theme === 'light' ? 'text-[#094A54]/80' : 'text-white/80',
      bgColor: theme === 'light' ? 'bg-white' : 'bg-[#094A54]',
      inputBgColor: theme === 'light' ? 'bg-white' : 'bg-[#073a42]',
      inputBorderColor: theme === 'light' ? 'border-gray-300' : 'border-[#0c5c68]',
      dropdownBgColor: theme === 'light' ? 'bg-white' : 'bg-[#073a42]',
      dropdownHoverColor: theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#0c5c68]',
      linkColor: 'text-[#00C78B]',
      linkHoverColor: 'hover:text-[#00a87a]',
      buttonBgColor: 'bg-light-accent',
      buttonHoverBgColor: 'hover:bg-[#5ab696]',
      errorColor: 'text-red-500',
      successColor: 'text-green-500'
    };
  };
  
  const styles = getThemeStyles();
  
  // Определение отображаемого пола
  const displayGender = formData.gender 
    ? (formData.gender === 'male' ? t('genders.male') : t('genders.female')) 
    : t('gender');
  
  // Функция для стилизации DatePicker
  const getDatePickerClassName = () => {
    const baseClass = "react-date-picker";
    return theme === 'dark' ? `${baseClass} dark-theme` : baseClass;
  };
  
  // Если данные еще загружаются
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
      </div>
    );
  }
  
  return (
    <div className={`p-4 sm:p-6 md:p-10 rounded-2xl ${theme === 'light' ? 'bg-[#ffffff]' : 'bg-[#0c5c68]'} ${styles.textColor}`}>
      <form onSubmit={handleSubmit}>
        {/* Сообщение об успехе или ошибке */}
        {alertMessage && (
          <div 
            className={`mb-6 p-4 rounded-xl ${alertMessage.type === 'success' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}
          >
            {alertMessage.text}
          </div>
        )}
        
        <h1 className="text-xl sm:text-2xl font-medium mb-6 md:mb-8">{t('patientPersonalData')}</h1>
        
        {/* Персональная информация */}
        <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[71%] grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-10 mb-10 md:mb-20">
          <div className="md:pr-4">
            <label className="block mb-2 text-sm sm:text-base">{t('firstName')}</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full max-w-full md:max-w-[290px] h-12 sm:h-[57px] p-3 sm:p-4 border ${styles.inputBorderColor} ${styles.inputBgColor} rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00C78B] text-sm sm:text-base`}
            />
            {errors.firstName && <p className={`mt-1 text-xs sm:text-sm ${styles.errorColor}`}>{errors.firstName}</p>}
          </div>
          
          <div className="md:pr-4">
            <label className="block mb-2 text-sm sm:text-base">{t('lastName')}</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full max-w-full md:max-w-[290px] h-12 sm:h-[57px] p-3 sm:p-4 border ${styles.inputBorderColor} ${styles.inputBgColor} rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00C78B] text-sm sm:text-base`}
            />
            {errors.lastName && <p className={`mt-1 text-xs sm:text-sm ${styles.errorColor}`}>{errors.lastName}</p>}
          </div>
          
          <div className="md:pr-4" ref={datePickerRef}>
            <label className="block mb-2 text-sm sm:text-base">{t('birthDate')}</label>
            <DatePicker
              onChange={handleDateChange}
              value={formData.birthDate}
              className={getDatePickerClassName()}
              clearIcon={null}
              format="dd.MM.yyyy"
              dayPlaceholder="дд"
              monthPlaceholder="мм"
              yearPlaceholder="гггг"
              maxDate={new Date()}
            />
            {errors.birthDate && <p className={`mt-1 text-xs sm:text-sm ${styles.errorColor}`}>{errors.birthDate}</p>}
          </div>
          
          <div className="md:pr-4" ref={genderDropdownRef}>
            <label className="block mb-2 text-sm sm:text-base">{t('gender')}</label>
            <div className="relative md:max-w-[290px] h-12 sm:h-[57px]">
              <button
                type="button"
                className={`w-full p-3 sm:p-4 border h-full ${styles.inputBorderColor} ${styles.inputBgColor} rounded-xl sm:rounded-2xl text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#00C78B] text-sm sm:text-base`}
                onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
              >
                {displayGender}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`transition-transform ${isGenderDropdownOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {isGenderDropdownOpen && (
                <div className={`absolute z-10 mt-1 w-full ${styles.dropdownBgColor} rounded-xl sm:rounded-2xl shadow-lg`}>
                  <div
                    className={`p-3 ${styles.dropdownHoverColor} cursor-pointer text-sm sm:text-base`}
                    onClick={() => handleGenderSelect('female')}
                  >
                    {t('genders.female')}
                  </div>
                  <div
                    className={`p-3 ${styles.dropdownHoverColor} cursor-pointer text-sm sm:text-base`}
                    onClick={() => handleGenderSelect('male')}
                  >
                    {t('genders.male')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Информация об аккаунте */}
        <h2 className="text-lg sm:text-xl font-medium mb-4 md:mb-6">{t('accountData')}</h2>
        
        <div className="mb-10 md:mb-20 w-full md:w-[90%] lg:w-[80%] xl:w-[70%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <label className="block mb-2 text-sm sm:text-base">{t('phoneNumber')}</label>
              <div className="mb-2 max-w-full md:max-w-[290px] h-12 sm:h-[57px]">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-3 sm:p-4 border h-full ${styles.inputBorderColor} ${styles.inputBgColor} rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00C78B] text-sm sm:text-base`}
                  disabled={!isEditingPhone}
                />
                {errors.phone && <p className={`mt-1 text-xs sm:text-sm ${styles.errorColor}`}>{errors.phone}</p>}
              </div>
              <button
                type="button"
                className={`${styles.linkColor} ${styles.linkHoverColor} transition-colors text-sm sm:text-base`}
                onClick={togglePhoneEdit}
              >
                {isEditingPhone ? t('cancel') : t('changeNumber')}
              </button>
            </div>
            
            <div className="md:col-span-1 flex items-start mt-2 md:mt-8">
              <div className="flex-shrink-0 mr-2 mt-1">
                <AlertCircleIcon size={18} color={theme === 'light' ? '#094A54' : '#FFFFFF'} />
              </div>
              <p className={`text-xs sm:text-sm ${styles.textColorMuted}`}>
                {t('phoneChangeInfo')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={isSaving}
          className={`w-full ${styles.buttonBgColor} ${styles.buttonHoverBgColor} text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-colors text-sm sm:text-base font-medium flex items-center justify-center`}
        >
          {isSaving ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {t('saveChanges')}
        </button>
      </form>
      
      {/* Глобальные стили для календаря */}
      <style jsx global>{`
        .react-date-picker {
          width: 290px;
        }
        @media (max-width: 1300px) {
          .react-date-picker {
            width: 100%;
            max-width: 100%;
          }
        }
        .react-date-picker__wrapper {
          padding: 1rem 1.25rem;
          background-color: ${theme === 'dark' ? 'var(--dark-block)' : 'white'};
          border: 1px solid ${theme === 'dark' ? '#0c5c68' : '#E5E7EB'};
          border-radius: 1rem;
          color: ${theme === 'dark' ? 'white' : 'var(--light-text)'};
        }
        @media (max-width: 768px) {
          .react-date-picker__wrapper {
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
          }
        }
        .react-date-picker__inputGroup__input {
          color: ${theme === 'dark' ? 'white' : 'var(--light-text)'};
          background: transparent;
        }
        @media (max-width: 768px) {
          .react-date-picker__inputGroup__input {
            font-size: 14px;
          }
        }
        .react-date-picker__inputGroup__input::placeholder {
          color: ${theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(9,74,84,0.6)'};
        }
        .react-date-picker__button {
          color: ${theme === 'dark' ? 'white' : 'var(--light-text)'};
        }
        .react-date-picker__button:enabled:hover .react-date-picker__button__icon,
        .react-date-picker__button:enabled:focus .react-date-picker__button__icon {
          stroke: ${theme === 'dark' ? 'white' : 'var(--light-text)'};
        }
        .react-date-picker__button svg {
          stroke: ${theme === 'dark' ? 'white' : 'var(--light-text)'};
        }
        
        /* Календарь */
        .react-calendar {
          background-color: ${theme === 'dark' ? 'var(--dark-block)' : 'white'};
          border: 1px solid ${theme === 'dark' ? '#0c5c68' : '#E5E7EB'};
          border-radius: 1rem;
          color: ${theme === 'dark' ? 'white' : 'var(--light-text)'};
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        @media (max-width: 768px) {
          .react-calendar {
            width: 280px !important;
            font-size: 0.875rem;
          }
          .react-calendar__tile {
            padding: 0.5rem;
            height: 2.5rem;
          }
          .react-calendar__navigation button {
            font-size: 0.875rem;
          }
        }
        .react-calendar__tile {
          color: ${theme === 'dark' ? 'white' : 'var(--light-text)'};
        }
        .react-calendar__navigation button {
          color: ${theme === 'dark' ? 'white' : 'var(--light-text)'};
        }
        .react-calendar__tile--active {
          background: var(--light-accent);
          color: white;
        }
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: var(--light-accent);
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(9,74,84,0.1)'};
        }
        .react-calendar__month-view__days__day--weekend {
          color: ${theme === 'dark' ? '#FF9999' : '#D00000'};
        }
        .react-calendar__month-view__days__day--neighboringMonth {
          color: ${theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(9,74,84,0.3)'};
        }
      `}</style>
    </div>
  );
}