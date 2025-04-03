'use client';
import { NavIcons } from './NavIcons';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import useWindowWidth from '@/hooks/useWindowWidth';
import Link from 'next/link';
import Image from 'next/image';
import { SwaplyArLogoSolo } from '@/utils/assets/imgDatabaseCloudinary';

export const FooterInternal = () => {
  const { isDark } = useDarkTheme();
  const windowWidth = useWindowWidth();
  const isMobile = () => (windowWidth >= 480 ? false : true);
  return isMobile() ? (
    <footer
      className={`fixed bottom-0 left-0 flex h-16 w-full justify-center pb-4 ${isDark ? 'bg-white' : 'bg-nav-blue'}`}
    >
      <NavIcons />
    </footer>
  ) : (
    <footer className="fixed bottom-0 left-0 flex w-full justify-center pb-4">
      <div className="flex w-full items-center justify-center px-4">
        <ul className="flex flex-col items-center justify-between gap-4">
          <li>
            <Link className="text-gray-600 dark:text-gray-400" href="/es/terminos-y-condiciones/tyc-swaplyar">
              Terminos y Condiciones
            </Link>
          </li>
          <li>
            <Link className="text-gray-600 dark:text-gray-400" href="/es/terminos-y-condiciones/tyc-plus-rewards">
              T&C Plus Rewards
            </Link>
          </li>
          <li className="mb-4 flex flex-grow justify-center filter dark:brightness-[0%] dark:invert sm:mb-0 sm:w-1/3 sm:justify-center">
            <Link href="/es/home">
              <Image src={SwaplyArLogoSolo} alt="Cambiar saldo online" width={65} height={70} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
