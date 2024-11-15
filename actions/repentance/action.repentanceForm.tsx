'use server';

const URLRepentance = process.env.NEXT_PUBLIC_BACKEND_URL;

import { CheckRefundProps, FormRepentance } from "@/types/repentance/repentance";


export const createRegret = async (createRepentance: FormRepentance) => {
  try {
    const response = await fetch(`${URLRepentance}/v1/regrets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createRepentance),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    return {
      ok: true,
      user: data.user,
      message: 'Regret creado',
    };
  } catch (error) {
    console.error('Error al crear el arrepentimiento:', error);

    return {
      ok: false,
      message: error instanceof Error ? error.message : 'No se pudo crear el regret',
    };
  }
};


export const checkIfRegretExists = async ({ transaction_id, email, last_name }: CheckRefundProps): Promise<boolean> => {
  try {
    // Validar que los parámetros no estén vacíos
    if (!transaction_id || !email || !last_name) {
      throw new Error('Todos los campos son obligatorios.');
    }

    

    // Realizar el fetch hacia el backend
    const response = await fetch(`${URLRepentance}/v1/regrets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transaction_id, email, last_name: last_name }),
    });

    // Manejar el caso de error HTTP
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al verificar el reembolso.');
    }

    // Parsear la respuesta JSON
    const data = await response.json();

    // Retornar true si ya existe un reembolso, false en caso contrario
    return data.exists;
  } catch (error) {
    console.error('Error al comprobar el reembolso:', error);
    return false;
  }
};


export const getRegretsList = async () => {
  try {
    const response = await fetch(`${URLRepentance}/v1/regrets`, {
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
    const response = await fetch(`${URLRepentance}/v1/regrets/${regretId}`, {
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
