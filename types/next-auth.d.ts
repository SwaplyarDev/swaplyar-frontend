/**
 * Tipos extendidos para NextAuth
 * Alineados con el mapeo actual en auth.ts (session y jwt callbacks)
 */
import type { DefaultSession } from 'next-auth';

// Rol de usuario soportado por el backend
type AppUserRole = 'user' | 'admin' | 'superadmin';

// Perfil de usuario según payload del backend
interface AppProfile {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  nickName?: string | null;
  nickname?: string | null;
  email: string;
  identification?: string | null;
  phone?: string | null;
  birthday?: string | null;
  age?: number | null;
  gender?: string | null;
  profilePictureUrl?: string | null;
  locationId?: string | null;
  lastActivity?: string | null;
  nationality?: string | null;
  location?: Array<{
    country: string;
    department: string;
  }> | null;
  // Algunas respuestas incluyen redes sociales como array u objeto; lo tipamos flexible
  social?: Array<{ network: string; profile: string }> | Record<string, unknown> | null;
}

declare module 'next-auth' {
  /**
   * Usuario que devuelve authorize() o los providers sociales, almacenado en el JWT
   */
  interface User {
    sub?: string; // id del sujeto en el JWT
    email: string;
    role: AppUserRole;
    fullName?: string | null;
    terms?: boolean | string | null;
    isActive?: boolean;
    createdAt?: string;
    profile?: AppProfile | null;
    category?: string | null;
    isValidated?: boolean;
    userValidated?: boolean;
    // Tokens y expiración calculada en authorize()
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number; // epoch ms
  }

  /**
   * Sesión disponible en el cliente (useSession())
   */
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      email: string;
      role: AppUserRole;
      fullName?: string | null;
      terms?: boolean | string | null;
      isActive?: boolean;
      createdAt?: string;
      profile?: AppProfile | null;
      category?: string | null;
      isValidated?: boolean;
      userValidated?: boolean;
    };
    accessToken?: string;
    error?: string; // p.ej. 'RefreshAccessTokenError'
  }
}

declare module 'next-auth/jwt' {
  /**
   * Contenido del token JWT que maneja NextAuth internamente
   */
  interface JWT {
    user?: {
      sub?: string;
      email: string;
      role: AppUserRole;
      fullName?: string | null;
      terms?: boolean | string | null;
      isActive?: boolean;
      createdAt?: string;
      profile?: AppProfile | null;
      category?: string | null;
      isValidated?: boolean;
      userValidated?: boolean;
    };
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number; // epoch ms
    error?: string;
  }
}

export {};
