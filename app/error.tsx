'use client';

import React, { useEffect } from 'react';
import ErrorBoundary from '@/components/error/errorBoundary';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.log('Error capturado:', error);
    console.error('Error capturado:', error);
  }, [error]);

  return <ErrorBoundary reset={reset} />;
}
