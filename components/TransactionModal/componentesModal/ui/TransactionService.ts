import { useTransactionStore } from '@/store/transactionModalStorage';
import { updateStatusClient } from '@/actions/transactions/transactions.action';
interface TransactionServiceResponse {
  newStatus: string;
}

export const TransactionService = async (
  status: string,
  transId: string,
): Promise<TransactionServiceResponse | null> => {
  try {
    console.log(`🔄 Intentando actualizar la transacción ${transId} a: ${status}`);

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
