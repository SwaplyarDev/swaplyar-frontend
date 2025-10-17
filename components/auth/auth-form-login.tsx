'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react'; // Importa useEffect
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { useRouter } from 'next/navigation';
import useEmailVerificationStore from '@/store/emailVerificationStore';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import AuthTitle from './AuthTitle';
import AuthInput from './AuthInput';
import ButtonAuth from './AuthButton';
import AuthSeparator from './AuthSeparator';

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
    clearErrors,
  } = useForm<FormInputs>({});
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
        router.push('/es/iniciar-sesion/verificacion-email');
      }, 3000); // Redirigir a la página de verificación
    } catch (error) {
      setLoading(false);
      console.error('Error al enviar el código:', error);
      setErrorMessage('Hubo un error inesperado, vuelve a intentarlo más tarde.');
    }
  };

  const handleChange = () => {
    router.push('/es/registro');
  };

  return (
    <div className="flex py-10 px-4 xl:py-52 md:py-20 flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(submitEmail)}
        className="flex w-full max-w-lg flex-col rounded-2xl bg-custom-whiteD-500 py-10 px-5 shadow-md dark:bg-calculatorDark"
      >
        <AuthTitle>Iniciar Sesión</AuthTitle>

        <AuthInput
          label="Correo Electrónico"
          type="email"
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
          placeholder="Correo electrónico"
          disabled={loading}
        />

        {loading ? (
          <div className="flex items-center justify-center h-[42px]">
            <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="41px" />
          </div>
        ) : (
          <ButtonAuth label="Ingresar" disabled={loading || !watch('email') || !!errors.email} loading={loading} isDark={isDark} />
        )}

        <AuthSeparator />

        <ButtonAuth
          label="Registrate aquí"
          onClick={handleChange}
          type="button"
          isDark={isDark}
          variant="secondary"
        />
        {errorMessage && <p className="mt-5 text-center text-errorColor">{errorMessage}</p>}
      </form>
    </div>
  );
};
