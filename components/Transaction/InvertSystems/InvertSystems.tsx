// app/components/InvertSystems/InvertSystems.tsx
'use client';

import SwapVertIcon from '@mui/icons-material/SwapVert';
import { System } from '@/types/data';
import clsx from 'clsx';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

interface InvertSystemsProps {
  onInvert: () => void;
  selectedReceivingSystem: System | null;
}

export default function InvertSystems({ onInvert, selectedReceivingSystem }: InvertSystemsProps) {
  const { isDark } = useDarkTheme();
  return (
    <button
      className={clsx(
        selectedReceivingSystem?.id === 'pix'
          ? 'border-disabledButtonsLigth bg-disabledButtonsLigth dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText'
          : isDark
            ? 'buttonSecondDark dark:text-lightText'
            : 'buttonSecond',
        'relative max-w-[48px] max-h-[28px] sm:max-h-[34px] sm:max-w-[60px] m-1 items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth font-titleFont font-semibold text-darkText dark:border-darkText dark:bg-darkText',
      )}
      disabled={selectedReceivingSystem?.id === 'pix'}
      onClick={onInvert}
      aria-label="Invertir sistemas"
    >
      <SwapVertIcon
        className={clsx(
          'mx-3 my-0.5 sm:mx-4 sm:my-1',
          isDark ? 'text-lightText' : 'text-darkText'
        )}
      />
    </button>
  );
}
