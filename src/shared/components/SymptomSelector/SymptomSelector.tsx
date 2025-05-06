'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { UniversalCard } from '../UniversalCard';
import { useTranslation } from '@/src/hooks/useTranslation';
import Image from 'next/image';
import { CalculatorIcon, ChecklistMedicalIcon, MedicalTrackerIcon, TabletIcon } from '../../ui/Icon';
import Modal from '../Modal/Modal';
import { useThemeStore } from '@/src/store/theme';

// Интерфейс для данных, полученных от API через endpoint /api/checkups
interface CheckupsApiResponse {
  data: Array<{
    uuid: string;
    slug: string;
    title: string;
    description: string;
    mini_description: string;
    card_description: string;
    duration: string;
    price: number;
    icon: string;
    medical_tests: Array<{
      uuid: string;
      name: string;
      mini_description: string;
    }>;
    symptoms: Array<{
      uuid: string;
      slug: string;
      name: string;
    }>;
  }>;
}

interface CardData {
  id: string;
  title: string;
  subtitle: string; 
  description: string | string[];
  iconPath: React.ReactNode;
  showButton?: boolean;
  buttonText?: string;
}

// Соответствие между названиями симптомов и их slug для API
const symptomSlugs: Record<string, string> = {
  'Аллергия': 'allergiia',
  'Боль в суставах': 'bol-v-sustavakh',
  'Простуда': 'prostuda',
  'Боль в горле': 'bol-v-gorle',
  'Женское здоровье': 'zhenskoe-zdorove',
  'Нарушение зрения': 'narushenie-zreniia',
  'Боль в сердце': 'bol-v-serdtse',
  'Головная боль': 'golovnaia-bol',
  'Расстройство пищеварения': 'rasstroistvo-pishchevareniia',
  'Повышенная утомляемость': 'povyshennaia-utomliaemost',
  'Мужское здоровье': 'muzhskoe-zdorove',
  'Отечность': 'otechnost'
};

