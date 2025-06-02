"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container min-h-screen flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl md:text-6xl font-medium text-light-text dark:text-dark-text mb-6">
        Ошибка
      </h1>
      <p className="text-lg text-light-text/80 dark:text-dark-text/80 mb-10 text-center max-w-md">
        При загрузке страницы произошла ошибка. Пожалуйста, попробуйте обновить
        страницу.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-light-accent text-white rounded-xl hover:bg-light-accent/90 transition-colors"
        >
          Повторить попытку
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-light-text dark:border-dark-text rounded-xl hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
