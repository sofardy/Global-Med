import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../shared/components/ThemeProvider';
import { LanguageProvider } from '../shared/components/LanguageProvider';
import { TopBar } from '../shared/layout/TopBar/TopBar';
import { routes } from '../shared/config/routes';
import { FloatingComponents } from '../shared/components/FloatingComponents';

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
      <body className={`${inter.className} bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="mx-auto max-w-8xl p-4">
              <TopBar routes={routes} />
              <main className="min-h-screen">
                {children}
              </main>
            </div>
            <FloatingComponents />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}