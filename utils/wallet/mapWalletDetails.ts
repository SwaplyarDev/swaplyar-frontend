interface WalletDetail {
  id: string;
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
      case 'wise':
      case 'payoneer':
        return [
          { label: 'Correo electrónico', value: safe(detail.correo) },
          { label: 'Titular', value: `${safe(detail.nombre)} ${safe(detail.apellido)}`, align: 'right' },
        ];
      case 'virtual_bank':
        return [
          { label: 'CBU/CVU', value: safe(detail.cvu) },
          { label: 'DNI/CUIL', value: safe(detail.dni) },
          { label: 'Banco', value: safe(detail.nombreBanco) },
          { label: 'Titular', value: safe(detail.nombreUsuario), align: 'right' },
        ];
      case 'receiver_crypto':
      case 'crypto':
        return [
          { label: 'Dirección USDT', value: safe(detail.direction) },
          { label: 'Red', value: safe(detail.red), align: 'right' },
        ];
      case 'pix':
        return [
          { label: 'PIX KEY', value: safe(detail.clave) },
          { label: 'CPF', value: safe(detail.cpf) },
          { label: 'Titular', value: `${safe(detail.nombre)} ${safe(detail.apellido)}`, align: 'right' },
        ];
      case 'bank':
        return [
          { label: 'Banco', value: safe(detail.bank_name) },
          { label: 'Moneda', value: safe(detail.currency) },
          { label: safe(detail.send_method_key), value: safe(detail.send_method_value) },
          { label: 'Documento', value: `${safe(detail.document_type)} ${safe(detail.document_value)}` },
          { label: 'Alias', value: safe(detail.alias) },
          { label: 'Sucursal', value: safe(detail.branch) },
        ];
      default:
        // Para tipos desconocidos, mostramos todas las claves
        return Object.entries(detail).map(([key, value]) => ({
          label: key,
          value: safe(value),
        }));
    }
  });

  console.log('Detalles mapeados:', mappedDetails);
  return mappedDetails;
}
