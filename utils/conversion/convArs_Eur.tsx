const bluelyticsApiUrl = process.env.NEXT_PUBLIC_BLUELYTICS_API_URL;

if (!bluelyticsApiUrl) {
  throw new Error('Missing Bluelytics API URL');
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
