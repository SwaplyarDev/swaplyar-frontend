'use client';

import { useRouter } from 'next/navigation';

export default function ButtonBack() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="dark:hover:bg-calculatorDark3 pointer-events-auto flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-darkText dark:bg-calculatorDark2 dark:text-lightText"
    >
      ← Volver
    </button>
  );
}
