export interface Wallet {
  id: string;
  type: string;
  name: string;
  identifier: string;
  details: any[];
}

export const mapWalletFromApi = (acc: any): Wallet => {
  const base = {
    id: acc.account_id || acc.id || '',
    type: (acc.typeAccount || '').toLowerCase(),
    name: acc.account_name || '',
    identifier: acc.identification || '',
  };

  const user = acc.userAccValues || {};

  switch (base.type) {
    case 'virtual_bank': {
      const subType = (user.account_type || '').toLowerCase();

      return {
        ...base,
        type: subType, // paypal, payoneer o wise
        details: [user], 
      };
    }

    case 'receiver_crypto':
      return {
        ...base,
        type: 'receiver_crypto',
        details: [user],
      };

    case 'pix':
      return {
        ...base,
        type: 'pix',
        details: [user],
      };

    case 'bank':
      return {
        ...base,
        type: 'bank',
        details: [user],
      };

    default:
      return { ...base, details: [user] };
  }
};
