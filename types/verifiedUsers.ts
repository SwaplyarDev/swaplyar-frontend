// Tipos para el estado de verificación
export type VerificationStatus = 'pending' | 'rejected' | 'verified' | 'resend-data';

// Interfaz para la información básica del usuario
export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Documents {
  front: string;
  back: string;
  selfie: string;
}

// Interfaz para un elemento de verificación individual
export interface VerificationItem {
  id: string;
  users_id: string;
  verification_status: VerificationStatus;
  submitted_at: string;
  updated_at: string;
  user_profile: UserInfo;
  verified_at?: string; 
  rejection_note?: string;
  documents: Documents;
}

// Interfaz para la respuesta completa de verificaciones
export interface VerifiedUsersResponse {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: VerificationItem[];
}

export interface VerificationUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  identification?: string;
  birthday?: string;
}

export interface DetailedVerificationItem {
  id: string;
  user_id: string;
  documents: Documents;
  verification_status: VerificationStatus;
  rejection_note: string | null;
  verified_at: string;
  submitted_at: string;
  updated_at: string;
  user_profile: VerificationUserInfo;
}

// Interfaz para la respuesta de verificación individual
export interface SingleVerificationResponse {
  success: boolean;
  message: string;
  data: DetailedVerificationItem;
}

export interface VerifyForm{
  status: VerificationStatus;
  note_rejection: string;
}

export interface VerificationResponse {
    success: boolean;
    message: string;
    data?: VerificationResponseData
}

export interface VerificationResponseData {
    verification_id: string;
    status: VerificationStatus;
    note_rejection: string | null;
}
