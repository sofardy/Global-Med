import { ButterflyIcon, HemoglobinIcon } from "../ui/Icon";

export const analysisHeroData = {
  imageUrl: '/images/analysis-hero.png',
  imageAlt: 'Лабораторные анализы в медицинском центре',
  mainCard: {
    title: 'Анализы',
    description: 'Наши лаборатории оснащены современным высокоточным оборудованием, что гарантирует достоверные и быстрые результаты анализов. Мы придерживаемся строгих медицинских стандартов, чтобы вы могли быть уверены в качестве диагностики и своевременности полученных данных.'
  },
  secondaryCards: [
    {
      title: '19',
      description: 'категорий анализов — от общеклинических до инфекционных тестов'
    },
    {
      title: '5 000+',
      description: 'тестов проводим ежегодно, обеспечивая точные результаты для контроля здоровья'
    }
  ]
};


export const analysisData = [
  {
    id: "coagulogram",
    title: "Коагулограмма",
    description: "Комплексный анализ свертывающей системы крови для выявления нарушений",
    servicesCount: "8 показателей",
    iconPath: <HemoglobinIcon size={80} />,
  },
  {
    id: "biochemistry",
    title: "Биохимические анализы",
    description: "Оценка работы внутренних органов и обмена веществ",
    servicesCount: "15 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "express",
    title: "Экспресс-тест",
    description: "Быстрая диагностика для получения результатов в течение часа",
    servicesCount: "5 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "urine",
    title: "Биохимия мочи",
    description: "Комплексный анализ для оценки работы почек и мочевыводящих путей",
    servicesCount: "10 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "rheumatoid",
    title: "Ревматоидные факторы",
    description: "Диагностика ревматических заболеваний и аутоиммунных нарушений",
    servicesCount: "7 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "torch-igm",
    title: "TORCH-инфекции IgM",
    description: "Диагностика острых инфекций, опасных при беременности",
    servicesCount: "5 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "torch-igg",
    title: "TORCH-инфекции IgG",
    description: "Определение иммунитета к инфекциям, опасным при беременности",
    servicesCount: "5 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "infections",
    title: "Инфекции",
    description: "Диагностика бактериальных, вирусных и грибковых инфекций",
    servicesCount: "12 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "viral-hepatitis",
    title: "Вирусные гепатиты",
    description: "Диагностика и мониторинг вирусных гепатитов разных типов",
    servicesCount: "8 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "parasites",
    title: "Паразиты",
    description: "Выявление паразитарных инвазий и оценка иммунного ответа",
    servicesCount: "6 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "hematology",
    title: "Гематология",
    description: "Комплексная оценка состава и свойств крови",
    servicesCount: "14 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "blood-analysis",
    title: "Анализы крови",
    description: "Базовые и расширенные исследования крови для диагностики",
    servicesCount: "20 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "hormones",
    title: "Гормоны",
    description: "Оценка гормонального статуса и эндокринной системы",
    servicesCount: "18 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "blood-enzymes",
    title: "Ферменты крови",
    description: "Анализ ферментов для оценки работы печени, сердца и других органов",
    servicesCount: "9 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "general-blood",
    title: "Общий анализ крови",
    description: "Базовое исследование состава крови с формулой и СОЭ",
    servicesCount: "12 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "tumor-markers",
    title: "Опухолевые маркеры",
    description: "Выявление и мониторинг онкологических заболеваний",
    servicesCount: "10 показателей",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "blood-group",
    title: "Группа крови + RH",
    description: "Определение группы крови и резус-фактора",
    servicesCount: "2 показателя",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "microscopic",
    title: "Микроскопические анализы",
    description: "Исследование биоматериала под микроскопом",
    servicesCount: "8 исследований",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "bacterial-culture",
    title: "Бак. посев",
    description: "Выявление бактерий и определение чувствительности к антибиотикам",
    servicesCount: "5 исследований",
    iconPath: <ButterflyIcon size={80} />,
  },
  {
    id: "allergy",
    title: "Аллергология",
    description: "Диагностика аллергических реакций на различные аллергены",
    servicesCount: "25 показателей",
    iconPath: <ButterflyIcon size={80} />,
  }
];