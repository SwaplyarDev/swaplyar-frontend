// /utils/conversion/convArs_Eur.tsx

const ApiUrl = process.env.NEXT_PUBLIC_VALUE_TRANSACTIONS;

if (!ApiUrl) {
  throw new Error('Falta la URL de la API en las variables de entorno.');
}

//* Función para calcular precio de compra/venta del euro blue usando
export async function updateCurrentValueEUR() {
  try {
    const response = await fetch(`${ApiUrl}`, {
      method: 'GET',
      redirect: 'follow',
    });
    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error('Error fetching Blue EUR data:', errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const conversionEURBlueSale = data.find(
      (item: any) => item['Actualizar Monedas Calculadora']['Par de MonedasR'] === 'EUR Blue (Venta)',
    );
    const conversionEURBluePurchase = data.find(
      (item: any) => item['Actualizar Monedas Calculadora']['Par de MonedasR'] === 'EUR Blue (Compra)',
    );

    if (conversionEURBlueSale && conversionEURBluePurchase) {
      let currentValueEURBlueSale = conversionEURBlueSale['Actualizar Monedas Calculadora']['Valor'];
      let currentValueEURBluePurchase = conversionEURBluePurchase['Actualizar Monedas Calculadora']['Valor'];

      return { currentValueEURBlueSale, currentValueEURBluePurchase };
    } else {
      throw new Error('No se encontró el par de monedas.');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching Blue EUR data:', error.message);
    } else {
      console.error('Unknown error fetching Blue EUR data:', error);
    }
    throw new Error('Failed to fetch Blue EUR data');
  }
}
