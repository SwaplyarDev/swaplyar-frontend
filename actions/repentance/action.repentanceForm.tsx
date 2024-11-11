// actions/repentance/action.repentanceForm.tsx
'use server';

const URLRepentance = process.env.NEXT_PUBLIC_REPENTANCE;

import { FormRepentance } from "@/types/repentance/repentance"; 

export const createRegret = async (createRepentance: FormRepentance) => {
  try {
    const response = await fetch(`${URLRepentance}`, {
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
      message: 'Usuario creado',
    };
  } catch (error) {
    console.error('Error al crear el arrepentimiento:', error);

    return {
      ok: false,
      message: error instanceof Error ? error.message : 'No se pudo crear el usuario',
    };
  }
};