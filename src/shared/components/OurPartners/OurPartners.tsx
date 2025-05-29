import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/src/config/constants";
import { useLanguageStore } from "@/src/store/language";
import { useTranslation } from "@/src/hooks/useTranslation";
import { checkupDetailTranslations } from "@/src/shared/mocks/checkupHeroData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface PartnersGalleryData {
  key: string;
  image: string[];
}

interface HomePageContent {
  partners_gallery?: {
    data: PartnersGalleryData;
    type: string;
  };
}

interface HomePageResponse {
  data: {
    title: string;
    slug: string;
    content: HomePageContent;
  };
}

const fetchHomePageData = async (
  language: string
): Promise<HomePageContent | null> => {
  try {
    const response = await axios.get<HomePageResponse>(
      `${API_BASE_URL}/pages/home`,
      {
        headers: {
          "X-Language": language,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data.content;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return null;
  }
};

const OurPartners = () => {
  const { currentLocale } = useLanguageStore();
  const { t } = useTranslation(checkupDetailTranslations);
  const [partnerImages, setPartnerImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Переводы заголовка
  const getTitle = () => {
    if (currentLocale === "uz") {
      return "Bizning hamkorlar";
    }
    return "Наши партнеры";
  };

  useEffect(() => {
    const loadPartners = async () => {
      setLoading(true);
      const data = await fetchHomePageData(currentLocale || "ru");
      if (data?.partners_gallery?.data?.image) {
        setPartnerImages(data.partners_gallery.data.image);
      }
      setLoading(false);
    };

    loadPartners();
  }, [currentLocale]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-xl text-light-text dark:text-dark-text">
          {currentLocale === "uz"
            ? "Hamkorlarni yuklash..."
            : "Загрузка партнеров..."}
        </div>
      </div>
    );
  }

  if (partnerImages.length === 0) {
    return null;
  }

  return (
    <div className="py-5 overflow-x-hidden">
      {/* Заголовок */}
      <h2 className="text-3xl md:text-5xl font-medium text-light-text dark:text-dark-text mb-8">
        {getTitle()}
      </h2>

      {/* Swiper Carousel */}
      <div className="overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={3000}
          className="partners-swiper"
        >
          {partnerImages.map((image, index) => (
            <SwiperSlide key={index} className="!w-[375px]">
              <div
                className="bg-white dark:bg-dark-block flex items-center justify-center p-6 duration-300"
                style={{
                  width: "375px",
                  height: "420px",
                  borderRadius: "16px",
                }}
              >
                <img
                  src={image}
                  alt={`Partner ${index + 1}`}
                  className="max-w-full max-h-full object-contain transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom styles for Swiper */}
      <style jsx global>{`
        .partners-swiper {
          width: 100%;
          overflow: hidden;
        }

        .partners-swiper .swiper-slide {
          transition: transform 0.3s ease;
          opacity: 1;
        }

        .partners-swiper .swiper-slide:hover {
          transform: scale(1.02);
        }

        .partners-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
};

export default OurPartners;
