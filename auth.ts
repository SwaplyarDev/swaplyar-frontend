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
    async signIn({ user, account, profile}) {

      // Validación de datos del usuario
      if (!user || !user.email) {
        console.error('Error: User or email is missing during sign-in.');
        return false; 
      }

      // console.log('signIn callback:', {
      //   user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
      //   account,
      //   profile,
      // });

      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect callback:', { url, baseUrl });
      return baseUrl; 
    },
    async session({ session, token  }) {
      console.log('session callback:', { session, token });
      if (token) {
        session.user.id = token.id; 
        session.user.role = token.role; 
        session.user.name = token.fullName;
        session.user.email = token.email!;

      }
      return session;
    },


    async jwt({ token, user }) {
      // Verificación de propiedades de `user`
      if (user && user.id ) {
        token.id = user.id;
        token.role = user.role;
        token.fullName = user.fullName;
        token.email = user.email;
        token.accessToken = (user as any).token; 
      }
      console.log('jwt callback:', {token, user });
      return token;
    }

  },
  ...authConfig,
});

export default auth;
