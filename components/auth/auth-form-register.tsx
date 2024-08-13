// /components/auth/auth-form-register.tsx

'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { registerUser } from '@/actions/auth/register';
import { signIn } from 'next-auth/react';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;

    // Server action
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      window.location.replace('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col rounded bg-white p-8 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Crear Cuenta
        </h2>

        <label htmlFor="name" className="text-gray-900 dark:text-gray-300">
          Nombre completo
        </label>
        <input
          className={clsx(
            'mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            { 'border-red-500': errors.name },
          )}
          type="text"
          autoFocus
          {...register('name', { required: true })}
        />

        <label htmlFor="email" className="text-gray-900 dark:text-gray-300">
          Correo electrónico
        </label>
        <input
          className={clsx(
            'mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            { 'border-red-500': errors.email },
          )}
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />

        <label htmlFor="password" className="text-gray-900 dark:text-gray-300">
          Contraseña
        </label>
        <input
          className={clsx(
            'mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            { 'border-red-500': errors.password },
          )}
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />

        <span className="text-red-500">{errorMessage}</span>

        <button className="btn-primary">Crear cuenta</button>

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800 dark:text-gray-300">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Ingresar
        </Link>
      </form>
    </div>
  );
};
