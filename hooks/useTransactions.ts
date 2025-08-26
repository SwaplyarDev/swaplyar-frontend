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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions?page=${currentPage}&pageSize=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

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
        console.log('Respuesta completa del backend:', data);
        setPagination({
          currentPage: data.pagination.page,
          totalPages: data.pagination.totalPages,
          totalItems: data.pagination.totalItems,
          perPage: data.pagination.pageSize,
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

// 'use client';

// import { useState, useEffect } from 'react';
// import type { TransactionData } from '../types/transaction';

// interface Pagination {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   perPage: number;
// }

// export function useTransactions(initialPage = 1) {
//   const [transactions, setTransactions] = useState<TransactionData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const [perPage, setPerPage] = useState(6);
//   const [pagination, setPagination] = useState<Pagination>({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     perPage: 6,
//   });

//   const [refreshKey, setRefreshKey] = useState(0);
//   const refetch = () => setRefreshKey((prev) => prev + 1);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true);
//       try {
//         // Mock completo compatible con TransactionData
//         const mockTransaction: TransactionData = {
//           transaction: {
//             transaction_id: 'tx123',
//             sender_accounts_id: 'sender-id-1',
//             receiver_accounts_id: 'receiver-id-1',
//             country_transaction: 'Argentina-Brasil',
//             message: 'Transferencia de prueba',
//             created_at: '2025-08-11T14:51:28.841Z',
//             user_id: 'user123',
//             status: 'pending',
//             idAdmin: null,
//             regret_id: null,
//             note_id: null,
//           },
//           sender: {
//             first_name: 'Juan',
//             last_name: 'Pérez',
//             identification: '12345678',
//             phone_number: '+541112345678',
//             email: 'juan.perez@example.com',
//             payment_method_id: 'pm-sender-123',
//           },
//           receiver: {
//             first_name: 'Nahuel',
//             last_name: 'González',
//             payment_method_id: 'pm-receiver-456',
//           },
//           payment_method: {
//             sender: {
//               value: 'CBU',
//               details: {
//                 email_account: 'juan.perez@example.com',
//                 transfer_code: '1234567890123456789012',
//               },
//             },
//             receiver: {
//               value: 'CBU',
//               details: {
//                 bank_name: 'Banco Galicia',
//                 sender_method_key: 'CBU',
//                 sender_method_value: '1234567890123456789012',
//                 document_type: 'DNI',
//                 document_value: '87654321',
//               },
//             },
//           },
//           amounts: {
//             sent: {
//               amount: '1000',
//               currency: 'ARS',
//             },
//             received: {
//               amount: '900',
//               currency: 'BRL',
//             },
//           },
//           proof_of_payment: {
//             img_transaction: 'https://res.cloudinary.com/dy1jiclwg/image/upload/...png',
//           },
//           status: 'pending',
//         };

//         setTransactions([mockTransaction]);

//         setPagination({
//           currentPage: 1,
//           totalPages: 1,
//           totalItems: 1,
//           perPage: 6,
//         });

//         setError(null);
//       } catch (err: any) {
//         console.error('Error en fetchTransactions:', err);
//         setError(err.message || 'No se pudieron cargar las transacciones.');
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
//     currentPage: pagination.currentPage,
//     totalPages: pagination.totalPages,
//     totalItems: pagination.totalItems,
//     perPage: pagination.perPage,
//     setCurrentPage,
//     setPerPage,
//     refetch,
//   };
// }
