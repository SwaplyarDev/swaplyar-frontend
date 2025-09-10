 export const normalizeType = (type: string, provider?: string, currency?: string): string => {
    const prov = (provider || '').toLowerCase().trim();
    const curr = (currency || '').toLowerCase().trim();
    if (type === 'virtual_bank') {
      if (prov.includes('paypal')) return 'paypal';
      if (prov.includes('wise')) return curr === 'eur' ? 'wise-eur' : 'wise-usd';
      if (prov.includes('payoneer')) return curr === 'eur' ? 'payoneer-eur' : 'payoneer-usd';
      return 'virtual_bank';
    }
    if (type === 'receiver_crypto' || prov === 'crypto') return 'tether';
    if (type === 'pix' || prov === 'pix') return 'pix';
    if (type === 'bank' || prov === 'bank' || prov === 'transferencia') return 'transferencia';
    return type;
  };
