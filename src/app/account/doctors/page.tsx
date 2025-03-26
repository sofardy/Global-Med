'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '@/src/shared/components/Modal/Modal';
import { ArrowDownIcon } from '@/src/shared/ui/Icon';

// Интерфейсы
interface DropdownPosition {
  top: number;
  left: number;
  width: number;
}

interface SpecialtiesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  specialties: string[];
  onSelect: (specialty: string) => void;
  placeholder: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  qualification: string;
  degree: string;
  languages: string[];
  cost: string;
  photoUrl: string;
}

// Переводы
const translations = {
  ru: {
    title: 'Поиск врача',
    nameSearch: 'Введите ФИО',
    specialtySearch: 'Все специализации',
    findButton: 'Найти врача',
    experience: 'Стаж',
    qualification: 'Высшая категория',
    languages: 'Языки',
    cost: 'Стоимость приема',
    phone: 'Телефон для записи',
    detailsButton: 'Подробнее о враче',
    appointmentButton: 'Записаться на прием',
    years: 'год',
    modalTitle: 'Выберите специализацию',
    specialties: [
      'Терапевт', 'Кардиолог', 'Невролог', 'Офтальмолог', 'Эндокринолог',
      'Гастроэнтеролог', 'Гинеколог', 'Отоларинголог (ЛОР)', 'Дерматолог',
      'Ортопед', 'Уролог', 'Педиатр', 'Акушер-гинеколог'
    ]
  },
  uz: {
    title: 'Shifokor qidirish',
    nameSearch: 'Ismi-sharifni kiriting',
    specialtySearch: 'Barcha ixtisosliklar',
    findButton: 'Shifokorni topish',
    experience: 'Tajriba',
    qualification: 'Oliy toifa',
    languages: 'Tillar',
    cost: 'Qabul narxi',
    phone: 'Yozilish uchun telefon',
    detailsButton: 'Shifokor haqida batafsil',
    appointmentButton: 'Qabulga yozilish',
    years: 'yil',
    modalTitle: 'Ixtisoslikni tanlang',
    specialties: [
      'Terapevt', 'Kardiolog', 'Nevrolog', 'Oftalmolog', 'Endokrinolog',
      'Gastroenterolog', 'Ginekolog', 'Otorinolaringolog (LOR)', 'Dermatolog',
      'Ortoped', 'Urolog', 'Pediatr', 'Akusher-ginekolog'
    ]
  }
};

// Моковые данные врачей
const doctorsData: Doctor[] = [
  {
    id: '1',
    name: 'Мирбабаева Саодат Аманбаевна',
    specialty: 'Акушер-гинеколог, врач ультразвуковой диагностики',
    experience: '21',
    qualification: 'Высшая категория',
    degree: 'Кандидат медицинских наук',
    languages: ['узбекский', 'русский'],
    cost: 'от 125 000 сум',
    photoUrl: '/images/doctor-img.png'
  },
  {
    id: '2',
    name: 'Мирбабаева Саодат Аманбаевна',
    specialty: 'Акушер-гинеколог, врач ультразвуковой диагностики',
    experience: '21',
    qualification: 'Высшая категория',
    degree: 'Кандидат медицинских наук',
    languages: ['узбекский', 'русский'],
    cost: 'от 125 000 сум',
    photoUrl: '/images/doctor-img.png'
  },
  {
    id: '3',
    name: 'Мирбабаева Саодат Аманбаевна',
    specialty: 'Акушер-гинеколог, врач ультразвуковой диагностики',
    experience: '21',
    qualification: 'Высшая категория',
    degree: 'Кандидат медицинских наук',
    languages: ['узбекский', 'русский'],
    cost: 'от 125 000 сум',
    photoUrl: '/images/doctor-img.png'
  },
  {
    id: '4',
    name: 'Мирбабаева Саодат Аманбаевна',
    specialty: 'Акушер-гинеколог, врач ультразвуковой диагностики',
    experience: '21',
    qualification: 'Высшая категория',
    degree: 'Кандидат медицинских наук',
    languages: ['узбекский', 'русский'],
    cost: 'от 125 000 сум',
    photoUrl: '/images/doctor-img.png'
  },
];

