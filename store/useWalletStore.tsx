import { create } from 'zustand';

// Interface para la wallet seleccionada
interface Wallet {
  id: string;
  type: string;
  fullName: string;
  email: string;
  logo: string;
  logoDark?: string;
}

interface WalletStoreState {
  selectedWallet: Wallet | null;
  setSelectedWallet: (wallet: Wallet | null) => void;
  clearSelectedWallet: () => void;
}

// Store para manejar la wallet seleccionada
const useWalletStore = create<WalletStoreState>((set) => ({
  selectedWallet: null,
  setSelectedWallet: (wallet) => set({ selectedWallet: wallet }),
  clearSelectedWallet: () => set({ selectedWallet: null }),
}));

export default useWalletStore;
