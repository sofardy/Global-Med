"use client";

import { useClientSide } from "@/src/hooks/useClientSide";
import { ReactNode, useEffect } from "react";
import { useLanguageStore } from "../../store/language";

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { setLocale } = useLanguageStore();
  const isClient = useClientSide();

  useEffect(() => {
    if (!isClient) return;

    const storedValue = localStorage.getItem("language-storage");
    if (storedValue) {
      try {
        const { state } = JSON.parse(storedValue);
        if (state && state.currentLocale) {
          setLocale(state.currentLocale);
        }
      } catch (e) {
        console.error("Failed to parse stored language state", e);
      }
    }
  }, [setLocale, isClient]);

  return <>{children}</>;
};
