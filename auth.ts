import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { authConfig } from './auth.config'; // Importamos la config base

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
    if (!token.refreshToken) {
      throw new Error('No refresh token present');
    }

  const refreshUrl = `${BACKEND_URL}/token/refresh`;
 const res = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: token.refreshToken }),
    });


    let data: any = null;
    try {
      data = await res.json();
      console.log('Respuesta refreshtoken en auth.ts: (json)', data);
    } catch {
      // Si no es JSON, intentamos texto
      try {
        const text = await res.text();
        data = { message: text };
      } catch {}
    }

    if (!res.ok) {
      throw new Error(data?.message || `HTTP ${res.status}`);
    }

    const accessPayloadRaw = (data.access_token || '').split('.')[1];
    let accessExpMs: number | undefined;
    if (accessPayloadRaw) {
      try {
        const accessDecoded = JSON.parse(Buffer.from(accessPayloadRaw, 'base64').toString());
        accessExpMs = accessDecoded?.exp ? accessDecoded.exp * 1000 : undefined;
      } catch {}
    }

    const expiresIn = data.expires_in || 3600;
    const computedExpiresAt = accessExpMs ?? (Date.now() + expiresIn * 1000);

    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? token.refreshToken,
      expiresAt: computedExpiresAt,
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
    //se agrega session para que este disponible en jwt
    async jwt({ token, user, trigger, session }) {
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
      // ✅ Nuevo: actualizar datos de usuario con update()
       if (trigger === 'update' && session?.user) {
        console.log('🔁 Trigger "update" → refresh token');

        token.user = {
          ...token.user,
          ...session.user,
          profile: {
            ...(token.user?.profile || {}),
            ...(session.user.profile || {}),
          },
        };
        return token;
      }

      const remainingTimeInSeconds = ((token.expiresAt as number) - Date.now()) / 1000;
      // Refrescar si faltan <= 60s para expirar o ya expiró
      if (remainingTimeInSeconds > 60) {
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
      // ✅ Nuevo: siempre tomar el user completo desde token
      session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      session.error = token.error as string;
      return session;
    },
  },
});
export default auth