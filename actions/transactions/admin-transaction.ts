'use server';

import { auth } from '@/auth';
import { TransactionByUserId } from '@/types/transactionsBackEnd2';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Obtiene todas las transacciones para administradores
 */
export async function getAllAdminTransactions(page = 1, perPage = 12) {
  try {
    const session = await auth();
    // if (!session || session.decodedToken.role !== "admin") {
    //   throw new Error("No autorizado")
    // }

    const token = session?.accessToken || '';

    const response = await fetch(`${API_BASE_URL}/admin/transactions/info?page=${page}&perPage=${perPage}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching admin transactions:', error);
    return null;
  }
}

/**
 * Obtiene una transacción específica por ID
 */
// export async function getAdminTransactionById(transactionId: string) {
//   try {
//     const session = await auth();
//     // if (!session || session.decodedToken.role !== "admin") {
//     //   throw new Error("No autorizado")
//     // }

//     const token = session?.accessToken || '';
//     const response = await fetch(`${API_BASE_URL}/v1/admin/transactions/${transactionId}`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       cache: 'no-store',
//     });
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching admin transaction:', error);
//     return null;
//   }
// }

/**
 * Actualiza una transacción
 */
export async function updateAdminTransaction(transactionData: any) {
  try {
    const session = await auth();
    // if (!session || session.decodedToken.role !== "admin") {
    //   throw new Error("No autorizado")
    // }

    const token = session?.accessToken || '';

    const response = await fetch(`${API_BASE_URL}/transactions/editar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating admin transaction:', error);
    return null;
  }
}

/**
 * Obtiene el historial de estados de una transacción
 */
export async function getTransactionStatusHistory(transactionId: string) {
  try {
    const session = await auth();
    // if (!session || session.decodedToken.role !== "admin") {
    //   throw new Error("No autorizado")
    // }

    const token = session?.accessToken || '';

    const response = await fetch(`${API_BASE_URL}/admin/transactions/status?transaction_id=${transactionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching transaction status history:', error);
    return null;
  }
}

/**
 * Sube un comprobante para una transacción
 */
export async function uploadTransactionReceipt(formData: FormData) {
  try {
    const session = await auth();
    const token = session?.accessToken || '';

    const response = await fetch(`${API_BASE_URL}/admin/transactions/voucher`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log('Estado de respuesta:', response.status);

    const result = await response.json().catch(() => null);
    console.log('Respuesta servidor:', result);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return result;
  } catch (error) {
    console.error('Error uploading transaction receipt:', error);
    return error;
  }
}

export async function getTransactionByUserId(user_id: string): Promise<TransactionByUserId> {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/transactions?userId=${user_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Error fetching user');
    }
    const transactions = await response.json();
    return transactions;
  } catch (e) {
    console.error('Error fetching user:', e);
    return {} as TransactionByUserId;
  }
}

export async function getSendTransaction(account_id: string): Promise<TransactionByUserId> {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/transactions?sender_account_id=${account_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      },
    );
    if (!response.ok) {
      throw new Error('Error fetching user');
    }
    const transactions = await response.json();
    return transactions;
  } catch (e) {
    console.error('Error fetching user:', e);
    return {} as TransactionByUserId;
  }
}

export async function getReceiveTransaction(account_id: string): Promise<TransactionByUserId> {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/transactions?receiver_account_id=${account_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      },
    );
    if (!response.ok) {
      throw new Error('Error fetching user');
    }
    const transactions = await response.json();
    return transactions;
  } catch (e) {
    console.error('Error fetching user:', e);
    return {} as TransactionByUserId;
  }
}

// export async function getTransactionByUserEmail(user_email: string): Promise<TransactionByUserId> {
//   try {
//     const session = await auth();
//     const token = session?.accessToken;

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/transactions?created_by=${user_email}`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: 'no-store',
//     });
//     if (!response.ok) {
//       throw new Error('Error fetching user');
//     }
//     const transactions = await response.json();
//     return transactions;
//   } catch (e) {
//     console.error('Error fetching user:', e);
//     return {} as TransactionByUserId;
//   }
// }

// export async function getTransactionByUserEmail(
//   userEmail: string,
//   page = 1,
//   perPage = 10
// ): Promise<TransactionByUserId> {
//   const session = await auth();
//   const token = session?.accessToken;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/transactions?created_by=${userEmail}&page=${page}&perPage=${perPage}`,
//     {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) throw new Error("Error al obtener transacciones");
//   return await res.json();
// }

export async function getAdminTransactionsByEmail(
  userEmail: string,
  page = 1,
  perPage = 10
): Promise<TransactionByUserId> {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/transactions/sender/${userEmail}?page=${page}&perPage=${perPage}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Error al obtener transacciones");

    const raw = await res.json();

    return {
      data: raw.data ?? [],
      meta: {
        totalPages: raw.meta?.totalPages ?? 0,
        totalItems: raw.meta?.totalItems ?? 0,
        page: raw.meta?.page ?? page,
        perPage: raw.meta?.perPage ?? perPage,
      },
    };
  } catch (err) {
    console.error("❌ Error fetching admin transactions:", err);
    return {
      data: [],
      meta: { totalPages: 0, totalItems: 0, page: 1, perPage },
    };
  }
}
