'use client';
import React from 'react';

import clsx from 'clsx';

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
  const commonClass = 'relative h-10.5 p-0 items-center justify-center rounded-3xl font-titleFont font-semibold text-base';
  if (variant === 'primary') {
    variantClass = disabled || loading
      ? 'border-disabledButtonsLigth bg-disabledButtonsLigth text-darkText dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText cursor-not-allowed'
      : isDark
        ? 'border-darkText bg-darkText text-lightText'
        : 'border-buttonsLigth bg-buttonsLigth text-darkText';
  } else if (variant === 'secondary') {
    variantClass = [
      'dark:hover:bg-transparent',
      'm-1 border border-buttonsLigth text-lg text-buttonsLigth hover:bg-transparent',
      isDark ? 'dark:border-darkText dark:text-darkText dark:hover:bg-transparent buttonSecondDark' : 'buttonSecond',
      disabled || loading ? 'border-disabledButtonsLigth text-disabledButtonsLigth dark:border-disabledButtonsDark dark:text-disabledButtonsDark cursor-not-allowed' : '',
    ].filter(Boolean).join(' ');
  }
  const buttonClass = clsx(
    variantClass,
    commonClass,
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClass}
    >
      {loading ? 'Cargando...' : label}
    </button>
  );
};

export default ButtonAuth;
