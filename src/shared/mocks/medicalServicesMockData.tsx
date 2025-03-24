import React from 'react';
import { 
  LightbulbIcon, 
  EyeIcon, 
  ButterflyIcon, 
  MedicalIcon,
  AngelIcon,
  BlobShape,
  ButterflyWingsIcon,
  DocumentPenIcon,
  MedicalMicroscopeIcon,
  ThyroidIcon,
} from '@/src/shared/ui/Icon';
import BonesIcon from '../ui/Icon/BonesIcon';

export const medicalServicesMockData = {
  hero: {
    imageUrl: "/images/medical-services.png",
    imageAlt: "Медицинские услуги в нашей клинике",
    mainCard: {
      title: "Медицинские услуги",
      description: "Мы предоставляем профессиональное обследование и лечение, используя новейшие методы и оборудование, чтобы обеспечить вам высококачественную медицинскую помощь. В нашем центре вас ждут опытные врачи, готовые предоставить индивидуальный подход и гарантировать комфорт на каждом этапе лечения."
    },
    secondaryCards: [
      {
        title: "10",
        description: "направлений, в которых мы оказываем высококачественное медицинское обслуживание"
      },
      {
        title: "10 000+",
        description: "пациентов ежегодно доверяют нам своё здоровье, проходя диагностику и лечение в клинике"
      }
    ]
  },
  
  services: [
    {
      id: "lor",
      title: "Лор 24/7",
      description: "Круглосуточная диагностика и лечение заболеваний уха, горла и носа",
      servicesCount: "12 услуг",
      iconPath: <LightbulbIcon size={80} />
    },
    {
      id: "ophthalmology",
      title: "Офтальмология",
      description: "Проверка зрения, лечение воспалений и консультации по подбору очков и линз",
      servicesCount: "15 услуг",
      iconPath: <EyeIcon size={80} />
    },
    {
      id: "pediatrics",
      title: "Педиатрия",
      description: "Профилактические осмотры, лечение детских заболеваний и консультации по здоровью ребенка",
      servicesCount: "10 услуг",
      iconPath: <ButterflyIcon size={80} />
    },
    {
      id: "gynecology",
      title: "Гинекология",
      description: "Профилактика, диагностика и лечение заболеваний женской репродуктивной системы",
      servicesCount: "18 услуг",
      iconPath: <AngelIcon size={80} />
    },
    {
      id: "neurology",
      title: "Неврология",
      description: "Диагностика и лечение заболеваний нервной системы, включая головные боли и расстройства сна",
      servicesCount: "7 услуг",
      iconPath: <BlobShape size={80} />
    },
    {
      id: "oncology",
      title: "Онкология",
      description: "Диагностика и лечение раковых заболеваний, а также контроль за состоянием здоровья",
      servicesCount: "12 услуг",
      iconPath: <ButterflyWingsIcon size={80} />
    },
    {
      id: "surgery",
      title: "Хирургия",
      description: "Проведение операций при травмах и заболеваниях с быстрым восстановлением",
      servicesCount: "8 услуг",
      iconPath: <DocumentPenIcon size={80} />
    },
    {
      id: "ultrasound",
      title: "УЗИ",
      description: "Диагностика с помощью ультразвуковых волн для выявления заболеваний внутренних органов",
      servicesCount: "21 услуга",
      iconPath: <MedicalMicroscopeIcon size={80} />
    },
    {
      id: "endocrinology",
      title: "Эндокринология",
      description: "Диагностика и лечение заболеваний эндокринной системы, включая щитовидную железу и диабет",
      servicesCount: "11 услуг",
      iconPath: <ThyroidIcon size={80} />
    },
    {
      id: "traumatology",
      title: "Травматология",
      description: "Диагностика и лечение травм, заболеваний костей и суставов, восстановление после травм",
      servicesCount: "9 услуг",
      iconPath: <AngelIcon size={80} />
    }
  ]
};