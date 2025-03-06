import { updateStatusClient, getStatusById } from '@/actions/transactions/transactions.action';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';

interface TransactionServiceResponse {
  newStatus: string;
}

export const TransactionService = async (
  status: string,
  transId: string,
): Promise<TransactionServiceResponse | null> => {
  try {
    console.log(`🔄 Intentando actualizar la transacción ${transId} a: ${status}. `);

    if (!status || !transId) {
      console.error('❌ Error: status o transId no válido', { status, transId });
      throw new Error('Datos inválidos');
    }

    console.log('📤 Llamando a updateStatusClient...');
    const response = await updateStatusClient(transId, status);

    console.log('📥 Respuesta recibida de updateStatusClient', response);
    return response;
  } catch (error) {
    console.error('❌ Error al actualizar el estado:', error);
    return null;
  }
};

export const GetTransactionStatus = async (transId: string, trans: any) => {
  console.log('GetTransactionStatus', trans);

  if (!transId || !trans) {
    throw new Error('error');
  }

  try {
    console.log(`📌 Llamando a getStatusById con transId: ${transId}`);

    if (!transId || !trans) {
      console.error('❌ Error: transId o trans no válido', { transId, trans });
      throw new Error('error');
    }

    const response = await getStatusById(transId);

    if (!response) {
      throw new Error(`❌ Error en la respuesta del servicio`);
    }

    console.log('📥 Respuesta recibida:', response.status);
    return { newStatus: response.status };
  } catch (error) {
    console.error('❌ Error al obtener la transacción:', error);
    return null;
  }
};
