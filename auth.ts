import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { authConfig } from './auth.config'; // Importamos la config base
import { de } from 'date-fns/locale';

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
    };

  } catch (error) {
    console.error('Error al refrescar el token de acceso:', error);
    return {
      ...token,
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
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
          user: user, 
        };
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
      
      console.log('✨ Refresco completado.');
      isRefreshing = false;
      refreshPromise = null;

      return refreshedToken;
    },


     async session({ session, token }) {
      const userPayload = token.user as any; 

      session.user = {
        ...session.user, 
        id: userPayload.sub, 
        role: userPayload.role,
        fullName: userPayload.fullName,
        userVerification: userPayload.isValidated, 
      };

     
      session.accessToken = token.accessToken as string;
      session.error = token.error as string; 
      
      return session;
    },
  },
});
export default auth