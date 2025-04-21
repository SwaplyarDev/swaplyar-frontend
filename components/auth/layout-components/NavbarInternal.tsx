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
import { signOut } from 'next-auth/react';
import Iconos from './Iconos';

const NavbarInternal = () => {
  const { isDark } = useDarkTheme();
  const pathname = usePathname();
  const [drawerMenu, setDrawerMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeDrawerMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setDrawerMenu(false);
      setIsClosing(false);
    }, 400);
  };

  const isActive = pathname.split('/')[3];

  return (
    <header className={`sticky top-0 z-40 h-[134px] w-full`}>
      {/* Parte de arriba blanca*/}

      <div className={`max-width-screen sticky top-0 z-40 mx-auto bg-white md:max-w-[1300px]`}>
        <div className="flex h-16 items-center mini-phone:mx-8 mini-phone:justify-between xs:mx-10 md:mx-20">
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
          <div className="">
            <Switch />
          </div>
        </div>
      </div>

      {/* Parte de abajo azul */}

      <nav className="sticky top-0 z-40 flex h-16">
        {/* Lateral izquierdo */}

        <div className="h-full flex-1 bg-red-400"></div>

        {/* Centro */}

        <div className="flex w-full max-w-[1300px] items-center justify-between">
          <div className="flex h-16 flex-1 items-center justify-stretch">
            {/* Contenido principal (perfil, etc.) */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="mask-nav h-16 w-[128px] self-end bg-[#012A8E]"></div>
              <Link
                href="/es/auth/perfil"
                className={`${isActive === 'perfil' ? 'bg-gradient-to-t' : ''} absolute top-2 h-24 w-24 rounded-full from-[#98cf09] via-[#B614FF] to-[#092993] p-[4px] hover:bg-gradient-to-t xs:-left-1 xs:ml-5`}
              >
                {/* Imagen de perfil */}
              </Link>
              <p className="absolute left-[110px] self-center pl-2 pt-4 font-sans text-white dark:text-black xs:block lg:ml-4 lg:hidden lg2:block">
                Nombre Usuario
              </p>
            </div>

            <div className="h-full flex-1 bg-amber-900"></div>

            <Iconos />
            <button onClick={() => signOut()} className="h-16 xs:hidden lg:block">
              <CerrarSesion />
            </button>
          </div>
        </div>

        {/* <div className="flex max-w-[1366px] items-center justify-stretch bg-green-700">
          <div className="relative flex flex-col items-center justify-center">
            <div className="mask-nav h-16 w-[128px] self-end bg-[#012A8E]"></div>
            <Link
              href="/es/auth/perfil"
              className={`${isActive === 'perfil' ? 'bg-gradient-to-t' : ''} absolute top-2 h-24 w-24 rounded-full from-[#98cf09] via-[#B614FF] to-[#092993] p-[4px] hover:bg-gradient-to-t xs:-left-1 xs:ml-5`}
            >
              <Image
                src={swaplyArAvatar}
                alt="Foto perfil Usuario"
                width={100}
                height={100}
                className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-lightText"
              />
            </Link>
            <p className="absolute left-[110px] self-center pl-2 pt-4 font-sans text-white dark:text-black xs:block lg:ml-4 lg:hidden lg2:block">
              Nombre Usuario
            </p>
          </div>

          <div className="h-full bg-amber-900"></div>

          <Iconos />
        </div> */}

        {/* Lateral derecho */}

        <div className="h-full flex-1 bg-amber-200"></div>

        {/* <div className="absolute ml-[900px] hidden lg:mr-10 lg:flex lg:max-w-[460px]">
            <NavIcons />
          </div> */}
        {/* <div onClick={() => setDrawerMenu(true)} className="hidden xs:block xs:pr-10 md:pr-0 lg:hidden">
            <GiHamburgerMenu className="size-8 text-white dark:text-black" />
          </div>
          <button onClick={() => signOut()} className="absolute ml-[1400px] self-center xs:hidden lg:block">
            <CerrarSesion />
          </button> */}

        {/* {COMPONENTIZAR!} */}

        {/* Menu desplegable tablet */}
        {/* {drawerMenu && (
            <Drawer
              open={drawerMenu}
              onClose={closeDrawerMenu}
              position="right"
              className={`duration-400 mt-[4.5rem] w-40 transform overflow-visible bg-transparent p-0 transition-all ease-in-out dark:bg-transparent ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            >
              <Drawer.Items>
                <div
                  className={`absolute mt-14 flex h-[500px] w-40 flex-col items-end justify-between overflow-visible rounded-l-3xl bg-nav-blue dark:bg-white`}
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
                  <div onClick={() => signOut()} className=":hover:animate-pulse mb-7">
                    <CerrarSesion />
                  </div>
                </div>
              </Drawer.Items>
            </Drawer>
          )} */}
      </nav>
    </header>
  );
};

export default NavbarInternal;
