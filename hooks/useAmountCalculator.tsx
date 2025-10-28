import { useState, useEffect } from 'react';
import { useSystemStore } from '@/store/useSystemStore';
import { postTotal } from '@/components/Transaction/services/conversionsApi';
import {
  mapSystemsToTotalPayload,
  systemToBackend,
  type SystemBackendId,
} from '@/components/Transaction/services/systemBackendMapper';

const isSystemBackendId = (id: string): id is SystemBackendId => id in systemToBackend;

export const useAmountCalculator = () => {
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [isSendActive, setIsSendActive] = useState(true);
  const [rateForOne, setRateForOne] = useState(0);

  // 🔄 Calcula usando backend
  const calculate = async (amount: number, inverse = false, isRateOnly = false) => {
    if (!selectedSendingSystem || !selectedReceivingSystem || isNaN(amount)) return;
    if (!isSystemBackendId(selectedSendingSystem.id) || !isSystemBackendId(selectedReceivingSystem.id)) return;

    const payload = inverse
      ? mapSystemsToTotalPayload(selectedReceivingSystem.id, selectedSendingSystem.id, amount)
      : mapSystemsToTotalPayload(selectedSendingSystem.id, selectedReceivingSystem.id, amount);

    const res = await postTotal(payload);
    console.log('Respuesta total:', res);

    // guardamos el valor por 1 unidad con comisión aplicada
    setRateForOne(res.totalReceived / res.amount); // 👈 totalReceived ya incluye comisión
    if (isRateOnly) return; // 👈 evita modificar montos del usuario

    if (inverse) {
      // recibo → envío
      setSendAmount(res.totalReceived.toFixed(2));
    } else {
      // envío → recibo
      setReceiveAmount(res.totalReceived.toFixed(2));
    }
  };
  
// 🕒 debounce para sendAmount
  useEffect(() => {
    if (!isSendActive) return;
    if (!selectedSendingSystem || !selectedReceivingSystem) return;
    if (!sendAmount || parseFloat(sendAmount) <= 0) {
      setReceiveAmount('0');
      return;
    }

    const timeout = setTimeout(() => {
      calculate(parseFloat(sendAmount));
    }, 300); // 👈 espera 300 ms tras dejar de escribir

    return () => clearTimeout(timeout);
  }, [sendAmount, selectedSendingSystem, selectedReceivingSystem]);

  // 🕒 debounce para receiveAmount
  useEffect(() => {
    if (isSendActive) return;
    if (!selectedSendingSystem || !selectedReceivingSystem) return;
    if (!receiveAmount || parseFloat(receiveAmount) <= 0) {
      setSendAmount('');
      return;
    }

    const timeout = setTimeout(() => {
      calculate(parseFloat(receiveAmount), true);
    }, 300); // 👈 igual retardo

    return () => clearTimeout(timeout);
  }, [receiveAmount, selectedSendingSystem, selectedReceivingSystem]);

  // obtiene rateForOne inicial al montar o cambiar sistemas
  useEffect(() => {
    const fetchRateForOne = async () => {
      if (selectedSendingSystem && selectedReceivingSystem) {
        try {
          await calculate(1, false, true);
        } catch (err) {
          console.error('Error obteniendo rateForOne inicial:', err);
        }
      }
    };
    fetchRateForOne();
  }, [selectedSendingSystem, selectedReceivingSystem]);

  const handleSendAmountChange = (v: string) => {
    if (!/^[0-9]*\.?[0-9]{0,2}$/.test(v)) return;
    setIsSendActive(true);
    setSendAmount(v);
  };

  const handleReceiveAmountChange = (v: string) => {
    if (!/^[0-9]*\.?[0-9]{0,2}$/.test(v)) return;
    setIsSendActive(false);
    setReceiveAmount(v);
  };

  return { sendAmount, receiveAmount, handleSendAmountChange, handleReceiveAmountChange, rateForOne };
};
