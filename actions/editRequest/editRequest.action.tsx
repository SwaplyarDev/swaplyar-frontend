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
}
interface TransactionData {
  transactionId: string;
  amount: number;
  status: string;
  recipient: string;
}
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Falta integracion con back 2

export const fetchTransactionById = async (requestData: TransactionRequestData): Promise<any> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes/code/${requestData.transaccionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/notes/code/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        transaction_id: requestData.transactionId,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Código incorrecto');
    }

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

    if (!response.ok) {
      const result = await response.json();
      return { success: false, message: result.message || 'Error desconocido' };
    }
    const result = await response.json();

    return { success: true, message: result.message || 'Código reenviado exitosamente.' };
  } catch (error) {
    console.error('Error al reenviar el código:', error);
    return { success: false, message: 'Error al conectarse con el servidor.' };
  }
};

// Este si esta integrado con el backend 2
export const sendFormData = async ({ message, file, transaccionId }: sendeForm): Promise<any> => {
  try {
    if (!message) {
      throw new Error('El mensaje  no fue encontrado.');
    }
    if (!transaccionId) {
      throw new Error('El ID de la transacción no fue encontrada.');
    }
    const formData = new FormData();
    formData.append('note', message);
    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/notes/${transaccionId}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Error al enviar los datos');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    throw error;
  }
};
