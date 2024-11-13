// actions/request/action.requestRegister.tsx

'use server';

import { TransactionRequest } from '@/types/request/request';

export const requestRegister = async (transaction: TransactionRequest) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    return {
      ok: true,
      user: data.user,
      message: 'Usuario creado',
    };
  } catch (error: any) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo crear el usuario',
    };
  }
};
