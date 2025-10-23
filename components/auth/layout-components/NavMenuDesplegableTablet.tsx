import React, { useState } from 'react';
import { Menu } from 'lucide-react';
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

enum ActiveTab {
  PERFIL = 'perfil',
  SOLICITUD = 'solicitud',
  HISTORIAL = 'historial',
  PLUSREWARDS = 'plus-rewards',
  CUENTASASOCIADAS = 'cuentas',
  CENTRODEAYUDA = 'centro-de-ayuda',
}

interface Props {
  isDark: boolean;
  isActive: string;
}

export default function NavMenuDesplegableTablet({isDark, isActive}: Props) {
  const [drawerMenu, setDrawerMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeDrawerMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setDrawerMenu(false);
      setIsClosing(false);
    }, 400);
  };

  const menuItems = [
    {
      key: ActiveTab.PERFIL,
      href: '/es/auth/perfil',
      text: 'Perfil',
      icon: PerfilIcon,
      activeKey: 'perfil',
    },
    {
      key: ActiveTab.SOLICITUD,
      href: '/es/auth/solicitud',
      text: 'Solicitud',
      icon: SolicitudIcon,
      activeKey: ActiveTab.SOLICITUD,
    },
    {
      key: ActiveTab.HISTORIAL,
      href: '/es/auth/historial',
      text: 'Historial',
      icon: HistorialIcon,
      activeKey: ActiveTab.HISTORIAL,
    },
    {
      key: ActiveTab.PLUSREWARDS,
      href: '/es/auth/plus-rewards',
      text: 'Plus Rewards',
      icon: PlusRewardsIcon,
      activeKey: ActiveTab.PLUSREWARDS,
    },
    {
      key: ActiveTab.CUENTASASOCIADAS,
      href: '/es/auth/cuentas',
      text: 'Cuentas',
      icon: CuentasAsociadasIcon,
      activeKey: ActiveTab.CUENTASASOCIADAS,
    },
    {
      key: ActiveTab.CENTRODEAYUDA,
      href: '/es/auth/centro-de-ayuda',
      text: 'Centro de Ayuda',
      icon: CentroDeAyudaIcon,
      activeKey: ActiveTab.CENTRODEAYUDA,
    },
  ];

  return (
    <>
      <div
        onClick={() => setDrawerMenu(true)}
        className={`hidden h-full content-center md-phone:block xs:pr-10 md:pr-0 lg:hidden ${
          isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'
        } -ml-[1px]`}
      >
        <Menu className="size-9 text-white dark:text-black cursor-pointer" />
      </div>

      {drawerMenu && (
        <Drawer
          open={drawerMenu}
          onClose={closeDrawerMenu}
          position="right"
          className={`duration-400 mt-[4.5rem] w-40 transform overflow-visible bg-transparent p-0 transition-all ease-in-out dark:bg-transparent ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Drawer.Items>
            <div
              className={`absolute mt-14 flex h-[500px] w-40 flex-col items-end overflow-visible rounded-l-[48px] ${
                isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'
              } p-6 pt-0 shadow-lg`}
            >
              <div className="max-w-56 w-40 pr-5 pt-7">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isItemActive = isActive === item.activeKey;

                  return (
                    <Link key={item.key} href={item.href} onClick={closeDrawerMenu}>
                      {isItemActive ? (
                        <IconsTablet
                          classname={`w-48 justify-between relative -left-12 flex-row-reverse pl-5 ${
                            isDark ? 'border-custom-grayD' : 'border-custom-whiteD'
                          }`}
                          text={item.text}
                        >
                          <IconComponent />
                        </IconsTablet>
                      ) : (
                        <IconComponent classname="flex justify-end" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={() => signOut()}
                className="hidden h-16 w-full relative mt-auto mb-6 xs:block"
              >
                <CerrarSesion />
              </button>
            </div>
          </Drawer.Items>
        </Drawer>
      )}
    </>
  );
}
