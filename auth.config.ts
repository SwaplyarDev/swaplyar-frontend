import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { InvalidCredentials } from './lib/auth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/v2/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      throw new Error('No se pudo refrescar el token');
    }

    const data = await res.json();

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? refreshToken, // si no cambia, se mantiene
      expiresAt: Date.now() + 3600 * 1000, // 1 hora
    };
  } catch (err) {
    console.error("❌ Error al refrescar token:", err);
    return null;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
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
          expiresAt: Date.now() + 3600 * 1000, // 1h
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

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Primer login
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
          user,
        };
      }

      // Si el token aún es válido
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      // Token expirado, refrescar
      const refreshed = await refreshAccessToken(token.refreshToken as string);
      if (refreshed) {
        return {
          ...token,
          accessToken: refreshed.accessToken,
          refreshToken: refreshed.refreshToken,
          expiresAt: refreshed.expiresAt,
        };
      }

      // Falló el refresh, remover sesión
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user;
      session.error = token.error as string;
      return session;
    },
  },

  pages: {
    signIn: '/es/iniciar-sesion-o-registro',
  },

  trustHost: true,
};
