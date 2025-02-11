import React, { useState } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm, useWatch } from 'react-hook-form';

import clsx from 'clsx';
import Swal from 'sweetalert2';
import { FormData } from '@/types/repentance/repentance';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FormularioProps } from '@/types/repentance/repentance';
import SelectCountry from '@/components/request/form/inputs/SelectCountry';

const Form: React.FC<FormularioProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const submitHandler: SubmitHandler<FormData> = (data) => {
    onSubmit(data); // Envía los datos al componente padre
  };

  const errorHandler: SubmitErrorHandler<FormData> = (errors) => {
    console.error('Errores del formulario:', errors);
  };
  const { isDark } = useDarkTheme();
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar el spinner
  const [hasAlert, setHasAlert] = useState(false); // Estado para verificar si hay una alerta activa
  const [formData, setFormData] = useState<FormData>({
    transaction_id: '',
    last_name: '',
    email: '',
    phone_number: '',
    note: '',
    calling_code: undefined,
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInvalidForm = () => {
    Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
      text: 'Por favor, revisa los campos e inténtalo nuevamente.',
    });
  };

  const formValues = useWatch({ control });
  return (
    <form
      onSubmit={handleSubmit(submitHandler, errorHandler)}
      className="mx-auto flex h-full w-full max-w-[490px] flex-col justify-evenly gap-1 md:mt-3"
    >
      <div className="h-[81px]">
        <label className="font-textFont text-xs font-light">
          Número Solicitud
          <input
            className={clsx(
              'placeholder-text-gray-900 h-[41px] w-full border-0 border-b-[1px] border-solid ps-0 text-xs placeholder:font-light xs:text-lg',
              isDark
                ? 'border-b-darkText bg-transparent text-darkText placeholder:text-placeholderDark focus:border-darkText'
                : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
              errors.transaction_id ? 'placeholder:text-[#CE1818]' : 'placeholder:text-buttonExpandDark',
            )}
            type="text"
            placeholder={
              errors.transaction_id ? 'Número de Solicitud*' : 'N° de Solicitud como figura en el Correo Eletrónico'
            }
            {...register('transaction_id', {
              required: 'El número de solicitud es obligatorio',
              pattern: {
                value: /^[A-Za-z0-9]{10,20}$/,
                message: 'El número de solicitud debe tener entre 10 y 20 caracteres alfanuméricos',
              },
            })}
            required
          />
        </label>
        {errors.transaction_id && (
          <p className="mb-5 text-sm text-[#CE1818]">{errors.transaction_id.message as string}</p>
        )}
      </div>
      <div className="h-[81px]">
        <label className="font-textFont text-xs font-light">
          Apellido
          <input
            className={clsx(
              'placeholder-text-gray-900 h-[41px] w-full border-0 border-b-[1px] border-solid ps-0 text-xs placeholder:font-light xs:text-lg',
              isDark
                ? 'border-b-darkText bg-transparent text-darkText placeholder:text-placeholderDark focus:border-darkText'
                : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
              errors.last_name ? 'placeholder:text-[#CE1818]' : 'placeholder:text-buttonExpandDark',
            )}
            type="text"
            placeholder={errors.last_name ? 'Apellido*' : 'Apellido como figura en el Correo Eletrónico'}
            {...register('last_name', {
              required: 'El Apellido es obligatorio',
              minLength: {
                value: 2,
                message: 'Debe ingresar mínimo 2 caracteres',
              },
              maxLength: {
                value: 50,
                message: 'Debe ingresar como máximo 50 caracteres',
              },
            })}
            required
          />
        </label>
        {errors.last_name && <p className="mb-5 text-sm text-[#CE1818]">{errors.last_name.message as string}</p>}
      </div>
      <div className="h-[81px]">
        <label className="font-textFont text-xs font-light">
          Correo Electónico
          <input
            className={clsx(
              'placeholder-text-gray-900 h-[41px] w-full border-0 border-b-[1px] border-solid ps-0 text-xs placeholder:font-light xs:text-lg',
              isDark
                ? 'border-b-darkText bg-transparent text-darkText placeholder:text-placeholderDark focus:border-darkText'
                : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
              errors.email ? 'placeholder:text-[#CE1818]' : 'placeholder:text-buttonExpandDark',
            )}
            type="email"
            {...register('email', {
              required: 'El Email es obligatorio',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Ingresa un formato válido de email. Ej: Ejemplo@gmail.com',
              },
            })}
            required
            placeholder={errors.email ? 'Correo Electónico*' : 'El Correo Electónico que usaste para la Solicitud'}
          />
        </label>
        {errors.email && <p className="mb-5 text-sm text-[#CE1818]">{errors.email.message as string}</p>}
      </div>
      <div className="relative mt-1 h-[81px]">
        <div className="flex flex-col">
          <label htmlFor="phone_number" className="font-textFont text-xs font-light">
            Número Telefónico
          </label>
          <div
            className={clsx(
              `flex h-[41px] w-full items-center border-0 border-b-[1px] border-solid ps-0 text-center text-xs xs:text-lg ${isDark ? 'border-b-darkText bg-transparent text-white focus:border-white' : 'border-b-buttonsLigth bg-transparent focus:border-buttonsLigth'} outline-none focus:outline-none`,
              errors.phone_number && !isFocused
                ? 'border border-[#CE1818] hover:border-blue-600 dark:hover:border-darkText'
                : isFocused
                  ? 'border-blue-600 outline-none ring-1 ring-blue-600 ring-offset-blue-600 hover:border-blue-600 dark:hover:border-darkText'
                  : 'hover:border-blue-600 dark:hover:border-darkText',
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <Controller
              name="calling_code"
              control={control}
              defaultValue={undefined}
              rules={{
                required: 'Este campo es obligatorio',
              }}
              render={({ field, fieldState }) => (
                <SelectCountry
                  setSelectedCodeCountry={(option) => field.onChange(option)}
                  errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                  textColor={['buttonsLigth', 'darkText']}
                />
              )}
            />
            <input
              placeholder={errors.phone_number ? 'Número de Telefóno*' : 'Número de Telefóno'}
              className={clsx(
                'placeholder-text-gray-900 ml-3 h-[41px] w-full border-0 border-solid ps-0 text-xs placeholder:font-light xs:text-lg',
                isDark
                  ? 'border-b-darkText bg-transparent text-darkText placeholder:text-placeholderDark focus:border-darkText'
                  : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
                errors.phone_number ? 'placeholder:text-[#CE1818]' : 'placeholder:text-buttonExpandDark',
              )}
              type="tel"
              {...register('phone_number', {
                required: 'El número de teléfono es obligatorio',
                pattern: {
                  value: /^\d{9,11}$/,
                  message: 'Introduce un número válido de entre 9 y 11 dígitos',
                },
              })}
            />
          </div>
          {errors.phone_number && (
            <p className="mb-5 text-sm text-[#CE1818]">{errors.phone_number.message as string}</p>
          )}
        </div>
      </div>
      <div className="">
        <label className="font-textFont text-xs font-light">
          Nota Opcional{' '}
          <textarea
            className={clsx(
              'placeholder-text-gray-900 h-[45px] max-h-[148px] min-h-[45px] w-full border-0 border-b-[1px] border-solid ps-0 text-xs placeholder:font-light xs:text-lg',
              isDark
                ? 'border-b-darkText bg-transparent text-darkText placeholder:text-placeholderDark focus:border-darkText'
                : 'border-b-buttonsLigth bg-transparent outline-none placeholder:text-buttonExpandDark focus:border-buttonsLigth focus:outline-none',
            )}
            placeholder="Mencione el motivo del Reembolso"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className={clsx(
          'mx-auto mt-2 flex h-[42px] items-center justify-center rounded-3xl px-16 py-3 text-center font-titleFont font-semibold',
          isValid
            ? isDark
              ? 'buttonSecondDark hover:bg-relative border-darkText bg-darkText text-lightText'
              : 'buttonSecond border border-buttonsLigth bg-buttonsLigth text-darkText hover:bg-buttonsLigth'
            : isDark
              ? 'cursor-not-allowed bg-placeholderDark'
              : 'bg-buttonExpandDark text-darkText',
        )}
      >
        {isLoading ? 'Cargando...' : 'Solcitar Reembolso'}
      </button>
    </form>
  );
};

export default Form;
