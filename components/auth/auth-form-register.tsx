'use client';

import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { registerUser } from '@/actions/auth/register';
import { signIn } from 'next-auth/react';
import useStore from '@/store/authViewStore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from 'next/link';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  rememberMe: boolean;
  termsConditions: boolean;
  verificationCode: string;
};

const BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:8080/api/v1';

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { isDark } = useDarkTheme();
  const [codeSent, setCodeSent] = useState(false);
  const [useEmail, setUseEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInputs>();

  const { setView } = useStore();
  const handleChange = () => {
    setView('login');
  };

  const sendCode = async (email: string) => {
    setLoading(true);
    try {
      // Llamar a la API que envía el código al email
      const response = await fetch(`${BASE_URL}/register/email/send`, {
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

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    setLoading(true);
    const {
      firstName,
      lastName,
      email,
      rememberMe,
      termsConditions,
    } = data;
    const name = `${firstName} ${lastName}`;

    localStorage.setItem('rememberMe', JSON.stringify(rememberMe));

    const resp = await registerUser(name, email, termsConditions);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      setLoading(false);
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      rememberMe: toString(),
      termsConditions: toString(),
    });

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      window.location.replace('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="my-5 flex h-full min-h-[800px] flex-col items-center justify-center py-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full max-w-lg flex-col rounded-2xl bg-[#e6e8ef62] p-8 shadow-md dark:bg-calculatorDark"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-buttonsLigth dark:text-darkText">
          Crear Cuenta
        </h2>

        <div className="flex flex-col justify-between xs:flex-row">
          <div className="flex flex-col xs:max-w-48">
            <label
              htmlFor="firstName"
              className={clsx(
                errors.firstName
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Nombre
            </label>
            <input
              id="firstName"
              className={clsx(
                'max-w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                errors.firstName
                  ? 'mb-0 border-red-500'
                  : 'mb-5 hover:border-blue-600 dark:hover:border-white',
              )}
              type="text"
              {...register('firstName', {
                required: 'El nombre es obligatorio',
              })}
            />
            {errors.firstName && (
              <p className="mb-5 text-sm text-red-500">
                • {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col xs:max-w-48">
            <label
              htmlFor="lastName"
              className={clsx(
                errors.lastName
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Apellido
            </label>
            <input
              id="lastName"
              className={clsx(
                'max-w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                errors.lastName
                  ? 'mb-0 border-red-500'
                  : 'mb-5 hover:border-blue-600 dark:hover:border-white',
              )}
              type="text"
              {...register('lastName', {
                required: 'El apellido es obligatorio',
              })}
            />
            {errors.lastName && (
              <p className="mb-5 text-sm text-red-500">
                • {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <label
          htmlFor="email"
          className={clsx(
            errors.email ? 'text-red-500' : 'text-lightText dark:text-darkText',
          )}
        >
          Correo electrónico
        </label>
        <input
          id="email"
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
        />
        {errors.email && (
          <p className="mb-5 text-sm text-red-500">• {errors.email.message}</p>
        )}

        <div className="mb-5 flex items-center">
          <input
            id="rememberMeRegister"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 hover:cursor-pointer hover:border-blue-600 dark:border-gray-600 dark:bg-lightText dark:ring-blue-500 dark:hover:border-white"
            {...register('rememberMe')}
          />
          <label htmlFor="rememberMe" className="ml-2">
            Recordar esta cuenta
          </label>
        </div>

        <div className="mb-5 flex items-center">
          <input
            id="termsConditions"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 hover:cursor-pointer hover:border-blue-600 dark:border-gray-600 dark:bg-lightText dark:ring-blue-500 dark:hover:border-white"
            {...register('termsConditions')}
          />
          <label htmlFor="termsConditions" className="ml-2">
            <Link href="/info/terms-and-conditions" className="underline">
              Acepto Términos & Condiciones
            </Link>
          </label>
        </div>

        {errorMessage && (
          <div className="mb-5 flex w-full rounded border-2 border-red-500 bg-transparent p-4">
            <ErrorOutlineIcon className="text-red-500" />
            <div className="ml-2">
              <p className="text-base text-red-500">Error</p>
              <p className="text-sm font-light text-red-500">{errorMessage}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
          disabled={loading}
        >
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-buttonsLigth dark:border-darkText"></div>
          <div className="px-2 text-buttonsLigth dark:text-darkText">O</div>
          <div className="flex-1 border-t border-buttonsLigth dark:border-darkText"></div>
        </div>

        <button
          onClick={handleChange}
          className={`dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
          type="button"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};
