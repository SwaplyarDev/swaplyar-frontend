// /utils/conversion/convEur_Brl.tsx

import { fetchCurrencyData } from './currencyConversion';

/**
 * Funciones específicas que reutilizan fetchCurrencyData.
 */

// EUR to BRL
export async function updateCurrentValueEURToBRL() {
  const data = await fetchCurrencyData('EUR', 'BRL');
  const currentValueBRLToEUR = 1 / data.data.BRL;
  const currentValueEURToBRL = data.data.BRL;

  return { currentValueBRLToEUR, currentValueEURToBRL };
}
