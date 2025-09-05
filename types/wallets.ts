// Enum para tipos de pago
export enum PaymentType {
  BANK = 'bank',
  WISE = 'wise',
  PIX = 'pix',
  PAYONEER = 'payoneer',
  RECEIVER_CRYPTO = 'receiver_crypto',
  VIRTUAL_BANK = 'virtual_bank',
  PAYPAL = 'paypal'
}

// Enum para tipos de moneda
export enum Currency {
  ARS = 'ARS',
  USD = 'USD',
  BRL = 'BRL',
  USDT = 'USDT'
}

// Enum para tipos de documento
export enum DocumentType {
  DNI = 'DNI',
  PASSPORT = 'PASSPORT',
  CE = 'CE'
}

// Enum para redes de criptomonedas
export enum CryptoNetwork {
  TRC20 = 'TRC20',
  ERC20 = 'ERC20',
  BSC = 'BSC'
}

// Interface base para detalles de cuenta
export interface AccountDetails {
  account_id: string;
  currency?: Currency;
  bank_name?: string;
  send_method_key?: string;
  send_method_value?: string;
  document_type?: DocumentType;
  document_value?: string;
  iban?: string;
  bic?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  transfer_code?: number;
  wise_id?: string;
  pix_key?: string;
  pix_value?: string;
  cpf?: number;  
  receiver_crypto?: string;
  network?: CryptoNetwork;
  wallet?: string;
  userAccount: AccountDetail;
  type: PaymentType;
  bankName?: string;
}

export interface AccountDetail {
  accountName: string;
  accountType: string;
  account_id: string;
  createdAt: string;
  status: boolean;
  updatedAt: string;
  userId: string;
}

// Interface base para wallet
export interface Wallet {
  accountName: string;
  currency: Currency;
  status: boolean;
  payment_type: PaymentType;
  details: AccountDetails[];
}
  
// Interface para el array de wallets (respuesta del backend)
export interface WalletsResponse {
  wallets: Wallet[];
}
