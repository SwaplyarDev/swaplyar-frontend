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
        className={`relative m-1 hidden h-[48px] w-36 items-center justify-center rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth dark:border-darkText md:flex ${style.buttonLight} ${pathname === '/auth/login-register' && view === 'login' ? 'underline decoration-buttonsLigth dark:decoration-darkText' : ''} `}
      >
        <span className="font-bold">Iniciar sesión</span>
        <span></span>
      </Link>
    </>
  );
}

export default LogInButton;
