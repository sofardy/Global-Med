"use client";

import { API_BASE_URL } from "@/src/config/constants";
import { GBContext } from "@/src/context/globalize-breadcrumb";
import { useAuth } from "@/src/hooks/useAuth";
import { useTranslation } from "@/src/hooks/useTranslation";
import DoctorDetail from "@/src/shared/components/Doctor/DoctorDetail";
import { useLanguageStore } from "@/src/store/language";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface EducationDetail {
  title: string;
  subtitle: string;
}

interface EducationGroup {
  title: string;
  details: EducationDetail[];
}

interface Certificate {
  name: string;
  image: string;
  subname: string;
}

interface DoctorDetailData {
  uuid: string;
  full_name: string;
  image_url: string;
  slug: string;
  specialization: string;
  specialization_uuid: string;
  experience_years: string;
  qualification: string;
  category: string;
  languages: string;
  education: EducationGroup[];
  certificates: Certificate[];
  price_from: string;
}

interface DoctorDetailResponse {
  data: DoctorDetailData;
}

const translations = {
  en: {
    loading: "Loading...",
    doctorNotFound: "Doctor information not found",
    errorLoading: "Failed to load doctor information. Please try again later.",
    invalidId: "Invalid doctor identifier",
    idNotSpecified: "Doctor identifier not specified",
  },
  ru: {
    loading: "Загрузка...",
    doctorNotFound: "Информация о докторе не найдена",
    errorLoading:
      "Не удалось загрузить информацию о докторе. Пожалуйста, попробуйте позже.",
    invalidId: "Некорректный идентификатор доктора",
    idNotSpecified: "Идентификатор доктора не указан",
  },
  uz: {
    loading: "Yuklanmoqda...",
    doctorNotFound: "Shifokor haqida ma'lumot topilmadi",
    errorLoading:
      "Shifokor ma'lumotlarini yuklashda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
    invalidId: "Noto'g'ri shifokor identifikatori",
    idNotSpecified: "Shifokor identifikatori ko'rsatilmagan",
  },
};

export default function DoctorDetailPage(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const id = params?.id;
  const [doctor, setDoctor] = useState<DoctorDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setTitle }: any = useContext(GBContext);
  const { currentLocale } = useLanguageStore();
  const { t } = useTranslation(translations);

  const handleAppointmentClick = (): void => {
    console.log("Проверка авторизации:", isAuthenticated());

    if (isAuthenticated()) {
      router.push(`/account/appointment?doctor_id=${doctor?.uuid}`);
    } else {
      router.push(
        `/account/login?redirect_to=/account/appointment?doctor_id=${doctor?.uuid}`
      );
    }
  };

  useEffect(() => {
    const fetchDoctorDetail = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const doctorId = Array.isArray(id) ? id[0] : id;

        if (!doctorId) {
          throw new Error(t("invalidId"));
        }

        const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
          headers: {
            "X-Language": currentLocale,
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка API: ${response.status}`);
        }

        const data: DoctorDetailResponse = await response.json();
        setDoctor(data.data);
        setTitle(data.data.full_name);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка при загрузке доктора:", err);
        setError(t("errorLoading"));
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctorDetail();
    } else {
      setError(t("idNotSpecified"));
      setLoading(false);
    }
  }, [id, currentLocale]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-light-accent border-t-transparent animate-spin"></div>
          <p className="mt-4 text-light-text dark:text-dark-text">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg">
          <p>{error || t("doctorNotFound")}</p>
        </div>
      </div>
    );
  }

  // Преобразуем данные из API в формат, ожидаемый компонентом DoctorDetail
  const doctorData = {
    id: doctor.uuid,
    name: doctor.full_name,
    specialization: doctor.specialization,
    photoUrl: doctor.image_url,
    qualification: doctor.qualification,
    category: doctor.category,
    languages: doctor.languages,
    experience: doctor.experience_years,
    appointmentCost: doctor.price_from,

    // Преобразуем образование
    basicEducation:
      doctor.education.length > 0
        ? doctor.education[0].details.map((item) => ({
            institution: item.title,
            course: item.subtitle,
          }))
        : [],

    additionalEducation:
      doctor.education.length > 1
        ? doctor.education[1].details.map((item) => ({
            institution: item.title,
            course: item.subtitle,
          }))
        : [],

    // Преобразуем сертификаты
    certificates: doctor.certificates.map((cert) => ({
      id: cert.name,
      imageUrl: cert.image,
      title: cert.name,
      expiryDate: cert.subname,
    })),

    // Добавляем обработчик для кнопки записи на прием
    onAppointmentClick: handleAppointmentClick,
  };

  return <DoctorDetail doctor={doctorData} />;
}
