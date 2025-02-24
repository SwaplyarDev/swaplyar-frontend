// /utils/conversion/currencyConversion.ts

import { getExchangeRateStore } from '@/store/exchangeRateStore';

/**
 * Este archivo contiene una función reutilizable para obtener datos de conversión de moneda
 * utilizando la API de FreeCurrencyAPI. Se asegura de manejar múltiples claves API para mejorar
 * la resiliencia en caso de fallos y estandariza el manejo de errores.
 */

// /utils/conversion/currencyConversion.ts

const API_URL = process.env.NEXT_PUBLIC_VALUE_TRANSACTIONS;

if (!API_URL) {
  throw new Error('Falta la URL de la API en las variables de entorno.');
}

export async function fetchCurrencyData(send: string, receive: string): Promise<number> {
  const { ratesOfAPi } = getExchangeRateStore.getState();

  const pair = `${send} a ${receive}`;
  const conversion = ratesOfAPi.find((item: any) => item['Actualizar Monedas Calculadora']['Par de MonedasR'] === pair);

  if (conversion) {
    return conversion['Actualizar Monedas Calculadora']['Valor'];
  } else {
    throw new Error('No se encontró el par de monedas.');
  }
}
