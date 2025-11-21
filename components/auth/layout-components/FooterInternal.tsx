'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SwaplyArLogoLightTheme, SwaplyArLogoDarkTheme } from '@/utils/assets/imgDatabaseCloudinary';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FooterLink } from '@/components/footer/FooterLink/FooterLink';
import FooterIconos from './FooterIconos';

export const FooterInternal = () => {
  const { isDark } = useDarkTheme();

  return (
    <footer className="relative">
      {/* Footer Desktop */}
      <div className="bottom-20 flex w-full flex-col items-center justify-center gap-4 pb-20 md-phone:pb-6">
        <FooterLink label="Términos y Condiciones" href="/es/auth/terminos-y-condiciones/tyc-swaplyar" />
        <FooterLink label="Plus Rewards" href="/es/auth/terminos-y-condiciones/tyc-plus-rewards" />
        <div className="mb-4 flex sm:w-1/3 sm:justify-center sm-tablet2:mb-0">
          <Link href="/es/home">
            <Image
              src={isDark ? SwaplyArLogoDarkTheme : SwaplyArLogoLightTheme}
              alt="Cambiar saldo online"
              width={57}
              height={57}
            />
          </Link>
        </div>
      </div>

      {/* Footer Mobile */}
      <div className={`fixed bottom-0 mx-auto flex h-16 w-full justify-center md-phone:hidden z-50`}>
        <span className={`flex-1 grow ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}></span>
        <FooterIconos />
        <span className={`flex-1 grow ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}></span>
      </div>
    </footer>
  );
};
