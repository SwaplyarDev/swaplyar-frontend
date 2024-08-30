'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useStore from '@/store/authViewStore';

export const Links = [
  { name: 'Quienes Somos', href: '/info/about-us' },
  { name: 'Como Usar Swaplyar', href: '/info/how-to-use' },
  { name: 'Programa de Fidelizacion', href: '/info/loyalty-program' },
  { name: 'Iniciar sesión', href: '/auth/login' },
  { name: 'Registrarse', href: '/auth/new-account' },
];

export default function NavLinks() {
  const pathname = usePathname();
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
    <div className="box-border flex w-full items-center justify-between pb-3">
      <div className="mr-7 flex gap-1">
        {Links.slice(0, -2).map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`relative flex h-[48px] items-center rounded-md ${pathname === link.href ? 'border-2 border-sky-200 bg-gray-500 text-white' : 'text-gray-900'} m-2 text-nav-blue transition-colors duration-300 ease-in-out hover:underline hover:shadow-sm dark:text-white dark:hover:bg-gray-700`}
            style={{ fontSize: '16px' }}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        ))}
      </div>
      <div className="ml-20 flex gap-3">
        {Links.slice(-2).map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => handleLogView(link.name)}
            className={`relative flex h-[48px] items-center gap-0 rounded-md ${pathname === link.href ? 'border-2 border-sky-200 bg-gray-500 text-white' : 'text-gray-900'} m-1 text-nav-blue transition-colors duration-300 ease-in-out hover:underline hover:shadow-sm dark:text-white dark:hover:bg-gray-700`}
            style={{ fontSize: '16px' }}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

//hover:drop-shadow-light dark:hover:drop-shadow-dark

//hover:text-shadow-light dark:hover:text-shadow-dark
