'use server';
import { TransactionArray, TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { TransactionAdminType } from '@/types/transactions/transAdminType';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

//General Transactions Fetchs
export const getAllTransactions = async (page: number, token: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/admin/transactions?page=${page}&perPage=12`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Failed to fetch transactions');

    const data: TransactionArray = await response.json();

    return data;
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return null;
  }
};

export const getTransactionById = async (transaction_id: string, token: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/admin/transactions/${transaction_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch transactions');

    const data: TransactionTypeSingle = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return null;
  }
};

export const deleteTransactionById = async (id: string, token: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/admin/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete transaction');

    return response;
  } catch (error: any) {
    console.error('Error deleting transaction:', error);
    return null;
  }
};

export const updateTransaction = async ({ transaction }: TransactionTypeSingle, token: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/admin/transactions/${transaction.transaction_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const updateStatusClient = async (transactionId: any, status: any, token: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transactionStatus/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) throw new Error('Failed to update transaction client');

    const data = await response.json();

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

export const postStatusInAdmin = async (transactionId: string, status: string, token: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transaction_admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        transaction_id: transactionId,
        id_status: status,
      }),
    });

    if (!response.ok) throw new Error('Failed to post transaction');

    return response.json();
  } catch (error: any) {
    console.error('Error updating transaction:', error);
    return null;
  }
};

export const updateStatusAdmin = async (transactionId: string, status: string, token: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transaction_admin/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
