// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../shared/components/ThemeProvider';
import { LanguageProvider } from '../shared/components/LanguageProvider';
import { routes } from '../shared/config/routes';
import { FloatingComponents } from '../shared/components/FloatingComponents';
import { PageTransition } from '../shared/components/PageTransition';
import ClientLayout from '../shared/layout/ClientLayout/ClientLayout';
import AmoCrmScript from "../shared/components/AmoCrmScript";
const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Global Medical Center',
  description: 'Медицинский центр с широким спектром услуг',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="ru" suppressHydrationWarning>
          <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        </head>
      <body className={`${inter.className} bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text`}>
        <ThemeProvider>
          <LanguageProvider>
            <PageTransition />
            <ClientLayout routes={routes}>
              {children}
            </ClientLayout>
            <FloatingComponents />
            <AmoCrmScript />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}