'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';

import SystemInfo from '../SystemInfo/SystemInfo';
import InvertSystems from '../InvertSystems/InvertSystems';
import TransactionSection from '@/components/ui/TransactionSection/TransactionSection';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';

import { systems } from '@/utils/dataCoins';
import { validSendReceive } from '@/utils/currencyApis';

import { useSystemStore } from '@/store/useSystemStore';
import { getExchangeRateStore } from '@/store/exchangeRateStore';
import { useStepperStore } from '@/store/stateStepperStore';
import useControlRouteRequestStore from '@/store/controlRouteRequestStore';

import { useAmountCalculator } from '@/hooks/useAmountCalculator';
import { useSystemSelection } from '@/hooks/useSystemSelection';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

export default function TransactionCalculator() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const tokenEsValido = session?.accessToken;

  const [isProcessing, setIsProcessing] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { selectedSendingSystem, selectedReceivingSystem, activeSelect } = useSystemStore();
  const { resetToDefault } = useStepperStore();
  const { startUpdatingRates, stopUpdatingRates, rates } = getExchangeRateStore();
  const { isDark } = useDarkTheme();
  const { handleSystemSelection, handleInvertSystemsClick, toggleSelect } = useSystemSelection();
  const {
    sendAmount,
    receiveAmount,
    handleSendAmountChange,
    handleReceiveAmountChange,
    rateForOne,
    rateForOneBank,
  } = useAmountCalculator();

  const sendAmountNum = parseFloat(sendAmount || '0');
  const receiveAmountNum = parseFloat(receiveAmount || '0');

  const { pass, setPass } = useControlRouteRequestStore((state) => state);

  const colorError = isDark ? 'text-[#f78a82]' : 'text-[#f44336]';

  // --- DEBUG ---
  console.log('DEBUG: Session:', session?.user);
  // console.log('DEBUG: rate', rateForOne);

  // Habilitar actualización de tasas solo si ambos sistemas están seleccionados
  useEffect(() => {
    if (selectedSendingSystem && selectedReceivingSystem) {
      startUpdatingRates();
    }
    return stopUpdatingRates;
  }, [selectedSendingSystem, selectedReceivingSystem]);

  // Restaurar acceso si fue concedido previamente
  useEffect(() => {
    const acceso = sessionStorage.getItem('accesoPermitido');
    if (acceso === 'true') {
      useControlRouteRequestStore.setState({ pass: true, hasExitedForm: false });
    }
  }, []);

  // Redirección automática si se hizo clic y el token es válido
  useEffect(() => {
    if (!clicked) return;

    if (pathname === '/es/auth/solicitud' && tokenEsValido) {
      router.push('/es/auth/solicitud-interna');
    } else if (pathname === '/es/inicio' && !tokenEsValido) {
      router.push('/es/inicio/formulario-de-solicitud');
    }
  }, [clicked, pathname, tokenEsValido]);

  const handleDirection = () => {
    sessionStorage.setItem('accesoPermitido', 'true');
    const route = tokenEsValido
      ? '/es/auth/solicitud-interna'
      : '/es/inicio/formulario-de-solicitud';
    router.push(route);
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      handleDirection();
      resetToDefault();
      setIsProcessing(false);
    }, 3000);
  };

  const handleClick = () => {
    setClicked(true);
    handleSubmit();
  };

  const isInvalidAmount = !validSendReceive(
    sendAmountNum,
    selectedSendingSystem?.id ?? '',
    receiveAmountNum,
    selectedReceivingSystem?.id ?? '',
  );

  const showErrorMessage = () => {
    if (!isInvalidAmount || !selectedReceivingSystem || !selectedSendingSystem) return null;

    if (
      ['payoneer_usd', 'payoneer_eur'].includes(selectedReceivingSystem.id)
    ) {
      return `El monto minimo a recibir en Payoneer es de 50 ${selectedReceivingSystem.coin}`;
    }

    if (
      ['payoneer_usd', 'payoneer_eur'].includes(selectedSendingSystem.id)
    ) {
      return `El monto minimo a enviar en Payoneer es de 50 ${selectedSendingSystem.coin}`;
    }

    return 'El monto minimo a enviar es de 10 USD';
  };

  return (
    <div className="not-design-system flex w-full flex-col items-center">
      <div className="mat-card calculator-container flex w-full flex-col items-center rounded-2xl bg-calculatorLight p-8 shadow-md dark:bg-calculatorDark dark:text-white sm:h-[623px] lg-tablet:min-w-[500px]">
        <div className="relative flex w-full max-w-lg flex-col items-center text-[#012c8a] dark:text-darkText">
          <p className="flex w-full max-w-lg items-center gap-[7px] font-textFont text-custom-grayD dark:text-darkText">
            {selectedSendingSystem?.id === 'bank' ? (
              <>
                <span className="text-[32px] font-light">{rateForOneBank.toFixed(2)}</span>
                <span className="text-[21px] font-semibold">{selectedSendingSystem?.coin}</span>
                <span className="text-[21px] font-normal">=</span>
                <span className="text-[32px] font-light">1</span>
                <span className="text-[21px] font-semibold">{selectedReceivingSystem?.coin}</span>
              </>
            ) : (
              <>
                <span className="text-[32px] font-light">1</span>
                <span className="text-[21px] font-semibold">{selectedSendingSystem?.coin}</span>
                <span className="text-[21px] font-normal">=</span>
                <span className="text-[32px] font-light">{rateForOne.toFixed(2)}</span>
                <span className="text-[21px] font-semibold">{selectedReceivingSystem?.coin}</span>
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
            {sendAmount !== '' && isInvalidAmount && (
              <p className={`p-1 text-sm ${colorError}`}>{showErrorMessage()}</p>
            )}
          </div>

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
              onClick={handleClick}
              disabled={
                clicked ||
                isProcessing ||
                sendAmount === '' ||
                isNaN(sendAmountNum) ||
                isNaN(receiveAmountNum) ||
                isInvalidAmount
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
