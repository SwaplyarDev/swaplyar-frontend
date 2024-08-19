// components/ClientWrapper.tsx
'use client';

import { useHydrateStore } from '@/hooks/useHydrateStore';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    useHydrateStore();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 0); // Ajusta el tiempo si es necesario
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
                <Spinner />
            </div>
        );
    }

    return <>{children}</>;
}
