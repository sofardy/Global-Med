export interface Review {
    name: string;
    date: string;
    text: string;
    service?: string;
    reviewSource?: 'google' | 'youtube' | null;
    avatar?: string;
}

export const reviewsData: Review[] = [
    {
        name: 'Мария Иванова',
        date: 'Оставила отзыв 4 февраля 2025',
        text: 'Отличная клиника с внимательными врачами! Быстро прошла диагностику, получила подробные рекомендации. Очень довольна уровнем сервиса!',
        service: 'Чек-ап «Сердце и сосуды»',
        reviewSource: 'google',
        avatar: '/images/user.png'
    },
    {
        name: 'Алексей Петров',
        date: 'Оставил отзыв 2 февраля 2025',
        text: 'Впервые посетил данную клинику и остался очень доволен. Современное оборудование, вежливый персонал и квалифицированные врачи. Особенно понравился индивидуальный подход!',
        service: 'Чек-ап «Комплексное обследование»',
        reviewSource: 'youtube',
        avatar: '/images/user.png'
    },
    {
        name: 'Екатерина Смирнова',
        date: 'Оставила отзыв 29 января 2025',
        text: 'Регулярно прохожу здесь обследования. За годы наблюдения могу с уверенностью сказать - это лучшая клиника в городе. Врачи всегда внимательно изучают историю болезни и дают грамотные рекомендации.',
        service: 'Чек-ап «Женское здоровье»',
        reviewSource: 'google',
        avatar: '/images/user.png'
    },
    {
        name: 'Дмитрий Козлов',
        date: 'Оставил отзыв 15 января 2025',
        text: 'Обратился с проблемой, которую не могли решить в других клиниках почти год. Здесь за одно посещение поставили диагноз и назначили эффективное лечение. Результат виден уже через неделю!',
        service: 'Консультация гастроэнтеролога',
        reviewSource: 'youtube',
        avatar: '/images/user.png'
    },
    {
        name: 'Ольга Николаева',
        date: 'Оставила отзыв 10 января 2025',
        text: 'Привели ребенка на обследование. Персонал очень доброжелательный, к детям относятся с особым вниманием и заботой. Получили подробную консультацию и четкий план действий. Рекомендую!',
        service: 'Детский чек-ап',
        reviewSource: 'google',
        avatar: '/images/user.png'
    },
    {
        name: 'Сергей Иванов',
        date: 'Оставил отзыв 5 января 2025',
        text: 'Проходил здесь полное обследование организма. Процедуры проводятся на современном оборудовании, все четко организовано, нет очередей. Врачи объясняют все доступным языком и дают практические советы.',
        service: 'Комплексное обследование',
        reviewSource: 'youtube',
        avatar: '/images/user.png'
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