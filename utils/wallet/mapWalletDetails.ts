interface WalletDetail {
  id?: string;
  [key: string]: any;
}

interface DetailItem {
  label: string;
  value: string;
  align?: 'right' | 'center' | 'left';
}

export function mapWalletDetails(wallet: { type: string; details: WalletDetail[] }): DetailItem[][] {
  const safe = (val: any) => (val !== undefined && val !== null ? String(val) : '-');

  if (!wallet.details || wallet.details.length === 0) {
    return [[{ label: 'Sin información', value: '-' }]];
  }

  return wallet.details.map((detail) => {
    switch (wallet.type) {
      case 'virtual_bank':
      case 'paypal':
      case 'payoneer':
      case 'wise':
        return [
          { label: 'Correo electrónico', value: safe(detail.email) },
          { label: 'Nombre', value: `${safe(detail.firstName)} ${safe(detail.lastName)}`, align: 'right' },
        ];

     case 'bank':
  return [
    { label: safe(detail.send_method_key), value: safe(detail.send_method_value) },
    { label: safe(detail.document_type), value: safe(detail.document_value) },
    { label: 'Banco', value: safe(detail.userAccount.bankName) },
    { label: 'Titular', value: safe(detail.userAccount.accountName) },
  ];

      case 'receiver_crypto':
        return [
          { label: 'Dirección Wallet', value: safe(detail.wallet) },
          { label: 'Red', value: safe(detail.network) , align: 'right' },
        ];

      case 'pix':
        return [
          { label: 'Valor clave PIX', value: safe(detail.pix_value) },
          { label: 'CPF', value: safe(detail.cpf) },
          { label: 'Nombre de la cuenta', value: safe(detail.userAccount.accountName) },
        ];

      default:
        return Object.entries(detail).map(([key, value]) => ({
          label: key,
          value: safe(value),
        }));
    }
  });
}
