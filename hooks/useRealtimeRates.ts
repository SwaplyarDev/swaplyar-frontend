// hooks/useRealtimeRates.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface RateUpdate {
  from: string;
  to: string;
  rate: number;
}

interface ConversionRequest {
  from: string;
  to: string;
  amount: number;
  fromPlatform: string;
  toPlatform: string;
}

export const useRealtimeRates = () => {
  const [rateUpdate, setRateUpdate] = useState<RateUpdate | null>(null);
  const [conversionResult, setConversionResult] = useState<any>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Solo conectar si estamos en desarrollo y hay servidor backend
    if (process.env.NEXT_PUBLIC_ENABLE_WEBSOCKET === 'true') {
      const socket = io(process.env.NEXT_PUBLIC_WS_URL ?? 'http://localhost:3001', {
        transports: ['websocket'],
      });

      socketRef.current = socket;
    //conexión y eventos
    socket.on('connect', () => {
      console.log('🟢 Conectado al WebSocket (Conversions):', socket.id);
      // Opcional: enviar ping de prueba como el test del back
      socket.emit('ping-conversions', { msg: 'hola desde frontend' });
    });

    socket.on('disconnect', (reason) => {
      console.log(`🔴 Desconectado del WebSocket (Conversions): ${reason}`);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Error de conexión:', err.message);
    });
    socket.on('pong-conversions', (data) => {
      console.log('📶 Respuesta al ping:', data);
    });

    // 🧠 Escuchar los mismos eventos que usa el backend
    socket.on('rate-update', (data: RateUpdate) => {
      console.log('💱 Nueva tasa recibida (rate-update):', data);
      setRateUpdate(data);
    });
    socket.on('calculationResult', (data) => {
      console.log('🧮 Resultado recibido del servidor:', data);
      setConversionResult(data);
    });
     socket.on('calculationError', (err) => {
      console.error('❌ Error recibido:', err);
    });

    socket.on('commission-update', (data) => {
      console.log('🏦 Nueva comisión recibida (commission-update):', data);
    });


      // Limpieza al desmontar
      return () => {
        socket.disconnect();
      };
    }
  }, []);
  // 👉 Función para emitir un cálculo manual 
  const sendCalculation = useCallback((payload: ConversionRequest) => {
    if (socketRef.current?.connected) {
      console.log('🚀 Enviando cálculo al servidor...', payload);
      socketRef.current.emit('calculateTotal', payload);
    } else {
      console.warn('⚠️ No conectado al WebSocket todavía');
    }
  }, []);

    // 👉 Función para esperar hasta que el socket esté conectado
  const waitForConnection = useCallback(() => {
    return new Promise<void>(resolve => {
      const socket = socketRef.current;
      if (socket?.connected) {
        resolve();
      } else {
        socket?.once('connect', () => resolve());
      }
    });
  }, []);

  return { rateUpdate, sendCalculation, conversionResult, waitForConnection};
};
