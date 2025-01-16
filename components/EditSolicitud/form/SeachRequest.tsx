'use client';
import { fetchTransactionById, TransactionRequestData } from '@/actions/editRequest/editRequest.action';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import VerifycodeEditRequest from '../VerifyCodeEditRequest/VerifyCodeEditRequest';

interface FormValues {
  transaccionId: string;
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
    reset,
  } = useForm<FormValues>();

  const handleSeachRequestSubmit = async (data: TransactionRequestData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const requestData: TransactionRequestData = {
        transaccionId: data.transaccionId,
        userEmail: data.userEmail,
      };

      await fetchTransactionById(requestData);

      setIsToggled(true);
      setTransaccionId(data.transaccionId);
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
        className="mt-3 flex h-full w-full flex-col lg:ml-7 lg:justify-evenly"
        onSubmit={handleSubmit(handleSeachRequestSubmit)}
      >
        <label className="flex flex-col pr-2 text-right text-xl font-bold" htmlFor="transaccionId">
          NUMERO DE SOLICITUD
        </label>
        <input
          disabled={isToggled}
          className={`flex w-full border-0 border-b-4 border-solid ps-0 pt-0 text-right text-xl ${
            isDark
              ? 'border-b-darkText bg-transparent text-darkText placeholder-darkText placeholder-opacity-75 hover:border-b-buttonsLigth focus:border-b-buttonsLigth disabled:border-b-disabledDarkText disabled:text-disabledDarkText disabled:placeholder-disabledDarkText disabled:hover:border-b-disabledDarkText'
              : 'border-b-buttonsLigth bg-transparent text-lightText placeholder-lightText placeholder-opacity-75 hover:border-b-selectBtsLight focus:border-b-selectBtsLight disabled:border-b-disabledDarkText disabled:text-disabledLightText disabled:placeholder-disabledLightText disabled:hover:border-b-disabledDarkText'
          } outline-none focus:shadow-none focus:outline-none focus:ring-0`}
          type="text"
          placeholder="Como figura en el recibo"
          {...register('transaccionId', {
            required: '• El número de solicitud es obligatorio',
            pattern: {
              value: /^[A-Za-z0-9]{10,20}$/,
              message: '• El número de solicitud debe tener entre 10 y 20 caracteres alfanuméricos',
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
              className={`relative m-1 mt-8 flex h-[48px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 px-20 font-bold text-darkText hover:bg-buttonsLigth disabled:border-disabledDarkText disabled:bg-disabledButtonsLigth disabled:text-disabledLightText dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:border-disabledDarkText dark:disabled:bg-disabledDarkText dark:disabled:text-disabledLightText ${isDark ? (isLoading ? 'buttonSecondDarkDisabled' : 'buttonSecondDark') : isLoading ? 'buttonSecondDisabled' : 'buttonSecond'}`}
            >
              {isLoading ? (
                <>
                  <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} />
                  Cargando...
                </>
              ) : (
                'Buscar'
              )}
            </button>
          ) : (
            <VerifycodeEditRequest
              transaccionId={transaccionId}
              toggle={() => {
                setIsToggled(false);
                reset({
                  transaccionId: '',
                });
              }}
              isDark={isDark}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default SeachRequest;
