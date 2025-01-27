// /utils/conversion/convArs_Usd.tsx

const ApiUrl = process.env.NEXT_PUBLIC_VALUE_TRANSACTIONS;

if (!ApiUrl) {
  throw new Error('Missing API URL');
}

//* Función para calcular precio de compra/venta del dólar blue usando
export async function updateCurrentValueUSD() {
  try {
    const response = await fetch(`${ApiUrl}`, {
      method: 'GET',
      redirect: 'follow', // Asegúrate de seguir las redirecciones
    });
    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error('Error fetching Blue USD data:', errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const conversionUSDBlueSale = data.find(
      (item: any) => item['Actualizar Monedas Calculadora']['Par de MonedasR'] === 'USD Blue (Venta)',
    );
    const conversionUSDBluePurchase = data.find(
      (item: any) => item['Actualizar Monedas Calculadora']['Par de MonedasR'] === 'USD Blue (Compra)',
    );
    if (conversionUSDBlueSale && conversionUSDBluePurchase) {
      let currentValueUSDBlueSale = conversionUSDBlueSale['Actualizar Monedas Calculadora']['Valor'];
      let currentValueUSDBluePurchase = conversionUSDBluePurchase['Actualizar Monedas Calculadora']['Valor'];

      return { currentValueUSDBlueSale, currentValueUSDBluePurchase };
    } else {
      throw new Error('No se encontró el par de monedas.');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching Blue USD data:', error.message);
    } else {
      console.error('Unknown error fetching Blue USD data:', error);
    }
    throw new Error('Failed to fetch Blue USD data');
  }
}
