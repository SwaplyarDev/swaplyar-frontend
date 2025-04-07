'use client';

import { useState, useEffect } from 'react';
import type { TransactionData, PaginatedResponse } from './transaction';

interface UseTransactionsResult {
  transactions: TransactionData[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  refetch: () => void;
}

export function useTransactions(): UseTransactionsResult {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.ejemplo.com';

  const refetch = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${NEXT_PUBLIC_BACKEND_URL}/v1/transactions?page=${currentPage}&perPage=${perPage}`,
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const responseData: PaginatedResponse = await response.json();

        setTransactions(responseData.data || []);
        setTotalPages(responseData.pagination?.totalPages || 1);
        setTotalItems(responseData.pagination?.totalItems || responseData.data?.length || 0);
        setError(null);
      } catch (err) {
        console.error('Error al obtener las transacciones:', err);
        setError('No se pudieron cargar las transacciones. Por favor, intenta de nuevo más tarde.');

        // Datos de respaldo en caso de error
        const mockData = [
          {
            transaction: {
              transaction_id: '1t2sfp3vkfb',
              sender_accounts_id: '9l2qn3vnoeg',
              receiver_accounts_id: 'k3pavhza4cn',
              country_transaction: 'Pakistan',
              message: 'Transaccion enviada',
              created_at: '2025-01-29T11:34:20.933Z',
              user_id: null,
              status: 'rcd05bisid9',
              idAdmin: null,
              regret_id: null,
              note_id: null,
            },
            sender: {
              first_name: 'Alan',
              last_name: 'Fernandez',
              identification: '1125878945',
              phone_number: '+543516458975',
              email: 'fernandeezalan20@gmail.com',
              payment_method_id: 'payoneer_ivrlhwjsty',
            },
            receiver: {
              first_name: 'Juan',
              last_name: 'Perez',
              payment_method_id: 'ars_v72xv59fa6b',
            },
            payment_method: {
              sender: {
                value: 'payoneer',
                details: {
                  email_account: 'mf@gmail.com',
                  transfer_code: '12345678',
                },
              },
              receiver: {
                value: 'ars',
                details: {
                  bank_name: 'Santander',
                  sender_method_key: 'cbu',
                  sender_method_value: '7654354254542545676543',
                  document_type: 'DNI',
                  document_value: '5426413258',
                },
              },
            },
            amounts: {
              sent: {
                amount: '2000',
                currency: 'USD',
              },
              received: {
                amount: '560',
                currency: 'EUR',
              },
            },
            status: 'refund_in_transit',
            proof_of_payment: {
              img_transaction: 'https://drive.google.com/uc?id=1t2sfp3vkfb_payoneer_receipt.jpeg',
            },
          },
        ];

        setTransactions(mockData);
        setTotalPages(3); // Valor de ejemplo
        setTotalItems(15); // Valor de ejemplo
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage, perPage, NEXT_PUBLIC_BACKEND_URL, refreshKey]);

  return {
    transactions,
    loading,
    error,
    currentPage,
    perPage,
    totalPages,
    totalItems,
    setCurrentPage,
    setPerPage,
    refetch,
  };
}
