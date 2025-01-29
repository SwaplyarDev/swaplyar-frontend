// /utils/conversion/currencyConversion.ts

/**
 * Este archivo contiene una función reutilizable para obtener datos de conversión de moneda
 * utilizando la API de FreeCurrencyAPI. Se asegura de manejar múltiples claves API para mejorar
 * la resiliencia en caso de fallos y estandariza el manejo de errores.
 */

// /utils/conversion/currencyConversion.ts

const API_URL = process.env.NEXT_PUBLIC_VALUE_TRANSACTIONS;

if (!API_URL) {
  throw new Error('Falta la URL de la API en las variables de entorno.');
}

interface CurrencyData {
  data: number; // Ajusta el tipo según los datos reales que esperas
}

export async function fetchCurrencyData(send: string, receive: string): Promise<CurrencyData> {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      redirect: 'follow', // Asegúrate de seguir las redirecciones
    });

    if (!response.ok) {
      throw new Error(`Error al obtener datos de la API: ${response.status} ${response.statusText}`);
    }

    // Procesa el JSON de la respuesta
    const data = await response.json();
    const pair = `${send} a ${receive}`;
    const conversion = data.find((item: any) => item['Actualizar Monedas Calculadora']['Par de MonedasR'] === pair);
    if (conversion) {
      return conversion['Actualizar Monedas Calculadora']['Valor'];
    } else {
      throw new Error('No se encontró el par de monedas.');
    }
  } catch (error) {
    console.error('Error al obtener datos de conversión:', error instanceof Error ? error.message : error);
    throw new Error('No se pudieron obtener datos de conversión de la API.');
  }
}
