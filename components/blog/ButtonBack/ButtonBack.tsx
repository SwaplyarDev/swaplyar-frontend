'use client';

import { useRouter } from 'next/navigation';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';

export default function ButtonBack() {
  const router = useRouter();
  const { isDark } = useDarkTheme();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className={clsx(
        'group relative mt-2 flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors duration-300',
        '-ml-4 md:-ml-4 lg:-ml-2',
        isDark ? 'text-gray-200' : 'text-gray-700 hover:text-[#0A2A83]',
      )}
      aria-label="Volver"
    >
      <span
        className={clsx(
          'pointer-events-none absolute h-[40px] w-[40px] rounded-full border-r-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          isDark ? 'border-r-white' : 'border-r-[#0A2A83]',
        )}
      />
      <ChevronLeft size={28} strokeWidth={2.5} className="relative z-10" />
    </button>
  );
}
