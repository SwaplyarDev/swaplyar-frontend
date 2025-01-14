// /auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { InvalidCredentials } from './lib/auth/index';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const email = credentials.email as string;
          const code = credentials.verificationCode as string;
          const user_id = credentials.user_id as string;
          let URL_VERIFICATION = '';
          if (email) {
            URL_VERIFICATION = 'login/email/verify-code';
          }
          if (user_id) {
            URL_VERIFICATION = 'users/email-validation/validate';
          }

          const bodyData = {
            code: code,
            ...(email ? { email } : {}),
            ...(user_id ? { user_id } : {}),
          };

          const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/${URL_VERIFICATION}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
          });

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              throw new InvalidCredentials();
            } else {
              throw new Error(`Error inesperado durante la autenticación: ${response.statusText}`);
            }
          }

          const data = await response.json();

          if (data && data.token) {
            const { user } = data;
            return {
              id: user.user_id,
              name: user.full_name,
              email: user.email,
              role: user.role,
              token: data.token,
            };
          } else {
            throw new InvalidCredentials();
          }
        } catch (error: any) {
          throw new Error(`Authentication failed. Please try again. Error: ${error.message}`);
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
