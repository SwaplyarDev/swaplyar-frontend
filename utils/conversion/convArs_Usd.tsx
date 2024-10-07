const bluelyticsApiUrl = process.env.NEXT_PUBLIC_BLUELYTICS_API_URL;

if (!bluelyticsApiUrl) {
  throw new Error('Missing Bluelytics API URL');
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
