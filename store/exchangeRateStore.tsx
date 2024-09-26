import { create } from 'zustand';
import { getExchangeRates } from '@/utils/currencyApis';

interface ExchangeRateStore {
  rates: any;
  isLoading: boolean;
  error: string | null;
  updateRates: (newRates: any) => void;
  startUpdatingRates: () => void;
  stopUpdatingRates: () => void;
  clearRates: () => void;
  loadRatesFromLocalStorage: () => boolean;
}

let intervalId: NodeJS.Timeout | null = null;
const localStorageKey = 'exchangeRates';
const expirationTime = 10 * 1000; // 10 segundos

export const useExchangeRateStore = create<ExchangeRateStore>((set) => {
  const fetchAndUpdateRates = async () => {
    set({ isLoading: true, error: null });

    try {
      const rates = await getExchangeRates();

      if (Object.keys(rates).length > 0) {
        const timestamp = Date.now();
        const dataToStore = { rates, timestamp };

        localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));

        set({ rates, isLoading: false });
      } else {
        set({ isLoading: false, error: 'No se obtuvieron tasas válidas.' });
      }
    } catch (error) {
      console.error('Error actualizando tasas de cambio:', error);
      set({ isLoading: false, error: 'Error al obtener las tasas.' });
    }
  };

  const loadRatesFromLocalStorage = () => {
    const storedData = localStorage.getItem(localStorageKey);

    if (storedData) {
      const { rates, timestamp } = JSON.parse(storedData);
      const now = Date.now();

      if (now - timestamp < expirationTime) {
        set({ rates, isLoading: false });
        return true;
      } else {
        localStorage.removeItem(localStorageKey);
      }
    }
    return false;
  };

  return {
    rates: {},
    isLoading: false,
    error: null,
    updateRates: (newRates) => {
      console.log('Actualizando tasas de cambio con:', newRates);
      set({ rates: newRates });

      const timestamp = Date.now();
      const dataToStore = { rates: newRates, timestamp };
      localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));
    },
    startUpdatingRates: () => {
      if (intervalId) return;

      console.log('Iniciando la actualización periódica de tasas de cambio...');

      const ratesLoaded = loadRatesFromLocalStorage();

      if (!ratesLoaded) {
        fetchAndUpdateRates();
      }

      intervalId = setInterval(() => {
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData) {
          const { timestamp } = JSON.parse(storedData);
          const now = Date.now();

          if (now - timestamp >= expirationTime) {
            console.log('Las tasas han expirado, actualizando...');
            fetchAndUpdateRates();
          }
        }
      }, 1000);
      console.log(intervalId);
    },
    stopUpdatingRates: () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
    clearRates: () => {
      localStorage.removeItem(localStorageKey);
      set({ rates: {} });
    },
    loadRatesFromLocalStorage,
  };
});
