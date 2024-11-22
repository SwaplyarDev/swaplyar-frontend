'use server';

const URLRepentance = process.env.NEXT_PUBLIC_BACKEND_URL;

import {  FormRepentance } from "@/types/repentance/repentance";
import { FormData, OutputFormat } from "@/types/repentance/repentance";



const transformData = (input: FormData): OutputFormat => {
  return {
    transaction_id: input.transaction_id.trim(),
    last_name: input.last_name.trim(),
    email: input.email.trim(),
    phone_number: `${input.calling_code?.callingCode}${input.phone_number}`.trim(),
    note: input.note?.trim(),
    status: input.status || 'pendiente',
  };
}

export const createRegret = async (createRepentance: FormData) => {
  try {
    // Validar los campos requeridos
    if (!createRepentance.transaction_id || !createRepentance.last_name || !createRepentance.email) {
      throw new Error('Faltan campos requeridos en createRepentance');
    }

    // Transformar los datos antes de enviarlos
    console.log('createRepentance:', createRepentance);

    const transformedData = transformData(createRepentance);

    console.log('transformedData:', transformedData);

    // Realizar la solicitud
    const response = await fetch(`${URLRepentance}/v1/regrets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_id: transformedData.transaction_id,
        last_name: transformedData.last_name,
        email: transformedData.email,
        phone_number: transformedData.phone_number,
        note: transformedData.note,
        status: transformedData.status || 'pendiente',
      }),
    });
    console.log('Enviando status:', transformedData.status);
    console.log('response:', response);

    const data = await response.json();
    console.error('Error al crear el arrepentimiento:', data.error.message);
    console.log('Detalles del error:', data.error.details);
    console.log('data:', data);

    // Validar la respuesta del servidor
    if (response.ok) {
      const data = await response.json();  // Esperamos que el cuerpo esté en formato JSON
      console.log('data:', data);

      return {
        ok: true,
        user: data.user,
        message: 'Regret creado',
      };
    } else {
      // Si la respuesta no es exitosa, leer la respuesta como JSON y manejar el error
      const errorData = await response.json();
      console.log('ErrorData:', errorData); // Imprimir para depuración

      const errorMessage = errorData?.error?.message || errorData?.message || 'Error desconocido';
      console.error('Error al crear el arrepentimiento:', errorMessage);

      return {
        ok: false,
        message: errorMessage,
      };
    }
    
    
  } catch (error) {
    // Manejo del error
    const errorMessage = error instanceof Error ? error.message : 'Error inesperado al crear el regret';
    console.error('Error al crear el arrepentimiento:', errorMessage);

    return {
      ok: false,
      message: errorMessage,
    };
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
