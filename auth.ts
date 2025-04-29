import NextAuth, { Session } from 'next-auth';
import { authConfig } from './auth.config';


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/es/iniciar-sesion-o-registro',
  },

  callbacks: {
    /**
     * Se invoca en el momento de la autenticación y en cada petición
     * Almacena en el JWT el user payload y los tokens
     */
    async jwt({ token, user }) {
      if (user) {
        // Almacena el payload del usuario y los tokens en el JWT
        token.user = user;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
        /**
     * Permitimos el inicio de sesión sin bloqueos adicionales
     */
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },

    async session({ session, token }: { session: Session; token: any }) {
      session = token;
      return session;
    },
  },
  ...authConfig,
});

export default auth;
