'use client'

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Links = [
  { name: 'Quienes Somos', 
    href: '/info/about-us', 
    // icon: HomeIcon 
  },
  {
    name: 'Como Usar Swaplyar',
    href: '/info/how-to-use',
    // icon: DocumentDuplicateIcon,
  },
  { 
    name: 'Programa de Fidelizacion', 
    href: '/info/loyalty-program', 
    // icon: UserGroupIcon 
  },
  { 
    name: 'login', 
    href: '/auth/login', 
    // icon: UserGroupIcon 
  },
  { 
    name: 'register', 
    href: '/auth/new-account', 
    // icon: UserGroupIcon 
  },
];

export default function NavLinks() {
  const pathname = usePathname()
  return (
    <>
      {Links.map((link) => (
      
        <Link
          key={link.name}
          href={link.href}
          className={`flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-gray-500 hover:text-white
            ${pathname === link.href ? 'bg-gray-500 text-white border-2 border-sky-200' : 'text-gray-900'}
            dark:text-gray-300 dark:hover:bg-gray-700 dark:bg-gray-800
          `}
        >
          <p className="hidden md:block">{link.name}</p>
        </Link>
      ))}
    </>
  );
}
