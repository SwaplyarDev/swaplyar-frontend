'use client';
import useStore from '@/store/authViewStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from './registerButton.module.css';

function RegisterButton() {
  const { setView, view } = useStore();
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/auth/login-register"
        onClick={() => setView('register')}
        className={`relative m-1 hidden h-[48px] w-32 items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white dark:border-darkText dark:bg-darkText dark:text-lightText md:flex ${pathname === '/auth/login-register' && view === 'register' ? 'underline decoration-darkText dark:decoration-lightText' : ''} ${style.buttonLight} `}
      >
        <span className="font-bold">Registrarse</span>
        <span></span>
      </Link>
    </>
  );
}

export default RegisterButton;
