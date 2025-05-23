interface WalletDetail {
  id: string;
  [key: string]: any;
}

export function mapWalletDetails(wallet: { type: string; details: WalletDetail[] }): {
  label: string;
  value: string;
  align?: 'right' | 'center' | 'left';
}[][] {
  return wallet.details.map((detail) => {
    switch (wallet.type) {
      case 'paypal':
      case 'wise':
      case 'payoneer':
        return [
          { label: 'Correo electrónico', value: detail.correo },
          { label: 'Titular', value: `${detail.nombre} ${detail.apellido}`, align: 'right' },
        ];
      case 'virtual_bank':
        return [
          { label: 'CBU/CVU', value: detail.cvu },
          { label: 'DNI/CUIL', value: detail.dni },
          { label: 'Banco', value: detail.nombreBanco },
          { label: 'Titular', value: detail.nombreUsuario, align: 'right' },
        ];
      case 'receiver_crypto':
        return [
          { label: 'Dirección USDT', value: detail.direction },
          { label: 'Red', value: detail.red, align: 'right' },
        ];
      case 'pix':
        return [
          { label: 'PIX KEY', value: detail.clave },
          { label: 'CPF', value: detail.cpf },
          { label: 'Titular', value: `${detail.nombre} ${detail.apellido}`, align: 'right' },
        ];
      default:
        return [];
    }
  });
}
