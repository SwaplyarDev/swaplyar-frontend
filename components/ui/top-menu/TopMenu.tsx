'use client';

import { usePathname } from 'next/navigation';
import TopPopUp from './topPopUp';
import NavbarLanding from '@/components/Header/Navbar/NavbarLanding';

export function TopMenu() {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes('/admin');

  return (
    <main
      className={`sticky top-0 z-[1000] flex flex-col bg-white shadow-md dark:bg-lightText ${isAdminPage && 'hidden'}`}
    >
      <TopPopUp />
      <NavbarLanding />
    </main>
  );
}
