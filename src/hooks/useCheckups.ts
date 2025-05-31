// src/hooks/useCheckups.ts
import { useEffect, useState } from "react";
import { CheckupItem, CheckupsResponse } from "../app/api/checkups";
import httpClient from "../shared/services/HttpClient";
import { API_BASE_URL } from "@/src/config/constants";

// Обновляем функции fetchCheckups и fetchCheckupBySlug
export const fetchCheckups = async (
  locale: string
): Promise<CheckupsResponse> => {
  const response = await httpClient.get<CheckupsResponse>(
    `/checkups?locale=${locale}`
  );
  return response;
};

export const fetchCheckupBySlug = async (
  slug: string,
  locale: string
): Promise<CheckupItem> => {
  const response = await httpClient.get<{ data: CheckupItem }>(
    `/checkups/${slug}?locale=${locale}`
  );
  return response.data;
};

export const useCheckups = (currentLocale: string) => {
  const [checkups, setCheckups] = useState<CheckupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCheckups = async () => {
      try {
        setLoading(true);
        const response = await fetchCheckups(currentLocale);
        setCheckups(response.data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Ошибка при загрузке данных")
        );
      } finally {
        setLoading(false);
      }
    };

    loadCheckups();
  }, [currentLocale]);

  return { checkups, loading, error };
};

export const useCheckupDetail = (slug: string, currentLocale: string) => {
  const [checkup, setCheckup] = useState<CheckupItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCheckupDetail = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await fetchCheckupBySlug(slug, currentLocale);
        setCheckup(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Ошибка при загрузке данных")
        );
      } finally {
        setLoading(false);
      }
    };

    loadCheckupDetail();
  }, [slug, currentLocale]);

  return { checkup, loading, error };
};
