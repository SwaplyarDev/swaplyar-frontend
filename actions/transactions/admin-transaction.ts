'use server';

import { auth } from '@/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

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

    const response = await fetch(`${API_BASE_URL}/v1/admin/transactions/info?page=${page}&perPage=${perPage}`, {
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
export async function getAdminTransactionById(transactionId: string) {
  try {
    const session = await auth();
    // if (!session || session.decodedToken.role !== "admin") {
    //   throw new Error("No autorizado")
    // }

    const token = session?.accessToken || '';
    const response = await fetch(`${API_BASE_URL}/v1/admin/transactions/${transactionId}`, {
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
    console.error('Error fetching admin transaction:', error);
    return null;
  }
}

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

    const response = await fetch(`${API_BASE_URL}/v1/transactions/editar`, {
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

    const response = await fetch(`${API_BASE_URL}/v1/admin/transactions/status?transaction_id=${transactionId}`, {
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
    // if (!session || session.decodedToken.role !== "admin") {
    //   throw new Error("No autorizado")
    // }

    const token = session?.accessToken || '';

    const response = await fetch(`${API_BASE_URL}/v1/transactions/voucher`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading transaction receipt:', error);
    return error;
  }
}
