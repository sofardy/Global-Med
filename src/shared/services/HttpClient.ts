import { API_BASE_URL } from "@/src/config/constants";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
    });

    // Добавляем интерцептор для всех запросов
    this.axiosInstance.interceptors.request.use((config) => {
      // Получаем текущий язык из localStorage, если доступно
      let currentLocale = "ru"; // Значение по умолчанию

      if (typeof window !== "undefined") {
        try {
          const languageData = localStorage.getItem("language-storage");
          if (languageData) {
            const parsedData = JSON.parse(languageData);
            currentLocale = parsedData.state?.currentLocale || "ru";
          }
        } catch (e) {
          console.error("Error parsing language from storage:", e);
        }
      }

      // Добавляем языковой заголовок ко всем запросам
      config.headers = config.headers || {};
      config.headers["X-Language"] = currentLocale;

      return config;
    });
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  // Доступ к исходному axios для особых случаев
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export default HttpClient.getInstance();
