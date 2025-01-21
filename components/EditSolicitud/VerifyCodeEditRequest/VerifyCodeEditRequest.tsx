'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import clsx from 'clsx';
import useCodeVerificationStore from '@/store/codeVerificationStore';
import Arrow from '@/components/ui/Arrow/Arrow';
import Modal1 from '@/components/modals/ModalTipos';
import { fetchCode, resendCodeAction } from '@/actions/editRequest/editRequest.action';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { useForm } from 'react-hook-form';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>();
  const { lockUntil, setLockUntil, resetAttempts } = useCodeVerificationStore();

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

  const verifyCode = async ({ verificationCode, requestData }: FormInputs) => {
    const code = verificationCode.join('');
    setLoading(true);

    try {
      const result = await fetchCode(code, { transactionId: transaccionId });

      if (result.success) {
        setIsCodeCorrect(true);
        setIsModalOpen(true);
      } else {
        setIsCodeCorrect(false);
        setValue('verificationCode', ['', '', '', '', '', '']);
      }
    } catch (error) {
      console.error('Error durante la verificación del código:', error);
      setIsCodeCorrect(false);
      setValue('verificationCode', ['', '', '', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (/^\d*$/.test(value)) {
      const newVerificationCode = [...(watch('verificationCode') || ([] as string[]))];
      newVerificationCode[index] = value;
      setValue('verificationCode', newVerificationCode);

      if (newVerificationCode.every((val) => val.trim() !== '' && val.length === 1)) {
        handleSubmit(verifyCode)();
      }

      if (value.length === 1 && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const resendCode = async () => {
    try {
      setReLoading(true);
      setTimer(30);

      const { success, message } = await resendCodeAction(transaccionId);

      if (success) {
        alert('El código ha sido reenviado exitosamente a tu correo electrónico.');
      } else {
        alert(`Hubo un error al intentar reenviar el código: ${message}`);
      }
    } catch (error) {
      alert('Ocurrió un problema al reenviar el código. Por favor, verifica tu conexión.');
    } finally {
      setReLoading(false);
    }
  };

  const handleInputKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && event.currentTarget.value === '') {
      if (index > 0) {
        const prevInput = document.getElementById(`code-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit(verifyCode)} className="flex w-auto flex-col items-center">
          <label htmlFor="verificationCode" className="text-center text-xl text-lightText dark:text-darkText">
            Ingrese el código de 6 dígitos que recibiste por email
          </label>
          <div className="flex w-full justify-center">
            <div className="my-5 flex h-[52px] w-full max-w-[350px] justify-between gap-0 xs:max-w-[500px]">
              {[...Array(6)].map((_, index) => (
                <>
                  <div
                    key={index}
                    className={clsx(
                      isCodeCorrect === false ? 'border-errorColor' : 'border-buttonsLigth dark:border-darkText',
                      `flex h-[51px] min-w-[51px] items-center justify-center rounded-full border-[2px] p-[3px] xs:w-[57px] sm:w-[51px]`,
                    )}
                  >
                    <input
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      disabled={isLocked || loading}
                      className={clsx(
                        'h-[45px] w-[45px] rounded-full border-0 text-center text-base text-buttonsLigth focus:outline-none dark:border-[0.5px] dark:bg-darkText dark:text-lightText sm:text-[2.5rem] lg:text-2xl',
                        isCodeCorrect === false ? 'border-errorColor' : '',
                      )}
                      {...register(`verificationCode.${index}`)}
                      onChange={(event) => handleInputChange(index, event)}
                      onKeyDown={(event) => handleInputKeyDown(index, event)}
                    />
                  </div>
                  {index < 5 && (
                    <div className="mx-1 hidden min-h-full w-full items-center justify-center xs:flex">
                      <div className="h-1 w-full flex-1 rounded-full bg-buttonsLigth dark:bg-darkText"></div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>

          {errors.verificationCode && <p className="mb-5 text-sm text-errorColor">{errors.verificationCode.message}</p>}

          {isCodeCorrect === false && (
            <p className="mt-2 text-sm text-errorColor">Código incorrecto. Intenta de nuevo.</p>
          )}

          {loading && (
            <div id="loading" className="flex w-9/12 items-center justify-center gap-2">
              <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="50px" />
            </div>
          )}

          <div className="my-5 flex flex-col-reverse items-center justify-evenly gap-5 text-buttonsLigth dark:text-darkText xs:flex-row">
            <button
              onClick={toggle}
              className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} group relative m-1 flex h-[42px] min-w-[150px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 font-bold text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent xs:min-w-[150px]`}
            >
              <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
              <p>Volver</p>
            </button>

            <button
              type="button"
              onClick={resendCode}
              disabled={reLoading || timer > 0}
              className={`${
                isDark
                  ? reLoading || timer > 0
                    ? 'buttonSecondDarkDisabled'
                    : 'buttonSecondDark'
                  : reLoading || timer > 0
                    ? 'buttonSecondDisabled'
                    : 'buttonSecond'
              } flex h-[42px] min-w-[150px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-darkText disabled:border-gray-400 disabled:bg-gray-400 dark:border-darkText dark:bg-darkText dark:text-lightText`}
            >
              {reLoading ? (
                <div id="loading" className="flex items-center justify-center gap-2">
                  <LoadingGif color={!isDark ? '#ebe7e0' : '#012c8a'} />
                  <span>Reenviando...</span>
                </div>
              ) : timer > 0 ? (
                `Reenviar en ${timer}s`
              ) : (
                'Reenviar código'
              )}
            </button>
          </div>
        </form>
      </div>
      <Modal1
        transaccionId={transaccionId}
        isDark={isDark}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          toggle();
        }}
        title="modal de tipos"
      />
    </>
  );
};

export default VerifycodeEditRequest;
