import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import SolicitudIcon from '@/components/icons-internal/icons-desktop/solicitud/SolicitudIcon';
import HistorialIcon from '@/components/icons-internal/icons-desktop/historial/HistorialIcon';
import PlusRewardsIcon from '@/components/icons-internal/icons-desktop/PlusRewards/PlusRewardsIcon';
import CuentasAsociadasIcon from '@/components/icons-internal/icons-desktop/CuentasAsociadas/CuentasAsociadasIcon';
import CentroDeAyudaIcon from '@/components/icons-internal/icons-desktop/CentroDeAyuda/CentroDeAyudaIcon';
import CerrarSesion from '@/components/icons-internal/CerrarSesion/CerrarSesion';
import { signOut } from 'next-auth/react';
import IconsTablet from '@/components/icons-internal/icons-tablet/IconsTablet';
import { Drawer } from 'flowbite-react';

import Link from 'next/link';
import PerfilIcon from '@/components/icons-internal/icons-desktop/perfil/PerfilIcon';
import { usePathname } from 'next/navigation';

enum ActiveTab {
  SOLICITUD = 'solicitud',
  HISTORIAL = 'historial',
  PLUSREWARDS = 'plus-rewards',
  CUENTASASOCIADAS = 'cuentas',
  CENTRODEAYUDA = 'ayuda',
}

export default function NavMenuDesplegableTablet() {
  const { isDark } = useDarkTheme();
  const [drawerMenu, setDrawerMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeDrawerMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setDrawerMenu(false);
      setIsClosing(false);
    }, 400);
  };
  const pathname = usePathname();
  const isActive = pathname.split('/')[3];

  return (
    <div>
      <div
        onClick={() => setDrawerMenu(true)}
        className={`hidden items-center ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'} h-full pr-10 md-phone:flex xl-desktop:hidden`}
      >
        <GiHamburgerMenu className="size-8 text-white dark:text-black" />
      </div>

      {drawerMenu && (
        <Drawer
          open={drawerMenu}
          onClose={closeDrawerMenu}
          position="right"
          className={`duration-400 mt-[4.5rem] w-40 transform overflow-visible bg-transparent p-0 transition-all ease-in-out dark:bg-transparent ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        >
          <Drawer.Items>
            <div
              className={`${isDark ? 'bg-[#EBE7E0]' : 'bg-nav-blue'} absolute mt-14 flex h-[35.21rem] w-40 flex-col items-end justify-between overflow-visible rounded-l-3xl`}
            >
              <div className="max-w-56 pr-5 pt-7">
                <Link href="/es/auth/perfil" onClick={() => closeDrawerMenu()}>
                  {isActive === 'perfil' ? (
                    <IconsTablet classname={`${isActive === 'perfil' ? 'w-44' : ''} justify-between`} text="Perfil">
                      <PerfilIcon />
                    </IconsTablet>
                  ) : (
                    <PerfilIcon classname="flex justify-end" />
                  )}
                </Link>
                <Link href={'/es/auth/solicitud'} onClick={() => closeDrawerMenu()}>
                  {isActive === ActiveTab.SOLICITUD ? (
                    <IconsTablet
                      classname={`${isActive === ActiveTab.SOLICITUD ? 'w-44' : ''} justify-between`}
                      text="Solicitud"
                    >
                      <SolicitudIcon />
                    </IconsTablet>
                  ) : (
                    <SolicitudIcon classname="flex justify-end" />
                  )}
                </Link>
                <Link href={'/es/auth/historial'} onClick={() => closeDrawerMenu()}>
                  {isActive === ActiveTab.HISTORIAL ? (
                    <IconsTablet
                      classname={`${isActive === ActiveTab.HISTORIAL ? 'w-44' : ''} justify-between`}
                      text="Historial"
                    >
                      <HistorialIcon />
                    </IconsTablet>
                  ) : (
                    <HistorialIcon classname="flex justify-end" />
                  )}
                </Link>
                <Link href={'/es/auth/plus-rewards'} onClick={() => closeDrawerMenu()}>
                  {isActive === ActiveTab.PLUSREWARDS ? (
                    <IconsTablet
                      classname={`${isActive === ActiveTab.PLUSREWARDS ? 'w-44' : ''} justify-between`}
                      text="Plus Rewards"
                    >
                      <PlusRewardsIcon />
                    </IconsTablet>
                  ) : (
                    <PlusRewardsIcon classname="flex justify-end" />
                  )}
                </Link>
                <Link href={'/es/auth/cuentas'} onClick={() => closeDrawerMenu()}>
                  {isActive === ActiveTab.CUENTASASOCIADAS ? (
                    <IconsTablet
                      classname={`${isActive === ActiveTab.CUENTASASOCIADAS ? 'w-44' : ''} justify-between`}
                      text="Cuentas"
                    >
                      <CuentasAsociadasIcon />
                    </IconsTablet>
                  ) : (
                    <CuentasAsociadasIcon classname="flex justify-end" />
                  )}
                </Link>
                <Link href={'/es/auth/centro-de-ayuda'} onClick={() => closeDrawerMenu()}>
                  {isActive === ActiveTab.CENTRODEAYUDA ? (
                    <IconsTablet
                      classname={`${isActive === ActiveTab.CENTRODEAYUDA ? 'w-44' : ''} justify-between`}
                      text="Ayuda"
                    >
                      <CentroDeAyudaIcon />
                    </IconsTablet>
                  ) : (
                    <CentroDeAyudaIcon classname="flex justify-end" />
                  )}
                </Link>
              </div>
              <div onClick={() => signOut()} className="mb-7 self-center hover:animate-pulse">
                <CerrarSesion />
              </div>
            </div>
          </Drawer.Items>
        </Drawer>
      )}
    </div>
  );
}
