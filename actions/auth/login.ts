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
  } catch (error: any) {
    return `Authentication failed. Please try again. Error: ${error.message}`;
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

    // Cuando authorize devuelve null (credenciales inválidas), NextAuth retorna { error: 'CredentialsSignin' }
    if (result?.error) {
      const isCreds = result.error === 'CredentialsSignin' || /credenciales|unauthorized|invalid/i.test(result.error);
      return {
        ok: false,
        message: isCreds ? 'El código ingresado es incorrecto o expiró.' : result.error,
      };
    }

    return { ok: true };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message || 'No se pudo iniciar sesión.',
    };
  }
};
