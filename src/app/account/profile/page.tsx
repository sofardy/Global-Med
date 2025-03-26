'use client';
import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon } from '@/src/shared/ui/Icon';
import { Value } from 'react-calendar/dist/cjs/shared/types';

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

// Translations with validation messages
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
    }
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
    }
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
  
    // Refs for click outside handling
    const genderDropdownRef = useRef<HTMLDivElement>(null);
    const datePickerRef = useRef<HTMLDivElement>(null);
  
    // State for form fields
 const [formData, setFormData] = useState<FormData>({
  firstName: 'Людмила',
  lastName: 'Иванова',
  birthDate: new Date('2000-05-19'),
  gender: t('genders.female'), // Используем t() напрямую
  phone: '+998 (90) 123-12-12'
});
  
    // State for form validation
    const [errors, setErrors] = useState<FormErrors>({});
  
    // State for dropdown, phone editing, and calendar
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState<boolean>(false);
    const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  
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
  
    // Validate name fields (letters only)
    const validateName = (name: string): boolean => {
        return /^[A-Za-zА-Яа-яЁёҚқҒғҲҳЎўӮӯЧчШшЪъ\s-]+$/.test(name);
    };
  
    // Validate phone number
    const validatePhone = (phone: string): boolean => {
        return /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(phone);
    };
  
    // Format phone number
    const formatPhone = (input: string): string => {
        // Remove non-digit characters
        const digits = input.replace(/\D/g, '');
    
        // Ensure Uzbekistan country code
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
  
    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
    
        if (name === 'phone') {
            const formattedPhone = formatPhone(value);
            setFormData({ ...formData, [name]: formattedPhone });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    
        // Clear error for this field
        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };
  
    // Handle date change
   const handleDateChange = (value: Value, event?: React.MouseEvent<HTMLButtonElement>): void => {
  // Поскольку Value может быть Date | Date[] | null, проверяем что это Date или null
  // и устанавливаем это значение в состояние
  if (value === null || value instanceof Date) {
    setFormData({ ...formData, birthDate: value });
  } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
    // Если вдруг пришел массив дат, берем первую
    setFormData({ ...formData, birthDate: value[0] });
  }
};

  
    // Handle gender selection
    const handleGenderSelect = (gender: string): void => {
        setFormData({ ...formData, gender });
        setIsGenderDropdownOpen(false);
    };
  
    // Toggle phone editing
    const togglePhoneEdit = (): void => {
        setIsEditingPhone(!isEditingPhone);
    
        // Clear phone error when toggling
        if (errors.phone) {
            setErrors({ ...errors, phone: undefined });
        }
    };
  
    // Validate form
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
    
        // Validate first name
        if (!formData.firstName.trim()) {
            newErrors.firstName = t('validation.required');
        } else if (!validateName(formData.firstName)) {
            newErrors.firstName = t('validation.invalidName');
        }
    
        // Validate last name
        if (!formData.lastName.trim()) {
            newErrors.lastName = t('validation.required');
        } else if (!validateName(formData.lastName)) {
            newErrors.lastName = t('validation.invalidName');
        }
    
        // Validate birth date
        if (!formData.birthDate) {
            newErrors.birthDate = t('validation.required');
        }
    
        // Validate phone if being edited
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
  
    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    
        if (validateForm()) {
            console.log('Form submitted:', formData);
            setIsEditingPhone(false);
            alert(currentLocale === 'ru' ? 'Изменения сохранены' : 'O\'zgarishlar saqlandi');
        }
    };


    // Get theme-specific styles
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
            errorColor: 'text-red-500'
        };
    };

    const styles = getThemeStyles();
 const genderOptions = [
  t('genders.female'),
  t('genders.male')
];

    // Custom styles for DatePicker
    const datePickerCustomStyles = `
    .react-date-picker__wrapper {
      border: none !important;
      padding: 0 !important;
    }
    .react-date-picker__inputGroup {
      padding-left: 0.5rem;
    }
    .react-date-picker__clear-button {
      display: none;
    }
    .react-calendar {
      border-radius: 0.5rem;
      border: 1px solid ${theme === 'light' ? '#e5e7eb' : '#0c5c68'};
      background-color: ${theme === 'light' ? 'white' : '#073a42'};
      color: ${theme === 'light' ? '#094A54' : 'white'};
      z-index: 50;
      position: absolute;
      top: 100%;
      left: 0;
    }
    .react-calendar__tile--active {
      background-color: #00C78B;
    }
    .react-calendar__tile--now {
      background-color: ${theme === 'light' ? '#f0f0f0' : '#0c5c68'};
    }
    .react-date-picker {
      width: 100%;
    }
    .react-date-picker__calendar {
      z-index: 999 !important;
    }
  `;

    return (
        <div className={`p-4 sm:p-6 md:p-10 rounded-2xl ${theme === 'light' ? 'bg-[#ffffff]' : 'bg-[#0c5c68]'} ${styles.textColor}`}>
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-medium mb-6 md:mb-8">{t('patientPersonalData')}</h1>
      
                {/* Personal Information */}
                <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[71%] grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-10 mb-10 md:mb-20">
                    <div className="md:pr-4">
                        <label className="block mb-2">{t('firstName')}</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full max-w-full md:max-w-[290px] h-[57px] p-4 border ${styles.inputBorderColor} ${styles.inputBgColor} rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00C78B]`}
                        />
                        {errors.firstName && <p className={`mt-1 text-sm ${styles.errorColor}`}>{errors.firstName}</p>}
                    </div>
        
                    <div className="md:pr-4">
                        <label className="block mb-2">{t('lastName')}</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full max-w-full md:max-w-[290px] h-[57px] p-4 border ${styles.inputBorderColor} ${styles.inputBgColor} rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00C78B]`}
                        />
                        {errors.lastName && <p className={`mt-1 text-sm ${styles.errorColor}`}>{errors.lastName}</p>}
                    </div>
        
                    <div className="md:pr-4">
                        <label className="block mb-2">{t('birthDate')}</label>
                        <div className="datepicker-container">
                            <DatePicker
                                onChange={handleDateChange}
                                value={formData.birthDate}
                                className={theme === 'dark' ? 'react-date-picker dark-theme' : 'react-date-picker'}
                                clearIcon={null}
                                format="dd.MM.yyyy"
                                dayPlaceholder="дд"
                                monthPlaceholder="мм"
                                yearPlaceholder="гггг"
                                maxDate={new Date()}
                            />
                        </div>
                        {errors.birthDate && <p className={`mt-1 text-sm ${styles.errorColor}`}>{errors.birthDate}</p>}
                    </div>
       
                    <div className="md:pr-4" ref={genderDropdownRef}>
                        <label className="block mb-2">{t('gender')}</label>
                        <div className="relative md:max-w-[290px] h-[57px]">
                            <button
                                type="button"
                                className={`w-full p-4 border h-[57px] ${styles.inputBorderColor} ${styles.inputBgColor} rounded-2xl text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#00C78B]`}
                                onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
                            >
                                {formData.gender}
                                <ArrowDownIcon size={20} color={theme === 'light' ? '#094A54' : '#FFFFFF'} />
                            </button>
           
                            {isGenderDropdownOpen && (
                                <div className={`absolute z-10 mt-1 w-full ${styles.dropdownBgColor} rounded-2xl shadow-lg`}>
                                    {genderOptions.map((gender) => (
                                        <div
                                            key={gender}
                                            className={`p-3  ${styles.dropdownHoverColor} cursor-pointer `}
                                            onClick={() => handleGenderSelect(gender)}
                                        >
                                            {gender}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
     
                {/* Account Information */}
                <h2 className="text-xl font-medium mb-4 md:mb-6">{t('accountData')}</h2>
     
                <div className="mb-10 md:mb-20 w-full md:w-[90%] lg:w-[80%] xl:w-[70%]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-1">
                            <label className="block mb-2">{t('phoneNumber')}</label>
                            <div className="mb-2 max-w-full md:max-w-[290px] h-[57px]">
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full p-4 border ${styles.inputBorderColor} ${styles.inputBgColor} rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00C78B]`}
                                    disabled={!isEditingPhone}
                                />
                                {errors.phone && <p className={`mt-1 text-sm ${styles.errorColor}`}>{errors.phone}</p>}
                            </div>
                            <button
                                type="button"
                                className={`${styles.linkColor} ${styles.linkHoverColor} transition-colors`}
                                onClick={togglePhoneEdit}
                            >
                                {isEditingPhone ? t('cancel') : t('changeNumber')}
                            </button>
                        </div>
         
                        <div className="md:col-span-1 flex items-start mt-4 md:mt-8">
                            <div className="flex-shrink-0 mr-2 mt-1">
                                <AlertCircleIcon size={20} color={theme === 'light' ? '#094A54' : '#FFFFFF'} />
                            </div>
                            <p className={`text-[14px] max-w-[320px] ${styles.textColorMuted}`}>
                                {t('phoneChangeInfo')}
                            </p>
                        </div>
                    </div>
                </div>
     
                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full ] ${styles.buttonBgColor} ${styles.buttonHoverBgColor} text-white py-3 md:py-4 rounded-2xl transition-colors`}
                >
                    {t('saveChanges')}
                </button>
      
                {/* Глобальные стили для календаря */}
                <style jsx global>{`
        .react-date-picker {
          width: 290px;
        }
        .react-date-picker__wrapper {
          padding: 1rem 1.25rem;
          background-color: ${theme === 'dark' ? 'var(--dark-block)' : 'white'};
          border: 1px solid ${theme === 'dark' ? '#0c5c68' : '#E5E7EB'};
          border-radius: 1rem;
          color: ${theme === 'dark' ? 'white' : 'var(--light-text)'};
        }
        .react-date-picker__inputGroup__input {
          color: ${theme === 'dark' ? 'white' : 'var(--light-text)'};
          background: transparent;
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
            </form>
        </div>
    );
}