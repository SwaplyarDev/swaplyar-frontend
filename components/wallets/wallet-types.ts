// PayPal wallet details
export interface PayPalDetail {
  correo: string;
  nombre: string;
}

// Transferencia wallet details
export interface TransferenciaDetail {
  cvu: string;
  dni: string;
  nombreBanco: string;
  nombreUsuario: string;
}

// Tether wallet details
export interface TetherDetail {
  direction: string;
  red: string;
}

// Wise wallet details
export interface WiseDetail {
  correo: string;
  moneda: string;
  estado: string;
}

// Blockchain wallet details
export interface BlockchainDetail {
  ip: string;
  red: string;
  estado: string;
}

// Legacy format
export interface LegacyDetail {
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
