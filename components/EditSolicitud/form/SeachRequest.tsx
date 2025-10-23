'use client';
import { fetchTransactionById, TransactionRequestData } from '@/actions/editRequest/editRequest.action';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import VerifycodeEditRequest from '../VerifyCodeEditRequest/VerifyCodeEditRequest';
import clsx from 'clsx';
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack';
import ButtonAuth from '@/components/auth/AuthButton';

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
    watch,
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
    <div className="mt-10 flex justify-center md:mx-10 lg2:mr-[20px] lg2:justify-end">
      <form
        className="lg:max-w-inherit flex h-full w-full max-w-[465px] flex-col lg:justify-evenly"
        onSubmit={handleSubmit(handleSeachRequestSubmit)}
      >
        <div className="flex h-[100px] flex-col">
          <label
            className="mb-3 flex flex-col text-right font-textFont text-xs font-light xs:mb-0 lg:text-sm"
            htmlFor="transaccionId"
          >
            Número de Solicitud
          </label>
          <input
            disabled={isToggled}
            className={`flex h-[41px] w-full border-0 border-b-[1px] border-solid pr-0 ps-0 pt-0 text-right text-base placeholder:text-xs xs:placeholder:text-base lg:text-xl ${
              isDark
                ? `${errors.transaccionId !== undefined ? 'placeholder-errorColor' : 'placeholder-placeholderDark'} border-b-darkText bg-transparent text-darkText hover:border-b-placeholderDark focus:border-b-placeholderDark disabled:border-b-disabledDarkText disabled:text-disabledDarkText disabled:placeholder-disabledDarkText disabled:hover:border-b-disabledDarkText`
                : `${errors.transaccionId !== undefined ? 'placeholder-errorColor' : 'placeholder-inputLightDisabled'} border-b-buttonsLigth bg-transparent text-lightText hover:border-b-selectBtsLight focus:border-b-selectBtsLight disabled:border-b-disabledDarkText disabled:text-disabledLightText disabled:placeholder-disabledLightText disabled:hover:border-b-disabledDarkText`
            } outline-none focus:shadow-none focus:outline-none focus:ring-0`}
            type="text"
            placeholder={
              errors.transaccionId !== undefined
                ? 'N° de Solicitud como figura en el Correo Eletrónico*'
                : 'N° de Solicitud como figura en el Correo Eletrónico'
            }
            {...register('transaccionId', {
              required: 'El número de solicitud es obligatorio',
              pattern: {
                value: /^[A-Za-z0-9]{10,20}$/,
                message: 'El número de solicitud debe tener entre 10 y 20 caracteres alfanuméricos',
              },
            })}
            id="transaccionId"
          />
          {errors.transaccionId && (
            <span className="text-right text-sm text-errorColor">{errors.transaccionId.message}</span>
          )}
        </div>

        {errorMessage && <div className="mt-2 text-end text-sm text-errorColor">{errorMessage}</div>}
        <div className="mb-10 mt-4 flex w-full flex-col items-center justify-center gap-1 text-center lg:mb-0 lg:justify-end">
  {!isToggled ? (
    <>
      <ButtonAuth
        label="Editar Solicitud"
        type="submit"
        isDark={isDark}
        loading={isLoading}
        disabled={!watch('transaccionId') || isLoading}
        className="w-full max-w-[300px]"
        variant="primary"
      />
      <ButtonBack route="/es/centro-de-ayuda" isDark={isDark} />
    </>
  ) : (
    <VerifycodeEditRequest
      transaccionId={transaccionId}
      toggle={() => {
        setIsToggled(false);
        reset({ transaccionId: '' });
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
