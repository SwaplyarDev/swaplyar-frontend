'use client';

import React, { useEffect } from 'react';
import ErrorBoundary from '@/components/error/errorBoundary';
import Footer from '@/components/footer/Footer';
import { TopMenu } from '@/components/ui/top-menu/TopMenu';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error capturado:', error);
  }, [error]);

  return (
    <>
      <TopMenu />
      <ErrorBoundary reset={reset} />;
      <Footer />
    </>
  );
}
