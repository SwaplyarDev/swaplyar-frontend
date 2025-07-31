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

export interface VerificationUserInfo {
  name: string;
  email: string;
  //firstName: string;
  //lastName?: string;
  //phone?: string;
  //identification?: string;
  //birthday?: string;
}

export interface DetailedVerificationItem {
  verification_id: string;
  users_id: string;
  document_front: string;
  document_back: string;
  selfie_image: string;
  verification_status: VerificationStatus;
  note_rejection: string | null;
  verified_at: string;
  created_at: string;
  updated_at: string;
  user: VerificationUserInfo;
}

// Interfaz para la respuesta de verificación individual
export interface SingleVerificationResponse {
  success: boolean;
  message: string;
  data: DetailedVerificationItem;
}
