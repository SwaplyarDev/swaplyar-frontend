'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import InputField from './InputField';
import { FormValues } from '@/types/data';
import { useDarkTheme } from '../theme-Provider/themeProvider';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/api';

const ContactForm = () => {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      Nombre: session?.user?.name.split(' ')[0] || '',
      Apellido: session?.user?.name.split(' ')[1] || '',
      email: session?.user?.email || '',
    },
  });

  const [loading, setLoading] = useState(false);
  const { isDark } = useDarkTheme();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    console.log(data);
    console.log('nombre', data.Nombre);
    console.log('email', data.email);
    console.log('message', data.message);
    console.log('apellido', data.Apellido);
    try {
      const response = await fetch(`${BASE_URL}/v1/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.Nombre,
          lastname: data.Apellido,
          email: data.email,
          message: data.message,
          user_id: '-',
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
      <div className="rounded-2xl bg-[#e6e8ef62] p-8 dark:bg-calculatorDark mb-5">
        <h4 className="mb-7 text-xl font-semibold">Contáctanos</h4>
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="Nombre"
              className={clsx(
                'ml-1 text-xs hidden',
                errors.Nombre
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Nombre
            </label>
            <InputField
              id="Nombre"
              type="text"
              placeholder="Nombre completo"
              register={register('Nombre', {
                required: 'El Nombre es obligatorio',
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                  message: 'El Nombre solo puede contener letras y espacios',
                },
              })}
              error={
                errors.Nombre && errors.Nombre.message
              }
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="Apellido"
              className={clsx(
                'ml-1 text-xs hidden',
                errors.Apellido
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Apellido
            </label>
            <InputField
              id="Apellido"
              type="text"
              placeholder="Apellido completo"
              register={register('Apellido', {
                required: 'El Apellido es obligatorio',
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                  message: 'El Apellido solo puede contener letras y espacios',
                },
              })}
              error={errors.Apellido && errors.Apellido.message}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className={clsx(
                'ml-1 text-xs hidden',
                errors.email
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Email
            </label>
            <InputField
              id="email"
              type="email"
              placeholder="Email"
              register={register('email', {
                required: 'El Email es obligatorio',
                pattern: {
                  // value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: 'El formato del Email es inválido',
                },
              })}
              error={errors.email && errors.email.message}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-full flex-col">
            <label
              htmlFor="message"
              className={clsx(
                'ml-1 text-xs hidden',
                errors.message
                  ? 'text-red-500'
                  : 'text-lightText dark:text-darkText',
              )}
            >
              Nota
            </label>
            <textarea
              {...register('message', { required: true })}
              id="message"
              placeholder="Mensaje"
              className={clsx(
                'h-full w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                errors.message
                  ? 'border-red-500'
                  : 'hover:border-blue-600 dark:hover:border-white',
              )}
            ></textarea>
            {errors.message && <p className="text-sm text-red-500">Este campo es obligatorio</p>}
          </div>
        </div>
      </div>
        {/* <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="Nombre"
                className={clsx(
                  'hidden',
                  errors.Nombre
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Nombre
              </label>
              <InputField
                id="Nombre"
                type="text"
                placeholder="Nombre completo"
                register={register('Nombre', { required: true })}
                error={errors.Nombre && 'Este campo es obligatorio'}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="Apellido"
                className={clsx(
                  'hidden',
                  errors.Apellido
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Apellido
              </label>
              <InputField
                id="Apellido"
                type="text"
                placeholder="Apellido Completo"
                register={register('Apellido', { required: true })}
                error={errors.Apellido && 'Este campo es obligatorio'}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className={clsx(
                  'hidden',
                  errors.email
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Email
              </label>
              <InputField
                id="email"
                type="email"
                placeholder="Email"
                register={register('email', { required: true })}
                error={errors.email && 'Este campo es obligatorio'}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col">
              <label
                htmlFor="message"
                className={clsx(
                  'hidden',
                  errors.message
                    ? 'text-red-500'
                    : 'text-lightText dark:text-darkText',
                )}
              >
                Nota (opcional)
              </label>
              <textarea
                {...register('message', { required: true })}
                id="message"
                rows={7}
                placeholder="Mensaje"
                className={clsx(
                  'h-full w-full rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
                  errors.message
                    ? 'border-red-500'
                    : 'hover:border-blue-600 dark:hover:border-white',
                )}
              ></textarea>
              {errors.message && (
                <p className="text-sm text-red-500">
                  Este campo es obligatorio
                </p>
              )}
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className={`dark:hover:bg- relative m-1 h-[48px] w-[200px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText xs:w-[330px] ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              {/* <Image
                    src="/gif/cargando.gif"
                    width={20}
                    height={20}
                    alt="loading"
                    className="mb-0.5 mr-1"
                  /> */}
              <LoadingGif color={isDark ? '#012c8a' : '#ebe7e0'} />
              Enviando...
            </div>
          ) : (
            'Enviar Mensaje'
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
