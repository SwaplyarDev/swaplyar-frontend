export interface Wallet {
  id: string;
  type: string;
  name: string;
  currency: string;
  accountName?: string;
  identifier?: string;
  details: any[];
}

export const mapWalletFromApi = (walletApi: any): Wallet => {
  const detail = walletApi.details?.[0] || {};
  return {
    id: detail.account_id || detail.userAccount?.account_id,
    type: walletApi.payment_type, 
    name: detail.type || walletApi.accountName, 
    currency: detail.currency || '',
    accountName: walletApi.accountName,
    details: walletApi.details,
  };
};
