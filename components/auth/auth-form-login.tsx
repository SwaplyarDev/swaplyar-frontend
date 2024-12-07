'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react'; // Importa useEffect
import useStore from '@/store/authViewStore';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import useEmailVerificationStore from '@/store/emailVerificationStore';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import Image from 'next/image';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/api';

type FormInputs = {
  email: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({});
  const [loading, setLoading] = useState(false);
  const { view, setView } = useStore();
  const { setEmail } = useEmailVerificationStore(); // Zustand action para guardar el email
  const { isDark } = useDarkTheme();
  const router = useRouter(); // Utiliza useRouter para redirigir después de ingresar el email

  const submitEmail: SubmitHandler<FormInputs> = async ({ email }) => {
    setLoading(true);
    try {
      // Llamar a la API que envía el código al email
      const response = await fetch(`${BASE_URL}/v1/login/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setEmail(email); // Guardar el email en Zustand
      setTimeout(() => {
        setLoading(false);
        router.push('/auth/login-register/email-verification');
      }, 6000); // Redirigir a la página de verificación
    } catch (error) {
      setLoading(false);
      console.error('Error al enviar el código:', error);
      alert('Ocurrió un error inesperado.');
    }
  };

  const handleChange = () => {
    setView('register');
  };

  return (
    <div className="my-5 flex h-full min-h-[800px] flex-col items-center justify-start py-5 xs:mt-0 xs:justify-center">
      <form
        onSubmit={handleSubmit(submitEmail)}
        className="flex w-full max-w-lg flex-col rounded-2xl bg-[#e6e8ef62] p-8 shadow-md dark:bg-calculatorDark"
      >
        <h1 className="mb-5 text-center text-2xl font-bold text-buttonsLigth dark:text-darkText">Iniciar Sesión</h1>

        <label htmlFor="email" className={clsx(errors.email ? 'text-red-500' : 'text-lightText dark:text-darkText')}>
          Correo electrónico
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 dark:bg-lightText',
            errors.email ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600 dark:hover:border-white',
          )}
          type="email"
          {...register('email', {
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El formato del correo electrónico es inválido',
            },
          })}
        />
        {errors.email && <p className="mb-5 text-sm text-red-500">• {errors.email.message}</p>}

        <button
          type="submit"
          className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} relative m-1 min-h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth px-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
          disabled={loading} // Desactivar el botón si está cargando
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
              <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} />
              Procesando...
            </div>
          ) : (
            'Ingresar'
          )}
        </button>

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-buttonsLigth dark:border-darkText"></div>
          <div className="px-2 text-buttonsLigth dark:text-darkText">O</div>
          <div className="flex-1 border-t border-buttonsLigth dark:border-darkText"></div>
        </div>

        <button
          onClick={handleChange}
          className={`dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
          type="button"
        >
          Crear una nueva cuenta
        </button>
      </form>
    </div>
  );
};
