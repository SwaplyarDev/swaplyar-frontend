'use client';
import useStore from '@/store/authViewStore';
import Link from 'next/link';
import style from './logInButtonAnimation.module.css';

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

function LogInButton() {
  const { setView } = useStore();
  const { isDark } = useDarkTheme();

  return (
    <>
      <Link
        href="/auth/login-register"
        onClick={() => setView('login')}
        className={`relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth dark:border-darkText dark:text-darkText ${isDark? style.buttonDark : style.buttonLight} `}
      >
        <p className="font-bold">Iniciar sesión</p>
      </Link>
    </>
  );
}

export default LogInButton;
