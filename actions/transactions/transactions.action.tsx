'use server';
import { TransactionArray, TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { TransactionAdminType } from '@/types/transactions/transAdminType';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

//General Transactions Fetchs
export const getAllTransactions = async (page: number) => {
  console.log('all transactions');
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transactions?page=${page}&perPage=12`);

    if (!response.ok) throw new Error('Failed to fetch transactions');

    const data: TransactionArray = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return null;
  }
};

export const getTransactionById = async (id: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transactions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch transactions');

    const data: TransactionTypeSingle = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return null;
  }
};

export const deleteTransactionById = async (id: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete transaction');

    return response;
  } catch (error: any) {
    console.error('Error deleting transaction:', error);
    return null;
  }
};

export const updateTransaction = async ({ transaction }: TransactionTypeSingle) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transactions/${transaction.transaction_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Failed to update transaction');
    return response;
  } catch (error: any) {
    console.error('Error updating transaction:', error);
    return null;
  }
};

//Status Transaction Client syde Fetchs

export const updateStatusClient = async (transactionId: any, status: any) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transactionStatus/${transactionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    console.log('🔄 1status:', status);

    if (!response.ok) throw new Error('Failed to update transaction client');

    const data = await response.json();
    console.log('📥 Respuesta del servidor:', data);

    return data; // Asegurar que siempre devuelve un objeto válido
  } catch (error) {
    console.error('❌ Error updating transaction:', error);
    return { message: 'Error', error }; // Devolver siempre un objeto para evitar undefined
  }
};

export const getStatusTransactionAdmin = async (transactionId: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transaction_admin/${transactionId}`);
    const exist = response.status;
    console.log('estado existe', exist);

    if (exist !== 404) {
      const data: TransactionAdminType = await response.json();
      return { success: true, data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error updating transaction:', error);
    return null;
  }
};

export const postStatusInAdmin = async (transactionId: string, status: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transaction_admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_id: transactionId,
        id_status: status,
      }),
    });

    console.log('estado post', response.status);

    if (!response.ok) throw new Error('Failed to post transaction');

    return response.json();
  } catch (error: any) {
    console.error('Error updating transaction:', error);
    return null;
  }
};

export const updateStatusAdmin = async (transactionId: string, status: string) => {
  try {
    console.log(transactionId, status);
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transaction_admin/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_status: status,
      }),
    });
    if (!response.ok) throw new Error('Failed to update transaction Admin');

    return response;
  } catch (error: any) {
    console.error('Error updating transaction:', error);
    return null;
  }
};
