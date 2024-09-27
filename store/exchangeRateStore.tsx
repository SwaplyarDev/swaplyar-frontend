import { create } from 'zustand';
import { getExchangeRates } from '@/utils/currencyApis';

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
        fetchAndUpdateRates();
      }

      intervalId = setInterval(() => {
        const storedData = localStorage.getItem(localStorageKey);
        const now = Date.now();

        if (storedData) {
          const { timestamp } = JSON.parse(storedData);

          if (now - timestamp >= expirationTime) {
            console.log(`Tasas expiradas (timestamp: ${timestamp}, now: ${now}), actualizando...`);
            fetchAndUpdateRates();
          } else {
            console.log(`Tasas aún válidas (timestamp: ${timestamp}, now: ${now}).`);
          }
        } else {
          console.log('No hay tasas en localStorage, actualizando...');
          fetchAndUpdateRates();
        }
      }, expirationTime);
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
