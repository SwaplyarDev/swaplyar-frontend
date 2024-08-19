// hooks/useHydrateStore.tsx
'use client';

import { useEffect } from 'react';
import useStore from '@/store/store'; // Ajusta la ruta según tu estructura de archivos

export function useHydrateStore() {
    const setView = useStore((state) => state.setView);

    useEffect(() => {
        const storedView = typeof window !== 'undefined' ? localStorage.getItem('view') as 'login' | 'register' : 'login';
        if (storedView) {
            setView(storedView);
        }
    }, [setView]);
}
