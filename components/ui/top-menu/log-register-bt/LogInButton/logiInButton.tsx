'use client';
import useStore from '@/store/authViewStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from './logInButtonAnimation.module.css';

function LogInButton() {
  const { setView, view } = useStore();
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/auth/login-register"
        onClick={() => setView('login')}
        className={`relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth dark:border-darkText ${style.buttonLight} ${pathname === '/auth/login-register' && view === 'login' ? 'underline decoration-buttonsLigth dark:decoration-darkText' : ''} `}
      >
        <p className="font-bold">Iniciar sesión</p>
      </Link>
    </>
  );
}

export default LogInButton;
