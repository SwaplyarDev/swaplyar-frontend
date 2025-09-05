'use server';

interface TransactionHistoryItem {
  id: string;
  status: string;
  changedAt: string;
  message: string;
}

interface TransactionStatusData {
  status: string;
  history: TransactionHistoryItem[];
}

interface TransactionStatusError {
  message: string;
  details?: string | null;
}

export const searchRequest = async (transactionId: string, lastName: string) => {
  try {
    // Construir URL con el ID en path y lastName en query
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/status/${transactionId}`
    );
    url.searchParams.append('lastName', lastName);

    console.log('url', url.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();
    console.log('data', data);

    if (!response.ok) {
      const errorData: TransactionStatusError = data;
      throw new Error(errorData.message || 'Error al buscar el estado de la transacción');
    }

    const transactionData: TransactionStatusData = data.data;

    return {
      ok: true,
      status: transactionData.status,
      history: transactionData.history,
      message: 'Estado e historial de la transacción obtenidos con éxito',
    };
  } catch (error: any) {
    return {
      ok: false,
      message: `No se pudo obtener el estado de la transacción: ${error.message}`,
      error: error.stack,
    };
  }
};
