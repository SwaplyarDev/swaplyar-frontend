'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react'; // Importa useEffect
import useStore from '@/store/authViewStore';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import useEmailVerificationStore from '@/store/emailVerificationStore';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type FormInputs = {
  email: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({});
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { setView } = useStore();
  const { setEmail } = useEmailVerificationStore(); // Zustand action para guardar el email
  const { isDark } = useDarkTheme();
  const router = useRouter(); // Utiliza useRouter para redirigir después de ingresar el email
  const [errorMessage, setErrorMessage] = useState<string>('');

  const submitEmail: SubmitHandler<FormInputs> = async ({ email }) => {
    setLoading(true);
    try {
      // Llamar a la API que envía el código al email
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/login/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setEmail(email); // Guardar el email en Zustand
      setTimeout(() => {
        setLoading(false);
        router.push('/es/iniciar-sesion-o-registro/verificacion-email');
      }, 3000); // Redirigir a la página de verificación
    } catch (error) {
      setLoading(false);
      console.error('Error al enviar el código:', error);
      setErrorMessage('Hubo un error inesperado, vuelve a intentarlo más tarde.');
    }
  };

  const handleChange = () => {
    setIsFocused(false);
    setView('register');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-5">
      <form
        onSubmit={handleSubmit(submitEmail)}
        className="flex w-full max-w-lg flex-col rounded-2xl bg-[#e6e8ef62] p-8 shadow-md dark:bg-calculatorDark"
      >
        <h1 className="mb-5 text-center font-textFont text-[32px] font-medium text-buttonsLigth dark:text-darkText">
          Iniciar Sesión
        </h1>

        <label
          htmlFor="email"
          className={clsx(
            'font-textFont text-lightText dark:text-darkText',
            !isFocused && !watch('email') && 'hidden',
            'mb-1 ml-2.5 text-sm',
          )}
        >
          Correo Electrónico
        </label>
        <input
          className={clsx(
            'rounded-2xl border bg-transparent px-5 py-2 focus:shadow-none focus:outline-none focus:ring-0 dark:bg-inputDark',
            watch('email') && 'border-inputLight dark:border-lightText',
            errors.email
              ? 'mb-0 border-errorColor text-errorColor placeholder-errorColor'
              : 'mb-5 border-inputLightDisabled placeholder-inputLightDisabled hover:border-inputLight hover:placeholder-inputLight dark:border-transparent dark:text-lightText dark:placeholder-placeholderDark dark:hover:border-lightText dark:hover:placeholder-lightText',
          )}
          placeholder={isFocused || !!watch('email') ? '' : 'Correo electrónico'}
          type="text"
          {...register('email', {
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El formato del correo electrónico es inválido',
            },
          })}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== '')}
        />
        {errors.email && <p className="mb-5 ml-2.5 mt-1 text-sm text-errorColor">{errors.email.message}</p>}

        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="50px" />
          </div>
        ) : (
          <button
            type="submit"
            className={clsx(
              loading || !watch('email') || errors.email
                ? 'border-disabledButtonsLigth bg-disabledButtonsLigth dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText'
                : isDark
                  ? 'buttonSecondDark dark:text-lightText'
                  : 'buttonSecond',
              'relative m-1 min-h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-titleFont font-semibold text-darkText dark:border-darkText dark:bg-disabledButtonsDark dark:text-darkText',
            )}
            disabled={loading || !watch('email')} // Desactivar el botón si está cargando
          >
            Ingresar
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
          Registrate aquí
        </button>
        {errorMessage && <p className="mt-5 text-center text-errorColor">{errorMessage}</p>}
      </form>
    </div>
  );
};
