"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { useThemeStore } from "../../store/theme";

const translations = {
  ru: {
    chat: {
      title: "Онлайн-чат с клиникой",
      description:
        "Для начала диалога введите, пожалуйста, свои контактные данные и вопрос",
      namePlaceholder: "Имя",
      phonePlaceholder: "+998 (__)___-__-__",
      messagePlaceholder: "Сообщение",
      button: "Начать диалог",
      chatButton: "Онлайн-чат",
      nameError: "Пожалуйста, введите имя",
      phoneError: "Пожалуйста, введите корректный номер телефона",
      messageError: "Пожалуйста, введите сообщение",
    },
    scroll: {
      upButton: "Наверх",
    },
  },
  uz: {
    chat: {
      title: "Klinika bilan onlayn suhbat",
      description:
        "Muloqotni boshlash uchun aloqa ma'lumotlaringizni va savolingizni kiriting",
      namePlaceholder: "Ism",
      phonePlaceholder: "+998 (__)___-__-__",
      messagePlaceholder: "Xabar",
      button: "Muloqotni boshlash",
      chatButton: "Onlayn chat",
      nameError: "Iltimos, ismingizni kiriting",
      phoneError: "Iltimos, to'g'ri telefon raqamini kiriting",
      messageError: "Iltimos, xabar kiriting",
    },
    scroll: {
      upButton: "Yuqoriga",
    },
  },
  en: {
    chat: {
      title: "Online Chat with the Clinic",
      description:
        "To start a conversation, please enter your contact information and question",
      namePlaceholder: "Name",
      phonePlaceholder: "+998 (__)___-__-__",
      messagePlaceholder: "Message",
      button: "Start Conversation",
      chatButton: "Online Chat",
      nameError: "Please enter your name",
      phoneError: "Please enter a valid phone number",
      messageError: "Please enter your message",
    },
    scroll: {
      upButton: "Scroll Up",
    },
  },
};

