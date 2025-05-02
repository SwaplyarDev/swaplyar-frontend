import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

import AnimatedCerrarSesion from './AnimatedCerrarSesion';

const CerrarSesion = () => {
  const { isDark } = useDarkTheme();

  return (
    <div
      className={`flex h-16 items-center justify-end pr-12 sm-tablet2:w-[300px] sm-tablet2:justify-center sm-tablet2:pr-0 ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}
    >
      <AnimatedCerrarSesion />
    </div>
  );
};

export default CerrarSesion;
