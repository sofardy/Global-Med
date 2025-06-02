// src/shared/components/HeroBanner/translations.ts

export const heroTranslations = {
  ru: {
    slides: [
      {
        title: "Многопрофильная клиника с передовой медициной",
        title_parts: ["Многопрофильная", "клиника с передовой", "медициной"],
        description:
          "Высококачественное медицинское обслуживание, комплексный подход и эффективные программы восстановления здоровья",
        image: "/images/banner-one.png",
      },
      {
        title: "Мы рядом 24/7 – заботимся о вашем здоровье в любое время",
        title_parts: [
          "Мы рядом 24/7 –",
          "заботимся о вашем",
          "здоровье в любое время",
        ],
        description:
          "Круглосуточная медицинская помощь без выходных. Диагностика, лечение и экстренные консультации – всегда доступны, когда это необходимо",
        image: "/images/banner-tho.png",
      },
      {
        title: "Высокоточная современная хирургия",
        title_parts: ["Высокоточная", "современная", "хирургия"],
        description:
          "Операции любой сложности с использованием передовых методик и высокотехнологичного оборудования",
        image: "/images/banner-three.png",
      },
    ],
    appointmentButton: "Записаться на прием",
    location: "г. Ташкент, ул. Янги Сергели, д. 35",

    // Переводы для модального окна
    modal: {
      title: "Записаться на прием",
      subtitle:
        "Оставьте свои контактные данные, чтобы оператор мог с вами связаться",
      namePlaceholder: "Имя",
      phonePlaceholder: "+998 (__) ___ __ __",
      submitButton: "Записаться",
      submitting: "Отправка...",
      consentText:
        "Соглашаюсь с политикой в отношении обработки персональных данных",
      consentLink: "обработку персональных данных",
      consentRest: "для ответа на обращение",
      successTitle: "Мы получили вашу заявку",
      successMessage:
        "Оператор свяжется с вами для уточнения деталей в рабочее время с 9:00 до 18:00",
      closeButton: "Закрыть",
      formError: "Пожалуйста, заполните все поля корректно",
      purposeLabel: "Цель обращения",
      purposePlaceholder: "Выберите цель обращения",
      purposeOptions: {
        consultation: "Консультация врача",
        analysis: "Сдача анализов",
        checkup: "Прохождение чек-апа",
        legalPersons: "Юр. лицам",
      },
      nameError: "Пожалуйста, введите имя",
      phoneError: "Пожалуйста, введите корректный номер телефона",
      purposeError: "Пожалуйста, выберите цель обращения",
      consentError: "Необходимо согласие на обработку персональных данных",
    },
  },
  uz: {
    slides: [
      {
        title: "Ilg'or tibbiyot bilan ko'p tarmoqli klinika",
        title_parts: ["Ilg'or tibbiyot bilan", "ko'p tarmoqli", "klinika"],
        description:
          "Yuqori sifatli tibbiy xizmat, kompleks yondashuv va sog'liqni tiklashning samarali dasturlari",
        image: "/images/banner-one.png",
      },
      {
        title:
          "Biz 24/7 yoningizda – sog'lig'ingiz haqida har doim g'amxo'rlik qilamiz",
        title_parts: [
          "Biz 24/7 yoningizda –",
          "sog'lig'ingiz haqida",
          "har doim g'amxo'rlik qilamiz",
        ],
        description:
          "Dam olish kunlarisiz 24 soatlik tibbiy yordam. Diagnostika, davolash va shoshilinch maslahatlar – bu doimo kerak bo'lganda mavjud",
        image: "/images/banner-tho.png",
      },
      {
        title: "Yuqori aniqlikdagi zamonaviy jarrohlik",
        title_parts: ["Yuqori aniqlikdagi", "zamonaviy", "jarrohlik"],
        description:
          "Ilg'or usullar va yuqori texnologiyali jihozlardan foydalangan holda har qanday murakkablikdagi operatsiyalar",
        image: "/images/banner-three.png",
      },
    ],
    appointmentButton: "Qabulga yozilish",
    location: "Toshkent sh., Yangi Sergeli ko'chasi, 35-uy",

    // Переводы для модального окна
    modal: {
      title: "Qabulga yozilish",
      subtitle:
        "Operator siz bilan bog'lanishi uchun aloqa ma'lumotlaringizni qoldiring",
      namePlaceholder: "Ism",
      phonePlaceholder: "+998 (__) ___ __ __",
      submitButton: "Yozilish",
      submitting: "Yuborilmoqda...",
      consentText:
        "Shaxsiy malumotlarni qayta ishlash siyosatiga rozilik beraman",
      consentLink: "shaxsiy ma'lumotlarni qayta ishlashga",
      consentRest: "murojaatga javob berish uchun rozilik beraman",
      successTitle: "Arizangizni qabul qildik",
      successMessage:
        "Operator tafsilotlarni aniqlashtirish uchun ish vaqtida 9:00 dan 18:00 gacha siz bilan bog'lanadi",
      closeButton: "Yopish",
      formError: "Iltimos, barcha maydonlarni to'g'ri to'ldiring",
      purposeLabel: "Murojaat maqsadi",
      purposePlaceholder: "Murojaat maqsadini tanlang",
      purposeOptions: {
        consultation: "Shifokor maslahati",
        analysis: "Tahlil topshirish",
        checkup: "Tekshiruvdan o'tish",
        legalPersons: "Yuridik shaxslar",
      },
      nameError: "Iltimos, ismingizni kiriting",
      phoneError: "Iltimos, to'g'ri telefon raqamini kiriting",
      purposeError: "Iltimos, murojaat maqsadini tanlang",
      consentError: "Shaxsiy ma'lumotlarni qayta ishlashga rozilik zarur",
    },
  },
  en: {
    slides: [
      {
        title: "Multidisciplinary Clinic with Advanced Medicine",
        title_parts: ["Multidisciplinary", "clinic with advanced", "medicine"],
        description:
          "High-quality medical care, comprehensive approach, and effective health recovery programs",
        image: "/images/banner-one.png",
      },
      {
        title: "We're Here 24/7 – Taking Care of Your Health Anytime",
        title_parts: [
          "We're Here 24/7 –",
          "taking care of your",
          "health anytime",
        ],
        description:
          "24/7 medical assistance without days off. Diagnostics, treatment, and emergency consultations – always available when needed",
        image: "/images/banner-tho.png",
      },
      {
        title: "High-Precision Modern Surgery",
        title_parts: ["High-Precision", "modern", "surgery"],
        description:
          "Operations of any complexity using advanced techniques and high-tech equipment",
        image: "/images/banner-three.png",
      },
    ],
    appointmentButton: "Schedule an Appointment",
    location: "Tashkent, Yangi Sergeli St., 35",

    // Modal translations
    modal: {
      title: "Schedule an Appointment",
      subtitle:
        "Leave your contact information so our operator can get in touch with you",
      namePlaceholder: "Your name",
      phonePlaceholder: "+998 (__) ___ __ __",
      submitButton: "Schedule",
      submitting: "Submitting...",
      consentText: "I agree to the personal data processing policy",
      consentLink: "personal data processing",
      consentRest: "for response",
      successTitle: "We received your request",
      successMessage:
        "Our operator will contact you to clarify details during business hours from 9:00 to 18:00",
      closeButton: "Close",
      formError: "Please fill in all fields correctly",
      purposeLabel: "Purpose of visit",
      purposePlaceholder: "Select purpose of visit",
      purposeOptions: {
        consultation: "Doctor's consultation",
        analysis: "Medical tests",
        checkup: "Health check-up",
        legalPersons: "For legal entities",
      },
      nameError: "Please enter your name",
      phoneError: "Please enter a valid phone number",
      purposeError: "Please select the purpose of visit",
      consentError: "Consent to personal data processing is required",
    },
  },
};
