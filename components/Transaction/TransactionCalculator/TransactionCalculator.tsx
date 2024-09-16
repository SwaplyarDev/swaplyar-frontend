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
  calculateAmount,
  updateCurrentValueEUR,
  updateCurrentValueUSD,
  updateCurrentValueUSDToEUR,
} from '@/utils/currencyApis';

import Paypal from '../PayPal/Paypal';
import { paypalPaymentStore } from '@/store/paypalPaymetStore';
// declare global {
//   interface Window {
//     paypal: any;
//   }
// }

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
  const [sendAmount, setSendAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');

  const { paypal, setPaypal } = paypalPaymentStore();
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [rateForOne, setRateForOne] = useState<number>(0);
  // const [darkMode, setDarkMode] = useState<boolean>(false);
  const [exchange, setExchange] = useState({ currency: 'USD', amount: 0 });

  // Datos de sistemas de pago
  const systems: System[] = [
    {
      id: 'paypal',
      name: 'PayPal',
      logo: '/images/paypal.big.png',
      logoDark: '/images/paypal.dark.png',
      isDisabled: false,
      coin: 'USD',
    },
    {
      id: 'payoneer_usd',
      name: 'Payoneer USD',
      logo: '/images/payoneer.usd.big.png',
      logoDark: '/images/payoneer.usd.dark.png',
      isDisabled: false,
      coin: 'USD',
    },
    {
      id: 'payoneer_eur',
      name: 'Payoneer EUR',
      logo: '/images/payoneer.eur.big.png',
      logoDark: '/images/payoneer.eur.dark.png',
      isDisabled: false,
      coin: 'EUR',
    },
    {
      id: 'bank',
      name: 'Banco',
      logo: '/images/banco.medium.webp',
      logoDark: '/images/banco.dark.png',
      isDisabled: false,
      coin: 'ARS',
    },
    {
      id: 'wise_usd',
      name: 'Wise USD',
      logo: '/images/wise.usd.big.png',
      logoDark: '/images/wise.usd.dark.png',
      isDisabled: false,
      coin: 'USD',
    },
    {
      id: 'wise_eur',
      name: 'Wise EUR',
      logo: '/images/wise.eur.big.png',
      logoDark: '/images/wise.eur.dark.png',
      isDisabled: false,
      coin: 'EUR',
    },
  ];

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   setDarkMode(mediaQuery.matches);
  //   const handleChange = (e: MediaQueryListEvent) => {
  //     setDarkMode(e.matches);
  //   };
  //   mediaQuery.addEventListener('change', handleChange);
  //   return () => mediaQuery.removeEventListener('change', handleChange);
  // }, []);

  // useEffect(() => {
  //   document.documentElement.classList.toggle('dark', darkMode);
  // }, [darkMode]);

  const findExchangeRate = useCallback(async () => {
    if (selectedSendingSystem && selectedReceivingSystem) {
      let rate = 0;

      const rateInfo = exchangeRates.find(
        (r) =>
          r.from === selectedSendingSystem.id &&
          r.to === selectedReceivingSystem.id,
      );

      if (rateInfo) {
        let apiRate = 0;
        // Validación de monedas
        if (selectedSendingSystem.coin === selectedReceivingSystem.coin) {
          if (selectedSendingSystem.coin === 'USD') {
            const { currentValueUSDBlueSale } = await updateCurrentValueUSD();
            rate = currentValueUSDBlueSale || 0; // Validar si el valor es undefined o null
          } else if (selectedSendingSystem.coin === 'EUR') {
            const { currentValueEURBlueSale } = await updateCurrentValueEUR();
            rate = currentValueEURBlueSale || 0;
          }
        } else {
          if (
            selectedSendingSystem.coin === 'USD' &&
            selectedReceivingSystem.coin === 'EUR'
          ) {
            const { currentValueUSDToEUR } = await updateCurrentValueUSDToEUR();
            apiRate = currentValueUSDToEUR || 0;
          } else if (
            selectedSendingSystem.coin === 'EUR' &&
            selectedReceivingSystem.coin === 'USD'
          ) {
            const { currentValueEURToUSD } = await updateCurrentValueUSDToEUR();
            apiRate = currentValueEURToUSD || 0;
          } else if (selectedSendingSystem.coin === 'USD') {
            const { currentValueUSDBlueSale } = await updateCurrentValueUSD();
            apiRate = currentValueUSDBlueSale || 0;
          } else if (selectedSendingSystem.coin === 'EUR') {
            const { currentValueEURBlueSale } = await updateCurrentValueEUR();
            apiRate = currentValueEURBlueSale || 0;
          }

          rate = rateInfo.formula(1, apiRate);
        }

        setExchangeRate(rate);

        const rateOneUnit = await calculateAmount(
          selectedSendingSystem.id,
          selectedReceivingSystem.id,
          1,
        );
        setRateForOne(rateOneUnit || 0); // Validación por defecto si el valor no es válido
      }
    }
  }, [selectedSendingSystem, selectedReceivingSystem]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      await findExchangeRate();
    };

    fetchExchangeRate();
  }, [findExchangeRate]);

  useEffect(() => {
    const fetchReceiveAmount = async () => {
      if (selectedSendingSystem?.id && selectedReceivingSystem?.id) {
        // Si sendAmount está vacío, establecer receiveAmount como vacío
        if (sendAmount === '') {
          setReceiveAmount('');
          return;
        }

        try {
          const parsedSendAmount = parseFloat(sendAmount);
          if (isNaN(parsedSendAmount)) {
            setReceiveAmount('0');
            return;
          }
          const amount = await calculateAmount(
            selectedSendingSystem.id,
            selectedReceivingSystem.id,
            parsedSendAmount,
          );
          setReceiveAmount(amount.toString());
        } catch (error) {
          console.error('Error calculating amount:', error);
        }
      }
    };

    fetchReceiveAmount();
  }, [sendAmount, selectedSendingSystem, selectedReceivingSystem]);

  const handleReceiveAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = event.target.value;

    // Validar que solo contenga números, una coma o un punto para los decimales
    const isValidInput = /^[0-9]*[.,]?[0-9]*$/.test(value);

    if (isValidInput) {
      // Reemplazar la coma por un punto para poder usar parseFloat
      value = value.replace(',', '.');
      setReceiveAmount(value);
    }
  };

  const handleSendAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // Validar que solo contenga números, una coma o un punto para los decimales
    const isValidInput = /^[0-9]*[.,]?[0-9]*$/.test(value);

    if (isValidInput) {
      // Reemplazar la coma por un punto para mantener consistencia
      value = value.replace(',', '.');

      // Actualizar el estado como string, sin convertirlo a número aún
      setSendAmount(value);
    }
  };

  const handleSystemSelection = (system: System, isSending: boolean) => {
    if (isSending) {
      setSelectedSendingSystem(system);
      setSelectedReceivingSystem(
        system.id === selectedReceivingSystem?.id
          ? null
          : selectedReceivingSystem,
      );
    } else {
      setSelectedReceivingSystem(system);
      setSelectedSendingSystem(
        system.id === selectedSendingSystem?.id ? null : selectedSendingSystem,
      );
    }
  };

  const handleInvertSystemsClick = () => {
    setSelectedSendingSystem(selectedReceivingSystem);
    setSelectedReceivingSystem(selectedSendingSystem);

    // Guardar el valor actual de sendAmount y receiveAmount
    const tempSendAmount = sendAmount; // String
    const tempReceiveAmount = receiveAmount; // Number

    // Convertir receiveAmount a cadena para setSendAmount
    setSendAmount(tempReceiveAmount);

    // Convertir sendAmount a número para setReceiveAmount
    setReceiveAmount(tempSendAmount);

    setActiveSelect(null);
  };

  const handleDirection = () => {
    router.push('/request');
  };

  const toggleSelect = (selectType: 'send' | 'receive') => {
    const newValue = activeSelect === selectType ? null : selectType;

    setActiveSelect(newValue);
  };

  const handleExchange = () => {
    setExchange({
      currency: selectedSendingSystem?.coin as string,
      amount: parseInt(sendAmount),
    });
    setPaypal();
  };

  return (
    <div className={`not-design-system flex w-full flex-col items-center`}>
      <div className="mat-card calculator-container flex w-full flex-col items-center rounded-2xl bg-white p-8 shadow-md dark:bg-gray-800 dark:text-white">
        <p className="w-full max-w-lg text-[2rem] text-[#012c8a] dark:text-darkText">
          1 {selectedSendingSystem?.coin} = {rateForOne.toFixed(2)}{' '}
          {selectedReceivingSystem?.coin}
        </p>

        <div className="flex w-full max-w-lg flex-col-reverse items-end text-[#012c8a] dark:text-darkText sm:flex-row-reverse">
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

          <div className="hidden h-[7.4rem] flex-col justify-between sm:flex">
            <div className="h-[1px] w-[1px] bg-[#012c8a] dark:bg-gray-200"></div>
            <div className="bg h-24 bg-[#012c8a] dark:bg-gray-200"></div>
            <div className="h-[1px] w-[1px] bg-[#012c8a] dark:bg-gray-200"></div>
          </div>

          <div className="relative flex h-32 w-full items-center">
            <input
              type="text"
              className="peer h-full w-full border-0 bg-transparent px-12 py-2 text-end text-[2.8rem] focus:border-inherit focus:shadow-none focus:outline-none focus:ring-0 sm:text-center"
              id="sendInputUniqueID"
              placeholder="0"
              value={sendAmount}
              onChange={handleSendAmount}
            />
            <fieldset
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-b-none rounded-tl-2xl rounded-tr-2xl border-y border-l border-r border-[#012c8a] dark:border-gray-200 sm:rounded-bl-2xl sm:rounded-br-none sm:rounded-tr-none sm:border-r-0"
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
          <div className="flex w-full max-w-lg flex-col-reverse items-end sm:flex-row-reverse">
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

            <div className="hidden h-[7.4rem] flex-col justify-between sm:flex">
              <div className="h-[1px] w-[1px] bg-[#012c8a] dark:bg-gray-200"></div>
              <div className="bg h-24 bg-[#012c8a] dark:bg-gray-200"></div>
              <div className="h-[1px] w-[1px] bg-[#012c8a] dark:bg-gray-200"></div>
            </div>

            <div className="relative mt-[0.4rem] flex h-32 w-full items-center">
              <input
                type="text"
                className="peer h-full w-full border-0 bg-transparent px-12 py-2 text-end text-[2.8rem] focus:border-inherit focus:shadow-none focus:outline-none focus:ring-0 sm:text-center"
                id="receptionInputUniqueID"
                placeholder="0"
                value={receiveAmount}
                onChange={handleReceiveAmountChange}
              />

              <fieldset
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-b-none rounded-tl-2xl rounded-tr-2xl border-y border-l border-r border-[#012c8a] dark:border-gray-200 sm:rounded-bl-2xl sm:rounded-br-none sm:rounded-tr-none sm:border-r-0"
              >
                <legend className="mx-4 px-1 text-sm">
                  <span>Recibes {selectedReceivingSystem?.coin}</span>
                </legend>
              </fieldset>
            </div>
          </div>

          <div className="mt-8">
            {paypal ? (
              <Paypal
                currency={exchange.currency}
                amount={exchange.amount}
                handleDirection={handleDirection}
              />
            ) : (
              <button
                className="bg-buttonPay rounded-3xl bg-blue-500 px-10 py-3 text-darkText hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
                onClick={handleExchange}
                disabled={parseInt(sendAmount) < 1}
              >
                Procesar pago
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
