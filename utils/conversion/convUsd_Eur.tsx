const apiKey = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY;
const apiKey2 = process.env.NEXT_PUBLIC_FREE_CURRENCY_APY_KEY;
const url = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_URL;

if (!apiKey || !apiKey2) {
  throw new Error('Missing one or both FreeCurrencyAPI Keys');
}

interface CurrencyData {
  data: {
    EUR: number;
  };
}

/**
 * Función para calcular el precio del dólar/euro usando FreeCurrencyAPI
 * @returns Valores de conversión entre EUR y USD
 */
export async function updateCurrentValueUSDToEUR() {
  const fetchCurrencyData = async (key: string): Promise<CurrencyData> => {
    const response = await fetch(`${url}?apikey=${key}=EUR%2CUSD%2CBRL`);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error('Error fetching currency data from FreeCurrencyAPI:', errorMessage);
      throw new Error(errorMessage);
    }

    return response.json();
  };

  try {
    const [data1, data2] = await Promise.allSettled([
      fetchCurrencyData(apiKey as string),
      fetchCurrencyData(apiKey2 as string),
    ]);

    const successfulData = [data1, data2]
      .filter((result): result is PromiseFulfilledResult<CurrencyData> => result.status === 'fulfilled')
      .map((result) => result.value);

    if (successfulData.length === 0) {
      throw new Error('Failed to fetch currency data from both API keys');
    }

    const data = successfulData[0];
    const currentValueEURToUSD = 1 / data.data.EUR;
    const currentValueUSDToEUR = data.data.EUR;

    return { currentValueEURToUSD, currentValueUSDToEUR };
  } catch (error) {
    console.error('Error fetching currency data from both API keys:', error instanceof Error ? error.message : error);
    throw new Error('Failed to fetch currency data from both API keys');
  }
}
