// app/components/InvertSystems/InvertSystems.tsx
'use client'

import Icon from '@mui/material/Icon';

interface InvertSystemsProps {
  onInvert: () => void;
}

export default function InvertSystems({ onInvert }: InvertSystemsProps) {
  return (
    <button
      className="big-icon-button bg-blue-500 hover:bg-blue-700 text-white rounded-full p-4 focus:outline-none"
      onClick={onInvert}
      aria-label="Invertir sistemas"
    >
      <Icon>swap_vert</Icon>
    </button>
  );
}
