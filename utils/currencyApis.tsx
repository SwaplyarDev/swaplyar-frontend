// /utils/currencyApis.tsx

import { useExchangeRateStore } from '@/store/exchangeRateStore';

import { updateCurrentValueUSDToEUR } from './conversion/convUsd_Eur';
import { updateCurrentValueUSD } from './conversion/convArs_Usd';
import { updateCurrentValueEUR } from './conversion/convArs_Eur';
import { updateCurrentValueEURToBRL } from './conversion/convEur_Brl';
import { updateCurrentValueUSDToBRL } from './conversion/convUsd_Brl';
import { exchangeRates } from './exchangeRates';

//* Función para obtener todas las tasas de cambio
export async function getExchangeRates() {
  try {
    const { currentValueUSDBlueSale, currentValueUSDBluePurchase } = await updateCurrentValueUSD();

    const { currentValueEURBlueSale, currentValueEURBluePurchase } = await updateCurrentValueEUR();

    return {
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

export async function getExchangeRatesUSD_EUR() {
  try {
    const { currentValueEURToUSD, currentValueUSDToEUR } = await updateCurrentValueUSDToEUR();

    return {
      currentValueEURToUSD,
      currentValueUSDToEUR,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting exchange rates USD_EUR:', error.message);
    } else {
      console.error('Unknown error getting exchange rates USD_EUR:', error);
    }
    throw new Error('Failed to get exchange rates USD_EUR');
  }
}

export async function getExchangeRatesUSD_BRL() {
  try {
    const { currentValueBRLToUSD, currentValueUSDToBRL } = await updateCurrentValueUSDToBRL();

    return {
      currentValueBRLToUSD,
      currentValueUSDToBRL,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting exchange rates USD_BRL:', error.message);
    } else {
      console.error('Unknown error getting exchange rates USD_BRL:', error);
    }
    throw new Error('Failed to get exchange rates USD_BRL');
  }
}

export async function getExchangeRatesEUR_BRL() {
  try {
    const { currentValueBRLToEUR, currentValueEURToBRL } = await updateCurrentValueEURToBRL();

    return {
      currentValueBRLToEUR,
      currentValueEURToBRL,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error getting exchange rates EUR_BRL:', error.message);
    } else {
      console.error('Unknown error getting exchange rates EUR_BRL:', error);
    }
    throw new Error('Failed to get exchange rates EUR_BRL');
  }
}

// Función para calcular el monto convertido entre diferentes monedas
export function calculateAmount(from: string, to: string, amount: number, inverse: boolean = false): number {
  try {
    const { rates } = useExchangeRateStore.getState();

    console.log(rates);

    if (!rates || Object.keys(rates).length === 0) {
      throw new Error('Las tasas de cambio no están disponibles.');
    }

    const exchangeRate = exchangeRates.find((rate) => rate.from === from && rate.to === to);

    if (!exchangeRate) {
      throw new Error(`No se encontró una fórmula para convertir de ${from} a ${to}`);
    }

    // Determina la tasa adecuada según el tipo de conversión
    let rate: number;
    let usdToBrl: number = 1;

    switch (from) {
      case 'bank':
        rate =
          to === 'payoneer_usd' || to === 'paypal' || to === 'wise_usd' || to === 'tether' || to === 'pix'
            ? rates.currentValueUSDBlueSale
            : rates.currentValueEURBlueSale;
        usdToBrl = to === 'pix' ? rates.currentValueUSDToBRL : 1;
        break;
      case 'paypal':
      case 'payoneer_usd':
      case 'wise_usd':
      case 'tether':
        rate =
          to === 'bank'
            ? rates.currentValueUSDBluePurchase
            : to === 'pix'
              ? rates.currentValueUSDToBRL
              : rates.currentValueUSDToEUR;
        break;
      case 'payoneer_eur':
      case 'wise_eur':
        rate =
          to === 'bank'
            ? rates.currentValueEURBluePurchase
            : to === 'pix'
              ? rates.currentValueEURToBRL
              : rates.currentValueEURToUSD;
        break;
      default:
        throw new Error(`Conversión de ${from} a ${to} no soportada.`);
    }

    // Usa la fórmula correcta según el valor de 'inverse'
    const formula = inverse ? exchangeRate.inverseFormula : exchangeRate.formula;

    if (!formula) {
      throw new Error(`No hay fórmula ${inverse ? 'inversa' : 'normal'} disponible para convertir de ${from} a ${to}.`);
    }

    const convertedAmount = formula(amount, rate, usdToBrl);

    return parseFloat(convertedAmount.toFixed(2));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error calculando monto:', error.message);
    } else {
      console.error('Error desconocido al calcular monto:', error);
    }
    throw new Error('Failed to calculate amount');
  }
}
