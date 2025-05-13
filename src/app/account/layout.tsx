'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AccountSidebar from "../../shared/components/AccountSidebar";
import LoginHeader from "@/src/shared/layout/AccountHeader/LoginHeader";
import ProtectedRoute from "@/src/hooks/useProtectedRoute";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  // Если это страница логина, показываем её без защиты
  if (pathname === '/account/login') {
    return <>{children}</>;
  }
  
  // Для всех остальных страниц раздела /account применяем защиту
  return (
    <ProtectedRoute>
      <div>
        <LoginHeader />
        <div className="flex mt-4">
          {!isMobile && <AccountSidebar />}
          <main className={`flex-1 ${!isMobile ? 'ml-6' : 'mx-auto w-full'}`}>
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}