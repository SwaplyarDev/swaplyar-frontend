/**
 * Esta función realiza una solicitud al backend para obtener el estado de una transacción.
 *
 * - **Parámetros**:
 *   - `transactionId` (string): ID de la transacción.
 *   - `lastName` (string): Apellido del usuario asociado a la transacción.
 *
 * - **Comportamiento**:
 *   1. Construye la URL de la API utilizando `NEXT_PUBLIC_BACKEND_URL` del entorno.
 *   2. Agrega los parámetros de consulta `transaction_id` y `last_name`.
 *   3. Realiza una solicitud `GET` al endpoint `/v1/transactionStatus`.
 *   4. Procesa la respuesta:
 *      - Si la respuesta es exitosa (`response.ok`):
 *        - Devuelve el estado de la transacción (`data.status`) y un mensaje de éxito.
 *      - Si la respuesta es fallida:
 *        - Extrae los datos del error (`errorData.message`) y lanza una excepción.
 *
 * Esta funcion se utiliza en el archivo "SearchRequest" /components/Searchrequest
 */

'use server';

interface TransactionStatusError {
  message: string;
  details?: string | null;
}

export const searchRequest = async (transactionId: string, lastName: string) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/transactionStatus`);
    url.searchParams.append('transaction_id', transactionId);
    url.searchParams.append('last_name', lastName);
    console.log('url', url.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData: TransactionStatusError = data;
      throw new Error(errorData.message || 'Error al buscar el estado de la transacción');
    }

    return {
      ok: true,
      status: data.status,
      message: 'Estado de la transacción obtenido con éxito',
    };
  } catch (error: any) {
    return {
      ok: false,
      message: `No se pudo obtener el estado de la transacción: ${error.message}`,
      error: error.stack,
    };
  }
};
