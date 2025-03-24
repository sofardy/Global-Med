export interface Review {
    name: string;
    date: string;
    text: string;
    service?: string;
    reviewSource?: 'google' | 'youtube' | 'yandex' | null;
    avatar?: string;
}

export const reviewsData: Review[] = [
    {
        name: 'Азиз Азимов',
        date: 'Оставил отзыв 2 октября 2024',
        text: 'Долго болел, никак не мог вылечить простой грипп, как оказалось все намного хуже. Причина была в организме, обратился в global med там дали высокопрофессиональную консультацию.',
        service: 'Прием у врача',
        reviewSource: 'google',
        avatar: '/images/user-avatar-1.png'
    },
    {
        name: 'Зухра Рохатова',
        date: 'Оставила отзыв 14 января 2025',
        text: 'Хочу выразить свою искреннюю благодарность доктору ЛОР Эшниёзову Ботиржану Курбанбаевичу за его грамотность, профессионализм, внимательность...',
        service: 'Прием у врача',
        reviewSource: 'youtube',
        avatar: '/images/user-avatar-2.png'
    },
    {
        name: 'Максим Хван',
        date: 'Оставил отзыв 8 мая 2023',
        text: 'Отличное место. Есть парковка. Почти все виды анализов. Почти все специалисты. Туалет есть (это важно). Электронные анкеты пациентов. Процедурная работает ...',
        service: 'Сдача анализов',
        reviewSource: 'google',
        avatar: '/images/user-avatar-1.png'
    },
    {
        name: 'Неизвестный пользователь',
        date: 'Оставила отзыв 5 января 2025',
        text: 'Клиника очень хорошая, оказывается многие врачи не давно приехали из России, специалисты более грамотные. ЛОР Врач Садиков Бобуржон Алишерович отличный ...',
        service: 'Прием у врача',
        reviewSource: 'youtube',
        avatar: '/images/user-avatar-2.png'
    }
];

// Добавляем узбекскую версию для поддержки локализации
export const reviewsDataUz: Review[] = [
    {
        name: 'Mariya Ivanova',
        date: '4 fevral 2025-yil sharh qoldirgan',
        text: 'Ajoyib klinika e\'tiborli shifokorlar bilan! Tezda tashxis qo\'yildi, batafsil tavsiyalar olindi. Xizmat darajasidan juda mamnunman!',
        service: 'Chek-ap «Yurak va qon tomirlari»',
        reviewSource: 'google',
        avatar: '/images/user.png'
    },
    {
        name: 'Aleksey Petrov',
        date: '2 fevral 2025-yil sharh qoldirgan',
        text: 'Bu klinikani birinchi marta ziyorat qildim va juda mamnun qoldim. Zamonaviy jihozlar, xushmuomala xodimlar va malakali shifokorlar. Ayniqsa, individual yondashuv yoqdi!',
        service: 'Chek-ap «Kompleks tekshiruv»',
        reviewSource: 'youtube',
        avatar: '/images/user.png'
    },
    {
        name: 'Yekaterina Smirnova',
        date: '29 yanvar 2025-yil sharh qoldirgan',
        text: 'Bu yerda muntazam ravishda tekshiruvdan o\'taman. Ko\'p yillik kuzatuvlar natijasida ishonch bilan ayta olaman - bu shahardagi eng yaxshi klinika. Shifokorlar doimo kasallik tarixini sinchkovlik bilan o\'rganadilar va professional tavsiyalar beradilar.',
        service: 'Chek-ap «Ayollar salomatligi»',
        reviewSource: 'google',
        avatar: '/images/user.png'
    },
    {
        name: 'Dmitriy Kozlov',
        date: '15 yanvar 2025-yil sharh qoldirgan',
        text: 'Deyarli bir yil davomida boshqa klinikalarda hal qilib bo\'lmagan muammo bilan murojaat qildim. Bu yerda bitta tashrifda tashxis qo\'yishdi va samarali davolash tayinlashdi. Natija bir hafta ichida ko\'rindi!',
        service: 'Gastroenterolog maslahati',
        reviewSource: 'youtube',
        avatar: '/images/user.png'
    },
    {
        name: 'Olga Nikolayeva',
        date: '10 yanvar 2025-yil sharh qoldirgan',
        text: 'Farzandimni tekshiruvga olib keldik. Xodimlar juda mehribon, bolalarga alohida e\'tibor va g\'amxo\'rlik bilan munosabatda bo\'ladilar. Batafsil maslahat va aniq harakat rejasini oldik. Tavsiya etaman!',
        service: 'Bolalar chek-api',
        reviewSource: 'google',
        avatar: '/images/user.png'
    },
    {
        name: 'Sergey Ivanov',
        date: '5 yanvar 2025-yil sharh qoldirgan',
        text: 'Bu yerda to\'liq tana tekshiruvidan o\'tdim. Protseduralar zamonaviy uskunalarda o\'tkaziladi, barcha narsa aniq tashkillashtirilgan, navbatlar yo\'q. Shifokorlar hamma narsani tushunarli tilda tushuntiradilar va amaliy maslahatlar beradilar.',
        service: 'Kompleks tekshiruv',
        reviewSource: 'youtube',
        avatar: '/images/user.png'
    }
];