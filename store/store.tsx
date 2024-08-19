import { create } from 'zustand';

interface StoreState {
  view: 'login' | 'register';
  setView: (newView: 'login' | 'register') => void;
}

const useStore = create<StoreState>((set) => ({
  view: 'login', // Valor inicial por defecto
  setView: (newView) => {
    set({ view: newView });
    if (typeof window !== 'undefined') {
      localStorage.setItem('view', newView); // Guarda el valor en localStorage
    }
  },
}));

export default useStore;
