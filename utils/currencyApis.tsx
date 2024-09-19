// /utils/currencyApis.tsx

import { exchangeRates } from './exchangeRates';

const apiKey = "fca_live_jDqUTcYj3stjWVDFqGZCmIBAt3hIEEtiTBPSMD3N";
const bluelyticsApiUrl = "https://api.bluelytics.com.ar/v2/latest";

if (!apiKey) {
  throw new Error('Missing FreeCurrencyAPI Key');
}

if (!bluelyticsApiUrl) {
  throw new Error('Missing Bluelytics API URL');
}

//* Función para calcular el precio del dolar/euro usando FreeCurrencyAPI
export async function updateCurrentValueUSDToEUR() {
  try {
    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`,
    );

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error(
        'Error fetching currency data from FreeCurrencyAPI:',
        errorMessage,
      );
      throw new Error(errorMessage);
    }

    const data = await response.json();

    let currentValueEURToUSD = 1 / data.data.EUR;
    let currentValueUSDToEUR = data.data.EUR;

    return { currentValueEURToUSD, currentValueUSDToEUR };
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'Error fetching currency data from FreeCurrencyAPI:',
        error.message,
      );
    } else {
      console.error(
        'Unknown error fetching currency data from FreeCurrencyAPI:',
        error,
      );
    }
    throw new Error('Failed to fetch currency data from FreeCurrencyAPI');
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
async function getExchangeRates() {
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

//* Función para calcular el monto convertido entre diferentes monedas
export async function calculateAmount(
  from: string,
  to: string,
  amount: number,
): Promise<number> {
  try {
    const rates = await getExchangeRates();

    // Encuentra la fórmula correspondiente en exchangeRates
    const exchangeRate = exchangeRates.find(
      (rate) => rate.from === from && rate.to === to,
    );

    if (!exchangeRate) {
      throw new Error(
        `No se encontró una fórmula para convertir de ${from} a ${to}`,
      );
    }

    // Determina qué tasa de cambio se debe usar dependiendo de 'from' y 'to'
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

    // Aplica la fórmula de conversión
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

// Ejemplo de uso:
(async () => {
  try {
    const result = await calculateAmount('payoneer_eur', 'bank', 1);
    console.log(`Resultado de la conversión: ${result}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en la conversión:', error.message);
    } else {
      console.error('Error desconocido en la conversión:', error);
    }
  }
})();
