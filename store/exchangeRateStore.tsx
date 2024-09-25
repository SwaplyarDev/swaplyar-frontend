import { create } from 'zustand';
import { getExchangeRates } from '@/utils/currencyApis';

interface ExchangeRateStore {
  rates: any;
  isLoading: boolean; // Nuevo estado de carga
  error: string | null; // Nuevo estado de error
  updateRates: (newRates: any) => void;
  startUpdatingRates: () => void; 
  stopUpdatingRates: () => void;  
}

let intervalId: NodeJS.Timeout | null = null; 

export const useExchangeRateStore = create<ExchangeRateStore>((set) => {
  const fetchAndUpdateRates = async () => {
    set({ isLoading: true, error: null });
    
    try {
      const rates = await getExchangeRates();
      
      if (Object.keys(rates).length > 0) {
        set({ rates, isLoading: false });
      } else {
        set({ isLoading: false, error: 'No se obtuvieron tasas válidas.' });
      }
    } catch (error) {
      console.error('Error actualizando tasas de cambio:', error);
      set({ isLoading: false, error: 'Error al obtener las tasas.' });
    }
  };

  return {
    rates: {},
    isLoading: false,
    error: null,
    updateRates: (newRates) => {
      console.log('Actualizando tasas de cambio con:', newRates); 
      set({ rates: newRates });
    },
    startUpdatingRates: () => {
      // Evita iniciar múltiples intervalos
      if (intervalId) return;
      console.log('Iniciando la actualización periódica de tasas de cambio...');
      fetchAndUpdateRates();
      intervalId = setInterval(fetchAndUpdateRates, 600000); 
    },
    stopUpdatingRates: () => {
      if (intervalId) {
        clearInterval(intervalId); 
        intervalId = null;
      }
    },
  };
});
