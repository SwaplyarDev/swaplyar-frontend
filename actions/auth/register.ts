// action/auth/register.ts

'use server';

import { signIn } from '@/auth';

export const registerUser = async (email: string, verificationCode: string) => {
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
