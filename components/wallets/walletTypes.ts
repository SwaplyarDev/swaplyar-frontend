// PayPal wallet details
export interface PayPalDetail {
  id: string;
  correo: string;
  nombre: string;
  apellido: string;
}

// Transferencia wallet details
export interface TransferenciaDetail {
  id: string;
  cvu: string;
  dni: string;
  nombreBanco: string;
  nombreUsuario: string;
}

// Tether wallet details
export interface TetherDetail {
  id: string;
  direction: string;
  red: string;
}

// Wise wallet details
export interface WiseDetail {
  nombre: string;
  apellido: string;
  id: string;
  correo: string;
  moneda: string;
  estado: string;
}

// Blockchain wallet details
export interface BlockchainDetail {
  id: string;
  ip: string;
  red: string;
  estado: string;
}

// Legacy format
export interface LegacyDetail {
  id: string;
  label: string;
  value: {
    text: string;
    color?: string;
  };
}

// Generic wallet type
export interface WalletType {
  id: string;
  type: string;
  name: string;
  identifier: string;
  details: PayPalDetail[] | TransferenciaDetail[] | TetherDetail[] | WiseDetail[] | BlockchainDetail[] | LegacyDetail[];
}

export interface PixDetail {
  id: string;
  clave: string;
  cpf: string;
  nombre: string;
  apellido: string;
}

export interface PayoneerDetail {
  id: string;
  correo: string;
  nombre: string;
  apellido: string;
}
