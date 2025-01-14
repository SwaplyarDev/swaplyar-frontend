// /utils/conversion/convUsd_Brl.tsx

import { fetchCurrencyData } from './currencyConversion';

/**
 * Función para obtener las tasas de conversión actuales entre USD y BRL.
 *
 * Esta función utiliza fetchCurrencyData para obtener los datos de conversión
 * de USD a BRL y calcula tanto la tasa de USD a BRL como la tasa inversa de BRL a USD.
 *
 * @returns {Promise<{ currentValueBRLToUSD: number, currentValueUSDToBRL: number }>}
 * Un objeto que contiene las tasas de conversión actuales:
 * - currentValueBRLToUSD: La tasa de conversión de BRL a USD.
 * - currentValueUSDToBRL: La tasa de conversión de USD a BRL.
 *
 * @example
 * const { currentValueBRLToUSD, currentValueUSDToBRL } = await updateCurrentValueUSDToBRL();
 * console.log(`1 USD = ${currentValueUSDToBRL} BRL`);
 * console.log(`1 BRL = ${currentValueBRLToUSD} USD`);
 */
export async function updateCurrentValueUSDToBRL() {
  const data = await fetchCurrencyData('USD', 'BRL');
  const currentValueBRLToUSD = 1 / data.data.BRL;
  const currentValueUSDToBRL = data.data.BRL;

  return { currentValueBRLToUSD, currentValueUSDToBRL };
}
