import { create } from 'zustand';
import {
  getExchangeRates,
  getExchangeRatesEUR_BRL,
  getExchangeRatesUSD_BRL,
  getExchangeRatesUSD_EUR,
} from '@/utils/currencyApis';

interface ExchangeRateStore {
  rates: any;
  isLoading: boolean;
  error: string | null;
  startUpdatingRates: () => void;
  stopUpdatingRates: () => void;
  clearRates: () => void;
  loadRatesFromLocalStorage: () => boolean;
}

let intervalId: NodeJS.Timeout | null = null;
const localStorageKey = 'exchangeRates';
const expirationTime = 10 * 60 * 1000;

export const useExchangeRateStore = create<ExchangeRateStore>((set) => {
  const fetchAndUpdateRates = async () => {
    set({ isLoading: true, error: null });

    try {
      // Obtener tasas de cambio regulares (2 minutos)
      const rates = await getExchangeRates();
      if (Object.keys(rates).length > 0) {
        // Combinamos las tasas existentes con las nuevas
        set((state) => {
          const combinedRates = {
            ...state.rates,
            ...rates,
          };

          const timestamp = Date.now();
          const dataToStore = { rates: combinedRates, timestamp };
          localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));

          return {
            rates: combinedRates,
            isLoading: false,
          };
        });
      } else {
        set({ isLoading: false, error: 'No se obtuvieron tasas válidas.' });
        console.log('Error: No se obtuvieron tasas válidas.');
      }
    } catch (error) {
      console.error('Error actualizando tasas de cambio:', error);
      set({ isLoading: false, error: 'Error al obtener las tasas.' });
    }
  };

  const fetchAndUpdateUSDToEURRates = async () => {
    set({ isLoading: true, error: null });

    try {
      // Obtener tasas de cambio USD a EUR (10 minutos)
      const ratesUSD_EUR = await getExchangeRatesUSD_EUR();
      if (Object.keys(ratesUSD_EUR).length > 0) {
        set((state) => {
          const combinedRates = {
            ...state.rates,
            ...ratesUSD_EUR,
          };

          const timestamp = Date.now();
          const dataToStore = { rates: combinedRates, timestamp };
          localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));

          return {
            rates: combinedRates,
            isLoading: false,
          };
        });
      } else {
        set({
          isLoading: false,
          error: 'No se obtuvieron tasas válidas para USD a EUR.',
        });
        console.log('Error: No se obtuvieron tasas válidas para USD a EUR.');
      }
    } catch (error) {
      console.error('Error actualizando tasas USD a EUR:', error);
      set({ isLoading: false, error: 'Error al obtener las tasas USD a EUR.' });
    }
  };

  const fetchAndUpdateUSDToBRLRates = async () => {
    set({ isLoading: true, error: null });

    try {
      const ratesUSD_BRL = await getExchangeRatesUSD_BRL();
      if (Object.keys(ratesUSD_BRL).length > 0) {
        set((state) => {
          const combinedRates = {
            ...state.rates,
            ...ratesUSD_BRL,
          };

          const timestamp = Date.now();
          const dataToStore = { rates: combinedRates, timestamp };
          localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));

          return {
            rates: combinedRates,
            isLoading: false,
          };
        });
      } else {
        set({
          isLoading: false,
          error: 'No se obtuvieron tasas válidas para USD a BRL.',
        });
        console.log('Error: No se obtuvieron tasas válidas para USD a BRL.');
      }
    } catch (error) {
      console.error('Error actualizando tasas USD a BRL:', error);
      set({ isLoading: false, error: 'Error al obtener las tasas USD a BRL.' });
    }
  };

  const fetchAndUpdateEURToBRLRates = async () => {
    set({ isLoading: true, error: null });

    try {
      const ratesEUR_BRL = await getExchangeRatesEUR_BRL();
      if (Object.keys(ratesEUR_BRL).length > 0) {
        set((state) => {
          const combinedRates = {
            ...state.rates,
            ...ratesEUR_BRL,
          };

          const timestamp = Date.now();
          const dataToStore = { rates: combinedRates, timestamp };
          localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));

          return {
            rates: combinedRates,
            isLoading: false,
          };
        });
      } else {
        set({
          isLoading: false,
          error: 'No se obtuvieron tasas válidas para EUR a BRL.',
        });
        console.log('Error: No se obtuvieron tasas válidas para EUR a BRL.');
      }
    } catch (error) {
      console.error('Error actualizando tasas EUR a BRL:', error);
      set({ isLoading: false, error: 'Error al obtener las tasas EUR a BRL.' });
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
    startUpdatingRates: () => {
      if (intervalId) return;

      const ratesLoaded = loadRatesFromLocalStorage();

      if (!ratesLoaded) {
        fetchAndUpdateRates(); // Llama a la función de tasas cada 2 minutos
        fetchAndUpdateUSDToEURRates(); // Llama a la función de tasas cada 10 minutos
        fetchAndUpdateEURToBRLRates();
        fetchAndUpdateUSDToBRLRates();
      }

      // Actualización cada 2 minutos
      intervalId = setInterval(
        () => {
          fetchAndUpdateRates(); // Cada 2 minutos
        },
        2 * 60 * 1000,
      ); // 120000 ms

      // Actualización cada 10 minutos
      setInterval(
        () => {
          fetchAndUpdateUSDToEURRates(); // Cada 10 minutos
        },
        10 * 60 * 1000,
      ); // 600000 ms
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
