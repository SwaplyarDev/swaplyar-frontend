'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import useStore from '@/store/authViewStore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from 'next/link';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';

type FormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
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
  const [authState, setAuthState] = useState<string | null>(null);
  const { isDark } = useDarkTheme();
  
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    const { email, password, rememberMe } = data;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        rememberMe,
      });

      if (result?.error) {
        setAuthState('CredentialsSignin');
        setError('email', {
          type: 'manual',
          message: 'Las credenciales son incorrectas',
        });
      } else {
        setAuthState('Success');
        window.location.replace('/');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
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
        onSubmit={handleSubmit(onSubmit)}
        className="dark:bg-calculatorDark flex w-full max-w-lg flex-col rounded-2xl bg-[#e6e8ef62] p-8 shadow-md"
      >
        <h2 className="mb-5 text-center text-2xl font-bold">Iniciar Sesión</h2>

        <label
          htmlFor="email"
          className={clsx(
            errors.email ? 'text-red-500' : 'text-lightText dark:text-darkText',
          )}
        >
          Correo electrónico
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 dark:bg-gray-700',
            errors.email ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
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

        <label
          htmlFor="password"
          className={clsx(
            errors.password
              ? 'text-red-500'
              : 'text-lightText dark:text-darkText',
          )}
        >
          Contraseña
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 dark:bg-gray-700',
            errors.password
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="password"
          {...register('password', {
            required: 'La contraseña es obligatoria',
          })}
        />
        {errors.password && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.password.message}
          </p>
        )}

        <div className="mb-5 flex items-center">
          <input
            id="rememberMeLogin"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 hover:cursor-pointer focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-blue-500 dark:focus:ring-blue-500"
            {...register('rememberMe')}
          />
          <label htmlFor="rememberMe" className="ml-2">
            Recordar esta cuenta
          </label>
        </div>
        <Link href={'/auth/forgot-password'} className="mb-5 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>

        {authState === 'CredentialsSignin' && (
          <div className="mb-5 flex w-full rounded border-2 border-red-500 bg-transparent p-4">
            <ErrorOutlineIcon className="text-red-500" />
            <div className="ml-2">
              <p className="text-base text-red-500">Error</p>
              <p className="text-sm font-light text-red-500">
                Las credenciales son incorrectas
              </p>
            </div>
          </div>
        )}

        <LoginButton pending={loading} />

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800 dark:text-gray-300">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

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

function LoginButton({ pending }: { pending: boolean }) {
  const { isDark } = useDarkTheme();
  return (
    <button
      type="submit"
      className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 dark:text-darkText text-buttonsLigth hover:bg-transparent dark:border-darkText dark:hover:bg-transparent`}
      disabled={pending}
    >
      {pending ? 'Ingresando...' : 'Ingresar'}
    </button>
  );
}
