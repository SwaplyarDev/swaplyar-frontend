import { getExchangeRateStore } from '@/store/exchangeRateStore';

export function getCurrentValueEUR() {
  const { ratesOfAPi } = getExchangeRateStore.getState();

  const conversionEURBlueSale = ratesOfAPi.find(
    (item: any) => item['Actualizar Monedas Calculadora']['Par de MonedasR'] === 'EUR Blue (Venta)',
  );
  const conversionEURBluePurchase = ratesOfAPi.find(
    (item: any) => item['Actualizar Monedas Calculadora']['Par de MonedasR'] === 'EUR Blue (Compra)',
  );

  return {
    currentValueEURBlueSale: conversionEURBlueSale
      ? conversionEURBlueSale['Actualizar Monedas Calculadora']['Valor']
      : 0,
    currentValueEURBluePurchase: conversionEURBluePurchase
      ? conversionEURBluePurchase['Actualizar Monedas Calculadora']['Valor']
      : 0,
  };
}
