// app/components/InvertSystems/InvertSystems.tsx
'use client';

import SwapVertIcon from '@mui/icons-material/SwapVert';
import { System } from '@/types/data';

interface InvertSystemsProps {
  onInvert: () => void;
  selectedReceivingSystem: System | null;
}

export default function InvertSystems({ onInvert, selectedReceivingSystem }: InvertSystemsProps) {
  return (
    <button
      className={`big-icon-button rounded-3xl bg-blue-800 text-white transition-all duration-300 ease-in-out ${selectedReceivingSystem?.id === 'pix' ? '' : 'hover:bg-blue-700'} focus:outline-none`}
      disabled={selectedReceivingSystem?.id === 'pix'}
      onClick={onInvert}
      aria-label="Invertir sistemas"
    >
      <SwapVertIcon className="mx-5 my-1.5" />
    </button>
  );
}
