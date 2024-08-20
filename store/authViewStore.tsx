// /store/store.tsx

import { create } from 'zustand'

interface StoreState {
    view: 'login' | 'register';
    setView: (newView: 'login' | 'register') => void;
}

const useStore = create<StoreState>((set) => {
    let initialView: 'login' | 'register' = 'login';

    // Solo accede a localStorage si estamos en el cliente
    if (typeof window !== 'undefined') {
        const storedView = localStorage.getItem('view') as 'login' | 'register';
        if (storedView === 'register' || storedView === 'login') {
            initialView = storedView;
        }
    }

    return {
        view: initialView,
        setView: (newView) => {
            set({ view: newView });
            if (typeof window !== 'undefined') {
                localStorage.setItem('view', newView); // Guarda el valor en localStorage
            }
        },
    };
});

export default useStore;
