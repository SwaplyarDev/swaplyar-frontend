import React, { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { FormData } from '@/types/repentance/repentance';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import SelectCountry from '@/components/request/form/inputs/SelectCountry';
import { defaultCountryOptions } from '@/utils/defaultCountryOptions';
import AlertProcess from '../Alerts/AlertProcess';
import { validatePhoneNumber } from '@/utils/validatePhoneNumber';
import ButtonAuth from '@/components/auth/AuthButton';

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
    trigger,
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
      id="repentance-form"
      onSubmit={handleSubmit(handleFormSubmission)}
      className="flex h-full w-full max-w-[490px] flex-col gap-4 md:mt-3"
    >
      <div className="h-[50px]">
        
        <input
          className={clsx(
            'inputChangeAutofill h-[50px] w-full border-0 border-b-[1px] ps-0 text-xs placeholder:font-light focus:border-0 focus:border-b-[1px] focus:placeholder-transparent focus:outline-none focus:ring-0 xs:text-lg',
            isDark
              ? 'border-b-darkText bg-transparent text-custom-blue-300 placeholder:text-custom-blue-300 focus:border-darkText'
              : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
            errors.transaction_id ? 'placeholder:text-errorColor' : 'placeholder:text-buttonExpandDark',
          )}
          type="text"
          placeholder={
            errors.transaction_id ? 'Número de Solicitud*' : 'Número de Solicitud'
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
      <div className="h-[50px]">
       
          <input
            className={clsx(
              'inputChangeAutofill placeholder-text-gray-900 h-[50px] w-full border-0 border-b-[1px] ps-0 text-xs placeholder:font-light focus:border-0 focus:border-b-[1px] focus:outline-none focus:ring-0 xs:text-lg',
              isDark
                ? 'border-b-darkText bg-transparent text-custom-blue-300 placeholder:text-custom-blue-300 focus:border-darkText'
                : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
              errors.last_name ? 'placeholder:text-errorColor' : 'placeholder:text-buttonExpandDark',
            )}
            type="text"
            placeholder={errors.last_name ? 'Apellido*' : 'Apellido'}
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
       
        {errors.last_name && <p className="mb-5 text-sm text-errorColor">{errors.last_name.message as string}</p>}
      </div>
      <div className="h-[50px]">
       
          <input
            className={clsx(
              'inputChangeAutofill placeholder-text-gray-900 h-[50px] w-full border-0 border-b-[1px] ps-0 text-xs placeholder:font-light focus:border-0 focus:border-b-[1px] focus:outline-none focus:ring-0 xs:text-lg',
              isDark
                ? 'border-b-darkText bg-transparent text-custom-blue-300 placeholder:text-custom-blue-300 focus:border-darkText'
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
            placeholder={errors.email ? 'Correo Electrónico*' : 'Correo Electrónico '}
          />
      
        {errors.email && <p className="text-sm text-errorColor">{errors.email.message as string}</p>}
      </div>
      <div className="relative h-[50px]">
        <div className="flex flex-col">
          
          <div
            className={clsx(
              `inputChangeAutofill flex h-[50px] w-full items-center border-0 border-b-[1px] border-solid ps-0 text-center text-xs text-lightText xs:text-lg ${isDark ? 'border-b-darkText bg-transparent focus:border-white' : 'border-b-buttonsLigth bg-transparent focus:border-buttonsLigth'} outline-none focus:outline-none`,
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
                  setSelectedCodeCountry={(option) => {
                    field.onChange(option)
                    trigger('phone_number')
                  }}
                  errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                  textColor={['custom-blue-800', 'custom-blue-300']}
                  classNames="pl-0 w-[104px] text-custom-blue-800 dark:text-custom-blue-300 dark:[&>span]:text-custom-blue-300"
                />
              )}
            />
            <input
              placeholder={errors.phone_number ? 'Número de Telefóno*' : 'Número de Telefóno'}
              className={clsx(
                'inputChangeAutofill placeholder-text-gray-900 ml-3 h-[50px] w-full border-0 border-none bg-transparent ps-0 text-xs placeholder:font-light focus:border-none focus:outline-none focus:ring-0 dark:text-custom-blue-300 xs:text-lg',
                errors.phone_number
                  ? 'placeholder:text-errorColor'
                  : 'placeholder:text-custom-blue-300 dark:placeholder:text-custom-blue-300',
              )}
              type="tel"
              {...register('phone_number', {
                required: 'El número de teléfono es obligatorio',
                validate: (value) => {
                  const country = watch('calling_code');
                  const result = validatePhoneNumber(value, country);
                  return result === true ? true : result;
                }
              })}
            />
          </div>
          {errors.phone_number && (
            <p className="mb-5 text-sm text-errorColor">{errors.phone_number.message as string}</p>
          )}
        </div>
      </div>
      <div>
       
          <textarea
            {...register('note')}
            maxLength={200}
            className={clsx(
              'inputChangeAutofill placeholder-text-gray-900 w-[490px] h-[120px] rounded-md border border-gray-300 p-3 text-xs placeholder:font-light focus:outline-none focus:ring-0 xs:text-lg resize-none',
              isDark
                ? 'border-b-darkText bg-transparent text-darkText placeholder:dark:text-custom-blue-300focus:border-darkText'
                : 'border-b-buttonsLigth bg-transparent outline-none focus:border-buttonsLigth focus:outline-none',
              errors.note ? 'placeholder:text-errorColor' : 'placeholder:text-buttonExpandDark',
            )}
            placeholder="Mencione el motivo del Reembolso"
          />
       
      </div>

    </form>
  );
};

export default Form;
