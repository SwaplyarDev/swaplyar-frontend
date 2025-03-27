'use client';

import TopPopUp from './topPopUp';
import NavbarLanding from '@/components/Header/Navbar/NavbarLanding';

export function TopMenu() {
  return (
    <main className={`sticky top-0 z-[1000] flex flex-col bg-white shadow-md dark:bg-lightText`}>
      <TopPopUp />
      <NavbarLanding />
    </main>
  );
}
