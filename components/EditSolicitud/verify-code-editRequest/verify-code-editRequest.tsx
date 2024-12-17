'use client';
import { useForm } from 'react-hook-form';
import { useState, useEffect, ChangeEvent } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import useCodeVerificationStore from '@/store/codeVerificationStore';
import userInfoStore from '@/store/userInfoStore';

import Arrow from '@/components/ui/Arrow/Arrow';
import Modal1 from '@/components/modals/ModalTipos';
import { fetchCode, resendCodeAction } from '@/actions/editRequest/editRequest.action';

interface FormInputs {
  verificationCode: string[];
  requestData: string;
}

interface VerifycodeEditRequestProps {
  isDark: boolean;
  transaccionId: string;
  toggle: () => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const VerifycodeEditRequest: React.FC<VerifycodeEditRequestProps> = ({ toggle, isDark, transaccionId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reLoading, setReLoading] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null); // To store code verification result
  const [disabledInputs, setDisabledInputs] = useState(false); // To disable inputs after submission
  const [isLock, setIsLock] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<FormInputs>();
  const { attempts, lockUntil, setLockUntil, resetAttempts } = useCodeVerificationStore();
  const router = useRouter();
  const { user } = userInfoStore();

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

  // Handle the code verification
  const verifyCode = async ({ verificationCode, requestData }: FormInputs) => {
    const code = verificationCode.join('');
    setLoading(true);

    try {
      // Usamos la función fetchCode para enviar el código al backend
      const result = await fetchCode(code, { transactionId: transaccionId });

      if (result.success) {
        setIsCodeCorrect(true);
        setIsModalOpen(true); // Mostrar el modal al verificar correctamente
      } else {
        setIsCodeCorrect(false);
        setValue('verificationCode', ['', '', '', '', '', '']); // Limpiar las casillas
      }
    } catch (error) {
      console.error('Error durante la verificación del código:', error);
      setIsCodeCorrect(false);
      setValue('verificationCode', ['', '', '', '', '', '']); // Limpiar en caso de error
    } finally {
      setLoading(false);
      setIsLock(false); // Desbloquear inputs si hay error
    }
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Validar que solo se acepten dígitos
    if (/^\d*$/.test(value)) {
      const newVerificationCode = [...(watch('verificationCode') || ([] as string[]))];
      newVerificationCode[index] = value;
      setValue('verificationCode', newVerificationCode);

      // Bloquear inputs automáticamente si están todos completos
      if (newVerificationCode.every((val) => val.trim() !== '' && val.length === 1)) {
        setIsLock(true); // Bloquear inputs
        handleSubmit(verifyCode)(); // Verificar automáticamente
      }

      // Enfocar automáticamente el siguiente input si el actual está lleno
      if (value.length === 1 && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const resendCode = async () => {
    try {
      setReLoading(true);
      setTimer(30); // Bloquear el botón por 30 segundos

      // Llamada a la función de acción para reenviar el código
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="w-full">
        <form onSubmit={handleSubmit(verifyCode)} className="w-auto">
          <label htmlFor="verificationCode" className="text-center text-xl text-lightText dark:text-darkText">
            Ingrese el código de 6 dígitos que recibiste por email
          </label>
          <div className="flex w-full justify-center">
            <div className="my-5 flex h-full w-11/12 justify-between gap-2 xs:h-[57px] xs:gap-1 sm:h-[65.33px] md:h-[52px] md:w-7/12 lg:w-full xl:w-8/12 2xl:w-6/12">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className={clsx(
                    `w-[50px] rounded-full border-[0.5px] border-buttonsLigth p-[3px] dark:border-darkText xs:w-[57px] sm:w-full`,
                  )}
                >
                  <input
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    disabled={disabledInputs || isLocked || loading}
                    className={clsx(
                      'h-full w-full rounded-full border-0 text-center text-base focus:outline-none dark:border-[0.5px] dark:bg-lightText sm:text-[2.5rem] lg:text-2xl',
                      errors.verificationCode ? 'border-red-500' : '',
                    )}
                    {...register(`verificationCode.${index}`)}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>
              ))}
            </div>
          </div>

          {errors.verificationCode && <p className="mb-5 text-sm text-red-500">• {errors.verificationCode.message}</p>}

          {isCodeCorrect === false && <p className="mt-2 text-sm text-red-500">Código incorrecto. Intenta de nuevo.</p>}

          <div className="my-5 flex justify-evenly text-buttonsLigth dark:text-darkText">
            <button
              onClick={toggle}
              className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} group relative m-1 flex h-[42px] min-w-[150px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent xs:min-w-[150px]`}
            >
              <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
              <p>Volver</p>
            </button>

            <button
              type="button"
              onClick={resendCode}
              disabled={reLoading || timer > 0}
              className={`${
                isDark ? 'buttonSecondDark' : 'buttonSecond'
              } flex h-[42px] min-w-[150px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white disabled:border-gray-400 disabled:bg-gray-400`}
            >
              {reLoading ? 'Reenviando...' : timer > 0 ? `Reenviar en ${timer}s` : 'Reenviar código'}
            </button>
          </div>
        </form>
      </div>
      <Modal1
        transaccionId={transaccionId}
        isDark={isDark}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="modal de tipos"
      />
    </div>
  );
};

export default VerifycodeEditRequest;
