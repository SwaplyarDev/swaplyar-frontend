import { create } from 'zustand';
import {
  getExchangeRates,
  getExchangeRatesEUR_BRL,
  getExchangeRatesUSD_BRL,
  getExchangeRatesUSD_EUR,
} from '@/utils/currencyApis';

type rates = {
  'Actualizar Monedas Calculadora': {
    Fuente: string;
    'Par de MonedasR': string;
    Valor: number;
    'Ultima Actualización': string;
  };
};

const API_URL = process.env.NEXT_PUBLIC_VALUE_TRANSACTIONS;

if (!API_URL) {
  throw new Error('Falta la URL de la API en las variables de entorno.');
}

interface ExchangeRateStore {
  rates: any;
  isLoading: boolean;
  error: string | null;
  startUpdatingRates: () => void;
  stopUpdatingRates: () => void;
  clearRates: () => void;
  loadRatesFromLocalStorage: () => boolean;
  ratesOfAPi: rates[]; // Estado inicial
}

let intervalId: NodeJS.Timeout | null = null;
const localStorageKey = 'exchangeRates';
const expirationTime = 10 * 60 * 1000;

export const getExchangeRateStore = create<ExchangeRateStore>((set) => {
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

  const fetchRates = async (set: any) => {
    if (typeof window === 'undefined') return; // Previene ejecución en SSR

    try {
      set({ isLoading: true }); // Marca como cargando

      const response = await fetch(`${API_URL}`, {
        method: 'GET',
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`Error al obtener datos de la API: ${response.status} ${response.statusText}`);
      }

      const data: rates[] = await response.json();
      set({ ratesOfAPi: data, isLoading: false }); // Actualiza el estado
    } catch (error) {
      set({ isLoading: false, error: 'Error al obtener datos de conversión' });
      console.error('Error al obtener datos de conversión:', error);
    }
  };

  return {
    ratesOfAPi: [],
    rates: {},
    isLoading: false,
    error: null,
    startUpdatingRates: async () => {
      if (typeof window === 'undefined') return; // Evita ejecución en SSR

      await fetchRates(set); // Llamada inicial

      if (intervalId) return; // Evita múltiples intervalos

      const ratesLoaded = loadRatesFromLocalStorage();

      if (!ratesLoaded) {
        fetchAndUpdateRates();
        fetchAndUpdateUSDToEURRates();
        fetchAndUpdateUSDToBRLRates();
        fetchAndUpdateEURToBRLRates();
      }

      intervalId = setInterval(
        () => {
          fetchAndUpdateRates();
          fetchAndUpdateUSDToEURRates();
          fetchAndUpdateUSDToBRLRates();
          fetchAndUpdateEURToBRLRates();
        },
        2 * 60 * 1000,
      ); // 2 minutos
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
