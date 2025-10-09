'use client';

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useRouter } from 'next/navigation';

export function VerifyButton() {
  const { isDark } = useDarkTheme();
  const router = useRouter();

  return (
    <button
    //boton de redireccion a es/auth/plus-rewards
      onClick={() => {
        router.push('/es/auth/plus-rewards');
      }}
      className={`relative max-w-[280px] items-center justify-center rounded-3xl border ${
        isDark ? 'border-darkText bg-darkText text-lightText' : 'border-buttonsLigth bg-buttonsLigth text-white'
      } px-[34px] py-2 font-titleFont font-semibold transition-opacity hover:opacity-90`}
    >
      Verificar ahora
    </button>
  );
}
