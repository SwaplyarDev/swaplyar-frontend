// /componente/auth/auth-form-login.tsx

"use client";

import { useEffect } from 'react';
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions/auth/login";
import { IoInformationOutline } from "react-icons/io5";
import clsx from 'clsx';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/');
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <form action={dispatch} className="flex flex-col bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-900 dark:text-white">Iniciar Sesión</h2>

        <label htmlFor="email" className="text-gray-900 dark:text-gray-300">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 dark:bg-gray-700 rounded mb-5 text-gray-900 dark:text-white"
          type="email"
          name="email"
        />

        <label htmlFor="password" className="text-gray-900 dark:text-gray-300">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 dark:bg-gray-700 rounded mb-5 text-gray-900 dark:text-white"
          type="password"
          name="password"
        />

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state === "CredentialsSignin" && (
            <div className="flex flex-row mb-2">
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                Credenciales no son correctas
              </p>
            </div>
          )}
        </div>

        <LoginButton />

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800 dark:text-gray-300">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>
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
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
