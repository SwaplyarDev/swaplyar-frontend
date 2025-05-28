'use client';
import { useState, useEffect } from 'react';
import SystemInfo from '@/components/Transaction/SystemInfo/SystemInfo';
import InvertSystems from '@/components/Transaction/InvertSystems/InvertSystems';
import { useSystemStore } from '@/store/useSystemStore';
import { usePathname, useRouter } from 'next/navigation';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useAmountCalculator } from '@/hooks/useAmountCalculator';
import { useSystemSelection } from '@/hooks/useSystemSelection';
import TransactionSection from '@/components/ui/TransactionSection/TransactionSection';
import clsx from 'clsx';
import { getExchangeRateStore } from '@/store/exchangeRateStore';
import { useStepperStore } from '@/store/stateStepperStore';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import useControlRouteRequestStore from '@/store/controlRouteRequestStore';
import { systems } from '@/utils/dataCoins';

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
  const { isDark } = useDarkTheme();
  const { handleSystemSelection, handleInvertSystemsClick, toggleSelect } = useSystemSelection();
  const { sendAmount, receiveAmount, handleSendAmountChange, handleReceiveAmountChange, rateForOne, rateForOneBank } =
    useAmountCalculator();

  const pathname = usePathname();
  const { pass } = useControlRouteRequestStore((state) => state);
  const { setPass } = useControlRouteRequestStore((state) => state);
  const sendAmountNum = sendAmount ? parseFloat(sendAmount) : 0;
  const receiveAmountNum = receiveAmount ? parseFloat(receiveAmount) : 0;

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
      <div className="mat-card calculator-container flex w-full flex-col items-center rounded-2xl bg-calculatorLight p-8 shadow-md dark:bg-calculatorDark dark:text-white sm:h-[623px] lg-tablet:min-w-[500px]">
        <div className="relative flex w-full max-w-lg flex-col items-center text-[#012c8a] dark:text-darkText">
          <p className="flex w-full max-w-lg items-center gap-[7px] font-textFont text-custom-grayD dark:text-darkText">
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
          <div className="mt-4 flex h-full items-center justify-center">
            <InvertSystems onInvert={handleInvertSystemsClick} selectedReceivingSystem={selectedReceivingSystem} />
          </div>
          <SystemInfo pointBorder="border" linePosition="up">
            <p className="font-textFont text-xs font-light xs:text-sm">Información del sistema de recepción</p>
          </SystemInfo>
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
          <div className="flex min-h-[40px] w-full items-end justify-center">
            {sendAmount === '' ? null : (
              <div
                className={clsx(
                  !isSendAmountValid(sendAmountNum, selectedSendingSystem?.id) ||
                    !isReceiveAmountValid(receiveAmountNum, selectedReceivingSystem?.id)
                    ? 'block'
                    : 'hidden',
                )}
              >
                {!isReceiveAmountValid(receiveAmountNum, selectedReceivingSystem?.id) ? (
                  selectedReceivingSystem?.id === 'payoneer_usd' ? (
                    <p className="p-1 text-sm text-[#f44336]">Payoneer USD requiere recibir al menos 50 USD</p>
                  ) : selectedReceivingSystem?.id === 'payoneer_eur' ? (
                    <p className="p-1 text-sm text-[#f44336]">Payoneer EUR requiere recibir al menos 50 EUR</p>
                  ) : null
                ) : (
                  !isSendAmountValid(sendAmountNum, selectedSendingSystem?.id) &&
                  (selectedSendingSystem?.id === 'payoneer_usd' || selectedSendingSystem?.id === 'payoneer_eur' ? (
                    <p className="p-1 text-sm text-[#f44336]">
                      {selectedSendingSystem?.id === 'payoneer_usd'
                        ? 'El monto mínimo desde Payoneer USD es 50 USD'
                        : 'El monto mínimo desde Payoneer EUR es 50 EUR'}
                    </p>
                  ) : (
                    <p className="p-1 text-sm text-[#f44336]">El monto mínimo a enviar es 10 USD</p>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Botón con margen superior consistente */}
          {isProcessing ? (
            <div className="mt-4">
              <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="44px" />
            </div>
          ) : (
            <button
              className={clsx(
                isDark ? 'buttonSecondDark' : 'buttonSecond',
                'w-full max-w-[340px] rounded-full bg-custom-blue-800 px-[14px] py-3 font-titleFont text-base font-semibold text-custom-whiteD disabled:bg-custom-blue-300 dark:bg-custom-whiteD dark:text-custom-grayD dark:disabled:bg-custom-grayD-500 dark:disabled:text-custom-whiteD',
              )}
              onClick={handleSubmit}
              disabled={
                isProcessing ||
                sendAmount === '' ||
                isNaN(sendAmountNum) ||
                isNaN(receiveAmountNum) ||
                !isSendAmountValid(sendAmountNum, selectedSendingSystem?.id) ||
                !isReceiveAmountValid(receiveAmountNum, selectedReceivingSystem?.id)
              }
            >
              Procesar pago
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
