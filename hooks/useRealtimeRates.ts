// hooks/useRealtimeRates.ts
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface RateUpdate {
  from: string;
  to: string;
  rate: number;
}

export const useRealtimeRates = () => {
  const [rateUpdate, setRateUpdate] = useState<RateUpdate | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // 🔌 Conexión al backend (ajustá la URL según tu entorno)
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL + '/conversions', {
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🟢 Conectado al WebSocket del backend');
    });

    socket.on('disconnect', () => {
      console.log('🔴 Desconectado del WebSocket');
    });

    // 🧠 Escucha de eventos enviados por el gateway del backend
    socket.on('updateRates', (data: RateUpdate) => {
      console.log('💱 Nueva tasa recibida en tiempo real:', data);
      setRateUpdate(data);
    });

    // Limpieza al desmontar
    return () => {
      socket.disconnect();
    };
  }, []);

  return { rateUpdate };
};
