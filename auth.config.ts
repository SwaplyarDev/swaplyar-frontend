import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { InvalidCredentials } from './lib/auth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.verificationCode) {
          throw new InvalidCredentials('Faltan email o código');
        }

        const { email, verificationCode: code } = credentials;

        const res = await fetch(`${BACKEND_URL}/login/email/validate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code }),
        });

        if (!res.ok) {
          // Tratar códigos comunes de credenciales inválidas como null (sin lanzar)
          if (res.status === 400 || res.status === 401 || res.status === 403 || res.status === 422) {
            //en vez de return null, enviamos un error personalizado xq sino la UI muestra error por defecto de nextAuth
            throw new InvalidCredentials('El código ingresado es incorrecto o ha expirado');
          }
          // Para otros estados, intenta leer el mensaje del backend y lanza un error genérico
          try {
            const errData = await res.json();
            throw new Error(`Error en autenticación: ${errData?.message || res.statusText}`);
          } catch {
            throw new Error(`Error en autenticación: ${res.statusText}`);
          }
        }

        const data = await res.json();
  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;

        if (!accessToken) {
          throw new Error('No se recibió accessToken del backend');
        }

  const rawPayload = accessToken.split('.')[1];
  const decoded = JSON.parse(Buffer.from(rawPayload, 'base64').toString());
  const tokenExpMs = decoded?.exp ? decoded.exp * 1000 : undefined;
  const expiresIn = data.expires_in || 3600; // Fallback si no viene exp en el token
  const expiresAt = tokenExpMs ?? (Date.now() + expiresIn * 1000);
        
        return {
          ...decoded,
          accessToken,
          refreshToken,
          expiresAt,
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
  pages: {
    signIn: '/es/iniciar-sesion',
  },
};