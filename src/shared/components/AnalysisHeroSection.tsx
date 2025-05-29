"use client";

import React, { useEffect, useState } from "react";
import UniversalHeroSection from "@/src/shared/components/UniversalHeroSection";
import { analysisHeroData } from "../mocks/analysisHeroData";
import { useLanguageStore } from "@/src/store/language";
import { API_BASE_URL } from "@/src/config/constants";

interface AnalysisHeroSectionProps {
  className?: string;
}

export const AnalysisHeroSection: React.FC<AnalysisHeroSectionProps> = ({
  className = "",
}) => {
  const { currentLocale } = useLanguageStore();

  const [dataPagesAnalysis, setDataPagesAnalysis] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pages/analysis`, {
          headers: {
            "X-Language": currentLocale,
          },
        });
        const result = await response.json();
        setDataPagesAnalysis(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [currentLocale]);

  return (
    <div className={className}>
      <UniversalHeroSection
        data={dataPagesAnalysis}
        imageUrl={analysisHeroData.imageUrl}
        imageAlt={analysisHeroData.imageAlt}
      />
    </div>
  );
};

export { analysisHeroData };
