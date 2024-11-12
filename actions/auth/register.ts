// action/auth/register.ts

'use server';

import { signIn } from '@/auth';

export const registerUser = async (user_id: string, verificationCode: string) => {
  try {
    const result = await signIn('credentials', {
      user_id,
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
