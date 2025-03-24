'use client';

import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import useStore from '@/store/authViewStore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from 'next/link';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import useEmailVerificationStore from '@/store/emailVerificationStore';
import { useRouter } from 'next/navigation';
import userInfoStore from '@/store/userInfoStore';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  rememberMe: boolean;
  termsConditions: boolean;
  verificationCode: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { isDark } = useDarkTheme();
  const { setEmail } = useEmailVerificationStore();
  const router = useRouter();
  const { setUserVerification } = userInfoStore();
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();

  const { setView } = useStore();
  const handleChange = () => {
    setView('login');
  };

  console.log('VAlor: ', isFocused2 || !!watch('lastName'));

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    setLoading(true);
    const { firstName, lastName, email, termsConditions } = data;
    const name = `${firstName} ${lastName}`;

    try {
      const response = await fetch(`${BASE_URL}/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: name,
          email: email,
          terms: termsConditions,
          role: 'user',
        }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error al crear el usuario');
      }
      const responseData = await response.json();
      setUserVerification(responseData);
      setLoading(false);
      setEmail(email);
      setTimeout(() => {
        setLoading(false);
        router.push('/es/iniciar-sesion-o-registro/email-verification');
      }, 3000);
    } catch (error) {
      setLoading(false);
      alert('Ocurrió un error inesperado.');
    }
  };

  return (
    <div className="my-5 flex h-full min-h-[700px] flex-col items-center justify-start py-5 xs:min-h-[800px] xs:justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full max-w-lg flex-col rounded-2xl bg-[#e6e8ef62] p-8 shadow-md dark:bg-calculatorDark"
      >
        <h1 className="mb-5 text-center font-textFont text-[32px] font-medium text-buttonsLigth dark:text-darkText">
          Crear Cuenta
        </h1>

        <div className="flex flex-col justify-between xs:flex-row">
          <div className="flex flex-col xs:max-w-48">
            <label
              htmlFor="firstName"
              className={clsx(
                'font-textFont text-lightText dark:text-darkText',
                !isFocused && !watch('firstName') && 'hidden',
                'mb-1 ml-2.5 text-sm',
              )}
            >
              Nombre
            </label>
            <input
              id="firstName"
              className={clsx(
                !isFocused && !watch('firstName') && 'mt-6',
                'max-w-full rounded-2xl border bg-transparent px-5 py-2 focus:shadow-none focus:outline-none focus:ring-0 dark:bg-inputDark',
                watch('firstName') && 'border-inputLight dark:border-lightText',
                errors.firstName
                  ? 'mb-0 border-errorColor text-errorColor placeholder-errorColor'
                  : 'mb-5 border-inputLightDisabled placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText dark:hover:placeholder-lightText',
              )}
              placeholder={isFocused || !!watch('firstName') ? '' : 'Nombre'}
              type="text"
              {...register('firstName', {
                required: 'El nombre es obligatorio',
              })}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => setIsFocused(e.target.value !== '')}
            />
            {errors.firstName && <p className="mb-5 ml-2.5 mt-1 text-sm text-errorColor">{errors.firstName.message}</p>}
          </div>
          <div className="flex flex-col xs:max-w-48">
            <label
              htmlFor="lastName"
              className={clsx(
                'font-textFont text-lightText dark:text-darkText',
                !isFocused2 && !watch('lastName') && 'hidden',
                'mb-1 ml-2.5 text-sm',
              )}
            >
              Apellido
            </label>
            <input
              id="lastName"
              className={clsx(
                !isFocused2 && !watch('lastName') && 'mt-6',
                'max-w-full rounded-2xl border bg-transparent px-5 py-2 focus:shadow-none focus:outline-none focus:ring-0 dark:bg-inputDark',
                watch('lastName') && 'border-inputLight dark:border-lightText',
                errors.lastName
                  ? 'mb-0 border-errorColor text-errorColor placeholder-errorColor'
                  : 'mb-5 border-inputLightDisabled placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText dark:hover:placeholder-lightText',
              )}
              placeholder={isFocused2 || !!watch('lastName') ? '' : 'Apellido'}
              type="text"
              {...register('lastName', {
                required: 'El apellido es obligatorio',
              })}
              onFocus={() => setIsFocused2(true)}
              onBlur={(e) => setIsFocused2(e.target.value !== '')}
            />
            {errors.lastName && <p className="mb-5 ml-2.5 mt-1 text-sm text-errorColor">{errors.lastName.message}</p>}
          </div>
        </div>

        <label
          htmlFor="email"
          className={clsx(
            'font-textFont text-lightText dark:text-darkText',
            !isFocused3 && !watch('email') && 'hidden',
            'mb-1 ml-2.5 text-sm',
          )}
        >
          Correo electrónico
        </label>
        <input
          id="email"
          className={clsx(
            !isFocused3 && !watch('email') && 'mt-6',
            'rounded-2xl border bg-transparent px-5 py-2 focus:shadow-none focus:outline-none focus:ring-0 dark:bg-inputDark',
            watch('email') && 'border-inputLight dark:border-lightText',
            errors.email
              ? 'mb-0 border-errorColor text-errorColor placeholder-errorColor'
              : 'mb-5 border-inputLightDisabled placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText dark:hover:placeholder-lightText',
          )}
          placeholder={isFocused3 || !!watch('email') ? '' : 'Correo Electrónico'}
          type="text"
          {...register('email', {
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El formato del correo electrónico es inválido',
            },
          })}
          onFocus={() => setIsFocused3(true)}
          onBlur={(e) => setIsFocused3(e.target.value !== '')}
        />
        {errors.email && <p className="mb-5 ml-2.5 mt-1 text-sm text-errorColor">{errors.email.message}</p>}

        <div className="mb-5 flex items-center">
          <input
            id="termsConditions"
            type="checkbox"
            className={clsx(
              watch('termsConditions') && 'border-inputLight bg-inputLight dark:border-lightText dark:bg-lightText',
              'h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-inputLightDisabled transition-all duration-200 dark:border-lightText',
              'checked:border-inputLight checked:bg-inputLight checked:ring-opacity-0 dark:checked:border-lightText dark:checked:bg-lightText',
              'focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0',
              'hover:border-inputLight checked:hover:border-inputLight checked:focus:border-inputLight checked:focus:bg-inputLight dark:checked:hover:border-lightText dark:checked:focus:border-lightText dark:checked:focus:bg-lightText',
              errors.termsConditions ? 'border-red-500 ring-2 ring-red-500' : '',
              'dark:border-lightText dark:bg-lightText dark:invert dark:hover:border-lightText',
            )}
            {...register('termsConditions', {
              required: 'Debes aceptar los términos y condiciones.',
            })}
          />
          <label htmlFor="termsConditions" className="ml-2 text-lightText dark:text-darkText">
            <Link href="/es/terminos-y-condiciones/tyc-swaplyar" className="font-textFont underline">
              Acepto Términos & Condiciones
            </Link>
          </label>
        </div>

        {errorMessage && (
          <div className="mb-5 flex w-full rounded border-2 border-red-500 bg-transparent p-4">
            <ErrorOutlineIcon className="text-red-500" />
            <div className="ml-2">
              <p className="text-base text-red-500">Error</p>
              <p className="text-sm font-light text-red-500">{errorMessage}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="50px" />
          </div>
        ) : (
          <button
            type="submit"
            className={clsx(
              loading ||
                !watch('email') ||
                !watch('termsConditions') ||
                !watch('firstName') ||
                !watch('lastName') ||
                errors.email
                ? 'border-disabledButtonsLigth bg-disabledButtonsLigth dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText'
                : isDark
                  ? 'buttonSecondDark dark:text-lightText'
                  : 'buttonSecond',
              'relative m-1 min-h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-titleFont font-semibold text-darkText dark:border-darkText dark:bg-darkText',
            )}
            disabled={loading || !watch('email')} // Desactivar el botón si está cargando
          >
            Crear cuenta
          </button>
        )}

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-buttonsLigth dark:border-darkText"></div>
          <div className="px-2 text-2xl font-bold text-buttonsLigth dark:text-darkText">O</div>
          <div className="flex-1 border-t border-buttonsLigth dark:border-darkText"></div>
        </div>

        <button
          onClick={handleChange}
          className={`dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth px-3 font-titleFont font-semibold text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
          type="button"
        >
          Inicia Sesión
        </button>
      </form>
    </div>
  );
};
