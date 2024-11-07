import React, { useEffect, useState } from 'react';

// Definir los tipos para las propiedades del componente
interface TimerComponentProps {
  initialTimeInMinutes?: number; // Propiedad opcional, el tiempo inicial en minutos (por defecto 30)
}

const TimerComponent: React.FC<TimerComponentProps> = ({ initialTimeInMinutes = 30 }) => {
  // Total de tiempo en segundos
  const totalTimeInSeconds = initialTimeInMinutes * 60;

  // Estado para el tiempo restante y el progreso
  const [timeLeft, setTimeLeft] = useState<number>(totalTimeInSeconds); // Estado para el tiempo restante
  const [progress, setProgress] = useState<number>(100); // Estado para el progreso de la barra (0-100%)

  // Función para formatear el tiempo en formato mm:ss
  const getFormattedTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Lógica para disminuir el contador cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId); // Detener el contador cuando llegue a 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Actualizar cada segundo

    // Cleanup cuando el componente se desmonte
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Actualizar el progreso de la barra en función del tiempo restante
  useEffect(() => {
    setProgress((timeLeft / totalTimeInSeconds) * 100);
  }, [timeLeft, totalTimeInSeconds]);

  return (
    <div className="timer-container">
      <div className="time-display">
        <h2>{getFormattedTime(timeLeft)}</h2>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }} // Cambiar el ancho de la barra según el progreso
        />
      </div>
    </div>
  );
};

export default TimerComponent;