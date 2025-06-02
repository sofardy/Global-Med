import {
  BrainIcon,
  ButterflyWingsIcon,
  CalculatorIcon,
  CandleIcon,
  HealthIcon,
  HemoglobinIcon,
  ImmuneIcon,
  LampIcon,
  MedicalBookHeartIcon,
  MedicalBookIcon,
  MedicalIcon,
  NutritionIcon,
  PencilRulerIcon,
  VirusIcon,
  VirusIconK2,
} from "@/src/shared/ui/Icon";
import React from "react";

// Определение интерфейса для элемента анализа
export interface AnalysisItem {
  id: string;
  title: string;
  iconPath: React.ReactNode;
  link: string;
}

// Экспорт массива с данными анализов
export const analysisData: AnalysisItem[] = [
  {
    id: "coagulogram",
    title: "Коагулограмма",
    iconPath: <HemoglobinIcon />,
    link: "/analysis/coagulogram",
  },
  {
    id: "biochemistry",
    title: "Биохимические анализы",
    iconPath: <NutritionIcon />,
    link: "/analysis/biochemistry",
  },
  {
    id: "express",
    title: "Экспресс-тест",
    iconPath: <PencilRulerIcon />,
    link: "/analysis/express",
  },
  {
    id: "urine",
    title: "Биохимия мочи",
    iconPath: <MedicalBookHeartIcon />,
    link: "/analysis/urine",
  },
  {
    id: "rheumatoid",
    title: "Ревматоидные факторы",
    iconPath: <CandleIcon />,
    link: "/analysis/rheumatoid",
  },
  {
    id: "torch-igm",
    title: "TORCH-инфекции IgM",
    iconPath: <HealthIcon />,
    link: "/analysis/torch-igm",
  },
  {
    id: "torch-igg",
    title: "TORCH-инфекции IgG",
    iconPath: <HealthIcon />,
    link: "/analysis/torch-igg",
  },
  {
    id: "infections",
    title: "Инфекции",
    iconPath: <VirusIcon />,
    link: "/analysis/infections",
  },
  {
    id: "viral-hepatitis",
    title: "Вирусные гепатиты",
    iconPath: <VirusIconK2 />,
    link: "/analysis/viral-hepatitis",
  },
  {
    id: "parasites",
    title: "Паразиты",
    iconPath: <ImmuneIcon />,
    link: "/analysis/parasites",
  },
  {
    id: "hematology",
    title: "Гематология",
    iconPath: <ImmuneIcon />,
    link: "/analysis/hematology",
  },
  {
    id: "blood-analysis",
    title: "Анализы крови",
    iconPath: <LampIcon />,
    link: "/analysis/blood-analysis",
  },
  {
    id: "hormones",
    title: "Гормоны",
    iconPath: <MedicalIcon />,
    link: "/analysis/hormones",
  },
  {
    id: "blood-enzymes",
    title: "Ферменты крови",
    iconPath: <CalculatorIcon />,
    link: "/analysis/blood-enzymes",
  },
  {
    id: "general-blood",
    title: "Общий анализ крови",
    iconPath: <BrainIcon />,
    link: "/analysis/general-blood",
  },
  {
    id: "tumor-markers",
    title: "Опухолевые маркеры",
    iconPath: <ButterflyWingsIcon />,
    link: "/analysis/tumor-markers",
  },
  {
    id: "blood-group",
    title: "Группа крови + RH",
    iconPath: <LampIcon />,
    link: "/analysis/blood-group",
  },
  {
    id: "microscopic",
    title: "Микроскопические анализы",
    iconPath: <NutritionIcon />,
    link: "/analysis/microscopic",
  },
  {
    id: "bacterial-culture",
    title: "Бак. посев",
    iconPath: <MedicalBookIcon />,
    link: "/analysis/bacterial-culture",
  },
  // {
  //     id: 'allergy',
  //     title: 'Аллергология',
  //     iconPath: <AngelIcon />,
  // link: '/analysis/allergy'
  // },
  // {
  //     id: 'vitamins',
  //     title: 'Витамины',
  //     iconPath: <AngelIcon />,
  // link: '/analysis/vitamins'
  // },
  // {
  //     id: 'genetics',
  //     title: 'Генетика',
  //     iconPath: <AngelIcon />,
  // link: '/analysis/genetics'
  // },
  // {
  //     id: 'immunology',
  //     title: 'Иммунология',
  //     iconPath: <AngelIcon />,
  // link: '/analysis/immunology'
  // },
  // {
  //     id: 'cytology',
  //     title: 'Цитология',
  //     iconPath: <AngelIcon />,
  // link: '/analysis/cytology'
  // },
  // {
  //     id: 'pcr',
  //     title: 'ПЦР-диагностика',
  //     iconPath: <AngelIcon />,
  // link: '/analysis/pcr'
  // }
];

