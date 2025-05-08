import React from 'react';

import CerrarSesion from '@/components/icons-internal/CerrarSesion/CerrarSesion';
import NavIconos from './NavIconos';
import { signOut, useSession } from 'next-auth/react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import NavFotoDePerfil from './NavFotoDePerfil';
import NavMenuDesplegableTablet from './NavMenuDesplegableTablet';
import NavNombreDeUsuario from './NavNombreDeUsuario';

export default function NavInferiorBarInternal() {
  const { isDark } = useDarkTheme();

  const { data: session } = useSession();

  if (!session) return false;

  return (
    <div className="flex w-full gap-0">
      {/* Lateral izquierdo */}
      <span
        className={`w-7 xl-nav:pr-7 xl-blue-nav:flex-1 xl-blue-nav:pr-12 ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}
      ></span>

      {/* Centro */}

      <div className="mx-auto flex w-full items-center gap-0 xl-blue-nav:max-w-[81.25rem]">
        <div className="relative flex w-full flex-row justify-between">
          <NavFotoDePerfil />
          <NavNombreDeUsuario />
          <NavMenuDesplegableTablet />
          <span className="hidden xl-desktop:block">
            <NavIconos />
          </span>
          <button onClick={() => signOut()} className="h-16 self-end md-phone:hidden xl-desktop:block">
            <CerrarSesion />
          </button>
        </div>
      </div>

      {/* Lateral derecho */}

      <span
        className={`w-7 sm-tablet2:hidden md:block xl-nav:flex-1 ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}
      ></span>
    </div>
  );
}
