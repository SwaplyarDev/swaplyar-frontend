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
import BottomBorderInput from '@/components/ui/Input/BottomBorderInput';
import TextAreaContact from '@/components/ui/contact-form/TextAreaContact';
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack';
import ShortButton from '@/components/ui/NewButtons/ShortButton';
import AuthButton from '@/components/auth/AuthButton';

const Form = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);
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
      className="flex h-full w-full flex-col gap-4 mt-3"
    >
      <BottomBorderInput
        label="Número de Solicitud"
        name="transaction_id"
        register={register}
        validation={{
          required: 'El N° Solicitud es Obligatorio',
          pattern: {
            value: /^[A-Za-z0-9]{10,20}$/,
            message: 'Debe tener entre 10 y 20 caracteres alfanumericos',
          },
        }}
        error={errors.transaction_id?.message}
      />
      <BottomBorderInput
        label="Apellido"
        name="last_name"
        register={register}
        validation={{
          required: 'El Apellido es obligatorio',
          minLength: {
            value: 2,
            message: 'Debe ingresar mínimo 2 caracteres',
          },
          maxLength: {
            value: 50,
            message: 'Debe ingresar como máximo 50 caracteres',
          },
        }}
        error={errors.last_name?.message}
      />
      <BottomBorderInput
        label="Correo Electrónico"
        type="email"
        name="email"
        register={register}
        validation={{
          required: 'El Email es obligatorio',
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'Ingresa un formato válido de email',
          },
        }}
        error={errors.email?.message}
      />
      <BottomBorderInput
        label="Número de Teléfono"
        type="tel"
        name="phone_number"
        register={register}
        validation={{
          required: 'El número de teléfono es obligatorio',
          validate: (value: string) => {
            const country = watch('calling_code');
            const result = validatePhoneNumber(value, country);
            return result === true ? true : result;
          }
        }}
        error={errors.phone_number?.message}
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
      </BottomBorderInput>
      <div>
        <TextAreaContact
          label="Mensaje (opcional)"
          name="note"
          register={register}
          error={errors.note?.message}
          rows={4}
          className='bg-transparent'
        />

      </div>
      <div className="w-full flex flex-row items-center justify-between gap-4 md:mt-4">
        <ButtonBack route="/es/centro-de-ayuda" isDark={isDark} className='!mx-0' />
        
        <AuthButton
          label='Solicitar Reembolso'
          className='w-[272px] md:w-[394px]'
          disabled={!isValid || isLoading}
          isDark={isDark}
        />
      </div>

    </form>
  );
};

export default Form;
