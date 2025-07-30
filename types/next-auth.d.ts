/**
 * @file Tipos extendidos para NextAuth
 * @module nextAuthTypes
 * @description
 * Extiende los interfaces Session y JWT para incluir propiedades de tu JWT
 */
import type { DefaultSession, DefaultUser } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';
import type { UserRole } from './lib/auth/types';

declare module 'next-auth' {
  /**
   * Aquí ampliamos el User que recibe NextAuth en los callbacks
   */
  interface User extends DecodedUser {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
  /**
   * Sesión en el cliente
   */
   interface Session {
    user: DefaultSession['user'] & DecodedUser;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
     error?: string;
  }

  /**
   * Payload decodificado del JWT de backend
   */
  interface BaseUser {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    terms: boolean | string;
    isActive: boolean;
    isBanned?: boolean;
    createdAt: string;
    profile: Profile;
    token: string;
    social: Social[];
    userVerification: string;
  }

  interface Profile {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    identification: string;
    phone: string;
    birthDate: string;
    age: string;
    gender: string;
    profilePictureUrl: string;
    locationId: string;
    lastActivity: string;
  }

  interface Social {
    network: string;
    profile: string;
  }

  interface Profile {
    firstName: string;
    middleName?: string | null;
    lastName: string;
    nickname?: string | null;
    email: string;
    identification?: string | null;
    phone?: string | null;
    birthDate?: string | null;
    age?: number | null;
    gender?: string | null;
    profilePictureUrl: string;
    locationId?: string | null;
    lastActivity?: string | null;
    social: Social[] | Record<string, any>;
  }
}

declare module 'next-auth/jwt' {
  /**
   * JWT interno usado por NextAuth
   */
  declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user?: import('next-auth').DecodedUser;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: string;
  }
  }
}
