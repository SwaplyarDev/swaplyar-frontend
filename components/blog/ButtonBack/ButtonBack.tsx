'use client';

import { useRouter } from 'next/navigation';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import clsx from 'clsx';
export default function ButtonBack() {
  const router = useRouter();
  const { isDark } = useDarkTheme();
  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className={
        window.innerWidth > 768
          ? clsx(
              isDark ? 'buttonSecondDark' : 'buttonSecond',
              'mt-2 w-full max-w-[100px] rounded-full bg-custom-blue-800 px-[14px] py-3 font-titleFont text-base font-semibold text-custom-whiteD disabled:bg-custom-blue-300 dark:bg-custom-whiteD dark:text-custom-grayD dark:disabled:bg-custom-grayD-500 dark:disabled:text-custom-whiteD',
            )
          : clsx(
              isDark ? 'buttonSecondDark' : 'buttonSecond',
              'mt-1 w-full max-w-[50px] rounded-full bg-custom-blue-800 px-[10px] py-3 font-titleFont text-base font-semibold text-custom-whiteD disabled:bg-custom-blue-300 dark:bg-custom-whiteD dark:text-custom-grayD dark:disabled:bg-custom-grayD-500 dark:disabled:text-custom-whiteD',
            )
      }
    >
      {window.innerWidth > 768 ? '← Volver' : '←'}
    </button>
  );
}
