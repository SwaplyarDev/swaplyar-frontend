// /utils/conversion/convUsd_Brl.tsx

import { fetchCurrencyData } from './currencyConversion';

// USD to BRL
export async function updateCurrentValueUSDToBRL() {
  const data = await fetchCurrencyData('USD', 'BRL');
  const currentValueBRLToUSD = 1 / data.data.BRL;
  const currentValueUSDToBRL = data.data.BRL;

  return { currentValueBRLToUSD, currentValueUSDToBRL };
}
