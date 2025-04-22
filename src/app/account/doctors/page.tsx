'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useThemeStore } from '@/src/store/theme';
import { useTranslation } from '@/src/hooks/useTranslation';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '@/src/shared/components/Modal/Modal';
import { ArrowDownIcon } from '@/src/shared/ui/Icon';
import { ContactInfo } from '@/src/shared/components/ContactInfo';
import { getDoctors, Doctor as ApiDoctor } from '../../api/doctors';

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
  slug: string;
}

// Интерфейс для мапирования специальностей на их UUID
interface SpecialtyMapping {
  [key: string]: string;
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
    loading: 'Загрузка...',
    error: 'Ошибка при загрузке данных',
    noResults: 'Врачи не найдены',
    tryAgain: 'Попробовать снова',
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
    loading: 'Yuklanmoqda...',
    error: 'Ma\'lumotlarni yuklashda xatolik yuz berdi',
    noResults: 'Shifokorlar topilmadi',
    tryAgain: 'Qayta urinib ko\'ring',
    specialties: [
      'Terapevt', 'Kardiolog', 'Nevrolog', 'Oftalmolog', 'Endokrinolog',
      'Gastroenterolog', 'Ginekolog', 'Otorinolaringolog (LOR)', 'Dermatolog',
      'Ortoped', 'Urolog', 'Pediatr', 'Akusher-ginekolog'
    ]
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
  'Педиатр': '959384f4-0fba-3f50-a91b-f69575e60890',
  'Акушер-гинеколог': '3e643044-4290-34fc-9a91-8eae6d2dce7f'
};

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
  console.log(doctor.slug);
  
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-dark-block';
  const textColor = theme === 'light' ? 'text-light-text' : 'text-white';
  const mutedTextColor = theme === 'light' ? 'text-light-text/70' : 'text-white/70';
  const borderColor = theme === 'light' ? 'border-[#094A5480]' : 'border-gray-700';
  
  return (
    <div className={`${cardBg} rounded-2xl overflow-hidden mb-8`}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 p-6 md:p-10 flex justify-center md:block">
          <div className="w-48 md:w-full h-48 md:h-60 relative">
            <Image 
              src={doctor.photoUrl} 
              alt={doctor.name} 
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1 px-6 py-10">
          <span className="text-light-accent text-sm mb-1 block">{doctor.specialty}</span>
          <h3 className={`text-xl md:text-2xl font-medium ${textColor} mb-4`}>{doctor.name}</h3>
          
          <div className="flex flex-wrap text-[#094A5480] items-center gap-x-1 mb-4">
            <span className={`${mutedTextColor}`}>{t('experience')} {doctor.experience} {t('years')}</span>
            <span className={`${mutedTextColor} mx-2`}>•</span>
            <span className={`${mutedTextColor}`}>{doctor.qualification}</span>
            {doctor.degree && (
              <>
                <span className={`${mutedTextColor} mx-2`}>•</span>
                <span className={`${mutedTextColor}`}>{doctor.degree}</span>
              </>
            )}
          </div>
          
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <div className={`${mutedTextColor} font-bold`}>{t('languages')}:</div>
            <div className={textColor}>{doctor.languages.join(', ')}</div>
          </div>
          
          <div className='flex flex-wrap gap-2 items-center'>
            <div className={`${mutedTextColor} font-bold`}>{t('cost')}:</div>
            <div className={textColor}>{doctor.cost}</div>
          </div>
        </div>
      </div>
      
      <div className="px-6 md:px-10">
        <div className={`border-t ${borderColor}`}></div>
      </div>

      <div className={`px-6 md:px-10 py-6 md:py-8`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <Link href={`tel:+998712005550`}>
              <div className={`${mutedTextColor} text-[16px] font-bold`}>{t('phone')}</div>
              <div className={`${textColor} text-[16px]`}>+998 (71) 200-55-50</div>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href={`/clinic/doctors/${doctor.slug}`}
              className="px-6 py-3 text-center border rounded-xl text-light-text dark:text-white border-light-text dark:border-white hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
            >
              {t('detailsButton')}
            </Link>
            <Link
              href="/account/appointment"
              className="px-6 py-3 text-center bg-light-accent text-white rounded-xl hover:bg-[#5ab696] transition-colors"
            >
              {t('appointmentButton')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchSection: React.FC<{
  onSearch: (name: string, specialtyUuid?: string) => void;
}> = ({ onSearch }) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const [nameQuery, setNameQuery] = useState('');
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  const specialtyButtonRef = useRef<HTMLButtonElement>(null);
  const specialties = t('specialties', { returnObjects: true }) as string[];
  
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
  
  const handleSelectSpecialty = (specialty: string): void => {
    setSelectedSpecialty(specialty);
    setIsSpecialtyOpen(false);
    setIsModalOpen(false);
  };
  
  const handleSpecialtyButtonClick = (): void => {
    if (isMobile) {
      setIsModalOpen(true);
    } else {
      setIsSpecialtyOpen(prev => !prev);
    }
  };
  
  const handleSearch = () => {
    const specialtyUuid = selectedSpecialty ? specialtyUUIDMapping[selectedSpecialty] : undefined;
    onSearch(nameQuery, specialtyUuid);
  };
  
  const displaySpecialty = selectedSpecialty || t('specialtySearch');
  
  return (
    <div className="rounded-2xl overflow-hidden bg-light-accent text-white relative">
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

      <div className="container px-6 md:px-10 py-8 md:py-10 relative z-10">
        <h1 className="text-2xl md:text-3xl font-medium mb-6 md:mb-0">{t('title')}</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-10">
          {/* Поиск по имени */}
          <div className="w-full md:w-auto md:flex-1">
            <div className="relative">
              <input
                type="text"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                placeholder={t('nameSearch')}
                className="w-full bg-white/20 border border-white/90 rounded-2xl h-12 md:h-[54px] px-4 md:px-6 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Поиск по специальности */}
          <div className="w-full md:w-auto md:flex-1">
            <div className="relative">
              <button
                ref={specialtyButtonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpecialtyButtonClick();
                }}
                className="w-full bg-white/20 border border-white/90 rounded-2xl h-12 md:h-[54px] px-4 md:px-6 text-left text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all flex justify-between items-center"
              >
                <span>{displaySpecialty}</span>
                <ArrowDownIcon color="white" />
              </button>
            </div>
          </div>
          
          {/* Кнопка поиска */}
          <button
            onClick={handleSearch}
            className="w-full md:w-[200px] h-12 md:h-[54px] rounded-2xl bg-white text-light-accent px-6 font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          >
            {t('findButton')}
          </button>
        </div>
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
    </div>
  );
};

const convertApiDoctorToUiDoctor = (apiDoctor: ApiDoctor): Doctor => {
  const languagesArray = apiDoctor.languages ? apiDoctor.languages.split(',').map((lang: string) => lang.trim()) : ['русский', 'узбекский'];
  
  return {
    id: apiDoctor.uuid,
    name: apiDoctor.full_name,
    specialty: apiDoctor.specialization,
    experience: apiDoctor.experience_years.replace(/\D/g, ''),
    qualification: apiDoctor.category || 'Высшая категория',
    degree: apiDoctor.qualification || '',
    languages: languagesArray,
    cost: `от ${apiDoctor.price_from} сум`,
    photoUrl: apiDoctor.image_url,
    slug: apiDoctor.slug
  };
};

// Основной компонент страницы врачей
export default function DoctorsPage() {
  const { t } = useTranslation(translations);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  // Функция для загрузки докторов из API
  const fetchDoctors = async (name?: string, specialtyUuid?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const filters: any = {};
      if (name) filters.full_name = name;
      if (specialtyUuid) filters.specialization_uuid = specialtyUuid;
      
      const response = await getDoctors(filters, currentPage);
      
      const convertedDoctors = response.data.map(convertApiDoctorToUiDoctor);
      setDoctors(convertedDoctors);
      setTotalPages(response.meta.last_page);
      setCurrentPage(response.meta.current_page);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };
  
  // Загрузка докторов при первом рендере
  useEffect(() => {
    fetchDoctors();
  }, []);
  
  // Обработчик поиска
  const handleSearch = (name: string, specialtyUuid?: string) => {
    setCurrentPage(1);
    fetchDoctors(name, specialtyUuid);
  };
  
  return (
    <main>
      {/* Блок поиска */}
      <SearchSection onSearch={handleSearch} />
      
      {/* Список врачей */}
      <div className="py-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-accent"></div>
            <span className="ml-3 text-light-text dark:text-dark-text">{t('loading')}</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-4">
              <p>{error}</p>
            </div>
            <button 
              onClick={() => fetchDoctors()}
              className="px-4 py-2 bg-light-accent text-white rounded-lg"
            >
              {t('tryAgain')}
            </button>
          </div>
        ) : doctors.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="text-light-text/70 dark:text-dark-text/70 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-light-accent/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl">{t('noResults')}</p>
            </div>
          </div>
        ) : (
          <>
            {doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
            
            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        fetchDoctors();
                      }}
                      className={`px-4 py-2 rounded-lg ${
                        page === currentPage 
                          ? 'bg-light-accent text-white' 
                          : 'border border-light-text/30 dark:border-white/30 hover:bg-light-text/5 dark:hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Контактная информация */}
      <ContactInfo />
      
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