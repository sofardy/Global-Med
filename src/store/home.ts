import { create } from "zustand";
import { API_BASE_URL } from "../config/constants";

export const useHomeStore = create((set) => ({
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
  fetchHomeData: async (locale: string) => {
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
