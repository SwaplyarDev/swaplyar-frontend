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
import useWindowWidth from '@/hooks/useWindowWidth';
import { ActiveTab, NavIcons } from './NavIcons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavbarInternal = () => {
  const [drawerMenu, setDrawerMenu] = useState(false);

  const closeDrawerMenu = () => {
    setDrawerMenu(false);
  };

  const windowWidth = useWindowWidth();

  const isMobile = () => {
    if (windowWidth >= 390) return SwaplyArLogoComplete;
    else return SwaplyArLogoSolo;
  };

  const isMobileDark = () => {
    if (windowWidth >= 390) return SwaplyArlogoMobileWhite;
    else return SwaplyArlogoWhite;
  };

  const { isDark } = useDarkTheme();
  const pathname = usePathname();
  const isActive = pathname.split('/')[3];

  return (
    <div>
      <div className="flex h-16 items-center justify-around mini-phone:mx-8 mini-phone:justify-between xs:mx-10 md:mx-20">
        <Image
          src={isDark ? isMobileDark() : isMobile()}
          className="max-h-14 w-full max-w-14 xs-mini-phone:max-h-16 xs-mini-phone:max-w-[200px]"
          alt="Cambiar saldo online"
          width={200}
          height={80}
        />
        <div className="">
          <Switch />
        </div>
      </div>
      <div className={`flex h-16 ${isDark ? 'bg-white' : 'bg-nav-blue'} xs:px-0 md:justify-between md:px-20`}>
        <div className={`relative top-1 ml-10 flex h-full w-full ${isDark ? 'montanaDark' : 'montana'} md:ml-0`}>
          <Link
            href="/es/auth/perfil"
            className="relative left-4 top-1 h-24 w-24 rounded-full from-[#98cf09] via-[#B614FF] to-[#092993] p-[4px] hover:bg-gradient-to-t xs:-left-1 xs:ml-5"
          >
            <Image
              src={swaplyArAvatar}
              alt="Foto perfil Usuario"
              width={100}
              height={100}
              className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-lightText"
            />
          </Link>
          <p className="hidden pl-2 pt-4 font-sans text-white dark:text-black xs:block md:hidden lg:block">
            Nombre Usuario
          </p>
        </div>
        <div className="hidden md:flex">
          <NavIcons />
        </div>
        <button className="block xs:hidden md:block">
          <CerrarSesion />
        </button>
        <div onClick={() => setDrawerMenu(true)} className="hidden xs:block xs:pr-14 xs:pt-3 md:hidden">
          <GiHamburgerMenu className="size-8 text-white dark:text-black" />
        </div>
        {/* Menu desplegable tablet */}
        <Drawer
          open={drawerMenu}
          onClose={() => closeDrawerMenu()}
          position="right"
          className={`${isActive === 'perfil' ? 'w-20' : 'w-40'} mt-[4.5rem] transform overflow-visible bg-transparent p-0 transition-all duration-500 ease-in-out dark:bg-transparent`}
        >
          <Drawer.Items>
            <div
              className={`absolute mt-14 flex h-[500px] ${isActive === 'perfil' ? 'w-24' : 'w-40'} flex-col items-end justify-between overflow-visible rounded-l-3xl ${isDark ? 'bg-white' : 'bg-nav-blue'}`}
            >
              <div className="max-w-56 pr-5 pt-7">
                <Link href={'/es/auth/solicitud'} onClick={() => closeDrawerMenu()}>
                  {isActive === ActiveTab.SOLICITUD ? (
                    <IconsTablet text="Solicitud">
                      <SolicitudIcon />
                    </IconsTablet>
                  ) : (
                    <SolicitudIcon classname="flex justify-end" />
                  )}
                </Link>
                <Link href={'/es/auth/historial'} onClick={() => closeDrawerMenu()}>
                  {isActive === ActiveTab.HISTORIAL ? (
                    <IconsTablet text="Historial">
                      <HistorialIcon />
                    </IconsTablet>
                  ) : (
                    <HistorialIcon classname="flex justify-end" />
                  )}
                </Link>
                <Link href={'/es/auth/plus-rewards'} onClick={() => closeDrawerMenu()}>
                  {isActive === ActiveTab.PLUSREWARDS ? (
                    <IconsTablet text="Plus Rewards">
                      <PlusRewardsIcon />
                    </IconsTablet>
                  ) : (
                    <PlusRewardsIcon classname="flex justify-end" />
                  )}
                </Link>
                <Link href={'/es/auth/cuentas'} onClick={() => closeDrawerMenu()}>
                  {isActive === ActiveTab.CUENTASASOCIADAS ? (
                    <IconsTablet text="Cuentas">
                      <CuentasAsociadasIcon />
                    </IconsTablet>
                  ) : (
                    <CuentasAsociadasIcon classname="flex justify-end" />
                  )}
                </Link>
                <Link href={'/es/auth/ayuda'} onClick={() => closeDrawerMenu()}>
                  {isActive === ActiveTab.CENTRODEAYUDA ? (
                    <IconsTablet text="Ayuda">
                      <CentroDeAyudaIcon />
                    </IconsTablet>
                  ) : (
                    <CentroDeAyudaIcon classname="flex justify-end" />
                  )}
                </Link>
              </div>
              <div className={`mb-7 ${isActive === 'perfil' ? 'w-28' : ''}`}>
                <CerrarSesion />
              </div>
            </div>
          </Drawer.Items>
        </Drawer>
      </div>
    </div>
  );
};

export default NavbarInternal;
