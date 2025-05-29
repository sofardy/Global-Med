// src/shared/components/WhyChooseUs.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useThemeStore } from "@/src/store/theme";
import { useLanguageStore } from "@/src/store/language";
import { usePartnersStore } from "@/src/store/partners";

interface BenefitCardProps {
  title: string;
  description: string;
  isActive?: boolean;
}

export default function WhyChooseUs(): React.ReactElement {
  const { theme } = useThemeStore();
  const { currentLocale } = useLanguageStore();

  // Используем стор
  const { fetchPartners, loading, error, getWhyChooseUsCards } =
    usePartnersStore();

  // Получаем данные для карточек "Почему выбирают нас"
  const whyChooseUsData = getWhyChooseUsCards();

  // Загрузка данных при монтировании компонента и при изменении языка
  useEffect(() => {
    fetchPartners(currentLocale);
  }, [currentLocale]);

  const BenefitCard: React.FC<BenefitCardProps> = ({
    title,
    description,
    isActive = false,
  }) => {
    const [hover, setHover] = useState<boolean>(isActive);

    const bgColor = hover
      ? "bg-light-accent text-white"
      : theme === "light"
      ? "bg-white"
      : "bg-dark-block";

    const textColor = hover
      ? "text-white"
      : theme === "light"
      ? "text-light-text"
      : "text-dark-text";

    return (
      <div
        className={`p-8 rounded-xl min-h-[350px] h-full ${bgColor} flex flex-col relative transition-colors duration-300`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(isActive)}
      >
        <div className="absolute top-4 right-4 w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-100 dark:bg-gray-700"></div>

        <h3 className={`text-xl md:text-[24px] font-medium mb-8 ${textColor}`}>
          {title}
        </h3>

        <p className={`mt-auto ${textColor} text-[18px] leading-relaxed`}>
          {description}
        </p>
      </div>
    );
  };

  // Данные для карточек по умолчанию
  const defaultBenefitCards = {
    ru: [
      {
        title: "Высокий профессионализм",
        description:
          "Наши специалисты — эксперты с многолетним опытом, регулярно повышающие квалификацию",
      },
      {
        title: "Гибкость сотрудничества",
        description:
          "Мы предлагаем решения, адаптированные под особенности и потребности каждой компании",
      },
      {
        title: "Современное оборудование",
        description:
          "Используем передовые технологии для обеспечения высокого качества наших услуг",
      },
      {
        title: "Надёжность и поддержка",
        description:
          "Предоставляем круглосуточную поддержку и возможность онлайн-консультаций",
      },
    ],
    uz: [
      {
        title: "Yuqori professionalizm",
        description:
          "Bizning mutaxassislarimiz ko'p yillik tajribaga ega bo'lib, muntazam ravishda malakalarini oshiradilar",
      },
      {
        title: "Hamkorlikda moslashuvchanlik",
        description:
          "Har bir kompaniyaning o'ziga xos xususiyatlari va ehtiyojlariga moslashtirilgan yechimlarni taklif qilamiz",
      },
      {
        title: "Zamonaviy jihozlar",
        description:
          "Xizmatlarimizning yuqori sifatini ta'minlash uchun zamonaviy texnologiyalardan foydalanamiz",
      },
      {
        title: "Ishonchlilik va qo'llab-quvvatlash",
        description:
          "Kunduzi-kechasi qo'llab-quvvatlash va onlayn maslahatlar imkoniyatini taqdim etamiz",
      },
    ],
  };

  // Заголовки и подзаголовки для разных языков
  const translations = {
    ru: {
      title: "Почему выбирают Global Med Center",
      subtitle:
        "Позвольте нам позаботиться о здоровье ваших сотрудников, чтобы вы могли сосредоточиться на развитии компании",
    },
    uz: {
      title: "Nima uchun Global Med Centerni tanlash kerak",
      subtitle:
        "Kompaniyangizning rivojlanishiga e'tibor qaratishingiz uchun xodimlaringizning sog'lig'i haqida g'amxo'rlik qilishga ruxsat bering",
    },
  };

  // Используем данные из API, если они есть, иначе используем дефолтные для текущего языка
  const benefitCards =
    whyChooseUsData.length > 0
      ? whyChooseUsData.map((item) => ({
          title: item.title,
          description: item.subtitle,
        }))
      : defaultBenefitCards[currentLocale as keyof typeof defaultBenefitCards];

  return (
    <div className="mt-24">
      <div className="flex flex-col md:flex-row justify-between mb-10">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text leading-tight">
            {translations[currentLocale as keyof typeof translations].title}
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg md:text-xl text-light-text dark:text-dark-text leading-relaxed">
            {translations[currentLocale as keyof typeof translations].subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {benefitCards.map((card, index) => (
          <div key={index} className="md:col-span-1">
            <BenefitCard title={card.title} description={card.description} />
          </div>
        ))}
      </div>
    </div>
  );
}
