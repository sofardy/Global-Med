import {
  ButterflyLogoSmallIcon,
  ConnectionsIcon,
  HealthMonitorIcon,
  LocationPinIcon,
  MagnifyingGlassIcon,
  MuscleIcon,
  PacifierIcon,
  PregnancyIcon,
} from "@/src/shared/ui/Icon";
import NeuronIcon from "../ui/Icon/NeuronIcon";

export const checkupHeroData = {
  imageUrl: "/images/checkup-doctor.png",
  imageAlt: {
    ru: "Медицинский осмотр",
    uz: "Tibbiy ko'rik",
    en: "Medical examination",
  },
  mainCard: {
    title: {
      ru: "Чек-ап",
      uz: "Chek-ap",
      en: "Check-up",
    },
    description: {
      ru: "Это комплексное медицинское обследование, которое помогает выявить скрытые заболевания, оценить общее состояние здоровья и предотвратить возможные риски. Мы разработали программы для разных возрастов и потребностей, чтобы вы могли провести диагностику здоровья максимально быстро и комфортно.",
      uz: "Bu yashirin kasalliklarni aniqlashga, umumiy sog'liq holatini baholashga va mumkin bo'lgan xavflarni oldini olishga yordam beradigan kompleks tibbiy tekshiruv. Biz turli yosh va ehtiyojlar uchun dasturlarni ishlab chiqdik, shunda siz sog'liqni tez va qulay tekshirishingiz mumkin.",
      en: "This is a comprehensive medical examination that helps identify hidden diseases, assess overall health status, and prevent potential risks. We have developed programs for different ages and needs, allowing you to undergo health diagnostics as quickly and comfortably as possible.",
    },
  },
  secondaryCards: [
    {
      title: "16",
      description: {
        ru: "видов чек-апов — для мужчин, женщин и детей, включая базовые и специализированные программы",
        uz: "turli chek-aplar — erkaklar, ayollar va bolalar uchun, shu jumladan asosiy va maxsuslashtirilgan dasturlar",
        en: "types of check-ups — for men, women, and children, including basic and specialized programs",
      },
    },
    {
      title: "1 000+",
      description: {
        ru: "человек ежегодно проходят у нас чек-апы, доверяя экспертам диагностику здоровья",
        uz: "kishi har yili bizda chek-aplardan o'tadi, sog'liq diagnostikasini mutaxassislarga ishonib topshiradi",
        en: "people undergo check-ups with us annually, entrusting health diagnostics to our experts",
      },
    },
  ],
};

