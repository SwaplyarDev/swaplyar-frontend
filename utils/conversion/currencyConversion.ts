// /utils/conversion/currencyConversion.ts

/**
 * Este archivo contiene una función reutilizable para obtener datos de conversión de moneda
 * utilizando la API de FreeCurrencyAPI. Se asegura de manejar múltiples claves API para mejorar
 * la resiliencia en caso de fallos y estandariza el manejo de errores.
 */

// Obtención de claves y URL desde las variables de entorno
const API_URL = process.env.NEXT_PUBLIC_FREE_CURRENCY_API_URL;
const API_KEYS = [process.env.NEXT_PUBLIC_FREE_CURRENCY_API_KEY, process.env.NEXT_PUBLIC_FREE_CURRENCY_APY_KEY];

// Validación de claves API necesarias
if (!API_URL || API_KEYS.some((key) => !key)) {
  throw new Error('Missing API URL or one/both FreeCurrencyAPI keys');
}

// Definición de la estructura esperada en la respuesta de la API
interface CurrencyData {
  /**
   * Representa los datos de conversión devueltos por la API.
   * Cada clave es una moneda de destino (por ejemplo, "BRL"), y el valor es el tipo de cambio.
   */
  data: Record<string, number>;
}

/**
 * Función principal para obtener datos de conversión de moneda desde FreeCurrencyAPI.
 * Esta función utiliza dos claves API para garantizar alta disponibilidad en caso
 * de que una clave falle o exceda el límite de solicitudes.
 *
 * @param baseCurrency - La moneda base desde la que se realizará la conversión (por ejemplo, "EUR").
 * @param targetCurrencies - Las monedas destino separadas por comas (por ejemplo, "BRL,USD").
 * @returns Un objeto `CurrencyData` que contiene los valores de conversión entre las monedas solicitadas.
 *
 * @throws Error si ambas solicitudes a la API fallan o si la respuesta de la API es inválida.
 */
export async function fetchCurrencyData(baseCurrency: string, targetCurrencies: string): Promise<CurrencyData> {
  /**
   * Realiza una solicitud a la API con una clave específica.
   *
   * @param key - Clave API a usar para la solicitud.
   * @returns Promesa que resuelve a los datos de conversión (`CurrencyData`).
   */
  const fetchFromApi = async (key: string): Promise<CurrencyData> => {
    const response = await fetch(
      `${API_URL}?apikey=${key}&currencies=${targetCurrencies}&base_currency=${baseCurrency}`,
    );

    if (!response.ok) {
      const errorMessage = `Error al obtener datos de la API: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    return response.json();
  };

  try {
    // Ejecuta solicitudes en paralelo con las dos claves API
    const [data1, data2] = await Promise.allSettled(API_KEYS.map((key) => fetchFromApi(key as string)));

    // Filtra las respuestas exitosas
    const successfulData = [data1, data2]
      .filter((result): result is PromiseFulfilledResult<CurrencyData> => result.status === 'fulfilled')
      .map((result) => result.value);

    // Lanza un error si ambas solicitudes fallaron
    if (successfulData.length === 0) {
      throw new Error('Error: Fallaron ambas solicitudes a FreeCurrencyAPI.');
    }

    // Retorna los datos exitosos de la primera respuesta válida
    return successfulData[0];
  } catch (error) {
    console.error('Error al obtener datos de conversión:', error instanceof Error ? error.message : error);
    throw new Error('Error: No se pudo obtener datos de conversión de la API.');
  }
}
