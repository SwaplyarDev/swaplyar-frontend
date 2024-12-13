'use service';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchTransactionById = async (BASE_URL: string, transactionId: string): Promise<any> => {
  if (!transactionId.trim()) {
    throw new Error('El ID de la transacción es obligatorio.');
  }

  try {
    const response = await fetch(`${BASE_URL}/v1/notes/${transactionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('La transacción no fue encontrada.');
      } else {
        throw new Error('Ocurrió un error al buscar la transacción.');
      }
    }

    const transaction = await response.json();
    return transaction;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw new Error(error instanceof Error ? error.message : 'Error desconocido.');
  }
};
