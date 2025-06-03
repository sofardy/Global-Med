import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API_BASE_URL } from "../config/constants";
import { useLanguageStore } from "./language";

// Types for each section
interface HeroBannerItem {
  title: string;
  images: string[];
  subtitle: string;
}

interface PartnersGallery {
  key: string;
  image: string[];
}

interface TitleWithSubtitle {
  key: string;
  title: string;
  subtitle: string;
}

interface Contact {
  key: string;
  phone: string;
  iframe: string;
  address: string;
  socials: { url: string }[];
  emergency: string;
}

// Main content interface
interface HomeContent {
  partners_gallery: {
    data: PartnersGallery;
    type: "gallery";
  };
  hero_banners: {
    data: {
      key: string;
      items: HeroBannerItem[];
    };
    type: "slider";
  };
  services: {
    data: TitleWithSubtitle;
    type: "title_with_subtitle";
  };
  medical_tests: {
    data: TitleWithSubtitle;
    type: "title_with_subtitle";
  };
  services_slider: {
    data: TitleWithSubtitle;
    type: "title_with_subtitle";
  };
  team: {
    data: TitleWithSubtitle;
    type: "title_with_subtitle";
  };
  form: {
    data: TitleWithSubtitle;
    type: "title_with_subtitle";
  };
  reviews: {
    data: TitleWithSubtitle;
    type: "title_with_subtitle";
  };
  contacts: {
    data: Contact;
    type: "contacts";
  };
}

// Store state interface
interface HomeState {
  // Data states
  partnersGallery: PartnersGallery | null;
  heroBanners: HeroBannerItem[] | null;
  services: TitleWithSubtitle | null;
  medicalTests: TitleWithSubtitle | null;
  servicesSlider: TitleWithSubtitle | null;
  team: TitleWithSubtitle | null;
  checkups: TitleWithSubtitle | null;
  form: TitleWithSubtitle | null;
  reviews: TitleWithSubtitle | null;
  contacts: Contact | null;

  // Loading and error states
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchHomeData: () => Promise<void>;
}

export const useHomeStore = create<HomeState>()(
  persist(
    (set) => ({
      // Initial states
      partnersGallery: null,
      heroBanners: null,
      services: null,
      medicalTests: null,
      servicesSlider: null,
      team: null,
      checkups: null,
      form: null,
      reviews: null,
      contacts: null,
      isLoading: false,
      error: null,

      // Fetch data action
      fetchHomeData: async () => {
        try {
          set({ isLoading: true, error: null });

          const response = await fetch(`${API_BASE_URL}/pages/home`, {
            headers: {
              "X-Language": useLanguageStore.getState().currentLocale,
            },
          });
          const data = await response.json();

          if (!response.ok) {
            throw new Error("Failed to fetch home data");
          }

          const content = data.data.content;

          set({
            checkups: content.checkups.data,
            partnersGallery: content.partners_gallery.data,
            heroBanners: content.hero_banners.data.items,
            services: content.services.data,
            medicalTests: content.medical_tests.data,
            servicesSlider: content.services_slider.data,
            team: content.team.data,
            form: content.form.data,
            reviews: content.reviews.data,
            contacts: content.contacts.data,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "home-storage",
    }
  )
);
