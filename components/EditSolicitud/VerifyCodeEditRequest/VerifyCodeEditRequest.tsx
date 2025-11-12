'use client';
import { useState, useEffect } from 'react';
import useCodeVerificationStore from '@/store/codeVerificationStore';
import Modal1 from '@/components/modals/ModalTipos';
import { fetchCode, resendCodeAction } from '@/actions/editRequest/editRequest.action';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { useForm } from 'react-hook-form';
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack';
import { VerificationCodeInput } from '@/components/ui/VerificationCodeInput/VerificationCodeInput';
import AuthButton from '@/components/auth/AuthButton';
import PopUp from '@/components/ui/PopUp/PopUp';

interface FormInputs {
  verificationCode: string[];
  requestData: string;
}

interface VerifycodeEditRequestProps {
  isDark: boolean;
  transaccionId: string;
  toggle: () => void;
}

const VerifycodeEditRequest: React.FC<VerifycodeEditRequestProps> = ({ toggle, isDark, transaccionId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reLoading, setReLoading] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null);
  const [code, setCode] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>();
  const { lockUntil, setLockUntil, resetAttempts } = useCodeVerificationStore();
  /* SUGIERO PASAR ESTE TRANSACTION DIRECTAMENTE A MODAL1 PARA QUE NO SE HAGA UN DOBLE LLAMADO Y ESTE LA DATA MAS RAPIDO */
  const [transaction, setTransaction] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const isLocked = lockUntil && lockUntil > Date.now();
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (isLocked) {
      const timer = setTimeout(() => {
        setLockUntil(null);
        resetAttempts();
      }, lockUntil - Date.now());
      return () => clearTimeout(timer);
    }
  }, [isLocked, lockUntil, setLockUntil, resetAttempts]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.classList.add('overflow-hidden');
    } else {
      document.documentElement.classList.remove('overflow-hidden');
    }

    return () => document.documentElement.classList.remove('overflow-hidden');
  }, [isModalOpen]);

  const verifyCode = async ({ verificationCode }: FormInputs) => {
    const code = verificationCode.join('');
    setLoading(true);

    try {
      const result = await fetchCode(code, { transactionId: transaccionId });

      if (result.success) {
        setIsCodeCorrect(true);
        setIsModalOpen(true);
        setCode(code);
        /* SUGIERO PASAR ESTE TRANSACTION DIRECTAMENTE A MODAL1 PARA QUE NO SE HAGA UN DOBLE LLAMADO Y ESTE LA DATA MAS RAPIDO */
        setTransaction(result.data.transaction)
        setAccessToken(result.noteAccessToken);
        return;
      } else {
        setIsCodeCorrect(false);
        setValue('verificationCode', ['', '', '', '', '', '']);
        console.log('result no success', result)
      }
    } catch (error) {
      console.error('Error durante la verificación del código:', error);
      setIsCodeCorrect(false);
      setValue('verificationCode', ['', '', '', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      setReLoading(true);
      setTimer(30);

      const { success, message } = await resendCodeAction(transaccionId);

      if (success) {
        PopUp({
          variant: 'success-compact',
          isDark,
          title: 'El código ha sido reenviado exitosamente a tu correo electrónico.',
        });
      } else {
        console.error('Error al reenviar el código:', message);
        PopUp({
          variant: 'simple-error',
          isDark,
          title: 'Hubo un error al intentar reenviar el código. Intente nuevamente.',
        });
      }
    } catch (error) {
      console.error('Error al reenviar el código:', error);
      PopUp({
        variant: 'simple-error',
        isDark,
        title: 'Ocurrió un problema al reenviar el código',
      });
    } finally {
      setReLoading(false);
    }
  };

  return (
    <>
      <div className="w-full my-4">
        <form onSubmit={handleSubmit(verifyCode)} className="flex w-auto flex-col items-center gap-2">
          <label htmlFor="verificationCode" className="text-center text-xl text-lightText dark:text-darkText">
            Ingrese el código de 6 dígitos que recibiste por email
          </label>

          <div className="flex w-full justify-center">
            <VerificationCodeInput
              register={register}
              watch={watch}
              setValue={setValue}
              onComplete={async () => {
                await handleSubmit(verifyCode)();
              }}
              onChange={() => {
                if (isCodeCorrect === false) {
                  setIsCodeCorrect(null);
                }
              }}
              isDisabled={isLocked || loading}
              isLoading={loading}
              error={isCodeCorrect === false}
              isDark={isDark}
              showSeparators={true}
              className="h-[46px] xs:h-[57px] sm:h-[65.33px] gap-2 xs:gap-1"
            />
          </div>

          {errors.verificationCode && <p className="mb-5 text-sm text-errorColor">{errors.verificationCode.message}</p>}

          {isCodeCorrect === false && (
            <p className="text-sm text-errorColor">Código incorrecto. Intenta de nuevo.</p>
          )}

          {loading && (
            <div id="loading" className="flex w-9/12 items-center justify-center gap-2">
              <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="50px" />
            </div>
          )}

          <div className="flex flex-col-reverse items-center justify-evenly gap-5 text-buttonsLigth dark:text-darkText xs:flex-row">
            <ButtonBack route="/es/centro-de-ayuda" isDark={isDark} />

            <AuthButton
              label={timer > 0 ? `Reenviar en ${timer}s` : 'Reenviar código'}
              onClick={resendCode}
              disabled={reLoading || timer > 0 || loading}
              loading={reLoading}
              isDark={isDark}
              className="min-w-[150px]"
            />
          </div>
        </form>
      </div>
      <Modal1
        transaccionId={transaccionId}
        isDark={isDark}
        isOpen={isModalOpen}
        code={code}
        transactionData={transaction} // ahora es solo el objeto transaction
        noteAccessToken={accessToken} 
        onClose={() => {
          setIsModalOpen(false);
          toggle();
        }}
      />
    </>
  );
};

export default VerifycodeEditRequest;
