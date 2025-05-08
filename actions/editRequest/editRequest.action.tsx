'use service';
export interface TransactionRequestData {
  transaccionId: string;
  userEmail: string;
  code?: number;
}
export interface sendeForm {
  message: string;
  file?: File | null;
  transaccionId: string;
  // token: string | null;
}
interface TransactionData {
  // Define los campos esperados según la respuesta de la API
  transactionId: string;
  amount: number;
  status: string;
  recipient: string;
  // Agrega otros campos según lo que devuelva tu API
}
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchTransactionById = async (requestData: TransactionRequestData): Promise<any> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes/code/${requestData.transaccionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log('respuesta:', result);
    // console.log('response:', response);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('El ID de la transacción no fue encontrada.');
      } else {
        throw new Error('Ocurrió un error al buscar la transacción.');
      }
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
  }
};
export const fetchCode = async (code: string, requestData: { transactionId: string }): Promise<any> => {
  try {
    // Realizar la solicitud POST al backend para verificar el código
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes/code/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code, // Código a enviar
        transaction_id: requestData.transactionId, // ID de transacción proveniente del requestData
      }),
    });

    const result = await response.json();
    console.log('result json:', result);
    if (!response.ok) {
      throw new Error(result.message || 'Código incorrecto');
    }

    // if (result.token) {
    //   sessionStorage.setItem('token', result.token);
    // } else {
    //   console.error('Token no encontrado en la respuesta');
    // }

    return { success: true, message: result.message || 'Código verificado exitosamente.', data: result };
  } catch (error) {
    console.error('Error de la verificacion:', error);
    throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
  }
};

export const resendCodeAction = async (transactionId: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes/code/${transactionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
/* 
export const fetchTransactionData = async (transaccionId: string): Promise<TransactionData | null> => {

  try {
    
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transactions/info/${transaccionId}`);
    console.log(response)

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
}; */

export const sendFormData = async ({ message, file, transaccionId }: sendeForm): Promise<any> => {
  try {
    // const token = sessionStorage.getItem('token');

    // Verifica si el token es nulo
    // if (!token) {
    //   throw new Error('Token no encontrado en sessionStorage');
    // }
    if (!message) {
      throw new Error('El mensaje  no fue encontrado.');
    }
    if (!transaccionId) {
      throw new Error('El ID de la transacción no fue encontrada.');
    }

    console.log('message:', message);
    console.log('file:', file);
    console.log('transaccionId:', transaccionId);
    const formData = new FormData();

    formData.append('note', message);
    console.log('[sendFormData] note appended:', formData.get('note'));
    if (file) {
      formData.append('file', file);
    }

    // formData.append('token', token);

    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes/${transaccionId}`, {
      method: 'POST',
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al enviar los datos');
    }

    const result = await response.json();
    console.log('resul sendformdata:', result);
    return result;
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    throw error; // Lanzar el error para ser manejado en el componente o función que llama este action.
  }
};
