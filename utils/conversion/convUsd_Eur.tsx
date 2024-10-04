const apiKey = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY;
const apiKey2 = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY2;

if (!apiKey && !apiKey2) {
  throw new Error('Missing both FreeCurrencyAPI Keys');
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
