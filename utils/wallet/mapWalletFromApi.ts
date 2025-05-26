export interface Wallet {
  id: string;
  type: string;
  name: string;
  identifier: string;
  details: any[];
}

export const mapWalletFromApi = (acc: any): Wallet => {
  const account = acc.account || {};
  const base = {
    id: acc.account_id || acc.id || '',
    type: (acc.typeAccount || acc.type || '').toLowerCase(),
    name: acc.account_name || '',
    identifier: acc.identification || '',
  };

  switch (base.type) {
    case 'receiver_crypto':
    case 'crypto':
      return {
        ...base,
        details: [
          {
            id: account.account_id || '',
            nombre: acc.first_name || '',
            apellido: acc.last_name || '',
            direction: account.wallet || '',
            red: account.network || '',
          },
        ],
      };

    case 'paypal':
      return {
        ...base,
        details: [
          {
            id: base.id,
            correo: acc.account?.transfer_code || '',
            nombre: acc.first_name || '',
            apellido: acc.last_name || '',
          },
        ],
      };

    case 'virtual_bank':
    case 'virtualbank':
      return {
        ...base,
        details: [
          {
            id: base.id,
            cvu: account.transfer_code || '',
            dni: acc.identification || '',
            nombreBanco: acc.account_name || '',
            nombreUsuario: `${acc.first_name || ''} ${acc.last_name || ''}`.trim(),
            email_account: acc.account?.transfer_code || '',
          },
        ],
      };

    case 'wise':
      return {
        ...base,
        details: [
          {
            id: base.id,
            correo: account.email_account || '',
            nombre: acc.first_name || '',
            apellido: acc.last_name || '',
            moneda: acc.currency || '',
            estado: 'Activa',
          },
        ],
      };

    case 'pix':
      return {
        ...base,
        details: [
          {
            id: base.id,
            clave: account.pix_key || acc.pix_key || '',
            cpf: account.cpf || acc.cpf || '',
            nombre: acc.first_name || '',
            apellido: acc.last_name || '',
          },
        ],
      };

    case 'payoneer':
      return {
        ...base,
        details: [
          {
            id: base.id,
            correo: account.email_account || '',
            nombre: acc.first_name || '',
            apellido: acc.last_name || '',
          },
        ],
      };

    default:
      return {
        ...base,
        details: [],
      };
  }
};
