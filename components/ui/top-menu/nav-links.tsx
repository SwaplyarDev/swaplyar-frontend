'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import useStore from '@/store/authViewStore';

export const Links = [
  { name: 'Quienes Somos', href: '/info/about-us' },
  { name: 'Como Usar SwaplyAr', href: '/info/how-to-use' },
  { name: 'Programa de Fidelización', href: '/info/loyalty-program' },
];

export default function NavLinks() {
  const { setView } = useStore();
  const [currentView, setCurrentView] = useState<string | null>(null);

  const pathname = usePathname();

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
          className={`relative m-1 flex h-[48px] items-center gap-2 text-buttonsLigth transition-transform duration-300 ease-in-out hover:scale-105 hover:text-blue-700 dark:text-sky-500 dark:hover:text-sky-600 ${
            pathname === link.href && pathname !== '/auth/login-register'
              ? 'font-bold after:absolute after:bottom-3 after:left-0 after:h-[1px] after:w-full after:bg-buttonsLigth after:content-[""] dark:decoration-sky-500'
              : ''
          } `}
        >
          <p className={`hidden md:block ${link.name === 'Login' || link.name === 'Register' ? 'font-bold' : ''}`}>
            {link.name}
          </p>
        </Link>
      ))}
    </>
  );
}
