export interface Review {
  name: string;
  date: string;
  text: string;
  service?: string;
  reviewSource?: "google" | "youtube" | "yandex" | null;
  avatar?: string;
}

export const reviewsData: Review[] = [
  {
    name: "Азиз Азимов",
    date: "Оставил отзыв 2 октября 2024",
    text: "Долго болел, никак не мог вылечить простой грипп, как оказалось все намного хуже. Причина была в организме, обратился в global med там дали высокопрофессиональную консультацию.",
    service: "Прием у врача",
    reviewSource: "google",
    avatar: "/images/user-avatar-1.png",
  },
  {
    name: "Зухра Рохатова",
    date: "Оставила отзыв 14 января 2025",
    text: "Хочу выразить свою искреннюю благодарность доктору ЛОР Эшниёзову Ботиржану Курбанбаевичу за его грамотность, профессионализм, внимательность...",
    service: "Прием у врача",
    reviewSource: "youtube",
    avatar: "/images/user-avatar-2.png",
  },
  {
    name: "Максим Хван",
    date: "Оставил отзыв 8 мая 2023",
    text: "Отличное место. Есть парковка. Почти все виды анализов. Почти все специалисты. Туалет есть (это важно). Электронные анкеты пациентов. Процедурная работает ...",
    service: "Сдача анализов",
    reviewSource: "google",
    avatar: "/images/user-avatar-1.png",
  },
  {
    name: "Неизвестный пользователь",
    date: "Оставила отзыв 5 января 2025",
    text: "Клиника очень хорошая, оказывается многие врачи не давно приехали из России, специалисты более грамотные. ЛОР Врач Садиков Бобуржон Алишерович отличный ...",
    service: "Прием у врача",
    reviewSource: "youtube",
    avatar: "/images/user-avatar-2.png",
  },
  {
    name: "Неизвестный пользователь",
    date: "Оставила отзыв 5 января 2025",
    text: "Клиника очень хорошая, оказывается многие врачи не давно приехали из России, специалисты более грамотные. ЛОР Врач Садиков Бобуржон Алишерович отличный ...",
    service: "Прием у врача",
    reviewSource: "youtube",
    avatar: "/images/user-avatar-2.png",
  },
];

// Добавляем узбекскую версию для поддержки локализации
export const reviewsDataUz: Review[] = [
  {
    name: "Mariya Ivanova",
    date: "4 fevral 2025-yil sharh qoldirgan",
    text: "Ajoyib klinika e'tiborli shifokorlar bilan! Tezda tashxis qo'yildi, batafsil tavsiyalar olindi. Xizmat darajasidan juda mamnunman!",
    service: "Chek-ap «Yurak va qon tomirlari»",
    reviewSource: "google",
    avatar: "/images/user.png",
  },
  {
    name: "Aleksey Petrov",
    date: "2 fevral 2025-yil sharh qoldirgan",
    text: "Bu klinikani birinchi marta ziyorat qildim va juda mamnun qoldim. Zamonaviy jihozlar, xushmuomala xodimlar va malakali shifokorlar. Ayniqsa, individual yondashuv yoqdi!",
    service: "Chek-ap «Kompleks tekshiruv»",
    reviewSource: "youtube",
    avatar: "/images/user.png",
  },
  {
    name: "Yekaterina Smirnova",
    date: "29 yanvar 2025-yil sharh qoldirgan",
    text: "Bu yerda muntazam ravishda tekshiruvdan o'taman. Ko'p yillik kuzatuvlar natijasida ishonch bilan ayta olaman - bu shahardagi eng yaxshi klinika. Shifokorlar doimo kasallik tarixini sinchkovlik bilan o'rganadilar va professional tavsiyalar beradilar.",
    service: "Chek-ap «Ayollar salomatligi»",
    reviewSource: "google",
    avatar: "/images/user.png",
  },
  {
    name: "Dmitriy Kozlov",
    date: "15 yanvar 2025-yil sharh qoldirgan",
    text: "Deyarli bir yil davomida boshqa klinikalarda hal qilib bo'lmagan muammo bilan murojaat qildim. Bu yerda bitta tashrifda tashxis qo'yishdi va samarali davolash tayinlashdi. Natija bir hafta ichida ko'rindi!",
    service: "Gastroenterolog maslahati",
    reviewSource: "youtube",
    avatar: "/images/user.png",
  },
  {
    name: "Olga Nikolayeva",
    date: "10 yanvar 2025-yil sharh qoldirgan",
    text: "Farzandimni tekshiruvga olib keldik. Xodimlar juda mehribon, bolalarga alohida e'tibor va g'amxo'rlik bilan munosabatda bo'ladilar. Batafsil maslahat va aniq harakat rejasini oldik. Tavsiya etaman!",
    service: "Bolalar chek-api",
    reviewSource: "google",
    avatar: "/images/user.png",
  },
  {
    name: "Sergey Ivanov",
    date: "5 yanvar 2025-yil sharh qoldirgan",
    text: "Bu yerda to'liq tana tekshiruvidan o'tdim. Protseduralar zamonaviy uskunalarda o'tkaziladi, barcha narsa aniq tashkillashtirilgan, navbatlar yo'q. Shifokorlar hamma narsani tushunarli tilda tushuntiradilar va amaliy maslahatlar beradilar.",
    service: "Kompleks tekshiruv",
    reviewSource: "youtube",
    avatar: "/images/user.png",
  },
];

export const reviewsDataEn: Review[] = [
  {
    name: "Aziz Azimov",
    date: "Left a review on October 2, 2024",
    text: "I was sick for a long time and couldn't cure a simple flu, but it turned out to be much worse. The cause was in my body, and I went to Global Med where I received highly professional consultation.",
    service: "Doctor's Appointment",
    reviewSource: "google",
    avatar: "/images/user-avatar-1.png",
  },
  {
    name: "Zuhra Rokhatova",
    date: "Left a review on January 14, 2025",
    text: "I want to express my sincere gratitude to ENT doctor Eshniyozov Botirjan Kurbanbaevich for his expertise, professionalism, and attentiveness...",
    service: "Doctor's Appointment",
    reviewSource: "youtube",
    avatar: "/images/user-avatar-2.png",
  },
  {
    name: "Maxim Khvan",
    date: "Left a review on May 8, 2023",
    text: "Excellent place. Has parking. Almost all types of tests. Almost all specialists. Has a restroom (this is important). Electronic patient forms. The procedure room works...",
    service: "Medical Tests",
    reviewSource: "google",
    avatar: "/images/user-avatar-1.png",
  },
  {
    name: "Unknown User",
    date: "Left a review on January 5, 2025",
    text: "The clinic is very good, it turns out many doctors recently came from Russia, the specialists are more qualified. ENT Doctor Sadikov Boburjon Alishervich is excellent...",
    service: "Doctor's Appointment",
    reviewSource: "youtube",
    avatar: "/images/user-avatar-2.png",
  },
  {
    name: "Unknown User",
    date: "Left a review on January 5, 2025",
    text: "The clinic is very good, it turns out many doctors recently came from Russia, the specialists are more qualified. ENT Doctor Sadikov Boburjon Alishervich is excellent...",
    service: "Doctor's Appointment",
    reviewSource: "youtube",
    avatar: "/images/user-avatar-2.png",
  },
];
