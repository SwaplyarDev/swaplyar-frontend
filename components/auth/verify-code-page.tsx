'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { login } from '@/actions/auth/login';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import useEmailVerificationStore from '@/store/emailVerificationStore';
import { useRouter } from 'next/navigation';
import useCodeVerificationStore from '@/store/codeVerificationStore';
import useStore from '@/store/authViewStore';
import userInfoStore from '@/store/userInfoStore';
import { registerUser } from '@/actions/auth/register';
import ButtonBack from '../ui/ButtonBack/ButtonBack';
import AuthTitle from './AuthTitle';
import AuthButton from './AuthButton';
import { VerificationCodeInput } from '@/components/ui/VerificationCodeInput/VerificationCodeInput';

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
  const [timer, setTimer] = useState(60);
  //condicional para disparar el temporizador
  const [startTimer, setStartTimer] = useState(true);

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
          return;
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

  const verificationCodeValues = watch('verificationCode');
  const isCodeComplete = verificationCodeValues?.join('').length === 6;


  return (
    <div className="flex h-full my-[60px] md:mt-[120px] md:mb-[80px] lg:mt-[150px] lg:mb-[250px] flex-col items-center justify-start">
      <form
        onSubmit={handleSubmit(verifyCode)}
        className="flex w-[356px] md:w-[430px] lg:w-[484px] px-2 py-5 flex-col gap-2 rounded-2xl font-textFont bg-custom-whiteD-500 shadow-md dark:bg-calculatorDark"
      >
        <AuthTitle >Iniciar Sesión</AuthTitle>

        <label htmlFor="verificationCode" className={'my-2 flex flex-col text-center text-lightText dark:text-darkText'}>
          Se envió un código de verificación a
          <span className="font-bold">{email}</span>
        </label>

        <div className='relative'>
          <span className='w-full flex justify-center items-center mb-4'>Ingrese el código de verificación</span>

          <VerificationCodeInput
            register={register}
            watch={watch}
            setValue={setValue}
            onComplete={async () => {
              await handleSubmit(verifyCode)();
            }}
            isDisabled={isLocked || loading}
            isLoading={loading}
            error={errors.verificationCode ? errors.verificationCode.message : undefined}
            isDark={isDark}
            clearErrors={() => clearErrors('verificationCode')}
            className="h-[46px] md:h-[56px] lg:h-[58px] gap-[6px] md:gap-[10px] lg:gap-4"
          />

          {errors.verificationCode && <p className="relative w-full text-center my-4 text-sm text-red-500">• {errors.verificationCode.message}</p>}
        </div>


        <div className="flex justify-end mt-4 mr-1">
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

        <div className="my-3 flex justify-between items-center w-full">
          <div className="flex justify-start">
            <ButtonBack route="/es/iniciar-sesion" isDark={isDark} />
          </div>
          <div className="flex justify-end">
            <AuthButton
              label="Confirmar"
              disabled={!isCodeComplete || loading}
              loading={loading}
              isDark={isDark}
              className="px-4 w-[220px] xs:w-[250px]"
            />
          </div>
        </div>



        {(attempts > 0 && attempts !== 3 && !reLoading) ? (
          <div className='relative'>
            <p className="relative w-full text-center text-sm dark:text-darkText">
              Tienes {attempts} {attempts === 1 ? 'intento' : 'intentos'} para reenviar el código
            </p>
          </div>
        ) : (
          <span className='text-sm w-full flex justify-center items-center'>Ingrese el código de verificación</span>
        )}
        {isLocked && (
          <div className='relative'>
            <p className="relative w-full text-center text-base text-red-500">Estás bloqueado por 5 minutos.</p>
          </div>
        )}
      </form>
    </div>
  );
};