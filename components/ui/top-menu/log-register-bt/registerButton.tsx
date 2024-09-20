'use client';
import useStore from '@/store/authViewStore';
import Link from 'next/link';

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

function RegisterButton() {
  const { setView } = useStore();
  const { isDark } = useDarkTheme();
  return (
    <>
      <Link
        href="/auth/login-register"
        onClick={() => setView('register')}
        className={`relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
      >
        <p className="font-bold">Registrarse</p>
      </Link>
    </>
  );
}

export default RegisterButton;
