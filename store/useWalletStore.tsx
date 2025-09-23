import { create } from 'zustand';
import { getMyWalletAccounts } from '@/actions/virtualWalletAccount/virtualWallets.action';
import { mapWalletFromApi } from '@/utils/wallet/mapWalletFromApi';

// Definimos el "contrato" de nuestro estado
interface WalletStoreState {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  isLoading: boolean;
  error?: string | null; // <-- 1. AÑADIMOS LA PROPIEDAD 'error' (OPCIONAL)
  setSelectedWallet: (wallet: Wallet | null) => void;
  clearSelectedWallet: () => void;
  fetchAndSetWallets: (token: string) => Promise<void>;
}
export interface Wallet {
  id: string;
  type: string; // 'bank', 'virtual_bank', etc.
  name: string; // El apodo de la cuenta
  currency: string;
  details: any[]; // El objeto con todos los detalles específicos
}
const useWalletStore = create<WalletStoreState>((set) => ({
  wallets: [],
  selectedWallet: null,
  isLoading: false,
  error: null, // La inicializamos como null

  setSelectedWallet: (wallet) => set({ selectedWallet: wallet }),
  clearSelectedWallet: () => set({ selectedWallet: null }),

  // en store/useWalletStore.ts

  fetchAndSetWallets: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const rawResponse = await getMyWalletAccounts(token);

      if (!Array.isArray(rawResponse)) {
        console.error('La respuesta de la API no es un array:', rawResponse);
        set({ wallets: [], isLoading: false }); // Ponemos un array vacío si falla
        return;
      }

      // Mapeamos directamente la respuesta.
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
