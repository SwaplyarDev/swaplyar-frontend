export interface Wallet {
  id: string;
  type: string;
  name: string;
  identifier: string;
  details: any[];
}

export const mapWalletFromApi = (acc: any): Wallet => {
  console.log('Entrada raw a mapWalletFromApi:', acc);
  
  const details = acc.details?.[0] || {};

  const base = {
    id: details.account_id || '',
    type: acc.payment_type?.toLowerCase() || '',
    name: acc.accountName || '',
    identifier: details.email_account || '',
  };

  switch (base.type) {
    case 'paypal':
    case 'wise':
    case 'payoneer':
      return {
        ...base,
        details: [{
          id: details.account_id || '',
          correo: details.email_account || '',  // Mapeo correcto del email
          nombre: acc.first_name || '',
          apellido: acc.last_name || ''
        }],
      };

    case 'virtual_bank':
      return {
        ...base,
        details: [{
          id: details.account_id || '',
          cvu: details.transfer_code || '',
          dni: details.identification || '',
          nombreBanco: acc.accountName || '',
          nombreUsuario: details.email_account || '',
        }],
      };

    case 'receiver_crypto':
    case 'crypto':
      return {
        ...base,
        details: [{
          id: details.account_id || '',
          direction: details.wallet || '',    // Mapeo correcto de la dirección
          red: details.network || '',         // Mapeo correcto de la red
        }],
      };

    case 'bank':
      return {
        ...base,
        details: [
          {
            id: base.id,
            moneda: acc.currency || '',
            banco: acc.bank_name || '',
            metodoEnvio: acc.send_method_key || '',
            valorEnvio: acc.send_method_value || '',
            tipoDocumento: acc.document_type || '',
            numeroDocumento: acc.document_value || '',
            alias: acc.alias || '',
            sucursal: acc.branch || '',
            nombre: acc.first_name || '',
            apellido: acc.last_name || '',
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
