"use client";

import { useLanguageStore } from "@/src/store/language";
import { usePathname } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Route } from "../../config/routes";
import { Footer } from "../Footer/Footer";
import { TopBar } from "../TopBar/TopBar";

interface ClientLayoutProps {
  children: React.ReactNode;
  routes: Route[];
}

export default function ClientLayout({ children, routes }: ClientLayoutProps) {
  const pathname = usePathname();
  const { currentLocale }: any = useLanguageStore();

  const hideHeaderFooter = pathname?.startsWith("/account");

  return (
    <div className="mx-auto max-w-8xl p-4">
      {!hideHeaderFooter && (
        <header id="page-header">
          <TopBar routes={routes} />
        </header>
      )}

      {!hideHeaderFooter && (
        <Breadcrumbs locale={currentLocale} routes={routes} />
      )}

      <main className="min-h-screen pt-4">{children}</main>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
