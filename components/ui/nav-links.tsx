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

  const handleLogView = (view : string) => {
    if(view === "Iniciar sesión" || view === "Registrarse"){
        view === 'Iniciar sesión' ? setView('login') : setView('register');
    };
    setCurrentView(view);
    sessionStorage.setItem('currentView', view);
  };

  useEffect(()=>{
    const storage = sessionStorage.getItem('currentView');
    setCurrentView(storage);
  },[])


  return (
    <>
      {Links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={() => handleLogView(link.name)}
          className={`relative flex h-[48px] items-center gap-2 rounded-md p-3 text-blue-700 ${ currentView === link.name ? 'underline decoration-blue-700 dark:decoration-white' : ''} m-1 transition dark:text-gray-300 duration-300 ease-in-out hover:drop-shadow-light dark:hover:drop-shadow-dark  `}
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

//hover:drop-shadow-light dark:hover:drop-shadow-dark

//hover:text-shadow-light dark:hover:text-shadow-dark