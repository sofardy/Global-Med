'use client';

import PatientLogin from '@/src/shared/components/PatientLogin';
import AccountHeader from '@/src/shared/layout/AccountHeader/AccountHeader';
import React, { useEffect } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AccountLogin() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Если пользователь уже авторизован, перенаправляем в личный кабинет
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/account');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg">
      <AccountHeader />
      <main className="flex-1">
        <PatientLogin />
      </main>
    </div>
  );
}