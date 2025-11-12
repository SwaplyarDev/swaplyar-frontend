'use client';
//hooks
import { useState, useEffect } from 'react';
import { useSystemStore } from '@/store/useSystemStore';
import { usePathname, useRouter } from 'next/navigation';
import { useAmountCalculator } from '@/hooks/useAmountCalculator';
import { useSystemSelection } from '@/hooks/useSystemSelection';
import useControlRouteRequestStore from '@/store/controlRouteRequestStore';
//store
import { getExchangeRateStore } from '@/store/exchangeRateStore';
import { useStepperStore } from '@/store/stateStepperStore';

//utils
import SystemInfo from '../SystemInfo/SystemInfo';
import { systems } from '@/utils/dataCoins';
import { validSendReceive } from '@/utils/currencyApis';
//components y otros
import InvertSystems from '../InvertSystems/InvertSystems';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import TransactionSection from '@/components/ui/TransactionSection/TransactionSection';
import clsx from 'clsx';
import AuthButton from '@/components/auth/AuthButton';

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
  const { resetToDefault, updateFormData } = useStepperStore();
  const router = useRouter();
  const { isDark } = useDarkTheme();
  const { handleSystemSelection, handleInvertSystemsClick, toggleSelect } = useSystemSelection();
  const { sendAmount, receiveAmount, handleSendAmountChange, handleReceiveAmountChange, rateForOne } =
    useAmountCalculator();
  const colorError = isDark ? 'text-[#f78a82]' : 'text-[#f44336]';
  const pathname = usePathname();
  const { pass } = useControlRouteRequestStore((state) => state);
  const { setPassTrue } = useControlRouteRequestStore((state) => state);
  const sendAmountNum = sendAmount ? parseFloat(sendAmount) : 0;
  const receiveAmountNum = receiveAmount ? parseFloat(receiveAmount) : 0;
  const { rates } = getExchangeRateStore.getState();
  useEffect(() => {
    if (!pass && pathname === '/es/inicio/formulario-de-solicitud') {
      router.push('/es/inicio');
    }
  }, [pass, pathname, router]);

  const handleDirection = () => {
    sessionStorage.setItem('accesoPermitido', 'true');
    try {
      document.cookie = 'requestPass=1; Max-Age=120; Path=/; SameSite=Lax';
    } catch { }
    setPassTrue();

    router.push('/es/inicio/formulario-de-solicitud');
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    // ✅ Actualizar StepperStore antes de avanzar
    updateFormData(2, {
      send_amount: sendAmount,
      receive_amount: receiveAmount,
    });
    setTimeout(() => {
      handleDirection();
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className={`not-design-system flex w-full flex-col items-center`}>
      <div className="mat-card calculator-container flex w-full h-full flex-col justify-center items-center rounded-2xl bg-custom-whiteD-500 px-1 py-2.5 md:px-5 md:py-8 sm:shadow-md dark:bg-calculatorDark dark:text-white sm:h-[460px] lg-tablet:min-w-[590px]">
        <div className="relative flex w-full flex-col items-center text-[#012c8a] dark:text-darkText">
          <p className="flex w-full items-center gap-[7px] font-textFont text-custom-grayD dark:text-darkText mb-1 sm:mb-3 max-sm:pl-1">
            {selectedSendingSystem?.coin === 'ARS' ? (
              <>
                <span className="text-[20px] sm:text-[32px] font-light">{rateForOne.toFixed(2)}</span>
                <span className="text-[16px] sm:text-[21px] font-semibold"> {selectedSendingSystem?.coin}</span>
                <span className="text-[16px] sm:text-[21px] font-normal"> = </span>
                <span className="text-[20px] sm:text-[32px] font-light">1</span>
                <span className="text-[16px] sm:text-[21px] font-semibold"> {selectedReceivingSystem?.coin}</span>
              </>
            ) : (
              <>
                <span className="text-[20px] sm:text-[32px] font-light">1</span>
                <span className="text-[16px] sm:text-[21px] font-semibold"> {selectedSendingSystem?.coin}</span>
                <span className="text-[16px] sm:text-[21px] font-normal"> = </span>
                <span className="text-[20px] sm:text-[32px] font-light">{rateForOne.toFixed(2)}</span>
                <span className="text-[16px] sm:text-[21px] font-semibold"> {selectedReceivingSystem?.coin}</span>
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
            isSending={true}
          />
          <div className='flex items-center gap-5 my-1 sm:my-3 max-sm:justify-between max-sm:w-full'>
            <SystemInfo pointBorder="border" linePosition="up">
              <p className="font-textFont font-light text-xs text-lightText dark:text-custom-grayD-500 xs:text-sm">Información del sistema de recepción</p>
            </SystemInfo>
            <div className="flex flex-col h-full items-center justify-center">
              <InvertSystems onInvert={handleInvertSystemsClick} selectedReceivingSystem={selectedReceivingSystem} />
            </div>
          </div>
        </div>
        <div className="relative flex w-full flex-col items-center text-[#012c8a] dark:text-darkText">
          <TransactionSection
            systems={systems}
            selectedSystem={selectedReceivingSystem}
            onSystemSelect={(system) => handleSystemSelection(system, false)}
            showOptions={activeSelect === 'receive'}
            toggleSelect={() => toggleSelect('receive')}
            value={receiveAmount}
            onChange={handleReceiveAmountChange}
            isSending={false}
          />
          <div className="flex min-h-[25px] sm:min-h-[30px] w-full items-end justify-center">
            {sendAmount === '' ? null : (
              <div
                className={clsx(
                  !validSendReceive(
                    sendAmountNum,
                    selectedSendingSystem?.id ?? '',
                    receiveAmountNum,
                    selectedReceivingSystem?.id ?? '',
                  )
                    ? 'block'
                    : 'hidden',
                )}
              >
                {(!validSendReceive(
                  sendAmountNum,
                  selectedSendingSystem?.id ?? '',
                  receiveAmountNum,
                  selectedReceivingSystem?.id ?? '',
                ) &&
                  selectedReceivingSystem?.id === 'payoneer_usd') ||
                  selectedReceivingSystem?.id === 'payoneer_eur' ? (
                  <p className={`p-1 text-xs sm:text-sm ${colorError}`}>
                    El monto minimo a recibir en Payoneer es de 50 {selectedReceivingSystem.coin}
                  </p>
                ) : selectedSendingSystem?.id === 'payoneer_usd' || selectedSendingSystem?.id === 'payoneer_eur' ? (
                  <p className={`p-1 text-xs sm:text-sm ${colorError}`}>
                    El monto minimo a enviar en Payoneer es de 50 {selectedSendingSystem.coin}
                  </p>
                ) : (
                  <p className={`p-1 text-xs sm:text-sm ${colorError}`}>El monto minimo a enviar es de 10 USD</p>
                )}
              </div>
            )}
          </div>
          <AuthButton
            label="Procesar pago"
            onClick={handleSubmit}
            isDark={isDark}
            loading={isProcessing}
            disabled={
              sendAmount === '' ||
              isNaN(sendAmountNum) ||
              isNaN(receiveAmountNum) ||
              !validSendReceive(sendAmountNum, selectedSendingSystem?.id ?? '', receiveAmountNum, selectedReceivingSystem?.id ?? '')
            }
            className='!w-full'
          />
        </div>
      </div>
    </div>
  );
}