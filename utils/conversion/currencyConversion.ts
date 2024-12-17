// /utils/conversion/currencyConversion.ts

const apiKey = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY;
const apiKey2 = process.env.NEXT_PUBLIC_FREE_CURRENCY_APY_KEY;
const url = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_URL;

if (!apiKey || !apiKey2) {
  throw new Error('Missing one or both FreeCurrencyAPI Keys');
}

interface CurrencyData {
  data: Record<string, number>;
}

/**
 * Función reutilizable para obtener datos de conversión de moneda desde FreeCurrencyAPI.
 * @param baseCurrency - Moneda base para la conversión.
 * @param targetCurrencies - Monedas destino separadas por comas (ej. "BRL,USD").
 * @returns Un objeto con las conversiones solicitadas.
 */
export async function fetchCurrencyData(baseCurrency: string, targetCurrencies: string): Promise<CurrencyData> {
  const fetchFromApi = async (key: string): Promise<CurrencyData> => {
    const response = await fetch(`${url}?apikey=${key}&currencies=${targetCurrencies}&base_currency=${baseCurrency}`);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error('Error fetching currency data:', errorMessage);
      throw new Error(errorMessage);
    }
    return response.json();
  };

  try {
    const [data1, data2] = await Promise.allSettled([fetchFromApi(apiKey as string), fetchFromApi(apiKey2 as string)]);

    const successfulData = [data1, data2]
      .filter((result): result is PromiseFulfilledResult<CurrencyData> => result.status === 'fulfilled')
      .map((result) => result.value);

    if (successfulData.length === 0) {
      throw new Error('Failed to fetch currency data from both API keys');
    }

    return successfulData[0];
  } catch (error) {
    console.error('Error fetching currency data:', error instanceof Error ? error.message : error);
    throw new Error('Failed to fetch currency data');
  }
}
