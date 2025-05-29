// src/store/partners.ts
import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "@/src/config/constants";

// Типы для партнерских данных
export interface PartnerItem {
  svg: string | null;
  title: string;
  subtitle: string;
}

export interface PartnersData {
  data: {
    title: string;
    slug: string;
    content: {
      partners: {
        data: {
          key: string;
          items: PartnerItem[];
        };
      };
    };
  };
}

interface PartnersState {
  // Состояние данных
  items: PartnerItem[];
  loading: boolean;
  error: string | null;
  currentLocale: string | null;

  // Флаг, указывающий, были ли загружены данные
  dataFetched: boolean;

  // Метод загрузки данных
  fetchPartners: (locale: string) => Promise<void>;

  // Получение разных типов данных
  getMainPartner: () => PartnerItem | null;
  getBenefitCards: () => PartnerItem[];
  getServiceCards: () => PartnerItem[];
  getWhyChooseUsCards: () => PartnerItem[];
}

export const usePartnersStore = create<PartnersState>()((set, get) => ({
  // Начальное состояние
  items: [],
  loading: false,
  error: null,
  dataFetched: false,
  currentLocale: null,

  // Метод для получения данных
  fetchPartners: async (locale: string) => {
    // Reset data if locale changed
    if (get().currentLocale !== locale) {
      set({ dataFetched: false, items: [], currentLocale: locale });
    }

    // If data is already fetched for current locale, return
    if (
      get().dataFetched &&
      get().items.length > 0 &&
      get().currentLocale === locale
    ) {
      return;
    }

    try {
      set({ loading: true, error: null });

      const response = await axios.get<PartnersData>(
        `${API_BASE_URL}/pages/partners`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Language": locale,
          },
        }
      );

      set({
        items: response.data.data.content.partners.data.items,
        loading: false,
        dataFetched: true,
        currentLocale: locale,
      });
    } catch (error) {
      console.error("Error fetching partners data:", error);
      set({
        error: "Ошибка при загрузке данных",
        loading: false,
      });
    }
  },

  // Получение главного партнера (первый элемент)
  getMainPartner: () => {
    const { items } = get();
    return items.length > 0 ? items[0] : null;
  },

  // Получение карточек преимуществ (2 и 3 элементы)
  getBenefitCards: () => {
    const { items } = get();
    return items.slice(1, 3);
  },

  // Получение карточек услуг (элементы с 3 по 8)
  getServiceCards: () => {
    const { items } = get();
    return items.slice(3, 8);
  },

  // Получение карточек "Почему выбирают нас" (последние 4 элемента)
  getWhyChooseUsCards: () => {
    const { items } = get();
    // Если есть хотя бы 8 элементов, берем последние 4
    if (items.length >= 12) {
      return items.slice(8, 12);
    }
    // Иначе возвращаем последние 4 или сколько есть
    const startIndex = Math.max(0, items.length - 4);
    return items.slice(startIndex);
  },
}));
