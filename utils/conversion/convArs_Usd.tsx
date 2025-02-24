import { getExchangeRateStore } from '@/store/exchangeRateStore';

export function getCurrentValueUSD() {
  const { ratesOfAPi } = getExchangeRateStore.getState();

  const conversionUSDBlueSale = ratesOfAPi?.find(
    (item: any) => item['Actualizar Monedas Calculadora']['Par de MonedasR'] === 'USD Blue (Venta)',
  );
  const conversionUSDBluePurchase = ratesOfAPi?.find(
    (item: any) => item['Actualizar Monedas Calculadora']['Par de MonedasR'] === 'USD Blue (Compra)',
  );

  return {
    currentValueUSDBlueSale: conversionUSDBlueSale
      ? conversionUSDBlueSale['Actualizar Monedas Calculadora']['Valor']
      : 0,
    currentValueUSDBluePurchase: conversionUSDBluePurchase
      ? conversionUSDBluePurchase['Actualizar Monedas Calculadora']['Valor']
      : 0,
  };
}
