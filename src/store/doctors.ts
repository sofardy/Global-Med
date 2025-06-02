import httpClient from "@/src/shared/services/HttpClient";
import { create } from "zustand";
import { Doctor, DoctorFilters } from "../app/api/doctors";

export const getDoctors = async (filters: DoctorFilters, page = 1) => {
  const queryParams = new URLSearchParams();

  // Add filter parameters in the format filter[key]=value
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(`filter[${key}]`, String(value));
    }
  });

  // Add page parameter
  queryParams.append("page", String(page));

  const response = await httpClient.get<any>(
    `/doctors?${queryParams.toString()}`
  );
  return response;
};

interface DoctorsState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  filters: DoctorFilters;
  totalDoctors: number;
  setFilters: (filters: DoctorFilters) => void;
  fetchDoctors: () => Promise<void>;
  clearResults: () => void;
  resetStore: () => void;
}

// Initial state values
const initialState = {
  doctors: [],
  loading: false,
  error: null,
  filters: {},
  totalDoctors: 0,
};

export const useDoctorsStore = create<DoctorsState>()((set, get) => ({
  ...initialState,
  setFilters: (filters) => set({ filters }),
  fetchDoctors: async () => {
    const { filters } = get();
    try {
      set({ loading: true, error: null });

      // Fetch first page to get total pages
      const firstPageResponse = await getDoctors(filters, 1);
      const firstPageDoctors = firstPageResponse.data;
      const totalPages = firstPageResponse.meta.last_page;
      const totalDoctors = firstPageResponse.meta.total;

      if (totalPages === 1) {
        set({
          doctors: firstPageDoctors,
          totalDoctors,
          loading: false,
        });
        return;
      }

      // Fetch remaining pages concurrently
      const pagePromises = [];
      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(getDoctors(filters, page));
      }
      const remainingResponses = await Promise.all(pagePromises);
      const remainingDoctors = remainingResponses.flatMap(
        (response) => response.data
      );
      const allDoctors = [...firstPageDoctors, ...remainingDoctors];

      set({
        doctors: allDoctors,
        totalDoctors,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching doctors:", error);
      set({
        error: "Ошибка при загрузке данных",
        loading: false,
      });
    }
  },
  clearResults: () => set({ doctors: [], error: null }),
  resetStore: () => set(initialState),
}));
