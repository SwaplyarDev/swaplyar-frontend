'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react'; // Importa useEffect
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { useRouter } from 'next/navigation';
import useEmailVerificationStore from '@/store/emailVerificationStore';
import AuthTitle from './AuthTitle';
import AuthButton from './AuthButton';
import AuthSeparator from './AuthSeparator';
import CustomInput from '@/components/ui/Input/CustomInput';
import ShortButton from '../ui/NewButtons/ShortButton';
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

  return (
    <div className="flex my-[60px] md:mt-[120px] md:mb-[80px] lg:mt-[150px] lg:mb-[250px] px-4 flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(submitEmail)}
        className="flex w-full max-w-96 md:max-w-[430px] lg:max-w-[484px] flex-col rounded-2xl gap-3 bg-custom-whiteD-500 py-10 px-5 shadow-md dark:bg-calculatorDark dark:shadow-dark-form"
      >
        <AuthTitle>Iniciar Sesión</AuthTitle>

        <CustomInput
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

        
          <AuthButton
            label="Ingresar"
            disabled={loading || !watch('email') || !!errors.email}
            loading={loading}
          isDark={isDark}
          className='md:text-lg lg:text-xl max-h-[42px]'
          />
        

        <AuthSeparator />

        <ShortButton
          href='/es/registro'
          text="Registrate aquí"
          className='!w-full md:text-lg max-h-[42px]'
        />
        
        {errorMessage && <p className="mt-5 text-center text-errorColor">{errorMessage}</p>}
      </form>
    </div>
  );
};