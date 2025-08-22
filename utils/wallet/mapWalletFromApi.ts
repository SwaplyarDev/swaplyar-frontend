export interface Wallet {
  id: string;
  type: string;
  name: string;
  identifier?: string;
  details: any[];
}

export function mapWalletFromApi(apiWallet: any): Wallet {
  return {
    id: apiWallet.id ?? '',
    type: apiWallet.payment_type ?? '', // antes era userAccValues.accountType
    name: apiWallet.accountName ?? '',
    identifier: apiWallet.identifier ?? '',
    details: apiWallet.details ?? [], // ahora details contiene info como cpf, pix_value, etc.
  };
}
