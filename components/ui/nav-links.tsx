'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Links = [
  { name: 'Quienes Somos', href: '/info/about-us' },
  { name: 'Como Usar Swaplyar', href: '/info/how-to-use' },
  { name: 'Programa de Fidelizacion', href: '/info/loyalty-program' },
  { name: 'Iniciar sesión', href: '/auth/login' },
  { name: 'Registrarse', href: '/auth/new-account' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {Links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`relative flex h-[48px] items-center gap-2 rounded-md p-3 
            ${pathname === link.href ? 'bg-gray-500 text-white border-2 border-sky-200' : 'text-gray-900'}
            dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700
            hover:bg-gray-600 hover:text-white hover:shadow-sm
            transition-colors duration-300 ease-in-out
            m-1
          `}
        >
          <p className={`hidden md:block ${link.name === 'Login' || link.name === 'Register' ? 'font-bold' : ''}`}>
            {link.name}
          </p>
        </Link>
      ))}
    </>
  );
}
