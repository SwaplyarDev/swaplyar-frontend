import { create } from 'zustand';
import { getMyWalletAccounts } from '@/actions/virtualWalletAccount/virtualWallets.action';
import { mapWalletFromApi } from '@/utils/wallet/mapWalletFromApi';

interface WalletStoreState {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  isLoading: boolean;
  error?: string | null;
  setSelectedWallet: (wallet: Wallet | null) => void;
  clearSelectedWallet: () => void;
  fetchAndSetWallets: (token: string) => Promise<void>;
}
export interface Wallet {
  id: string;
  type: string;
  name: string;
  currency: string;
  details: any[];
}
const useWalletStore = create<WalletStoreState>((set) => ({
  wallets: [],
  selectedWallet: null,
  isLoading: false,
  error: null,

  setSelectedWallet: (wallet) => set({ selectedWallet: wallet }),
  clearSelectedWallet: () => set({ selectedWallet: null }),

  fetchAndSetWallets: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const rawResponse = await getMyWalletAccounts(token);

      if (!Array.isArray(rawResponse)) {
        console.error('La respuesta de la API no es un array:', rawResponse);
        set({ wallets: [], isLoading: false });
        return;
      }

      const mapped = rawResponse.map(mapWalletFromApi).filter((wallet): wallet is Wallet => wallet !== null);

      set({
        wallets: mapped,
        isLoading: false,
      });
    } catch (error) {
      console.error('ERROR en fetchAndSetWallets:', error);
      set({ isLoading: false, error: 'Failed to fetch wallets' });
    }
  },
}));

export default useWalletStore;
