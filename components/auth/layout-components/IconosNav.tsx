'use client';
import { useState } from 'react';
import IconoNav from './IconoNav';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { iconos } from '@/data/iconosNavFooterData';
import { usePathname } from 'next/navigation';

export default function IconosNav() {
  const { isDark } = useDarkTheme();
  const [activoIndex, setActivoIndex] = useState<number | null>(null);
  const pathname = usePathname();

  console.log('pathname: ', pathname);

  return (
    <div className="z-40 hidden h-16 flex-row justify-center self-end sm:flex">
      {iconos.map((el, index) => (
        <IconoNav
          key={index}
          iconoPath={isDark ? el.iconoDarkPath : el.iconoPath}
          texto={el.texto}
          activo={(activoIndex === index && pathname === el.linkPath) || pathname === el.linkPath}
          onClick={() => setActivoIndex(index)}
          linkPath={el.linkPath}
        />
      ))}
    </div>
  );
}
