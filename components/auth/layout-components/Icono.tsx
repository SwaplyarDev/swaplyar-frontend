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
          // style={{
          //   clipPath: `path("M203 0V66.25C203 66.25 200.756 62.7424 199 60.75C194.452 55.5897 189.5 52.75 184 50.75C178.513 48.7547 173.644 48.75 173.621 48.75H30C30 48.75 25 48.75 18.5 50.75C14.8605 51.8698 11 54.75 11 54.75C8 56.75 6.5 58.25 5 59.75C2.56483 62.7817 0 66.25 0 66.25V0H203Z")`,
          //   transform: 'scale(1.002)',
          // }}
          onClick={onClick}
          className={`h-full cursor-pointer ${
            activo ? 'mask-icon w-[203px]' : 'flex-1/6 flex items-end justify-center px-3'
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
