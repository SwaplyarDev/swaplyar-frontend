import Switch from '@/components/ui/top-menu/switch';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { SwaplyArlogoMobileWhite, swaplyArAvatar } from '@/utils/assets/img-database';
import { SwaplyArLogoComplete, SwaplyArLogoSolo, SwaplyArlogoWhite } from '@/utils/assets/imgDatabaseCloudinary';

export default function NavSuperiorBarInternal() {
  const { isDark } = useDarkTheme();

  return (
    <div>
      <div className="flex w-full">
        <span className={`flex-1 ${isDark ? 'bg-[#252526]' : 'bg-[#FFFFFB]'} `}></span>
        <div
          className={`sticky top-0 z-40 mx-auto w-full max-w-[1300px] items-center ${isDark ? 'bg-[#252526]' : 'bg-[#FFFFFB]'} `}
        >
          <div className="flex h-16 items-center justify-between">
            <Link href="/es/auth/solicitud">
              <Image
                src={isDark ? SwaplyArlogoMobileWhite : SwaplyArLogoComplete}
                className="hidden max-h-14 w-full max-w-14 pl-6 mini-phone:block mini-phone:max-w-[200px]"
                alt="Cambiar saldo online"
                width={200}
                height={80}
              />
              <Image
                src={isDark ? SwaplyArlogoWhite : SwaplyArLogoSolo}
                className="max-h-14 w-full max-w-14 pl-4 mini-phone:hidden"
                alt="Cambiar saldo online"
                width={200}
                height={80}
              />
            </Link>

            <div
              className={`flex-1 ${isDark ? 'bg-[#252526]' : 'bg-[#FFFFFB]'} hidden w-full items-center justify-center sm-tablet2:flex`}
            >
              <p className="whitespace-nowrap font-sans text-[#252526] dark:text-[#FFFFFB]">
                Mensaje que se puede indicar al usuario
              </p>
            </div>
            <span className="pr-6">
              <Switch />
            </span>
          </div>
        </div>
        <span className={`flex-1 ${isDark ? 'bg-[#252526]' : 'bg-[#FFFFFB]'} `}></span>
      </div>
    </div>
  );
}
