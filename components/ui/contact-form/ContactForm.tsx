'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import InputField from './InputField';
import { FormValues } from '@/types/data';
import { useDarkTheme } from '../theme-Provider/themeProvider';
import clsx from 'clsx';

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/api';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const { isDark } = useDarkTheme();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    // console.log(data);
    // console.log('nombre', data.Nombre);
    // console.log('email', data.email);
    // console.log('message', data.message);
    // console.log('apellido', data.Apellido);
    try {
      const response = await fetch(`${BASE_URL}/v1/contacts`, {
        method: 'POST',
        body: JSON.stringify({
          name: data.Nombre,
          lastname: data.Apellido,
          email: data.email,
          message: data.message,
          user_id: "-",
        }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('¡Gracias! su Mensaje se envió exitosamente.');
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error!', error.message);
      } else {
        console.error('An unexpected error occurred', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h4 className="text-xl font-semibold">Contáctanos</h4>

      <InputField
        id="Nombre"
        placeholder="Nombre completo"
        register={register('Nombre', { required: true })}
        error={errors.Nombre && 'Este campo es obligatorio'}
      />

      <InputField
        id="Apellido"
        placeholder="Apellido Completo"
        register={register('Apellido', { required: true })}
        error={errors.Apellido && 'Este campo es obligatorio'}
      />

      <InputField
        id="email"
        type="email"
        placeholder="Email"
        register={register('email', { required: true })}
        error={errors.email && 'Este campo es obligatorio'}
      />

      <div className="flex flex-col">
        <textarea
          {...register('message', { required: true })}
          id="message"
          rows={7}
          placeholder="Mensaje"
          className={clsx(
            'max-w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
            errors.message
              ? 'border-red-500'
              : 'hover:border-blue-600 dark:hover:border-white',
          )}
        ></textarea>
        {errors.message && (
          <p className="text-sm text-red-500">Este campo es obligatorio</p>
        )}
      </div>

      <button
        type="submit"
        className={`dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
      >
        {loading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>

      {loading && (
        <div id="loading" className="flex justify-center">
          <Image
            src="/gif/cargando.gif"
            alt="Cargando..."
            width={50}
            height={50}
          />
        </div>
      )}
    </form>
  );
};

export default ContactForm;
