'use client';

import useStore from '@/store/authViewStore';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export const Links = [
  { name: 'Quienes Somos', href: '/info/about-us' },
  { name: 'Como Usar Swaplyar', href: '/info/how-to-use' },
  { name: 'Programa de Fidelizacion', href: '/info/loyalty-program' },
  { name: 'Iniciar sesión', href: '/auth/login-register' },
  { name: 'Registrarse', href: '/auth/login-register' },
];

export default function NavLinks() {
  const { setView } = useStore();

  const [currentView, setCurrentView] = useState<string | null>(null);

  const handleLogView = (view: string) => {
    if (view === 'Iniciar sesión' || view === 'Registrarse') {
      view === 'Iniciar sesión' ? setView('login') : setView('register');
    }
    setCurrentView(view);
    sessionStorage.setItem('currentView', view);
  };

  useEffect(() => {
    const storage = sessionStorage.getItem('currentView');
    setCurrentView(storage);
  }, []);

  return (
    <>
      {Links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={() => handleLogView(link.name)}
          className={`relative m-1 flex h-[48px] items-center gap-2 p-3 transition-transform ease-in-out duration-300 hover:scale-105 ${
            currentView === link.name
              ? link.name === 'Registrarse'
                ? 'underline decoration-darkText dark:decoration-lightText'
                : 'underline decoration-lightText dark:decoration-darkText'
              : ''
          } ${
            link.name !== 'Iniciar sesión' && link.name !== 'Registrarse'
              ? ''
              : link.name === 'Iniciar sesión'
                ? 'rounded-3xl border border-lightText dark:border-darkText'
                : 'rounded-3xl border border-lightText bg-lightText text-darkText dark:bg-darkText dark:text-lightText dark:border-darkText'
          } `}
        >
          <p
            className={`hidden md:block ${link.name === 'Login' || link.name === 'Register' ? 'font-bold' : ''}`}
          >
            {link.name}
          </p>
        </Link>
      ))}
    </>
  );
}
