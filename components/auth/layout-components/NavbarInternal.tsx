'use client';

import NavSuperiorBarInternal from './NavSuperiorBarInternal';
import NavInferiorBarInternal from './NavInferiorBarInternal';
import { useSession } from 'next-auth/react';
const NavbarInternal = () => {
  const { data: session } = useSession();

  if (!session) return false;

  return (
    <header className={`sticky top-0 z-40 h-[8.375rem] w-full`}>
      <div className="mx-auto flex flex-col justify-center">
        <NavSuperiorBarInternal />
        <NavInferiorBarInternal />
      </div>
    </header>
  );
};

export default NavbarInternal;
