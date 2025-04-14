// /next-auth.d.ts

import type { DefaultSession } from 'next-auth';
// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from 'next-auth/jwt';
declare module 'next-auth' {
  interface Session {
    decodedToken: DecodedUser & DefaultSession['user'];
  }
  interface User {
    id: string;
    role: UserRole;
    name: string;
  }
  interface DecodedUser {
    id: string;
    fullName: string;
    email: string;
    terms: string;
    isActive: boolean;
    createdAt: string;
    profile: Profile;
    token: string;
    social: Social[];
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
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    name: string;
    accessToken: string;
  }
}
