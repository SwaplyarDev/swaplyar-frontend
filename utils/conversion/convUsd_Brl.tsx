const { NEXT_PUBLIC_FREE_CURRENCY_API_KEY, NEXT_PUBLIC_FREE_CURRENCY_APY_KEY, NEXT_PUBLIC_FREE_CURRENCY_API_URL } =
  process.env;

interface CurrencyData {
  data: {
    BRL: number;
  };
}

/**
 * Función para calcular el precio del dólar/euro usando FreeCurrencyAPI
 * @returns Valores de conversión entre BRL y USD
 */
export async function updateCurrentValueUSDToBRL() {
  const fetchCurrencyData = async (key: string): Promise<CurrencyData> => {
    const response = await fetch(`${NEXT_PUBLIC_FREE_CURRENCY_API_URL}?apikey=${key}=EUR%2CUSD%2CBRL`);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error('Error fetching currency data from FreeCurrencyAPI:', errorMessage);
      throw new Error(errorMessage);
    }

    return response.json();
  };

  try {
    const [data1, data2] = await Promise.allSettled([
      fetchCurrencyData(NEXT_PUBLIC_FREE_CURRENCY_API_KEY as string),
      fetchCurrencyData(NEXT_PUBLIC_FREE_CURRENCY_APY_KEY as string),
    ]);

    const successfulData = [data1, data2]
      .filter((result): result is PromiseFulfilledResult<CurrencyData> => result.status === 'fulfilled')
      .map((result) => result.value);

    if (successfulData.length === 0) {
      throw new Error('Failed to fetch currency data from both API keys');
    }

    const data = successfulData[0];
    const currentValueBRLToUSD = 1 / data.data.BRL;
    const currentValueUSDToBRL = data.data.BRL;

    return { currentValueBRLToUSD, currentValueUSDToBRL };
  } catch (error) {
    console.error('Error fetching currency data from both API keys:', error instanceof Error ? error.message : error);
    throw new Error('Failed to fetch currency data from both API keys');
  }
}
