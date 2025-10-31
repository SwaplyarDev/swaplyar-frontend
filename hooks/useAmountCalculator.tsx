import { useState, useEffect, useRef } from 'react';
import { useSystemStore } from '@/store/useSystemStore';
import { postTotal } from '@/components/Transaction/services/conversionsApi';
import {
  mapSystemsToTotalPayload,
  systemToBackend,
  type SystemBackendId,
} from '@/components/Transaction/services/systemBackendMapper';
import { useRealtimeRates } from '@/hooks/useRealtimeRates'; //hook con websocket

const isSystemBackendId = (id: string): id is SystemBackendId => id in systemToBackend;

export const useAmountCalculator = () => {
  const { selectedSendingSystem, selectedReceivingSystem } = useSystemStore();
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [isSendActive, setIsSendActive] = useState(true);
  const [rateForOne, setRateForOne] = useState(0);

  // hook para recibir tasas en tiempo real
  const { rateUpdate, conversionResult, sendCalculation, waitForConnection } = useRealtimeRates();
  //refs para comprar los rates y las comissions anteriores
  const lastRateRef = useRef<number | null>(null);
  const lastCommissionRef = useRef<number | null>(null);
  useEffect(() => {
    if (rateUpdate) {
      console.log('📡 Actualización recibida desde el WS:', rateUpdate);
    }
  }, [rateUpdate]);

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
    if (isRateOnly) return res; // 👈 evita modificar montos del usuario
    // recibo → envío
    if (inverse) setSendAmount(res.totalReceived.toFixed(2));
    else setReceiveAmount(res.totalReceived.toFixed(2)); // envío → recibo

    return res;
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
  // 📡 Cuando llega un resultado del backend por WebSocket
  useEffect(() => {
    if (conversionResult) {
      const { totalReceived, amount } = conversionResult;

      // rateForOne = monto final / cantidad
      let newRate = totalReceived / amount;

      // 💡 Si la conversión fue ARS→otra, pero se invirtió el cálculo,
      // mostramos el inverso semántico: “X ARS = 1 USD”
      if (selectedSendingSystem?.coin === 'ARS') {
        newRate = totalReceived; // equivale a cuántos ARS por 1 USD
      }

      setRateForOne(newRate);

      console.log(`💹 rateForOne actualizado desde WS: ${newRate}`);
    }
  }, [conversionResult, selectedSendingSystem?.coin]);


  // obtiene rateForOne inicial al montar o cambiar sistemas
  useEffect(() => {
    const fetchInitialRate = async () => {
      if (
        !selectedSendingSystem ||
        !selectedReceivingSystem ||
        !isSystemBackendId(selectedSendingSystem.id) ||
        !isSystemBackendId(selectedReceivingSystem.id)
      ) return;

      let fromSystem = selectedSendingSystem.id;
      let toSystem = selectedReceivingSystem.id;

      // 💡 Si enviamos desde ARS, invertimos la consulta
      const isFromARS = selectedSendingSystem.coin === 'ARS';
      if (isFromARS) {
        fromSystem = selectedReceivingSystem.id;
        toSystem = selectedSendingSystem.id;
      }

      const payload = mapSystemsToTotalPayload(fromSystem, toSystem, 1);

      console.log('⚙️ Preparando solicitud de rateForOne vía WebSocket...', payload);
      await waitForConnection(); // 👈 Espera conexión real
      console.log('✅ WS conectado, enviando cálculo rateForOne...');
      sendCalculation(payload);
    };

    fetchInitialRate();
  }, [selectedSendingSystem?.id, selectedReceivingSystem?.id]);


  useEffect(() => {
    if (
      !selectedSendingSystem ||
      !selectedReceivingSystem ||
      !isSystemBackendId(selectedSendingSystem.id) ||
      !isSystemBackendId(selectedReceivingSystem.id)
    ) return;

    const newRate = rateUpdate?.rate ?? null;

    // Simulamos un objeto "commission-update" que también llega por WS
    const newCommissionRate = (conversionResult?.commission?.commissionRate ?? null);

    // Si no hay datos, no hacemos nada
    if (newRate === null && newCommissionRate === null) return;

    const rateChanged = newRate !== null && newRate !== lastRateRef.current;
    const commissionChanged =
      newCommissionRate !== null && newCommissionRate !== lastCommissionRef.current;

    if (rateChanged || commissionChanged) {
      console.log('🔁 Cambios detectados en rate/commission. Recalculando rateForOne...');
      lastRateRef.current = newRate ?? lastRateRef.current;
      lastCommissionRef.current = newCommissionRate ?? lastCommissionRef.current;

      const payload = mapSystemsToTotalPayload(
        selectedSendingSystem.id,
        selectedReceivingSystem.id,
        1
      );

      sendCalculation(payload); // recalcula solo si cambió algo
    } else {
      console.log('✅ No hay cambios en rate ni commission, no se recalcula.');
    }
  }, [rateUpdate, conversionResult]);



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
