// /utils/currencyApis.tsx

import { getExchangeRateStore } from '@/store/exchangeRateStore';

import { updateCurrentValueUSDToEUR } from './conversion/convUsd_Eur';
import { getCurrentValueUSD } from './conversion/convArs_Usd';
import { getCurrentValueEUR } from './conversion/convArs_Eur';
import { updateCurrentValueEURToBRL } from './conversion/convEur_Brl';
import { updateCurrentValueUSDToBRL } from './conversion/convUsd_Brl';
import { exchangeRates } from './exchangeRates';

//* Función para obtener todas las tasas de cambio
export async function getExchangeRates() {
  try {
    const { currentValueUSDBlueSale, currentValueUSDBluePurchase } = getCurrentValueUSD();
    const { currentValueEURBlueSale, currentValueEURBluePurchase } = getCurrentValueEUR();

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
    const { rates } = getExchangeRateStore.getState(); // Accede al estado directamente

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

// Funcion para validar montos enviados y recibidos de la calculadora
export const validSendReceive = (
  amountSend: number,
  sendingSystemId: string,
  receiveAmountNum: number,
  receivingSystemId: string,
) => {
  const { rates } = getExchangeRateStore.getState();

  if (sendingSystemId === 'paypal' || sendingSystemId === 'wise_usd' || sendingSystemId === 'tether') {
    if (receivingSystemId === 'payoneer_usd' || receivingSystemId === 'payoneer_eur') {
      return receiveAmountNum > 50;
    } else {
      return amountSend >= 10;
    }
  } else if (sendingSystemId === 'bank') {
    const convertUsd = amountSend / rates.currentValueUSDBlueSale;
    if (receivingSystemId === 'payoneer_usd' || receivingSystemId === 'payoneer_eur') {
      return receiveAmountNum > 50;
    } else {
      return convertUsd >= 10;
    }
  } else if (sendingSystemId === 'wise_eur') {
    const convertUsd = rates.currentValueEURToUSD * amountSend;
    if (receivingSystemId === 'payoneer_usd' || receivingSystemId === 'payoneer_eur') {
      return receiveAmountNum > 50;
    } else {
      return convertUsd >= 10;
    }
  } else if (sendingSystemId === 'payoneer_usd' || sendingSystemId === 'payoneer_eur') {
    if (receivingSystemId === 'payoneer_usd' || receivingSystemId === 'payoneer_eur') {
      return receiveAmountNum > 50;
    } else {
      return amountSend >= 50;
    }
  }

  return true;
};