export const checkupItemsData = [
  {
    id: "planned-operation",
    title: {
      ru: "Плановая операция",
      uz: "Rejali operatsiya",
      en: "Planned Surgery",
    },
    description: {
      ru: "Комплекс исследований для оценки общего состояния здоровья и снижения рисков перед хирургическим вмешательством",
      uz: "Jarrohlik aralashuvidan oldin umumiy sog'liq holatini baholash va xavflarni kamaytirish uchun kompleks tekshiruvlar",
      en: "Comprehensive studies to assess overall health status and reduce risks before surgical intervention",
    },
    iconPath: <HealthMonitorIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "11 исследований", uz: "11 ta tekshiruv", en: "11 tests" },
      },
      {
        icon: "time",
        value: { ru: "1,5 часа", uz: "1,5 soat", en: "1.5 hours" },
      },
    ],
  },
  {
    id: "womens-health",
    title: {
      ru: "Женское здоровье",
      uz: "Ayollar sog'lig'i",
      en: "Women's Health",
    },
    description: {
      ru: "Комплексное обследование для контроля гормонального фона, репродуктивной системы и общего самочувствия",
      uz: "Gormonal fon, reproduktiv tizim va umumiy o'zini yaxshi his qilishni nazorat qilish uchun kompleks tekshiruv",
      en: "Comprehensive examination for monitoring hormonal balance, reproductive system, and general well-being",
    },
    iconPath: <MagnifyingGlassIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "6 исследований", uz: "6 ta tekshiruv", en: "6 tests" },
      },
      { icon: "time", value: { ru: "1 час", uz: "1 soat", en: "1 hour" } },
    ],
  },
  {
    id: "premium-womens-health",
    title: {
      ru: "Премиум. Женское здоровье",
      uz: "Premium. Ayollar sog'lig'i",
      en: "Premium. Women's Health",
    },
    description: {
      ru: "Расширенная диагностика с углубленным анализом гормонов, репродуктивной системы и общего состояния организма",
      uz: "Gormonlar, reproduktiv tizim va organizmning umumiy holatini chuqur tahlil qilish bilan kengaytirilgan diagnostika",
      en: "Extended diagnostics with in-depth analysis of hormones, reproductive system, and overall body condition",
    },
    iconPath: <MagnifyingGlassIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "9 исследований", uz: "9 ta tekshiruv", en: "9 tests" },
      },
      {
        icon: "time",
        value: { ru: "1,5 часа", uz: "1,5 soat", en: "1.5 hours" },
      },
    ],
  },
  {
    id: "mens-health-under-40",
    title: {
      ru: "Мужское здоровье до 40 лет",
      uz: "40 yoshgacha erkaklar sog'lig'i",
      en: "Men's Health Under 40",
    },
    description: {
      ru: "Комплексное обследование для оценки гормонального баланса, репродуктивной функции и общего состояния организма",
      uz: "Gormonal muvozanat, reproduktiv funktsiya va organizmning umumiy holatini baholash uchun kompleks tekshiruv",
      en: "Comprehensive examination to assess hormonal balance, reproductive function, and overall body condition",
    },
    iconPath: <LocationPinIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "5 исследований", uz: "5 ta tekshiruv", en: "5 tests" },
      },
      { icon: "time", value: { ru: "1 час", uz: "1 soat", en: "1 hour" } },
    ],
  },
  {
    id: "mens-health-over-40",
    title: {
      ru: "Мужское здоровье 40+ лет",
      uz: "40+ yosh erkaklar sog'lig'i",
      en: "Men's Health 40+",
    },
    description: {
      ru: "Комплексное обследование, включающее проверку урологического здоровья, гормонального фона и скрытых инфекций",
      uz: "Urologik sog'liq, gormonal fon va yashirin infektsiyalarni tekshirishni o'z ichiga olgan kompleks tekshiruv",
      en: "Comprehensive examination including urological health check, hormonal balance, and hidden infections",
    },
    iconPath: <LocationPinIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "5 исследований", uz: "5 ta tekshiruv", en: "5 tests" },
      },
      { icon: "time", value: { ru: "1 час", uz: "1 soat", en: "1 hour" } },
    ],
  },
  {
    id: "premium-mens-health-under-40",
    title: {
      ru: "Премиум. Мужское здоровье до 40 лет",
      uz: "Premium. 40 yoshgacha erkaklar sog'lig'i",
      en: "Premium. Men's Health Under 40",
    },
    description: {
      ru: "Расширенное комплексное обследование для оценки гормонального баланса, репродуктивной функции и общего состояния организма",
      uz: "Gormonal muvozanat, reproduktiv funktsiya va organizmning umumiy holatini baholash uchun kengaytirilgan kompleks tekshiruv",
      en: "Extended comprehensive examination to assess hormonal balance, reproductive function, and overall body condition",
    },
    iconPath: <LocationPinIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "7 исследований", uz: "7 ta tekshiruv", en: "7 tests" },
      },
      {
        icon: "time",
        value: { ru: "1,5 часа", uz: "1,5 soat", en: "1.5 hours" },
      },
    ],
  },
  {
    id: "premium-mens-health-over-40",
    title: {
      ru: "Премиум. Мужское здоровье 40+ лет",
      uz: "Premium. 40+ yosh erkaklar sog'lig'i",
      en: "Premium. Men's Health 40+",
    },
    description: {
      ru: "Расширенное комплексное обследование, включающее проверку урологического здоровья, гормонального фона и скрытых инфекций",
      uz: "Urologik sog'liq, gormonal fon va yashirin infektsiyalarni tekshirishni o'z ichiga olgan kengaytirilgan kompleks tekshiruv",
      en: "Extended comprehensive examination including urological health check, hormonal balance, and hidden infections",
    },
    iconPath: <LocationPinIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "11 исследований", uz: "11 ta tekshiruv", en: "11 tests" },
      },
      { icon: "time", value: { ru: "2 часа", uz: "2 soat", en: "2 hours" } },
    ],
  },
  {
    id: "healthy-family",
    title: {
      ru: "Здоровая семья",
      uz: "Sog'lom oila",
      en: "Healthy Family",
    },
    description: {
      ru: "Комплексное обследование для мужчин и женщин, помогающее оценить общее состояние здоровья и выявить риски заболеваний",
      uz: "Erkaklar va ayollar uchun umumiy sog'liq holatini baholash va kasallik xavflarini aniqlashga yordam beradigan kompleks tekshiruv",
      en: "Comprehensive examination for men and women, helping to assess overall health status and identify disease risks",
    },
    iconPath: <ButterflyLogoSmallIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "11 исследований", uz: "11 ta tekshiruv", en: "11 tests" },
      },
      { icon: "time", value: { ru: "2 часа", uz: "2 soat", en: "2 hours" } },
    ],
  },
  {
    id: "premium-healthy-family",
    title: {
      ru: "Премиум. Здоровая семья",
      uz: "Premium. Sog'lom oila",
      en: "Premium. Healthy Family",
    },
    description: {
      ru: "Расширенное комплексное обследование для мужчин и женщин с детальной диагностикой, углубленными анализами и консультациями врачей",
      uz: "Erkaklar va ayollar uchun batafsil diagnostika, chuqur tahlillar va shifokorlar maslahatlari bilan kengaytirilgan kompleks tekshiruv",
      en: "Extended comprehensive examination for men and women with detailed diagnostics, in-depth analyses, and doctor consultations",
    },
    iconPath: <ButterflyLogoSmallIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "20 исследований", uz: "20 ta tekshiruv", en: "20 tests" },
      },
      { icon: "time", value: { ru: "3 часа", uz: "3 soat", en: "3 hours" } },
    ],
  },
  {
    id: "want-to-be-mother",
    title: {
      ru: "Хочу стать мамой",
      uz: "Ona bo'lishni xohlayman",
      en: "Want to be a Mother",
    },
    description: {
      ru: "Комплексное обследование для женщин, планирующих беременность, включающее важные анализы, УЗИ и консультации специалистов для подготовки к здоровому зачатию",
      uz: "Homiladorlikni rejalashtirgan ayollar uchun muhim tahlillar, ultratovush tekshiruvi va sog'lom homiladorlik uchun tayyorlash uchun mutaxassislar maslahatlarini o'z ichiga olgan kompleks tekshiruv",
      en: "Comprehensive examination for women planning pregnancy, including important tests, ultrasound, and specialist consultations for preparing for healthy conception",
    },
    iconPath: <PregnancyIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "12 исследований", uz: "12 ta tekshiruv", en: "12 tests" },
      },
      { icon: "time", value: { ru: "2 часа", uz: "2 soat", en: "2 hours" } },
    ],
  },
  {
    id: "want-to-be-father",
    title: {
      ru: "Хочу стать папой",
      uz: "Ota bo'lishni xohlayman",
      en: "Want to be a Father",
    },
    description: {
      ru: "Комплексное обследование мужского здоровья, включающее анализы и диагностику репродуктивной функции, чтобы убедиться в готовности организма к зачатию ребенка",
      uz: "Organizmning farzand ko'rishga tayyorligini tekshirish uchun tahlillar va reproduktiv funktsiya diagnostikasini o'z ichiga olgan erkaklar sog'lig'i bo'yicha kompleks tekshiruv",
      en: "Comprehensive examination of men's health, including tests and diagnostics of reproductive function to ensure the body's readiness for conception",
    },
    iconPath: <NeuronIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "10 исследований", uz: "10 ta tekshiruv", en: "10 tests" },
      },
      {
        icon: "time",
        value: { ru: "1,5 часа", uz: "1,5 soat", en: "1.5 hours" },
      },
    ],
  },
  {
    id: "golden-age-55-plus-women",
    title: {
      ru: "Золотой возраст 55+ (женщины)",
      uz: "Oltin yosh 55+ (ayollar)",
      en: "Golden Age 55+ (Women)",
    },
    description: {
      ru: "Комплексное обследование для оценки общего состояния здоровья, работы сердца, сосудов, гормонального фона и профилактики возрастных изменений",
      uz: "Umumiy sog'liq holatini, yurak, tomirlar ishlashini, gormonal fonni baholash va yoshga bog'liq o'zgarishlarni oldini olish uchun kompleks tekshiruv",
      en: "Comprehensive examination to assess overall health status, heart and vascular function, hormonal balance, and prevention of age-related changes",
    },
    iconPath: <MagnifyingGlassIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "9 исследований", uz: "9 ta tekshiruv", en: "9 tests" },
      },
      {
        icon: "time",
        value: { ru: "1,5 часа", uz: "1,5 soat", en: "1.5 hours" },
      },
    ],
  },
  {
    id: "golden-age-55-plus-men",
    title: {
      ru: "Золотой возраст 55+ (мужчины)",
      uz: "Oltin yosh 55+ (erkaklar)",
      en: "Golden Age 55+ (Men)",
    },
    description: {
      ru: "Комплексное обследование, включающее проверку сердца, сосудов, гормонального баланса и ключевых показателей здоровья для активной и полноценной жизни",
      uz: "Yurak, tomirlar, gormonal muvozanat va faol va to'liq hayot uchun sog'liqning asosiy ko'rsatkichlarini tekshirishni o'z ichiga olgan kompleks tekshiruv",
      en: "Comprehensive examination including heart, vascular, hormonal balance checks, and key health indicators for an active and fulfilling life",
    },
    iconPath: <LocationPinIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "10 исследований", uz: "10 ta tekshiruv", en: "10 tests" },
      },
      {
        icon: "time",
        value: { ru: "1,5 часа", uz: "1,5 soat", en: "1.5 hours" },
      },
    ],
  },
  {
    id: "healthy-child-kindergarten",
    title: {
      ru: "Здоровый ребенок. Детский сад",
      uz: "Sog'lom bola. Bog'cha",
      en: "Healthy Child. Kindergarten",
    },
    description: {
      ru: "Комплексное обследование, включающее анализы, осмотры специалистов и необходимые исследования для поступления в детский сад",
      uz: "Bog'chaga kirish uchun tahlillar, mutaxassislar ko'rigi va zarur tekshiruvlarni o'z ichiga olgan kompleks tekshiruv",
      en: "Comprehensive examination including tests, specialist examinations, and necessary studies for kindergarten admission",
    },
    iconPath: <PacifierIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "10 исследований", uz: "10 ta tekshiruv", en: "10 tests" },
      },
      {
        icon: "time",
        value: { ru: "1,5 часа", uz: "1,5 soat", en: "1.5 hours" },
      },
    ],
  },
  {
    id: "fitness-control",
    title: {
      ru: "Фитнес-контроль",
      uz: "Fitnes-kontrol",
      en: "Fitness Control",
    },
    description: {
      ru: "Комплексная оценка состояния сердца, сосудов, суставов и определение уровня ключевых витаминов и микроэлементов для поддержания физической формы",
      uz: "Jismoniy holatni saqlash uchun yurak, tomirlar, bo'g'imlar holatini va asosiy vitaminlar va mikroelementlar darajasini aniqlash bo'yicha kompleks baholash",
      en: "Comprehensive assessment of heart, vascular, and joint condition, and determination of key vitamins and microelements levels for maintaining physical fitness",
    },
    iconPath: <MuscleIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "8 исследований", uz: "8 ta tekshiruv", en: "8 tests" },
      },
      {
        icon: "time",
        value: { ru: "1,5 часа", uz: "1,5 soat", en: "1.5 hours" },
      },
    ],
  },
  {
    id: "diabetes",
    title: {
      ru: "Сахарный диабет",
      uz: "Qandli diabet",
      en: "Diabetes",
    },
    description: {
      ru: "Комплексное обследование для раннего выявления, контроля и профилактики сахарного диабета",
      uz: "Qandli diabetni erta aniqlash, nazorat qilish va oldini olish uchun kompleks tekshiruv",
      en: "Comprehensive examination for early detection, control, and prevention of diabetes",
    },
    iconPath: <ConnectionsIcon size={190} />,
    stats: [
      {
        icon: "doc",
        value: { ru: "6 исследований", uz: "6 ta tekshiruv", en: "6 tests" },
      },
      { icon: "time", value: { ru: "1 час", uz: "1 soat", en: "1 hour" } },
    ],
  },
];

