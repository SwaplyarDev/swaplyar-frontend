'use client';

// Hooks
import { useState, useEffect, useMemo, useRef } from 'react';
import { useSystemStore } from '@/store/useSystemStore';
import { usePathname, useRouter } from 'next/navigation';
import { useAmountCalculator } from '@/hooks/useAmountCalculator';
import { useSystemSelection } from '@/hooks/useSystemSelection';
import useControlRouteRequestStore from '@/store/controlRouteRequestStore';

// Store
import { getExchangeRateStore } from '@/store/exchangeRateStore';
import { CouponInstance, useRewardsStore } from '@/store/useRewardsStore';
import useWalletStore from '@/store/useWalletStore';

// Utils
// Data de las monedas y sistemas
import { systems } from '@/utils/dataCoins';

// Components
import SystemInfo from '@/components/Transaction/SystemInfo/SystemInfo';
import InvertSystems from '@/components/Transaction/InvertSystems/InvertSystems';
import TransactionSection from '@/components/ui/TransactionSection/TransactionSection';

import Coupons from './Coupons';
import BtnProccessPayment from './BtnProccessPayment';
import MinAmountMessage from './MinAmountMessage';
import WalletSelect from './WalletSelect';
import { calculateSendAmountFromReceive } from '@/utils/calculateSendAmountFromReceive';
import { calculateReceiveAmountWithCoupon } from '@/utils/calculateReceiveAmountWithCoupon';
import { AdminDiscount, AdminDiscountsResponse, UserStarsAndAmount } from '@/types/discounts/adminDiscounts';
import { useSession } from 'next-auth/react';
import { useStepperStore } from '@/store/stateStepperStore';

export const allowedCouponInstances: CouponInstance[] = ['THREE', 'FIVE', /* 'THREE_FIVE', */ 'TEN', 'MANUAL'];

