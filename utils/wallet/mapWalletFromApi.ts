import { Wallet } from '@/store/useWalletStore';

export function mapWalletFromApi(apiWallet: any): Wallet | null {
  if (!apiWallet?.userAccount?.accountId || !apiWallet?.financialAccount?.paymentMethod) {
    return null;
  }

  const mainId = apiWallet.userAccount.accountId;
  const paymentMethod = apiWallet.financialAccount.paymentMethod;

  return {
    id: mainId,
    type: paymentMethod.platformId,
    name: apiWallet.accountName || 'Sin Nombre',
    currency: paymentMethod.currency || '',
    details: [
      {
        ...apiWallet.financialAccount,
        ...paymentMethod,
      },
    ],
  };
}
