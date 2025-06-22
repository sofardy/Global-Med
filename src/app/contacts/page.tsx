"use client";

import ContactForm from "@/src/shared/components/ContactForm";
import { ContactInfo } from "@/src/shared/components/ContactInfo";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/src/config/constants";
import { useLanguageStore } from "@/src/store/language";

export default function Contacts() {
  const { currentLocale } = useLanguageStore();
  const [formTitle, setFormTitle] = useState<string | undefined>();
  const [formSubtitle, setFormSubtitle] = useState<string | undefined>();

  useEffect(() => {
    const fetchContactsPage = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/pages/contacts`, {
          headers: {
            "Content-Type": "application/json",
            "X-Language": currentLocale,
          },
        });
        const data = res.data?.data?.content?.form?.data;
        setFormTitle(data?.title);
        setFormSubtitle(data?.subtitle);
      } catch (err) {
        console.error("Failed to load contacts page data", err);
      }
    };

    fetchContactsPage();
  }, [currentLocale]);

  return (
    <main>
      <ContactForm title={formTitle} subtitle={formSubtitle} />
      <ContactInfo />
    </main>
  );
}
