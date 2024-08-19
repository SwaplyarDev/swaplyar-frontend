import { create } from 'zustand'

interface StoreState {
    view: 'login' | 'register'; // Define los valores posibles para la vista
    setView: (newView: 'login' | 'register') => void; // Define la función para cambiar la vista
  }

const useStore = create<StoreState>((set) => ({
    view: 'login',
    setView: (newView) => set({ view: newView }),
}))

export default useStore;