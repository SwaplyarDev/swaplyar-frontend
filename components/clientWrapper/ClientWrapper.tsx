// components/clientWrapper/ClientWrapper.tsx
'use client';

import { useHydrateStore } from '@/hooks/useHydrateStore';
import { useState, useEffect } from 'react';
import useStore from '@/store/authViewStore';
import SkeletonManager from '../skeleton/SkeletonManager';

interface ClientWrapperProps {
  children: React.ReactNode;
  loadingDelay?: number;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children, loadingDelay = 300 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useHydrateStore(); 

  const { view } = useStore(); 

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), loadingDelay);
    return () => clearTimeout(timer);
  }, [view, loadingDelay]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
        <SkeletonManager view={view} />
      </div>
    );
  }

  return <>{children}</>;
};

export default ClientWrapper;
