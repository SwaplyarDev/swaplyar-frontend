'use client';

import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import type { TransactionData } from '../types/transaction';

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

export function useTransactions(initialPage = 1) {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(10);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const refetch = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        const token = (session as any)?.accessToken as string | undefined;

        if (!token) {
          setError('No estás autenticado. Inicia sesión para ver tus transacciones.');
          setTransactions([]);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions?page=${currentPage}&pageSize=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        // Manejo de respuestas no OK (ej. 401/403)
        if (!res.ok) {
          let message = 'No se pudieron cargar las transacciones.';
          try {
            const errBody = await res.json();
            message = errBody.message || message;
          } catch {}
          if (res.status === 401 || res.status === 403) {
            setError('Tu sesión expiró. Inicia sesión nuevamente.');
            setTransactions([]);
            return;
          }
          throw new Error(message);
        }

        const data = await res.json();
        if (data.message) {
          const mensajeOriginal = data.message;
          const traduccionesErrores: Record<string, string> = {
            'No transactions found for this user': 'No se encontraron transacciones para este usuario',
          };

          const mensajeTraducido = traduccionesErrores[mensajeOriginal] || mensajeOriginal;

          if (!data.data || data.data.length === 0) {
            throw new Error(mensajeTraducido);
          }
        }

        setTransactions(data.data || []);
        setPagination({
          currentPage: data.pagination?.page ?? currentPage,
          totalPages: data.pagination?.totalPages ?? 1,
          totalItems: data.pagination?.totalItems ?? (data.data?.length ?? 0),
          perPage: data.pagination?.pageSize ?? perPage,
        });


        setError(null);
      } catch (err: any) {
        console.error('Error en fetchTransactions:', err);
        setError(err.message || 'No se pudieron cargar las transacciones.');
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage, perPage, refreshKey]);

  return {
    transactions,
    loading,
    error,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    totalItems: pagination.totalItems,
    perPage: pagination.perPage,
    setCurrentPage,
    setPerPage,
    refetch,
  };
}