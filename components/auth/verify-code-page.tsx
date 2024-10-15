'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect, ChangeEvent } from 'react';
import { login } from '@/actions/auth/login';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import useEmailVerificationStore from '@/store/emailVerificationStore';
import { useRouter } from 'next/navigation';
import Arrow from '../ui/Arrow/Arrow';

type FormInputs = {
  verificationCode: string[];
};

const BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:8080/api';

export const VerifyCodePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm<FormInputs>({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(10);
  const [reLoading, setReLoading] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const { email } = useEmailVerificationStore();
  const { isDark } = useDarkTheme();
  const router = useRouter();

  useEffect(() => {
    if (email === '') {
      router.push('/auth/login-register');
    }
    let interval: NodeJS.Timeout | undefined;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, email, router]);

  const verifyCode: SubmitHandler<FormInputs> = async ({
    verificationCode,
  }) => {
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
      const result = await login(email || '', code);
      if (!result.ok) {
        setError('verificationCode', {
          type: 'manual',
          message: 'El código ingresado es incorrecto.',
        });
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
    if (timer === 0) {
      setReLoading(true);
      try {
        await fetch(`${BASE_URL}/v1/login/email/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        setTimer(10);
        setAttempts((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      } catch (error) {
        console.error('Error al reenviar el código:', error);
      } finally {
        setReLoading(false);
      }
    }
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    if (/^\d*$/.test(value)) {
      clearErrors('verificationCode');
      const newVerificationCode = [
        ...(watch('verificationCode') || ([] as string[])),
      ];
      newVerificationCode[index] = value;
      setValue('verificationCode', newVerificationCode);

      // Si el valor tiene un dígito, enfocar el siguiente input
      if (value.length === 1 && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }

      // Autoverificación si todos los campos están llenos
      if (newVerificationCode.every((code) => code.length === 1)) {
        handleSubmit(verifyCode)(); // Llamar a la función de verificación automáticamente
      }
    }
  };

  const handleInputKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && event.currentTarget.value === '') {
      if (index > 0) {
        const prevInput = document.getElementById(`code-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  return (
    <div className="my-5 flex h-full min-h-[800px] flex-col items-center justify-start py-5 xs:mt-0 xs:justify-center">
      <form
        onSubmit={handleSubmit(verifyCode)} // Esta línea se mantiene pero el botón de verificación se elimina
        className="flex w-full max-w-xl flex-col rounded-2xl bg-[#e6e8ef62] p-8 shadow-md dark:bg-calculatorDark"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-buttonsLigth dark:text-darkText">
          Verificar Código
        </h2>

        <label
          htmlFor="verificationCode"
          className={clsx(
            errors.verificationCode
              ? 'text-red-500'
              : 'text-lightText dark:text-darkText',
            'mb-8 text-center',
          )}
        >
          Si tienes una cuenta, te hemos enviado un código a {email}.
          Introdúcelo a continuación
        </label>

        <div className="mb-5 flex justify-between">
          {[...Array(6)].map((_, index) => (
            <>
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                className={clsx(
                  'h-16 w-16 rounded-full border text-center text-xl dark:bg-lightText',
                  errors.verificationCode
                    ? 'border-red-500'
                    : 'hover:border-blue-600 dark:hover:border-white',
                )}
                {...register(`verificationCode.${index}`)} // Registro correcto aquí
                onChange={(event) => handleInputChange(index, event)} // Manejador de cambios
                onKeyDown={(event) => handleInputKeyDown(index, event)}
              />
              {index < 5 && (
                <div className="flex min-h-full min-w-[0.7rem] items-center justify-center">
                  <div className="h-[1px] w-full flex-1 bg-buttonsLigth dark:bg-darkText"></div>
                </div>
              )}
            </>
          ))}
        </div>

        {errors.verificationCode && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.verificationCode.message}
          </p>
        )}

        <div className="my-5 flex justify-between text-buttonsLigth dark:text-darkText">
          <button
            onClick={() => router.push('/auth/login-register')}
            className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 flex h-[48px] min-w-[150px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
          >
            <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
            Volver
          </button>
          <button
            onClick={resendCode}
            disabled={timer > 0 || reLoading || attempts <= 0}
            className={`dark:hover:bg- relative m-1 h-[48px] min-w-[150px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth disabled:border-gray-400 disabled:bg-gray-400 disabled:shadow-none dark:border-darkText dark:bg-darkText dark:text-lightText dark:disabled:bg-gray-400 ${isDark ? 'buttonSecondDark' : 'buttonSecond'} ${timer > 0 || attempts <= 0 ? 'text-gray-500' : ''}`}
          >
            {reLoading
              ? 'Enviando...'
              : timer > 0
                ? `Reenviar en ${timer}s`
                : 'Reenviar código'}
          </button>
        </div>
        <p className="w-full text-center">
          {attempts <= 0
            ? 'Máximo de intentos alcanzados.'
            : `Te quedan ${attempts} intentos.`}
        </p>
      </form>
    </div>
  );
};
