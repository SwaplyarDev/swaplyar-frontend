'use client';
import { useState, useEffect, useCallback } from 'react';
import SystemSelect from '../SystemSelect/SystemSelect';
import SystemInfo from '../SystemInfo/SystemInfo';
import InvertSystems from '../InvertSystems/InvertSystems';
import { System } from '@/types/data';
import { useSystemStore } from '@/store/useSystemStore';
import { useRouter } from 'next/navigation';
import { exchangeRates } from '@/utils/exchangeRates';
import {
  updateCurrentValueEUR,
  updateCurrentValueUSD,
  updateCurrentValueUSDToEUR,
} from '@/utils/currencyApis';

declare global {
  interface Window {
    paypal: any;
  }
}

export default function TransactionCalculator() {
  const router = useRouter();
  const {
    selectedSendingSystem,
    selectedReceivingSystem,
    setSelectedSendingSystem,
    setSelectedReceivingSystem,
    activeSelect,
    setActiveSelect,
  } = useSystemStore();
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [sendAmount, setSendAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Datos de sistemas de pago
  const systems: System[] = [
    {
      id: 'paypal',
      name: 'PayPal',
      logo: '/images/paypal.big.png',
      isDisabled: false,
      coin: 'USD',
    },
    {
      id: 'payoneer-usd',
      name: 'Payoneer USD',
      logo: '/images/payoneer.usd.big.png',
      isDisabled: false,
      coin: 'USD',
    },
    {
      id: 'payoneer-eur',
      name: 'Payoneer EUR',
      logo: '/images/payoneer.eur.big.png',
      isDisabled: false,
      coin: 'EUR',
    },
    {
      id: 'bank',
      name: 'Banco',
      logo: '/images/banco.medium.webp',
      isDisabled: false,
      coin: 'ARS',
    },
    {
      id: 'wise-usd',
      name: 'Wise USD',
      logo: '/images/wise.usd.big.png',
      isDisabled: false,
      coin: 'USD',
    },
    {
      id: 'wise-eur',
      name: 'Wise EUR',
      logo: '/images/wise.eur.big.png',
      isDisabled: false,
      coin: 'EUR',
    },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const findExchangeRate = useCallback(async () => {
    if (selectedSendingSystem && selectedReceivingSystem) {
      let rate = 0;

      // Busca la fórmula adecuada en el array de exchangeRates
      const rateInfo = exchangeRates.find(
        (r) =>
          r.from === selectedSendingSystem.id &&
          r.to === selectedReceivingSystem.id,
      );

      if (rateInfo) {
        let apiRate = 0;
        if (selectedSendingSystem.coin === selectedReceivingSystem.coin) {
          // Si la moneda de envío y recepción es la misma, solo usa el valor de la API
          if (selectedSendingSystem.coin === 'USD') {
            const { currentValueUSDBlueSale } = await updateCurrentValueUSD();
            rate = currentValueUSDBlueSale;
          } else if (selectedSendingSystem.coin === 'EUR') {
            const { currentValueEURBlueSale } = await updateCurrentValueEUR();
            rate = currentValueEURBlueSale;
          }
        } else {
          // Obtén el valor de la API y aplica la fórmula del exchangeRates
          if (
            selectedSendingSystem.coin === 'USD' &&
            selectedReceivingSystem.coin === 'EUR'
          ) {
            const { currentValueUSDToEUR } = await updateCurrentValueUSDToEUR();
            apiRate = currentValueUSDToEUR;
          } else if (
            selectedSendingSystem.coin === 'EUR' &&
            selectedReceivingSystem.coin === 'USD'
          ) {
            const { currentValueEURToUSD } = await updateCurrentValueUSDToEUR();
            apiRate = currentValueEURToUSD;
          } else if (selectedSendingSystem.coin === 'USD') {
            const { currentValueUSDBlueSale } = await updateCurrentValueUSD();
            apiRate = currentValueUSDBlueSale;
          } else if (selectedSendingSystem.coin === 'EUR') {
            const { currentValueEURBlueSale } = await updateCurrentValueEUR();
            apiRate = currentValueEURBlueSale;
          }

          // Aplica la fórmula para calcular la tasa de cambio
          rate = rateInfo.formula(1, apiRate); // Usa 1 como cantidad para obtener el valor de tasa
        }

        console.log('Rate Info:', rateInfo);
        console.log('API Rate:', apiRate);
        console.log('Calculated Rate:', rate);

        setExchangeRate(rate);
      }
    }
  }, [selectedSendingSystem, selectedReceivingSystem]);

  useEffect(() => {
    findExchangeRate();
  }, [findExchangeRate]);

  const calculateReceiveAmount = useCallback(
    (amount: number) => {
      if (exchangeRate) {
        return amount * exchangeRate;
      }
      return 0;
    },
    [exchangeRate],
  );

  useEffect(() => {
    setReceiveAmount(calculateReceiveAmount(sendAmount));
  }, [sendAmount, calculateReceiveAmount]);

  const handleReceiveAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    const isValidInput = /^[0-9]*\.?[0-9]*$/.test(value);
    if (isValidInput) {
      setReceiveAmount(parseFloat(value) || 0);
    }
  };

  const handleSystemSelection = (system: System, isSending: boolean) => {
    if (isSending) {
      setSelectedSendingSystem(system);
      setSelectedReceivingSystem(system.id === selectedReceivingSystem?.id ? null : selectedReceivingSystem);
    } else {
      setSelectedReceivingSystem(system);
      setSelectedSendingSystem(system.id === selectedSendingSystem?.id ? null : selectedSendingSystem);
    }
  };

  const handleInvertSystemsClick = () => {
    setSelectedSendingSystem(selectedReceivingSystem);
    setSelectedReceivingSystem(selectedSendingSystem);

    const tempAmount = sendAmount;
    setSendAmount(receiveAmount);
    setReceiveAmount(tempAmount);

    // Espera a que las actualizaciones de estado se completen
    setActiveSelect(null);
  };

  const handleDirection = () => {
    router.push('/request');
  };

  const toggleSelect = (selectType: 'send' | 'receive') => {
    const newValue = activeSelect === selectType ? null : selectType;

    setActiveSelect(newValue);
  };

  console.log('Selected Sending System:', selectedSendingSystem);
  console.log('Selected Receiving System:', selectedReceivingSystem);
  console.log('Exchange Rate:', exchangeRate);
  console.log('Send Amount:', sendAmount);
  console.log('Receive Amount:', receiveAmount);

  return (
    <div className={`not-design-system flex w-full flex-col items-center`}>
      <div className="mat-card calculator-container flex w-full flex-col items-center rounded-2xl bg-white p-8 shadow-md dark:bg-gray-800 dark:text-white">
        <p className="w-full max-w-lg text-[2rem] text-[#012c8a] dark:text-darkText">
          1 {selectedSendingSystem?.coin} / {exchangeRate.toFixed(4)}{' '}
          {selectedReceivingSystem?.coin}
        </p>

        <div className="flex w-full max-w-lg flex-row-reverse items-end text-[#012c8a] dark:text-darkText">
          <SystemSelect
            systems={systems}
            selectedSystem={selectedSendingSystem}
            onSystemSelect={(system) => handleSystemSelection(system, true)}
            label="Selecciona un sistema de envío"
            inputId="sendInputUniqueID"
            isSending={true}
            showOptions={activeSelect === 'send'}
            toggleSelect={() => toggleSelect('send')}
          />

          <div className="flex h-[7.4rem] flex-col justify-between">
            <div className="h-[1px] w-[1px] bg-[#012c8a] dark:bg-gray-200"></div>
            <div className="bg h-24 bg-[#012c8a] dark:bg-gray-200"></div>
            <div className="h-[1px] w-[1px] bg-[#012c8a] dark:bg-gray-200"></div>
          </div>

          <div className="relative flex h-32 w-full items-center rounded rounded-br-none rounded-tr-none">
            <input
              type="text"
              className="peer h-full w-full border-0 bg-transparent p-2 text-[2.8rem] focus:border-inherit focus:shadow-none focus:outline-none focus:ring-0"
              id="sendInputUniqueID"
              value={sendAmount}
              onChange={(e) => setSendAmount(parseFloat(e.target.value) || 0)}
            />
            <fieldset
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-bl-2xl rounded-tl-2xl border-y border-l border-[#012c8a] dark:border-gray-200"
            >
              <legend className="mx-4 px-1 text-sm">
                <span>Envías {selectedSendingSystem?.coin}</span>
              </legend>
            </fieldset>
          </div>
        </div>
        <div className="mt-4 flex h-full items-center justify-center">
          <InvertSystems onInvert={handleInvertSystemsClick} />
        </div>
        <SystemInfo pointBorder="border" linePosition="up">
          <p>Información del sistema de recepción</p>
        </SystemInfo>
        <div className="relative flex w-full max-w-lg flex-col items-center text-[#012c8a] dark:text-darkText">
          {/* Contenedor del input y SystemSelect */}
          <div className="flex w-full flex-row-reverse items-end">
            <SystemSelect
              systems={systems}
              selectedSystem={selectedReceivingSystem}
              onSystemSelect={(system) => handleSystemSelection(system, false)}
              label=""
              inputId="receptionInputUniqueID"
              isSending={false}
              showOptions={activeSelect === 'receive'}
              toggleSelect={() => toggleSelect('receive')}
            />

            <div className="flex h-[7.4rem] flex-col justify-between">
              <div className="h-[1px] w-[1px] bg-[#012c8a] dark:bg-gray-200"></div>
              <div className="bg h-24 bg-[#012c8a] dark:bg-gray-200"></div>
              <div className="h-[1px] w-[1px] bg-[#012c8a] dark:bg-gray-200"></div>
            </div>

            <div className="relative mt-[0.4rem] flex h-32 w-full items-center rounded rounded-bl-none rounded-tl-none">
              <input
                type="text"
                className="peer h-full w-full border-0 bg-transparent p-2 text-[2.8rem] focus:border-inherit focus:shadow-none focus:outline-none focus:ring-0"
                id="receptionInputUniqueID"
                value={receiveAmount}
                onChange={handleReceiveAmountChange}
              />

              {/* Fieldset para el borde del input */}
              <fieldset
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-bl-2xl rounded-tl-2xl border-y border-l border-[#012c8a] dark:border-gray-200"
              >
                <legend className="mx-4 px-1 text-sm">
                  <span>Recibes {selectedReceivingSystem?.coin}</span>
                </legend>
              </fieldset>
            </div>
          </div>
        </div>

        <div id="goToPayPalButton" className="mt-8">
          <button
            className="bg- buttonPay rounded-3xl bg-blue-500 p-2 px-10 py-3 text-darkText hover:bg-blue-700 focus:outline-none"
            onClick={handleDirection}
          >
            Realizar el pago
          </button>
        </div>
      </div>
    </div>
  );
}
