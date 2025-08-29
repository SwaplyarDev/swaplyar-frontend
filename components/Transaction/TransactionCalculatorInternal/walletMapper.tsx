interface Wallet {
  id: string;
  type: string;
  fullName: string;
  email: string;
  logo: string;
  logoDark?: string;
}

type ApiAccount = {
  accountName: string;
  payment_type: string;
  details: any[];
};

export const mapApiWalletsToFrontend = (apiAccounts: ApiAccount[]): Wallet[] => {
  if (!apiAccounts) return [];

  const wallets = apiAccounts.map((account) => {
    const detail = account.details[0];
    let mappedWallet: Partial<Wallet> = {};

    switch (account.payment_type) {
      case 'virtual_bank':
        let walletType = detail.type;
        if (detail.type === 'wise' || detail.type === 'payoneer') {
          walletType = `${detail.type}_${detail.currency.toLowerCase()}`;
        }
        mappedWallet = {
          id: detail.account_id,
          type: walletType,
          fullName: `${detail.firstName} ${detail.lastName}`,
          email: detail.email,
        };
        break;
      // ...

      case 'receiver_crypto':
        mappedWallet = {
          id: detail.account_id,
          type: 'tether',
          fullName: account.accountName,
          email: detail.wallet,
        };
        break;

      case 'pix':
        mappedWallet = {
          id: detail.userAccount.account_id,
          type: 'pix',
          fullName: account.accountName,
          email: detail.pix_value,
        };
        break;
      case 'bank':
        mappedWallet = {
          id: detail.userAccount.account_id,
          type: 'bank',
          fullName: account.accountName,
          email: detail.pix_value,
        };
        break;
    }

    // Devolvemos un objeto completo que cumple con la interfaz Wallet
    return {
      id: mappedWallet.id || '',
      type: mappedWallet.type || 'default',
      fullName: mappedWallet.fullName || account.accountName,
      email: mappedWallet.email || 'N/A',
      logo: '', // Dejamos esto vacío porque el componente lo maneja
    };
  });

  // Filtramos cualquier billetera que no se haya podido mapear correctamente
  return wallets.filter((wallet) => wallet.id);
};
