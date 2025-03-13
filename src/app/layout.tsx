import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../shared/components/ThemeProvider';
import { TopBar } from '../shared/components/TopBar/TopBar';
import { routes } from '../shared/config/routes';

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
          <TopBar routes={routes} />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}