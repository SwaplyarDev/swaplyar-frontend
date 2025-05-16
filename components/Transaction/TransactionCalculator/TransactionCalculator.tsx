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
import { getExchangeRateStore } from '@/store/exchangeRateStore';
import { useStepperStore } from '@/store/stateStepperStore';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import useControlRouteRequestStore from '@/store/controlRouteRequestStore';
import { systems } from '@/utils/dataCoins';

export default function TransactionCalculator() {
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
          {sendAmount === '' ? (
            ''
          ) : (
            <div
              className={clsx(
                (selectedSendingSystem?.id === 'payoneer_usd' && parseInt(sendAmount) < 50) ||
                  (selectedSendingSystem?.id === 'payoneer_eur' && parseInt(sendAmount) < 50) ||
                  (selectedReceivingSystem?.id === 'payoneer_usd' && parseInt(receiveAmount) < 50) ||
                  (selectedReceivingSystem?.id === 'payoneer_eur' && parseInt(receiveAmount) < 50) ||
                  parseInt(receiveAmount) < 10 ||
                  parseInt(sendAmount) < 10
                  ? ''
                  : ' ',
              )}
            >
              {selectedSendingSystem?.id === 'payoneer_usd' || selectedSendingSystem?.id === 'payoneer_eur' ? (
                <>
                  <p
                    className={clsx(
                      (selectedSendingSystem?.id === 'payoneer_usd' && parseInt(sendAmount) < 50) ||
                        (selectedReceivingSystem?.id === 'payoneer_usd' && parseInt(receiveAmount) < 50)
                        ? 'visible mt-4 p-4'
                        : 'invisible mt-4',
                      'text-[#f44336]',
                    )}
                  >
                    La transferencia mínima es de 50 USD en Payoneer
                  </p>
                  <p
                    className={clsx(
                      (selectedSendingSystem?.id === 'payoneer_eur' && parseInt(sendAmount) < 50) ||
                        (selectedReceivingSystem?.id === 'payoneer_eur' && parseInt(receiveAmount) < 50)
                        ? 'visible'
                        : 'invisible absolute',

                      'text-[#f44336]',
                    )}
                  >
                    La transferencia mínima es de 50 EUR en Payoneer
                  </p>
                </>
              ) : (
                <p
                  className={clsx(
                    parseInt(receiveAmount) < 10 || parseInt(sendAmount) < 10 ? 'visible p-4' : 'invisible p-4',
                    'text-[#f44336]',
                  )}
                >
                  La transferencia mínima es de 10 USD
                </p>
              )}
            </div>
          )}
          {isProcessing ? (
            <div className="mt-8">
              <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="44px" />
            </div>
          ) : (
            <button
              className={clsx(
                isDark
                  ? {
                      buttonSecondDark: !(
                        isProcessing ||
                        sendAmount === '' ||
                        parseInt(sendAmount) < 10 ||
                        parseInt(receiveAmount) < 10 ||
                        (selectedSendingSystem?.id === 'payoneer_usd' && parseInt(sendAmount) < 50) ||
                        (selectedSendingSystem?.id === 'payoneer_eur' && parseInt(sendAmount) < 50) ||
                        (selectedReceivingSystem?.id === 'payoneer_usd' && parseInt(receiveAmount) < 50) ||
                        (selectedReceivingSystem?.id === 'payoneer_eur' && parseInt(receiveAmount) < 50)
                      ),
                    }
                  : {
                      buttonSecond: !(
                        isProcessing ||
                        sendAmount === '' ||
                        parseInt(sendAmount) < 10 ||
                        parseInt(receiveAmount) < 10 ||
                        (selectedSendingSystem?.id === 'payoneer_usd' && parseInt(sendAmount) < 50) ||
                        (selectedSendingSystem?.id === 'payoneer_eur' && parseInt(sendAmount) < 50) ||
                        (selectedReceivingSystem?.id === 'payoneer_usd' && parseInt(receiveAmount) < 50) ||
                        (selectedReceivingSystem?.id === 'payoneer_eur' && parseInt(receiveAmount) < 50)
                      ),
                    },
                sendAmount === '' ? 'mt-10' : '',
                'w-full max-w-[340px] rounded-full bg-custom-blue-800 px-[14px] py-3 font-titleFont text-base font-semibold text-custom-whiteD disabled:bg-custom-blue-300 dark:bg-custom-whiteD dark:text-custom-grayD dark:disabled:bg-custom-grayD-500 dark:disabled:text-custom-whiteD',
              )}
              onClick={handleSubmit}
              disabled={
                isProcessing ||
                sendAmount === '' ||
                parseInt(sendAmount) < 10 ||
                parseInt(receiveAmount) < 10 ||
                (selectedSendingSystem?.id === 'payoneer_usd' && parseInt(sendAmount) < 50) ||
                (selectedSendingSystem?.id === 'payoneer_eur' && parseInt(sendAmount) < 50) ||
                (selectedReceivingSystem?.id === 'payoneer_usd' && parseInt(receiveAmount) < 50) ||
                (selectedReceivingSystem?.id === 'payoneer_eur' && parseInt(receiveAmount) < 50)
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
