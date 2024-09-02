// app/components/InvertSystems/InvertSystems.tsx
'use client';

import Icon from '@mui/material/Icon';

import SwapVertIcon from '@mui/icons-material/SwapVert';

interface InvertSystemsProps {
  onInvert: () => void;
}

export default function InvertSystems({ onInvert }: InvertSystemsProps) {
  return (
    <button
      className="big-icon-button rounded-3xl bg-blue-500 text-white hover:bg-blue-700 focus:outline-none"
      onClick={onInvert}
      aria-label="Invertir sistemas"
    >      
      <SwapVertIcon className='my-1.5 mx-5'/>
    </button>
  );
}
