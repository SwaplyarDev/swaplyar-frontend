'use client';

import { Button } from '@/components/ui/Button';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-lg bg-red-100 p-4 text-center text-red-600">
      <p>{message}</p>
      <Button onClick={onRetry} className="mt-4 bg-blue-700 text-white hover:bg-blue-800">
        Reintentar
      </Button>
    </div>
  );
}
