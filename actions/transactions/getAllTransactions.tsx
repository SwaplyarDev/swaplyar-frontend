'use server';
import { TransactionTypeAll } from '@/types/transactions/transactionsTypeAll';

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
