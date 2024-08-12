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
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-1 mr-7">
        {Links.slice(0, -2).map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`relative flex h-[48px] items-center  rounded-md
              ${pathname === link.href ? 'bg-gray-500 text-white border-2 border-sky-200' : 'text-gray-900'}
              dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700
             text-nav-blue hover:shadow-sm hover:underline
              transition-colors duration-300 ease-in-out
              m-2
            `}
            style={{  fontSize: '16px' }}
          >
            <p className="hidden md:block">
              {link.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex gap-3 ml-20"> 
        {Links.slice(-2).map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`relative flex h-[48px] items-center gap-0 rounded-md 
              ${pathname === link.href ? 'bg-gray-500 text-white border-2 border-sky-200' : 'text-gray-900'}
              dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700
              text-nav-blue  hover:shadow-sm hover:underline
              transition-colors duration-300 ease-in-out
              m-1
            `}
            style={{ fontSize: '16px' }}
          >
            <p className="hidden md:block">
              {link.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
