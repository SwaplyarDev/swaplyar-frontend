'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect, ChangeEvent } from 'react';
import { login } from '@/actions/auth/login';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import useEmailVerificationStore from '@/store/emailVerificationStore';
import { useRouter } from 'next/navigation';
import useCodeVerificationStore from '@/store/codeVerificationStore';
import useStore from '@/store/authViewStore';
import userInfoStore from '@/store/userInfoStore';
import { registerUser } from '@/actions/auth/register';

import ButtonBack from '@/components/ui/ButtonBack/ButtonBack';
import Arrow from '@/components/ui/Arrow/Arrow';
import Modal1 from '@/components/modals/Modal_1';
import Modal2 from '@/components/modals/Modal_2';
import Modal3 from '@/components/modals/Modal_3';
import Modal4 from '@/components/modals/Modal_4';

type FormInputs = {
  verificationCode: string[];
};
interface VerifycodeEditRequestProps {
  isDark: boolean;
  toggle: () => void;
}

const BASE_URL = process.env.BACKEND_API_URL;

const VerifycodeEditRequest: React.FC<VerifycodeEditRequestProps> = ({ toggle, isDark }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm<FormInputs>({});

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [reLoading, setReLoading] = useState(false);
  const { email } = useEmailVerificationStore();
  const router = useRouter();
  const { view } = useStore();
  const { user } = userInfoStore();
  console.log('User id: ', user?.id);
  console.log('View: ', view);

  const { attempts, lockUntil, decrementAttempts, setLockUntil, resetAttempts } = useCodeVerificationStore();

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
  }, [email, router, isLocked, lockUntil, setLockUntil, resetAttempts]);

  // Temporizador para el reenvío
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const verifyCode: SubmitHandler<FormInputs> = async ({ verificationCode }) => {
    setLoading(true);
    const code = verificationCode.join('');

    if (code.length !== 6 || !/^\d+$/.test(code)) {
      setError('verificationCode', {
        type: 'manual',
        message: 'El código debe ser un número de 6 dígitos.',
      });
      setLoading(false);
      return;
    }

    try {
      let result: { ok: boolean; message?: any } = { ok: false };
      if (view === 'login') {
        result = await login(email || '', code);
      } else if (view === 'register') {
        result = await registerUser(user?.id || '', code);
      }

      if (!result.ok) {
        setError('verificationCode', {
          type: 'manual',
          message: 'El código ingresado es incorrecto.',
        });
        clearVerificationInputs(); // Limpiar campos si es incorrecto
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error durante la verificación del código:', error);
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (!isLocked && attempts > 0 && timer === 0) {
      setReLoading(true);
      let URL_VERIFICATION = '';
      if (email) {
        URL_VERIFICATION = 'login/email/verify-code';
      }
      if (user?.id) {
        URL_VERIFICATION = 'users/email-validation/send';
      }
      const bodyData = {
        email: email,
        ...(user?.id && { user_id: user.id }),
      };
      try {
        await fetch(`${BASE_URL}/v1/${URL_VERIFICATION}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData),
        });
        decrementAttempts(); // Reducir intentos después del reenvío
        setTimer(10); // Reiniciar el temporizador a 10 segundos
        if (attempts <= 1) {
          setLockUntil(Date.now() + 5 * 60 * 1000); // Bloquear por 5 minutos si no hay intentos
        }
      } catch (error) {
        console.error('Error al reenviar el código:', error);
      } finally {
        setReLoading(false);
      }
    }
  };

  const clearVerificationInputs = () => {
    for (let i = 0; i < 6; i++) {
      setValue(`verificationCode.${i}`, '');
    }
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      clearErrors('verificationCode');
      const newVerificationCode = [...(watch('verificationCode') || ([] as string[]))];
      newVerificationCode[index] = value;
      setValue('verificationCode', newVerificationCode);

      if (value.length === 1 && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }

      if (newVerificationCode.every((code) => code.length === 1)) {
        handleSubmit(verifyCode)();
      }
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
  // abrir el modal
  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="w-full">
        <form onSubmit={handleSubmit(verifyCode)} className="w-auto">
          <label htmlFor="verificationCode" className={'text-center text-xl text-lightText dark:text-darkText'}>
            Ingrese el codigo de 6 digitos que recibiste por email
          </label>
          <div className="flex w-full justify-center">
            <div className="my-5 flex h-full w-11/12 justify-between gap-2 xs:h-[57px] xs:gap-1 sm:h-[65.33px] md:h-[52px] md:w-7/12 lg:w-full xl:w-8/12 2xl:w-6/12">
              {[...Array(6)].map((_, index) => (
                <>
                  <div
                    className={clsx(
                      `w-[50px] rounded-full border-[0.5px] border-buttonsLigth p-[3px] dark:border-darkText xs:w-[57px] sm:w-full`,
                    )}
                  >
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      disabled={isLocked || loading}
                      className={clsx(
                        'h-full w-full rounded-full border-0 text-center text-base focus:outline-none dark:border-[0.5px] dark:bg-lightText sm:text-[2.5rem] lg:text-2xl',
                        errors.verificationCode ? 'border-red-500' : '',
                      )}
                      {...register(`verificationCode.${index}`)}
                      onChange={(event) => handleInputChange(index, event)}
                      onKeyDown={(event) => handleInputKeyDown(index, event)}
                    />
                  </div>
                  {index < 5 && (
                    <div className="hidden min-h-full min-w-[0.5rem] items-center justify-center xs:flex">
                      <div className="h-[2px] w-full flex-1 bg-buttonsLigth dark:bg-darkText"></div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>

          {errors.verificationCode && <p className="mb-5 text-sm text-red-500">• {errors.verificationCode.message}</p>}
          <div>
            {attempts > 0 && !isLocked ? (
              <p className="mt-2 text-center text-base text-buttonsLigth dark:text-darkText sm:text-lg">
                Tienes {attempts} intentos para reenviar el código
              </p>
            ) : (
              <p className="mt-2 text-center text-base text-red-500">Estás bloqueado por 5 minutos.</p>
            )}
          </div>
          <div className="my-5 flex justify-evenly text-buttonsLigth dark:text-darkText">
            <button
              onClick={toggle}
              className={`${
                isDark ? 'buttonSecondDark' : 'buttonSecond'
              } group relative m-1 flex h-[42px] min-w-[150px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent xs:min-w-[150px]`}
            >
              <div className="relative h-5 w-5 overflow-hidden">
                <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
                  <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
                </div>
              </div>
              <p className="inline-block">Volver</p>
            </button>

            <button
              type="button"
              onClick={resendCode}
              disabled={timer > 0 || reLoading || !!isLocked}
              className={`dark:hover:bg- relative m-1 flex h-[42px] min-w-[150px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth disabled:border-gray-400 disabled:bg-gray-400 disabled:shadow-none dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-gray-400 ${isDark ? 'buttonSecondDark' : 'buttonSecond'}${timer > 0 || attempts <= 0 ? 'text-gray-500' : ''}`}
            >
              {reLoading ? (
                'Enviando...'
              ) : timer > 0 && attempts > 0 ? (
                `Reenviar en ${timer}s`
              ) : (
                <p>
                  Reenviar <span className="hidden xs:inline-block">código</span>
                </p>
              )}
            </button>
          </div>

          <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={openModal}>
            Abrir Modal
          </button>
        </form>
      </div>
      <Modal1 isDark={isDark} isOpen={isModalOpen} onClose={closeModal} title="modal 1"></Modal1>
      {/* <Modal2 isDark={isDark} isOpen={isModalOpen} onClose={closeModal} title="modal 2"></Modal2> */}
      {/* <Modal3 isDark={isDark} isOpen={isModalOpen} onClose={closeModal} title="modal 3"></Modal3> */}
      {/* <Modal4 isDark={isDark} isOpen={isModalOpen} onClose={closeModal} title="modal 4"></Modal4> */}
    </div>
  );
};

export default VerifycodeEditRequest;
