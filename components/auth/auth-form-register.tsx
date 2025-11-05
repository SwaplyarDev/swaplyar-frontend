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
import ShortButton from '../ui/NewButtons/ShortButton';

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
    <div className="flex pt-[80px] sm:pt-[131px] pb-[5px] px-4 flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full max-w-lg flex-col rounded-2xl gap-[16px] bg-custom-whiteD-500 py-10 px-5 shadow-md dark:bg-calculatorDark dark:shadow-dark-form"
      >
        <AuthTitle>Crear Cuenta</AuthTitle>

        <div className="flex flex-wrap gap-4 w-full">
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
              value={watch('lastName')}
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
          value={watch('email')}
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
              watch('termsConditions') && 'border-inputLight bg-inputLight dark:border-custom-blue-300 dark:bg-transparent',
              'h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-inputLightDisabled transition-all duration-200 dark:border-custom-blue-300/50 dark:bg-transparent',
              'checked:border-inputLight checked:bg-inputLight checked:ring-opacity-0 dark:checked:border-custom-blue-300/50 dark:checked:bg-white',
              'checked:after:content-["✓"] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:flex checked:after:items-center checked:after:justify-center checked:after:w-full checked:after:h-full dark:checked:after:text-black',
              'focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0',
              'hover:border-inputLight checked:hover:border-inputLight checked:focus:border-inputLight checked:focus:bg-inputLight dark:checked:hover:border-custom-blue-300/50 dark:checked:focus:border-custom-blue-300/50 dark:checked:focus:bg-white',
              errors.termsConditions ? 'border-red-500 ring-2 ring-red-500' : '',
              'dark:hover:border-custom-blue-300',
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
        

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-buttonsLigth dark:border-darkText"></div>
          <div className="px-2 text-2xl font-bold text-buttonsLigth dark:text-darkText">O</div>
          <div className="flex-1 border-t border-buttonsLigth dark:border-darkText"></div>
        </div>

       
        <ShortButton
          href='/es/iniciar-sesion'
          text="Iniciar Sesión"
          className='!w-full'
        />
      </form>
    </div>
  );
};