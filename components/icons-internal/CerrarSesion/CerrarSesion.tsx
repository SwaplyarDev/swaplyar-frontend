import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useState } from 'react';
import AnimatedCerrarSesion from './AnimatedCerrarSesion';

const CerrarSesion = () => {
  const { isDark } = useDarkTheme();

  return (
    <div
      className={`flex h-16 w-[300px] items-center justify-center pl-0 pr-24 ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}
    >
      <AnimatedCerrarSesion />
    </div>
  );
};

export default CerrarSesion;
