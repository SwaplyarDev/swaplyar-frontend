// Tipos para el estado de verificación
export type VerificationStatus = 'pending' | 'rejected' | 'verified' | 'resend-data';

// Interfaz para la información básica del usuario
export interface UserInfo {
  firstName: string;
  email: string;
  phone?: string; 
}

// Interfaz para un elemento de verificación individual
export interface VerificationItem {
  verification_id: string;
  users_id: string;
  verification_status: VerificationStatus;
  created_at: string;
  user: UserInfo;
  verified_at?: string; 
}

// Interfaz para la respuesta completa de verificaciones
export interface VerifiedUsersResponse {
  success: boolean;
  message: string;
  count: number;
  data: VerificationItem[];
}