export const analysisDetails = {
  coagulogram: {
    title: "Коагулограмма",
    description:
      "Коагулограмма — это набор анализов, позволяющих оценить свертывающую способность крови и выявить возможные нарушения. Проведение коагулограммы важно для предотвращения тромбообразования, оценки состояния при заболеваниях печени, а также для подготовки к операциям.",
    testsCount: 18,
    buttonText: "Записаться на сдачу анализов",
    subtitle: "Показатели коагулограммы",
    subtitle_desc:
      "Каждый тест направлен на выявление различных отклонений в работе крови и позволяет врачу назначить своевременное лечение или профилактику.",
    symptoms_title:
      "Симптомы, при которых следует сдать анализы коагулограммы:",
    symptoms: [
      "Частые кровотечения или синяки",
      "Затруднения с остановкой кровотечений",
      "Необъяснимые носовые кровотечения",
      "Тромбозы или варикозное расширение вен",
      "Длительные или слишком обильные менструации",
      "Отеки и боли в ногах",
    ],
    prices: [
      { name: "Активное частичное тромбопластиновое время", price: "0 сум" },
      { name: "Фибриноген", price: "40 000 сум" },
      { name: "Коагулограмма", price: "9 999 сум" },
      { name: "ПТИ", price: "40 000 сум" },
      { name: "МНО", price: "40 000 сум" },
      { name: "Тромбиновое время", price: "40 000 сум" },
      { name: "Протромбиновое время", price: "40 000 сум" },
      { name: "Тромбиновое время (соотношение)", price: "9 999 сум" },
      { name: "АЧТВ (соотношение)", price: "9 999 сум" },
      { name: "Время свертываемости по Сухареву", price: "9 999 сум" },
      {
        name: "Агрегация тромбоцитов с АДФ 0,5 мкмоль/л %",
        price: "9 999 сум",
      },
      { name: "АФС-Волчаночный антикоагулянт", price: "9 999 сум" },
      { name: "Агрегация тромбоцитов с АДФ 1 мкмоль/л %", price: "9 999 сум" },
      { name: "Время кровотечения по Дюке", price: "9 999 сум" },
      { name: "Квик тест (РТ,МНО, протромб. индекс)", price: "9 999 сум" },
      { name: "D-димер (D-Dimer)", price: "120 000 сум" },
      { name: "Время свёртываемости крови", price: "20 000 сум" },
      {
        name: "Активное частичное тромбопластиновое время (АЧТВ)",
        price: "40 000 сум",
      },
    ],
    recommendations: [
      {
        id: "biochemistry",
        title: "Биохимические анализы",
        description:
          "Оценка работы внутренних органов, обмена веществ, выявление воспалительных процессов, нарушений липидного обмена",
        icon: "ButterflyIcon",
        link: "/analysis/biochemistry",
      },
      {
        id: "hematology",
        title: "Гематология",
        description:
          "Комплексная оценка клеточного состава крови, выявление анемии, инфекций, воспалительных процессов",
        icon: "BloodCellsIcon",
        link: "/analysis/hematology",
      },
      {
        id: "hormones",
        title: "Гормоны",
        description:
          "Анализ эндокринной системы, оценка работы щитовидной железы, половых гормонов, надпочечников",
        icon: "NeuronIcon",
        link: "/analysis/hormones",
      },
      {
        id: "allergy",
        title: "Аллергология",
        description:
          "Выявление аллергических реакций на различные пищевые, бытовые, пыльцевые аллергены",
        icon: "ChecklistIcon",
        link: "/analysis/allergy",
      },
    ],
  },
  biochemistry: {
    title: "Биохимические анализы",
    description:
      "Биохимические анализы крови позволяют оценить работу внутренних органов, выявить нарушения обмена веществ и диагностировать различные заболевания на ранней стадии. С их помощью можно оценить уровень важных показателей, включая ферменты, белки, липиды и электролиты.",
    testsCount: 15,
    buttonText: "Записаться на сдачу анализов",
    subtitle: "Биохимические показатели",
    subtitle_desc:
      "Биохимические показатели крови позволяют оценить состояние внутренних органов и выявить патологические процессы на ранней стадии.",
    symptoms_title: "Симптомы, при которых следует сдать биохимический анализ:",
    symptoms: [
      "Хроническая усталость и слабость",
      "Нарушения функции печени или почек",
      "Подозрение на нарушения обмена веществ",
      "Риск сердечно-сосудистых заболеваний",
      "Контроль эффективности лечения",
      "Профилактическое обследование",
    ],
    prices: [
      { name: "Общий белок", price: "10 000 сум" },
      { name: "Альбумин", price: "10 000 сум" },
      { name: "Билирубин общий", price: "10 000 сум" },
      { name: "Билирубин прямой", price: "10 000 сум" },
      { name: "АСТ (Аспартатаминотрансфераза)", price: "10 000 сум" },
      { name: "АЛТ (Аланинаминотрансфераза)", price: "10 000 сум" },
      { name: "Гамма-ГТ", price: "12 000 сум" },
      { name: "Щелочная фосфатаза", price: "12 000 сум" },
      { name: "Холестерин общий", price: "10 000 сум" },
      { name: "ЛПВП (Липопротеиды высокой плотности)", price: "10 000 сум" },
      { name: "ЛПНП (Липопротеиды низкой плотности)", price: "10 000 сум" },
      { name: "Триглицериды", price: "10 000 сум" },
      { name: "Глюкоза", price: "8 000 сум" },
      { name: "Мочевина", price: "10 000 сум" },
      { name: "Креатинин", price: "10 000 сум" },
    ],
    recommendations: [
      {
        id: "coagulogram",
        title: "Коагулограмма",
        description:
          "Оценка свертывающей способности крови, выявление риска тромбозов и кровотечений",
        icon: "ButterflyIcon",
        link: "/analysis/coagulogram",
      },
      {
        id: "hormone",
        title: "Гормоны",
        description:
          "Анализ эндокринной системы, оценка работы щитовидной железы, половых гормонов, надпочечников",
        icon: "NeuronIcon",
        link: "/analysis/hormones",
      },
      {
        id: "general-blood",
        title: "Общий анализ крови",
        description:
          "Базовый анализ для оценки состояния крови, выявления инфекций, анемии, воспалений",
        icon: "BloodCellsIcon",
        link: "/analysis/general-blood",
      },
      {
        id: "tumor-markers",
        title: "Онкомаркеры",
        description:
          "Ранняя диагностика и мониторинг лечения онкологических заболеваний",
        icon: "ChecklistIcon",
        link: "/analysis/tumor-markers",
      },
    ],
  },
};

