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
  console.log('Wallet antes de mapear:', wallet);

  if (!wallet.details || wallet.details.length === 0) {
    return [[{ label: 'Sin información', value: '-' }]];
  }

  const mappedDetails = wallet.details.map((detail) => {
    const safe = (val: any) => (val !== undefined && val !== null ? String(val) : '-');

    switch (wallet.type) {
      case 'paypal':
      case 'payoneer':
      case 'wise':
        return [
          { label: 'Nombre', value: `${safe(detail.first_name)} ${safe(detail.last_name)}` },
          { label: 'Correo electrónico', value: safe(detail.email) },
          { label: 'Moneda', value: safe(detail.currency), align: 'right' },
        ];

      case 'receiver_crypto':
        return [
          { label: 'Dirección USDT', value: safe(detail.usdt_address) },
          { label: 'Red', value: safe(detail.network) },
          { label: 'Moneda', value: safe(detail.currency), align: 'right' },
        ];

      case 'pix':
        return [
          { label: 'Nombre', value: `${safe(detail.first_name)} ${safe(detail.last_name)}` },
          { label: 'PIX KEY', value: safe(detail.pix_key) },
          { label: 'Tipo de clave PIX', value: safe(detail.pix_key_type) },
          { label: 'CPF', value: safe(detail.cpf) },
          { label: 'Moneda', value: safe(detail.currency), align: 'right' },
        ];

      case 'bank':
        return [
          { label: 'Nombre', value: `${safe(detail.first_name)} ${safe(detail.last_name)}` },
          { label: 'DNI/CUIT/CUIL', value: safe(detail.dni_cuit_cuil) },
          { label: 'CBU/CVU/Alias', value: safe(detail.cbu_cvu_alias) },
          { label: 'Banco', value: safe(detail.bank_name) },
          { label: 'Moneda', value: safe(detail.currency), align: 'right' },
        ];

      default:
        return Object.entries(detail).map(([key, value]) => ({
          label: key,
          value: safe(value),
        }));
    }
  });

  console.log('Detalles mapeados:', mappedDetails);
  return mappedDetails;
}
