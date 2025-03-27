'use client';

import TopPopUp from './topPopUp';
import NavbarLanding from '@/components/Header/Navbar/NavbarLanding';
import NavbarInternal from '@/components/Header/NavbarInternal/NavbarInternal';
import { useSession } from 'next-auth/react';

export function TopMenu() {
  const { data: session, status } = useSession();

  // Hasta aca, sacado de MUI

  return (
    <main className={`sticky top-0 z-[1000] flex flex-col bg-white shadow-md dark:bg-lightText`}>
      <TopPopUp />
      <NavbarLanding />
    </main>
  );
}
