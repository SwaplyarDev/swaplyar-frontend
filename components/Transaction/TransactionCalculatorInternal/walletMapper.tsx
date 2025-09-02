interface Wallet {
  id: string;
  type: string;
  label: string;
  fullName?: string;
  email?: string;
  logo: string;
  logoDark?: string;
  cbu?: string;
  alias?: string;
  taxId?: string;
  pixKeyType?: string;
  pixKeyValue?: string;
  walletAddress?: string;
  network?: string;
  bankName?: string;
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

      case 'receiver_crypto':
        mappedWallet = {
          id: detail.account_id,
          type: 'tether',
          fullName: account.accountName,
          walletAddress: detail.wallet,
          network: detail.network,
        };
        break;

      case 'pix':
        mappedWallet = {
          id: detail.userAccount.account_id,
          type: 'pix',
          fullName: account.accountName,
          email: detail.pix_value,
          pixKeyType: detail.pix_key,
          pixKeyValue: detail.pix_value,
          taxId: detail.cpf,
        };
        break;

      case 'bank':
        const cbuValue = detail.send_method_key === 'CBU' ? detail.send_method_value : undefined;
        const aliasValue = detail.send_method_key === 'ALIAS' ? detail.send_method_value : undefined;
        mappedWallet = {
          id: detail.account_id,
          type: 'bank',
          label: account.accountName,
          fullName: account.accountName,
          cbu: cbuValue,
          alias: aliasValue,
          taxId: detail.document_value,
        };
        break;
    }

    return {
      id: mappedWallet.id || '',
      type: mappedWallet.type || 'default',
      fullName: mappedWallet.fullName || account.accountName,
      email: mappedWallet.email || 'N/A',
      logo: '',
      pixKeyType: mappedWallet.pixKeyType,
      pixKeyValue: mappedWallet.pixKeyValue,
      taxId: mappedWallet.taxId,
      cbu: mappedWallet.cbu,
      alias: mappedWallet.alias,
      walletAddress: mappedWallet.walletAddress,
      network: mappedWallet.network,
    };
  });

  return wallets.filter((wallet) => wallet.id);
};
