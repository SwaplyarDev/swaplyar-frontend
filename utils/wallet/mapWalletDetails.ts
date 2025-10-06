interface WalletDetail {
  id?: string;
  [key: string]: any;
}

interface DetailItem {
  label: string;
  value: string;
  align?: 'right' | 'center' | 'left';
}

export function mapWalletDetails(wallet: { name: string; type: string; details: WalletDetail[] }): DetailItem[][] {
  const safe = (val: any) => (val !== undefined && val !== null ? String(val) : '-');

  if (!wallet.details || wallet.details.length === 0) {
    return [[{ label: 'Sin información', value: '-' }]];
  }

  return wallet.details.map((detail) => {
    const titular = `${detail.firstName || ''} ${detail.lastName || ''}`.trim() || wallet.name;

    switch (wallet.type) {
      case 'virtual_bank':
      case 'paypal':
      case 'payoneer':
      case 'wise':
        return [
          { label: 'Correo electrónico', value: safe(detail.emailAccount) },
          { label: 'Titular', value: safe(titular), align: 'right' },
        ];

      case 'bank':
        return [
          { label: 'Tipo de Documento', value: safe(detail.documentType) },
          { label: 'Documento', value: safe(detail.documentValue) },
          { label: 'Banco', value: safe(detail.bankName) },
          { label: 'Titular', value: safe(titular) },
        ];

      case 'receiver_crypto':
        return [
          { label: 'Dirección Wallet', value: safe(detail.wallet) },
          { label: 'Red', value: safe(detail.network), align: 'right' },
        ];

      case 'pix':
        return [
          { label: 'Clave PIX', value: safe(detail.pixValue) },
          { label: 'CPF', value: safe(detail.cpf) },
          { label: 'Titular', value: safe(titular) },
        ];

      default:
        // Se quita array anidado, ya que solo se muestra un detalle, ademas evita errores de tipado
        return [{ label: 'Cuenta', value: safe(wallet.name) }];
    }
  });
}
