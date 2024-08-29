// /TransactionCalculator

'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SystemSelect from '../SystemSelect/SystemSelect';
import SystemInfo from '../SystemInfo/SystemInfo';
import InvertSystems from '../InvertSystems/InvertSystems';
import { ExchangeRate, System } from '@/types/data';
import { useSystemStore } from '@/store/useSystemStore';

declare global {
  interface Window {
    paypal: any;
  }
}

export default function TransactionCalculator() {
  const {
    selectedSendingSystem,
    selectedReceivingSystem,
    setSelectedSendingSystem,
    setSelectedReceivingSystem,
  } = useSystemStore();
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [showSendingSystemOptions, setShowSendingSystemOptions] =
    useState(false);
  const [showReceivingSystemOptions, setShowReceivingSystemOptions] =
    useState(false);
  const [sendAmount, setSendAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

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
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSendAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    const isValidInput = /^[0-9]*\.?[0-9]*$/.test(value);

    if (isValidInput) {
      setSendAmount(parseFloat(value) || 0);
    }
  };

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

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  useEffect(() => {
    async function fetchExchangeRate() {
      try {
        const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
        const data: ExchangeRate = await response.json();
        setExchangeRate(data.blue.value_buy);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    }
    fetchExchangeRate();
  }, []);

  useEffect(() => {
    setReceiveAmount(sendAmount * exchangeRate);
  }, [sendAmount, exchangeRate]);

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
      id: 'banco',
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

  const handleInvertSystemsClick = () => {
    setSelectedSendingSystem(selectedReceivingSystem);
    setSelectedReceivingSystem(selectedSendingSystem);

    const tempAmount = sendAmount;
    setSendAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

  // Lógica para redirigir a PayPal
  const goToPayPal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedSendingSystem || !selectedReceivingSystem) {
      setError('Por favor, selecciona los sistemas de envío y recepción.');
      return;
    }

    if (sendAmount <= 0) {
      setError('Por favor, ingresa un monto válido a enviar.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Crear un pedido en tu backend
      const orderResponse = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: sendAmount,
          currency: 'USD',
        }),
      });

      const order = await orderResponse.json();

      if (!order.id) {
        setError('Error al crear el pedido en PayPal.');
        setIsLoading(false);
        return;
      }

      // Asegúrate de que el SDK de PayPal esté cargado
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: function (data: any, actions: any) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: sendAmount.toString(),
                    },
                  },
                ],
              });
            },

            onApprove: async function (data: any, actions: any) {
              const captureResponse = await actions.order.capture();

              // 3. Manejar la aprobación del pago en tu backend
              const captureOrderResponse = await fetch(
                '/api/paypal/capture-order',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    orderID: data.orderID,
                  }),
                },
              );
              const captureResult = await captureOrderResponse.json();

              if (captureResult.success) {
                // Pago exitoso
                alert('¡Pago exitoso!');
                // Redirige o haz lo que necesites después del pago
              } else {
                // Error en el pago
                setError('Error al procesar el pago.');
              }
            },
            onError: function (err: any) {
              setError('Error al cargar el botón de PayPal.');
            },
          })
          .render('#goToPayPalButton');
      } else {
        console.error('PayPal SDK not loaded.');
        setError('Error al cargar el SDK de PayPal.');
      }
    } catch (error) {
      console.error('Error en la transacción:', error);
      setError('Ocurrió un error en la transacción.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`not-design-system flex w-full flex-col items-center`}>
      <div className="mat-card calculator-container flex w-full flex-col items-center rounded-2xl bg-white p-8 shadow-md dark:bg-gray-800 dark:text-white">
        {error && (
          <div className="error-message mb-4 text-red-500">{error}</div>
        )}

        <p className="w-full max-w-lg text-2xl text-[#012c8a] dark:text-darkText">
          1 {selectedSendingSystem?.coin} / 1500 {selectedReceivingSystem?.coin}
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
              value={receiveAmount}
              onChange={handleReceiveAmountChange}
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
          <button className='rounded-md borde bg- p-2 px-10 bg-[#012c8a] text-darkText dark:bg-transparent dark:border-[#012c8a] border buttonPay'>
            Realizar el pago
          </button>
        </div>
      </div>
    </div>
  );
}
