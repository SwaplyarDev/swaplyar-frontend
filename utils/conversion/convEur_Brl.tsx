// /utils/conversion/convEur_Brl.tsx

import { fetchCurrencyData } from './currencyConversion';

/**
 * Función para obtener las tasas de conversión actuales entre EUR y BRL.
 *
 * Esta función utiliza fetchCurrencyData para obtener los datos de conversión
 * de EUR a BRL y calcula tanto la tasa de EUR a BRL como la tasa inversa de BRL a EUR.
 *
 * @returns {Promise<{ currentValueBRLToEUR: number, currentValueEURToBRL: number }>}
 * Un objeto que contiene las tasas de conversión actuales:
 * - currentValueBRLToEUR: La tasa de conversión de BRL a EUR.
 * - currentValueEURToBRL: La tasa de conversión de EUR a BRL.
 *
 * @example
 * const { currentValueBRLToEUR, currentValueEURToBRL } = await updateCurrentValueEURToBRL();
 * console.log(`1 EUR = ${currentValueEURToBRL} BRL`);
 * console.log(`1 BRL = ${currentValueBRLToEUR} EUR`);
 */
export async function updateCurrentValueEURToBRL() {
  const data = await fetchCurrencyData('EUR', 'BRL');
  // Verificar que data es un número
  if (typeof data !== 'number') {
    throw new Error('El dato recibido no es un número.');
  }
  const currentValueBRLToEUR = 1 / data;
  const currentValueEURToBRL = data;

  return { currentValueBRLToEUR, currentValueEURToBRL };
}
