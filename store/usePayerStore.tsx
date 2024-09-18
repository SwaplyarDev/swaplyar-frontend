// useStore.ts
import { create } from 'zustand';

// Define las interfaces para los tipos que vas a usar en el store
interface Payer {
  email_address?: string;
  payer_id?: string;
  name?: string;
  phone?: string;
  birth_date?: string;
  tax_info?: string;
  address?: string;
}

interface StoreState {
  payer?: Payer;
  setPayer: (payer: Payer | undefined) => void;
}

// Crea el store usando Zustand
const useStore = create<StoreState>((set) => ({
  payer: undefined,
  setPayer: (payer) => set({ payer }),
}));

export default useStore;
