'use service';
export interface TransactionRequestData {
  transaccionId: string;
  userEmail: string;
  code?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchTransactionById = async (requestData: TransactionRequestData): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/v1/notes/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionId: requestData.transaccionId,
      }), // Enviar datos como JSON
    });
    console.log(
      'el body:',
      JSON.stringify({
        transactionId: requestData.transaccionId,
      }),
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('La transacción no fue encontrada.');
      } else {
        throw new Error('Ocurrió un error al buscar la transacción.');
      }
    }
    const data = await response.json();

    console.log('respuesta:', data);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
  }
};
export const fetchCode = async (code: string): Promise<any> => {
  try {
    // Realizar la solicitud POST al backend para verificar el código
    const response = await fetch(`${BASE_URL}/v1/notes/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }), // Enviar el código al backend
    });
    console.log('respuesta', response);
    // Comprobar si la respuesta fue exitosa
    if (!response.ok) {
      // Si no es exitosa, lanzar un error con el mensaje del servidor
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Código no verificado');
    }

    // Parsear la respuesta JSON
    const result = await response.json();

    // Si la respuesta contiene un éxito, devolver el resultado
    if (result.success) {
      return result; // El código fue verificado correctamente
    } else {
      // Si el código no es correcto, lanzar un error
      throw new Error('Código incorrecto');
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error fetching code:', error);
    throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
  }
};
