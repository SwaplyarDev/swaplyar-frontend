// /utils/currencyApis.tsx

import { useExchangeRateStore } from '@/store/exchangeRateStore';
import { exchangeRates } from './exchangeRates';

const apiKey = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY;
const apiKey2 = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY2;
const bluelyticsApiUrl = process.env.NEXT_PUBLIC_BLUELYTICS_API_URL;

if (!apiKey && !apiKey2) {
  throw new Error('Missing both FreeCurrencyAPI Keys');
}

if (!bluelyticsApiUrl) {
  throw new Error('Missing Bluelytics API URL');
}

//* Función para calcular el precio del dolar/euro usando FreeCurrencyAPI
export async function updateCurrentValueUSDToEUR() {
  const fetchCurrencyData = async (key: string) => {
    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${key}`,
    );

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error(
        'Error fetching currency data from FreeCurrencyAPI:',
        errorMessage,
      );
      throw new Error(errorMessage);
    }

    return response.json();
  };

  try {
    const data = await fetchCurrencyData(apiKey!);

    let currentValueEURToUSD = 1 / data.data.EUR;
    let currentValueUSDToEUR = data.data.EUR;

    return { currentValueEURToUSD, currentValueUSDToEUR };
  } catch (error) {
    console.error(
      'Error with the first API key, trying with the second key...',
    );

    try {
      const data = await fetchCurrencyData(apiKey2!);
      let currentValueEURToUSD = 1 / data.data.EUR;
      let currentValueUSDToEUR = data.data.EUR;

      return { currentValueEURToUSD, currentValueUSDToEUR };
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          'Error fetching currency data from FreeCurrencyAPI with the second API key:',
          error.message,
        );
      } else {
        console.error(
          'Unknown error fetching currency data from FreeCurrencyAPI with the second API key:',
          error,
        );
      }
      throw new Error('Failed to fetch currency data from both API keys');
    }
  }
}

//* Función para calcular precio de compra/venta del dólar blue usando Bluelytics
export async function updateCurrentValueUSD() {
  try {
    const response = await fetch(`${bluelyticsApiUrl}`);
    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error(
        'Error fetching Blue USD data from Bluelytics:',
        errorMessage,
      );
      throw new Error(errorMessage);
    }

    const data = await response.json();

    let currentValueUSDBlueSale = data.blue.value_sell;
    let currentValueUSDBluePurchase = data.blue.value_buy;

    return { currentValueUSDBlueSale, currentValueUSDBluePurchase };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'Error fetching Blue USD data from Bluelytics:',
        error.message,
      );
    } else {
      console.error(
        'Unknown error fetching Blue USD data from Bluelytics:',
        error,
      );
    }
    throw new Error('Failed to fetch Blue USD data from Bluelytics');
  }
}

//* Función para calcular precio de compra/venta del euro blue usando Bluelytics
export async function updateCurrentValueEUR() {
  try {
    const response = await fetch(`${bluelyticsApiUrl}`);
    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error(
        'Error fetching Blue EUR data from Bluelytics:',
        errorMessage,
      );
      throw new Error(errorMessage);
    }

    const data = await response.json();

    let currentValueEURBlueSale = data.blue_euro.value_sell;
    let currentValueEURBluePurchase = data.blue_euro.value_buy;

    return { currentValueEURBlueSale, currentValueEURBluePurchase };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'Error fetching Blue EUR data from Bluelytics:',
        error.message,
      );
    } else {
      console.error(
        'Unknown error fetching Blue EUR data from Bluelytics:',
        error,
      );
    }
    throw new Error('Failed to fetch Blue EUR data from Bluelytics');
  }
}

//* Función para obtener todas las tasas de cambio
export async function getExchangeRates() {
  try {
    const { currentValueEURToUSD, currentValueUSDToEUR } =
      await updateCurrentValueUSDToEUR();

    const { currentValueUSDBlueSale, currentValueUSDBluePurchase } =
      await updateCurrentValueUSD();

    const { currentValueEURBlueSale, currentValueEURBluePurchase } =
      await updateCurrentValueEUR();

    return {
      currentValueEURToUSD,
      currentValueUSDToEUR,
      currentValueUSDBlueSale,
      currentValueUSDBluePurchase,
      currentValueEURBlueSale,
      currentValueEURBluePurchase,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting exchange rates:', error.message);
    } else {
      console.error('Unknown error getting exchange rates:', error);
    }
    throw new Error('Failed to get exchange rates');
  }
}

// Función para calcular el monto convertido entre diferentes monedas
export function calculateAmount(
  from: string,
  to: string,
  amount: number,
): number {
  try {
    const { rates } = useExchangeRateStore.getState();

    // Verifica si las tasas están disponibles
    if (!rates || Object.keys(rates).length === 0) {
      throw new Error('Las tasas de cambio no están disponibles.');
    }

    const exchangeRate = exchangeRates.find(
      (rate) => rate.from === from && rate.to === to,
    );

    if (!exchangeRate) {
      throw new Error(
        `No se encontró una fórmula para convertir de ${from} a ${to}`,
      );
    }

    let rate = 1; // Tasa por defecto

    // Determina qué tasa de cambio se debe usar dependiendo de 'from' y 'to'
    switch (from) {
      case 'bank':
        rate =
          to === 'payoneer_usd' || to === 'paypal' || to === 'wise_usd'
            ? rates.currentValueUSDBlueSale
            : rates.currentValueEURBlueSale;
        break;
      case 'paypal':
      case 'payoneer_usd':
      case 'wise_usd':
        rate =
          to === 'bank'
            ? rates.currentValueUSDBluePurchase
            : rates.currentValueUSDToEUR;
        break;
      case 'payoneer_eur':
      case 'wise_eur':
        rate =
          to === 'bank'
            ? rates.currentValueEURBluePurchase
            : rates.currentValueEURToUSD;
        break;
      default:
        throw new Error(`Conversión de ${from} a ${to} no soportada.`);
    }

    const convertedAmount = exchangeRate.formula(amount, rate);
    return parseFloat(convertedAmount.toFixed(2));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error calculating amount:', error.message);
    } else {
      console.error('Unknown error calculating amount:', error);
    }
    throw new Error('Failed to calculate amount');
  }
}

export async function calculateInverseAmount(
  from: string,
  to: string,
  amountToReceive: number,
): Promise<number> {
  try {
    const { rates } = useExchangeRateStore.getState();

    if (!rates || Object.keys(rates).length === 0) {
      throw new Error('Las tasas de cambio no están disponibles.');
    }

    const exchangeRate = exchangeRates.find(
      (rate) => rate.from === from && rate.to === to,
    );

    if (!exchangeRate) {
      throw new Error(
        `No se encontró una fórmula para convertir de ${from} a ${to}`,
      );
    }

    let rate = 1; // Tasa por defecto

    switch (from) {
      case 'bank':
        if (to === 'payoneer_usd' || to === 'paypal' || to === 'wise_usd') {
          rate = rates.currentValueUSDBlueSale;
        } else if (to === 'payoneer_eur' || to === 'wise_eur') {
          rate = rates.currentValueEURBlueSale;
        }
        break;
      case 'paypal':
      case 'payoneer_usd':
      case 'wise_usd':
        if (to === 'bank') {
          rate = rates.currentValueUSDBluePurchase;
        } else if (to === 'payoneer_eur' || to === 'wise_eur') {
          rate = rates.currentValueUSDToEUR;
        }
        break;
      case 'payoneer_eur':
      case 'wise_eur':
        if (to === 'bank') {
          rate = rates.currentValueEURBluePurchase;
        } else if (to === 'payoneer_usd' || to === 'wise_usd') {
          rate = rates.currentValueEURToUSD;
        }
        break;
      default:
        throw new Error(`Conversión de ${from} a ${to} no soportada.`);
    }

    const inverseAmount =
      (amountToReceive * rate) / (1 - obtenerPorcentajeDescuento(from, to));

    return parseFloat(inverseAmount.toFixed(2));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error calculating inverse amount:', error.message);
    } else {
      console.error('Unknown error calculating inverse amount:', error);
    }
    throw new Error('Failed to calculate inverse amount');
  }
}

// Esta función auxiliar obtiene el porcentaje de descuento aplicado en las conversiones
function obtenerPorcentajeDescuento(from: string, to: string): number {
  const exchangeRate = exchangeRates.find(
    (rate) => rate.from === from && rate.to === to,
  );

  if (!exchangeRate) {
    throw new Error(
      `No se encontró una fórmula para obtener el descuento de ${from} a ${to}`,
    );
  }

  if (exchangeRate.formula.toString().includes('1 - 0.04')) {
    return 0.04;
  } else if (exchangeRate.formula.toString().includes('1 - 0.05')) {
    return 0.05;
  } else if (exchangeRate.formula.toString().includes('1 - 0.12')) {
    return 0.12;
  } else if (exchangeRate.formula.toString().includes('1 - 0.14')) {
    return 0.14;
  }
  return 0;
}
