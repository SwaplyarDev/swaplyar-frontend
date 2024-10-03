// /auth/login.ts

'use server';

import { signIn } from '@/auth';

// Función para autenticar al usuario
export async function authenticate(formData: FormData) {
  try {
    const result = await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false, 
    });

    if (result?.error) {
      throw new Error(result.error); 
    }

    return 'Success';
  } catch (error) {
    console.log(error);
    return 'CredentialsSignin';
  }
}

// Función para manejar el inicio de sesión
export const login = async (email: string, verificationCode: string) => {
  try {
    const result = await signIn('credentials', {
      email,
      verificationCode,
      redirect: false,
    });

    if (result?.error) {
      return {
        ok: false,
        message: result.error,
      };
    }

    return { ok: true };
  } catch (error) {
    console.error('Login error:', error);
    return {
      ok: false,
      message: 'No se pudo iniciar sesión',
    };
  }
};
