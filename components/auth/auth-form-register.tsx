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

import CustomInput from '@/components/ui/Input/CustomInput';
import AuthButton from './AuthButton';
import AuthTitle from './AuthTitle';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();

  const { setView } = useStore();
  const handleChange = () => {
    router.push('/es/iniciar-sesion');
  };

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    setLoading(true);
    const { firstName, lastName, email, termsConditions } = data;
    const name = `${firstName} ${lastName}`;

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          termsAccepted: termsConditions,
        }),
      });
      //console log para ver la respuesta del backend
      console.log('respuestas al crear usuario:', response);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error al crear el usuario');
      }
      //aca deberiamos arrojar un alerta de exito, y redirigir a la pagina de login
      const responseData = await response.json();
      setUserVerification(responseData);
      setLoading(false);
      setEmail(email);
      localStorage.setItem('verificationEmail', email); // 🆕 Guardar en localStorage

      setTimeout(() => {
        setLoading(false);
        router.push('/es/iniciar-sesion');
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log('Error al crear el usuario:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Ocurrió un error inesperado.'
      );
    }
  };

  return (
    <div className="flex py-10 px-4 xl:py-52 md:py-20 flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full max-w-lg flex-col rounded-2xl bg-custom-whiteD-500 py-10 px-5 shadow-md dark:bg-calculatorDark"
      >
        <AuthTitle>Crear Cuenta</AuthTitle>

        <div className="flex flex-wrap gap-1 w-full">
          <div className="flex flex-col flex-1">
            <CustomInput
              label="Nombre"
              type="text"
              name="firstName"
              register={register}
              validation={{ required: 'El nombre es obligatorio' }}
              error={errors.firstName?.message}
              placeholder="Nombre"
              disabled={loading}
            />
          </div>
          <div className="flex flex-col flex-1">
            <CustomInput
              label="Apellido"
              type="text"
              name="lastName"
              register={register}
              validation={{ required: 'El apellido es obligatorio' }}
              error={errors.lastName?.message}
              placeholder="Apellido"
              disabled={loading}
            />
          </div>
        </div>

        <CustomInput
          label="Correo electrónico"
          type="text"
          name="email"
          register={register}
          validation={{
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El formato del correo electrónico es inválido',
            },
          }}
          error={errors.email?.message}
          placeholder="Correo Electrónico"
          disabled={loading}
        />

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
          <AuthButton
            label="Crear cuenta"
            type="submit"
            disabled={
              loading ||
              !watch('email') ||
              !watch('termsConditions') ||
              !watch('firstName') ||
              !watch('lastName') ||
              !!errors.email
            }
            loading={loading}
            isDark={isDark}
            variant="primary"
          />
        )}

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-buttonsLigth dark:border-darkText"></div>
          <div className="px-2 text-2xl font-bold text-buttonsLigth dark:text-darkText">O</div>
          <div className="flex-1 border-t border-buttonsLigth dark:border-darkText"></div>
        </div>

        <AuthButton
          label="Inicia Sesión"
          onClick={handleChange}
          type="button"
          isDark={isDark}
          variant="secondary"
        />
      </form>
    </div>
  );
};