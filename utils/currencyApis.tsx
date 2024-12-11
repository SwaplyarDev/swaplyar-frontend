// /utils/currencyApis.tsx

import { useExchangeRateStore } from '@/store/exchangeRateStore';
import { exchangeRates } from './exchangeRates';
import { updateCurrentValueUSDToEUR } from './conversion/convUsd_Eur';
import { updateCurrentValueUSD } from './conversion/convArs_Usd';
import { updateCurrentValueEUR } from './conversion/convArs_Eur';

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
    console.log('Tasas de USD a EUR actualizadas:', currentValueUSDToEUR);
    console.log('Tasas de EUR a USD actualizadas:', currentValueEURToUSD);

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

// Función para calcular el monto convertido entre diferentes monedas
export function calculateAmount(
  from: string,
  to: string,
  amount: number,
  inverse: boolean = false, // Parámetro para usar fórmula inversa
): number {
  try {
    const { rates } = useExchangeRateStore.getState();
    console.log('Las tasas de cambio son:', rates);

    if (!rates || Object.keys(rates).length === 0) {
      throw new Error('Las tasas de cambio no están disponibles.');
    }

    const exchangeRate = exchangeRates.find((rate) => rate.from === from && rate.to === to);

    if (!exchangeRate) {
      throw new Error(`No se encontró una fórmula para convertir de ${from} a ${to}`);
    }

    // Determina la tasa adecuada según el tipo de conversión
    let rate: number;
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
        rate = to === 'bank' ? rates.currentValueUSDBluePurchase : rates.currentValueUSDToEUR;
        break;
      case 'payoneer_eur':
      case 'wise_eur':
        rate = to === 'bank' ? rates.currentValueEURBluePurchase : rates.currentValueEURToUSD;
        break;
      default:
        throw new Error(`Conversión de ${from} a ${to} no soportada.`);
    }

    // Usa la fórmula correcta según el valor de 'inverse'
    const convertedAmount = inverse
      ? exchangeRate.inverseFormula
        ? exchangeRate.inverseFormula(amount, rate)
        : (() => {
            throw new Error(`No hay fórmula inversa para ${from} a ${to}`);
          })()
      : exchangeRate.formula(amount, rate);

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

(async function testCalculateAmount() {
  const from = 'paypal'; // Cambiar según la prueba
  const to = 'payoneer_eur'; // Destino
  const amountToReceive = 600000; // Monto a recibir en 'bank'

  // Usa setTimeout para esperar 10 segundos antes de ejecutar el cálculo
  setTimeout(async () => {
    try {
      console.log('Iniciando cálculo inverso...');

      // Asegúrate de tener tasas actualizadas antes del cálculo
      await getExchangeRates();
      await getExchangeRatesUSD_EUR();

      // Llamada al cálculo inverso
      const inverseAmount = await calculateAmount(from, to, amountToReceive, true);

      console.log(`Para recibir ${amountToReceive} ${to}, debes enviar ${inverseAmount.toFixed(2)} ${from}.`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al calcular el monto inverso:', error.message);
      } else {
        console.error('Error desconocido al calcular el monto inverso:', error);
      }
    }
  }, 10000); // 10 segundos de espera (10,000 ms)
})();
