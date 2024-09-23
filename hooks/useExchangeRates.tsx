// hooks/useExchangeRates.tsx
import { useState, useEffect, useCallback } from 'react';
import { useSystemStore } from '@/store/useSystemStore';
import { exchangeRates } from '@/utils/exchangeRates';
import {
  calculateAmount,
  calculateInverseAmount,
  updateCurrentValueEUR,
  updateCurrentValueUSD,
  updateCurrentValueUSDToEUR,
} from '@/utils/currencyApis';

export const useExchangeRate = () => {
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [rateForOne, setRateForOne] = useState<number>(0);
  const [rateForOneBank, setRateForOneBank] = useState<number>(0);

  const findExchangeRate = useCallback(async () => {
    if (selectedSendingSystem && selectedReceivingSystem) {
      let rate = 0;
      const rateInfo = exchangeRates.find(
        (r) =>
          r.from === selectedSendingSystem.id &&
          r.to === selectedReceivingSystem.id,
      );

      if (rateInfo) {
        let apiRate = 0;
        if (selectedSendingSystem.coin === selectedReceivingSystem.coin) {
          rate = await handleSameCurrencyRate(selectedSendingSystem.coin);
        } else {
          apiRate = await handleDifferentCurrencyRate(
            selectedSendingSystem.coin,
            selectedReceivingSystem.coin,
          );
          rate = rateInfo.formula(1, apiRate);
        }

        setExchangeRate(rate);
        const rateOneUnit = await calculateAmount(
          selectedSendingSystem.id,
          selectedReceivingSystem.id,
          1,
        );
        const rateOneUnitBank = await calculateInverseAmount(
          selectedSendingSystem.id,
          selectedReceivingSystem.id,
          1,
        );
        setRateForOneBank(rateOneUnitBank || 0)
        setRateForOne(rateOneUnit || 0);
      }
    }
  }, [selectedSendingSystem, selectedReceivingSystem]);

  useEffect(() => {
    findExchangeRate();
  }, [findExchangeRate]);

  return { exchangeRate, rateForOne, rateForOneBank };
};

const handleSameCurrencyRate = async (coin: string) => {
  if (coin === 'USD') {
    const { currentValueUSDBlueSale } = await updateCurrentValueUSD();
    return currentValueUSDBlueSale || 0;
  } else if (coin === 'EUR') {
    const { currentValueEURBlueSale } = await updateCurrentValueEUR();
    return currentValueEURBlueSale || 0;
  }
  return 0;
};

const handleDifferentCurrencyRate = async (
  fromCoin: string,
  toCoin: string,
) => {
  if (fromCoin === 'USD' && toCoin === 'EUR') {
    const { currentValueUSDToEUR } = await updateCurrentValueUSDToEUR();
    return currentValueUSDToEUR || 0;
  } else if (fromCoin === 'EUR' && toCoin === 'USD') {
    const { currentValueEURToUSD } = await updateCurrentValueUSDToEUR();
    return currentValueEURToUSD || 0;
  }
  return 0;
};
