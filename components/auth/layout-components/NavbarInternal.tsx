'use client';
import {
  SwaplyArLogoComplete,
  SwaplyArLogoSolo,
  SwaplyArlogoWhite,
  SwaplyArlogoMobileWhite,
  swaplyArAvatar,
} from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import { useState } from 'react';
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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PerfilIcon from '@/components/icons-internal/icons-desktop/perfil/PerfilIcon';
import { signOut, useSession } from 'next-auth/react';
import { ActiveTab, NavIcons } from './NavIcons';

const NavbarInternal = () => {
  const { isDark, mounted } = useDarkTheme();
  const [showNavbar, setShowNavbar] = useState(false);
  const pathname = usePathname();
  const [drawerMenu, setDrawerMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { data: session } = useSession();

  const closeDrawerMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setDrawerMenu(false);
      setIsClosing(false);
    }, 400);
  };

  const isActive = pathname.split('/')[3];

  if (!mounted) {
    return (
      <div
        className="sticky top-0 z-[1000] w-full"
        style={{
          backgroundColor: 'inherit',
          visibility: 'hidden',
          height: '128px',
        }}
      />
    );
  }

  return (
    <header className="sticky top-0 z-[1000] w-full bg-white dark:bg-lightText">
      <div className="max-width-screen mx-auto md:max-w-[1300px]">
        <div className="flex h-16 items-center justify-around mini-phone:mx-8 mini-phone:justify-between xs:mx-10 md:mx-20">
          <Link href="/es/auth/solicitud">
            <Image
              src={isDark ? SwaplyArlogoMobileWhite : SwaplyArLogoComplete}
              className="hidden max-h-14 w-full max-w-14 mini-phone:block mini-phone:max-w-[200px]"
              alt="Cambiar saldo online"
              width={200}
              height={80}
            />
            <Image
              src={isDark ? SwaplyArlogoWhite : SwaplyArLogoSolo}
              className="max-h-14 w-full max-w-14 mini-phone:hidden"
              alt="Cambiar saldo online"
              width={200}
              height={80}
            />
          </Link>
          <div>
            <Switch />
          </div>
        </div>
      </div>

      <div className="bg-nav-blue dark:bg-white">
        <div className="flex h-16 flex-grow xs:px-0 md:justify-between md:px-20">
          <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-4">
            <div className={`${isDark ? 'montanaDark' : 'montana'} relative top-1 ml-10 flex h-full w-full xs:ml-0`}>
              <Link
                href="/es/auth/perfil"
                className={`${isActive === 'perfil' ? 'bg-gradient-to-t' : ''} relative left-4 top-1 h-24 w-24 rounded-full from-[#98cf09] via-[#B614FF] to-[#092993] p-[4px] hover:bg-gradient-to-t xs:-left-1 xs:ml-5`}
              >
                <Image
                  src={swaplyArAvatar}
                  alt="Foto perfil Usuario"
                  width={100}
                  height={100}
                  className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-lightText"
                />
              </Link>
              <p className="hidden pl-2 pt-4 font-sans text-white dark:text-black xs:block lg:ml-4 lg:hidden lg2:block">
                {session?.user.fullName}
              </p>
            </div>
            <div className="hidden lg:mr-10 lg:flex lg:max-w-[460px]">
              <NavIcons />
            </div>
            <button onClick={() => signOut()} className="block xs:hidden lg:block">
              <CerrarSesion />
            </button>
            <div onClick={() => setDrawerMenu(true)} className="hidden xs:block xs:pr-10 md:pr-0 lg:hidden">
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
                  <div className="absolute mt-14 flex h-[500px] w-40 flex-col items-end justify-between overflow-visible rounded-l-3xl bg-nav-blue dark:bg-white">
                    <div className="max-w-56 pr-5 pt-7">
                      {/* Links */}
                      <Link href="/es/auth/perfil" onClick={closeDrawerMenu}>
                        {isActive === 'perfil' ? (
                          <IconsTablet classname="w-44 justify-between" text="Perfil">
                            <PerfilIcon />
                          </IconsTablet>
                        ) : (
                          <PerfilIcon classname="flex justify-end" />
                        )}
                      </Link>
                      <Link href={'/es/auth/solicitud'} onClick={closeDrawerMenu}>
                        {isActive === ActiveTab.SOLICITUD ? (
                          <IconsTablet classname="w-44 justify-between" text="Solicitud">
                            <SolicitudIcon />
                          </IconsTablet>
                        ) : (
                          <SolicitudIcon classname="flex justify-end" />
                        )}
                      </Link>
                      <Link href={'/es/auth/historial'} onClick={closeDrawerMenu}>
                        {isActive === ActiveTab.HISTORIAL ? (
                          <IconsTablet classname="w-44 justify-between" text="Historial">
                            <HistorialIcon />
                          </IconsTablet>
                        ) : (
                          <HistorialIcon classname="flex justify-end" />
                        )}
                      </Link>
                      <Link href={'/es/auth/plus-rewards'} onClick={closeDrawerMenu}>
                        {isActive === ActiveTab.PLUSREWARDS ? (
                          <IconsTablet classname="w-44 justify-between" text="Plus Rewards">
                            <PlusRewardsIcon />
                          </IconsTablet>
                        ) : (
                          <PlusRewardsIcon classname="flex justify-end" />
                        )}
                      </Link>
                      <Link href={'/es/auth/cuentas'} onClick={closeDrawerMenu}>
                        {isActive === ActiveTab.CUENTASASOCIADAS ? (
                          <IconsTablet classname="w-44 justify-between" text="Cuentas">
                            <CuentasAsociadasIcon />
                          </IconsTablet>
                        ) : (
                          <CuentasAsociadasIcon classname="flex justify-end" />
                        )}
                      </Link>
                      <Link href={'/es/auth/centro-de-ayuda'} onClick={closeDrawerMenu}>
                        {isActive === ActiveTab.CENTRODEAYUDA ? (
                          <IconsTablet classname="w-44 justify-between" text="Ayuda">
                            <CentroDeAyudaIcon />
                          </IconsTablet>
                        ) : (
                          <CentroDeAyudaIcon classname="flex justify-end" />
                        )}
                      </Link>
                    </div>
                    <button onClick={() => signOut()} className="h-16 xs:hidden lg:block">
                      <CerrarSesion />
                    </button>
                  </div>
                </Drawer.Items>
              </Drawer>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarInternal;
