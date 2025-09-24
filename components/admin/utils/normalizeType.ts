export const normalizeType = (type: string, provider?: string, currency?: string): string => {
  const prov = (provider || '').toLowerCase().trim();
  const curr = (currency || '').toLowerCase().trim();

  if (type === 'virtual_bank') {
    if (prov.includes('paypal')) return 'paypal';
    if (prov.includes('wise')) return curr === 'eur' ? 'wise_eur' : 'wise_usd';
    if (prov.includes('payoneer')) return curr === 'eur' ? 'payoneer_eur' : 'payoneer_usd';
    return 'virtual_bank';
  }

  if (type === 'receiver_crypto') return 'tether';
  if (type === 'pix') return 'pix';
  if (type === 'bank') return 'bank';

  return type;
};
