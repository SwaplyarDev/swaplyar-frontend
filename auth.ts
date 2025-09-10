import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { authConfig } from './auth.config'; // Importamos la config base
import { de } from 'date-fns/locale';

// Defaults de entorno para evitar UntrustedHost en local/Vercel
if (!process.env.AUTH_TRUST_HOST) {
  process.env.AUTH_TRUST_HOST = 'true';
}
if (!process.env.NEXTAUTH_URL) {
  const computed =
    process.env.AUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
    (process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : undefined);
  if (computed) process.env.NEXTAUTH_URL = computed;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
let isRefreshing = false;
let refreshPromise: Promise<JWT> | null = null;
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(`${BACKEND_URL}/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: token.refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }
    
    const expiresIn = data.expires_in || 3600;

    return {
      ...token, 
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? token.refreshToken, 
      expiresAt: Date.now() + expiresIn * 1000,
      user: data.user ?? token.user,
    };

  } catch (error) {
    console.error('Error al refrescar el token de acceso:', error);
    return {
      ...token,
      // Fuerza expiración inmediata para evitar uso de token inválido
      expiresAt: Date.now() - 1000,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  // Confiar en el host indicado por los encabezados en entornos locales/edge
  // Evita el error: UntrustedHost: Host must be trusted
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Si hubo error de refresh previamente, no volver a intentar en este ciclo
      if ((token as any).error === 'RefreshAccessTokenError') {
        return token;
      }
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
          user: user, 
        };
      }

       if (trigger === 'update') {
        console.log('🔁 Trigger "update" → refresh token');
        const refreshed = await refreshAccessToken(token);
        if ((refreshed as any).error === 'RefreshAccessTokenError') {
          return refreshed;
        }
        console.log('✨ Refresco completado.');
        return refreshed;
      }

      const remainingTimeInSeconds = ((token.expiresAt as number) - Date.now()) / 1000;
      if (remainingTimeInSeconds > 0) {
        return token;
      }
      if (isRefreshing) {
        return await refreshPromise;
      }
      isRefreshing = true;
      refreshPromise = refreshAccessToken(token);
      
      const refreshedToken = await refreshPromise;
      if ((refreshedToken as any).error === 'RefreshAccessTokenError') {
        // No log de éxito si falló
        isRefreshing = false;
        refreshPromise = null;
        return refreshedToken;
      }
      console.log('✨ Refresco completado.');
      isRefreshing = false;
      refreshPromise = null;

      return refreshedToken;
    },


     async session({ session, token }) {
      const userPayload = token.user as any;

      // Mapear estructura completa del JWT al session.user
      session.user = {
        id: userPayload.sub,
        email: userPayload.email,
        role: userPayload.role,
        fullName: userPayload.fullName,
        terms: userPayload.terms,
        isActive: userPayload.isActive,
        createdAt: userPayload.createdAt,
        profile: userPayload.profile,
        category: userPayload.category ?? null,
        isValidated: userPayload.isValidated,
        userValidated: userPayload.userValidated,
      } as any;

      session.accessToken = token.accessToken as string;
      session.error = token.error as string;

      return session;
    },
  },
});
export default auth