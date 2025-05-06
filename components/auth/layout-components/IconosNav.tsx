'use client';
import { useState } from 'react';
import IconoNav from './IconoNav';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { iconos } from '@/data/iconosNavFooterData';

export default function IconosNav() {
  const { isDark } = useDarkTheme();
  const [activoIndex, setActivoIndex] = useState<number | null>(null);

  return (
    <div className="z-40 hidden h-16 flex-row justify-center self-end sm:flex">
      {iconos.map((el, index) => (
        <IconoNav
          key={index}
          iconoPath={isDark ? el.iconoDarkPath : el.iconoPath}
          texto={el.texto}
          activo={activoIndex === index}
          onClick={() => setActivoIndex(index)}
          linkPath={el.linkPath}
        />
      ))}
    </div>
  );
}
