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
    status: input.status || 'pendiente',
  };
};

export const createRegret = async (createRepentance: FormData) => {
  if (!createRepentance.transaction_id || !createRepentance.last_name || !createRepentance.email) {
    throw new Error('Faltan campos requeridos en createRepentance');
  }

  const transformedData = transformData(createRepentance);

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
      status: transformedData.status || 'pendiente',
      note: transformedData.note,
    }),
    cache: 'no-store',
  });
  try {
    // Intentamos parsear el cuerpo de la respuesta a JSON
    const data = await response.json();

    if (response.ok) {
      // Revisamos los posibles casos de duplicación o datos incorrectos
      if (response.ok) {
        return {
          ok: true,
          user: data.user,
          message: 'Regret creado',
          status: response.status,
        };
      }
    } else {
      // Si la respuesta no es exitosa, manejamos el error
      const errorMessage = data?.error?.message
        ? typeof data.error.message === 'string'
          ? data.error.message
          : JSON.stringify(data.error.message) // Aseguramos que el mensaje sea una cadena
        : data?.message || 'Error desconocido'; // Si no existe el mensaje, retornamos 'Error desconocido'

      return {
        ok: false,
        message: errorMessage,
        status: response.status,
      };
    }
  } catch (error) {
    if (response.status === 409) {
      return {
        ok: false,
        status: response.status,
      };
    } else if (response.status === 400) {
      return {
        ok: false,
        status: response.status,
      };
    }
    const errorMessage = error instanceof Error ? error.message : 'Error inesperado al crear el regret';

    return {
      ok: false,
      status: response.status,
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
