"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "../store/language";
import type { Locale } from "../store/language";

export function useClientLocale() {
  const [mounted, setMounted] = useState(false);
  const { currentLocale, setLocale } = useLanguageStore();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Get stored locale from localStorage
    const storedLanguage = localStorage.getItem("language-storage");
    if (storedLanguage) {
      try {
        const parsed = JSON.parse(storedLanguage);
        const storedLocale = parsed.state?.currentLocale as Locale;
        if (storedLocale && storedLocale !== currentLocale) {
          // Use requestAnimationFrame to ensure this happens after initial render
          requestAnimationFrame(() => {
            setLocale(storedLocale);
          });
        }
      } catch {
        // If there's an error parsing, keep the default locale
      }
    }
    setMounted(true);
  }, []);

  return {
    mounted,
    currentLocale,
  };
}
