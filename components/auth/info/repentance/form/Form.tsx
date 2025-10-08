import React, { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { FormData } from '@/types/repentance/repentance';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import SelectCountry from '@/components/request/form/inputs/SelectCountry';
import { defaultCountryOptions } from '@/utils/defaultCountryOptions';
import AlertProcess from '@/components/repentance/Alerts/AlertProcess';
const FormAuth = () => {
  const { isDark } = useDarkTheme();
  const { data: session } = useSession();

  const [isFocused, setIsFocused] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFormSubmission: SubmitHandler<FormData> = async (data) => {
    if (!session?.user?.fullName || !session?.user?.email) {
      console.error('Error: No hay datos del usuario disponibles.');
      return;
    }

    const nameParts = session.user.fullName.trim().split(/\s+/);
    const last_name = nameParts.length > 1 ? nameParts[1] : '';
    const phone_user = `${data.calling_code?.callingCode}${data.phone_number}`;

    const dataToSend = {
      ...data,
      last_name,
      phone_number: phone_user,
      email: session?.user?.email,
    };

    setIsLoading(true);

    try {
      await AlertProcess({ 
        isDark, 
        toggleTooltip, 
        setIsTooltipVisible, 
        transaction_id, 
        dataToSend, 
        setIsLoading 
      });
    } catch (error) {
      console.error('Error in handleFormSubmission:', error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmission)}
      className="flex h-full w-full max-w-[490px] flex-col justify-evenly gap-1 md:mt-3"
    >
      <div className="h-[81px]">
        <label className="text-tx font-ligth font-textFont">Numero Solicitud</label>
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
      <div className="relative mt-1 h-[81px]">
        <div className="flex flex-col">
          {/* Falta funcionalidad para cuando el usuario tenga su numero de telefono y no haga falta que lo ingrese el */}
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
        {isLoading ? 'Cargando...' : 'Solicitar Reembolso'}
      </button>
    </form>
  );
};
export default FormAuth;
