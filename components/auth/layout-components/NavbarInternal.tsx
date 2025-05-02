'use client';
import { SwaplyArLogoComplete, SwaplyArLogoSolo, SwaplyArlogoWhite } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import { useState } from 'react';
import { SwaplyArlogoMobileWhite, swaplyArAvatar } from '@/utils/assets/img-database';
import { Drawer } from 'flowbite-react';
import Switch from '@/components/ui/top-menu/switch';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import CerrarSesion from '@/components/icons-internal/CerrarSesion/CerrarSesion';
import SolicitudIcon from '@/components/icons-internal/icons-desktop/solicitud/SolicitudIcon';
import HistorialIcon from '@/components/icons-internal/icons-desktop/historial/HistorialIcon';
import PlusRewardsIcon from '@/components/icons-internal/icons-desktop/PlusRewards/PlusRewardsIcon';
import CuentasAsociadasIcon from '@/components/icons-internal/icons-desktop/CuentasAsociadas/CuentasAsociadasIcon';
import CentroDeAyudaIcon from '@/components/icons-internal/icons-desktop/CentroDeAyuda/CentroDeAyudaIcon';
import { GiHamburgerMenu } from 'react-icons/gi';
import IconsTablet from '@/components/icons-internal/icons-tablet/IconsTablet';
import { ActiveTab, NavIcons } from './NavIcons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PerfilIcon from '@/components/icons-internal/icons-desktop/perfil/PerfilIcon';

import Iconos from './Iconos';
import { signOut, useSession } from 'next-auth/react';
import NavSuperiorBarInternal from './NavSuperiorBarInternal';

const isAdmin = true;

const NavbarInternal = () => {
  const { isDark } = useDarkTheme();
  const pathname = usePathname();
  const [drawerMenu, setDrawerMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mostrarModalPerfil, setMostrarModalPerfil] = useState(false);
  const { data: session, status } = useSession();
  console.log('session', session?.user);

  const closeDrawerMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setDrawerMenu(false);
      setIsClosing(false);
    }, 400);
  };

  const isActive = pathname.split('/')[3];

  // className="mx-auto flex min-w-[340px] flex-col justify-center xs:min-w-[480px] sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px] xl:min-w-[1280px]"

  return (
    <header className={`sticky top-0 z-40 h-[134px] w-full`}>
      <div className="mx-auto flex flex-col justify-center">
        <NavSuperiorBarInternal />

        {/* Parte de abajo azul */}

        {/* Lateral izquierdo */}
        <div className="flex w-full">
          <span
            className={`w-7 xl-nav:pr-7 xl-blue-nav:flex-1 xl-blue-nav:pr-12 ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}
          ></span>

          {/* Centro */}

          <div className="mx-auto flex w-full items-center xl-blue-nav:max-w-[81.25rem]">
            {/* Contenido principal (perfil, etc.) */}

            <div className="relative flex w-full flex-row justify-between">
              <div className={`mask-nav h-16 w-[128px] self-start ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}></div>
              <Link
                href={'#'}
                // href="/es/auth/perfil"
                onClick={() => {
                  setMostrarModalPerfil(!mostrarModalPerfil);
                }}
                className={`${isActive === 'perfil' ? 'bg-gradient-to-t' : ''} absolute left-4 top-2 h-24 w-24 rounded-full from-[#98cf09] via-[#B614FF] to-[#092993] hover:bg-gradient-to-t sm-tablet2:p-[4px]`}
              >
                {/* Imagen de perfil */}
                <Image
                  src={swaplyArAvatar}
                  alt="Foto perfil Usuario"
                  width={100}
                  height={100}
                  className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-lightText"
                />
              </Link>
              <div
                className={`absolute ${isAdmin && mostrarModalPerfil ? 'flex flex-col items-start justify-around' : 'hidden'} ${isDark ? 'text-[#252526]' : 'text-white'} ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'} left-4 top-28 h-20 whitespace-nowrap rounded-br-3xl rounded-tr-3xl border-2 border-[#EBE7E0] pl-2 pr-4 text-lg font-semibold`}
              >
                <Link href={'/es/auth/perfil'}>Ver perfil</Link>
                <Link href={'#'}>Ver admin</Link>
              </div>
              <div className={`flex-1 ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'} flex w-full items-center`}>
                <p className="hidden whitespace-nowrap font-sans text-white dark:text-black sm-tablet2:block">
                  Nombre Usuario
                </p>
              </div>
              <div
                onClick={() => setDrawerMenu(true)}
                className={`hidden items-center ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'} pr-10 md-phone:flex xl-desktop:hidden`}
              >
                <GiHamburgerMenu className="size-8 text-white dark:text-black" />
              </div>
              {/* Menu desplegable tablet */}
              {drawerMenu && (
                <Drawer
                  open={drawerMenu}
                  onClose={closeDrawerMenu}
                  position="right"
                  className={`duration-400 mt-[4.5rem] w-40 transform overflow-visible bg-transparent p-0 transition-all ease-in-out dark:bg-transparent ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                >
                  <Drawer.Items>
                    <div
                      className={`${isDark ? 'bg-[#EBE7E0]' : 'bg-nav-blue'} absolute mt-14 flex h-[500px] w-40 flex-col items-end justify-between overflow-visible rounded-l-3xl`}
                    >
                      <div className="max-w-56 pr-5 pt-7">
                        <Link href="/es/auth/perfil" onClick={() => closeDrawerMenu()}>
                          {isActive === 'perfil' ? (
                            <IconsTablet
                              classname={`${isActive === 'perfil' ? 'w-44' : ''} justify-between`}
                              text="Perfil"
                            >
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
                        <Link href={'/es/auth/ayuda'} onClick={() => closeDrawerMenu()}>
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
              )}{' '}
              <span className="hidden xl-desktop:block">
                <Iconos />
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
      </div>
    </header>
  );
};

export default NavbarInternal;
