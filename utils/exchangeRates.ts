type ExchangeRateFormula = (amount: number, rate: number, usdToBrl: number) => number;

interface ExchangeRate {
  from: string;
  to: string;
  formula: ExchangeRateFormula;
  inverseFormula?: ExchangeRateFormula; // Nueva propiedad para la fórmula inversa
}

export const exchangeRates: ExchangeRate[] = [
  // Desde Bank
  {
    from: 'bank',
    to: 'payoneer_usd',
    formula: (amount, rate) => amount / (rate * (1 + 0.04)),
    inverseFormula: (amount, rate) => amount * rate * (1 + 0.04),
  },
  {
    from: 'bank',
    to: 'payoneer_eur',
    formula: (amount, rate) => amount / (rate * (1 + 0.04)),
    inverseFormula: (amount, rate) => amount * rate * (1 + 0.04),
  },
  {
    from: 'bank',
    to: 'paypal',
    formula: (amount, rate) => amount / (rate * (1 + 0.05)),
    inverseFormula: (amount, rate) => amount * rate * (1 + 0.05),
  },
  {
    from: 'bank',
    to: 'wise_usd',
    formula: (amount, rate) => amount / (rate * (1 + 0.04)),
    inverseFormula: (amount, rate) => amount * rate * (1 + 0.04),
  },
  {
    from: 'bank',
    to: 'wise_eur',
    formula: (amount, rate) => amount / (rate * (1 + 0.04)),
    inverseFormula: (amount, rate) => amount * rate * (1 + 0.04),
  },
  {
    from: 'bank',
    to: 'pix',
    formula: (amount, rate, usdToBrl) => (amount / (rate * (1 + 0.05))) * usdToBrl,
    inverseFormula: (amount, rate, usdToBrl) => (amount / usdToBrl) * rate * (1 + 0.05),
  },
  {
    from: 'bank',
    to: 'tether',
    formula: (amount, rate) => amount / (rate * (1 + 0.04)),
    inverseFormula: (amount, rate) => amount * rate * (1 + 0.04),
  },

  // Desde Payoneer USD
  {
    from: 'payoneer_usd',
    to: 'bank',
    formula: (amount, rate) => amount * (rate - rate * 0.04),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.04),
  },
  {
    from: 'payoneer_usd',
    to: 'paypal',
    formula: (amount) => amount * (1 - 0.02),
    inverseFormula: (amount) => amount / (1 - 0.02),
  },
  {
    from: 'payoneer_usd',
    to: 'wise_usd',
    formula: (amount) => amount * (1 - 1 * 0.05),
    inverseFormula: (amount) => amount / (1 - 1 * 0.05),
  },
  {
    from: 'payoneer_usd',
    to: 'wise_eur',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'payoneer_usd',
    to: 'payoneer_eur',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'payoneer_usd',
    to: 'pix',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'payoneer_usd',
    to: 'tether',
    formula: (amount) => amount * (1 - 1 * 0.05),
    inverseFormula: (amount) => amount / (1 - 1 * 0.05),
  },

  // Desde Payoneer EUR
  {
    from: 'payoneer_eur',
    to: 'bank',
    formula: (amount, rate) => amount * (rate - rate * 0.04),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.04),
  },
  {
    from: 'payoneer_eur',
    to: 'paypal',
    formula: (amount, rate) => amount * (rate * (1 - 0.04)),
    inverseFormula: (amount, rate) => amount / (rate * (1 - 0.04)),
  },
  {
    from: 'payoneer_eur',
    to: 'wise_eur',
    formula: (amount) => amount * (1 - 1 * 0.05),
    inverseFormula: (amount) => amount / (1 - 1 * 0.05),
  },
  {
    from: 'payoneer_eur',
    to: 'payoneer_usd',
    formula: (amount, rate) => amount * (rate * (1 - 0.02)),
    inverseFormula: (amount, rate) => amount / (rate * (1 - 0.02)),
  },
  {
    from: 'payoneer_eur',
    to: 'wise_usd',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'payoneer_eur',
    to: 'pix',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'payoneer_eur',
    to: 'tether',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },

  // Desde Wise USD
  {
    from: 'wise_usd',
    to: 'bank',
    formula: (amount, rate) => amount * (rate - rate * 0.06),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.06),
  },
  {
    from: 'wise_usd',
    to: 'paypal',
    formula: (amount) => amount * (1 - 1 * 0.02),
    inverseFormula: (amount) => amount / (1 - 1 * 0.02),
  },
  {
    from: 'wise_usd',
    to: 'payoneer_usd',
    formula: (amount) => amount * (1 - 1 * 0.05),
    inverseFormula: (amount) => amount / (1 - 1 * 0.05),
  },
  {
    from: 'wise_usd',
    to: 'wise_eur',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'wise_usd',
    to: 'payoneer_eur',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'wise_usd',
    to: 'pix',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'wise_usd',
    to: 'tether',
    formula: (amount) => amount * (1 - 1 * 0.05),
    inverseFormula: (amount) => amount / (1 - 1 * 0.05),
  },

  // Desde Wise EUR
  {
    from: 'wise_eur',
    to: 'bank',
    formula: (amount, rate) => amount * (rate - rate * 0.04),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.04),
  },
  {
    from: 'wise_eur',
    to: 'paypal',
    formula: (amount, rate) => amount * (rate - rate * 0.02),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.02),
  },
  {
    from: 'wise_eur',
    to: 'payoneer_eur',
    formula: (amount) => amount * (1 - 1 * 0.05),
    inverseFormula: (amount) => amount / (1 - 1 * 0.05),
  },
  {
    from: 'wise_eur',
    to: 'wise_usd',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'wise_eur',
    to: 'payoneer_usd',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'wise_eur',
    to: 'pix',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'wise_eur',
    to: 'tether',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },

  // Desde Paypal
  {
    from: 'paypal',
    to: 'bank',
    formula: (amount, rate) => amount * (rate - rate * 0.12),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.12),
  },
  {
    from: 'paypal',
    to: 'payoneer_usd',
    formula: (amount) => amount * (1 - 1 * 0.14),
    inverseFormula: (amount) => amount / (1 - 1 * 0.14),
  },
  {
    from: 'paypal',
    to: 'payoneer_eur',
    formula: (amount, rate) => amount * (rate - rate * 0.14),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.14),
  },
  {
    from: 'paypal',
    to: 'wise_usd',
    formula: (amount) => amount * (1 - 1 * 0.14),
    inverseFormula: (amount) => amount / (1 - 1 * 0.14),
  },
  {
    from: 'paypal',
    to: 'wise_eur',
    formula: (amount, rate) => amount * (rate - rate * 0.14),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.14),
  },
  {
    from: 'paypal',
    to: 'tether',
    formula: (amount) => amount * (1 - 1 * 0.14),
    inverseFormula: (amount) => amount / (1 - 1 * 0.14),
  },
  {
    from: 'paypal',
    to: 'pix',
    formula: (amount, rate) => amount * (rate - rate * 0.14),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.14),
  },

  // Desde Tether
  {
    from: 'tether',
    to: 'bank',
    formula: (amount, rate) => amount * (rate - rate * 0.04),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.04),
  },
  {
    from: 'tether',
    to: 'paypal',
    formula: (amount) => amount * (1 - 1 * 0.02),
    inverseFormula: (amount) => amount / (1 - 1 * 0.02),
  },
  {
    from: 'tether',
    to: 'payoneer_eur',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'tether',
    to: 'wise_usd',
    formula: (amount) => amount * (1 - 1 * 0.05),
    inverseFormula: (amount) => amount / (1 - 1 * 0.05),
  },
  {
    from: 'tether',
    to: 'payoneer_usd',
    formula: (amount) => amount * (1 - 1 * 0.05),
    inverseFormula: (amount) => amount / (1 - 1 * 0.05),
  },
  {
    from: 'tether',
    to: 'pix',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
  {
    from: 'tether',
    to: 'wise_eur',
    formula: (amount, rate) => amount * (rate - rate * 0.05),
    inverseFormula: (amount, rate) => amount / (rate - rate * 0.05),
  },
];
