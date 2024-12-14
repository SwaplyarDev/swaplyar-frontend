'use client';
import { useState, useEffect } from 'react';
import SystemInfo from '../SystemInfo/SystemInfo';
import InvertSystems from '../InvertSystems/InvertSystems';
import { useSystemStore } from '@/store/useSystemStore';
import { usePathname, useRouter } from 'next/navigation';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useAmountCalculator } from '@/hooks/useAmountCalculator';
import { useSystemSelection } from '@/hooks/useSystemSelection';
import TransactionSection from '@/components/ui/TransactionSection/TransactionSection';
import clsx from 'clsx';
import { useExchangeRateStore } from '@/store/exchangeRateStore';
import { useStepperStore } from '@/store/stateStepperStore';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import useControlRouteRequestStore from '@/store/controlRouteRequestStore';
import { systems } from '@/utils/dataCoins';

export default function TransactionCalculator() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const { startUpdatingRates, stopUpdatingRates } = useExchangeRateStore();

  useEffect(() => {
    if (selectedSendingSystem && selectedReceivingSystem) {
      console.log('Iniciando el proceso de actualización de tasas.');
      startUpdatingRates();
    }

    return () => {
      console.log('Deteniendo el proceso de actualización de tasas.');
      stopUpdatingRates();
    };
  }, [selectedSendingSystem, selectedReceivingSystem, startUpdatingRates, stopUpdatingRates]);

  const { activeSelect } = useSystemStore();
  const { resetToDefault } = useStepperStore();
  const router = useRouter();
  const { isDark } = useDarkTheme();
  const [exchange, setExchange] = useState({ currency: 'USD', amount: 0 });
  const { handleSystemSelection, handleInvertSystemsClick, toggleSelect } = useSystemSelection();
  const { sendAmount, receiveAmount, handleSendAmountChange, handleReceiveAmountChange, rateForOne, rateForOneBank } =
    useAmountCalculator();

  useEffect(() => {
    setExchange({
      currency: selectedSendingSystem?.coin as string,
      amount: parseInt(sendAmount),
    });
  }, [sendAmount, selectedSendingSystem]);

  const pathname = usePathname();
  const { pass } = useControlRouteRequestStore((state) => state);
  const { setPass } = useControlRouteRequestStore((state) => state);

  useEffect(() => {
    if (!pass && pathname === '/request') {
      router.push('/home');
    }
  }, [pass, pathname, router]);

  const handleDirection = () => {
    setPass();
    router.push('/request');
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    // setInterval(() => {
    handleDirection();
    resetToDefault();
    setIsProcessing(false);
    // }, 3000);
  };

  return (
    <div className={`not-design-system flex w-full flex-col items-center`}>
      <div className="mat-card calculator-container flex w-full flex-col items-center rounded-2xl bg-calculatorLight p-8 shadow-md dark:bg-calculatorDark dark:text-white lg-tablet:min-w-[500px]">
        <p className="w-full max-w-lg text-2xl text-blue-800 dark:text-darkText xs:text-[2rem]">
          {selectedSendingSystem?.id === 'bank'
            ? `${rateForOneBank.toFixed(2)} ${selectedSendingSystem?.coin} = 1 ${selectedReceivingSystem?.coin}`
            : `1 ${selectedSendingSystem?.coin} = ${rateForOne.toFixed(2)} ${selectedReceivingSystem?.coin}`}
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
          <p className="text-xs xs:text-base">Información del sistema de recepción</p>
        </SystemInfo>
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
          <div className="mt-8">
            <button
              className={clsx(
                isDark
                  ? {
                      buttonSecondDark: !(
                        isProcessing ||
                        sendAmount === '' ||
                        (selectedSendingSystem?.id === 'paypal' && parseInt(sendAmount) < 5) ||
                        (selectedSendingSystem?.id === 'payoneer_usd' && parseInt(sendAmount) < 50) ||
                        (selectedSendingSystem?.id === 'payoneer_eur' && parseInt(sendAmount) < 50) ||
                        (selectedReceivingSystem?.id === 'paypal' && parseInt(receiveAmount) < 5) ||
                        (selectedReceivingSystem?.id === 'payoneer_usd' && parseInt(receiveAmount) < 50) ||
                        (selectedReceivingSystem?.id === 'payoneer_eur' && parseInt(receiveAmount) < 50)
                      ),
                    }
                  : {
                      buttonSecond: !(
                        isProcessing ||
                        sendAmount === '' ||
                        (selectedSendingSystem?.id === 'paypal' && parseInt(sendAmount) < 5) ||
                        (selectedSendingSystem?.id === 'payoneer_usd' && parseInt(sendAmount) < 50) ||
                        (selectedSendingSystem?.id === 'payoneer_eur' && parseInt(sendAmount) < 50) ||
                        (selectedReceivingSystem?.id === 'paypal' && parseInt(receiveAmount) < 5) ||
                        (selectedReceivingSystem?.id === 'payoneer_usd' && parseInt(receiveAmount) < 50) ||
                        (selectedReceivingSystem?.id === 'payoneer_eur' && parseInt(receiveAmount) < 50)
                      ),
                    },
                'relative items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-10 py-3 font-bold text-white disabled:border-gray-400 disabled:bg-calculatorLight2 disabled:text-lightText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-calculatorDark2',
              )}
              onClick={handleSubmit}
              disabled={
                isProcessing ||
                sendAmount === '' ||
                (selectedSendingSystem?.id === 'paypal' && parseInt(sendAmount) < 5) ||
                (selectedSendingSystem?.id === 'payoneer_usd' && parseInt(sendAmount) < 50) ||
                (selectedSendingSystem?.id === 'payoneer_eur' && parseInt(sendAmount) < 50) ||
                (selectedReceivingSystem?.id === 'paypal' && parseInt(receiveAmount) < 5) ||
                (selectedReceivingSystem?.id === 'payoneer_usd' && parseInt(receiveAmount) < 50) ||
                (selectedReceivingSystem?.id === 'payoneer_eur' && parseInt(receiveAmount) < 50)
              }
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  {/* <Image
                    src="/gif/cargando.gif"
                    width={20}
                    height={20}
                    alt="loading"
                    className="mb-0.5 mr-1"
                  /> */}
                  <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} />
                  Procesando...
                </div>
              ) : (
                'Procesar pago'
              )}
            </button>
          </div>
          {sendAmount === '' ? (
            ''
          ) : (
            <div
              className={clsx(
                (selectedSendingSystem?.id === 'payoneer_usd' && parseInt(sendAmount) < 50) ||
                  (selectedSendingSystem?.id === 'payoneer_eur' && parseInt(sendAmount) < 50) ||
                  (selectedReceivingSystem?.id === 'payoneer_usd' && parseInt(receiveAmount) < 50) ||
                  (selectedReceivingSystem?.id === 'payoneer_eur' && parseInt(receiveAmount) < 50) ||
                  (selectedSendingSystem?.id === 'paypal' && parseInt(sendAmount) < 5) ||
                  (selectedReceivingSystem?.id === 'paypal' && parseInt(receiveAmount) < 5)
                  ? 'mt-8'
                  : 'hidden',
              )}
            >
              <p
                className={clsx(
                  (selectedSendingSystem?.id === 'paypal' && parseInt(sendAmount) < 5) ||
                    (selectedReceivingSystem?.id === 'paypal' && parseInt(receiveAmount) < 5)
                    ? 'block'
                    : 'hidden',
                  'text-[#f44336]',
                )}
              >
                La transferencia mínima es de 5 USD en PayPal
              </p>
              <p
                className={clsx(
                  (selectedSendingSystem?.id === 'payoneer_usd' && parseInt(sendAmount) < 50) ||
                    (selectedReceivingSystem?.id === 'payoneer_usd' && parseInt(receiveAmount) < 50)
                    ? 'block'
                    : 'hidden',
                  'text-[#f44336]',
                )}
              >
                La transferencia mínima es de 50 USD en Payoneer
              </p>
              <p
                className={clsx(
                  (selectedSendingSystem?.id === 'payoneer_eur' && parseInt(sendAmount) < 50) ||
                    (selectedReceivingSystem?.id === 'payoneer_eur' && parseInt(receiveAmount) < 50)
                    ? 'block'
                    : 'hidden',
                  'text-[#f44336]',
                )}
              >
                La transferencia mínima es de 50 EUR en Payoneer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
