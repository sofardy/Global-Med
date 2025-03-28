// src/shared/mocks/surgeryData.ts

import React from 'react';
import { AngelIcon, ButterflyIcon, ButterflyLogoIcon, CandleIcon, DocumentPenIcon, EyeIcon, MedicalIcon, NeuralNetworkIcon, StethoscopeIcon } from '../ui/Icon';
import NoseIcon from '../ui/Icon/NoseIcon';

export const surgeryData = {
  ru: {
    title: "Современная хирургия",
    description: "Мы проводим хирургические вмешательства по современным стандартам: передовые методики, опытные хирурги, минимальный период восстановления",
    prevSlide: "Предыдущий слайд",
    nextSlide: "Следующий слайд",
    detailsButton: "Подробнее",
    services: [
      {
        id: "gynecology",
        title: "Гинекология",
        description: "Наши специалисты проводят широкий спектр гинекологических операций с высокой точностью и бережным подходом. Используем малотравматичные методы, чтобы сократить восстановительный период и сохранить ваше здоровье",
        imageSrc: "/images/gynecology.png",
        iconPath: <AngelIcon size={190} />,
        features: [
          "Современное оборудование",
          "Опытные хирурги",
          "Минимальная реабилитация",
        ]
      },
      {
        id: "laparoscopic",
        title: "Лапароскопические операции",
        description: "Проводим малотравматичные хирургические операции с высокой точностью, минимальными рисками и коротким восстановительным периодом, используя современные технологии и щадящие методы",
        imageSrc: "/images/laparoscopic.png",
        iconPath: <DocumentPenIcon size={190} />,
        features: [
          "Современное оборудование",
          "Опытные хирурги",
          "Минимальная реабилитация",
        ]
      },
      {
        id: "surgery",
        title: "Хирургия",
        description: "Проводим широкий спектр хирургических вмешательств с применением передовых методик, минимальными рисками и комфортным восстановлением, обеспечивая безопасность и высокую точность операций",
        imageSrc: "/images/surgery.png",
        iconPath: <NeuralNetworkIcon size={190} />,
        features: [
          "Современное оборудование",
          "Опытные хирурги",
          "Минимальная реабилитация",
        ]
      },
      {
        id: "urology",
        title: "Урология",
        description: "Оказываем полный спектр урологических услуг, включая диагностику, лечение и малоинвазивные операции. Используем современные методики для эффективного решения деликатных проблем и быстрого восстановления",
        imageSrc: "/images/urology.png",
        iconPath: <ButterflyLogoIcon size={190} />,
        features: [
          "Современное оборудование",
          "Опытные хирурги",
          "Минимальная реабилитация",
        ]
      },
      {
        id: "traumatology",
        title: "Травматология и ортопедия",
        description: "Диагностируем и лечим травмы, заболевания суставов и опорно-двигательного аппарата. Проводим консервативное и оперативное лечение, включая малоинвазивные операции для быстрого восстановления подвижности",
        imageSrc: "/images/traumatology.png",
        iconPath: <CandleIcon size={190} />,
        features: [
          "Современное оборудование",
          "Опытные хирурги",
          "Минимальная реабилитация",
        ]
      },
      {
        id: "pediatric",
        title: "Детская урология",
        description: "Оказываем специализированную помощь при заболеваниях мочеполовой системы у детей. Проводим диагностику, лечение и малоинвазивные операции, учитывая возрастные особенности и комфорт маленьких пациентов",
        imageSrc: "/images/pediatric.png",
        iconPath: <ButterflyLogoIcon size={190} />,
        features: [
          "Современное оборудование",
          "Опытные хирурги",
          "Минимальная реабилитация",
        ]
      },
      {
        id: "lor",
        title: "ЛОР",
        description: "Выполняем современные ЛОР-операции с высокой точностью и минимальной травматичностью. Лечим заболевания носа, горла и ушей, помогая восстановить дыхание, слух и общее самочувствие",
        imageSrc: "/images/lor.png",
        iconPath: <NoseIcon size={190} />,
        features: [
          "Современное оборудование",
          "Опытные хирурги",
          "Минимальная реабилитация",
        ]
      },
      {
        id: "traditional",
        title: "Традиционные операции",
        description: "Проводим классические хирургические вмешательства с использованием современных методов обезболивания и ускоренной реабилитации. Обеспечиваем безопасность, точность и внимательный послеоперационный уход",
        imageSrc: "/images/traditional.png",
        iconPath: <StethoscopeIcon size={190} />,
        features: [
          "Современное оборудование",
          "Опытные хирурги",
          "Минимальная реабилитация",
        ]
      },
    ]
  },
  uz: {
    title: "Zamonaviy jarrohlik",
    description: "Biz zamonaviy standartlarga muvofiq jarrohlik aralashuvlarini o'tkazamiz: ilg'or metodikalar, tajribali jarrohlar, minimal tiklanish davri",
    prevSlide: "Oldingi slayd",
    nextSlide: "Keyingi slayd",
    detailsButton: "Batafsil",
    services: [
      {
        id: "gynecology",
        title: "Ginekologiya",
        description: "Mutaxassislarimiz yuqori aniqlik va ehtiyotkorlik bilan ginekologik operatsiyalarning keng doirasini o'tkazadilar. Tiklanish davrini qisqartirish va salomatligingizni saqlash uchun kam travmatik usullardan foydalanamiz",
        imageSrc: "/images/gynecology.png",
        iconPath: <AngelIcon size={190} />,
        features: [
          "Zamonaviy uskunalar",
          "Tajribali jarrohlar",
          "Minimal reabilitatsiya",
        ]
      },
      {
        id: "laparoscopic",
        title: "Laparoskopik operatsiyalar",
        description: "Zamonaviy texnologiyalar va yumshoq usullardan foydalangan holda yuqori aniqlik, minimal xavflar va qisqa tiklanish davri bilan kam travmatik jarrohlik operatsiyalarini o'tkazamiz",
        imageSrc: "/images/laparoscopic.png",
        iconPath: <DocumentPenIcon size={190} />,
        features: [
          "Zamonaviy uskunalar",
          "Tajribali jarrohlar",
          "Minimal reabilitatsiya",
        ]
      },
      {
        id: "surgery",
        title: "Jarrohlik",
        description: "Ilg'or metodikalardan foydalangan holda, minimal xavflar va qulay tiklanish bilan jarrohlik aralashuvlarining keng spektrini o'tkazamiz, operatsiyalarning xavfsizligi va yuqori aniqligini ta'minlaymiz",
        imageSrc: "/images/surgery.png",
        iconPath: <NeuralNetworkIcon size={190} />,
        features: [
          "Zamonaviy uskunalar",
          "Tajribali jarrohlar",
          "Minimal reabilitatsiya",
        ]
      },
      {
        id: "urology",
        title: "Urologiya",
        description: "Tashxis, davolash va kichik invaziv operatsiyalarni o'z ichiga olgan urologik xizmatlarning to'liq spektrini taqdim etamiz. Nozik muammolarni samarali hal qilish va tez tiklanish uchun zamonaviy texnikalardan foydalanamiz",
        imageSrc: "/images/urology.png",
        iconPath: <ButterflyLogoIcon size={190} />,
        features: [
          "Zamonaviy uskunalar",
          "Tajribali jarrohlar",
          "Minimal reabilitatsiya",
        ]
      },
      {
        id: "traumatology",
        title: "Travmatologiya va ortopediya",
        description: "Jarohatlar, bo'g'imlar va tayanch-harakat apparati kasalliklarini tashxislash va davolash. Harakatchanlikni tez tiklash uchun minimal invaziv operatsiyalarni o'z ichiga olgan konservativ va operativ davolashni o'tkazamiz",
        imageSrc: "/images/traumatology.png",
        iconPath: <CandleIcon size={190} />,
        features: [
          "Zamonaviy uskunalar",
          "Tajribali jarrohlar",
          "Minimal reabilitatsiya",
        ]
      },
      {
        id: "pediatric",
        title: "Bolalar urologiyasi",
        description: "Bolalarda siydik-tanosil tizimi kasalliklarida ixtisoslashtirilgan yordam ko'rsatamiz. Yosh xususiyatlari va kichik bemorlarning qulayligini hisobga olgan holda diagnostika, davolash va minimal invaziv operatsiyalarni o'tkazamiz",
        imageSrc: "/images/pediatric.png",
        iconPath: <ButterflyLogoIcon size={190} />,
        features: [
          "Zamonaviy uskunalar",
          "Tajribali jarrohlar",
          "Minimal reabilitatsiya",
        ]
      },
      {
        id: "lor",
        title: "LOR",
        description: "Yuqori aniqlik va minimal shikast bilan zamonaviy LOR operatsiyalarini bajaramiz. Burun, tomoq va quloq kasalliklarini davolaymiz, nafas olish, eshitish va umumiy salomatlikni tiklashga yordam beramiz",
        imageSrc: "/images/lor.png",
        iconPath: <NoseIcon size={190} />,
        features: [
          "Zamonaviy uskunalar",
          "Tajribali jarrohlar",
          "Minimal reabilitatsiya",
        ]
      },
      {
        id: "traditional",
        title: "An'anaviy operatsiyalar",
        description: "Zamonaviy og'riqsizlantirish usullari va tezlashtirilgan reabilitatsiyadan foydalangan holda klassik jarrohlik aralashuvlarini o'tkazamiz. Xavfsizlik, aniqlik va e'tiborli operatsiyadan keyingi parvarishni ta'minlaymiz",
        imageSrc: "/images/traditional.png",
        iconPath: <StethoscopeIcon size={190} />,
        features: [
          "Zamonaviy uskunalar",
          "Tajribali jarrohlar",
          "Minimal reabilitatsiya",
        ]
      }
    ]
  }
}