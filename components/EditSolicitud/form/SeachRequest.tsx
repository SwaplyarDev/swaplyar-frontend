'use client';
import { fetchTransactionById, TransactionRequestData } from '@/actions/editRequest/editRequest.action';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import VerifycodeEditRequest from '../VerifyCodeEditRequest/VerifyCodeEditRequest';
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
    <>
      {!isToggled ? (
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

          <div className="mb-10 mt-4 flex w-full flex-col items-center justify-center gap-1 text-center lg:mb-0 lg:justify-end">
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
          </div>
        </form>
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
    </>
  );
};

export default SeachRequest;
