import { System } from '@/types/data'; // Asegurate que tenga coin: 'USD' | 'ARS' etc.

interface Params {
  couponInstance: 'THREE' | 'FIVE' | 'THREE_FIVE' | 'TEN' | 'MANUAL' | null;
  receiveAmountNum: number;
  sendAmountNum: number;
  selectedSendingSystem: System | null;
  selectedReceivingSystem: System | null;
  rateForOne: number;
  usdToArsRate: number;
  usdToEurRate: number;
  usdToBrlRate: number;
}

export function calculateReceiveAmountWithCoupon({
  couponInstance,
  receiveAmountNum,
  sendAmountNum,
  selectedSendingSystem,
  selectedReceivingSystem,
  rateForOne,
  usdToArsRate,
  usdToEurRate,
  usdToBrlRate,
}: Params): number {
  let couponUsdAmount = 0;
  if (couponInstance === 'THREE') couponUsdAmount = 3;
  else if (couponInstance === 'FIVE') couponUsdAmount = 5;
  else if (couponInstance === 'THREE_FIVE') couponUsdAmount = 8;
  else if (couponInstance === 'TEN') couponUsdAmount = 10;
  // else if (couponInstance === 'MANUAL') couponUsdAmount = 2;

  const receivingCoin = selectedReceivingSystem?.coin;
  const sendingCoin = selectedSendingSystem?.coin;

  const isReceivingUSD = receivingCoin === 'USD';
  const isReceivingARS = receivingCoin === 'ARS';
  const isReceivingEUR = receivingCoin === 'EUR';
  const isReceivingBRL = receivingCoin === 'BRL';

  const shouldApplyCoupon = sendAmountNum > 0 && couponUsdAmount > 0;

  let receiveAmountWithCoupon = receiveAmountNum;

  if (!shouldApplyCoupon) return receiveAmountNum;

  if (sendingCoin === 'EUR' && (receivingCoin === 'USD' || receivingCoin === 'USDT') && rateForOne > 0) {
    receiveAmountWithCoupon += couponUsdAmount / rateForOne;
  } else if ((sendingCoin === 'USD' || sendingCoin === 'USDT') && receivingCoin === 'EUR' && rateForOne > 0) {
    receiveAmountWithCoupon += couponUsdAmount * rateForOne;
  } else if (sendingCoin === 'ARS' && (receivingCoin === 'USD' || receivingCoin === 'USDT')) {
    receiveAmountWithCoupon += couponUsdAmount;
  } else if (sendingCoin === 'ARS' && receivingCoin === 'EUR' && usdToEurRate > 0) {
    receiveAmountWithCoupon += couponUsdAmount / usdToEurRate;
  } else if (sendingCoin === 'ARS' && receivingCoin === 'BRL' && usdToBrlRate > 0) {
    receiveAmountWithCoupon += couponUsdAmount * usdToBrlRate;
  } else if (sendingCoin === 'EUR' && receivingCoin === 'BRL' && usdToBrlRate > 0) {
    receiveAmountWithCoupon += couponUsdAmount * usdToBrlRate;
  } else if (receivingCoin === 'USDT' && rateForOne > 0) {
    receiveAmountWithCoupon += couponUsdAmount * rateForOne;
  } else if (isReceivingUSD && rateForOne > 0) {
    receiveAmountWithCoupon += couponUsdAmount * rateForOne;
  } else if (isReceivingARS && usdToArsRate > 0) {
    receiveAmountWithCoupon += couponUsdAmount * usdToArsRate;
  } else if (isReceivingEUR && rateForOne > 0) {
    receiveAmountWithCoupon += couponUsdAmount * rateForOne;
  } else if (isReceivingBRL && rateForOne > 0) {
    receiveAmountWithCoupon += couponUsdAmount * rateForOne;
  }

  return receiveAmountWithCoupon;
}
