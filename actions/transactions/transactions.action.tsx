'use server';
import { TransactionTypeAll, TransactionTypeSingle } from '@/types/transactions/transactionsType';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllTransactions = async () => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transactions`);
    if (!response.ok) throw new Error('Failed to fetch transactions');

    const data: TransactionTypeAll[] = await response.json();
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
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/v1/transactions/${transaction.transaction.transaction_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      },
    );
    if (!response.ok) throw new Error('Failed to update transaction');

    return response;
  } catch (error: any) {
    console.error('Error updating transaction:', error);
    return null;
  }
};

// El CREATE esta en request
