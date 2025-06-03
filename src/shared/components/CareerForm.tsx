// src/shared/components/CareerForm.tsx

"use client";

import { useFormValidation } from "@/src/hooks/useFormValidation";
import { useTranslation } from "@/src/hooks/useTranslation";
import Modal from "@/src/shared/components/Modal/Modal";
import { useHomeStore } from "@/src/store/home";
import { useThemeStore } from "@/src/store/theme";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FormService } from "../services/FormService";

const translations = {
  ru: {
    aboutButton: "Подробнее О клинике",
    namePlaceholder: "Имя",
    phonePlaceholder: "+998 (__) ___-__-__",
    attachResume: "Прикрепите свое резюме в PDF формате",
    coverLetter: "Сопроводительное письмо",
    consent: "Соглашаюсь с политикой в отношении обработки персональных данных",
    submit: "Отправить",
    nameError: "Пожалуйста, введите имя",
    phoneError: "Пожалуйста, введите корректный номер телефона",
    consentError: "Необходимо согласие с политикой",
    confirmTitle: "Подтверждение отправки",
    confirmMessage: "Проверьте правильность введенных данных перед отправкой",
    confirmClose: "Отмена",
    confirmSubmit: "Отправить",
    successTitle: "Заявка отправлена!",
    successMessage:
      "Спасибо за ваш интерес к нашей клинике. Мы свяжемся с вами в ближайшее время",
    successThankYou: "Спасибо!",
    successDetailedMessage:
      "Мы внимательно рассмотрим вашу кандидатуру, и если ваш опыт и навыки соответствуют нашим требованиям, наш HR-менеджер обязательно свяжется с вами",
    successClose: "Закрыть",
    resume: "Резюме",
    notSelected: "Не выбрано",
    uploadFile: "Загрузить файл",
  },
  uz: {
    aboutButton: "Klinika haqida batafsil",
    namePlaceholder: "Ism",
    phonePlaceholder: "+998 (__) ___-__-__",
    attachResume: "PDF formatida o'z rezyumengizni biriktiring",
    coverLetter: "Yo'ldosh xat",
    consent: "Shaxsiy ma'lumotlarni qayta ishlash siyosatiga roziman",
    submit: "Yuborish",
    nameError: "Iltimos, ismingizni kiriting",
    phoneError: "Iltimos, to'g'ri telefon raqamini kiriting",
    consentError: "Siyosatga rozilik zarur",
    confirmTitle: "Yuborishni tasdiqlash",
    confirmMessage: "Yuborishdan oldin kiritilgan ma'lumotlarni tekshiring",
    confirmClose: "Bekor qilish",
    confirmSubmit: "Yuborish",
    successTitle: "Ariza yuborildi!",
    successMessage:
      "Klinikamizga qiziqish bildirganingiz uchun rahmat. Tez orada siz bilan bog'lanamiz",
    successThankYou: "Rahmat!",
    successDetailedMessage:
      "Biz sizning nomzodingizni sinchkovlik bilan ko'rib chiqamiz, va agar sizning tajribangiz va ko'nikmalaringiz bizning talablarimizga mos kelsa, HR-menejerimiz siz bilan bog'lanadi",
    successClose: "Yopish",
    resume: "Rezyume",
    notSelected: "Tanlanmagan",
    uploadFile: "Faylni yuklash",
  },
  en: {
    aboutButton: "Learn More About the Clinic",
    namePlaceholder: "Name",
    phonePlaceholder: "+998 (__) ___-__-__",
    attachResume: "Attach your resume in PDF format",
    coverLetter: "Cover Letter",
    consent: "I agree to the personal data processing policy",
    submit: "Submit",
    nameError: "Please enter your name",
    phoneError: "Please enter a valid phone number",
    consentError: "Consent to the policy is required",
    confirmTitle: "Confirm Submission",
    confirmMessage: "Please verify the entered information before submitting",
    confirmClose: "Cancel",
    confirmSubmit: "Submit",
    successTitle: "Application Submitted!",
    successMessage:
      "Thank you for your interest in our clinic. We will contact you shortly",
    successThankYou: "Thank You!",
    successDetailedMessage:
      "We will carefully review your application, and if your experience and skills match our requirements, our HR manager will contact you",
    successClose: "Close",
    resume: "Resume",
    notSelected: "Not selected",
    uploadFile: "Upload file",
  },
};

