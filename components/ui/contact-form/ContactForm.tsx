'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormValues } from '@/types/data';
import { useDarkTheme } from '../theme-Provider/themeProvider';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { PopUp } from '../PopUp/PopUp';
import CustomInput from '@/components/ui/Input/CustomInput';
import TextAreaContact from './TextAreaContact';
import ButtonAuth from '@/components/auth/AuthButton';

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
      Nombre: session?.user?.name?.split(' ')[0] ?? '',
      Apellido: (session?.user?.name ?? '').split(' ')[1] || '',
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
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/contacts`, {
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
        PopUp({
          variant: 'simple-error',
          title: 'Hubo un problema al enviar su mensaje. Por favor, inténtelo de nuevo más tarde.',
          isDark,
        });
      } else {
        console.error('An unexpected error occurred', error);
        PopUp({
          variant: 'simple-error',
          title: 'Hubo un problema al enviar su mensaje. Por favor, inténtelo de nuevo más tarde.',
          isDark,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = () =>
    PopUp({
      variant: 'success-full',
      title: 'Mensaje enviado con Éxito',
      text: 'Recuerde que puede comunicarse por nuestros canales oficiales: <strong>info@swaplyar.com</strong> o <strong>WhatsApp</strong> al <strong>+54 9 387 455 3521</strong>.',
      isHtml: true,
      isDark,
      iconSize: 'medium',
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 rounded-2xl bg-custom-whiteD-100 dark:bg-custom-grayD-900">
      <div className="flex flex-col gap-4 rounded-2xl px-[15px] py-[13px] shadow-md dark:shadow-dark-form dark:bg-[#323232]">
        <h4 className="font-textFont text-[32px] leading-[150%] md:text-4xl font-medium text-buttonsLigth dark:text-darkText">Contáctanos</h4>
        <div className="flex w-full flex-col items-center gap-3 md:flex-row">
          <div className='flex flex-col w-full gap-3'>
          <CustomInput
            label="Nombre"
            name="Nombre"
            placeholder="Nombre"
            register={register}
            validation={{
              required: 'El Nombre es obligatorio',
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                message: 'El Nombre solo puede contener letras y espacios',
              },
            }}
            error={errors.Nombre?.message}
          />
          <CustomInput
            label="Apellido"
            name="Apellido"
            placeholder="Apellido"
            register={register}
            validation={{
              required: 'El Apellido es obligatorio',
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]{1,100}$/i,
                message: 'El Apellido solo puede contener letras y espacios',
              },
            }}
            error={errors.Apellido?.message}
          />
          <CustomInput
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            register={register}
            validation={{
              required: 'El Email es obligatorio',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: 'El formato del Email es inválido',
              },
            }}
            error={errors.email?.message}
          />
          </div>
          <TextAreaContact
            label="Mensaje"
            name="message"
            register={register}
            validation={{ required: 'El mensaje es obligatorio' }}
            error={errors.message?.message}
            rows={6}
          />
        </div>
        <div className="flex justify-center">
          <ButtonAuth
            label="Enviar Mensaje"
            type="submit"
            isDark={isDark}
            loading={loading}
            disabled={!isValid || loading}
            className="w-full md:max-w-[300px]"
            variant="primary"
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;