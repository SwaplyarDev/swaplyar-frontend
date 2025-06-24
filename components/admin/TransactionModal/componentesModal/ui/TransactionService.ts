import { updateTransactionStatus } from '@/actions/transactions/transaction-status.action';
import { getStatusTransactionAdmin } from '@/actions/transactions/transactions.action';

interface TransactionServiceResponse {
  newStatus: string;
}

export const TransactionService = async (
  status: string,
  transId: string,
  payload: any,
): Promise<TransactionServiceResponse | null> => {
  try {
    if (!status || !transId) {
      console.error('❌ Error: status o transId no válido', { status, transId });
      throw new Error('Datos inválidos');
    }

    const response = await updateTransactionStatus(status, {
      transactionId: transId,
      ...payload,
    });

    if (response.success === false) {
      console.error('❌ Error al actualizar el estado:', response.error);
      throw new Error(response.error);
    }

    return { newStatus: response.data };
  } catch (error) {
    console.error('❌ Error al actualizar el estado:', error);
    return null;
  }
};

export const GetTransactionStatus = async (transId: string, trans: any, token: string) => {
  if (!transId || !trans) {
    throw new Error('error');
  }

  console.log('transID:', transId);

  try {
    console.log('✅ Llamando a getStatusById con transId:', transId);
    const response = await getStatusTransactionAdmin(transId);
    console.log('📤 Respuesta de getStatusById:', response);

    if (!response) {
      throw new Error(`❌ Error en la respuesta del servicio`);
    }

    return { newStatus: response.data?.status };
  } catch (error) {
    console.error('❌ Error al obtener la transacción:', error);
    return null;
  }
};
