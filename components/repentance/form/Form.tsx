import React, { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { FormData } from '@/types/repentance/repentance';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import SelectCountry from '@/components/request/form/inputs/SelectCountry';
import { defaultCountryOptions } from '@/utils/defaultCountryOptions';
import AlertProcess from '../Alerts/AlertProcess';

const Form = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const toggleTooltip = useCallback(() => {
    setIsTooltipVisible((prev) => !prev);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const transaction_id = watch('transaction_id');

  const { isDark } = useDarkTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmission: SubmitHandler<FormData> = async (data) => {
    const dataToSend = {
      ...data,
      phone_number: `${data.calling_code?.callingCode}${data.phone_number}`,
      status: 'pending',
    };

    setIsLoading(true);

    AlertProcess({ isDark, toggleTooltip, setIsTooltipVisible, transaction_id, dataToSend, setIsLoading });

    setIsLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmission)}
      className="flex h-full w-full max-w-[490px] flex-col justify-evenly gap-1 md:mt-3"
    >
      <div className="h-[81px]">
        <label className="font-textFont text-xs font-light">Número Solicitud</label>
        <input
          className={clsx(
            'inputChangeAutofill h-[41px] w-full border-0 border-b-[1px] ps-0 text-xs placeholder:font-light focus:border-0 focus:border-b-[1px] focus:placeholder-transparent focus:outline-none focus:ring-0 xs:text-lg',
            isDark
              ? 'border-b-darkText bg-transparent text-darkText placeholder:text-placeholderDark focus:border-darkText'
              : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
            errors.transaction_id ? 'placeholder:text-errorColor' : 'placeholder:text-buttonExpandDark',
          )}
          type="text"
          placeholder={
            errors.transaction_id ? 'Número de Solicitud*' : 'N° de Solicitud como figura en el Correo Eletrónico'
          }
          {...register('transaction_id', {
            required: 'El N° Solicitud es Obligatorio',
            pattern: {
              value: /^[A-Za-z0-9]{10,20}$/,
              message: 'Debe tener entre 10 y 20 caracteres alfanumericos',
            },
          })}
          required
        />
        {errors.transaction_id && (
          <p className="mb-5 text-sm text-errorColor">{errors.transaction_id.message as string}</p>
        )}
      </div>
      <div className="h-[81px]">
        <label className="font-textFont text-xs font-light">
          Apellido
          <input
            className={clsx(
              'inputChangeAutofill placeholder-text-gray-900 h-[41px] w-full border-0 border-b-[1px] ps-0 text-xs placeholder:font-light focus:border-0 focus:border-b-[1px] focus:outline-none focus:ring-0 xs:text-lg',
              isDark
                ? 'border-b-darkText bg-transparent text-darkText placeholder:text-placeholderDark focus:border-darkText'
                : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
              errors.last_name ? 'placeholder:text-errorColor' : 'placeholder:text-buttonExpandDark',
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
        {errors.last_name && <p className="mb-5 text-sm text-errorColor">{errors.last_name.message as string}</p>}
      </div>
      <div className="h-[81px]">
        <label className="font-textFont text-xs font-light">
          Correo Electónico
          <input
            className={clsx(
              'inputChangeAutofill placeholder-text-gray-900 h-[41px] w-full border-0 border-b-[1px] ps-0 text-xs placeholder:font-light focus:border-0 focus:border-b-[1px] focus:outline-none focus:ring-0 xs:text-lg',
              isDark
                ? 'border-b-darkText bg-transparent text-darkText placeholder:text-placeholderDark focus:border-darkText'
                : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
              errors.email ? 'placeholder:text-errorColor' : 'placeholder:text-buttonExpandDark',
            )}
            type="email"
            {...register('email', {
              required: 'El Email es obligatorio',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Ingresa un formato válido de email',
              },
            })}
            required
            placeholder={errors.email ? 'Correo Electónico*' : 'El Correo Electónico que usaste para la Solicitud'}
          />
        </label>
        {errors.email && <p className="mb-5 text-sm text-errorColor">{errors.email.message as string}</p>}
      </div>
      <div className="relative mt-1 h-[81px]">
        <div className="flex flex-col">
          <label htmlFor="phone_number" className="font-textFont text-xs font-light">
            Número Telefónico
          </label>
          <div
            className={clsx(
              `inputChangeAutofill flex h-[41px] w-full items-center border-0 border-b-[1px] border-solid ps-0 text-center text-xs text-lightText xs:text-lg ${isDark ? 'border-b-darkText bg-transparent focus:border-white' : 'border-b-buttonsLigth bg-transparent focus:border-buttonsLigth'} outline-none focus:outline-none`,
              errors.phone_number &&
                !isFocused &&
                'border border-errorColor hover:border-blue-600 dark:hover:border-darkText',
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <Controller
              name="calling_code"
              control={control}
              defaultValue={defaultCountryOptions.find((option) => option.callingCode === '+54')}
              rules={{
                required: 'Este campo es obligatorio',
              }}
              render={({ field, fieldState }) => (
                <SelectCountry
                  selectedCodeCountry={field.value}
                  setSelectedCodeCountry={(option) => field.onChange(option)}
                  errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                  textColor={['buttonsLigth', 'darkText']}
                  classNames="pl-0 w-[104px]"
                />
              )}
            />
            <input
              placeholder={errors.phone_number ? 'Número de Telefóno*' : 'Número de Telefóno'}
              className={clsx(
                'inputChangeAutofill placeholder-text-gray-900 ml-3 h-[41px] w-full border-0 border-none bg-transparent ps-0 text-xs placeholder:font-light focus:border-none focus:outline-none focus:ring-0 dark:text-darkText xs:text-lg',
                errors.phone_number
                  ? 'placeholder:text-errorColor'
                  : 'placeholder:text-buttonExpandDark dark:placeholder:text-placeholderDark',
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
            <p className="mb-5 text-sm text-errorColor">{errors.phone_number.message as string}</p>
          )}
        </div>
      </div>
      <div className="">
        <label className="font-textFont text-xs font-light">
          Nota Opcional{' '}
          <textarea
            {...register('note')}
            className={clsx(
              'inputChangeAutofill placeholder-text-gray-900 h-[41px] w-full border-0 border-b-[1px] ps-0 text-xs placeholder:font-light focus:border-0 focus:border-b-[1px] focus:outline-none focus:ring-0 xs:text-lg',
              isDark
                ? 'border-b-darkText bg-transparent text-darkText placeholder:text-placeholderDark focus:border-darkText'
                : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
              errors.note ? 'placeholder:text-errorColor' : 'placeholder:text-buttonExpandDark',
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
