// 'use server';

// import { auth } from '@/auth';
// import type { TransactionData } from '@/components/historial/transaction';
// import { getSession } from 'next-auth/react';

// export async function getUserTransactions(page = 1, perPage = 6): Promise<{
//   data: TransactionData[];
//   pagination: {
//     currentPage: number;
//     totalPages: number;
//     totalItems: number;
//     perPage: number;
//   };
// }> {
//   const session = await getSession();
//   const token = session?.user?.accessToken;

//   if (!token) {
//     throw new Error('Token no disponible');
//   }

//   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/transactions?page=${page}&perPage=${perPage}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     throw new Error('Error al obtener transacciones');
//   }

//   const json = await res.json();

//   return {
//     data: json.data,
//     pagination: {
//       currentPage: json.meta.page,
//       totalPages: json.meta.totalPages,
//       totalItems: json.meta.totalTransactions,
//       perPage: json.meta.perPage,
//     },
//   };
// }
