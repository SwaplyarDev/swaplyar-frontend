'use server';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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

export default getTransactionById;
