'use client';
import React from 'react';

import clsx from 'clsx';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';

interface ButtonAuthProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  isDark: boolean;
  variant?: 'primary' | 'secondary';
}

const ButtonAuth: React.FC<ButtonAuthProps> = ({
  label,
  onClick,
  type = 'submit',
  disabled = false,
  loading = false,
  className = '',
  isDark,
  variant = 'primary',
}) => {
  let variantClass = '';

  // Alturas: mobile 38px, tablet 45px, desktop 48px
  const heightClass = 'h-[38px] sm:h-[45px] lg:h-[48px]';

  // Texto: mobile 14px, tablet/desktop 20px
  const textClass = 'text-[14px] leading-[18px] sm:text-[20px] sm:leading-[24px]';

  // Clases comunes para todos los botones
  const commonClass = clsx(
    'relative h-10.5 p-0 items-center justify-center rounded-3xl font-titleFont font-semibold text-base',
    heightClass,
    textClass
  );

  if (variant === 'primary') {
    if (disabled || loading) {
      variantClass =
        'border-disabledButtonsLigth bg-disabledButtonsLigth text-darkText dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText cursor-not-allowed';
    } else {
      // Aplicamos tus clases globales de hover
      variantClass = isDark
        ? 'border-darkText bg-darkText text-lightText buttonSecondDark'
        : 'border-buttonsLigth bg-buttonsLigth text-darkText buttonSecond';
    }
  } else if (variant === 'secondary') {
    variantClass = [
      'dark:hover:bg-transparent',
      'm-1 border border-buttonsLigth text-lg text-buttonsLigth hover:bg-transparent',
      isDark ? 'dark:border-darkText dark:text-darkText dark:hover:bg-transparent buttonSecondDark' : 'buttonSecond',
      disabled || loading
        ? 'border-disabledButtonsLigth text-disabledButtonsLigth dark:border-disabledButtonsDark dark:text-disabledButtonsDark cursor-not-allowed'
        : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  // combinamos las clases
  const buttonClass = clsx(variantClass, commonClass, className);

  // si loading es true mostramos el loading
  if (loading) {
    return (
      <div
        className={clsx(
          'relative h-10.5 rounded-3xl flex items-center justify-center',
          heightClass,
          textClass,
          className
        )}
      >
        <LoadingGif
          color={isDark ? '#ebe7e0' : '#012c8a'}
          size="24px"
          className="sm:size-[42px] lg:size-[45px]"
        />
      </div>
    );
  }

  // sino mostramos el boton normal con las clases combinadas.
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClass}
    >
      {label}
    </button>
  );
};

export default ButtonAuth;
