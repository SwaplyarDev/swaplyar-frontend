// import { useState, useEffect } from 'react';
// import { getSession } from 'next-auth/react';
// import type { TransactionData, PaginatedResponse } from './transaction';

// export function useTransactions() {
//   const [transactions, setTransactions] = useState<TransactionData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(6);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const refetch = () => setRefreshKey((prev) => prev + 1);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true);

//       try {
//         const session = await getSession();
//         const token = session?.user?.accessToken;

//         if (!token) throw new Error('No token');

//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/transactions?page=${currentPage}&perPage=${perPage}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (!res.ok) throw new Error(`Error: ${res.status}`);

//         const responseData: PaginatedResponse = await res.json();

//         setTransactions(responseData.data || []);
//         setTotalPages(responseData.pagination?.totalPages || 1);
//         setTotalItems(responseData.pagination?.totalItems || 0);
//         setError(null);
//       } catch (err) {
//         console.error('Error al obtener las transacciones:', err);
//         setError('No se pudieron cargar las transacciones.');
//         setTransactions([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [currentPage, perPage, refreshKey]);

//   return {
//     transactions,
//     loading,
//     error,
//     currentPage,
//     perPage,
//     totalPages,
//     totalItems,
//     setCurrentPage,
//     setPerPage,
//     refetch,
//   };
// }

'use client';

import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import type { TransactionData } from './transaction';

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 6,
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const refetch = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        const token = session?.user?.accessToken;

        if (!token) throw new Error('Token no disponible');

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/transactions?page=${currentPage}&perPage=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (!res.ok) throw new Error('Error al obtener transacciones');

        const data = await res.json();

        setTransactions(data.data || []);
        setPagination({
          currentPage: data.meta.page,
          totalPages: data.meta.totalPages,
          totalItems: data.meta.totalTransactions,
          perPage: data.meta.perPage,
        });

        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError('No se pudieron cargar las transacciones.');
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
