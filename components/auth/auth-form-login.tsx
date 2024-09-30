'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import useStore from '@/store/authViewStore';
import { signIn } from 'next-auth/react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from 'next/link';
import clsx from 'clsx';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:8080';

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
  const [email, setEmail] = useState<string | null>(null); // Estado para almacenar el correo del usuario
  const [authState, setAuthState] = useState<string | null>(null);
  const { isDark } = useDarkTheme();

  // Función para manejar el envío del código
  const sendCode = async (email: string) => {
    setLoading(true);
    try {
      // Llamar a la API que envía el código al email
      const response = await fetch(`${BASE_URL}/api/v1/login/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el código.');
      }

    // Simulación de la petición con un retraso
    await new Promise((resolve) => setTimeout(resolve, 1000));


      setCodeSent(true); // Código enviado correctamente
      setEmail(email); // Guardar el correo electrónico
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la verificación del código
  const verifyCode: SubmitHandler<FormInputs> = async ({ verificationCode }) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        verificationCode, // Verificar el código ingresado
      });

      // Simulación de una respuesta exitosa de `signIn`
      // const result = {
      //   error: null, // Simula que no hay error
      //   ok: true,
      // };

      if (result?.error) {
        setAuthState('CodeInvalid');
        setError('verificationCode', {
          type: 'manual',
          message: 'El código es incorrecto.',
        });
      } else {
        setAuthState('Success');
        window.location.replace('/');
      }
    } catch (error) {
      console.error('Error durante la verificación del código:', error);
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
        onSubmit={handleSubmit(codeSent ? verifyCode : ({ email }) => sendCode(email))}
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
          <p className="mb-5 text-gray-600 dark:text-lightText">{email}</p>
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
                minLength: { value: 7, message: 'El código debe tener 7 dígitos' },
                maxLength: { value: 7, message: 'El código debe tener 7 dígitos' },
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

        <Link href={'/auth/forgot-password'} className="mb-5 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>

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

function LoginButton({ pending, codeSent }: { pending: boolean; codeSent: boolean }) {
  const { isDark } = useDarkTheme();
  return (
    <button
      type="submit"
      className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
      disabled={pending}
    >
      {pending
        ? 'Procesando...'
        : codeSent
        ? 'Verificar código'
        : 'Enviar código'}
    </button>
  );
}
