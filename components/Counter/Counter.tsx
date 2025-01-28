import { useEffect, useState, useCallback } from 'react';
import CountUp from 'react-countup';
const ApiUrl = process.env.NEXT_PUBLIC_VALUE_TIME;

type CounterData = {
  Contador: number;
  'Fecha y Hora de Actualización': string;
};

const Counter = () => {
  const [counter, setCounter] = useState<number>(0);
  const [previousCounter, setPreviousCounter] = useState<number>(0);

  const fetchCounter = useCallback(async () => {
    try {
      const response = await fetch(`${ApiUrl}`);
      const data: CounterData = await response.json();
      setPreviousCounter(counter);
      setCounter(data.Contador);
    } catch (error) {
      console.error('Error fetching counter:', error);
    }
  }, [counter]); // Depende del estado actual del contador

  useEffect(() => {
    fetchCounter();

    // Actualizar el contador cada 10 segundos
    const interval = setInterval(() => {
      fetchCounter();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchCounter]);

  return (
    <div className="text-center">
      <CountUp
        start={previousCounter}
        end={counter}
        duration={1.5}
        separator=","
        className="font-titleFont text-[96px]/[120%] font-bold text-buttonsLigth text-shadow-customLight dark:text-darkText dark:text-shadow-customDark sm:text-[140px]/[120%]"
      />
    </div>
  );
};

export default Counter;