// Переводы для страницы
export const translations = {
  ru: {
    appointmentButton: "Записаться на сдачу анализов",
    tests: "анализов",
    prepareTitle: "Как подготовиться к сдаче анализа",
    prepareDesc:
      "Для получения точных результатов важно правильно подготовиться к сдаче анализа",
    preparationSteps: [
      "Сдавать кровь рекомендуется утром, натощак (после 8-12 часов голодания)",
      "За 1-2 дня до сдачи крови исключите жирную пищу и алкоголь",
      "За 1 час до анализа воздержитесь от курения и физических нагрузок",
      "Избегайте эмоционального стресса за 24 часа до анализа",
      "Сообщите врачу о принимаемых лекарствах, так как некоторые препараты могут влиять на результаты",
    ],
    indicatorsTitle: "Основные показатели",
    indicators: [
      {
        name: "МНО (INR)",
        description:
          "Международное нормализованное отношение, оценивает внешний путь свертывания крови",
        norm: "0.85 - 1.25",
      },
      {
        name: "Протромбиновое время (PT)",
        description: "Оценивает время, необходимое для образования сгустка",
        norm: "11 - 16 сек",
      },
      {
        name: "АЧТВ (APTT)",
        description:
          "Активированное частичное тромбопластиновое время, характеризует внутренний путь свертывания",
        norm: "26 - 36 сек",
      },
      {
        name: "Тромбиновое время (TT)",
        description: "Показывает время превращения фибриногена в фибрин",
        norm: "15 - 22 сек",
      },
      {
        name: "Фибриноген",
        description: "Белок, участвующий в последнем этапе свертывания крови",
        norm: "1.8 - 4.0 г/л",
      },
      {
        name: "D-димер",
        description: "Продукт распада фибрина, маркер тромбозов",
        norm: "< 0.5 мкг/мл",
      },
    ],
    backButton: "Назад к анализам",
    prices: "Цены на анализы",
  },
  uz: {
    appointmentButton: "Tahlil topshirishga yozilish",
    tests: "tahlil",
    prepareTitle: "Tahlil topshirishga qanday tayyorlanish kerak",
    prepareDesc:
      "Aniq natijalar olish uchun tahlil topshirishga to'g'ri tayyorlanish muhim",
    preparationSteps: [
      "Qon topshirish uchun ertalab, och qoringa tavsiya etiladi (8-12 soat ochlik)",
      "Qon topshirishdan 1-2 kun oldin yog'li ovqat va spirtli ichimliklardan saqlanish lozim",
      "Tahlildan 1 soat oldin chekishdan va jismoniy mashqlardan saqlanish kerak",
      "Tahlildan 24 soat oldin hissiy stressdan qoching",
      "Qabul qilinayotgan dorilar haqida shifokorga xabar bering, chunki ayrim dorilar natijaga ta'sir qilishi mumkin",
    ],
    indicatorsTitle: "Asosiy ko'rsatkichlar",
    indicators: [
      {
        name: "XNK (INR)",
        description:
          "Xalqaro normallashtirilgan koeffitsient, qon ivishining tashqi yo'lini baholaydi",
        norm: "0.85 - 1.25",
      },
      {
        name: "Protrombin vaqti (PT)",
        description:
          "Qon laxtasining hosil bo'lishi uchun zarur bo'lgan vaqtni baholaydi",
        norm: "11 - 16 sek",
      },
      {
        name: "FQTV (APTT)",
        description:
          "Faollashtirilgan qisman tromboplastin vaqti, qon ivishining ichki yo'lini baholaydi",
        norm: "26 - 36 sek",
      },
      {
        name: "Trombin vaqti (TT)",
        description: "Fibrinogenning fibringa aylanish vaqtini ko'rsatadi",
        norm: "15 - 22 sek",
      },
      {
        name: "Fibrinogen",
        description: "Qon ivishining oxirgi bosqichida ishtirok etuvchi oqsil",
        norm: "1.8 - 4.0 g/l",
      },
      {
        name: "D-dimer",
        description: "Fibrin parchalanish mahsuloti, tromboz markeri",
        norm: "< 0.5 mkg/ml",
      },
    ],
    backButton: "Tahlillarga qaytish",
    prices: "Tahlillar narxi",
  },
  en: {
    appointmentButton: "Schedule a test",
    tests: "tests",
    prepareTitle: "How to prepare for the test",
    prepareDesc:
      "For accurate results, it is important to properly prepare for the test",
    preparationSteps: [
      "Blood tests are recommended in the morning, on an empty stomach (after 8-12 hours of fasting)",
      "1-2 days before the blood test, avoid fatty foods and alcohol",
      "Refrain from smoking and physical activity 1 hour before the test",
      "Avoid emotional stress 24 hours before the test",
      "Inform your doctor about any medications you are taking, as some drugs may affect the results",
    ],
    indicatorsTitle: "Key indicators",
    indicators: [
      {
        name: "INR",
        description:
          "International Normalized Ratio, evaluates the external pathway of blood coagulation",
        norm: "0.85 - 1.25",
      },
      {
        name: "Prothrombin Time (PT)",
        description: "Evaluates the time required for clot formation",
        norm: "11 - 16 sec",
      },
      {
        name: "APTT",
        description:
          "Activated Partial Thromboplastin Time, characterizes the internal pathway of coagulation",
        norm: "26 - 36 sec",
      },
      {
        name: "Thrombin Time (TT)",
        description: "Shows the time of conversion of fibrinogen to fibrin",
        norm: "15 - 22 sec",
      },
      {
        name: "Fibrinogen",
        description: "Protein involved in the final stage of blood coagulation",
        norm: "1.8 - 4.0 g/l",
      },
      {
        name: "D-dimer",
        description: "Fibrin degradation product, marker of thrombosis",
        norm: "< 0.5 µg/ml",
      },
    ],
    backButton: "Back to tests",
    prices: "Test prices",
  },
};
