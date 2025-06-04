import { create } from "zustand";
import { API_BASE_URL } from "../config/constants";

interface HomeData {
  partnersGallery: any;
  heroBanners: any;
  services: any;
  medicalTests: any;
  servicesSlider: any;
  team: any;
  checkups: any;
  form: any;
  reviews: any;
  contacts: any;
}

interface HomeState extends HomeData {
  isLoading: boolean;
  error: string | null;
  setHomeData: (locale: string) => Promise<void>;
}

export const useHomeStore = create<HomeState>((set) => ({
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
  setHomeData: async (locale: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await fetch(`${API_BASE_URL}/pages/home`, {
        headers: {
          "X-Language": locale,
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
}));
