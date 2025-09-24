'use client';
import useStore from '@/store/authViewStore';
import Link from 'next/link';

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

interface LogInButtonProps {
  onButtonClick?: () => void;
}

function LogInButton({ onButtonClick }: LogInButtonProps) {
  const { setView } = useStore();
  const { isDark } = useDarkTheme();

  const handleClick = () => {
    setView('login');
    // Ejecutar callback si existe (para cerrar drawer)
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <>
      <Link
        href="/es/iniciar-sesion"
        onClick={handleClick}
        className={`relative flex h-[48px] w-[200px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 font-titleFont font-semibold text-buttonsLigth dark:border-darkText dark:text-darkText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} lg2:w-[130px]`}
      >
        Iniciar sesión
      </Link>
    </>
  );
}

export default LogInButton;
