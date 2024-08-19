// /componente/auth/auth-form-login.tsx

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions/auth/login';
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';
import useStore from '@/store/store';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const { view, setView } = useStore();

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/');
    }
  }, [state]);

  const handleChange = () => {
    setView('register');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <form
        action={dispatch}
        className="flex w-full max-w-sm flex-col rounded bg-white p-8 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Iniciar Sesión
        </h2>

        <label htmlFor="email" className="text-gray-900 dark:text-gray-300">
          Correo electrónico
        </label>
        <input
          className="mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white"
          type="email"
          name="email"
        />

        <label htmlFor="password" className="text-gray-900 dark:text-gray-300">
          Contraseña
        </label>
        <input
          className="mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white"
          type="password"
          name="password"
        />

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state === 'CredentialsSignin' && (
            <div className="mb-2 flex flex-row">
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                Credenciales no son correctas
              </p>
            </div>
          )}
        </div>

        <LoginButton />

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800 dark:text-gray-300">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <button onClick={handleChange} className="btn-secondary text-center" type="button">
          Crear una nueva cuenta
        </button>
      </form>
    </div>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
