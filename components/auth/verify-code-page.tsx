'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect, ChangeEvent } from 'react';
import { login } from '@/actions/auth/login';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import useEmailVerificationStore from '@/store/emailVerificationStore';
import { useRouter } from 'next/navigation';
import useCodeVerificationStore from '@/store/codeVerificationStore';
import useStore from '@/store/authViewStore';
import userInfoStore from '@/store/userInfoStore';
import { registerUser } from '@/actions/auth/register';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import ButtonBack from '../ui/ButtonBack/ButtonBack';

type FormInputs = {
  verificationCode: string[];
};
 
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const VerifyCodePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      verificationCode: Array(6).fill(''),
    },
  });

  const [loading, setLoading] = useState(false);
  const [reLoading, setReLoading] = useState(false);
  const { email } = useEmailVerificationStore();
  const { isDark } = useDarkTheme();
  const router = useRouter();
  const { view } = useStore();
  const { user, userVerification } = userInfoStore();

  const { attempts, lockUntil, decrementAttempts, setLockUntil, resetAttempts } = useCodeVerificationStore();

  const isLocked = lockUntil && lockUntil > Date.now();
  //empieza en 0 para que el temporizador no inicie automaticamente
  const [timer, setTimer] = useState(0);
  //condicional para disparar el temporizador
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('verificationEmail');
    if (!email && storedEmail) {
      useEmailVerificationStore.getState().setEmail(storedEmail);
    } else if (!email && !storedEmail) {
      router.push('/es/iniciar-sesion');
    }

    if (isLocked) {
      const timer = setTimeout(() => {
        setLockUntil(null);
        resetAttempts();
      }, lockUntil - Date.now());
      return () => clearTimeout(timer);
    }
  }, [email, router, isLocked, lockUntil, setLockUntil, resetAttempts]);

  //el useEffect inicia el temporizador cuando startTimer cambia
  useEffect(() => {
    if (startTimer && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, startTimer]);

  const verifyCode: SubmitHandler<FormInputs> = async ({ verificationCode }) => {
    setLoading(true);
    // Inicia el contador al confirmar
    if (!startTimer) {
      setTimer(60);
      setStartTimer(true);
    }
    const code = verificationCode.join('');

    if (code.length !== 6 || !/^\d+$/.test(code)) {
      setError('verificationCode', {
        type: 'manual',
        message: 'El código debe ser un número de 6 dígitos.',
      });
      setLoading(false);
      return;
    }

    const emailToUse = userVerification?.email || email || localStorage.getItem('verificationEmail');

    if (!emailToUse) {
      setError('verificationCode', {
        type: 'manual',
        message: 'Falta el correo electrónico. No se puede verificar el código.',
      });
      setLoading(false);
      return;
    }

    try {
      let result: { ok: boolean; message?: any } = { ok: false };

      if (view === 'login') {
        result = await login(emailToUse, code);
      } else if (view === 'register') {
        result = await registerUser(emailToUse, code);
      }
      console.log('Verification result en verify-code-page:', result);
      if (!result.ok) {
        const errorMessage = typeof result.message === 'string' ? result.message : 'El código ingresado es incorrecto o ha expirado.';
       const cleanMessage = errorMessage.replace(/Read more at.*$/, '').trim();
        setError('verificationCode', {
          type: 'manual',
          message: cleanMessage,
        });
        clearVerificationInputs();
      } else {
        localStorage.removeItem('verificationEmail');
        try {
          const res = await fetch('/api/auth/session', { cache: 'no-store' });
          const session = await res.json();
          const role = session?.user?.role;
          const target = role === 'admin' ? '/es/admin/transactions' : '/es/auth/solicitud';
          window.location.href = target;
        } catch {
          window.location.href = '/es/auth/solicitud';
        }
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
      let bodyData;
      if (email) {
        URL_VERIFICATION = 'login/email/send';
        bodyData = {
          email: email,
        };
      }
      // Lógica comentada original
      // if (userVerification?.email) {
      //   URL_VERIFICATION = 'users/email-validation/send';
      //   bodyData = {
      //     email: email,
      //     ...(userVerification?.email && { email: userVerification.email }),
      //   };
      // }
      try {
        await fetch(`${BASE_URL}/${URL_VERIFICATION}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData),
        });
        decrementAttempts();
        setTimer(60);
        if (attempts <= 1) {
          setLockUntil(Date.now() + 5 * 60 * 1000);
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

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    clearErrors('verificationCode');
    const pastedData = event.clipboardData.getData('text').replace(/\s/g, '');
    const characters = pastedData.slice(0, 6).split('');

    characters.forEach((char, i) => {
      if (i < 6) {
        setValue(`verificationCode.${i}`, char);
      }
    });
  };

  const verificationCodeValues = watch('verificationCode');
  const isCodeComplete = verificationCodeValues.join('').length === 6;

  return (
    <div className="my-5 flex h-full min-h-[800px] flex-col items-center justify-start py-5 xs:mt-0 xs:justify-center">
      <AnimatedBlurredCircles tope="top-[124px]" />
      <div className="w-full max-w-xl px-5">
        <form
          onSubmit={handleSubmit(verifyCode)}
          className="flex w-full max-w-xl flex-col rounded-2xl bg-[#e6e8ef62] px-2 py-8 shadow-md dark:bg-calculatorDark sm:px-8"
        >
          <h2 className="mb-5 text-center text-5xl font-bold text-buttonsLigth dark:text-darkText">Verificación</h2>

          <label htmlFor="verificationCode" className={'mb-8 text-center text-lightText dark:text-darkText'}>
            Si tienes una cuenta, te hemos enviado un código a <span className="font-bold">{email}</span>. Introdúcelo a
            continuación
          </label>

          <div className="mb-5 flex h-[46px] justify-between gap-2 xs:h-[57px] xs:gap-1 sm:h-[65.33px]">
            {[...Array(6)].map((_, index) => (
              <>
                <div
                  className={clsx(
                    `w-[46px] rounded-full border-[0.5px] border-buttonsLigth p-[3px] dark:border-darkText xs:w-[57px] sm:w-full`,
                  )}
                >
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    disabled={isLocked || loading}
                    className={clsx(
                      'h-full w-full rounded-full border-0 text-center text-base focus:outline-none dark:border-[0.5px] dark:bg-lightText sm:text-[2.5rem]',
                      errors.verificationCode ? 'border-red-500' : '',
                    )}
                    {...register(`verificationCode.${index}`)}
                    onPaste={handlePaste}
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

          {errors.verificationCode && <p className="mb-5 text-sm text-red-500">• {errors.verificationCode.message}</p>}

          <div className="my-5 flex items-center justify-between">
            <ButtonBack route="/es/iniciar-sesion" isDark={isDark} />
            <button
              type="submit"
              disabled={!isCodeComplete || loading}
              className={`dark:hover:bg- relative m-1 h-[48px] min-w-[150px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white transition-colors duration-300 hover:bg-buttonsLigth disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400 disabled:shadow-none dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-gray-400 ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingGif color={isDark ? '#ebe7e0' : '#FFFFFF'} />
                  Confirmando...
                </div>
              ) : (
                'Confirmar'
              )}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p
              onClick={timer === 0 && !reLoading && !isLocked ? resendCode : undefined}
              className={clsx('text-buttonsLigth dark:text-darkText', {
                'cursor-pointer hover:underline': timer === 0 && !reLoading && !isLocked,
                'cursor-not-allowed text-gray-500 dark:text-gray-400': timer > 0 || reLoading || isLocked,
              })}
            >
              {reLoading ? 'Enviando...' : timer > 0 ? `Reenviar en ${timer}s` : 'Reenviar código'}
            </p>
          </div>

          {attempts > 0 && !isLocked ? (
            <p className="mt-2 text-center text-base text-buttonsLigth dark:text-darkText sm:text-lg">
              Tienes {attempts} {attempts === 1 ? 'intento' : 'intentos'} para reenviar el código
            </p>
          ) : (
            <p className="mt-2 text-center text-base text-red-500">Estás bloqueado por 5 minutos.</p>
          )}
        </form>
      </div>
    </div>
  );
};
