import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { InvalidCredentials } from './lib/auth';
import { log } from 'console';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

async function refreshAccessToken(refreshToken: string) {
  try {
    const expiresIn = 3600;
    const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;
    const res = await fetch(`${BACKEND_URL}/v2/token/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken })
  });

    if (!res.ok) {

      throw new Error('No se pudo refrescar el token');
    }

    const data = await res.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? refreshToken,
      expiresAt,
    };
  } catch (err) {
    console.error('❌ Error al refrescar token:', err);
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
        const expiresIn = 3600; 
        const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;

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

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          user,
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
          
        };
      }

      if (Date.now() < (token.expiresAt as number)*1000) {
        return token;
      }

      const refreshed = await refreshAccessToken(token.refreshToken as string);
      if (refreshed) {
        return {
          ...token,
          accessToken: refreshed.accessToken,
          refreshToken: refreshed.refreshToken,
          expiresAt: refreshed.expiresAt,
        };
      }

      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
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
