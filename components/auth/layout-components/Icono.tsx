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

export default function Icono({ iconoPath, texto, activo, onClick, linkPath }: IconoProps) {
  const { isDark } = useDarkTheme();
  return (
    <div className="flex-1/6 relative flex justify-center">
      <Link href={linkPath}>
        <div
          onClick={onClick}
          className={`h-full cursor-pointer ${
            activo ? 'mask-icon w-[212px]' : 'flex-1/6 flex items-end justify-center px-3'
          } ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}
        >
          {!activo && <Image src={iconoPath} alt={texto} width={51} height={50} />}
        </div>
      </Link>

      {activo && (
        <div
          className={`absolute top-[60px] flex h-[50px] w-[192px] flex-row items-center rounded-[100px] pr-10 ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'} px-[4px]`}
        >
          <Image src={iconoPath} alt={texto} width={30} height={30} className="ml-1 scale-150 transform" />

          <span
            className={`ml-1 whitespace-nowrap text-lg font-semibold ${isDark ? 'text-[#252526]' : 'text-[#EBE7E0]'}`}
          >
            {texto}
          </span>
        </div>
      )}
    </div>
  );
}
