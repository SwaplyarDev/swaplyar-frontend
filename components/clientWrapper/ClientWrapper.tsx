'use client';

import { useHydrateStore } from '@/hooks/useHydrateStore';
import { useState, useEffect } from 'react';
import SkeletonRegister from '../skeleton/SkeletonRegister';
import useStore from '@/store/store';
import SkeletonLogin from '../skeleton/SkeletonLogin';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  useHydrateStore();
  const { view } = useStore();

  useEffect(() => {
    console.log('Current view:', view); // Verifica el valor de `view`
    const timer = setTimeout(() => setIsLoading(false), 300); // Ajusta el tiempo si es necesario
    return () => clearTimeout(timer);
  }, [view]); // Dependencia de `view` para actualizar el efecto

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
        {view === 'login' && <SkeletonLogin />}
        {view === 'register' && <SkeletonRegister />}
      </div>
    );
  }

  return <>{children}</>;
}
