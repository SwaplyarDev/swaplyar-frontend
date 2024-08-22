'use client';

import useStore from '@/store/store';
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
  { name: 'Iniciar sesión', href: '/auth/login-register' },
  { name: 'Registrarse', href: '/auth/login-register' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { setView } = useStore();

  return (
    <>
      {Links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={
            link.name === 'Iniciar sesión'
              ? () => setView('login')
              : link.name === 'Registrarse'
                ? () => setView('register')
                : undefined
          }
          className={`relative flex h-[48px] items-center gap-2 rounded-md p-3 text-blue-700 ${pathname === link.href ? 'underline decoration-blue-700 dark:decoration-white' : ''} m-1 transition-colors duration-300 ease-in-out hover:shadow-custom hover:filter dark:text-gray-300 dark:hover:bg-gray-700`}
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
