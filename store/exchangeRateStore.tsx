import { create } from 'zustand';
import { getExchangeRates, getExchangeRatesUSD_EUR } from '@/utils/currencyApis';

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
    console.log('Haciendo petición a la API para actualizar las tasas...');

    try {
      // Obtener tasas de cambio regulares (2 minutos)
      const rates = await getExchangeRates();
      if (Object.keys(rates).length > 0) {
        const timestamp = Date.now();
        const dataToStore = { rates, timestamp };
        localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));

        set({ rates, isLoading: false });
        console.log('Tasas actualizadas:', rates);
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
    console.log('Haciendo petición a la API para actualizar las tasas de USD a EUR...');

    try {
      // Obtener tasas de cambio USD a EUR (10 minutos)
      const ratesUSD_EUR = await getExchangeRatesUSD_EUR();
      if (Object.keys(ratesUSD_EUR).length > 0) {
        // Puedes guardar estas tasas también si lo deseas
        set((state) => ({
          rates: { ...state.rates, ...ratesUSD_EUR },
          isLoading: false,
        }));
        console.log('Tasas USD a EUR actualizadas:', ratesUSD_EUR);
      } else {
        set({ isLoading: false, error: 'No se obtuvieron tasas válidas para USD a EUR.' });
        console.log('Error: No se obtuvieron tasas válidas para USD a EUR.');
      }
    } catch (error) {
      console.error('Error actualizando tasas USD a EUR:', error);
      set({ isLoading: false, error: 'Error al obtener las tasas USD a EUR.' });
    }
  };

  const loadRatesFromLocalStorage = () => {
    const storedData = localStorage.getItem(localStorageKey);

    if (storedData) {
      const { rates, timestamp } = JSON.parse(storedData);
      const now = Date.now();
      console.log(`Cargando tasas desde localStorage. Timestamp: ${timestamp}`);

      if (now - timestamp < expirationTime) {
        set({ rates, isLoading: false });
        console.log('Tasas cargadas desde localStorage.');
        return true;
      } else {
        console.log('Las tasas en localStorage han expirado.');
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

      console.log('Iniciando la actualización automática de tasas de cambio...');

      const ratesLoaded = loadRatesFromLocalStorage();

      if (!ratesLoaded) {
        fetchAndUpdateRates(); // Llama a la función de tasas cada 2 minutos
        fetchAndUpdateUSDToEURRates(); // Llama a la función de tasas cada 10 minutos
      }

      // Actualización cada 2 minutos
      intervalId = setInterval(() => {
        fetchAndUpdateRates(); // Cada 2 minutos
      }, 2 * 60 * 1000); // 120000 ms

      // Actualización cada 10 minutos
      setInterval(() => {
        fetchAndUpdateUSDToEURRates(); // Cada 10 minutos
      }, 10 * 60 * 1000); // 600000 ms
    },
    stopUpdatingRates: () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        console.log('Detenida la actualización de tasas de cambio.');
      }
    },
    clearRates: () => {
      localStorage.removeItem(localStorageKey);
      set({ rates: {} });
      console.log('Tasas borradas.');
    },
    loadRatesFromLocalStorage,
  };
});
