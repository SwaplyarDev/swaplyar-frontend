// hooks/useAmountCalculator.tsx
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
        if ((sendAmount === '' || sendAmount === '0') && isSendActive) {
          // Reiniciar receiveAmount cuando sendAmount es 0 o vacío
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
        } else if ((receiveAmount === '' || receiveAmount === '0') && !isSendActive) {
          // Reiniciar sendAmount cuando receiveAmount es 0 o vacío
          setSendAmount('');
        } else if (receiveAmount !== '' && receiveAmount !== '0' && !isSendActive) {
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
      if (selectedSendingSystem && selectedReceivingSystem && sendAmount !== '' && sendAmount !== '0' && isSendActive) {
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
      if (selectedSendingSystem && selectedReceivingSystem && receiveAmount !== '' && receiveAmount !== '0' && !isSendActive) {
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

  // Función para manejar el cambio en el monto de envío
  const handleSendAmountChange = (value: string) => {
    if (/^[0-9]*[.,]?[0-9]{0,2}$/.test(value)) {
      setIsSendActive(true);
      const formattedValue = value.replace(',', '.');
      if (formattedValue === '' || formattedValue === '0') {
        setSendAmount('');
        setReceiveAmount('');
      } else {
        setSendAmount(formattedValue);
      }
    }
  };

  // Función para manejar el cambio en el monto de recepción
  const handleReceiveAmountChange = (value: string) => {
    if (/^[0-9]*[.,]?[0-9]{0,2}$/.test(value)) {
      setIsSendActive(false);
      const formattedValue = value.replace(',', '.');
      if (formattedValue === '' || formattedValue === '0') {
        setReceiveAmount('');
        setSendAmount('');
      } else {
        setReceiveAmount(formattedValue);
      }
    }
  };

  return {
    sendAmount,
    receiveAmount,
    handleSendAmountChange,
    handleReceiveAmountChange,
  };
};
