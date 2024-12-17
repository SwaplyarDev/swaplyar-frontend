'use service';
export interface TransactionRequestData {
  transaccionId: string;
  userEmail: string;
  code?: number;
}

interface TransactionData {
  // Define los campos esperados según la respuesta de la API
  transactionId: string;
  amount: number;
  status: string;
  recipient: string;
  // Agrega otros campos según lo que devuelva tu API
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
export const fetchCode = async (code: string, requestData: { transactionId: string }): Promise<any> => {
  try {
    // Realizar la solicitud POST al backend para verificar el código
    const response = await fetch(`${BASE_URL}/v1/notes/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code, // Código a enviar
        transactionId: requestData.transactionId, // ID de transacción proveniente del requestData
      }),
    });

    console.log('Respuesta del servidor del fetchCode:', response);

    const result = await response.json();
    console.log('result json:', result);
    if (!response.ok) {
      throw new Error(result.message || 'Código incorrecto');
    }

    return { success: true, message: result.message || 'Código verificado exitosamente.' };
  } catch (error) {
    console.error('Error de la verificacion:', error);
    throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
  }
};

export const resendCodeAction = async (transactionId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/notes/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transactionId }),
    });

    console.log('Respuesta del servidor del resendCode:', response);

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      const result = await response.json();
      console.log('respuesta del data del resend:', result);
      return { success: false, message: result.message || 'Error desconocido' };
    }

    // Si la respuesta es exitosa, continuamos con el flujo normal
    const result = await response.json();
    console.log('respuesta del data del resend:', result);
    return { success: true, message: result.message || 'Código reenviado exitosamente.' };
  } catch (error) {
    console.error('Error al reenviar el código:', error);
    return { success: false, message: 'Error al conectarse con el servidor.' };
  }
};

export const fetchTransactionData = async (transaccionId: string): Promise<TransactionData | null> => {
  try {
    const response = await fetch(`${BASE_URL}/v1/transactions/${transaccionId}`);
    if (!response.ok) {
      throw new Error('Error fetching transaction data');
    }
    const data = await response.json();
    console.log('data 116:', data);
    return data;
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    return null;
  }
};
