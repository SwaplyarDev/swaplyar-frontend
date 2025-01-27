// /utils/conversion/convUsd_Eur.tsx

import { fetchCurrencyData } from './currencyConversion';

/**
 * Función para obtener las tasas de conversión actuales entre USD y EUR.
 *
 * Esta función utiliza fetchCurrencyData para obtener los datos de conversión
 * de USD a EUR y calcula tanto la tasa de USD a EUR como la tasa inversa de EUR a USD.
 *
 * @returns {Promise<{ currentValueEURToUSD: number, currentValueUSDToEUR: number }>}
 * Un objeto que contiene las tasas de conversión actuales:
 * - currentValueEURToUSD: La tasa de conversión de EUR a USD.
 * - currentValueUSDToEUR: La tasa de conversión de USD a EUR.
 *
 * @example
 * const { currentValueEURToUSD, currentValueUSDToEUR } = await updateCurrentValueUSDToEUR();
 * console.log(`1 USD = ${currentValueUSDToEUR} EUR`);
 * console.log(`1 EUR = ${currentValueEURToUSD} USD`);
 */
export async function updateCurrentValueUSDToEUR() {
  const data = await fetchCurrencyData('USD', 'EUR');
  // Verificar que data es un número
  if (typeof data !== 'number') {
    throw new Error('El dato recibido no es un número.');
  }
  const currentValueEURToUSD = 1 / data;
  const currentValueUSDToEUR = data;

  return { currentValueEURToUSD, currentValueUSDToEUR };
}
