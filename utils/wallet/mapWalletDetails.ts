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
          { label: 'Nombre de la cuenta', value: safe(detail.accountName) },
          { label: 'Banco', value: safe(detail.bankName) },
          { label: 'Método de envío clave', value: safe(detail.send_method_key) },
          { label: 'Valor del método de envío', value: safe(detail.send_method_value) },
          { label: 'Tipo de documento', value: safe(detail.document_type) },
          { label: 'Valor del documento', value: safe(detail.document_value) },
          { label: 'Moneda', value: safe(detail.currency), align: 'right' },
        ];

      case 'receiver_crypto':
        return [
          { label: 'Dirección Wallet', value: safe(detail.wallet) },
          { label: 'Red', value: safe(detail.network) , align: 'right' },
        ];

      // PIX
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
