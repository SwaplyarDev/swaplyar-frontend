type ConvertArgs = {
  amount: number;
  currency: string;
  rates: any;      
};

const num = (v: unknown): number => {
  if (v == null) return 0;
  const n = typeof v === "string" ? parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
};

export function convertTransactionToUSD({ amount, currency, rates }: ConvertArgs): number {
  const usdToArs = num(
    rates?.currentValueUSDBlueSale ?? rates?.USD_ARS ?? rates?.usd_ars
  );

  const eurToArs = num(
    rates?.currentValueEURBlueSale ?? rates?.EUR_ARS ?? rates?.eur_ars
  ); 

  const eurToUsdDirect = num(
    rates?.currentValueEURToUSD ?? rates?.EUR_USD ?? rates?.eur_usd
  ); 

  const usdToEur = num(
    rates?.currentValueUSDToEUR ?? rates?.USD_EUR ?? rates?.usd_eur
  );

  const usdToBrl = num(
    rates?.currentValueUSDToBRL ?? rates?.USD_BRL ?? rates?.usd_brl
  ); 

  const eurToUsd =
    (eurToUsdDirect > 0 && eurToUsdDirect) ||
    (usdToEur > 0 && 1 / usdToEur) ||
    (eurToArs > 0 && usdToArs > 0 ? eurToArs / usdToArs : 0);

  switch (currency) {
    case "USD":
    case "USDT":
      return amount;

    case "EUR":
      return eurToUsd > 0 ? amount * eurToUsd : amount;

    case "ARS":
      return usdToArs > 0 ? amount / usdToArs : amount;

    case "BRL":
      return usdToBrl > 0 ? amount / usdToBrl : amount;

    default:
      return amount;
  }
}
