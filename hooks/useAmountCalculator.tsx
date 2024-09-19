import { useState, useEffect } from 'react';
import { calculateAmount } from '@/utils/currencyApis';
import { useSystemStore } from '@/store/useSystemStore';

export const useAmountCalculator = () => {
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const [sendAmount, setSendAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');

  useEffect(() => {
    const fetchReceiveAmount = async () => {
      if (
        selectedSendingSystem?.id &&
        selectedReceivingSystem?.id &&
        sendAmount !== ''
      ) {
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
      } else {
        setReceiveAmount('');
      }
    };

    fetchReceiveAmount();
  }, [sendAmount, selectedSendingSystem, selectedReceivingSystem]);

  const handleSendAmountChange = (value: string) => {
    if (/^[0-9]*[.,]?[0-9]*$/.test(value)) {
      setSendAmount(value.replace(',', '.'));
    }
  };

  const handleReceiveAmountChange = (value: string) => {
    if (/^[0-9]*[.,]?[0-9]*$/.test(value)) {
      setReceiveAmount(value.replace(',', '.'));
    }
  };

  return {
    sendAmount,
    receiveAmount,
    handleSendAmountChange,
    handleReceiveAmountChange,
  };
};
