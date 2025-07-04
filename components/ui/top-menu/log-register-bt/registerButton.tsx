'use client';
import useStore from '@/store/authViewStore';
import Link from 'next/link';

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

type RegisterButtonProps = {
  onButtonClick?: () => void;
};

function RegisterButton({ onButtonClick }: RegisterButtonProps) {
  const { setView } = useStore();
  const { isDark } = useDarkTheme();

  const handleClick = () => {
    setView('register');
    // Ejecutar callback si existe (para cerrar drawer)
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <>
      <Link
        href="/es/iniciar-sesion-o-registro"
        onClick={handleClick}
        className={`relative flex h-[48px] w-[200px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-titleFont font-semibold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} lg2:w-[130px]`}
      >
        Registrarse
      </Link>
    </>
  );
}

export default RegisterButton;
