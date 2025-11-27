// utils/systemBackendMapper.ts
export type SystemBackendId =
  | 'bank'
  | 'paypal'
  | 'payoneer_usd'
  | 'payoneer_eur'
  | 'wise_usd'
  | 'wise_eur'
  | 'tether'
  | 'pix';

export const systemToBackend: Record<SystemBackendId, { currency: 'USD'|'EUR'|'ARS'|'BRL'; platform: string }> = {
  bank:          { currency: 'ARS', platform: 'Banco ARS' },
  paypal:        { currency: 'USD', platform: 'PayPal USD' },
  payoneer_usd:  { currency: 'USD', platform: 'Payoneer USD' },
  payoneer_eur:  { currency: 'EUR', platform: 'Payoneer EUR' },
  wise_usd:      { currency: 'USD', platform: 'wise USD' },
  wise_eur:      { currency: 'EUR', platform: 'wise EUR' },
  tether:        { currency: 'USD', platform: 'tether USD' },
  pix:           { currency: 'BRL', platform: 'pix BRL' },
};

export function mapSystemsToTotalPayload(fromId: SystemBackendId, toId: SystemBackendId, amount: number) {
  const from = systemToBackend[fromId];
  const to   = systemToBackend[toId];
  if (!from || !to) throw new Error(`Mapeo no definido: ${fromId} -> ${toId}`);
  return {
    amount,
    from: from.currency,
    to: to.currency,
    fromPlatform: from.platform,
    toPlatform: to.platform,
  } as const;
}
