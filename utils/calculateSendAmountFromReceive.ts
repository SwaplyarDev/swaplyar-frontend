import { System } from '@/types/data';

interface CalculateSendParams {
  receiveValue: string;
  couponUsdAmount: number;
  selectedSendingSystem: System | null;
  selectedReceivingSystem: System | null;
  rateForOne: number;
  rateForOneBank: number;
  usdToArsRate: number;
  eurToUsdRate: number;
  usdToBrlRate: number;
  arsToBrlRate?: number;
  arsToEurRate?: number;
}

export function calculateSendAmountFromReceive({
  receiveValue,
  couponUsdAmount,
  selectedSendingSystem,
  selectedReceivingSystem,
  rateForOne,
  rateForOneBank,
  usdToArsRate,
  eurToUsdRate,
  usdToBrlRate,
  arsToBrlRate = 0,
  arsToEurRate = 0,
}: CalculateSendParams): number {
  const valorUsuario = parseFloat(receiveValue.replaceAll(',', ''));
  if (isNaN(valorUsuario)) return 0;

  const coinTo = selectedReceivingSystem?.coin;
  const coinFrom = selectedSendingSystem?.coin;

  const isReceivingUSD = coinTo === 'USD';
  const isReceivingARS = coinTo === 'ARS';
  const isReceivingEUR = coinTo === 'EUR';
  const isReceivingBRL = coinTo === 'BRL';

  let sendCalculated = 0;

  const isFromBankToPaypal =
    selectedSendingSystem?.id === 'bank' && coinFrom === 'ARS' && (coinTo === 'USD' || coinTo === 'USDT');

  if (isFromBankToPaypal && couponUsdAmount > 0 && rateForOneBank > 0) {
    const montoUsdFinal = valorUsuario - couponUsdAmount;
    sendCalculated = montoUsdFinal > 0 ? montoUsdFinal * rateForOneBank : 0;
  } else if (isReceivingARS && usdToArsRate > 0) {
    const montoSinCupon = valorUsuario / usdToArsRate;
    sendCalculated =
      montoSinCupon >= 9.99 ? (valorUsuario - couponUsdAmount * usdToArsRate) / rateForOne : montoSinCupon;
  } else if (
    (selectedReceivingSystem?.id === 'wise_usd' ||
      selectedReceivingSystem?.id === 'payoneer_usd' ||
      selectedSendingSystem?.id === 'tether') &&
    coinTo === 'USD'
  ) {
    const montoSinCupon = (valorUsuario - couponUsdAmount * rateForOne) / rateForOne;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon : 0;
  } else if (isReceivingUSD && (coinFrom === 'USD' || coinFrom === 'USDT')) {
    const montoSinCupon = valorUsuario - couponUsdAmount * rateForOne;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon : 0;
  } else if (isReceivingUSD && coinFrom === 'EUR') {
    const bonoConvertido = couponUsdAmount * rateForOne;
    const montoSinCupon = valorUsuario - bonoConvertido;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon / rateForOne : 0;
  } else if (isReceivingEUR && coinFrom === 'USD' && rateForOne > 0) {
    const bonoEnEur = couponUsdAmount * rateForOne;
    const valorFinalEUR = valorUsuario - bonoEnEur;
    sendCalculated = valorFinalEUR > 0 ? valorFinalEUR / rateForOne : 0;
  } else if (isReceivingEUR && coinFrom === 'ARS' && usdToArsRate > 0 && eurToUsdRate > 0) {
    const bonoEnEur = couponUsdAmount / eurToUsdRate;
    const valorFinalEUR = valorUsuario - bonoEnEur;
    const finalRate = rateForOne > 0 ? rateForOne : usdToArsRate * eurToUsdRate;

    sendCalculated = valorFinalEUR > 0 ? valorFinalEUR * finalRate : 0;
  } else if (coinFrom === 'USD' && selectedReceivingSystem?.id === 'tether') {
    const bonoConvertido = couponUsdAmount * rateForOne;
    const montoSinCupon = valorUsuario - bonoConvertido;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon / rateForOne : 0;
  } else if (isReceivingUSD || selectedReceivingSystem?.id === 'tether') {
    const montoSinCupon = valorUsuario - couponUsdAmount;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon : 0;
  } else if (selectedSendingSystem?.id === 'tether' && isReceivingARS && usdToArsRate > 0) {
    const bonoConvertido = couponUsdAmount * usdToArsRate;
    const montoSinCupon = valorUsuario - bonoConvertido;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon / usdToArsRate : 0;
  } else if (selectedSendingSystem?.id === 'tether' && isReceivingEUR && rateForOne > 0) {
    const bonoConvertido = couponUsdAmount / rateForOne;
    const montoSinCupon = valorUsuario - bonoConvertido;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon / rateForOne : 0;
  } else if (coinFrom === 'EUR' && selectedReceivingSystem?.id === 'tether') {
    const bonoConvertido = couponUsdAmount * rateForOne;
    const montoSinCupon = valorUsuario - bonoConvertido;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon / rateForOne : 0;
  } else if (isReceivingEUR && rateForOne > 0) {
    const bonoConvertido = couponUsdAmount * rateForOne;
    const montoSinCupon = valorUsuario - bonoConvertido;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon / rateForOne : 0;
  } else if (isReceivingBRL && coinFrom === 'ARS' && usdToArsRate > 0 && arsToBrlRate > 0) {
    const bonoEnArs = couponUsdAmount * usdToArsRate;
    const montoRecibirEnArs = valorUsuario / arsToBrlRate;
    const montoSinCupon = montoRecibirEnArs - bonoEnArs;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon : 0;
  } else if (isReceivingBRL && rateForOne > 0) {
    const bonoConvertido = couponUsdAmount * usdToBrlRate;
    const montoSinCupon = valorUsuario - bonoConvertido;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon / rateForOne : 0;
  } else if (selectedReceivingSystem?.id === 'tether' && rateForOne > 0) {
    const bonoConvertido = couponUsdAmount * rateForOne;
    const montoSinCupon = valorUsuario - bonoConvertido;
    sendCalculated = montoSinCupon > 0 ? montoSinCupon / rateForOne : 0;
  }

  return sendCalculated < 0 ? 0 : sendCalculated;
}
