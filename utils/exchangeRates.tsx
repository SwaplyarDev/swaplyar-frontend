type ExchangeRateFormula = (amount: number, rate: number) => number;

interface ExchangeRate {
    from: string;
    to: string;
    formula: ExchangeRateFormula;
}

export const exchangeRates: ExchangeRate[] = [
    {
        from: 'bank',
        to: 'payoneer_usd',
        formula: (amount, rate) => (amount / rate) * (1 - 0.04)
    },
    {
        from: 'bank',
        to: 'paypal',
        formula: (amount, rate) => (amount / rate) * (1 - 0.05)
    },
    {
        from: 'bank',
        to: 'payoneer_eur',
        formula: (amount, rate) => (amount / rate) * (1 - 0.04)
    },
    {
        from: 'bank',
        to: 'wise_usd',
        formula: (amount, rate) => (amount / rate) * (1 - 0.04)
    },
    {
        from: 'bank',
        to: 'wise_eur',
        formula: (amount, rate) => (amount / rate) * (1 - 0.04)
    },
    {
        from: 'paypal',
        to: 'bank',
        formula: (amount, rate) => (amount * rate) * (1 - 0.12)
    },
    {
        from: 'paypal',
        to: 'payoneer_usd',
        formula: (amount) => amount * (1 - 0.14)
    },
    {
        from: 'paypal',
        to: 'payoneer_eur',
        formula: (amount, rate) => amount * (rate - rate * 0.14)
    },
    {
        from: 'paypal',
        to: 'wise_usd',
        formula: (amount) => amount * (1 - 0.14)
    },
    {
        from: 'paypal',
        to: 'wise_eur',
        formula: (amount, rate) => amount * (rate - rate * 0.14)
    },
    {
        from: 'payoneer_eur',
        to: 'bank',
        formula: (amount, rate) => (amount * rate) * (1 - 0.04)
    },
    {
        from: 'payoneer_eur',
        to: 'paypal',
        formula: (amount, rate) => (amount * rate) * (1 - 0.04)
    },
    {
        from: 'payoneer_eur',
        to: 'payoneer_usd',
        formula: (amount, rate) => (amount * rate) * (1 - 0.02)
    },
    {
        from: 'payoneer_eur',
        to: 'wise_usd',
        formula: (amount, rate) => (amount * rate) * (1 - 0.05)
    },
    {
        from: 'payoneer_eur',
        to: 'wise_eur',
        formula: (amount) => amount * (1 - 0.05)
    },
    {
        from: 'payoneer_usd',
        to: 'bank',
        formula: (amount, rate) => amount * (rate - rate * 0.04)
    },
    {
        from: 'payoneer_usd',
        to: 'paypal',
        formula: (amount) => amount * (1 - 0.02)
    },
    {
        from: 'payoneer_usd',
        to: 'payoneer_eur',
        formula: (amount, rate) => amount * (rate - rate * 0.05)
    },
    {
        from: 'payoneer_usd',
        to: 'wise_usd',
        formula: (amount) => amount * (1 - 0.05)
    },
    {
        from: 'payoneer_usd',
        to: 'wise_eur',
        formula: (amount, rate) => amount * (rate - rate * 0.05)
    },
    {
        from: 'wise_eur',
        to: 'bank',
        formula: (amount, rate) => amount * (rate - rate * 0.04)
    },
    {
        from: 'wise_eur',
        to: 'paypal',
        formula: (amount, rate) => amount * (rate - rate * 0.02)
    },
    {
        from: 'wise_eur',
        to: 'payoneer_eur',
        formula: (amount) => amount * (1 - 0.05)
    },
    {
        from: 'wise_eur',
        to: 'payoneer_usd',
        formula: (amount, rate) => amount * (rate - rate * 0.05)
    },
    {
        from: 'wise_eur',
        to: 'wise_usd',
        formula: (amount, rate) => amount * (rate - rate * 0.05)
    },
    {
        from: 'wise_usd',
        to: 'bank',
        formula: (amount, rate) => amount * (rate - rate * 0.06)
    },
    {
        from: 'wise_usd',
        to: 'paypal',
        formula: (amount) => amount * (1 - 0.02)
    },
    {
        from: 'wise_usd',
        to: 'payoneer_eur',
        formula: (amount, rate) => amount * (rate - rate * 0.05)
    },
    {
        from: 'wise_usd',
        to: 'payoneer_usd',
        formula: (amount) => amount * (1 - 0.05)
    },
    {
        from: 'wise_usd',
        to: 'wise_eur',
        formula: (amount, rate) => amount * (rate - rate * 0.05)
    }
];
