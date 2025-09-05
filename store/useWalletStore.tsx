import { create } from 'zustand';
import { mapApiWalletsToFrontend } from '@/components/Transaction/TransactionCalculatorInternal/walletMapper';
import { getMyWalletAccounts } from '@/actions/virtualWalletAccount/virtualWallets.action';

export interface Wallet {
  id: string;
  type: string;
  label: string;
  fullName?: string;
  email?: string;
  logo: string;
  logoDark?: string;
  cbu?: string;
  bankName?: string;
  alias?: string;
  taxId?: string;
  pixKeyType?: string;
  pixKeyValue?: string;
  walletAddress?: string;
  network?: string;
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

      const formattedWallets = mapApiWalletsToFrontend(apiData);

      set({ wallets: formattedWallets, isLoading: false });
    } catch (error) {
      console.error('❌ Error al llamar a getMyWalletAccounts:', error);
      set({ isLoading: false, wallets: [] });
    }
  },
}));

export default useWalletStore;
