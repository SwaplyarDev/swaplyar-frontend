import React, { useState } from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';

import clsx from 'clsx';
import SelectCodeCountry from '@/components/request/form/inputs/SelectCodeCountry';
import Swal from 'sweetalert2';
import { FormData } from '@/types/repentance/repentance';
import Alerts from '../Alerts/Alerts';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FormularioProps } from '@/types/repentance/repentance';
const URLRepentance = process.env.NEXT_PUBLIC_BACKEND_URL;

const Form: React.FC<FormularioProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();
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
    calling_code: { value: '', label: '', callingCode: '' },
    status: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
      className="ml-2 mt-3 flex h-full flex-col justify-evenly lg:ml-7"
    >
      <div className="mt-2 w-full">
        <label className="text-lg">
          NUMERO DE SOLICITUD
          <input
            className={`w-full border-0 border-b-4 border-solid ps-0 text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`}
            type="text"
            placeholder="Como figura en el recibo"
            {...register('transaction_id', {
              required: '• El número de referencia es obligatorio',
              pattern: {
                value: /^[A-Za-z0-9]{10,20}$/,
                message:
                  '• El número de referencia debe tener entre 10 y 20 caracteres alfanuméricos',
              },
            })}
            onChange={handleChange}
            required
          />
        </label>
        {errors.transaction_id && (
          <p className="mt-1 text-sm text-red-500">
            {errors.transaction_id.message}
          </p>
        )}
      </div>
      <div className="mt-2">
        <label className="text-lg">
          Apellido
          <input
            className={`w-full border-0 border-b-4 border-solid ps-0 text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`}
            type="text"
            placeholder="Como figura en el recibo"
            {...register('last_name', {
              required: '• El Apellido es obligatorio',
              minLength: {
                value: 2,
                message: '• Debe ingresar mínimo 2 caracteres',
              },
              maxLength: {
                value: 50,
                message: '• Debe ingresar como máximo 50 caracteres',
              },
            })}
            onChange={handleChange}
            required
          />
        </label>
        {errors.last_name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.last_name.message}
          </p>
        )}
      </div>
      <div className="mt-2">
        <label className="text-lg">
          Email
          <input
            className={`w-full border-0 border-b-4 border-solid ps-0 text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white dark:hover:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`}
            type="email"
            {...register('email', {
              required: '• El Email es obligatorio',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message:
                  '• Ingresa un formato válido de email. Ej: Ejemplo@gmail.com',
              },
            })}
            onChange={handleChange}
            required
            placeholder="El mismo email que colocaste en el formulario"
          />
        </label>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="mt-2 w-full">
        <div className="flex flex-col">
          <label htmlFor="phone_number">Telefono</label>
          <div
            className={clsx(
              `flex w-full items-center border-0 border-b-4 border-solid ps-0 text-center text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`,
              errors.phone_number && !isFocused
                ? 'border border-red-500 hover:border-blue-600 dark:hover:border-white'
                : isFocused
                  ? 'border-blue-600 outline-none ring-1 ring-blue-600 ring-offset-blue-600 hover:border-blue-600 dark:hover:border-white'
                  : 'hover:border-blue-600 dark:hover:border-white',
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
              render={({ field }) => (
                <SelectCodeCountry
                  selectedCodeCountry={field.value}
                  setSelectedCodeCountry={field.onChange}
                  errors={
                    errors.calling_code
                      ? { [field.name]: errors.calling_code }
                      : {}
                  }
                />
              )}
            />
            <p className="flex h-full items-center justify-center">
              {formValues.calling_code?.callingCode}
            </p>
            <input
              placeholder="Telefono"
              className="${isDark ? 'border-b-white focus:border-white' : 'border-b-buttonsLigth focus:border-buttonsLigth'} w-full border-none bg-transparent text-lg focus:border-none focus:outline-none focus:ring-0"
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
            <p className="mb-5 text-sm text-red-500">
              • {errors.phone_number.message as string}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <label className="text-lg">
          NOTA OPCIONAL
          <textarea
            className={`max-h-[500px] min-h-[45px] w-full resize-none border-0 border-b-2 ps-0 text-lg ${isDark ? 'border-b-white bg-transparent text-white placeholder-white focus:border-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth focus:border-buttonsLigth'} outline-none focus:outline-none`}
            {...register('note', {
              minLength: {
                value: 6,
                message: '• Debe ingresar mínimo 6 caracteres',
              },
              maxLength: {
                value: 500,
                message: '• Debe ingresar como máximo 500 caracteres',
              },
            })}
            placeholder="Añade una nota mencionando el motivo del reembolso"
            onChange={handleChange}
            
          />
        </label>
        {errors.note && (
          <p className="mt-1 text-sm text-red-500">{errors.note.message}</p>
        )}
      </div>
      <div className="mt-5 flex justify-center text-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
        >
          {isLoading ? 'Cargando...' : 'Enviar Solicitud'}
        </button>
      </div>
    </form>
  );
};

export default Form;
