'use client';
import { useState } from 'react';
import IconoFooter from './IconoFooter';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { iconos } from '@/data/iconosNavFooterData';
import { usePathname } from 'next/navigation';

export default function IconosFooter() {
  const { isDark } = useDarkTheme();
  const [activoIndex, setActivoIndex] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <div className="z-40 flex h-16 flex-row justify-center gap-0 self-end md-phone:hidden">
      {iconos.map((el, index) => (
        <IconoFooter
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
