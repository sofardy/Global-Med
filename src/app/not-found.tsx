import Link from 'next/link';

export const metadata = {
  title: 'Страница не найдена | Global Medical Center',
  description: 'Запрашиваемая страница не найдена',
};

export default function NotFound() {
  return (
    <div className="container min-h-screen flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl md:text-6xl font-medium text-light-text dark:text-dark-text mb-6">404</h1>
      <h2 className="text-xl md:text-3xl font-medium text-light-text dark:text-dark-text mb-6">Страница не найдена</h2>
      <p className="text-lg text-light-text/80 dark:text-dark-text/80 mb-10 text-center max-w-md">
        Неправильно набран адрес или такой страницы больше нет
      </p>
      <Link href="/" className="px-6 py-3 bg-light-accent text-white rounded-xl hover:bg-light-accent/90 transition-colors">
        Вернуться на главную
      </Link>
    </div>
  );
}