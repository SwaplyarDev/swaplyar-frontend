// app/components/InvertSystems/InvertSystems.tsx
'use client';

import Icon from '@mui/material/Icon';

interface InvertSystemsProps {
  onInvert: () => void;
}

export default function InvertSystems({ onInvert }: InvertSystemsProps) {
  return (
    <button
      className="big-icon-button rounded-full bg-blue-500 p-4 text-white hover:bg-blue-700 focus:outline-none"
      onClick={onInvert}
      aria-label="Invertir sistemas"
    >
      <Icon>swap_vert</Icon>
    </button>
  );
}
