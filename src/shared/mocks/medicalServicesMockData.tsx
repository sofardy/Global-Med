import {
  AngelIcon,
  BlobShape,
  ButterflyIcon,
  ButterflyWingsIcon,
  DocumentPenIcon,
  EyeIcon,
  LightbulbIcon,
  MedicalMicroscopeIcon,
  ThyroidIcon,
} from "@/src/shared/ui/Icon";

export const medicalServicesMockData = {
  hero: {
    imageUrl: "/images/medical-services.png",
    imageAlt: {
      ru: "Медицинские услуги в нашей клинике",
      uz: "Klinikamizda tibbiy xizmatlar",
      en: "Medical services in our clinic",
    },
    mainCard: {
      title: {
        ru: "Медицинские услуги",
        uz: "Tibbiy xizmatlar",
        en: "Medical Services",
      },
      description: {
        ru: "Мы предоставляем профессиональное обследование и лечение, используя новейшие методы и оборудование, чтобы обеспечить вам высококачественную медицинскую помощь. В нашем центре вас ждут опытные врачи, готовые предоставить индивидуальный подход и гарантировать комфорт на каждом этапе лечения.",
        uz: "Biz sizga yuqori sifatli tibbiy yordam ko'rsatish uchun eng yangi usullar va asbob-uskunalardan foydalanib, professional tekshiruv va davolashni taqdim etamiz. Bizning markazimizda sizni individual yondashuv taqdim etishga va davolashning har bir bosqichida qulaylikni kafolatlashga tayyor tajribali shifokorlar kutmoqda.",
        en: "We provide professional examination and treatment using the latest methods and equipment to ensure high-quality medical care. Our center is staffed with experienced doctors ready to provide an individual approach and guarantee comfort at every stage of treatment.",
      },
    },
    secondaryCards: [
      {
        title: "10",
        description: {
          ru: "направлений, в которых мы оказываем высококачественное медицинское обслуживание",
          uz: "yo'nalish, biz yuqori sifatli tibbiy xizmat ko'rsatamiz",
          en: "directions in which we provide high-quality medical services",
        },
      },
      {
        title: "10 000+",
        description: {
          ru: "пациентов ежегодно доверяют нам своё здоровье, проходя диагностику и лечение в клинике",
          uz: "bemor har yili o'z sog'lig'ini bizga ishonib topshirib, klinikada diagnostika va davolanishdan o'tadi",
          en: "patients annually trust us with their health, undergoing diagnostics and treatment at the clinic",
        },
      },
    ],
  },

  services: [
    {
      id: "lor",
      title: {
        ru: "Лор 24/7",
        uz: "LOR 24/7",
        en: "ENT 24/7",
      },
      description: {
        ru: "Круглосуточная диагностика и лечение заболеваний уха, горла и носа",
        uz: "Quloq, tomoq va burun kasalliklarini kuniga 24 soat diagnostika va davolash",
        en: "24-hour diagnosis and treatment of ear, throat and nose diseases",
      },
      servicesCount: {
        ru: "12 услуг",
        uz: "12 ta xizmat",
        en: "12 services",
      },
      iconPath: <LightbulbIcon size={80} />,
    },
    {
      id: "ophthalmology",
      title: {
        ru: "Офтальмология",
        uz: "Oftalmologiya",
        en: "Ophthalmology",
      },
      description: {
        ru: "Проверка зрения, лечение воспалений и консультации по подбору очков и линз",
        uz: "Ko'rishni tekshirish, yallig'lanishlarni davolash va ko'zoynak va linzalarni tanlash bo'yicha maslahatlar",
        en: "Vision testing, treatment of inflammations and consultations on selecting glasses and lenses",
      },
      servicesCount: {
        ru: "15 услуг",
        uz: "15 ta xizmat",
        en: "15 services",
      },
      iconPath: <EyeIcon size={80} />,
    },
    {
      id: "pediatrics",
      title: {
        ru: "Педиатрия",
        uz: "Pediatriya",
        en: "Pediatrics",
      },
      description: {
        ru: "Профилактические осмотры, лечение детских заболеваний и консультации по здоровью ребенка",
        uz: "Profilaktik ko'riklar, bolalar kasalliklarini davolash va bola sog'lig'i bo'yicha maslahatlar",
        en: "Preventive examinations, treatment of childhood diseases and consultations on child health",
      },
      servicesCount: {
        ru: "10 услуг",
        uz: "10 ta xizmat",
        en: "10 services",
      },
      iconPath: <ButterflyIcon size={80} />,
    },
    {
      id: "gynecology",
      title: {
        ru: "Гинекология",
        uz: "Ginekologiya",
        en: "Gynecology",
      },
      description: {
        ru: "Профилактика, диагностика и лечение заболеваний женской репродуктивной системы",
        uz: "Ayollar reproduktiv tizimi kasalliklarini profilaktika, diagnostika va davolash",
        en: "Prevention, diagnosis and treatment of female reproductive system diseases",
      },
      servicesCount: {
        ru: "18 услуг",
        uz: "18 ta xizmat",
        en: "18 services",
      },
      iconPath: <AngelIcon size={80} />,
    },
    {
      id: "neurology",
      title: {
        ru: "Неврология",
        uz: "Nevrologiya",
        en: "Neurology",
      },
      description: {
        ru: "Диагностика и лечение заболеваний нервной системы, включая головные боли и расстройства сна",
        uz: "Asab tizimi kasalliklarini diagnostika va davolash, shu jumladan bosh og'rig'i va uyqu buzilishlari",
        en: "Diagnosis and treatment of nervous system diseases, including headaches and sleep disorders",
      },
      servicesCount: {
        ru: "7 услуг",
        uz: "7 ta xizmat",
        en: "7 services",
      },
      iconPath: <BlobShape size={80} />,
    },
    {
      id: "oncology",
      title: {
        ru: "Онкология",
        uz: "Onkologiya",
        en: "Oncology",
      },
      description: {
        ru: "Диагностика и лечение раковых заболеваний, а также контроль за состоянием здоровья",
        uz: "Saraton kasalliklarini diagnostika va davolash, shuningdek sog'liq holatini nazorat qilish",
        en: "Diagnosis and treatment of cancer diseases, as well as health monitoring",
      },
      servicesCount: {
        ru: "12 услуг",
        uz: "12 ta xizmat",
        en: "12 services",
      },
      iconPath: <ButterflyWingsIcon size={80} />,
    },
    {
      id: "surgery",
      title: {
        ru: "Хирургия",
        uz: "Jarrohlik",
        en: "Surgery",
      },
      description: {
        ru: "Проведение операций при травмах и заболеваниях с быстрым восстановлением",
        uz: "Jarohatlar va kasalliklar uchun tez tiklanish bilan operatsiyalar o'tkazish",
        en: "Performing operations for injuries and diseases with rapid recovery",
      },
      servicesCount: {
        ru: "8 услуг",
        uz: "8 ta xizmat",
        en: "8 services",
      },
      iconPath: <DocumentPenIcon size={80} />,
    },
    {
      id: "ultrasound",
      title: {
        ru: "УЗИ",
        uz: "UZI",
        en: "Ultrasound",
      },
      description: {
        ru: "Диагностика с помощью ультразвуковых волн для выявления заболеваний внутренних органов",
        uz: "Ichki organlar kasalliklarini aniqlash uchun ultratovush to'lqinlari yordamida diagnostika",
        en: "Diagnosis using ultrasonic waves to detect diseases of internal organs",
      },
      servicesCount: {
        ru: "21 услуга",
        uz: "21 ta xizmat",
        en: "21 services",
      },
      iconPath: <MedicalMicroscopeIcon size={80} />,
    },
    {
      id: "endocrinology",
      title: {
        ru: "Эндокринология",
        uz: "Endokrinologiya",
        en: "Endocrinology",
      },
      description: {
        ru: "Диагностика и лечение заболеваний эндокринной системы, включая щитовидную железу и диабет",
        uz: "Endokrin tizim kasalliklarini diagnostika va davolash, shu jumladan qalqonsimon bez va diabet",
        en: "Diagnosis and treatment of endocrine system diseases, including thyroid and diabetes",
      },
      servicesCount: {
        ru: "11 услуг",
        uz: "11 ta xizmat",
        en: "11 services",
      },
      iconPath: <ThyroidIcon size={80} />,
    },
    {
      id: "traumatology",
      title: {
        ru: "Травматология",
        uz: "Travmatologiya",
        en: "Traumatology",
      },
      description: {
        ru: "Диагностика и лечение травм, заболеваний костей и суставов, восстановление после травм",
        uz: "Jarohatlar, suyak va bo'g'im kasalliklarini diagnostika va davolash, jarohatlardan keyin tiklanish",
        en: "Diagnosis and treatment of injuries, bone and joint diseases, recovery after injuries",
      },
      servicesCount: {
        ru: "9 услуг",
        uz: "9 ta xizmat",
        en: "9 services",
      },
      iconPath: <AngelIcon size={80} />,
    },
  ],
};
