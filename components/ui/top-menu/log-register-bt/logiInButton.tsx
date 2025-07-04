'use client';
import useStore from '@/store/authViewStore';
import Link from 'next/link';

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

function LogInButton() {
  const { setView } = useStore();
  const { isDark } = useDarkTheme();

  return (
    <>
      <Link
        href="/es/iniciar-sesion-o-registro"
        onClick={() => setView('login')}
        className={`relative flex h-[48px] w-[200px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 font-titleFont font-semibold text-buttonsLigth dark:border-darkText dark:text-darkText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} lg2:w-[130px]`}
      >
        Iniciar sesión
      </Link>
    </>
  );
}

export default LogInButton;
