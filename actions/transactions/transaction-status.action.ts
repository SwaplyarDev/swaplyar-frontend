'use server';

import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

// Lista de estados válidos para validación
const VALID_STATUSES = [
  'pending',
  'review_payment',
  'in_transit',
  'completed',
  'discrepancy',
  'canceled',
  'modified',
  'refunded',
  'approved',
  'rejected',
];

export type StatusPayload = {
  descripcion: string;
};

/**
 * Server Action para actualizar el estado de una transacción
 * Utiliza el endpoint /transactions/status/:status
 */
export async function updateTransactionStatus(status: string, transaction_id: string, payload: StatusPayload) {
  console.log(payload);

  try {
    // Validar autenticación y rol de usuario
    const session = await auth();

    if (!session) {
      return { success: false, error: 'No autorizado' };
    }

    // Verificar si el usuario tiene rol de admin
    const userRole = session.decodedToken?.role || '';
    if (userRole !== 'admin') {
      return { success: false, error: 'Se requiere rol de administrador' };
    }

    const token = session.decodedToken?.token || '';

    // Validar que el ID de transacción existe
    if (!transaction_id) {
      return { success: false, error: 'ID de transacción requerido' };
    }

    // Validar que el estado es válido
    if (!VALID_STATUSES.includes(status)) {
      return {
        success: false,
        error: `Estado inválido. Estados válidos: ${VALID_STATUSES.join(', ')}`,
      };
    }

    console.log('payload antes de fecth ', payload);

    // Llamar al endpoint para actualizar el estado
    const response = await fetch(
      `${API_BASE_URL}/v1/admin/transactions/status/${status}?transactionId=${transaction_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descripcion: payload }),
      },
    );

    console.log('response:' + response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
    }

    // Revalidar la página para actualizar los datos
    revalidatePath(`/admin/transactions/${transaction_id}`);

    return {
      success: true,
      message: `Estado de transacción actualizado a ${status}`,
      data: await response.json(),
    };
  } catch (error) {
    console.error('Error al actualizar estado de transacción:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Server Action para subir un comprobante de transacción
 */
export async function uploadReceipt(transactionId: string, file: File) {
  try {
    const session = await auth();

    if (!session) {
      return { success: false, error: 'No autorizado' };
    }

    // Verificar si el usuario tiene rol de admin
    const userRole = session.user?.role || '';
    if (userRole !== 'admin') {
      return { success: false, error: 'Se requiere rol de administrador' };
    }

    const token = session.decodedToken?.token || '';

    // Crear FormData para subir el archivo
    const formData = new FormData();
    formData.append('comprobante', file);
    formData.append('transaction_id', transactionId);

    // Llamar al endpoint para subir el comprobante
    const response = await fetch(`${API_BASE_URL}/v1/admin/transactions/voucher`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
    }

    // Revalidar la página para actualizar los datos
    revalidatePath(`/admin/transactions/${transactionId}`);

    return {
      success: true,
      message: 'Comprobante subido correctamente',
      data: await response.json(),
    };
  } catch (error) {
    console.error('Error al subir comprobante:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Server Action para actualizar datos de una transacción
 */
export async function updateTransaction(transactionData: any) {
  try {
    const session = await auth();

    if (!session) {
      return { success: false, error: 'No autorizado' };
    }

    // Verificar si el usuario tiene rol de admin
    const userRole = session.user?.role || '';
    if (userRole !== 'admin') {
      return { success: false, error: 'Se requiere rol de administrador' };
    }

    const token = session.decodedToken?.token || '';
    const { transaction_id } = transactionData;

    if (!transaction_id) {
      return { success: false, error: 'ID de transacción requerido' };
    }

    // Llamar al endpoint para actualizar la transacción
    const response = await fetch(`${API_BASE_URL}/v1/admin/transactions/editar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
    }

    // Revalidar la página para actualizar los datos
    revalidatePath(`/admin/transactions/${transaction_id}`);

    return {
      success: true,
      message: 'Transacción actualizada correctamente',
      data: await response.json(),
    };
  } catch (error) {
    console.error('Error al actualizar transacción:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}
