import { useState, useEffect } from 'react';
import { calculateAmount, calculateInverseAmount } from '@/utils/currencyApis';
import { useSystemStore } from '@/store/useSystemStore';
import { useExchangeRateStore } from '@/store/exchangeRateStore';

export const useAmountCalculator = () => {
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const { rates } = useExchangeRateStore(); // Asegúrate de obtener las tasas de la tienda
  const [sendAmount, setSendAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [isSendActive, setIsSendActive] = useState<boolean>(true);
  const [rateForOne, setRateForOne] = useState<number>(0);
  const [rateForOneBank, setRateForOneBank] = useState<number>(0);

  // Efecto para actualizar montos al cambiar el sistema de envío o recepción
  useEffect(() => {
    const updateAmounts = async () => {
      if (selectedSendingSystem && selectedReceivingSystem && Object.keys(rates).length > 0) {
        try {
          if ((sendAmount === '' || sendAmount === '0') && isSendActive) {
            setReceiveAmount('');
          } else if (sendAmount !== '' && sendAmount !== '0' && isSendActive) {
            const parsedSendAmount = parseFloat(sendAmount);
            if (!isNaN(parsedSendAmount)) {
              const amount = await calculateAmount(
                selectedSendingSystem.id,
                selectedReceivingSystem.id,
                parsedSendAmount,
              );
              setReceiveAmount(amount.toString());
            }
          } else if (
            (receiveAmount === '' || receiveAmount === '0') &&
            !isSendActive
          ) {
            setSendAmount('');
          } else if (
            receiveAmount !== '' &&
            receiveAmount !== '0' &&
            !isSendActive
          ) {
            const parsedReceiveAmount = parseFloat(receiveAmount);
            if (!isNaN(parsedReceiveAmount)) {
              const amount = await calculateInverseAmount(
                selectedSendingSystem.id,
                selectedReceivingSystem.id,
                parsedReceiveAmount,
              );
              setSendAmount(amount.toString());
            }
          }
        } catch (error) {
          console.error('Error updating amounts:', error);
        }
      }
    };

    updateAmounts();
  }, [
    selectedSendingSystem,
    selectedReceivingSystem,
    sendAmount,
    receiveAmount,
    isSendActive,
    rates,
  ]);

  // Efecto para calcular la tasa por una unidad
  useEffect(() => {
    const fetchRates = async () => {
      if (selectedSendingSystem && selectedReceivingSystem && Object.keys(rates).length > 0) {
        try {
          const rateOneUnit = await calculateAmount(
            selectedSendingSystem.id,
            selectedReceivingSystem.id,
            1,
          );
          const rateOneUnitBank = await calculateInverseAmount(
            selectedSendingSystem.id,
            selectedReceivingSystem.id,
            1,
          );
          setRateForOne(rateOneUnit || 0);
          setRateForOneBank(rateOneUnitBank || 0);
        } catch (error) {
          console.error('Error fetching rates:', error);
        }
      }
    };

    fetchRates();
  }, [selectedSendingSystem, selectedReceivingSystem, rates]);

  // Funciones para manejar cambios en los montos
  const handleSendAmountChange = (value: string) => {
    if (/^[0-9]*[.,]?[0-9]{0,2}$/.test(value)) {
      setIsSendActive(true);
      const formattedValue = value.replace(',', '.');
      setSendAmount(
        formattedValue === '' || formattedValue === '0' ? '' : formattedValue,
      );
      setReceiveAmount(''); // Resetear el monto de recepción
    }
  };

  const handleReceiveAmountChange = (value: string) => {
    if (/^[0-9]*[.,]?[0-9]{0,2}$/.test(value)) {
      setIsSendActive(false);
      const formattedValue = value.replace(',', '.');
      setReceiveAmount(
        formattedValue === '' || formattedValue === '0' ? '' : formattedValue,
      );
      setSendAmount(''); // Resetear el monto de envío
    }
  };

  return {
    sendAmount,
    receiveAmount,
    handleSendAmountChange,
    handleReceiveAmountChange,
    rateForOne,
    rateForOneBank,
  };
};
