// /components/request/requestRegister.tsx

'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { requestRegister } from '@/actions/request/action.requestRegister';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
  const [loading, setLoading] = useState(false); // Add loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    setLoading(true); // Set loading to true when the form is submitted

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

    setLoading(false); // Set loading to false after the request is done

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    // Handle success (e.g., redirect or show a success message)
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-lg flex-col rounded bg-white p-8 shadow-md dark:bg-gray-800"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Formulario de Solicitud de Transferencia Bancaria
        </h2>

        <label
          htmlFor="name"
          className={clsx(
            errors.name ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Nombre
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.name ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('name', { required: 'El nombre es obligatorio' })}
        />
        {errors.name && (
          <p className="mb-5 text-sm text-red-500">• {errors.name.message}</p>
        )}

        <label
          htmlFor="surname"
          className={clsx(
            errors.surname
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Apellido
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.surname
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('surname', { required: 'El apellido es obligatorio' })}
        />
        {errors.surname && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.surname.message}
          </p>
        )}

        <label
          htmlFor="whatsappNumber"
          className={clsx(
            errors.whatsappNumber
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Número de WhatsApp
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.whatsappNumber
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('whatsappNumber', {
            required: 'El número de WhatsApp es obligatorio',
          })}
        />
        {errors.whatsappNumber && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.whatsappNumber.message}
          </p>
        )}

        <label
          htmlFor="cbuAlias"
          className={clsx(
            errors.cbuAlias
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          CBU o Alias
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.cbuAlias
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('cbuAlias', { required: 'CBU o Alias es obligatorio' })}
        />
        {errors.cbuAlias && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.cbuAlias.message}
          </p>
        )}

        <label
          htmlFor="cuil"
          className={clsx(
            errors.cuil ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          CUIL
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.cuil ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('cuil', { required: 'El CUIL es obligatorio' })}
        />
        {errors.cuil && (
          <p className="mb-5 text-sm text-red-500">• {errors.cuil.message}</p>
        )}

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
            errors.email ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          type="email"
          {...register('email', {
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'El formato del correo electrónico es inválido',
            },
          })}
        />
        {errors.email && (
          <p className="mb-5 text-sm text-red-500">• {errors.email.message}</p>
        )}

        <label
          htmlFor="comprobante"
          className={clsx(
            errors.comprobante
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Comprobante
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.comprobante
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="file"
          {...register('comprobante', {
            required: 'El comprobante es obligatorio',
          })}
        />
        {errors.comprobante && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.comprobante.message}
          </p>
        )}

        <label
          htmlFor="note"
          className={clsx(
            errors.note ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Nota
        </label>
        <textarea
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.note ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          {...register('note')}
        ></textarea>
        {errors.note && (
          <p className="mb-5 text-sm text-red-500">• {errors.note.message}</p>
        )}

        {errorMessage && (
          <div className="mb-5 flex w-full max-w-sm rounded border-2 border-red-500 bg-transparent p-4">
            <ErrorOutlineIcon className="text-red-500" />
            <div className="ml-2">
              <p className="text-base text-red-500">Error</p>
              <p className="text-sm font-light text-red-500">{errorMessage}</p>
            </div>
          </div>
        )}

        <SendButton pending={loading} />
      </form>
    </div>
  );
};

function SendButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
        btnAuthForm: true,
      })}
      disabled={pending}
    >
      {pending ? 'Enviando...' : 'Enviar solicitud'}
    </button>
  );
}