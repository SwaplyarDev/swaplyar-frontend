const apiKey = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY;
const apiKey2 = process.env.NEXT_PUBLIC_FREE_CURRENCY_APY_KEY;

const apiUrl = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_URL;

if (!apiKey && !apiKey2) {
  throw new Error('Missing both FreeCurrencyAPI Keys');
}

//* Interfaz para los datos de respuesta de la API
interface CurrencyData {
  data: {
    EUR: number;
  };
}

//* Función para calcular el precio del dolar/euro usando FreeCurrencyAPI
export async function updateCurrentValueUSDToEUR() {
  const fetchCurrencyData = async (key: string): Promise<CurrencyData> => {
    // const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${key}`);
    const response = await fetch(`${apiUrl}?apikey=${key}`);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error('Error fetching currency data from FreeCurrencyAPI:', errorMessage);
      throw new Error(errorMessage);
    }

    return response.json();
  };

  try {
    const [data1, data2] = await Promise.all([fetchCurrencyData(apiKey!), fetchCurrencyData(apiKey2!)]);

    const data = data1 ?? data2; // Usa data1 si existe, de lo contrario data2
    let currentValueEURToUSD = 1 / data.data.EUR;
    let currentValueUSDToEUR = data.data.EUR;

    return { currentValueEURToUSD, currentValueUSDToEUR };
  } catch (error) {
    console.error('Error fetching currency data from both API keys:', error instanceof Error ? error.message : error);
    throw new Error('Failed to fetch currency data from both API keys');
  }
}
