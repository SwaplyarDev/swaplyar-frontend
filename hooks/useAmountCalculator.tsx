import { useState, useEffect } from 'react';
import { calculateAmount, calculateInverseAmount } from '@/utils/currencyApis';
import { useSystemStore } from '@/store/useSystemStore';

export const useAmountCalculator = () => {
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const [sendAmount, setSendAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [isSendActive, setIsSendActive] = useState<boolean>(true);

  // Efecto para actualizar montos al cambiar el sistema de envío o recepción
  useEffect(() => {
    const updateAmounts = async () => {
      if (selectedSendingSystem && selectedReceivingSystem) {
        if (sendAmount !== '' && isSendActive) {
          const parsedSendAmount = parseFloat(sendAmount);
          if (!isNaN(parsedSendAmount)) {
            const amount = await calculateAmount(
              selectedSendingSystem.id,
              selectedReceivingSystem.id,
              parsedSendAmount,
            );
            setReceiveAmount(amount.toString());
          }
        } else if (receiveAmount !== '' && !isSendActive) {
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
      }
    };

    updateAmounts();
  }, [selectedSendingSystem, selectedReceivingSystem, sendAmount, receiveAmount, isSendActive]);

  // Efecto para calcular el monto recibido
  useEffect(() => {
    const fetchReceiveAmount = async () => {
      if (selectedSendingSystem && selectedReceivingSystem && sendAmount !== '' && isSendActive) {
        try {
          const parsedSendAmount = parseFloat(sendAmount);
          if (!isNaN(parsedSendAmount)) {
            const amount = await calculateAmount(
              selectedSendingSystem.id,
              selectedReceivingSystem.id,
              parsedSendAmount,
            );
            setReceiveAmount(amount.toString());
          }
        } catch (error) {
          console.error('Error calculating amount:', error);
        }
      }
    };

    fetchReceiveAmount();
  }, [sendAmount, selectedSendingSystem, selectedReceivingSystem, isSendActive]);

  // Efecto para calcular el monto enviado
  useEffect(() => {
    const fetchSendAmount = async () => {
      if (selectedSendingSystem && selectedReceivingSystem && receiveAmount !== '' && !isSendActive) {
        try {
          const parsedReceiveAmount = parseFloat(receiveAmount);
          if (!isNaN(parsedReceiveAmount)) {
            const amount = await calculateInverseAmount(
              selectedSendingSystem.id,
              selectedReceivingSystem.id,
              parsedReceiveAmount,
            );
            setSendAmount(amount.toString());
          }
        } catch (error) {
          console.error('Error calculating amount:', error);
        }
      }
    };

    fetchSendAmount();
  }, [receiveAmount, selectedSendingSystem, selectedReceivingSystem, isSendActive]);

  const handleSendAmountChange = (value: string) => {
    if (/^[0-9]*[.,]?[0-9]{0,2}$/.test(value)) {
      setIsSendActive(true);
      const formattedValue = value.replace(',', '.');
      setSendAmount(formattedValue);
    }
  };

  const handleReceiveAmountChange = (value: string) => {
    if (/^[0-9]*[.,]?[0-9]{0,2}$/.test(value)) {
      setIsSendActive(false);
      const formattedValue = value.replace(',', '.');
      setReceiveAmount(formattedValue);
    }
  };

  return {
    sendAmount,
    receiveAmount,
    handleSendAmountChange,
    handleReceiveAmountChange,
  };
};