export const checkupDetailTranslations = {
  ru: {
    title: "Чек-ап: Плановая операция",
    description:
      "Комплексное обследование перед операцией помогает оценить общее состояние здоровья, выявить возможные риски и подготовить организм к хирургическому вмешательству. Включает ключевые анализы и диагностические исследования, необходимые для безопасного проведения операции и быстрого восстановления.",
    duration: "1,5 часа",
    price: "1 605 000 сум",
    instrumentalExams: "инструментальных обследований",
    labTests: "лабораторных исследований",
    doctorConsultation: "консультация врача",
    bookButton: "Записаться на чек-ап",
    programTitle: "Программа диагностики",
    programDescription:
      "Программа диагностики перед операцией включает 11 ключевых исследований, которые помогают получить полную картину состояния организма. Обследование занимает около 1,5 часов, после чего врач сможет оценить результаты и, при необходимости, назначить дополнительные обследования в зависимости от профиля предстоящего хирургического вмешательства.",
    faqItems: [
      {
        title: "Общий анализ крови",
        content:
          "Базовое исследование, которое оценивает количество красных и белых кровяных клеток, гемоглобин, тромбоциты и другие показатели",
      },
      {
        title: "Общий анализ мочи",
        content:
          "Позволяет оценить функцию почек и выявить возможные воспалительные процессы в мочевыводящих путях",
      },
      {
        title: "Коагулограмма",
        content:
          "Коагулограмма — комплексный анализ свертываемости крови. Включает показатели МНО, АЧТВ, фибриногена и протромбинового времени, позволяя оценить риски тромбозов и кровотечений",
      },
      {
        title: "Рентген легких",
        content:
          "Исследование, которое позволяет оценить состояние легочной ткани и выявить патологические изменения",
      },
      {
        title: "ЭКГ",
        content:
          "Электрокардиография — метод исследования электрической активности сердца для выявления нарушений ритма и других патологий",
      },
      {
        title: "Скрининг на гепатиты, ВИЧ и сифилис",
        content:
          "Обязательное исследование перед любым хирургическим вмешательством для оценки инфекционного статуса",
      },
      {
        title: "Группа крови и резус фактор",
        content:
          "Необходимо для подготовки совместимой крови на случай необходимости переливания",
      },
      {
        title: "Биохимический анализ крови",
        content: "Комплексная оценка функций печени, почек и других органов",
      },
      {
        title: "УЗДГ вен нижних конечностей",
        content:
          "Ультразвуковое доплерографическое исследование вен для оценки риска тромбоэмболических осложнений",
      },
      {
        title: "Осмотр терапевта",
        content:
          "Консультация специалиста для общей оценки состояния здоровья и возможных рисков",
      },
      {
        title: "Дополнительные обследования по профилю специалиста",
        content:
          "Зависят от характера предстоящей операции и могут включать дополнительные диагностические процедуры",
      },
    ],
    ourPartnersTitle: "Наши партнеры",
  },
  uz: {
    title: "Chek-ap: Rejali operatsiya",
    description:
      "Operatsiyadan oldin kompleks tekshiruv umumiy sog'liq holatini baholashga, mumkin bo'lgan xavflarni aniqlashga va organizmni jarrohlik aralashuviga tayyorlashga yordam beradi. O'z ichiga xavfsiz operatsiya o'tkazish va tez tiklanish uchun zarur bo'lgan asosiy tahlillar va diagnostik tekshiruvlarni oladi.",
    duration: "1,5 soat",
    price: "1 605 000 so'm",
    instrumentalExams: "instrumental tekshiruvlar",
    labTests: "laboratoriya tadqiqotlari",
    doctorConsultation: "shifokor maslahati",
    bookButton: "Chek-apga yozilish",
    programTitle: "Diagnostika dasturi",
    programDescription:
      "Operatsiyadan oldingi diagnostika dasturi organizmning to'liq holatini baholashga yordam beradigan 11 ta asosiy tekshiruvni o'z ichiga oladi. Tekshiruv taxminan 1,5 soat davom etadi, shundan so'ng shifokor natijalarni baholay oladi va zarur bo'lsa, rejalashtirilgan jarrohlik aralashuvining profiliga qarab qo'shimcha tekshiruvlarni tayinlashi mumkin.",
    faqItems: [
      {
        title: "Umumiy qon tahlili",
        content:
          "Qizil va oq qon hujayralarining sonini, gemoglobin, trombotsitlar va boshqa ko'rsatkichlarni baholaydigan asosiy tadqiqot",
      },
      {
        title: "Umumiy siydik tahlili",
        content:
          "Buyraklar funktsiyasini baholash va siydik yo'llarida potentsial yallig'lanish jarayonlarini aniqlash imkonini beradi",
      },
      {
        title: "Koagulogramma",
        content:
          "Koagulogramma — qonning ivish qobiliyatining kompleks tahlili. INR, APTT, fibrinogen va protrombin vaqtining ko'rsatkichlarini o'z ichiga oladi, bu esa trombozlar va qon ketishlar xavflarini baholash imkonini beradi",
      },
      {
        title: "O'pka rentgeni",
        content:
          "O'pka to'qimasining holatini baholash va patologik o'zgarishlarni aniqlash imkonini beradigan tadqiqot",
      },
      {
        title: "EKG",
        content:
          "Elektrokardiografiya — yurak ritmining buzilishini va boshqa patologiyalarni aniqlash uchun yurak elektrik faoliyatini o'rganish usuli",
      },
      {
        title: "Gepatitlar, OIV va zaxm uchun skrining",
        content:
          "Infektsion holatni baholash uchun har qanday jarrohlik aralashuvidan oldin majburiy tadqiqot",
      },
      {
        title: "Qon guruhi va rezus omili",
        content:
          "Qon quyish zarurati bo'lgan taqdirda mos keluvchi qonni tayyorlash uchun zarur",
      },
      {
        title: "Biokimyoviy qon tahlili",
        content:
          "Jigar, buyraklar va boshqa organlar funktsiyalarining kompleks baholanishi",
      },
      {
        title: "Pastki oyoq venalarining UZDG",
        content:
          "Tromboembolik asoratlar xavfini baholash uchun venalarning ultratovush doplerografik tekshiruvi",
      },
      {
        title: "Terapevt ko'rigi",
        content:
          "Umumiy sog'liq holatini va potentsial xavflarni baholash uchun mutaxassis konsultatsiyasi",
      },
      {
        title: "Mutaxassis profili bo'yicha qo'shimcha tekshiruvlar",
        content:
          "Kelgusi operatsiyaning xarakteriga bog'liq va qo'shimcha diagnostik protseduralarni o'z ichiga olishi mumkin",
      },
    ],
    ourPartnersTitle: "Bizning hamkorlarimiz",
  },
  en: {
    title: "Check-up: Planned Surgery",
    description:
      "Comprehensive examination before surgery helps assess overall health status, identify potential risks, and prepare the body for surgical intervention. Includes key tests and diagnostic studies necessary for safe surgery and quick recovery.",
    duration: "1.5 hours",
    price: "1,605,000 UZS",
    instrumentalExams: "instrumental examinations",
    labTests: "laboratory tests",
    doctorConsultation: "doctor consultation",
    bookButton: "Schedule a Check-up",
    programTitle: "Diagnostic Program",
    programDescription:
      "The pre-surgery diagnostic program includes 11 key studies that help get a complete picture of the body's condition. The examination takes about 1.5 hours, after which the doctor can evaluate the results and, if necessary, prescribe additional examinations depending on the profile of the upcoming surgical intervention.",
    faqItems: [
      {
        title: "Complete Blood Count",
        content:
          "Basic study that evaluates the number of red and white blood cells, hemoglobin, platelets, and other indicators",
      },
      {
        title: "Urinalysis",
        content:
          "Allows assessment of kidney function and detection of possible inflammatory processes in the urinary tract",
      },
      {
        title: "Coagulogram",
        content:
          "Coagulogram is a comprehensive analysis of blood clotting. Includes INR, APTT, fibrinogen, and prothrombin time indicators, allowing assessment of thrombosis and bleeding risks",
      },
      {
        title: "Chest X-ray",
        content:
          "Study that allows assessment of lung tissue condition and detection of pathological changes",
      },
      {
        title: "ECG",
        content:
          "Electrocardiography is a method of studying the heart's electrical activity to detect rhythm disorders and other pathologies",
      },
      {
        title: "Screening for Hepatitis, HIV, and Syphilis",
        content:
          "Mandatory study before any surgical intervention to assess infectious status",
      },
      {
        title: "Blood Type and Rh Factor",
        content:
          "Necessary for preparing compatible blood in case transfusion is needed",
      },
      {
        title: "Biochemical Blood Analysis",
        content:
          "Comprehensive assessment of liver, kidney, and other organ functions",
      },
      {
        title: "Lower Extremity Vein Ultrasound",
        content:
          "Ultrasound dopplerographic examination of veins to assess the risk of thromboembolic complications",
      },
      {
        title: "Therapist Examination",
        content:
          "Specialist consultation for general health assessment and potential risks",
      },
      {
        title: "Additional Examinations by Specialist Profile",
        content:
          "Depend on the nature of the upcoming surgery and may include additional diagnostic procedures",
      },
    ],
    ourPartnersTitle: "Our Partners",
  },
};
