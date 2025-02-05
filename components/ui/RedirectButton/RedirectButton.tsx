'use client';
import Link from 'next/link';
import React from 'react';
import { IRedirectButtonProps } from './types';
import clsx from 'clsx';
import { useDarkTheme } from '../theme-Provider/themeProvider';

export const RedirectButton: React.FC<IRedirectButtonProps> = ({ reset, counter }) => {
  const { isDark } = useDarkTheme();

  return (
    <Link
      href="/"
      className={clsx(
        'z-20 flex w-[180px] justify-center rounded-full border border-buttonsLigth bg-transparent px-[14px] py-3 font-titleFont text-base font-semibold text-buttonsLigth',
        isDark ? 'buttonSecondDark border-darkText text-darkText' : 'buttonSecond',
      )}
      onClick={reset}
    >
      Redireccion en {counter}
    </Link>
  );
};

export default RedirectButton;
