import { useState, useEffect, useRef } from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import useChronometerState from '@/store/chronometerStore';
import { CronometroProps } from '@/types/request/request';
import Image from 'next/image';
import { Reloj } from '@/utils/assets/img-database';

const Cronometro: React.FC<CronometroProps> = ({ setBlockAll }) => {
  const [segundos, setSegundos] = useState<number>(30 * 60);
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);
  const { isStopped, stop, setisStopped, setStop } = useChronometerState();

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
          return prev - 1;
        } else {
          clearInterval(intervaloRef.current!);
          setStop(true);
          setBlockAll(true);
          setisStopped(true);
          return 0;
        }
      });
    }, 1000);

    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, [setBlockAll, setisStopped, setStop, stop]); // El array vacío significa que solo se ejecuta una vez cuando el componente se monta

  // Formato de tiempo: mm:ss (minutos:segundos)
  const formatTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  };

  const porcentajeProgreso = (segundos: number) => {
    return (segundos / (30 * 60)) * 100;
  };

  const { isDark } = useDarkTheme();

  const obtenerColorBarra = (segundos: number) => {
    if (segundos <= 7.5 * 60) {
      // Menos de 7.5 minutos
      return 'red';
    } else if (segundos <= 15 * 60) {
      // Menos de 15 minutos
      return 'orange';
    } else {
      // Más de 15 minutos
      return isDark ? '#ebe7e0' : '#252526';
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
        Tiempo Restante <Image src={Reloj} alt="Reloj" width={18} height={18} className="ml-1" />
        <span className="w-[52px] text-center">{formatTiempo(segundos)}</span>
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
