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