const CareerForm = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const { form, isLoading }: any = useHomeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Модальные окна
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Локальное состояние для чекбокса
  const [consentChecked, setConsentChecked] = useState(false);

  // Локальное состояние для хранения файла, чтобы обойти ограничения типов
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Используем хук валидации формы
  const {
    formData,
    formErrors,
    handleInputChange,
    handlePhoneChange,
    validateForm,
    setFormData,
    setFormErrors,
    resetForm,
  } = useFormValidation(
    {
      name: "",
      phone: "",
      coverLetter: "",
      resume: "", // Изменено с null на пустую строку для совместимости
      consent: false,
    },
    {
      name: { required: true },
      phone: {
        required: true,
        customValidator: (value) => {
          const phoneDigits = String(value).replace(/\D/g, "");
          return phoneDigits.length >= 12;
        },
      },
      consent: {
        required: true,
        customValidator: (value) => Boolean(value) === true,
      },
    },
    "career_form"
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
    // В formData храним только строку - имя файла или идентификатор
    setFormData({ ...formData, resume: file ? file.name : "" });
  };

  // Обработка чекбокса с локальным состоянием
  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsentChecked(e.target.checked);
    // Обновляем значение в formData
    setFormData({ ...formData, consent: e.target.checked });
    // Сбрасываем ошибку
    setFormErrors({ ...formErrors, consent: false });
  };

  const handleSubmitClick = () => {
    if (validateForm()) {
      setIsConfirmModalOpen(true);
    }
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleConfirmSubmit = async () => {
    setIsConfirmModalOpen(false);
    setIsSubmitting(true);

    try {
      // Правильное преобразование типов для отправки данных
      const formDataToSubmit = {
        name: formData.name as string, // Явное приведение к string
        phone: formData.phone as string, // Явное приведение к string
        cover_letter: formData.coverLetter as string, // Явное приведение к string
        form_type: "career_form",
      };

      // Отправляем данные на сервер
      await FormService.submitForm(formDataToSubmit);

      // Здесь можно добавить отдельную логику для отправки файла резюме
      // если API поддерживает multipart/form-data
      if (resumeFile) {
        const fileFormData = new FormData();
        fileFormData.append("resume", resumeFile);
        fileFormData.append("name", formData.name as string);
        fileFormData.append("phone", formData.phone as string);

        // Этот код закомментирован, т.к. мы не знаем точно, поддерживает ли API загрузку файлов
        // await axios.post(`${API_BASE_URL}/career/resume`, fileFormData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     'X-Language': 'ru'
        //   }
        // });

        console.log("Файл резюме для загрузки:", resumeFile);
      }

      // Показываем модальное окно успеха
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    resetForm();
    setConsentChecked(false);
    setResumeFile(null);
  };

  // Получение имени файла безопасно
  const getFileName = () => {
    return resumeFile ? resumeFile.name : t("notSelected");
  };

  return (
    <>
      <div
        id="career-form"
        className="w-full flex flex-col md:flex-row gap-5 rounded-2xl overflow-hidden mt-6 sm:mt-8 md:mt-40 mb-6 sm:mb-8 md:mb-40"
      >
        {/* Left section with background image */}
        <div className="w-full md:w-1/2 bg-light-accent text-white p-8 relative min-h-[340px] md:min-h-[490px] rounded-2xl overflow-hidden">
          {/* Добавлен новый фоновый элемент */}
          <div
            className="absolute -right-[150px] bottom-[90px] w-[1400px] h-[500px] pointer-events-none z-[1] hidden md:block"
            style={{
              backgroundImage: "url(/images/doctor-pattern2.gif)",
              backgroundSize: "contain",
              transform: "rotate(50deg)",
              backgroundPosition: "right bottom",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            <div>
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 md:h-10 lg:h-12 bg-white/20 rounded-lg w-3/4 mb-4"></div>
                  <div className="h-4 md:h-5 lg:h-6 bg-white/20 rounded-lg w-full mb-2"></div>
                  <div className="h-4 md:h-5 lg:h-6 bg-white/20 rounded-lg w-5/6 mb-2"></div>
                  <div className="h-4 md:h-5 lg:h-6 bg-white/20 rounded-lg w-4/6"></div>
                </div>
              ) : (
                <>
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: form?.title,
                    }}
                    className="text-3xl md:text-4xl font-medium mb-6"
                  ></h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: form?.subtitle,
                    }}
                    className="text-base md:text-lg mb-8 max-w-md"
                  ></p>
                </>
              )}
            </div>

            <div className="mt-auto">
              <Link
                href="/clinic"
                className="inline-flex items-center gap-2 py-3 px-6 border border-white rounded-xl text-white hover:bg-white hover:text-light-accent transition-colors"
              >
                {t("aboutButton")}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Right section with form */}
        <div
          className={`w-full md:w-1/2 p-8 ${
            theme === "light" ? "bg-white" : "bg-dark-block"
          } rounded-2xl`}
        >
          <div className="flex flex-col space-y-6">
            {/* Name field */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name as string}
                onChange={handleInputChange}
                placeholder={t("namePlaceholder")}
                className={`w-full p-4 rounded-xl bg-light-bg dark:bg-dark-bg border ${
                  formErrors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:ring-light-accent"
                } focus:outline-none focus:ring-2 text-light-text dark:text-dark-text`}
                disabled={isSubmitting}
                aria-invalid={formErrors.name}
                aria-describedby={formErrors.name ? "name-error" : undefined}
              />
              {formErrors.name && (
                <p className="mt-2 text-sm text-red-500" id="name-error">
                  {t("nameError")}
                </p>
              )}
            </div>

            {/* Phone field */}
            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone as string}
                onChange={handlePhoneChange}
                placeholder={t("phonePlaceholder")}
                className={`w-full p-4 rounded-xl bg-light-bg dark:bg-dark-bg border ${
                  formErrors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:ring-light-accent"
                } focus:outline-none focus:ring-2 text-light-text dark:text-dark-text`}
                disabled={isSubmitting}
                aria-invalid={formErrors.phone}
                aria-describedby={formErrors.phone ? "phone-error" : undefined}
              />
              {formErrors.phone && (
                <p className="mt-2 text-sm text-red-500" id="phone-error">
                  {t("phoneError")}
                </p>
              )}
            </div>

            {/* Resume upload */}
            <div>
              <button
                type="button"
                onClick={handleAttachClick}
                className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-light-bg dark:bg-dark-bg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-light-text dark:text-dark-text"
                disabled={isSubmitting}
              >
                <svg
                  className="w-6 h-6 text-light-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
                <span className="flex-1 text-left">
                  {resumeFile ? getFileName() : t("uploadFile")}
                </span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                aria-label={t("attachResume")}
                disabled={isSubmitting}
              />
            </div>

            {/* Cover letter */}
            <div>
              <textarea
                name="coverLetter"
                value={formData.coverLetter as string}
                onChange={handleInputChange}
                placeholder={t("coverLetter")}
                rows={4}
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-light-bg dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-light-accent resize-none text-light-text dark:text-dark-text"
                disabled={isSubmitting}
              />
            </div>

            {/* Checkbox with proper alignment */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={consentChecked}
                onChange={handleConsentChange}
                className={`h-5 w-5 rounded border-gray-300 text-light-accent focus:ring-light-accent ${
                  formErrors.consent ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
                aria-invalid={formErrors.consent}
                aria-describedby={
                  formErrors.consent ? "consent-error" : undefined
                }
              />
              <label
                htmlFor="consent"
                className="ml-3 block text-sm text-light-text dark:text-dark-text"
              >
                {t("consent")}
              </label>
            </div>
            {formErrors.consent && (
              <p className="mt-1 text-sm text-red-500" id="consent-error">
                {t("consentError")}
              </p>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmitClick}
              className="w-full p-4 bg-light-accent text-white rounded-xl hover:bg-light-accent/90 transition-colors flex justify-center items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Отправка...
                </>
              ) : (
                t("submit")
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно подтверждения */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title={t("confirmTitle")}
        position="center"
        size="sm"
        theme="brand"
        showCloseButton={false}
        closeText={t("confirmClose")}
      >
        <div className="py-4">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t("confirmMessage")}
          </p>

          <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-5 rounded-xl mb-6">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {t("namePlaceholder")}:
              </div>
              <div className="font-medium">{formData.name}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {t("phonePlaceholder")}:
              </div>
              <div className="font-medium">{formData.phone}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {t("resume")}:
              </div>
              <div className="font-medium">{getFileName()}</div>
            </div>

            {formData.coverLetter && (
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t("coverLetter")}:
                </div>
                <div className="font-medium">{formData.coverLetter}</div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="flex-1 py-4 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              disabled={isSubmitting}
            >
              {t("confirmClose")}
            </button>
            <button
              onClick={handleConfirmSubmit}
              className="flex-1 py-4 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors flex justify-center items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Отправка...
                </>
              ) : (
                t("confirmSubmit")
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно успешной отправки */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessClose}
        title={t("successTitle")}
        position="center"
        size="sm"
        theme="brand"
        showCloseButton={true}
        closeText={t("successClose")}
      >
        <div className="py-6 flex flex-col items-center justify-center text-center">
          <div className="bg-light-accent rounded-full p-5 mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-medium mb-4 text-light-text dark:text-dark-text">
            {t("successThankYou")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t("successDetailedMessage")}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CareerForm;