const translations = {
  ru: {
    title: {
      line1: 'Не знаете, к какому',
      line2: 'врачу обратиться?'
    },
    subtitle: 'Выберите свой симптом — и мы подскажем, к какому специалисту записаться, какие анализы помогут уточнить диагноз, а также какие чек-апы стоит пройти для комплексной проверки здоровья',
    selectSymptoms: 'Выберите до 3-х симптомов',
    noSymptomsSelected: 'Для получения рекомендаций выберите один из симптомов',
    selectPlaceholder: 'Выберите симптом',
    modalTitle: 'Выбор симптомов',
    modalSubtitle: 'Выберите до 3-х симптомов для получения рекомендаций',
    confirmSelection: 'Подтвердить выбор',
    loading: 'Загрузка...',
    error: 'Произошла ошибка при загрузке данных',
    noResults: 'По выбранным симптомам не найдено рекомендаций',
    relatedSymptoms: 'Связанные симптомы:',
    recommendedSpecialist: 'Рекомендуем консультацию специалиста по выбранным симптомам',
    seeMore: 'Подробнее',
    andMore: 'и еще',
    moreTests: 'анализов',
    symptoms: [
      'Аллергия',
      'Боль в суставах',
      'Простуда',
      'Боль в горле',
      'Женское здоровье',
      'Нарушение зрения',
      'Боль в сердце',
      'Головная боль',
      'Расстройство пищеварения',
      'Повышенная утомляемость',
      'Мужское здоровье',
      'Отечность'
    ],
    cardTitles: {
      checkup: 'Какой чек-ап пройти?',
      analysis: 'Какие анализы сдать?',
      services: 'Дополнительные услуги',
      specialist: 'К кому обратиться?'
    }
  },
  uz: {
    title: {
      line1: 'Qaysi shifokorga murojaat',
      line2: 'qilishni bilmaysizmi?'
    },
    subtitle: 'O\'z simptomingizni tanlang — va biz qaysi mutaxassisga yozilishni, qaysi tahlillar tashxisni aniqlashtirish uchun yordam berishini, shuningdek sog\'liqni kompleks tekshirish uchun qanday tekshiruvlardan o\'tish kerakligini aytib beramiz',
    selectSymptoms: '3 tagacha simptomni tanlang',
    noSymptomsSelected: 'Tavsiyalar olish uchun simptomlardan birini tanlang',
    selectPlaceholder: 'Simptomni tanlang',
    modalTitle: 'Simptomlarni tanlash',
    modalSubtitle: 'Tavsiyalar olish uchun 3 tagacha simptomni tanlang',
    confirmSelection: 'Tanlovni tasdiqlash',
    loading: 'Yuklanmoqda...',
    error: 'Ma\'lumotlarni yuklashda xatolik yuz berdi',
    noResults: 'Tanlangan simptomlar bo\'yicha tavsiyalar topilmadi',
    relatedSymptoms: 'Bog\'liq simptomlar:',
    recommendedSpecialist: 'Tanlangan simptomlar bo\'yicha mutaxassis maslahatini tavsiya qilamiz',
    seeMore: 'Batafsil',
    andMore: 'va yana',
    moreTests: 'tahlillar',
    symptoms: [
      'Allergiya',
      'Bo\'g\'imlarda og\'riq',
      'Shamollash',
      'Tomog\'dagi og\'riq',
      'Ayollar salomatligi',
      'Ko\'rish buzilishi',
      'Yurak og\'rig\'i',
      'Bosh og\'rig\'i',
      'Ovqat hazm qilishning buzilishi',
      'Ortiqcha charchoq',
      'Erkaklar salomatligi',
      'Shishish'
    ],
    cardTitles: {
      checkup: 'Qanday tekshiruvdan o\'tish kerak?',
      analysis: 'Qanday tahlillar topshirish kerak?',
      services: 'Qo\'shimcha xizmatlar',
      specialist: 'Kimga murojaat qilish kerak?'
    }
  }
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Функция для получения иконки в зависимости от типа карточки
const getIconForCardType = (type: string, size: number = 80): React.ReactNode => {
  switch (type) {
    case 'checkup':
      return <TabletIcon size={size} />;
    case 'analysis':
      return <CalculatorIcon size={size} />;
    case 'services':
      return <ChecklistMedicalIcon size={size} />;
    case 'specialist':
      return <MedicalTrackerIcon size={size} />;
    default:
      return <TabletIcon size={size} />;
  }
};

export const SymptomSelector: React.FC = () => {
  const { t } = useTranslation(translations);
  const { theme } = useThemeStore();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [tempSelectedSymptoms, setTempSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Состояние для анимации карточек
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationInProgress, setAnimationInProgress] = useState(false);

  // Состояние для данных из API
  const [checkupData, setCheckupData] = useState<CheckupsApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cache, setCache] = useState<Record<string, CheckupsApiResponse>>({});

  // Effect для отслеживания ширины окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Функция для получения slug симптома
  const getSymptomSlug = (symptom: string): string => {
    return symptomSlugs[symptom] || symptom.toLowerCase().replace(/\s+/g, '-').replace(/ё/g, 'e');
  };

  // Функция для получения данных из API с учётом всех выбранных симптомов
  const fetchCheckupData = useCallback(async () => {
    if (selectedSymptoms.length === 0) return;
    
    // Создаем ключ для кэша на основе отсортированных симптомов
    const cacheKey = [...selectedSymptoms].sort().join('|');
    
    // Если данные уже есть в кэше, используем их
    if (cache[cacheKey]) {
      setCheckupData(cache[cacheKey]);
      return;
    }
    
    try {
      setLoading(true);
      
      // Формируем параметры запроса для всех выбранных симптомов
      const symptomsParams = selectedSymptoms
        .map(symptom => `filter[symptoms][]=${getSymptomSlug(symptom)}`)
        .join('&');
      
      const response = await fetch(`https://globalmed.kelyanmedia.com/api/checkups?${symptomsParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setCheckupData(data);
      
      // Добавляем результат в кэш
      setCache(prev => ({
        ...prev,
        [cacheKey]: data
      }));
    } catch (err) {
      console.error('Error fetching checkup data:', err);
      setError(err instanceof Error ? err : new Error(t('error') as string));
    } finally {
      setLoading(false);
    }
  }, [selectedSymptoms, cache, t]);

  // Эффект для загрузки данных из API при выборе симптома с дебаунсом
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (selectedSymptoms.length > 0) {
        fetchCheckupData();
      }
    }, 300); // 300ms задержка для предотвращения частых запросов
    
    return () => clearTimeout(debounceTimer);
  }, [selectedSymptoms, fetchCheckupData]);

  // Список доступных симптомов
  const symptoms = t('symptoms', { returnObjects: true }) as string[];
  
  // Получаем карточки на основе данных из API
  const generateCardsFromApiData = (): CardData[] => {
    // Если данные из API отсутствуют, загружаются или пустые
    if (!checkupData || loading || (checkupData.data && checkupData.data.length === 0)) {
      const cardTypes = ['checkup', 'analysis', 'services', 'specialist'];
      return cardTypes.map(type => ({
        id: type,
        title: t(`cardTitles.${type}`) as string,
        subtitle: selectedSymptoms.join(', '),
        description: loading ? 
          t('loading') as string : 
          (!checkupData || checkupData.data.length === 0) ? 
            t('noResults') as string : 
            '',
        iconPath: getIconForCardType(type)
      }));
    }

    // Собираем все связанные симптомы из полученных чек-апов
    const relatedSymptoms = new Set<string>();
    checkupData.data.forEach(checkup => {
      checkup.symptoms.forEach(symptom => {
        // Добавляем только те симптомы, которые не были выбраны пользователем
        if (!selectedSymptoms.includes(symptom.name)) {
          relatedSymptoms.add(symptom.name);
        }
      });
    });
    
    // Соберем все уникальные тесты из всех чек-апов
    const allTests = new Set<string>();
    checkupData.data.forEach(checkup => {
      checkup.medical_tests.forEach(test => {
        allTests.add(test.name);
      });
    });
    
    // Обрезаем списки и добавляем информацию о дополнительных элементах
    const maxCheckups = 2;
    const maxTests = 5;
    const maxSymptoms = 2;
    
    const checkupTitles = checkupData.data.map(c => c.title);
    const testNames = Array.from(allTests);
    const relatedSymptomsList = Array.from(relatedSymptoms);
    
    // Ограничиваем список чек-апов
    const limitedCheckups = checkupTitles.length > maxCheckups ? 
      [...checkupTitles.slice(0, maxCheckups), `...${t('andMore')} ${checkupTitles.length - maxCheckups}`] : 
      checkupTitles;
    
    // Ограничиваем список анализов
    const limitedTests = testNames.length > maxTests ? 
      [...testNames.slice(0, maxTests), `...${t('andMore')} ${testNames.length - maxTests} ${t('moreTests')}`] : 
      testNames;
    
    // Ограничиваем список связанных симптомов
    const limitedSymptoms = relatedSymptomsList.length > maxSymptoms ? 
      [`${t('relatedSymptoms')} ${relatedSymptomsList.slice(0, maxSymptoms).join(', ')}...`] : 
      relatedSymptomsList.length > 0 ? [`${t('relatedSymptoms')} ${relatedSymptomsList.join(', ')}`] : [];
    
    // Ограничиваем список сервисов (чек-апов с ценой и длительностью)
    const serviceInfo = checkupData.data.slice(0, 2).map(c => 
      `${c.title}: ${c.duration} мин, ${c.price} UZS.`
    );
    
    return [
      {
        id: 'checkup',
        title: t('cardTitles.checkup') as string,
        subtitle: selectedSymptoms.join(', '),
        description: limitedCheckups,
        iconPath: getIconForCardType('checkup'),
        showButton: false,
        buttonText: t('seeMore') as string
      },
      {
        id: 'analysis',
        title: t('cardTitles.analysis') as string,
        subtitle: selectedSymptoms.join(', '),
        description: limitedTests,
        iconPath: getIconForCardType('analysis'),
        showButton: false,
        buttonText: t('seeMore') as string
      },
      {
        id: 'services',
        title: t('cardTitles.services') as string,
        subtitle: selectedSymptoms.join(', '),
        description: [
          ...limitedSymptoms,
          ...serviceInfo
        ],
        iconPath: getIconForCardType('services'),
        showButton: false,
        buttonText: t('seeMore') as string
      },
      {
        id: 'specialist',
        title: t('cardTitles.specialist') as string,
        subtitle: selectedSymptoms.join(', '),
        description: limitedSymptoms.length > 0 ? limitedSymptoms[0] : t('recommendedSpecialist') as string,
        iconPath: getIconForCardType('specialist'),
        showButton: false,
        buttonText: t('seeMore') as string
      }
    ];
  };

  // Получаем карточки для текущего языка и настраиваем цвет иконок согласно теме
  const cards = React.useMemo(() => {
    // Получаем карточки из API или используем текущие карточки
    const cardsData = generateCardsFromApiData();
    
    // Определяем цвет иконок в зависимости от темы
    const iconColor = theme === 'light' ? '#094a54' : '#ffffff';
    
    // Создаем новый массив карточек с обновленными иконками
    return cardsData.map(card => {
      // Клонируем оригинальную иконку и устанавливаем цвет в зависимости от темы
      const iconWithThemeColor = React.isValidElement(card.iconPath)
        ? React.cloneElement(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          card.iconPath as React.ReactElement<any>,
          { color: iconColor }
        )
        : card.iconPath;
      
      return {
        ...card,
        iconPath: iconWithThemeColor
      };
    });
  }, [t, theme, checkupData, loading, selectedSymptoms]); // Пересчитываем при изменении языка, темы или данных API
  
  const firstRowSymptoms = symptoms.slice(0, 7);
  const secondRowSymptoms = symptoms.slice(7);

  // Эффект для установки showResults с задержкой
  useEffect(() => {
    // Если выбран хотя бы один симптом, показываем результаты через 300 мс
    if (selectedSymptoms.length > 0) {
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 300); // Задержка 300 мс для предотвращения мерцания при быстрой смене симптомов
      
      return () => clearTimeout(timer); // Очищаем таймер при смене зависимостей
    } else {
      setShowResults(false);
      // Сбрасываем анимацию при скрытии результатов
      setVisibleCards([]);
      setAnimationComplete(false);
      setAnimationInProgress(false);
    }
  }, [selectedSymptoms]);

  // Эффект для запуска анимации появления карточек
  useEffect(() => {
    const animateCards = async () => {
      if (showResults && !animationComplete && !animationInProgress) {
        // Устанавливаем флаг, что анимация началась
        setAnimationInProgress(true);
        
        // Сбрасываем состояние видимых карточек
        setVisibleCards([]);
        
        // Последовательно показываем каждую карточку с небольшой задержкой
        for (let i = 0; i < cards.length; i++) {
          await sleep(150); // Задержка между появлением карточек
          setVisibleCards(prev => [...prev, i]);
        }
        
        setAnimationComplete(true);
        setAnimationInProgress(false);
      }
    };
    
    animateCards();
  }, [showResults, cards.length, animationComplete, animationInProgress]);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else if (selectedSymptoms.length < 3) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Временный переключатель для модального окна
  const toggleTempSymptom = (symptom: string) => {
    if (tempSelectedSymptoms.includes(symptom)) {
      setTempSelectedSymptoms(tempSelectedSymptoms.filter(s => s !== symptom));
    } else if (tempSelectedSymptoms.length < 3) {
      setTempSelectedSymptoms([...tempSelectedSymptoms, symptom]);
    }
  };
  
  // Проверяем, мобильное ли устройство
  const isMobile = windowWidth < 768;

  // Открытие модального окна
  const openModal = () => {
    setTempSelectedSymptoms([...selectedSymptoms]); // Копируем текущие выбранные симптомы
    setIsModalOpen(true);
  };

  // Закрытие модального окна с подтверждением выбора
  const confirmSelection = () => {
    setSelectedSymptoms([...tempSelectedSymptoms]);
    setIsModalOpen(false);
  };

  // Закрытие модального окна без изменений
  const cancelSelection = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full mb-6 sm:mb-8 md:mb-40">
      {/* Main selector block */}
      <div
        className="relative rounded-2xl overflow-hidden p-6 md:p-10"
        style={{
          backgroundImage: 'url(/images/symptom-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-light-accent"></div>
       
        {/* Декоративное изображение поверх фона */}
        <div
          className="absolute -top-[60px] left-[74px] right-0 bottom-0 z-[1] max-w-[1550px] hidden md:block"
          style={{
            backgroundImage: 'url(/images/doctor-pattern.png)',
            backgroundSize: 'cover',
            transform: 'rotate(-2deg)',
            transformOrigin: 'top right'
          }}
        ></div>
       
        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-10">
            {/* Title section */}
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {t('title.line1')}
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {t('title.line2')}
              </h2>
             
              {/* Selection instructions */}
              <div className="mt-4 md:mt-6 flex items-center">
                <Image src="/icon/icon-info.svg" alt="" width={24} height={24} className='mr-4' />
                <span className="text-white font-medium">{t('selectSymptoms')}</span>
              </div>
            </div>
           
            {/* Subtitle section */}
            <div className="max-w-xl">
              <div className="text-white text-base md:text-lg">
                <p className="mb-2">{t('subtitle')}</p>
              </div>
            </div>
          </div>
         
          {isMobile ? (
            // Мобильная версия с кнопкой, открывающей модальное окно
            <div className="relative w-full">
              <button
                onClick={openModal}
                className="w-full py-4 px-5 rounded-2xl bg-white text-light-accent font-medium text-center"
              >
                {t('selectSymptoms')}
              </button>
             
              {/* Отображение выбранных симптомов как тегов */}
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSymptoms.map((symptom, index) => (
                  <div
                    key={index}
                    className="py-2 px-4 rounded-2xl bg-white text-light-accent font-medium flex items-center animate-fadeIn"
                  >
                    {symptom}
                    <button
                      onClick={() => toggleSymptom(symptom)}
                      className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-light-accent text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Десктопная версия с двумя рядами кнопок
            <>
              {/* Symptom selection pills - first row */}
              <div className="flex flex-wrap gap-3 mb-3">
                {firstRowSymptoms.map((symptom, index) => (
                  <button
                    key={index}
                    onClick={() => toggleSymptom(symptom)}
                    className={`
                     py-4 md:py-5 px-4 md:px-6 rounded-2xl flex items-center text-base md:text-lg transition-all duration-300
                     ${selectedSymptoms.includes(symptom)
                        ? 'bg-white text-light-accent font-medium'
                        : 'border border-white text-white bg-transparent'}
                   `}
                  >
                    {symptom}
                    {selectedSymptoms.includes(symptom) && (
                      <span className="ml-2 md:ml-4 w-5 h-5 flex items-center justify-center rounded-full bg-light-accent text-white text-xs">
                        ✕
                      </span>
                    )}
                  </button>
                ))}
              </div>
             
              {/* Symptom selection pills - second row */}
              <div className="flex flex-wrap gap-3">
                {secondRowSymptoms.map((symptom, index) => (
                  <button
                    key={index + firstRowSymptoms.length}
                    onClick={() => toggleSymptom(symptom)}
                    className={`
                     py-4 md:py-5 px-4 md:px-6 rounded-2xl flex items-center text-base md:text-lg transition-all duration-300
                     ${selectedSymptoms.includes(symptom)
                        ? 'bg-white text-light-accent font-medium'
                        : 'border border-white text-white bg-transparent'}
                   `}
                  >
                    {symptom}
                    {selectedSymptoms.includes(symptom) && (
                      <span className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-light-accent text-white text-xs">
                        ✕
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
     
      {/* Results section (outside the main selector) */}
      {showResults ? (
        <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`w-full h-full transform transition-all duration-700 ${visibleCards.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
                }`}
              style={{
                transitionDelay: `${index * 300}ms`,
              }}
            >
              <UniversalCard
                variant="analysis"
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                icon={card.iconPath}
                showButton={card.showButton}
                buttonText={card.buttonText || t('seeMore') as string}
                link={`/checkups`}
                listStyle="disc"
                className="mx-auto w-full max-w-full md:max-w-[375px]"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 md:mt-10 bg-white dark:bg-dark-block p-6 md:p-10 rounded-2xl text-center flex flex-col items-center justify-center min-h-[200px] md:min-h-[360px]">
          <MedicalTrackerIcon
            size={80}
            color={theme === 'light' ? '#094a54' : '#00C78B'}
            className="mb-6"
          />
          <p className="text-lg md:text-xl text-light-text dark:text-dark-text">
            {t('noSymptomsSelected')}
          </p>
        </div>
      )}

      {/* Модальное окно выбора симптомов */}
      <Modal
        isOpen={isModalOpen}
        onClose={cancelSelection}
        position="bottom"
        size="full"
        title={t('modalTitle')}
        subtitle={t('modalSubtitle')}
        showCloseButton={false}
        noPadding={false}
        draggable={true}
        theme="brand"
        footer={
          <div className="flex flex-col w-full">
            <button
           onClick={confirmSelection}
             className="w-full py-3 text-white bg-light-accent hover:bg-light-accent/90 rounded-xl font-medium"
             disabled={tempSelectedSymptoms.length === 0}
           >
             {t('confirmSelection')}
           </button>
         </div>
       }
     >
       <div className="flex flex-col p-2">
         {/* Список симптомов в модальном окне */}
         <div className="mb-4">
           {symptoms.map((symptom, index) => (
             <button
               key={index}
               onClick={() => toggleTempSymptom(symptom)}
               className={`
                w-full py-3 px-4 mb-2 rounded-xl flex justify-between items-center text-left text-base transition-all
                ${tempSelectedSymptoms.includes(symptom)
                   ? 'bg-light-accent/10 text-light-accent font-medium border border-light-accent'
                   : 'bg-transparent text-light-text border border-white'}
              `}
               disabled={tempSelectedSymptoms.length >= 3 && !tempSelectedSymptoms.includes(symptom)}
             >
               <span>{symptom}</span>
               {tempSelectedSymptoms.includes(symptom) && (
                 <span className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-light-accent text-white text-xs">
                   ✓
                 </span>
               )}
             </button>
           ))}
         </div>
        
         {/* Индикатор выбранных симптомов */}
         <div className="pt-2 pb-4 text-center text-sm text-light-text">
           Выбрано {tempSelectedSymptoms.length} из 3 симптомов
         </div>
       </div>
     </Modal>

     {/* Добавляем CSS анимации */}
     <style jsx global>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.4s ease-out forwards;
      }
      
      .animate-slideIn {
        animation: slideIn 0.5s ease-out forwards;
      }

      .animate-fadeInScale {
        animation: fadeInScale 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }
    `}</style>
   </div>
 );
};