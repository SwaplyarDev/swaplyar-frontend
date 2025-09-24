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
          id: detail.detailId,
          type: walletType,
          fullName: `${detail.userAccount.firstName} ${detail.userAccount.lastName}`,
          email: detail.email,
        };
        break;

      case 'receiver_crypto':
        mappedWallet = {
          id: detail.detailId,
          type: 'tether',
          fullName: account.accountName,
          walletAddress: detail.wallet,
          network: detail.network,
        };
        break;

      case 'pix':
        mappedWallet = {
          id: detail.userAccount.accountId,
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
          id: detail.detailId,
          type: 'bank',
          label: account.accountName,
          fullName: account.accountName,
          cbu: cbuValue,
          alias: aliasValue,
          taxId: detail.document_value,
          bankName: detail.bankName,
        };
        break;
    }

    const finalWallet = {
      id: mappedWallet.id || '',
      type: mappedWallet.type || 'default',
      label: mappedWallet.label || account.accountName,
      fullName: mappedWallet.fullName || account.accountName,
      email: mappedWallet.email,
      logo: '',
      pixKeyType: mappedWallet.pixKeyType,
      pixKeyValue: mappedWallet.pixKeyValue,
      taxId: mappedWallet.taxId,
      cbu: mappedWallet.cbu,
      alias: mappedWallet.alias,
      walletAddress: mappedWallet.walletAddress,
      network: mappedWallet.network,
      bankName: mappedWallet.bankName,
    } as Wallet;

    return finalWallet;
  });

  return wallets.filter((wallet) => wallet.id);
};
