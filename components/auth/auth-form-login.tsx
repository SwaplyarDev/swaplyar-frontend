'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import useStore from '@/store/authViewStore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type FormInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInputs>({
    mode: 'onBlur', // Para validar al salir del campo
  });
  const { view, setView } = useStore();
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    const { email, password } = data;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col rounded bg-white p-8 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Iniciar Sesión
        </h2>

        <label
          htmlFor="email"
          className={clsx(
            errors.email ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Correo electrónico
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.email ? 'border-red-500 mb-0' : 'mb-5 hover:border-blue-600',
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
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Contraseña
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.password ? 'border-red-500 mb-0' : 'mb-5 hover:border-blue-600',
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

        {authState === 'CredentialsSignin' && (
          <div className="mb-5 flex w-full max-w-sm rounded border-2 border-red-500 bg-transparent p-4">
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
          className="btn-secondary text-center btnAuthForm"
          type="button"
        >
          Crear una nueva cuenta
        </button>
      </form>
    </div>
  );
};

function LoginButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
        'btnAuthForm': true,
      })}
      disabled={pending}
    >
      {pending ? 'Ingresando...' : 'Ingresar'}
    </button>
  );
}
