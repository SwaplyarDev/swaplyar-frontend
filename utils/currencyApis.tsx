import { exchangeRates } from './exchangeRates';

const apiKey = process.env.NEXT_PUBLIC_FREE_CURRENCY_APY_KEY;

//* Función para calcular precio del dolar/euro
export async function updateCurrentValueUSDToEUR() {
  try {
    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`,
    );
    const data = await response.json();

    let currentValueEURToUSD = 1 / data.data.EUR;
    let currentValueUSDToEUR = data.data.EUR;

    // console.log(`con 1 euro compro ${currentValueEURToUSD} dolares`);
    // console.log(`con 1 dolar compro ${currentValueUSDToEUR} euros`);

    return { currentValueEURToUSD, currentValueUSDToEUR };
  } catch (error) {
    throw new Error('Network response was not ok');
  }
}

//*Función para calcular precio de compra/venta dolar blue
export async function updateCurrentValueUSD() {
  try {
    const response = await fetch(`https://api.bluelytics.com.ar/v2/latest`);
    const data = await response.json();

    let currentValueUSDBlueSale = data.blue.value_sell;
    let currentValueUSDBluePurchase = data.blue.value_buy;

    // console.log(`Dolar blue venta: ${currentValueUSDBlueSale}`);
    // console.log(`Dolar blue compra: ${currentValueUSDBluePurchase}`);

    return { currentValueUSDBlueSale, currentValueUSDBluePurchase };
  } catch (error) {
    throw new Error('Network response was not ok');
  }
}

//*Función para calcular precio de compra/venta euro blue
export async function updateCurrentValueEUR() {
  try {
    const response = await fetch(`https://api.bluelytics.com.ar/v2/latest`);
    const data = await response.json();

    let currentValueEURBlueSale = data.blue_euro.value_sell;
    let currentValueEURBluePurchase = data.blue_euro.value_buy;

    // console.log(`Euro blue venta: ${currentValueEURBlueSale}`);
    // console.log(`Euro blue compra: ${currentValueEURBluePurchase}`);

    return { currentValueEURBlueSale, currentValueEURBluePurchase };
  } catch (error) {
    throw new Error('Network response was not ok');
  }
}

async function getExchangeRates() {
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
}

export async function calculateAmount(
  from: string,
  to: string,
  amount: number,
): Promise<number> {
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
  let rate = 1; // Default rate

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

  // Aplica la fórmula
  const convertedAmount = exchangeRate.formula(amount, rate);
  return parseFloat(convertedAmount.toFixed(2));
}

// Ejemplo de uso:
(async () => {
  const result = await calculateAmount('payoneer_eur', 'bank', 1);
  console.log(`Resultado de la conversión: ${result}`);
})();
