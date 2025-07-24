/**
 * @file Configuration de proveedores para NextAuth
 * @module authConfig
 * @description
 * Define los providers de autenticación (Email/Código, GitHub, Google) y
 * el flujo de login con el backend, devolviendo accessToken y refreshToken.
 */
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { InvalidCredentials } from './lib/auth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      /**
       * Login mediante correo y código de verificación
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.verificationCode) {
          throw new InvalidCredentials('Faltan email o código');
        }
        const { email, verificationCode: code } = credentials;

        const res = await fetch(`${BACKEND_URL}/v2/login/email/validate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code }),
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            throw new InvalidCredentials();
          }
          throw new Error(`Error en autenticación: ${res.statusText}`);
        }

        const data = await res.json();
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;

        if (!accessToken) {
          throw new Error('No se recibió accessToken del backend');
        }

        const rawPayload = accessToken.split('.')[1];
        const decoded = JSON.parse(Buffer.from(rawPayload, 'base64').toString());

        return {
          ...decoded,
          accessToken,
          refreshToken,
        };
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  // Si fuera necesario: páginas personalizadas
  pages: {
    signIn: '/es/iniciar-sesion-o-registro',
  },

  // Evita verificaciones de host si usas deploys con dominios dinámicos
  trustHost: true,
};
