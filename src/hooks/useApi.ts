import { useEffect, useState } from "react";
import { useLanguageStore } from "../store/language";
import axios, { AxiosRequestConfig } from "axios";

export function useApi<T>(url: string, config?: AxiosRequestConfig) {
  const { currentLocale } = useLanguageStore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          ...config,
          headers: {
            ...config?.headers,
            "X-Language": currentLocale,
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, currentLocale, JSON.stringify(config)]);

  return { data, loading, error };
} 