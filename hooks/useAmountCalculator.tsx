import { useState, useEffect } from 'react';
import { calculateAmount } from '@/utils/currencyApis';
import { useSystemStore } from '@/store/useSystemStore';
import { getExchangeRateStore } from '@/store/exchangeRateStore';

export const useAmountCalculator = () => {
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const { rates } = getExchangeRateStore();
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
            localStorage.setItem('receiveAmount', '');
            localStorage.setItem('sendAmount', '');
          } else if (sendAmount !== '' && sendAmount !== '0' && isSendActive) {
            const parsedSendAmount = parseFloat(sendAmount);
            if (!isNaN(parsedSendAmount)) {
              const amount = await calculateAmount(
                selectedSendingSystem.id,
                selectedReceivingSystem.id,
                parsedSendAmount,
              );
              localStorage.setItem('sendAmount', parsedSendAmount.toString());
              setReceiveAmount(amount.toString());
              localStorage.setItem('receiveAmount', amount.toString());
            }
          } else if ((receiveAmount === '' || receiveAmount === '0') && !isSendActive) {
            setSendAmount('');
            localStorage.setItem('sendAmount', '');
          } else if (receiveAmount !== '' && receiveAmount !== '0' && !isSendActive) {
            const parsedReceiveAmount = parseFloat(receiveAmount);
            if (!isNaN(parsedReceiveAmount)) {
              const amount = await calculateAmount(
                selectedSendingSystem.id,
                selectedReceivingSystem.id,
                parsedReceiveAmount,
                true,
              );
              setSendAmount(amount.toString());
              localStorage.setItem('sendAmount', amount.toString());
            }
          }
        } catch (error) {
          console.error('Error updating amounts:', error);
        }
      }
    };

    updateAmounts();
  }, [selectedSendingSystem, selectedReceivingSystem, sendAmount, receiveAmount, isSendActive, rates]);

  // Efecto para calcular la tasa por una unidad
  useEffect(() => {
    const fetchRates = async () => {
      if (selectedSendingSystem && selectedReceivingSystem && Object.keys(rates).length > 0) {
        try {
          const rateOneUnit = await calculateAmount(selectedSendingSystem.id, selectedReceivingSystem.id, 1);
          const rateOneUnitBank = await calculateAmount(selectedSendingSystem.id, selectedReceivingSystem.id, 1, true);
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
    if (/^[0-9]*\.?[0-9]{0,2}$/.test(value) || value === '') {
      setIsSendActive(true);
      setSendAmount(value);
      setReceiveAmount('');
    }
  };

  const handleReceiveAmountChange = (value: string) => {
    if (/^[0-9]*\.?[0-9]{0,2}$/.test(value) || value === '') {
      setIsSendActive(false);
      setReceiveAmount(value);
      setSendAmount('');
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
