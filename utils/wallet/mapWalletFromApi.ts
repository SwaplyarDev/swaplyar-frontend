export interface Wallet {
  id: string;
  type: string;
  name: string;
  currency: string;
  accountName?: string;
  identifier?: string;
  details: any[];
}

export function mapWalletFromApi(apiWallet:string | any): Wallet {
  const firstDetail = apiWallet.details?.[0];
  const mainId = firstDetail?.userAccount?.accountId ?? '';
  return {
    id: mainId,
    type: apiWallet.payment_type,
    name: apiWallet.accountName,
    currency: firstDetail?.currency,
    details: apiWallet.details, 
  };
}
