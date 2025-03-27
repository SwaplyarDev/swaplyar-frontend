'use client';

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

export function VerifyButton() {
  const { isDark } = useDarkTheme();

  return (
    <button
      className={`relative mt-4 h-[48px] w-full max-w-[280px] items-center justify-center rounded-3xl border ${
        isDark ? 'border-darkText bg-darkText text-lightText' : 'border-buttonsLigth bg-buttonsLigth text-white'
      } px-[14px] py-3 font-titleFont font-semibold transition-opacity hover:opacity-90`}
    >
      Verificar ahora
    </button>
  );
}
