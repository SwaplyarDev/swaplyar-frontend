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
    signIn: '/auth/login-register',
  },

  callbacks: {
    async signIn({ user, account }) {
      if (
        account &&
        (account.provider === 'google' || account.provider === 'github')
      ) {
        return true;
      }
      if (user.email) {
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect callback:', { url, baseUrl });
      return baseUrl;
    },
    async jwt({ token, user }) {
      // Verificación de propiedades de `user`
      if (user && user.id) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = (user as any).token;
      }
      console.log('jwt callback:', { token, user });
      return token;
    },

    async session({ session, token }) {
      console.log('session callback:', { session, token });
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.fullName;
        session.user.email = token.email!;
      }
      return session;
    },
  },
  ...authConfig,
});

export default auth;
