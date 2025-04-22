import Image from 'next/image';
import React from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

type IconoProps = {
  iconoPath: string;
  texto: string;
  activo: boolean;
  onClick: () => void;
};

export default function Icono({ iconoPath, texto, activo, onClick }: IconoProps) {
  const { isDark } = useDarkTheme();
  return (
    <div className="flex-1/6 relative flex justify-center">
      <div
        onClick={onClick}
        className={`h-full cursor-pointer ${
          activo ? 'mask-icon w-[212px]' : 'flex-1/6 flex items-center justify-center'
        } ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}
      >
        {!activo && <Image src={iconoPath} alt={texto} width={51} height={50} />}
      </div>

      {activo && (
        <div
          className={`absolute top-[60px] flex h-[50px] w-[192px] flex-row items-center justify-start rounded-[100px] ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'} px-[4px]`}
        >
          <Image src={iconoPath} alt={texto} width={51} height={50} />
          <span
            className={`ml-2 whitespace-nowrap text-lg font-semibold ${isDark ? 'text-[#252526]' : 'text-[#EBE7E0]'}`}
          >
            {texto}
          </span>
        </div>
      )}
    </div>
  );
}
