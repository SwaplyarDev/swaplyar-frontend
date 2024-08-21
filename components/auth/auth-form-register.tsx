'use client';

import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { registerUser } from '@/actions/auth/register';
import { signIn } from 'next-auth/react';
import useStore from '@/store/authViewStore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInputs>();

  const { view, setView } = useStore();
  const handleChange = () => {
    setView('login');
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    setLoading(true);
    const { firstName, lastName, email, password, rememberMe } = data;
    const name = `${firstName} ${lastName}`;

    localStorage.setItem('rememberMe', JSON.stringify(rememberMe));

    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      setLoading(false);
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      rememberMe: toString(),
    });

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      window.location.replace('/dashboard');
    }
    setLoading(false);
  };

  const validatePasswordMatch = (value: string) => {
    const password = getValues('password');
    return password === value || 'Las contraseñas no coinciden';
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full max-w-lg flex-col rounded bg-white p-8 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Crear Cuenta
        </h2>

        <div className="flex flex-col justify-between xs:flex-row">
          <div className="flex flex-col xs:max-w-48">
            <label
              htmlFor="firstName"
              className={clsx(
                errors.firstName
                  ? 'text-red-500'
                  : 'text-gray-900 dark:text-gray-300',
              )}
            >
              Nombre
            </label>
            <input
              id="firstName"
              className={clsx(
                'max-w-full rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
                errors.firstName
                  ? 'mb-0 border-red-500'
                  : 'mb-5 hover:border-blue-600',
              )}
              type="text"
              autoFocus
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
                  : 'text-gray-900 dark:text-gray-300',
              )}
            >
              Apellido
            </label>
            <input
              id="lastName"
              className={clsx(
                'max-w-full rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
                errors.lastName
                  ? 'mb-0 border-red-500'
                  : 'mb-5 hover:border-blue-600',
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
            errors.email ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Correo electrónico
        </label>
        <input
          id="email"
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
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
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            className={clsx(
              'w-full rounded border bg-gray-200 px-5 py-2 pr-10 text-gray-900 dark:bg-gray-700 dark:text-white',
              errors.password
                ? 'mb-0 border-red-500'
                : 'mb-5 hover:border-blue-600',
            )}
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 mb-5 flex items-center px-3"
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.password.message}
          </p>
        )}

        <label
          htmlFor="confirmPassword"
          className={clsx(
            errors.confirmPassword
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Repetir contraseña
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            className={clsx(
              'w-full rounded border bg-gray-200 px-5 py-2 pr-10 text-gray-900 dark:bg-gray-700 dark:text-white',
              errors.confirmPassword
                ? 'mb-0 border-red-500'
                : 'mb-5 hover:border-blue-600',
            )}
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', {
              required: 'La confirmación de la contraseña es obligatoria',
              validate: validatePasswordMatch,
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 mb-5 flex items-center px-3"
          >
            {showConfirmPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.confirmPassword.message}
          </p>
        )}

        <div className="mb-5 flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-blue-500 dark:focus:ring-blue-500"
            {...register('rememberMe')}
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 text-gray-900 dark:text-gray-300"
          >
            Recordar esta cuenta
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
          className={clsx({
            'btn-primary': !loading,
            'btn-disabled': loading,
            btnAuthForm: true,
          })}
          disabled={loading}
        >
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800 dark:text-gray-300">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <button
          onClick={handleChange}
          className="btn-secondary btnAuthForm text-center"
          type="button"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};