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
import BottomBorderInput from '@/components/ui/Input/BottomBorderInput';
import PopUp from '@/components/ui/PopUp/PopUp';

interface FormValues {
  transaccionId: string;
  userEmail: string;
}

const SeachRequest: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [transaccionId, setTransaccionId] = useState<string>('');
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
      PopUp({
        variant: 'simple-error',
        isDark,
        title: 'Hubo un error al buscar la solicitud. Intente nuevamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-4 mt-3"
      onSubmit={handleSubmit(handleSeachRequestSubmit)}
    >
      <BottomBorderInput
        label="Número de Solicitud"
        name="transaccionId"
        register={register}
        disabled={isToggled}
        validation={{
          required: 'El número de solicitud es obligatorio',
          pattern: {
            value: /^[A-Za-z0-9]{10,20}$/,
            message: 'El número de solicitud debe tener entre 10 y 20 caracteres alfanuméricos',
          },
        }}
        error={errors.transaccionId?.message}
      />
      {/* <input
          disabled={isToggled}
          className={`flex h-[41px] w-full border-0 border-b-[1px] border-solid pr-0 ps-0 pt-0 text-base placeholder:text-xs xs:placeholder:text-base lg:text-xl ${isDark
              ? `${errors.transaccionId !== undefined ? 'placeholder-errorColor' : 'placeholder:text-custom-blue-300'} border-b-darkText bg-transparent text-custom-blue-300 hover:border-b-placeholderDark focus:border-b-placeholderDark disabled:border-b-disabledDarkText disabled:text-disabledDarkText disabled:placeholder-disabledDarkText disabled:hover:border-b-disabledDarkText`
              : `${errors.transaccionId !== undefined ? 'placeholder-errorColor' : 'placeholder-inputLightDisabled'} border-b-buttonsLigth bg-transparent text-custom-blue-300 hover:border-b-selectBtsLight focus:border-b-selectBtsLight disabled:border-b-disabledDarkText disabled:text-disabledLightText disabled:placeholder-disabledLightText disabled:hover:border-b-disabledDarkText`
            } outline-none focus:shadow-none focus:outline-none focus:ring-0`}
          type="text"
          placeholder={
            errors.transaccionId !== undefined
              ? 'N° de Solicitud como figura en el Correo Eletrónico*'
              : 'Número de Solicitud'
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
        )} */}

      <div className="mb-10 mt-4 flex w-full flex-col items-center justify-center gap-1 text-center lg:mb-0 lg:justify-end">
        {!isToggled ? (
          <div className="w-full flex flex-row items-center justify-between gap-4 md:mt-4">
            <ButtonBack route="/es/centro-de-ayuda" isDark={isDark} className="!mx-0" />
            <ButtonAuth
              label="Modificar solicitud"
              type="submit"
              isDark={isDark}
              loading={isLoading}
              disabled={!watch('transaccionId') || isLoading}
              className='w-[272px] md:w-[394px]'
              variant="primary"
            />
          </div>
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
  );
};

export default SeachRequest;
