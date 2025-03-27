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

enum TabView {
  NONE,
  SOLICITUD,
  HISTORIAL,
  PLUSREWARDS,
  CUENTASASOCIADAS,
  CENTRODEAYUDA,
}

const NavbarInternal = () => {
  const [drawerMenu, setDrawerMenu] = useState(false);
  const [tabDesktop, setTabDesktop] = useState<TabView>(TabView.NONE);
  const [tabTablet, setTabTablet] = useState<TabView>(TabView.NONE);

  const closeDrawerMenu = () => {
    setTabTablet(TabView.NONE);
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

  return (
    <div>
      <div className="flex h-16 items-center justify-around mini-phone:mx-8 mini-phone:justify-between xs:mx-10 md:mx-20">
        <Image
          src={isDark ? isMobileDark() : isMobile()}
          className="my-5 ml-5 h-16 w-16 xs-mini-phone:my-5 xs-mini-phone:h-16 xs-mini-phone:w-48 xs-mini-phone:dark:mb-0 xs-mini-phone:dark:h-56 xs-mini-phone:dark:w-56 md:w-64"
          alt="Cambiar saldo online"
          width={80}
          height={80}
        />
        <div className="">
          <Switch />
        </div>
      </div>
      <div className={`flex h-16 ${isDark ? 'bg-white' : 'bg-nav-blue'} xs:px-0 md:justify-between md:px-20`}>
        <div className={`relative top-1 ml-10 flex h-full w-full ${isDark ? 'montanaDark' : 'montana'} md:ml-0`}>
          <div
            onClick={() => setTabDesktop(TabView.NONE)}
            className="relative left-4 top-1 h-24 w-24 rounded-full bg-gradient-to-t from-[#98cf09] via-[#B614FF] to-[#092993] p-[4px] xs:-left-1 xs:ml-5"
          >
            <Image
              src={swaplyArAvatar}
              alt="Foto perfil Usuario"
              width={100}
              height={100}
              className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-lightText"
            />
          </div>
          <p className="hidden pl-2 pt-4 text-white dark:text-black xs:block md:hidden lg:block">Nombre Usuario</p>
        </div>
        {/* Iconos Desktop */}
        <div className="hidden md:flex">
          <div className="justify-arround relative flex items-end">
            <div className="cursor-pointer" onClick={() => setTabDesktop(TabView.SOLICITUD)}>
              {tabDesktop === TabView.SOLICITUD ? (
                <IconsTablet text="Solcitud" classname="relative translate-y-9">
                  <SolicitudIcon />
                </IconsTablet>
              ) : (
                <SolicitudIcon classname="lg:pr-5" />
              )}
            </div>
            <div className="cursor-pointer" onClick={() => setTabDesktop(TabView.HISTORIAL)}>
              {tabDesktop === TabView.HISTORIAL ? (
                <IconsTablet text="Historial" classname="relative translate-y-9">
                  <HistorialIcon />
                </IconsTablet>
              ) : (
                <HistorialIcon classname="lg:pr-5" />
              )}
            </div>
            <div className="cursor-pointer" onClick={() => setTabDesktop(TabView.PLUSREWARDS)}>
              {tabDesktop === TabView.PLUSREWARDS ? (
                <IconsTablet text="Plus Rewards" classname="relative translate-y-9">
                  <PlusRewardsIcon />
                </IconsTablet>
              ) : (
                <PlusRewardsIcon classname="lg:pr-5" />
              )}
            </div>
            <div className="cursor-pointer" onClick={() => setTabDesktop(TabView.CUENTASASOCIADAS)}>
              {tabDesktop === TabView.CUENTASASOCIADAS ? (
                <IconsTablet text="Cuentas Asociadas" classname="relative translate-y-9">
                  <CuentasAsociadasIcon />
                </IconsTablet>
              ) : (
                <CuentasAsociadasIcon classname="lg:pr-5" />
              )}
            </div>
            <div className="cursor-pointer" onClick={() => setTabDesktop(TabView.CENTRODEAYUDA)}>
              {tabDesktop === TabView.CENTRODEAYUDA ? (
                <IconsTablet text="Ayuda" classname="relative translate-y-9">
                  <CentroDeAyudaIcon />
                </IconsTablet>
              ) : (
                <CentroDeAyudaIcon classname="lg:pr-5" />
              )}
            </div>
          </div>
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
          className="mt-[4.5rem] w-40 transform overflow-visible bg-transparent p-0 transition-all duration-500 ease-in-out dark:bg-transparent"
        >
          <Drawer.Items>
            <div
              className={`absolute mt-14 flex h-[500px] w-40 flex-col items-end justify-between overflow-visible rounded-l-3xl ${isDark ? 'bg-white' : 'bg-nav-blue'}`}
            >
              <div className="max-w-56 pr-5 pt-7">
                <div onClick={() => setTabTablet(TabView.SOLICITUD)}>
                  {tabTablet === TabView.SOLICITUD ? (
                    <IconsTablet text="Solcitud">
                      <SolicitudIcon />
                    </IconsTablet>
                  ) : (
                    <SolicitudIcon classname="flex justify-end" />
                  )}
                </div>
                <div onClick={() => setTabTablet(TabView.HISTORIAL)}>
                  {tabTablet === TabView.HISTORIAL ? (
                    <IconsTablet text="Historial">
                      <HistorialIcon />
                    </IconsTablet>
                  ) : (
                    <HistorialIcon classname="flex justify-end" />
                  )}
                </div>
                <div onClick={() => setTabTablet(TabView.PLUSREWARDS)}>
                  {tabTablet === TabView.PLUSREWARDS ? (
                    <IconsTablet text="Plus Rewards">
                      <PlusRewardsIcon />
                    </IconsTablet>
                  ) : (
                    <PlusRewardsIcon classname="flex justify-end" />
                  )}
                </div>
                <div onClick={() => setTabTablet(TabView.CUENTASASOCIADAS)}>
                  {tabTablet === TabView.CUENTASASOCIADAS ? (
                    <IconsTablet text="Cuentas Asociadas">
                      <CuentasAsociadasIcon />
                    </IconsTablet>
                  ) : (
                    <CuentasAsociadasIcon classname="flex justify-end" />
                  )}
                </div>
                <div onClick={() => setTabTablet(TabView.CENTRODEAYUDA)}>
                  {tabTablet === TabView.CENTRODEAYUDA ? (
                    <IconsTablet text="Ayuda">
                      <CentroDeAyudaIcon />
                    </IconsTablet>
                  ) : (
                    <CentroDeAyudaIcon classname="flex justify-end" />
                  )}
                </div>
              </div>
              <div className="mb-7">
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
