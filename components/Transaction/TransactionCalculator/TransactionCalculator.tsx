'use client';
import { useState, useEffect, useCallback } from 'react';
import SystemInfo from '../SystemInfo/SystemInfo';
import InvertSystems from '../InvertSystems/InvertSystems';
import { useSystemStore } from '@/store/useSystemStore';
import { useRouter } from 'next/navigation';
import Paypal from '../PayPal/Paypal';
import Swal from 'sweetalert2';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { createRoot } from 'react-dom/client';
import { systems } from '@/utils/dataCoins';
import { useExchangeRate } from '@/hooks/useExchangeRates';
import { useAmountCalculator } from '@/hooks/useAmountCalculator';
import { useSystemSelection } from '@/hooks/useSystemSelection';
import TransactionSection from '@/components/ui/TransactionSection/TransactionSection';

export default function TransactionCalculator() {
  const router = useRouter();
  const { activeSelect } = useSystemStore();
  const { isDark } = useDarkTheme();
  const [exchange, setExchange] = useState({ currency: 'USD', amount: 0 });
  const { handleSystemSelection, handleInvertSystemsClick, toggleSelect } =
    useSystemSelection();
  const {
    sendAmount,
    receiveAmount,
    handleSendAmountChange,
    handleReceiveAmountChange,
  } = useAmountCalculator();
  const { rateForOne } = useExchangeRate();
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();

  useEffect(() => {
    setExchange({
      currency: selectedSendingSystem?.coin as string,
      amount: parseInt(sendAmount),
    });
  }, [sendAmount, selectedSendingSystem]);

  const handleDirection = () => {
    router.push('/request');
  };

  const handleExchangePaypal = () => {
    Swal.fire({
      title: 'Procesar pago con PayPal',
      html: `
        <p>¿Estás seguro de que deseas procesar el pago de ${exchange.amount} ${exchange.currency} con PayPal?</p>
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px; gap: 40px">
          <div id="paypal-button-container" style="width: 150px;"></div>
          <div style="height: 49px;">   
          <button id="cancel-button" style="
            border-radius: 23px;
            height: 45px;
            min-width: 150px;
            background-color: #f44336; 
            color: white; 
            border: none; 
            padding: 10px 20px; 
            cursor: pointer;
          ">Cancelar</button></div>
        </div>
      `,
      icon: 'warning',
      showConfirmButton: false, // Desactivar el botón de confirmación predeterminado
      showCancelButton: false, // Desactivar el botón de cancelar predeterminado
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      didRender: () => {
        // Renderizar el componente Paypal en el contenedor después de que se haya mostrado el SweetAlert
        const paypalElement = document.getElementById(
          'paypal-button-container',
        );
        if (paypalElement) {
          const root = createRoot(paypalElement); // Crear un root para el renderizado
          root.render(
            <Paypal
              currency={exchange.currency}
              amount={exchange.amount}
              handleDirection={handleDirection}
            />,
          );
        }
      },
      didOpen: () => {
        // Añadir evento al botón de cancelar
        const cancelButton = document.getElementById('cancel-button');
        if (cancelButton) {
          cancelButton.addEventListener('click', () => {
            Swal.close(); // Cerrar el alert al hacer clic en cancelar
          });
        }
      },
    });
  };

  return (
    <div className={`not-design-system flex w-full flex-col items-center`}>
      <div className="mat-card calculator-container flex w-full flex-col items-center rounded-2xl bg-[#e6e8ef62] p-8 shadow-md dark:bg-gray-800 dark:text-white">
        <p className="w-full max-w-lg text-2xl text-blue-800 dark:text-darkText xs:text-[2rem]">
          1 {selectedSendingSystem?.coin} = {rateForOne.toFixed(2)}{' '}
          {selectedReceivingSystem?.coin}
        </p>

        <TransactionSection
          systems={systems}
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
          <InvertSystems onInvert={handleInvertSystemsClick} />
        </div>
        <SystemInfo pointBorder="border" linePosition="up">
          <p className="text-xs xs:text-base">
            Información del sistema de recepción
          </p>
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
              className="bg-buttonPay rounded-3xl bg-blue-800 px-10 py-3 text-darkText transition-all duration-300 ease-in-out hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
              onClick={
                (parseInt(sendAmount) >= 1 || sendAmount != '') &&
                selectedSendingSystem?.name == 'PayPal'
                  ? handleExchangePaypal
                  : handleDirection
              }
              disabled={parseInt(sendAmount) < 1 || sendAmount === ''}
            >
              Procesar pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
