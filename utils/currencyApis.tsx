// /utils/currencyApis.tsx

import { useExchangeRateStore } from '@/store/exchangeRateStore';
import { exchangeRates } from './exchangeRates';
import { updateCurrentValueUSDToEUR } from './conversion/convUsd_Eur';
import { updateCurrentValueUSD } from './conversion/convArs_Usd';
import { updateCurrentValueEUR } from './conversion/convArs_Eur';

//* Función para obtener todas las tasas de cambio
export async function getExchangeRates() {
  try {
    const { currentValueUSDBlueSale, currentValueUSDBluePurchase } =
      await updateCurrentValueUSD();

    const { currentValueEURBlueSale, currentValueEURBluePurchase } =
      await updateCurrentValueEUR();

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
    const { currentValueEURToUSD, currentValueUSDToEUR } =
      await updateCurrentValueUSDToEUR();
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
): number {
  try {
    const { rates } = useExchangeRateStore.getState();
    console.log('Las tasas de cambio son:', rates);

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

export {
  updateCurrentValueUSDToEUR,
  updateCurrentValueUSD,
  updateCurrentValueEUR,
};

// (async function testCalculateAmount() {
//   const from = 'paypal'; // Cambia esto según tu prueba
//   const to = 'wise_eur'; // Cambia esto según tu prueba
//   const amount = 1; // Monto que deseas convertir

//   // Usa setTimeout para esperar 10 segundos antes de ejecutar el código
//   setTimeout(async () => {
//     try {
//       // Asegúrate de que las tasas están actualizadas
//       await getExchangeRates(); // Asegúrate de llamar a la función para obtener tasas antes de calcular
//       await getExchangeRatesUSD_EUR();

//       const convertedAmount = calculateAmount(from, to, amount);
//       console.log(`Convertido: ${amount} ${from} a ${to} = ${convertedAmount}`);
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error('Error al calcular el monto:', error.message);
//       } else {
//         console.error('Error desconocido al calcular el monto:', error);
//       }
//     }
//   }, 10000); // 10 segundos = 10000 milisegundos
// })();
