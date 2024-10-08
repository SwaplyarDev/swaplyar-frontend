'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react'; // Importa useEffect
import useStore from '@/store/authViewStore';
import { login } from '@/actions/auth/login';
import Image from 'next/image';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import clsx from 'clsx';

const BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:8080/api/v1';

type FormInputs = {
  email: string;
  verificationCode: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInputs>({});
  const { view, setView } = useStore();
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [useEmail, setUseEmail] = useState<string | null>(null);
  const [authState, setAuthState] = useState<string | null>(null);
  const [timer, setTimer] = useState(10); // Estado para el temporizador
  const [attempts, setAttempts] = useState(0); // Intentos de reenvío
  const { isDark } = useDarkTheme();

  useEffect(() => {
    // Manejar el temporizador
    let interval: NodeJS.Timeout | undefined;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      // Reiniciar intentos cuando el temporizador llegue a 0
      setAttempts(0);
    }

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [timer]);

  const sendCode = async (email: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Remover el manejo de errores
      setCodeSent(true);
      setUseEmail(email);
      setAttempts(0); // Reiniciar intentos al enviar el código
      setTimer(10); // Reiniciar el temporizador
    } catch (error) {
      console.error('Error al enviar el código:', error);
      alert('Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const resendCode = () => {
    if (attempts < 3 && timer === 0) {
      // Asegurarse de que el temporizador sea 0
      sendCode(useEmail!); // Volver a enviar el código
      setAttempts((prev) => prev + 1); // Incrementar el número de intentos
      setTimer(10); // Reiniciar el temporizador al reenviar el código
    }
  };

  const verifyCode: SubmitHandler<FormInputs> = async ({
    verificationCode,
  }) => {
    setLoading(true);
    if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
      setError('verificationCode', {
        type: 'manual',
        message: 'El código debe ser un número de 6 dígitos.',
      });
      setLoading(false);
      return;
    }

    try {
      const result = await login(useEmail || '', verificationCode);
      if (!result.ok) {
        setAuthState('CodeInvalid');
        setError('verificationCode', {
          type: 'manual',
          message: 'El código ingresado es incorrecto.',
        });
      } else {
        setAuthState('Success');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error durante la verificación del código:', error);
      alert('Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = () => {
    setView('register');
  };

  return (
    <div className="my-5 flex h-full min-h-[800px] flex-col items-center justify-start py-5 xs:mt-0 xs:justify-center">
      <form
        onSubmit={handleSubmit(
          codeSent ? verifyCode : ({ email }) => sendCode(email),
        )}
        className="flex w-full max-w-lg flex-col rounded-2xl bg-[#e6e8ef62] p-8 shadow-md dark:bg-calculatorDark"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-buttonsLigth dark:text-darkText">
          Iniciar Sesión
        </h2>

        <label
          htmlFor="email"
          className={clsx(
            errors.email ? 'text-red-500' : 'text-lightText dark:text-darkText',
          )}
        >
          Correo electrónico
        </label>
        {codeSent ? (
          <p className="mb-5 text-gray-600 dark:text-lightText">{useEmail}</p>
        ) : (
          <input
            className={clsx(
              'rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
              errors.email
                ? 'mb-0 border-red-500'
                : 'mb-5 hover:border-blue-600 dark:hover:border-white',
            )}
            type="email"
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'El formato del correo electrónico es inválido',
              },
            })}
            disabled={codeSent}
          />
        )}
        {errors.email && (
          <p className="mb-5 text-sm text-red-500">• {errors.email.message}</p>
        )}

        {codeSent && (
          <>
            <label
              htmlFor="verificationCode"
              className={clsx(
                errors.verificationCode
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Código de verificación
            </label>
            <input
              className={clsx(
                'rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                errors.verificationCode
                  ? 'mb-0 border-red-500'
                  : 'mb-5 hover:border-blue-600 dark:hover:border-white',
              )}
              type="text"
              {...register('verificationCode', {
                required: 'El código de verificación es obligatorio',
                minLength: {
                  value: 6,
                  message: 'El código debe tener 6 dígitos',
                },
                maxLength: {
                  value: 6,
                  message: 'El código debe tener 6 dígitos',
                },
              })}
            />
            {errors.verificationCode && (
              <p className="mb-5 text-sm text-red-500">
                • {errors.verificationCode.message}
              </p>
            )}

            {/* Botón para reenviar el código */}
            <button
              type="button"
              onClick={resendCode}
              disabled={attempts >= 3 || timer > 0} // Deshabilitar si se alcanzaron los intentos o si el temporizador no ha llegado a 0
              className={`mt-3 h-10 rounded border border-blue-500 bg-blue-500 text-white hover:bg-blue-600 ${attempts >= 3 || timer > 0 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {attempts < 3
                ? `Reenviar código (${3 - attempts} intentos restantes)`
                : 'Máximo de intentos alcanzado'}
            </button>
            {timer > 0 && (
              <p className="text-sm text-gray-500">
                Esperar {timer} segundos para reenviar el código.
              </p>
            )}
          </>
        )}

        <LoginButton pending={loading} codeSent={codeSent} />

        <button
          onClick={handleChange}
          className={`dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
          type="button"
        >
          Crear una nueva cuenta
        </button>
      </form>
    </div>
  );
};

function LoginButton({
  pending,
  codeSent,
}: {
  pending: boolean;
  codeSent: boolean;
}) {
  const { isDark } = useDarkTheme();
  return (
    <button
      type="submit"
      className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
      disabled={pending} // Desactivar el botón de verificación si está en estado de carga
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <Image
            src="/gif/cargando.gif"
            width={20}
            height={20}
            alt="loading"
            className="mb-0.5 mr-1"
          />
          Procesando...
        </div>
      ) : codeSent ? (
        'Verificar código'
      ) : (
        'Iniciar sesión'
      )}
    </button>
  );
}
