'use client';
import {
  SwaplyArLogoComplete,
  SwaplyArLogoSolo,
  SwaplyArlogoWhite,
  SwaplyArlogoMobileWhite,
} from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import Switch from '@/components/ui/top-menu/switch';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import CerrarSesion from '@/components/icons-internal/CerrarSesion/CerrarSesion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { NavIcons } from './NavIcons';
import NavMenuDesplegableTablet from './NavMenuDesplegableTablet';
import NavFotoDePerfil from './NavFotoDePerfil';

const NavbarInternal = () => {
  const { isDark, mounted } = useDarkTheme();
  const pathname = usePathname();
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
    <header className="sticky top-0 z-[1000] w-full">
      <div className="bg-white dark:bg-lightText">
        <div className="xl:mx-auto xl:max-w-screen-desktop flex h-16 items-center justify-around mini-phone:mx-8 mini-phone:justify-between xs:mx-10 md:mx-20">
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

      <div className="flex w-full h-16">
        <div className={`min-w-4 sm:min-w-6 md:min-w-10 lg:min-w-14 xl:min-w-16 xl:flex-1 xl:flex-grow ${isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'}`}/>
        <div className="flex flex-grow xl:w-[1204px] max-w-screen-desktop xs:px-0">
          <div className="flex h-full w-full items-center">

            <NavFotoDePerfil isDark={isDark} isActive={isActive} />

            <span className={`flex-1 grow h-full ${isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'}`}></span>

            <div className={`hidden h-full lg:flex lg:max-w-[460px] -ml-[1px]`}>
              <NavIcons />
            </div>

            <div className={`flex-1 max-w-10 grow h-full ${isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'}`} />

            <button onClick={() => signOut()} className="block md-phone:hidden lg:block">
              <CerrarSesion />
            </button>
            <NavMenuDesplegableTablet isDark={isDark} isActive={isActive} />
          </div>
        </div>
        <div className={`min-w-4 sm:min-w-6 md:min-w-10 lg:min-w-14 xl:min-w-16 xl:flex-1 xl:flex-grow ${isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'}`}/>
      </div>
    </header>
  );
};

export default NavbarInternal;
