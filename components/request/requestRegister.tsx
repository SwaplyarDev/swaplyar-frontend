// /components/request/requestRegister.tsx

'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { requestRegister } from '@/actions/request/action.requestRegister';

type FormInputs = {
  name: string;
  surname: string;
  whatsappNumber: string;
  cbuAlias: string;
  cuil: string;
  email: string;
  comprobante: FileList;
  note: string;
};

export const RequestRegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const {
      name,
      surname,
      whatsappNumber,
      cbuAlias,
      cuil,
      email,
      comprobante,
      note,
    } = data;

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('whatsappNumber', whatsappNumber);
    formData.append('cbuAlias', cbuAlias);
    formData.append('cuil', cuil);
    formData.append('email', email);
    formData.append('comprobante', comprobante[0]);
    formData.append('note', note);

    // Server action
    const resp = await requestRegister(formData);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col rounded bg-white p-8 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Crear Cuenta
        </h2>

        <label htmlFor="name" className="text-gray-900 dark:text-gray-300">
          Nombre
        </label>
        <input
          className={clsx(
            'mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            { 'border-red-500': errors.name },
          )}
          type="text"
          {...register('name', { required: true })}
        />

        <label htmlFor="surname" className="text-gray-900 dark:text-gray-300">
          Apellido
        </label>
        <input
          className={clsx(
            'mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            { 'border-red-500': errors.surname },
          )}
          type="text"
          {...register('surname', { required: true })}
        />

        <label
          htmlFor="whatsappNumber"
          className="text-gray-900 dark:text-gray-300"
        >
          Número de WhatsApp
        </label>
        <input
          className={clsx(
            'mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            { 'border-red-500': errors.whatsappNumber },
          )}
          type="text"
          {...register('whatsappNumber', { required: true })}
        />

        <label htmlFor="cbuAlias" className="text-gray-900 dark:text-gray-300">
          CBU o Alias
        </label>
        <input
          className={clsx(
            'mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            { 'border-red-500': errors.cbuAlias },
          )}
          type="text"
          {...register('cbuAlias', { required: true })}
        />

        <label htmlFor="cuil" className="text-gray-900 dark:text-gray-300">
          CUIL
        </label>
        <input
          className={clsx(
            'mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            { 'border-red-500': errors.cuil },
          )}
          type="text"
          {...register('cuil', { required: true })}
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

        <label
          htmlFor="comprobante"
          className="text-gray-900 dark:text-gray-300"
        >
          Comprobante
        </label>
        <input
          className={clsx(
            'mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            { 'border-red-500': errors.comprobante },
          )}
          type="file"
          {...register('comprobante', { required: true })}
        />

        <label htmlFor="note" className="text-gray-900 dark:text-gray-300">
          Nota
        </label>
        <textarea
          className={clsx(
            'mb-5 rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            { 'border-red-500': errors.note },
          )}
          {...register('note')}
        ></textarea>

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