export default function InternalTransactionCalculator({
  discounts,
  stars,
  errors,
}: {
  discounts: AdminDiscountsResponse | null;
  stars: UserStarsAndAmount;
  errors: string[];
}) {
  const { activeSelect, selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const { startUpdatingRates, stopUpdatingRates, rates } = getExchangeRateStore();
  const { couponInstance, setData, setCouponInstanceByAmount, addDiscountId, resetDiscounts, isUsed } =
    useRewardsStore();
  const {
    wallets: userWallets,
    selectedWallet,
    setSelectedWallet,
    clearSelectedWallet,
    fetchAndSetWallets,
    isLoading,
  } = useWalletStore();
  const { resetToDefault } = useStepperStore();

  const { data: session } = useSession();
  const token = session?.accessToken;

  const { handleSystemSelection, handleInvertSystemsClick, toggleSelect } = useSystemSelection();

  const [isProcessing, setIsProcessing] = useState(false);
  const [customReceiveInput, setCustomReceiveInput] = useState('');
  const [isCustomInputActive, setIsCustomInputActive] = useState(false);
  const {
    sendAmount,
    receiveAmount,
    handleSendAmountChange,
    handleReceiveAmountChange,
    rateForOne,
    rateForOneBank,
    setFinalReceiveAmount,
  } = useAmountCalculator();

  const couponUsdAmount = useRef(0);
  const shouldApplyCoupon = useRef(false);
  const couponInstanceForCalc = useRef<CouponInstance | null>(null);
  const receiveAmountWithCoupon = useRef(0);
  const receiveAmountInputValue = useRef('');

  const router = useRouter();
  const pathname = usePathname();
  const { pass, setPassTrue } = useControlRouteRequestStore((state) => state);

  // Obtiene los valores numéricos de las cantidades enviadas y recibidas, ademas de las tasas de cambio
  const sendAmountNum = sendAmount ? parseFloat(sendAmount) : 0;
  const receiveAmountNum = receiveAmount ? parseFloat(receiveAmount) : 0;
  const usdToArsRate = rates?.currentValueUSDBlueSale ?? 0;
  const eurToUsdRate = rates?.currentValueEURToUSD ?? 0;
  const usdToBrlRate = rates?.currentValueUSDToBRL ?? 0;
  const arsToBrlRate = usdToArsRate > 0 ? (1 / usdToArsRate) * usdToBrlRate : 0;
  const normalizeType = (type: string, provider?: string, currency?: string): string => {
    const prov = (provider || '').toLowerCase().trim();
    const curr = (currency || '').toLowerCase().trim();

    if (type === 'virtual_bank') {
      if (prov.includes('paypal')) return 'paypal';
      if (prov.includes('wise')) return curr === 'eur' ? 'wise_eur' : 'wise_usd';
      if (prov.includes('payoneer')) return curr === 'eur' ? 'payoneer_eur' : 'payoneer_usd';
      return 'virtual_bank';
    }

    if (type === 'receiver_crypto' || prov === 'crypto') return 'tether';
    if (type === 'pix' || prov === 'pix') return 'pix';
    if (type === 'bank' || prov === 'bank' || prov === 'transferencia') return 'bank';

    return type;
  };
  // Obtiene las billeteras del usuario
  useEffect(() => {
    if (token) {
      fetchAndSetWallets(token);
    }
  }, [token, fetchAndSetWallets]);

  // Actualiza las tasas de cambio al seleccionar un sistema
  useEffect(() => {
    if (selectedSendingSystem && selectedReceivingSystem) startUpdatingRates();

    return () => stopUpdatingRates();
  }, [selectedSendingSystem, selectedReceivingSystem, startUpdatingRates, stopUpdatingRates]);

  useEffect(() => {
    resetDiscounts();
  }, [resetDiscounts]);

  // Calcula el couponUsdAmount y el couponInstance según los descuentos obtenidos por parametro
  useEffect(() => {
    if (discounts && discounts.data && discounts.data.length > 0) {
      resetDiscounts();
      couponUsdAmount.current = 0;
      let tempDiscountIds: string = '';
      discounts.data.map((discount: AdminDiscount) => {
        if (couponUsdAmount.current === 0) {
          couponUsdAmount.current = discount.discountCode.value;
          setCouponInstanceByAmount(couponUsdAmount.current);
          tempDiscountIds = discount.id;
        } else if (discount.discountCode.value < couponUsdAmount.current && !isUsed(discount.discountCode.value)) {
          couponUsdAmount.current = discount.discountCode.value;
          setCouponInstanceByAmount(couponUsdAmount.current);
          tempDiscountIds = discount.id;
        }
      });
      addDiscountId(tempDiscountIds);
    }

    setData(stars.data.stars, sendAmountNum);
  }, [discounts, stars, addDiscountId, isUsed, resetDiscounts, sendAmountNum, setCouponInstanceByAmount, setData]);

  shouldApplyCoupon.current = sendAmountNum > 0 && couponUsdAmount.current > 0;

  // Determina el couponInstance a utilizar en el cálculo
  couponInstanceForCalc.current = allowedCouponInstances.includes(couponInstance as CouponInstance)
    ? (couponInstance as 'THREE' | 'FIVE' | 'TEN' | 'MANUAL')
    : null;

  // Calcula el receiveAmountWithCoupon y el valor a mostrar en el input de "Recibes"
  receiveAmountWithCoupon.current = calculateReceiveAmountWithCoupon({
    couponInstance: couponInstanceForCalc.current,
    receiveAmountNum,
    sendAmountNum,
    selectedSendingSystem,
    selectedReceivingSystem,
    rateForOne,
    usdToArsRate,
    eurToUsdRate,
    usdToBrlRate,
  });

  receiveAmountInputValue.current = shouldApplyCoupon ? formatAmount(receiveAmountWithCoupon.current) : receiveAmount;

  // Nota: No redirigimos desde el cliente; el middleware se encarga del acceso.

  const handleSubmit = () => {
    setIsProcessing(true);
    setFinalReceiveAmount(receiveAmountInputValue.current);
    resetToDefault();
    setTimeout(() => {
      try {
        document.cookie = 'requestPass=1; Max-Age=120; Path=/; SameSite=Lax';
      } catch {}
      setPassTrue();
      router.push('/es/auth/solicitud/formulario-de-solicitud');
    }, 2000);
  };

  const isSendAmountValid = (sendAmountNum: number, sendingSystemId: string | undefined) => {
    if (sendingSystemId === 'payoneer_usd' || sendingSystemId === 'payoneer_eur') {
      return sendAmountNum >= 50;
    } else if (sendingSystemId === 'bank') {
      return sendAmountNum >= rateForOneBank * couponUsdAmount.current && receiveAmountNum >= 10;
    }
    return sendAmountNum >= 10;
  };

  const isReceiveAmountValid = (receiveAmountNum: number, receivingSystemId: string | undefined) => {
    if (receivingSystemId === 'payoneer_usd' || receivingSystemId === 'payoneer_eur') {
      return receiveAmountNum >= 50;
    }
    return true;
  };
  const filteredWallets = useMemo(() => {
    if (!selectedReceivingSystem) {
      return [];
    }

    const walletsToShow = userWallets.filter((wallet) => {
      const detail = wallet.details?.[0];
      const currency = detail?.currency;
      const provider = detail?.type;
      const normalizedWalletType = normalizeType(wallet.type, provider, currency);
      const isMatch = normalizedWalletType === selectedReceivingSystem.id;

      return isMatch;
    });

    return walletsToShow;
  }, [selectedReceivingSystem, userWallets]);
  useEffect(() => {
    if (filteredWallets.length === 1) {
      setSelectedWallet(filteredWallets[0]);
    } else {
      clearSelectedWallet();
    }
  }, [selectedReceivingSystem, filteredWallets, setSelectedWallet, clearSelectedWallet]);

  const handleWalletChange = (walletId: string) => {
    const wallet = filteredWallets.find((w) => w.id === walletId);
    setSelectedWallet(wallet || null);
  };

  if (isLoading && userWallets.length === 0) {
    return (
      <div className="flex w-full flex-col items-center">
        <div className="flex h-[500px] w-full items-center justify-center rounded-2xl bg-calculatorLight dark:bg-calculatorDark lg-tablet:min-w-[500px]">
          <p className="text-lightText dark:text-darkText">Cargando billeteras...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`not-design-system flex w-full flex-col items-center`}>
      <div className="mat-card calculator-container flex max-h-[800px] w-full flex-col items-center rounded-2xl bg-calculatorLight px-[19px] py-[27px] shadow-md dark:bg-calculatorDark dark:text-white sm:max-h-[680px] lg-tablet:min-w-[500px]">
        <div className="relative mb-[10px] flex w-full max-w-lg flex-col items-center gap-[10px] text-[#012c8a] dark:text-darkText">
          <p className="flex w-full max-w-lg items-center gap-[7px] font-textFont text-lightText dark:text-darkText">
            {selectedSendingSystem?.id === 'bank' ? (
              <>
                <span className="text-[32px]/[150%] font-light">{rateForOneBank.toFixed(2)}</span>
                <span className="text-[21px]/[150%] font-semibold">{selectedSendingSystem?.coin}</span>
                <span className="text-[21px]/[150%] font-normal">=</span>
                <span className="text-[32px]/[150%] font-light">1</span>
                <span className="text-[21px]/[150%] font-semibold">{selectedReceivingSystem?.coin}</span>
              </>
            ) : (
              <>
                <span className="text-[32px]/[150%] font-light">1</span>
                <span className="text-[21px]/[150%] font-semibold">{selectedSendingSystem?.coin}</span>
                <span className="text-[21px]/[150%] font-normal">=</span>
                <span className="text-[32px]/[150%] font-light">{rateForOne.toFixed(2)}</span>
                <span className="text-[21px]/[150%] font-semibold">{selectedReceivingSystem?.coin}</span>
              </>
            )}
          </p>

          <TransactionSection
            systems={systems.filter((system) => system.id !== 'pix')}
            selectedSystem={selectedSendingSystem}
            onSystemSelect={(system) => handleSystemSelection(system, true)}
            showOptions={activeSelect === 'send'}
            toggleSelect={() => toggleSelect('send')}
            value={sendAmount}
            onChange={(value) => {
              setIsCustomInputActive(false);
              setCustomReceiveInput('');
              handleSendAmountChange(value);
            }}
            label={`Envías ${selectedSendingSystem?.coin}`}
            isSending={true}
          />

          <div className="flex h-full items-center justify-center">
            <InvertSystems onInvert={handleInvertSystemsClick} selectedReceivingSystem={selectedReceivingSystem} />
          </div>

          <SystemInfo pointBorder="border" linePosition="up">
            <p className="font-textFont text-xs font-light xs:text-sm">Información del sistema de recepción</p>
          </SystemInfo>

          <Coupons balance={receiveAmountNum} receivingCoin={selectedReceivingSystem?.coin} />
        </div>

        <div className="relative flex w-full max-w-lg flex-col items-center text-[#012c8a] dark:text-darkText">
          <TransactionSection
            systems={systems}
            selectedSystem={selectedReceivingSystem}
            onSystemSelect={(system) => handleSystemSelection(system, false)}
            showOptions={activeSelect === 'receive'}
            toggleSelect={() => toggleSelect('receive')}
            value={isCustomInputActive ? customReceiveInput : receiveAmountInputValue.current}
            onChange={(value) => {
              setCustomReceiveInput(value);
              setIsCustomInputActive(true);
              handleReceiveAmountChange(value);

              const sendCalculated = calculateSendAmountFromReceive({
                receiveValue: value,
                couponUsdAmount: couponUsdAmount.current,
                selectedSendingSystem,
                selectedReceivingSystem,
                rateForOne,
                rateForOneBank,
                usdToArsRate,
                eurToUsdRate,
                usdToBrlRate,
                arsToBrlRate,
                arsToEurRate: rates.currentValueEURBlueSale,
              });

              handleSendAmountChange(sendCalculated.toFixed(2));
            }}
            label={`Recibes ${selectedReceivingSystem?.coin}`}
            isSending={false}
          />

          <MinAmountMessage
            isReceiveAmountValid={isReceiveAmountValid}
            isSendAmountValid={isSendAmountValid}
            receiveAmountNum={receiveAmountWithCoupon.current}
            selectedReceivingSystem={selectedReceivingSystem}
            selectedSendingSystem={selectedSendingSystem}
            sendAmount={sendAmount}
            sendAmountNum={sendAmountNum}
          />

          <WalletSelect
            filteredWallets={filteredWallets}
            selectedWalletId={selectedWallet?.id || null}
            onChange={handleWalletChange}
          />

          <BtnProccessPayment
            handleSubmit={handleSubmit}
            isProccessing={isProcessing}
            isReceiveAmountValid={isReceiveAmountValid}
            isSendAmountValid={isSendAmountValid}
            receiveAmountNum={receiveAmountWithCoupon.current}
            selectedReceivingSystem={selectedReceivingSystem}
            selectedSendingSystem={selectedSendingSystem}
            sendAmount={sendAmount}
            sendAmountNum={sendAmountNum}
            // isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
}

function formatAmount(value: number): string {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}
