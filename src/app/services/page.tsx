'use client';

import { ServiceCardsContainer } from '@/src/shared/components/ServiceCardsContainer';
import React from 'react';

export default function Services() {
  return (
    <main className="container py-10">
      <div className="space-y-12">
        <ServiceCardsContainer type="specialists" />
        <ServiceCardsContainer type="checkups" />
        <ServiceCardsContainer type="analysis" />
      </div>
    </main>
  );
}