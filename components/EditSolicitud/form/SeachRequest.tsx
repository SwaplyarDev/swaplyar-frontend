'use client';
import { fetchTransactionById, TransactionRequestData } from '@/actions/editRequest/editRequest.action';
import VerifycodeEditRequest from '../verify-code-editRequest/verify-code-editRequest';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface isDark {
  isDark: boolean;
}

interface FormValues {
  transaccionId: string; // Cambié el nombre aquí de "transactionId" a "transaccionId"
  userEmail: string;
}

const SeachRequest: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [transaccionId, setTransaccionId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isDark } = useDarkTheme();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const handleSeachRequestSubmit = async (data: TransactionRequestData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const requestData: TransactionRequestData = {
        transaccionId: data.transaccionId, // Mapear desde FormValues
        userEmail: data.userEmail, // Mapear si existe en el formulario
      };

      // Realiza la llamada a la base de datos, pero no necesitas esperar la respuesta
      await fetchTransactionById(requestData); // Pasar el objeto completo

      // Aquí no validas la respuesta, solo activas el toggle
      setIsToggled(true);
      setTransaccionId(data.transaccionId); // Pasar el transaccionId recibido del formulario
    } catch (error) {
      console.error('Error fetching transaction:', error);
      setErrorMessage('Hubo un error al buscar la solicitud. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center md:mx-10 lg:mx-0 lg:flex-none">
      <form
        className="ml-2 mt-3 flex h-full w-full flex-col lg:ml-7 lg:justify-evenly"
        onSubmit={handleSubmit(handleSeachRequestSubmit)}
      >
        <label className="flex flex-col pr-2 text-right text-xl font-bold" htmlFor="transaccionId">
          NUMERO DE SOLICITUD
        </label>
        <input
          className={`flex w-full border-0 border-b-4 border-solid ps-0 pt-0 text-right text-xl ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-black placeholder-black focus:border-buttonsLigth'} outline-none focus:outline-none`}
          type="text"
          placeholder="Como figura en el recibo"
          {...register('transaccionId', {
            required: '• El número de referencia es obligatorio',
            pattern: {
              value: /^[A-Za-z0-9]{10,20}$/,
              message: '• El número de referencia debe tener entre 10 y 20 caracteres alfanuméricos',
            },
          })}
          id="transaccionId"
        />
        {errors.transaccionId && <span className="mt-1 text-sm text-red-500">{errors.transaccionId.message}</span>}

        {errorMessage && <div className="mt-2 text-sm text-red-500">{errorMessage}</div>}
        <div className="mb-10 mt-5 flex w-full justify-center text-center lg:mb-0 lg:justify-end xl:mr-44">
          {!isToggled ? (
            <button
              type="submit"
              disabled={isLoading}
              className={`relative m-1 mt-8 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 px-20 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              {isLoading ? 'Cargando...' : 'Buscar'}
            </button>
          ) : (
            <VerifycodeEditRequest transaccionId={transaccionId} toggle={() => setIsToggled(false)} isDark={isDark} />
          )}
        </div>
      </form>
    </div>
  );
};

export default SeachRequest;
