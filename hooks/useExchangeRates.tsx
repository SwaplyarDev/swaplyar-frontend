import { useState, useCallback } from 'react';
import { useSystemStore } from '@/store/useSystemStore';
import { getCurrentValueUSD } from '@/utils/conversion/convArs_Usd';
import { getCurrentValueEUR } from '@/utils/conversion/convArs_Eur';
import { updateCurrentValueUSDToEUR } from '@/utils/conversion/convUsd_Eur';
import { updateCurrentValueUSDToBRL } from '@/utils/conversion/convUsd_Brl';
import { updateCurrentValueEURToBRL } from '@/utils/conversion/convEur_Brl';
import { exchangeRates } from '@/utils/exchangeRates';

export const useExchangeRate = () => {
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const { handleSameCurrencyRate } = getHandleSameCurrencyRate(); // Usamos el hook para acceder a la función

  const findExchangeRate = useCallback(async () => {
    if (selectedSendingSystem && selectedReceivingSystem) {
      let rate = 0;
      const rateInfo = exchangeRates.find(
        (r) => r.from === selectedSendingSystem.id && r.to === selectedReceivingSystem.id,
      );

      if (rateInfo) {
        let apiRate = 0;
        if (selectedSendingSystem.coin === selectedReceivingSystem.coin) {
          rate = await handleSameCurrencyRate(selectedSendingSystem.coin);
        } else {
          apiRate = await handleDifferentCurrencyRate(selectedSendingSystem.coin, selectedReceivingSystem.coin);
          rate = rateInfo.formula(1, apiRate, 1);
        }

        setExchangeRate(rate);
      }
    }
  }, [selectedSendingSystem, selectedReceivingSystem, handleSameCurrencyRate]); // Agregamos el hook a la lista de dependencias

  return { exchangeRate, findExchangeRate };
};

export function getHandleSameCurrencyRate() {
  const currentValue = getCurrentValueUSD();
  const currentValueEur = getCurrentValueEUR();

  const handleSameCurrencyRate = async (coin: string) => {
    if (!currentValue || !currentValueEur) {
      return 0;
    }

    const { currentValueUSDBlueSale } = currentValue;
    const { currentValueEURBlueSale } = currentValueEur;

    if (coin === 'USD') {
      return currentValueUSDBlueSale || 0; // Retorna 0 si no se encuentra el valor
    } else if (coin === 'EUR') {
      return currentValueEURBlueSale || 0;
    }
    return 0;
  };

  return { handleSameCurrencyRate };
}

const handleDifferentCurrencyRate = async (fromCoin: string, toCoin: string) => {
  if (fromCoin === 'USD' && toCoin === 'EUR') {
    const { currentValueUSDToEUR } = await updateCurrentValueUSDToEUR();
    return currentValueUSDToEUR || 0;
  } else if (fromCoin === 'EUR' && toCoin === 'USD') {
    const { currentValueEURToUSD } = await updateCurrentValueUSDToEUR();
    return currentValueEURToUSD || 0;
  } else if (fromCoin === 'USD' && toCoin === 'BRL') {
    const { currentValueUSDToBRL } = await updateCurrentValueUSDToBRL();
    return currentValueUSDToBRL || 0;
  } else if (fromCoin === 'BRL' && toCoin === 'USD') {
    const { currentValueBRLToUSD } = await updateCurrentValueUSDToBRL();
    return currentValueBRLToUSD || 0;
  } else if (fromCoin === 'EUR' && toCoin === 'BRL') {
    const { currentValueEURToBRL } = await updateCurrentValueEURToBRL();
    return currentValueEURToBRL || 0;
  } else if (fromCoin === 'BRL' && toCoin === 'EUR') {
    const { currentValueBRLToEUR } = await updateCurrentValueEURToBRL();
    return currentValueBRLToEUR || 0;
  }
  return 0;
};
