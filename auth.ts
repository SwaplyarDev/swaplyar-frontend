// /auth.ts

import NextAuth from 'next-auth';
import authConfig from './auth.config';

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
    signIn: '/auth/login',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Aquí puedes realizar verificaciones adicionales durante el sign-in
      console.log('signIn callback:', {
        user,
        account,
        profile,
        email,
        credentials,
      });
      return true; // Si retorna false, el sign-in fallará
    },
    async redirect({ url, baseUrl }) {
      // Aquí puedes personalizar la URL de redirección
      console.log('redirect callback:', { url, baseUrl });
      return baseUrl; // Por defecto redirige al baseUrl
    },
    async session({ session, token }) {
      // Aquí puedes agregar propiedades adicionales a la sesión
      console.log('session callback:', { session, token });
      if (token) {
        session.user.id = token.id ?? '';
        session.user.role = token.role ?? 'guest';
      }
      return session;
    },
    async jwt({ token, user }) {
      // Aquí puedes personalizar el token JWT
      console.log('jwt callback:', { token, user });
      if (user) {
        token.id = user.id!;
        token.role = user.role ?? 'guest';
      }
      return token;
    },
  },
  ...authConfig,
});

export default auth;
