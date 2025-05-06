import Image from 'next/image';
import React from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Link from 'next/link';

type IconoProps = {
  iconoPath: string;
  texto: string;
  activo: boolean;
  onClick: () => void;
  linkPath: string;
};

export default function IconoFooter({ iconoPath, texto, activo, onClick, linkPath }: IconoProps) {
  const { isDark } = useDarkTheme();
  return (
    <div className="relative flex">
      <Link href={linkPath}>
        <div
          onClick={onClick}
          className={`h-full cursor-pointer ${
            activo
              ? 'mask-footer-icon w-[4.8125rem] self-center'
              : 'flex basis-1/6 items-end justify-center px-1 mini-phone:px-2 xs-mini-phone:px-3'
          } ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}
        >
          {!activo && <Image src={iconoPath} alt={texto} width={50} height={50} />}
        </div>
      </Link>

      {activo && (
        <div
          className={`absolute left-3.5 top-[-1.375rem] flex h-[3.125rem] w-[3.125rem] flex-row items-center justify-center self-center rounded-[6.25rem] ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}
        >
          <Image src={iconoPath} alt={texto} width={30} height={30} className="scale-150 transform" />
        </div>
      )}
    </div>
  );
}
