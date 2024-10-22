// /auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { InvalidCredentials } from './lib/auth/index';

const BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:8080/api';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const email = credentials.email as string;
          const code = credentials.verificationCode as string;

          const response = await fetch(`${BASE_URL}/v1/login/email/verify-code`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              code: code,
            }),
          });

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              throw new InvalidCredentials();
            } else {
              throw new Error('Error inesperado durante la autenticación');
            }
          }

          const data = await response.json();

          if (data && data.token) {
            const { user } = data;
            return {
              id: user.id,
              name: user.fullName,
              email: user.email,
              role: user.role,
            };
          } else {
            throw new InvalidCredentials();
          }
        } catch (error) {
          console.error(
            'Authentication error:',
            error instanceof InvalidCredentials ? error.message : error,
          );
          throw new Error('Authentication failed. Please try again.');
        }
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
