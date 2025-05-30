'use client';

// Hooks
import { useState, useEffect } from 'react';
import { useSystemStore } from '@/store/useSystemStore';
import { usePathname, useRouter } from 'next/navigation';
import { useAmountCalculator } from '@/hooks/useAmountCalculator';
import { useSystemSelection } from '@/hooks/useSystemSelection';
import { useStepperStore } from '@/store/stateStepperStore';
import useControlRouteRequestStore from '@/store/controlRouteRequestStore';

// Store
import { getExchangeRateStore } from '@/store/exchangeRateStore';

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

export default function InternalTransactionCalculator() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const { startUpdatingRates, stopUpdatingRates } = getExchangeRateStore();

  useEffect(() => {
    if (selectedSendingSystem && selectedReceivingSystem) {
      startUpdatingRates();
    }

    return () => {
      stopUpdatingRates();
    };
  }, [selectedSendingSystem, selectedReceivingSystem, startUpdatingRates, stopUpdatingRates]);

  const { activeSelect } = useSystemStore();
  const { resetToDefault } = useStepperStore();
  const router = useRouter();
  const { handleSystemSelection, handleInvertSystemsClick, toggleSelect } = useSystemSelection();
  const { sendAmount, receiveAmount, handleSendAmountChange, handleReceiveAmountChange, rateForOne, rateForOneBank } =
    useAmountCalculator();

  const pathname = usePathname();
  const { pass } = useControlRouteRequestStore((state) => state);
  const { setPass } = useControlRouteRequestStore((state) => state);
  const sendAmountNum = sendAmount ? parseFloat(sendAmount) : 0;
  const receiveAmountNum = receiveAmount ? parseFloat(receiveAmount) : 0;

  // Todo: Replicar formulario de solicitud, Ver en figma

  useEffect(() => {
    if (!pass && pathname === '/es/inicio/formulario-de-solicitud') {
      router.push('/es/inicio');
    }
  }, [pass, pathname, router]);

  const handleDirection = () => {
    sessionStorage.setItem('accesoPermitido', 'true');
    router.push('/es/inicio/formulario-de-solicitud');
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    // Sacarlo
    setTimeout(() => {
      handleDirection();
      resetToDefault();
      setIsProcessing(false);
    }, 3000);
  };

  const isSendAmountValid = (sendAmountNum: number, sendingSystemId: string | undefined) => {
    if (sendingSystemId === 'payoneer_usd' || sendingSystemId === 'payoneer_eur') {
      return sendAmountNum >= 50;
    }
    return sendAmountNum >= 10;
  };

  const isReceiveAmountValid = (receiveAmountNum: number, receivingSystemId: string | undefined) => {
    if (receivingSystemId === 'payoneer_usd' || receivingSystemId === 'payoneer_eur') {
      return receiveAmountNum >= 50;
    }
    return true;
  };
  return (
    <div className={`not-design-system flex w-full flex-col items-center`}>
      <div className="mat-card calculator-container flex w-full flex-col items-center rounded-2xl bg-calculatorLight px-[19px] py-[27px] shadow-md dark:bg-calculatorDark dark:text-white lg-tablet:min-w-[500px]">
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
            onChange={handleSendAmountChange}
            label={`Envías ${selectedSendingSystem?.coin}`}
            isSending={true}
          />

          <div className="flex h-full items-center justify-center">
            <InvertSystems onInvert={handleInvertSystemsClick} selectedReceivingSystem={selectedReceivingSystem} />
          </div>

          <SystemInfo pointBorder="border" linePosition="up">
            <p className="font-textFont text-xs font-light xs:text-sm">Información del sistema de recepción</p>
          </SystemInfo>

          <Coupons balance={20000} />
        </div>

        <div className="relative flex w-full max-w-lg flex-col items-center text-[#012c8a] dark:text-darkText">
          <TransactionSection
            systems={systems}
            selectedSystem={selectedReceivingSystem}
            onSystemSelect={(system) => handleSystemSelection(system, false)}
            showOptions={activeSelect === 'receive'}
            toggleSelect={() => toggleSelect('receive')}
            value={receiveAmount}
            onChange={handleReceiveAmountChange}
            label={`Recibes ${selectedReceivingSystem?.coin}`}
            isSending={false}
          />

          <MinAmountMessage
            isReceiveAmountValid={isReceiveAmountValid}
            isSendAmountValid={isSendAmountValid}
            receiveAmountNum={receiveAmountNum}
            selectedReceivingSystem={selectedReceivingSystem}
            selectedSendingSystem={selectedSendingSystem}
            sendAmount={sendAmount}
            sendAmountNum={sendAmountNum}
          />

          <BtnProccessPayment
            handleSubmit={handleSubmit}
            isProccessing={isProcessing}
            isReceiveAmountValid={isReceiveAmountValid}
            isSendAmountValid={isSendAmountValid}
            receiveAmountNum={receiveAmountNum}
            selectedReceivingSystem={selectedReceivingSystem}
            selectedSendingSystem={selectedSendingSystem}
            sendAmount={sendAmount}
            sendAmountNum={sendAmountNum}
          />
        </div>
      </div>
    </div>
  );
}
