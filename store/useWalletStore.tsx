import { create } from 'zustand';
import { mapApiWalletsToFrontend } from '@/components/Transaction/TransactionCalculatorInternal/walletMapper';
import { getMyWalletAccounts } from '@/actions/virtualWalletAccount/virtualWallets.action';
import { mapWalletFromApi } from '@/utils/wallet/mapWalletFromApi';
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
  name: string;
  details: any[];
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
    set({ isLoading: true });
    try {
      const apiResponse = await getMyWalletAccounts(token);

      if (!Array.isArray(apiResponse)) {
        console.error('La respuesta de la API no es un array.');
        throw new Error('Respuesta inesperada de la API');
      }

      const mappedWallets = apiResponse.map(mapWalletFromApi);

      set({
        wallets: mappedWallets,
        isLoading: false,
      });
    } catch (error) {
      console.error('ERROR en fetchAndSetWallets:', error);
      set({ isLoading: false, error: 'Failed to fetch wallets' });
    }
  },
}));

export default useWalletStore;
