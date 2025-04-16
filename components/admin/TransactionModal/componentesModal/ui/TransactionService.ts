import { getStatusById, updateStatusClient } from '@/actions/transactions/transactions.action';

interface TransactionServiceResponse {
  newStatus: string;
}

export const TransactionService = async (
  status: string,
  transId: string,
): Promise<TransactionServiceResponse | null> => {
  try {
    if (!status || !transId) {
      console.error('❌ Error: status o transId no válido', { status, transId });
      throw new Error('Datos inválidos');
    }

    const response = await updateStatusClient(transId, status);

    return response;
  } catch (error) {
    console.error('❌ Error al actualizar el estado:', error);
    return null;
  }
};

export const GetTransactionStatus = async (transId: string, trans: any, token: string) => {
  console.log('Valores recibidos:', { transId, trans });

  if (!transId || !trans) {
    throw new Error('error'); // Si ves este error, transId o trans están vacíos
  }

  console.log('transID:', transId);

  try {
    console.log('✅ Llamando a getStatusById con transId:', transId);
    const response = await getStatusById(transId, trans, token);
    console.log('📤 Respuesta de getStatusById:', response);

    if (!response) {
      throw new Error(`❌ Error en la respuesta del servicio`);
    }

    return { newStatus: response.status };
  } catch (error) {
    console.error('❌ Error al obtener la transacción:', error);
    return null;
  }
};
