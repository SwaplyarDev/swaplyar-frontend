type ExchangeRateFormula = (amount: number, rate: number, usdToBrl?: number) => number;

interface ExchangeRate {
  from: string;
  to: string;
  formula: ExchangeRateFormula;
  inverseFormula?: ExchangeRateFormula;
}

// Constantes para fórmulas repetitivas
const applyRateWithFee = (fee: number) => (amount: number, rate: number) => amount / (rate * (1 + fee));
const inverseRateWithFee = (fee: number) => (amount: number, rate: number) => amount * rate * (1 + fee);

const applyRateWithReduction = (reduction: number) => (amount: number, rate: number) =>
  amount * (rate - rate * reduction);
const inverseRateWithReduction = (reduction: number) => (amount: number, rate: number) =>
  amount / (rate - rate * reduction);

const simpleFeeReduction = (fee: number) => (amount: number) => amount * (1 - fee);
const simpleInverseFee = (fee: number) => (amount: number) => amount / (1 - fee);

export const exchangeRates: ExchangeRate[] = [
  // Desde Bank
  { from: 'bank', to: 'payoneer_usd', formula: applyRateWithFee(0.04), inverseFormula: inverseRateWithFee(0.04) },
  { from: 'bank', to: 'payoneer_eur', formula: applyRateWithFee(0.04), inverseFormula: inverseRateWithFee(0.04) },
  { from: 'bank', to: 'paypal', formula: applyRateWithFee(0.05), inverseFormula: inverseRateWithFee(0.05) },
  { from: 'bank', to: 'wise_usd', formula: applyRateWithFee(0.04), inverseFormula: inverseRateWithFee(0.04) },
  { from: 'bank', to: 'wise_eur', formula: applyRateWithFee(0.04), inverseFormula: inverseRateWithFee(0.04) },
  {
    from: 'bank',
    to: 'pix',
    formula: (amount, rate, usdToBrl) => (amount / (rate * (1 + 0.05))) * (usdToBrl || 1),
    inverseFormula: (amount, rate, usdToBrl) => (amount / (usdToBrl || 1)) * rate * (1 + 0.05),
  },
  { from: 'bank', to: 'tether', formula: applyRateWithFee(0.04), inverseFormula: inverseRateWithFee(0.04) },

  // Desde Payoneer USD
  {
    from: 'payoneer_usd',
    to: 'bank',
    formula: applyRateWithReduction(0.04),
    inverseFormula: inverseRateWithReduction(0.04),
  },
  { from: 'payoneer_usd', to: 'paypal', formula: simpleFeeReduction(0.02), inverseFormula: simpleInverseFee(0.02) },
  { from: 'payoneer_usd', to: 'wise_usd', formula: simpleFeeReduction(0.05), inverseFormula: simpleInverseFee(0.05) },
  {
    from: 'payoneer_usd',
    to: 'wise_eur',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  {
    from: 'payoneer_usd',
    to: 'payoneer_eur',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  {
    from: 'payoneer_usd',
    to: 'pix',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  { from: 'payoneer_usd', to: 'tether', formula: simpleFeeReduction(0.05), inverseFormula: simpleInverseFee(0.05) },

  // Desde Payoneer EUR
  {
    from: 'payoneer_eur',
    to: 'bank',
    formula: applyRateWithReduction(0.04),
    inverseFormula: inverseRateWithReduction(0.04),
  },
  {
    from: 'payoneer_eur',
    to: 'paypal',
    formula: applyRateWithReduction(0.04),
    inverseFormula: inverseRateWithReduction(0.04),
  },
  { from: 'payoneer_eur', to: 'wise_eur', formula: simpleFeeReduction(0.05), inverseFormula: simpleInverseFee(0.05) },
  {
    from: 'payoneer_eur',
    to: 'payoneer_usd',
    formula: applyRateWithReduction(0.02),
    inverseFormula: inverseRateWithReduction(0.02),
  },
  {
    from: 'payoneer_eur',
    to: 'wise_usd',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  {
    from: 'payoneer_eur',
    to: 'pix',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  {
    from: 'payoneer_eur',
    to: 'tether',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },

  // Desde Wise USD
  {
    from: 'wise_usd',
    to: 'bank',
    formula: applyRateWithReduction(0.06),
    inverseFormula: inverseRateWithReduction(0.06),
  },
  { from: 'wise_usd', to: 'paypal', formula: simpleFeeReduction(0.02), inverseFormula: simpleInverseFee(0.02) },
  { from: 'wise_usd', to: 'payoneer_usd', formula: simpleFeeReduction(0.05), inverseFormula: simpleInverseFee(0.05) },
  {
    from: 'wise_usd',
    to: 'wise_eur',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  {
    from: 'wise_usd',
    to: 'payoneer_eur',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  {
    from: 'wise_usd',
    to: 'pix',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  { from: 'wise_usd', to: 'tether', formula: simpleFeeReduction(0.05), inverseFormula: simpleInverseFee(0.05) },

  // Desde PayPal
  { from: 'paypal', to: 'bank', formula: applyRateWithReduction(0.12), inverseFormula: inverseRateWithReduction(0.12) },
  { from: 'paypal', to: 'payoneer_usd', formula: simpleFeeReduction(0.14), inverseFormula: simpleInverseFee(0.14) },
  {
    from: 'paypal',
    to: 'payoneer_eur',
    formula: applyRateWithReduction(0.14),
    inverseFormula: inverseRateWithReduction(0.14),
  },
  { from: 'paypal', to: 'wise_usd', formula: simpleFeeReduction(0.14), inverseFormula: simpleInverseFee(0.14) },
  {
    from: 'paypal',
    to: 'wise_eur',
    formula: applyRateWithReduction(0.14),
    inverseFormula: inverseRateWithReduction(0.14),
  },
  { from: 'paypal', to: 'pix', formula: applyRateWithReduction(0.14), inverseFormula: inverseRateWithReduction(0.14) },
  { from: 'paypal', to: 'tether', formula: simpleFeeReduction(0.14), inverseFormula: simpleInverseFee(0.14) },

  // Desde Wise EUR
  {
    from: 'wise_eur',
    to: 'bank',
    formula: applyRateWithReduction(0.04),
    inverseFormula: inverseRateWithReduction(0.04),
  },
  { from: 'wise_eur', to: 'paypal', formula: simpleFeeReduction(0.02), inverseFormula: simpleInverseFee(0.02) },
  { from: 'wise_eur', to: 'wise_usd', formula: simpleFeeReduction(0.05), inverseFormula: simpleInverseFee(0.05) },
  {
    from: 'wise_eur',
    to: 'payoneer_usd',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  { from: 'wise_eur', to: 'payoneer_eur', formula: simpleFeeReduction(0.05), inverseFormula: simpleInverseFee(0.05) },
  {
    from: 'wise_eur',
    to: 'pix',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  { from: 'wise_eur', to: 'tether', formula: simpleFeeReduction(0.05), inverseFormula: simpleInverseFee(0.05) },

  // Desde Tether
  { from: 'tether', to: 'bank', formula: applyRateWithReduction(0.04), inverseFormula: inverseRateWithReduction(0.04) },
  { from: 'tether', to: 'paypal', formula: simpleFeeReduction(0.02), inverseFormula: simpleInverseFee(0.02) },
  { from: 'tether', to: 'payoneer_usd', formula: simpleFeeReduction(0.05), inverseFormula: simpleInverseFee(0.05) },
  {
    from: 'tether',
    to: 'payoneer_eur',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  { from: 'tether', to: 'wise_usd', formula: simpleFeeReduction(0.05), inverseFormula: simpleInverseFee(0.05) },
  {
    from: 'tether',
    to: 'wise_eur',
    formula: applyRateWithReduction(0.05),
    inverseFormula: inverseRateWithReduction(0.05),
  },
  { from: 'tether', to: 'pix', formula: applyRateWithReduction(0.05), inverseFormula: inverseRateWithReduction(0.05) },
];
