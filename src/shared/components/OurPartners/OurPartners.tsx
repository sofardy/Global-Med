import { useHomeStore } from "@/src/store/home";
import { useLanguageStore } from "@/src/store/language";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const OurPartners = () => {
  const { currentLocale } = useLanguageStore();
  const { partnersGallery, isLoading }: any = useHomeStore();

  // Переводы заголовка
  const getTitle = () => {
    if (currentLocale === "uz") {
      return "Bizning hamkorlar";
    }
    if (currentLocale === "en") {
      return "Our Partners";
    }
    return "Наши партнеры";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-xl text-light-text dark:text-dark-text">
          {currentLocale === "uz"
            ? "Hamkorlarni yuklash..."
            : currentLocale === "en"
            ? "Loading partners..."
            : "Загрузка партнеров..."}
        </div>
      </div>
    );
  }

  if (partnersGallery?.image?.length === 0) {
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
          {partnersGallery?.image?.map((image: any, index: any) => (
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
