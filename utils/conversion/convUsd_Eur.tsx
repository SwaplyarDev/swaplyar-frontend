// /utils/conversion/convUsd_Eur.tsx

import { fetchCurrencyData } from './currencyConversion';

// USD to EUR
export async function updateCurrentValueUSDToEUR() {
  const data = await fetchCurrencyData('USD', 'EUR');
  const currentValueEURToUSD = 1 / data.data.EUR;
  const currentValueUSDToEUR = data.data.EUR;

  return { currentValueEURToUSD, currentValueUSDToEUR };
}
