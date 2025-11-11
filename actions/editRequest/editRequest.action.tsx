'use service';
export interface TransactionRequestData {
  transaccionId: string;
  userEmail: string;
  code?: number;
}

export interface SendForm {
  message: string;
  filess?: File[][] | null;
  transaccionId: string;
  noteAccessToken: string;
  section: 'datos_envio' | 'datos_recepcion' | 'monto';
}

interface TransactionData {
  transactionId: string;
  amount: number;
  status: string;
  recipient: string;
  noteAccessToken?: string;
}
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchTransactionById = async (requestData: TransactionRequestData): Promise<any> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/notes/request-access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionId: requestData.transaccionId,
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('El ID de la transacci贸n no fue encontrada.');
      } else {
        throw new Error('Ocurri贸 un error al buscar la transacci贸n.');
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
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/notes/verify-code`, {
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
      throw new Error(result.message || 'C贸digo incorrecto');
    }

    return {
      success: true,
      message: result.message || 'C贸digo verificado exitosamente.',
      data: result,
      noteAccessToken: result.noteAccessToken,
    };
  } catch (error) {
    console.error('Error de la verificacion:', error);
    throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
  }
};

export const resendCodeAction = async (transactionId: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/notes/${transactionId}`, {
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

    return { success: true, message: result.message || 'C贸digo reenviado exitosamente.' };
  } catch (error) {
    console.error('Error al reenviar el c贸digo:', error);
    return { success: false, message: 'Error al conectarse con el servidor.' };
  }
};

export const sendFormData = async ({
  message,
  files,
  transaccionId,
  noteAccessToken,
  section,
}: SendForm): Promise<any> => {
  try {
    if (!message?.trim()) throw new Error('El mensaje no fue encontrado.');
    if (!transaccionId) throw new Error('El ID de la transacción no fue encontrado.');
    if (!noteAccessToken) throw new Error('El token de acceso no fue proporcionado.');
    if (!section) throw new Error('La sección es obligatoria.');

    const formData = new FormData();
    formData.append('message', String(message));
    formData.append('section', String(section));

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('files', file, file.name);
      });
    formData.append('message', String(message));
    formData.append('section', String(section));

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('files', file, file.name);
      });
    }

    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/notes/${transaccionId}`, {
      method: 'POST',
      body: formData,
      headers: {
        'note-access-token': noteAccessToken,
      },
    });

    const result = await response.json().catch(() => ({}));

    console.log('🔎 Status:', response.status);
    console.log('📦 Backend response:', result);

    if (!response.ok) {
      // 👇 ahora sí usamos el mismo result
      throw new Error(result?.message || 'Error al enviar los datos.');
    }

    return result;
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    throw error;
  }
};