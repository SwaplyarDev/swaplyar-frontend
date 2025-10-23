import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

import AnimatedCerrarSesion from './AnimatedCerrarSesion';

const CerrarSesion = () => {
  const { isDark } = useDarkTheme();

  return (
    <div
      className={`flex h-16 min-w-[132px] items-center justify-end sm-tablet2:justify-center ${isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'}`}
    >
      <AnimatedCerrarSesion />
    </div>
  );
};

export default CerrarSesion;
