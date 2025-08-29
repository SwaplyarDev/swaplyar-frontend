// Enums
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin'
}

export enum Gender {
  M = 'M',
  F = 'F',
  OTHER = 'Other'
}

// Interface para el perfil del usuario
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  identification: string;
  phone: string;
  birthday: string;
  age: number;
  gender: Gender;
  lastActivity: string | null;
  profilePictureUrl: string | null;
}

// Interface para el usuario
export interface DiscountUser {
  id: string;
  role: UserRole;
  termsAccepted: boolean;
  createdAt: string;
  validatedAt: string | null;
  isActive: boolean;
  isValidated: boolean;
  refreshToken: string;
  profile?: UserProfile;
  category?: string | null;
}

// Interface para el código de descuento
export interface DiscountCode {
  id: string;
  code: string;
  value: number;
  currencyCode: string;
  validFrom: string;
  createdAt: string;
}

// Interface para la transacción
export interface DiscountTransaction {
  id: string;
  countryTransaction: string;
  message: string;
  createdAt: string;
  finalStatus: string;
  userId: string;
}

// Interface principal para cada elemento de descuento
export interface AdminDiscount {
  id: string;
  user: DiscountUser;
  discountCode: DiscountCode;
  transaction: DiscountTransaction | null;
  isUsed: boolean;
  createdAt: string;
  usedAt: string | null;
  updatedAt: string;
}

// Interface para la respuesta completa del backend
export interface AdminDiscountsResponse {
  data: AdminDiscount[];
}


