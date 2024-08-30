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
          r.to === selectedReceivingSystem.id
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
          if (selectedSendingSystem.coin === 'USD' && selectedReceivingSystem.coin === 'EUR') {
            const { currentValueUSDToEUR } = await updateCurrentValueUSDToEUR();
            apiRate = currentValueUSDToEUR;
          } else if (selectedSendingSystem.coin === 'EUR' && selectedReceivingSystem.coin === 'USD') {
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

  const calculateReceiveAmount = useCallback((amount: number) => {
    if (exchangeRate) {
      return amount * exchangeRate;
    }
    return 0;
  }, [exchangeRate]);  

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
    } else {
      setSelectedReceivingSystem(system);
    }
  };

  const handleInvertSystemsClick = () => {
    setSelectedSendingSystem(selectedReceivingSystem);
    setSelectedReceivingSystem(selectedSendingSystem);

    const tempAmount = sendAmount;
    setSendAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

  const handleDirection = () => {
    router.push('/request');
  };

  console.log('Selected Sending System:', selectedSendingSystem);
  console.log('Selected Receiving System:', selectedReceivingSystem);
  console.log('Exchange Rate:', exchangeRate);
  console.log('Send Amount:', sendAmount);
  console.log('Receive Amount:', receiveAmount);

  return (
    <div className={`not-design-system flex w-full flex-col items-center`}>
      <div className="mat-card calculator-container flex w-full flex-col items-center rounded-2xl bg-white p-8 shadow-md dark:bg-gray-800 dark:text-white">
        <p className="w-full max-w-lg text-2xl text-[#012c8a] dark:text-darkText">
          1 {selectedSendingSystem?.coin} / {exchangeRate.toFixed(4)} {selectedReceivingSystem?.coin}
        </p>

        <div className="flex w-full max-w-lg items-center text-[#012c8a] dark:text-darkText">
          <SystemSelect
            systems={systems}
            selectedSystem={selectedSendingSystem}
            onSystemSelect={(system) => handleSystemSelection(system, true)}
            label=""
            inputId="sendInputUniqueID"
            isSending={true}
          />
          <div className="mt-11 flex h-28 w-full items-center justify-between rounded rounded-bl-none rounded-tl-none border border-l-0 border-[#012c8a] p-2 dark:border-gray-200">
            <input
              type="text"
              className="h-full w-full border-transparent bg-transparent p-2 text-xl focus:border-transparent focus:ring-transparent"
              id="sendInputUniqueID"
              value={sendAmount}
              onChange={(e) => setSendAmount(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
        <div className="mt-4 flex h-full items-center justify-center">
          <InvertSystems onInvert={handleInvertSystemsClick} />
        </div>
        <SystemInfo pointBorder="border" linePosition="up">
          <p>Información del sistema de recepción</p>
        </SystemInfo>
        <div className="flex w-full max-w-lg items-center text-[#012c8a] dark:text-darkText">
          <SystemSelect
            systems={systems}
            selectedSystem={selectedReceivingSystem}
            onSystemSelect={(system) => handleSystemSelection(system, false)}
            label=""
            inputId="receptionInputUniqueID"
            isSending={false}
          />
          <div className="mt-11 flex h-28 w-full items-center justify-between rounded rounded-bl-none rounded-tl-none border border-l-0 border-[#012c8a] p-2 dark:border-gray-200">
            <input
              type="text"
              className="h-full w-full border-transparent bg-transparent p-2 text-xl focus:border-transparent focus:ring-transparent"
              id="receptionInputUniqueID"
              value={receiveAmount}
              onChange={handleReceiveAmountChange}
            />
          </div>
        </div>
        <div id="goToPayPalButton" className="mt-4">
          <button
            className="bg- buttonPay rounded-md bg-blue-500 p-2 px-10 text-darkText hover:bg-blue-700 focus:outline-none"
            onClick={handleDirection}
          >
            Realizar el pago
          </button>
        </div>
      </div>
    </div>
  );
}