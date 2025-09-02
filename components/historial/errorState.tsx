'use client';

import { Button } from '@/components/ui/Button';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-lg bg-[#f0f0f0] p-4 text-center text-red-600 dark:bg-[#2a2a2a] dark:text-red-400">
      <p>{message}</p>
      <Button onClick={onRetry} className="mt-4 bg-[#012A8E] text-white hover:bg-blue-800 dark:bg-[#EBE7E0] dark:text-[#2a2a2a] dark:hover:bg-[#D1D5DB]">
        Reintentar
      </Button>
    </div>
  );
}