// Компонент выпадающего списка с порталом
const SpecialtiesDropdown: React.FC<SpecialtiesDropdownProps> = ({ 
  isOpen, 
  onClose, 
  specialties, 
  onSelect, 
  placeholder, 
  buttonRef
}) => {
  const { theme } = useThemeStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<DropdownPosition>({ top: 0, left: 0, width: 0 });
  
  const updatePosition = (): void => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8, 
        left: rect.left,
        width: rect.width
      });
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }
    
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) && 
        buttonRef.current && 
        !buttonRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-dark-block';
  const borderColor = theme === 'light' ? 'border-gray-100' : 'border-gray-700';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-white';
  const textMutedColor = theme === 'light' ? 'text-gray-700' : 'text-gray-300';
  
  return createPortal(
    <div 
      ref={dropdownRef}
      className={`fixed ${bgColor} rounded-xl shadow-xl z-50 animate-dropdown border ${borderColor}`}
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`,
        width: `${position.width}px`,
        maxHeight: '300px',
        overflowY: 'auto'
      }}
    >
      <div className="py-2">
        <button
          onClick={() => onSelect('')}
          className={`w-full text-left px-4 py-2.5 ${textColor} hover:bg-light-accent/10 transition-colors font-medium`}
        >
          {placeholder}
        </button>
        
        <div className={`border-t my-1 ${borderColor}`}></div>
        
        {specialties.map((specialty, index) => (
          <button
            key={index}
            onClick={() => onSelect(specialty)}
            className={`w-full text-left px-4 py-2.5 ${textMutedColor} hover:bg-light-accent/10 hover:text-light-accent transition-colors flex items-center group`}
          >
            <span className="w-5 text-light-accent opacity-0 group-hover:opacity-100 transition-opacity">•</span>
            <span>{specialty}</span>
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
};

// Компонент карточки врача
const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-dark-block';
  const textColor = theme === 'light' ? 'text-light-text' : 'text-white';
  const mutedTextColor = theme === 'light' ? 'text-light-text/70' : 'text-white/70';
  const borderColor = theme === 'light' ? 'border-[#094A5480]' : 'border-[#094A5480]';
  
  return (
    <div className={`${cardBg} rounded-2xl overflow-hidden mb-8`}>
      <div className="flex">
        <div className="w-64 p-10">
          <div className="w-full h-60 relative">
            <Image 
              src={doctor.photoUrl} 
              alt={doctor.name} 
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <span className="text-light-accent text-sm mb-1 block">{doctor.specialty}</span>
          <h3 className={`text-2xl font-medium ${textColor} mb-4`}>{doctor.name}</h3>
          
          <div className="flex text-[#094A5480] items-center gap-x-1 mb-4">
            <span className={`${mutedTextColor}`}>Стаж {doctor.experience} год</span>
            <span className={`${mutedTextColor} mx-2`}>•</span>
            <span className={`${mutedTextColor}`}>{doctor.qualification}</span>
            {doctor.degree && (
              <>
                <span className={`${mutedTextColor} mx-2`}>•</span>
                <span className={`${mutedTextColor}`}>{doctor.degree}</span>
              </>
            )}
          </div>
          
          <div className="mb-4 flex gap-2 item-center">
            <div className={`${mutedTextColor} font-bold mb-1`}>Языки:</div>
            <div className={textColor}>{doctor.languages.join(', ')}</div>
          </div>
          
          <div className='flex gap-2 item-center'>
            <div className={`${mutedTextColor} font-bold mb-1`}>Стоимость приема:</div>
            <div className={textColor}>{doctor.cost}</div>
          </div>
        </div>
      </div>
      
           <div className="px-10">
        <div className={`border-t ${borderColor} border-t-1`}></div>
      </div>

      <div className={`px-10 py-8 flex items-center`}>
        <div className="flex justify-between items-center w-full">
        <div>
            <Link href={`tel:+998712005550`}>
              <div className={`${mutedTextColor} text-[16px] font-bold`}>Телефон для записи</div>
              <div className={`${textColor} text-[16px]`}>+998 (71) 200-55-50</div>
            </Link>
          </div>
          
          <div className="flex gap-4">
            <Link
              href={`/clinic/doctors/${doctor.id}`}
              className="px-6 py-3 border rounded-xl text-light-text dark:text-white border-light-text dark:border-white hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
            >
              Подробнее о враче
            </Link>
            <Link
              href="/appointment"
              className="px-6 py-3 bg-light-accent text-white rounded-xl hover:bg-[#5ab696] transition-colors"
            >
              Записаться на прием
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchSection = () => {
  const [nameQuery, setNameQuery] = useState('');
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
  const specialtyButtonRef = useRef(null);
  
  const handleSearch = () => {
    // Функция поиска
    console.log('Поиск:', { nameQuery });
  };
  
  return (
    <div className="rounded-2xl overflow-hidden bg-light-accent text-white h-[190px] relative">
      {/* Фоновый паттерн */}
      <div 
        className="absolute -top-[130px] -left-[250px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block" 
        style={{
          backgroundImage: 'url(/images/doctor-pattern.png)',
          backgroundSize: 'contain',
          transform: 'rotate(-30deg)',
          backgroundPosition: 'right bottom',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      <div className="container mx-auto px-10 py-10 h-full flex flex-col justify-between relative z-10">
        <h1 className="text-3xl font-medium">Поиск врача</h1>
        
        <div className="flex w-full flex-row gap-4 justify-between items-center">
          {/* Поиск по имени */}
          <div className="min-w-[400px]">
            <div className="relative">
              <input
                type="text"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                placeholder="Введите ФИО"
                className="w-full bg-white/20 border border-white/90 rounded-2xl h-[54px] px-6 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Поиск по специальности */}
          <div className="min-w-[400px]">
            <div className="relative">
              <button
                ref={specialtyButtonRef}
                onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
                className="w-full bg-white/20 border border-white/90 rounded-2xl h-[54px] px-6 text-left text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all flex justify-between items-center"
              >
                <span>Все специализации</span>
                <ArrowDownIcon color="white" />
              </button>
            </div>
          </div>
          
          {/* Кнопка поиска */}
          <button
            onClick={handleSearch}
            className="w-[200px] h-[54px] rounded-2xl bg-white text-light-accent px-6 font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          >
            Найти врача
          </button>
        </div>
      </div>

      {/* Адаптивные стили */}
      <style jsx>{`
        @media (max-width: 1280px) {
          .min-w-\\[400px\\] {
            min-width: 300px;
          }
        }
        
        @media (max-width: 1024px) {
          .container {
            padding-left: 16px;
            padding-right: 16px;
          }
          
          .flex-row {
            flex-direction: column;
            gap: 12px;
            margin-top: 16px;
          }
          
          .min-w-\\[400px\\] {
            min-width: 100%;
            width: 100%;
          }
          
          .w-\\[200px\\] {
            width: 100%;
          }
          
          .h-\\[190px\\] {
            height: auto;
            padding-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
};


// Основной компонент страницы врачей
export default function DoctorsPage() {
    const { theme } = useThemeStore();
    const { t } = useTranslation(translations);
  
    const [nameQuery, setNameQuery] = useState<string>('');
    const [isSpecialtyOpen, setIsSpecialtyOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
  
    const specialtyButtonRef = useRef<HTMLButtonElement>(null);
  
    useEffect(() => {
        setIsMounted(true);
        const checkMobile = (): void => {
            setIsMobile(window.innerWidth < 768);
        };
    
        checkMobile();
        window.addEventListener('resize', checkMobile);
    
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);
  
    const handleSearch = (): void => {
        console.log('Searching for:', { nameQuery, selectedSpecialty });
    };
  
    const specialties = t('specialties', { returnObjects: true }) as string[];
    const displaySpecialty = selectedSpecialty || t('specialtySearch');
  
    const handleSelectSpecialty = (specialty: string): void => {
        setSelectedSpecialty(specialty);
        setIsSpecialtyOpen(false);
        setIsModalOpen(false);
    };
  
    const handleSpecialtyButtonClick = (): void => {
        if (isMobile) {
            setIsModalOpen(true);
        } else {
            setIsSpecialtyOpen(!isSpecialtyOpen);
        }
    };
  
    // Получаем стили зависящие от темы
    const searchBgColor = 'bg-light-accent';
    const searchTextColor = 'text-white';
    const searchPlaceholderColor = 'placeholder-white/60';
    const inputBgColor = 'bg-white/20';
    const buttonIconColor = theme === 'light' ? '#094A54' : 'white';
  
    return (
        <main>
            {/* Блок поиска */}
<SearchSection/>
            {/* Список врачей */}
            <div className="py-8">
                {doctorsData.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
    
            {/* Выпадающие списки */}
            {isMounted && !isMobile && (
                <SpecialtiesDropdown
                    isOpen={isSpecialtyOpen}
                    onClose={() => setIsSpecialtyOpen(false)}
                    specialties={specialties}
                    onSelect={handleSelectSpecialty}
                    placeholder={t('specialtySearch')}
                    buttonRef={specialtyButtonRef}
                />
            )}
    
            {isMounted && isMobile && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={t('modalTitle')}
                    position="bottom"
                    size="full"
                    theme="brand"
                    showCloseButton={true}
                    showCloseIcon={true}
                    contentClassName="bg-white dark:bg-dark-block"
                >
                    <div className="py-2">
                        <button
                            onClick={() => handleSelectSpecialty('')}
                            className="w-full text-left px-4 py-3 text-light-text dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-light-accent/10 rounded-lg transition-colors font-medium"
                        >
                            {t('specialtySearch')}
                        </button>
          
                        <div className="border-t my-1 border-gray-100 dark:border-gray-700"></div>
          
                        {specialties.map((specialty, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectSpecialty(specialty)}
                                className="w-full text-left px-4 py-3 text-light-text dark:text-dark-text hover:bg-light-accent/10 hover:text-light-accent dark:hover:text-light-accent rounded-lg transition-colors flex items-center group"
                            >
                                <span className="w-5 text-light-accent opacity-0 group-hover:opacity-100 transition-opacity">•</span>
                                <span>{specialty}</span>
                            </button>
                        ))}
                    </div>
                </Modal>
            )}
    
            {/* Стили анимации */}
            <style jsx global>{`
      @keyframes dropdown {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-dropdown { 
        animation: dropdown 0.2s ease-out forwards;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
      }
    `}</style>
        </main>
    );
}