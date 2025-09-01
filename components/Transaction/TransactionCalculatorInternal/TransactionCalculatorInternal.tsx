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
import { useRewardsStore } from '@/store/useRewardsStore';
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

const allowedCouponInstances = ['THREE', 'FIVE', 'THREE_FIVE', 'TEN', 'MANUAL'];

export default function InternalTransactionCalculator({ discounts, stars, errors } : { discounts: AdminDiscountsResponse | null; stars: UserStarsAndAmount; errors: string[] }) {

  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const { startUpdatingRates, stopUpdatingRates, rates } = getExchangeRateStore();
  const { couponInstance, setData, setCouponInstanceByAmount } = useRewardsStore();
  const { selectedWallet, setSelectedWallet, clearSelectedWallet } = useWalletStore();
  const { activeSelect } = useSystemStore();
  const { handleSystemSelection, handleInvertSystemsClick, toggleSelect } = useSystemSelection();

  const [isProcessing, setIsProcessing] = useState(false);
  const [customReceiveInput, setCustomReceiveInput] = useState('');
  const [isCustomInputActive, setIsCustomInputActive] = useState(false); 
  const { sendAmount, receiveAmount, handleSendAmountChange, handleReceiveAmountChange, rateForOne, rateForOneBank, setFinalReceiveAmount } = useAmountCalculator();
  
  const couponUsdAmount = useRef(0);
  const shouldApplyCoupon = useRef(false);
  const couponInstanceForCalc = useRef<'THREE' | 'FIVE' | 'THREE_FIVE' | 'TEN' | 'MANUAL' | null>(null);
  const receiveAmountWithCoupon = useRef(0);
  const receiveAmountInputValue = useRef('');

  const router = useRouter();
  const pathname = usePathname();
  const { pass } = useControlRouteRequestStore((state) => state);

  // Obtiene los valores numéricos de las cantidades enviadas y recibidas, ademas de las tasas de cambio
  const sendAmountNum = sendAmount ? parseFloat(sendAmount) : 0;
  const receiveAmountNum = receiveAmount ? parseFloat(receiveAmount) : 0;
  const usdToArsRate = rates?.currentValueUSDBlueSale ?? 0;
  const eurToUsdRate = rates?.currentValueEURToUSD ?? 0;
  const usdToBrlRate = rates?.currentValueUSDToBRL ?? 0;
  const arsToBrlRate = usdToArsRate > 0 ? (1 / usdToArsRate) * usdToBrlRate : 0;

  // Actualiza las tasas de cambio al seleccionar un sistema
  useEffect(() => {
    if (selectedSendingSystem && selectedReceivingSystem) startUpdatingRates();

    return () => stopUpdatingRates();
  }, [selectedSendingSystem, selectedReceivingSystem, startUpdatingRates, stopUpdatingRates]);

  // Calcula el couponUsdAmount y el couponInstance según los descuentos obtenidos por parametro
  useEffect(() => {
    if (discounts && discounts.data) {
      discounts.data.map((discount: AdminDiscount) => {
        if (discount.discountCode.value != 10 && couponUsdAmount.current < 10) {
          couponUsdAmount.current = couponUsdAmount.current + discount.discountCode.value;
        }else {
          couponUsdAmount.current = 10;
        }
      });
    }

    if (couponUsdAmount.current === 3) setCouponInstanceByAmount(3);
    else if (couponUsdAmount.current === 5) setCouponInstanceByAmount(5);
    else if (couponUsdAmount.current === 8) setCouponInstanceByAmount(8);
    else if (couponUsdAmount.current === 10) setCouponInstanceByAmount(10);
    
    setData(stars.data.stars, sendAmountNum);
  }, [discounts, stars]);

  shouldApplyCoupon.current = sendAmountNum > 0 && couponUsdAmount.current > 0;

  // Determina el couponInstance a utilizar en el cálculo
  couponInstanceForCalc.current = allowedCouponInstances.includes(couponInstance as string)
    ? (couponInstance as 'THREE' | 'FIVE' | 'THREE_FIVE' | 'TEN' | 'MANUAL')
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

  // Convierte el valor a mostrar en el input de "Recibes" a string
  receiveAmountInputValue.current = shouldApplyCoupon ? formatAmount(receiveAmountWithCoupon.current) : receiveAmount;

  // Redirige si no hay permiso
  useEffect(() => {
    if (!pass && pathname === '/es/auth/solicitud/formulario-de-solicitud') {
      router.push('/es/auth/solicitud');
    }
  }, [pass, pathname, router]);

  const handleSubmit = () => {
    setIsProcessing(true);
    setFinalReceiveAmount(receiveAmountInputValue.current);
    setTimeout(() => {
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

  const userWallets = useMemo(() => [
    {
      id: 'wallet_1',
      type: 'paypal',
      label: 'PayPal 1',
      email: 'alexislerch@gmail.com',
      fullName: 'Alexis Lerch',
      logo: '/logos/paypal.png',
    },
    {
      id: 'wallet_2',
      type: 'paypal',
      label: 'PayPal 2',
      email: 'empresaXYZ@gmail.com',
      fullName: 'Empresa XYZ',
      logo: '/logos/paypal.png',
    },
    {
      id: 'wallet_3',
      type: 'wise',
      label: 'Wise USD',
      email: 'alexislerch@gmail.com',
      fullName: 'Alexis Lerch',
      logo: '/logos/wise.png',
    },
    {
      id: 'wallet_4',
      type: 'wise',
      label: 'Wise EUR',
      email: 'empresaXYZ@gmail.com',
      fullName: 'Empresa XYZ',
      logo: '/logos/wise.png',
    },
    {
      id: 'wallet_5',
      type: 'bank',
      label: 'Banco Personal',
      email: 'alexislerch@gmail.com',
      fullName: 'Alexis Lerch',
      logo: '/logos/bank.png',
    },
  ], []);

  const filteredWallets = useMemo(() => {
    return selectedSendingSystem
      ? userWallets.filter((wallet) => {
          if (selectedSendingSystem.id?.includes('paypal')) return wallet.type === 'paypal';
          if (selectedSendingSystem.id?.includes('wise')) return wallet.type === 'wise';
          if (selectedSendingSystem.id?.includes('bank')) return wallet.type === 'bank';
          if (selectedSendingSystem.id?.includes('payoneer')) return wallet.type === 'payoneer';
          if (selectedSendingSystem.id?.includes('pix')) return wallet.type === 'pix';
          if (selectedSendingSystem.id?.includes('tether')) return wallet.type === 'tether';
          return false;
        })
      : [];
  }, [selectedSendingSystem, userWallets]);

  // Efecto para manejar la selección automática de wallet cuando hay solo una disponible
  useEffect(() => {
    if (filteredWallets.length === 1) {
      setSelectedWallet(filteredWallets[0]);
    } else {
      clearSelectedWallet();
    }
  }, [selectedSendingSystem, filteredWallets, setSelectedWallet, clearSelectedWallet]);

  // Función para manejar el cambio de wallet por ID
  const handleWalletChange = (walletId: string) => {
    const wallet = filteredWallets.find(w => w.id === walletId);
    setSelectedWallet(wallet || null);
  };

  return (
    <div className={`not-design-system flex w-full flex-col items-center`}>
      <div className="mat-card calculator-container flex max-h-[800px] w-full flex-col items-center rounded-2xl bg-calculatorLight px-[19px] py-[27px] shadow-md dark:bg-calculatorDark dark:text-white sm:max-h-[680px] lg-tablet:min-w-[500px]">
        <div className="relative mb-[10px] flex w-full max-w-lg flex-col items-center gap-[10px] text-[#012c8a] dark:text-darkText">
          <p className="flex w-full max-w-lg items-center gap-[7px] font-textFont text-lightText dark:text-darkText">
            {/* // * Esto podría componetizarse */}
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

          <Coupons balance={receiveAmountNum} receivingCoin={selectedReceivingSystem?.coin} isVerified={true} />
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
            wallets={filteredWallets} 
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
