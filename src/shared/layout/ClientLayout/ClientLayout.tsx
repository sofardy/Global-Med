'use client';

import { usePathname } from 'next/navigation';
import { TopBar } from '../TopBar/TopBar';
import { Footer } from '../Footer/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Route } from '../../config/routes';

interface ClientLayoutProps {
  children: React.ReactNode;
  routes: Route[];
}

export default function ClientLayout({ children, routes }: ClientLayoutProps) {
  const pathname = usePathname();
  
  // Проверяем, нужно ли скрыть хедер и футер
  const hideHeaderFooter = pathname?.startsWith('/account');
  
  return (
    <div className="mx-auto max-w-8xl p-4">
      {!hideHeaderFooter && (
        <header id="page-header">
          <TopBar routes={routes} />
        </header>
      )}
      
      {!hideHeaderFooter && <Breadcrumbs />}
      
      <main className="min-h-screen">
        {children}
      </main>
      
      {/* {!hideHeaderFooter && <ThemeToggle />} */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}