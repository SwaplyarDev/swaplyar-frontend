import Clock from '@/components/ui/Clock/Clock';
import { useState, useEffect, useRef } from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import useChronometerState from '@/store/chronometerStore';
import { CronometroProps } from '@/types/request/request';

const Cronometro: React.FC<CronometroProps> = ({ setBlockAll }) => {
  const [segundos, setSegundos] = useState<number>(30 * 60); // Inicializamos en 30 minutos (30 * 60 segundos)
  const intervaloRef = useRef<NodeJS.Timeout | null>(null); // Referencia para el intervalo de tiempo
  const { isStopped, stop, setisStopped, setStop } = useChronometerState();

  // Iniciar el cronómetro automáticamente al montar el componente
  useEffect(() => {
    if (stop) {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
      return;
    }
    intervaloRef.current = setInterval(() => {
      setSegundos((prev) => {
        if (prev > 0) {
          return prev - 1; // Restamos un segundo
        } else {
          clearInterval(intervaloRef.current!); // Detenemos el cronómetro cuando llega a cero
          setStop(true);
          setBlockAll(true);
          setisStopped(true);
          return 0; // Aseguramos que el cronómetro no pase a valores negativos
        }
      });
    }, 1000); // Ejecutar cada segundo

    // Limpiamos el intervalo cuando el componente se desmonte
    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, [setBlockAll, setisStopped, setStop, stop]); // El array vacío significa que solo se ejecuta una vez cuando el componente se monta

  // Formato de tiempo: mm:ss (minutos:segundos)
  const formatTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60); // Obtenemos los minutos
    const segundosRestantes = segundos % 60; // Obtenemos los segundos restantes
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  };

  // Calcular el porcentaje de la barra de progreso
  const porcentajeProgreso = (segundos: number) => {
    return (segundos / (30 * 60)) * 100; // Calculamos el porcentaje basado en el tiempo restante
  };

  const { isDark } = useDarkTheme();

  const obtenerColorBarra = (segundos: number) => {
    if (segundos <= 5 * 60) {
      // Menos de 5 minutos
      return 'red';
    } else if (segundos <= 10 * 60) {
      // Menos de 10 minutos
      return 'orange';
    } else {
      // Más de 10 minutos
      return isDark ? '#ebe7e0' : '#252526'; // Color estándar, cambia si es tema oscuro
    }
  };

  return (
    <div>
      <div
        style={{
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          color: isDark ? '#ebe7e0' : '#252526',
        }}
      >
        Tiempo Restante{' '}
        <Clock color={isDark ? '#ebe7e0' : '#252526'} stopRequest={stop} />
        <span className="w-[52px] text-center">
          {formatTiempo(segundos)}
        </span>
      </div>

      {!isStopped && (
        <div
          style={{
            width: '100%',
            height: '3px',
            backgroundColor: 'transparent', 
            marginTop: '7px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${porcentajeProgreso(segundos)}%`, 
              height: '100%',
              backgroundColor: obtenerColorBarra(segundos), 
              borderRadius: '1px',
              transition: 'width 1s ease-out',
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Cronometro;
