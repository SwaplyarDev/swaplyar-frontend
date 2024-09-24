import { create } from 'zustand';
import { getExchangeRates } from '@/utils/currencyApis';

interface ExchangeRateStore {
  rates: any;
  updateRates: (newRates: any) => void;
  startUpdatingRates: () => void; 
  stopUpdatingRates: () => void;  
}

let intervalId: NodeJS.Timeout | null = null; 

export const useExchangeRateStore = create<ExchangeRateStore>((set) => {
  const fetchAndUpdateRates = async () => {
    try {
      const rates = await getExchangeRates();
    //   console.log('Tasas obtenidas:', rates);
      set({ rates });
    } catch (error) {
      console.error('Error actualizando tasas de cambio:', error);
    }
  };

  return {
    rates: {},
    updateRates: (newRates) => {
      console.log('Actualizando tasas de cambio con:', newRates); 
      set({ rates: newRates });
    },
    startUpdatingRates: () => {
      // Evita iniciar múltiples intervalos
      if (intervalId) return;

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
