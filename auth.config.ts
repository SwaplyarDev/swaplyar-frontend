// /auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { InvalidCredentials, UserNotFound } from './lib/auth/index';

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:8080';

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const email = credentials.email as string;
          const verificationCode = credentials.verificationCode as string;

          const response = await fetch(`${BASE_URL}/api/v1/login/email/verify-code`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              code: verificationCode,
            }),
          });

          const data = await response.json();
          console.log('data', data);

          if (data && data.token) {
            // Si la validación es exitosa, se retorna el usuario autenticado
            const { user, role } = data;
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          } else {
            throw new InvalidCredentials();
          }
        } catch (error) {
          const e = error as Error;
          if (e instanceof UserNotFound || e instanceof InvalidCredentials) {
            throw e;
          } else {
            // Errores inesperados
            console.error('Error inesperado durante la autorización:', e);
            throw new Error(
              'Error de autenticación. Por favor, inténtalo de nuevo.',
            );
          }
        }
      },
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
