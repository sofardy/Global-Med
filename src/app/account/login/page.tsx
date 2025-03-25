'use client';

import PatientLogin from '@/src/shared/components/PatientLogin';
import AccountHeader from '@/src/shared/layout/AccountHeader/AccountHeader';
import React from 'react';

export default function AccountLogin() {
  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg">
      <AccountHeader />
      <main className="flex-1">
        <PatientLogin />
      </main>
    </div>
  );
}