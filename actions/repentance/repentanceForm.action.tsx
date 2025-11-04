'use server';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

import { FormData, OutputFormat } from '@/types/repentance/repentance';
import { RegretTypeSingle } from '@/types/transactions/regretsType';

const transformData = (input: FormData): OutputFormat => {
  return {
    transaction_id: input.transaction_id.trim(),
    last_name: input.last_name.trim(),
    email: input.email.trim(),
    phone_number: `${input.phone_number}`.trim(),
    note: input.note?.trim(),
  };
};

export const createRegret = async (createRepentance: FormData) => {
  if (!createRepentance.transaction_id || !createRepentance.last_name || !createRepentance.email) {
    throw new Error('Faltan campos requeridos en createRepentance');
  }

  const transformedData = transformData(createRepentance);

  console.log('🔍 Datos enviados transformados:', transformedData);

  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/regrets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_id: transformedData.transaction_id,
        last_name: transformedData.last_name,
        email: transformedData.email,
        phone_number: transformedData.phone_number,
        description: transformedData.note || '',
      }),
      cache: 'no-store',
    });

    // Manejar respuestas específicas según el status code
    if (response.status === 404) {
      return {
        ok: false,
        message: 'Algunos de los datos son incorrectos por favor verifique los datos ingresados e intente nuevamente',
        status: 404,
      };
    }

    if (response.status === 400) {
      return {
        ok: false,
        message: 'Esta solicitud ya genero una alerta de cancelación y/o reembolso',
        status: 400,
      };
    }

    if (response.status === 409) {
      return {
        ok: false,
        message: 'Esta solicitud ya existe en el sistema',
        status: 409,
      };
    }

    if (response.status === 500) {
      return {
        ok: false,
        message: 'Error interno del servidor. Por favor intente nuevamente más tarde.',
        status: 500,
      };
    }

    // Si la respuesta es exitosa
    if (response.ok) {
      const data = await response.json();
      return {
        ok: true,
        user: data.user,
        message: 'Regret creado exitosamente',
        status: response.status,
      };
    }

    // Para otros códigos de estado no manejados específicamente
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: 'Error desconocido' };
    }

    const errorMessage = errorData?.error?.message || errorData?.message || 'Error desconocido';

    return {
      ok: false,
      message: errorMessage,
      status: response.status,
    };

  } catch (error) {
    console.error('Error en createRegret:', error);
    return {
      ok: false,
      message: 'Error de conexión. Verifique su conexión a internet e intente nuevamente.',
      status: 0,
    };
  }
};

export const getRegretsList = async () => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/regrets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener la lista de regrets');
    }

    return {
      ok: true,
      regrets: data.regrets,
    };
  } catch (error) {
    console.error('Error al obtener la lista de arrepentimientos:', error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'No se pudo obtener la lista de regrets',
    };
  }
};

export const cancelRegret = async (regretId: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/regrets/${regretId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al cancelar el regret');
    }

    return {
      ok: true,
      message: 'Regret cancelado',
    };
  } catch (error) {
    console.error('Error al cancelar el arrepentimiento:', error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'No se pudo cancelar el regret',
    };
  }
};

export const getRegretById = async (regretId: string) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/regrets/${regretId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: RegretTypeSingle = await response.json();

    if (!response.ok && data.error) {
      throw new Error(data.error.message || 'Error al obtener el regret');
    }

    return {
      ok: true,
      regret: data,
    };
  } catch (error) {
    console.error('Error al obtener el arrepentimiento:', error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'No se pudo obtener el regret',
    };
  }
};
