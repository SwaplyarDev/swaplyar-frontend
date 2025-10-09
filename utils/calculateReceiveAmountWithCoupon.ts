import { System } from '@/types/data';
import { is } from 'date-fns/locale';
//agregamos combined como instancia de cupon
interface Params {
  couponInstance: 'THREE' | 'FIVE' | 'THREE_FIVE' | 'TEN' | 'MANUAL' | 'COMBINED' | null;
  receiveAmountNum: number;
  sendAmountNum: number;
  selectedSendingSystem: System | null;
  selectedReceivingSystem: System | null;
  rateForOne: number;
  usdToArsRate: number;
  eurToUsdRate: number;
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
  eurToUsdRate,
  usdToBrlRate,
}: Params): number {
  let couponUsdAmount = 0;
  if (couponInstance === 'THREE') couponUsdAmount = 3;
  else if (couponInstance === 'FIVE') couponUsdAmount = 5;
  else if (couponInstance === 'THREE_FIVE') couponUsdAmount = 8;
  else if (couponInstance === 'TEN') couponUsdAmount = 10;
  //agregamos el combined
  else if (couponInstance === 'COMBINED') couponUsdAmount = 8;
  // else if (couponInstance === 'MANUAL') couponUsdAmount = 2;

  const receivingCoin = selectedReceivingSystem?.coin;
  const sendingCoin = selectedSendingSystem?.coin;

  const isReceivingUSD = receivingCoin === 'USD';
  const isReceivingARS = receivingCoin === 'ARS';
  const isReceivingEUR = receivingCoin === 'EUR';
  const isReceivingBRL = receivingCoin === 'BRL';
  const isReceivingUSDT = receivingCoin === 'USDT';

  const isSendingUSD = sendingCoin === 'USD';
  const isSendingARS = sendingCoin === 'ARS';
  const isSendingEUR = sendingCoin === 'EUR';
  const isSendingBRL = sendingCoin === 'BRL';
  const isSendingUSDT = sendingCoin === 'USDT';

  const shouldApplyCoupon = sendAmountNum > 0 && couponUsdAmount > 0;

  let receiveAmountWithCoupon = receiveAmountNum;

  if (!shouldApplyCoupon) return receiveAmountNum;

  if (isSendingEUR && (isReceivingUSD || isReceivingUSDT) && rateForOne > 0) {
    receiveAmountWithCoupon += couponUsdAmount ;
  } else if ((isSendingUSD || isSendingUSDT) && isReceivingEUR && rateForOne > 0) {
    receiveAmountWithCoupon += (couponUsdAmount * rateForOne); 
  } else if (isSendingARS && (isReceivingUSD || isReceivingUSDT)) {
    receiveAmountWithCoupon += couponUsdAmount;
  } else if (isSendingARS && isReceivingEUR && eurToUsdRate > 0) {
    receiveAmountWithCoupon += (couponUsdAmount / eurToUsdRate);
  } else if (isSendingARS && isReceivingBRL && usdToBrlRate > 0) {
    receiveAmountWithCoupon += (couponUsdAmount * usdToBrlRate);
  } else if (isSendingEUR && isReceivingBRL && usdToBrlRate > 0) {
    receiveAmountWithCoupon += (couponUsdAmount * usdToBrlRate);
  } else if (isReceivingUSDT) {
    receiveAmountWithCoupon += couponUsdAmount;
  } else if (isReceivingUSD) {
    receiveAmountWithCoupon += couponUsdAmount;
  } else if (isReceivingARS && usdToArsRate > 0) {
    receiveAmountWithCoupon += (couponUsdAmount * usdToArsRate);
  } else if (isReceivingEUR && eurToUsdRate > 0) {
    receiveAmountWithCoupon += (couponUsdAmount / eurToUsdRate);
  } else if (isReceivingBRL && usdToBrlRate > 0) {
    receiveAmountWithCoupon += (couponUsdAmount * usdToBrlRate);
  }


  return receiveAmountWithCoupon;
}
