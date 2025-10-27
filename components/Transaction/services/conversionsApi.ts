// services/conversionsApi.ts
export interface TotalRequest {
  amount: number;
  from: 'USD'|'EUR'|'ARS'|'BRL';
  to: 'USD'|'EUR'|'ARS'|'BRL';
  fromPlatform: string; // p.ej. "PayPal USD", "Banco ARS"
  toPlatform: string;   // p.ej. "Banco BRL", "Payoneer EUR"
}

export interface TotalResponse {
  from: string;
  to: string;
  amount: number;               // monto origen
  convertedAmount: number;      // monto convertido ANTES de comisión
  rateUsed: number;             // tipo de cambio usado
  message: string;
  commission?: {
    fromPlatform: string;
    toPlatform: string;
    amount: number;            // = convertedAmount
    commissionRate: number;    // 0.05 => 5%
    commissionValue: number;
    finalAmount: number;       // convertido - comisión
    message: string;
  };
  totalReceived: number;        // finalAmount
  fromPlatform: string;
  toPlatform: string;
}

const BASE = process.env.NEXT_PUBLIC_CONVERSIONS_BASE ?? '/api/v2/conversions';

export async function postTotal(payload: TotalRequest, signal?: AbortSignal): Promise<TotalResponse> {
  const res = await fetch(`${BASE}/total`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Error /total: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}
