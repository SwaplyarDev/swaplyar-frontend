'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputField from './InputField';
import { FormValues } from '@/types/data';
import { useDarkTheme } from '../theme-Provider/themeProvider';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { PopUp } from '../PopUp/PopUp';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const ContactForm = () => {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
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
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/contacts`, {
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

      // alert('¡Gracias! su Mensaje se envió exitosamente.');
      handleSendRequest();
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

  const handleSendRequest = () =>
    PopUp({
      title: 'Mensaje enviado con éxito',
      text: 'Gracias por tu mensaje, en la brevedad nos pondremos en contacto contigo',
      isDark,
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-10 rounded-2xl px-[15px] py-[13px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] dark:bg-[#323232]">
        <h4 className="font-textFont text-[32px] font-medium text-buttonsLigth dark:text-darkText">Contáctanos</h4>
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="flex w-full flex-col gap-[6px]">
            <div className="flex h-[81px] flex-col">
              <label
                htmlFor="Nombre"
                className={clsx('px-[10px] pb-1 font-titleFont text-xs', 'text-lightText dark:text-darkText')}
              >
                Nombre
              </label>
              <InputField
                id="Nombre"
                type="text"
                placeholder={errors.Nombre ? 'Nombre*' : 'Nombre'}
                register={register('Nombre', {
                  required: 'El Nombre es obligatorio',
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                    message: 'El Nombre solo puede contener letras y espacios',
                  },
                })}
                error={errors.Nombre && errors.Nombre.message}
              />
            </div>
            <div className="flex h-[81px] flex-col">
              <label
                htmlFor="Apellido"
                className={clsx('px-[10px] pb-1 font-titleFont text-xs', 'text-lightText dark:text-darkText')}
              >
                Apellido
              </label>
              <InputField
                id="Apellido"
                type="text"
                placeholder={errors.Apellido ? 'Apellido*' : 'Apellido'}
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
            <div className="flex h-[81px] flex-col">
              <label
                htmlFor="email"
                className={clsx('px-[10px] pb-1 font-titleFont text-xs', 'text-lightText dark:text-darkText')}
              >
                Correo Electrónico
              </label>
              <InputField
                id="email"
                type="email"
                placeholder={errors.email ? 'Correo Electrónico*' : 'Correo Electrónico'}
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
          <div className="flex h-[260px] w-full flex-col gap-4">
            <div className="flex h-full flex-col">
              <label
                htmlFor="message"
                className={clsx('px-[10px] pb-1 font-titleFont text-xs', 'text-lightText dark:text-darkText')}
              >
                Mensaje
              </label>
              <textarea
                {...register('message', { required: true })}
                id="message"
                placeholder={errors.message ? 'Mensaje*' : 'Mensaje'}
                className={clsx(
                  'h-[216px] w-full resize-none rounded-2xl border bg-[#fffff8] px-[9px] py-2 font-titleFont text-lightText dark:bg-darkText',
                  errors.message
                    ? 'border-[#c31818] placeholder:text-[#c31818]'
                    : 'border-buttonExpandDark placeholder:text-buttonExpandDark hover:border-buttonsLigth dark:border-placeholderDark dark:placeholder:text-placeholderDark dark:hover:border-white',
                )}
              ></textarea>
              {errors.message && <p className="px-[10px] pt-1 text-sm text-[#c31818]">Este campo es obligatorio</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {loading ? (
          <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="44px" />
        ) : (
          <button
            disabled={!isValid || loading}
            type="submit"
            className={clsx(
              isDark && isValid
                ? 'buttonSecondDark dark:bg-darkText dark:text-lightText'
                : isValid
                  ? 'buttonSecond'
                  : '',
              'relative flex w-[300px] items-center justify-center rounded-3xl px-[14px] py-3 font-titleFont font-semibold text-[#fffff8]',
              isValid
                ? 'cursor-pointer bg-buttonsLigth'
                : 'cursor-default bg-inputLightDisabled dark:bg-placeholderDark',
            )}
          >
            Enviar Mensaje
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