export const FloatingComponents: React.FC = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation(translations);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [formIsValid, setFormIsValid] = useState(true);

  // Блокировка скролла при открытом чате
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (isChatOpen) {
      // Сохраняем текущую позицию скролла
      scrollPositionRef.current = window.scrollY;

      // Применяем стили для блокировки скролла без смещения контента
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      // Восстанавливаем скролл
      document.body.style.overflow = "";
      document.body.style.height = "";

      // Восстанавливаем позицию скролла
      window.scrollTo(0, scrollPositionRef.current);
    }

    return () => {
      // Восстанавливаем при размонтировании
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isChatOpen]);

  // Закрытие чата при клике вне него
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target as Node) &&
        isChatOpen
      ) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen]);

  // Следим за скроллом для показа кнопки наверх
  const [lastScrollTime, setLastScrollTime] = useState<number>(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
      setLastScrollTime(Date.now());
    };

    window.addEventListener("scroll", handleScroll);

    // Таймер для проверки неактивности скролла
    const inactivityTimer = setInterval(() => {
      if (Date.now() - lastScrollTime > 3000 && showScrollButton) {
        // 3 секунды неактивности
        setShowScrollButton(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(inactivityTimer);
    };
  }, [lastScrollTime, showScrollButton]);

  // Обработчик скролла наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Форматирование и валидация для имени
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Удаляем все цифры и специальные символы
    const formattedName = value.replace(/[^а-яА-Яa-zA-Z\s]/g, "");

    setFormData((prev) => ({ ...prev, name: formattedName }));
  };

  // Для телефона используем формат +998 XX XXX XX XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "");

    // Ограничиваем до 9 цифр (без учета +998)
    const phoneDigits = inputValue.slice(0, 9);

    let formattedPhone = "";
    if (phoneDigits.length > 0) {
      // Форматируем телефон
      formattedPhone = phoneDigits;
      if (phoneDigits.length > 2) {
        formattedPhone = phoneDigits.slice(0, 2) + " " + phoneDigits.slice(2);
      }
      if (phoneDigits.length > 5) {
        formattedPhone =
          formattedPhone.slice(0, 5) + " " + formattedPhone.slice(5);
      }
      if (phoneDigits.length > 7) {
        formattedPhone =
          formattedPhone.slice(0, 8) + " " + formattedPhone.slice(8);
      }
    }

    setFormData((prev) => ({ ...prev, phone: formattedPhone }));
  };

  // Обработчик изменения сообщения
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, message: value }));
  };

  // Валидация всей формы
  const validateForm = () => {
    const nameValid = formData.name.trim() !== "";
    const phoneValid = formData.phone.replace(/\s/g, "").length === 9;
    const messageValid = formData.message.trim() !== "";

    const isValid = nameValid && phoneValid && messageValid;
    setFormIsValid(isValid);
    return isValid;
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Форматируем полный номер телефона для отправки
      const fullPhoneNumber = "+998 " + formData.phone;

      console.log("Form data submitted:", {
        ...formData,
        phone: fullPhoneNumber,
      });

      // Здесь будет логика отправки данных на сервер

      // Сбрасываем форму после отправки
      setFormData({ name: "", phone: "", message: "" });
      setIsChatOpen(false);
    }
  };

  // Функция для фокуса на поле телефона
  const focusPhoneInput = () => {
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  };

  return (
    <>
      {/* Кнопка скролла наверх */}
      <button
        className={`fixed right-9 bottom-[120px] md:right-11 md:bottom-[120px] z-30 p-4 rounded-full transition-opacity duration-300 
          border-2 ${
            theme === "light" ? "border-light-text" : "border-dark-text"
          }
          ${showScrollButton ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={scrollToTop}
        aria-label={t("scroll.upButton")}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            theme === "light" ? "border-light-text" : "border-dark-text"
          }`}
        >
          <path
            d="M7 14L12 9L17 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Кнопка чата и форма */}
      {/* <div className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-30">
        <div 
          ref={chatRef}
          className={`absolute bottom-full right-0 mb-4 w-[320px] md:w-[360px] rounded-xl shadow-xl 
            ${theme === 'light' ? 'bg-light-block' : 'bg-dark-block'} 
            transform transition-all duration-300 origin-bottom-right
            ${isChatOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}
          `}
        >
          <div className="p-6">
            <div className="bg-light-accent text-white p-5 rounded-xl mb-5">
              <h3 className="text-xl font-semibold mb-2">{t('chat.title')}</h3>
              <p className="text-sm">{t('chat.description')}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-light-accent">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder={t('chat.namePlaceholder')}
                    className={`w-full p-4 border outline-none transition ${
                      theme === 'light' 
                        ? 'bg-light-bg text-light-text border-gray-200' 
                        : 'bg-dark-bg text-dark-text border-gray-700'
                    } ${!formIsValid && !formData.name.trim() ? 'border-light-accent' : ''}`}
                    autoComplete="name"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-light-accent">
                  {formData.phone.length > 0 && (
                    <div className={`absolute left-0 top-0 h-full flex items-center px-4 pointer-events-none ${
                      theme === 'light' ? 'text-light-text' : 'text-dark-text'
                    }`}>
                      +998
                    </div>
                  )}
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder={t('chat.phonePlaceholder')}
                    className={`w-full p-4 ${formData.phone.length > 0 ? 'pl-16' : 'pl-4'} border outline-none transition ${
                      theme === 'light' 
                        ? 'bg-light-bg text-light-text border-gray-200' 
                        : 'bg-dark-bg text-dark-text border-gray-700'
                    } ${!formIsValid && formData.phone.replace(/\s/g, '').length < 9 ? 'border-light-accent' : ''}`}
                    onClick={focusPhoneInput}
                    autoComplete="tel"
                  />
                </div>
              </div>
              
              <div>
                <div className="relative rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-light-accent">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleMessageChange}
                    placeholder={t('chat.messagePlaceholder')}
                    rows={4}
                    className={`w-full p-4 border outline-none resize-none transition ${
                      theme === 'light' 
                        ? 'bg-light-bg text-light-text border-gray-200' 
                        : 'bg-dark-bg text-dark-text border-gray-700'
                    } ${!formIsValid && !formData.message.trim() ? 'border-light-accent' : ''}`}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full p-4 bg-light-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors"
              >
                {t('chat.button')}
              </button>
            </form>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsChatOpen(!isChatOpen);
            if (!isChatOpen) {
              setFormIsValid(true);
            }
          }}
          className="relative rounded-full"
          aria-label={t('chat.chatButton')}
        >
          {isChatOpen ? (
            <div className="p-3 rounded-full bg-light-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ) : (
            <ChatIcon size={80} />
          )}
        </button>
      </div> */}
    </>
  );
};
