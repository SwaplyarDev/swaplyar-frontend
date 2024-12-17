'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputField from './InputField';
import { FormValues } from '@/types/data';
import { useDarkTheme } from '../theme-Provider/themeProvider';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import Swal from 'sweetalert2';
import Tick from '@/components/ui/Tick/Tick';
import { createRoot } from 'react-dom/client';
import Arrow from '@/components/ui/Arrow/Arrow';

const { NEXT_PUBLIC_BACKEND_URL } = process.env;

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

  // <div class="flex w-full items-start justify-start">
  //   <p class="ml-[0.9rem] w-[230px] text-left">
  //     Gracias por tu mensaje, en la brevedad nos pondremos en contacto contigo
  //   </p>
  // </div>;

  const handleSendRequest = () => {
    Swal.fire({
      title: '',
      html: `
        <div class="flex justify-center items-center flex-col gap-4">
          <div id="tick-container" class="flex justify-center items-center h-[100px] w-[100px] rounded-full border-lightText bg-lightText dark:border-darkText dark:bg-darkText"></div>
          <h1 class="text-4xl">Mensaje enviado con éxito</h1>
          <p>Gracias por tu mensaje, en la brevedad nos pondremos en contacto contigo</p>
          <div id="back-button-container"></div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      background: isDark ? 'rgb(69 69 69)' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',

      didRender: () => {
        const tickContainer = document.getElementById('tick-container');
        if (tickContainer) {
          const root = createRoot(tickContainer);
          root.render(<Tick color={isDark ? '#414244' : '#FCFBFA'} size="70px" />);
        }
        const backElement = document.getElementById('back-button-container');
        if (backElement) {
          const root = createRoot(backElement);
          root.render(
            <button
              onClick={() => Swal.close()}
              className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 flex h-[42px] min-w-[110px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-sm text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
            >
              <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} backRequest={true} />
              Volver
            </button>,
          );
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
      <div className="mb-5 rounded-2xl bg-[#e6e8ef62] p-8 dark:bg-calculatorDark">
        <h4 className="mb-7 text-xl font-semibold">Contáctanos</h4>
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="Nombre"
                className={clsx(
                  'ml-1 hidden text-xs',
                  errors.Nombre ? 'text-red-500' : 'text-lightText dark:text-darkText',
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
                error={errors.Nombre && errors.Nombre.message}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="Apellido"
                className={clsx(
                  'ml-1 hidden text-xs',
                  errors.Apellido ? 'text-red-500' : 'text-lightText dark:text-darkText',
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
                  'ml-1 hidden text-xs',
                  errors.email ? 'text-red-500' : 'text-lightText dark:text-darkText',
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
                  'ml-1 hidden text-xs',
                  errors.message ? 'text-red-500' : 'text-lightText dark:text-darkText',
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
                  errors.message ? 'border-red-500' : 'hover:border-blue-600 dark:hover:border-white',
                )}
              ></textarea>
              {errors.message && <p className="text-sm text-red-500">Este campo es obligatorio</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className={`relative m-1 h-[48px] w-[200px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText xs:w-[330px] ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
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
