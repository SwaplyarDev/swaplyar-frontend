// store/useWalletStore.ts (VERSIÓN FINAL Y CORRECTA)

import { create } from 'zustand';
import { mapApiWalletsToFrontend } from '@/components/Transaction/TransactionCalculatorInternal/walletMapper';
import { getMyWalletAccounts } from '@/actions/virtualWalletAccount/virtualWallets.action';

interface Wallet {
  id: string;
  type: string;
  fullName?: string;
  email?: string;
  logo: string;
  logoDark?: string;
}

interface WalletStoreState {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  isLoading: boolean;
  setSelectedWallet: (wallet: Wallet | null) => void;
  clearSelectedWallet: () => void;
  fetchAndSetWallets: (token: string) => Promise<void>;
}

const useWalletStore = create<WalletStoreState>((set) => ({
  wallets: [],
  selectedWallet: null,
  isLoading: false,

  setSelectedWallet: (wallet) => set({ selectedWallet: wallet }),
  clearSelectedWallet: () => set({ selectedWallet: null }),

  fetchAndSetWallets: async (token: string) => {
    if (!token) {
      console.log('Intento de fetch sin token. Deteniendo.');
      return;
    }
    set({ isLoading: true });
    try {
      const apiData = await getMyWalletAccounts(token);

      console.log('✅ 1. Datos recibidos desde la Server Action:', apiData);

      const formattedWallets = mapApiWalletsToFrontend(apiData);
      console.log('✅ 2. Billeteras transformadas (mapper):', formattedWallets);

      set({ wallets: formattedWallets, isLoading: false });
    } catch (error) {
      console.error('❌ Error al llamar a getMyWalletAccounts:', error);
      set({ isLoading: false, wallets: [] });
    }
  },
}));

export default useWalletStore;
