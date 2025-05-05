import { getAdminTransactionById, getTransactionStatusHistory } from '@/actions/transactions/admin-transaction';
import {
  StatusPayload,
  updateTransaction,
  updateTransactionStatus,
  uploadReceipt,
} from '@/actions/transactions/transaction-status.action';

/**
 * Obtiene los detalles de una transacción
 */
export async function GetTransactionDetails(transactionId: string) {
  try {
    const response = await getAdminTransactionById(transactionId);
    return response;
  } catch (error) {
    console.error('Error getting transaction details:', error);
    return null;
  }
}

/**
 * Obtiene el historial de estados de una transacción
 */
export async function GetTransactionStatusHistory(transactionId: string) {
  try {
    const response = await getTransactionStatusHistory(transactionId);
    return response;
  } catch (error) {
    console.error('Error getting transaction status history:', error);
    return null;
  }
}

/**
 * Actualiza el estado de una transacción
 */
export async function UpdateTransactionStatus(status: string, transactionId: string, payload: StatusPayload) {
  try {
    const result = await updateTransactionStatus(status, transactionId, payload);
    return result;
  } catch (error) {
    console.error('Error updating transaction status:', error);
    return {
      success: false,
      error: 'Error al actualizar el estado de la transacción',
    };
  }
}

/**
 * Sube un comprobante para una transacción
 */
export async function UploadTransactionReceipt(transactionId: string, file: File) {
  try {
    const result = await uploadReceipt(transactionId, file);
    return result;
  } catch (error) {
    console.error('Error uploading receipt:', error);
    return {
      success: false,
      error: 'Error al subir el comprobante',
    };
  }
}

/**
 * Actualiza los datos de una transacción
 */
export async function UpdateTransactionData(transactionData: FormData, transactionId: string) {
  try {
    const result = await updateTransaction(transactionData, transactionId);
    return result;
  } catch (error) {
    console.error('Error updating transaction data:', error);
    return {
      success: false,
      error: 'Error al actualizar los datos de la transacción',
    };
  }
}

const ServiceTransaction = {
  GetTransactionDetails,
  GetTransactionStatusHistory,
  UpdateTransactionStatus,
  UploadTransactionReceipt,
  UpdateTransactionData,
};

export default ServiceTransaction;
