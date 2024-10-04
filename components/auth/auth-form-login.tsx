// /auth-form-login.tsx

'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import useStore from '@/store/authViewStore';
import { signIn } from '@/auth';
import { useRouter } from 'next/navigation';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from 'next/link';
import clsx from 'clsx';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { login } from '@/actions/auth/login';
import Image from 'next/image';

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
  const [useEmail, setUseEmail] = useState<string | null>(null); // Estado para almacenar el correo del usuario
  const [authState, setAuthState] = useState<string | null>(null);
  const { isDark } = useDarkTheme();

  // Función para manejar el envío del código
  const sendCode = async (email: string) => {
    setLoading(true);
    try {
      // Llamar a la API que envía el código al email
      const response = await fetch(`${BASE_URL}/login/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.message ||
          'Error al enviar el código. Por favor, inténtalo de nuevo.';
        throw new Error(errorMessage);
      }

      setCodeSent(true); // Código enviado correctamente
      setUseEmail(email); // Guardar el correo electrónico
    } catch (error) {
      console.error('Error al enviar el código:', error);
      alert(error || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la verificación del código
  const verifyCode: SubmitHandler<FormInputs> = async ({
    verificationCode,
  }) => {
    setLoading(true);

    // Validación simple del código de verificación
    if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
      setError('verificationCode', {
        type: 'manual',
        message: 'El código debe ser un número de 6 dígitos.',
      });
      setLoading(false);
      return;
    }

    try {
      // Llamada a NextAuth usando 'credentials' como el método de inicio de sesión
      // console.log(
      //   `email: ${useEmail}`,
      //   `verificationCode: ${verificationCode}`,
      // );

      const result = await login(useEmail || '', verificationCode);

      if (!result.ok) {
        setAuthState('CodeInvalid');
        setError('verificationCode', {
          type: 'manual',
          message:
            'El código ingresado es incorrecto. Por favor, inténtalo de nuevo.',
        });
      } else {
        setAuthState('Success');
        window.location.href = '/'; 
      }
    } catch (error) {
      console.error('Error durante la verificación del código:', error);
      alert(
        'Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.',
      );
    } finally {
      setLoading(false);
    }
  };

  // Cambiar vista a 'register'
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

        {/* Campo de correo electrónico */}
        <label
          htmlFor="email"
          className={clsx(
            errors.email ? 'text-red-500' : 'text-lightText dark:text-darkText',
          )}
        >
          Correo electrónico
        </label>
        {codeSent ? (
          // Mostrar email como texto si el código fue enviado
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
            disabled={codeSent} // Deshabilitar input si el código ya fue enviado
          />
        )}
        {errors.email && (
          <p className="mb-5 text-sm text-red-500">• {errors.email.message}</p>
        )}

        {/* Campo de código de verificación */}
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
          </>
        )}

        {/* Botón para enviar código o verificarlo */}
        <LoginButton pending={loading} codeSent={codeSent} />

        {/* <Link href={'/auth/forgot-password'} className="mb-5 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link> */}

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
      disabled={pending}
    >
      {pending ? (
        <div className='flex items-center justify-center'>
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
        'Enviar código'
      )}
    </button>
  );
}
