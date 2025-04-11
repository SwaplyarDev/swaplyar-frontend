import NextAuth, { Session } from 'next-auth';
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
    signIn: '/es/iniciar-sesion-o-registro',
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = '';
        token.decodedToken = user;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: any }) {
      session = token;
      return session;
    },
  },
  ...authConfig,
});

export default auth;
